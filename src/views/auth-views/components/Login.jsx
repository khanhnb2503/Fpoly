
import { Button, Col, Form, Input, Row, Typography, notification } from 'antd';
import { useEffect, useState } from 'react';
import { AiOutlineGithub, AiOutlineLock, AiOutlineUser } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router-dom';

import BackgroundAuth from '../../../../public/images/auth.jpg';
import { Rules } from '../../../common/validator';
import Loading from '../../../components/shared/Spin';
import { RoutesConstant } from '../../../routes';
import { useAuthLoginMutation } from '../../../services/authentication/auth';
import { subcribeCourseConfig } from '../../../services/base/baseQuery';
import { getLocalStorage, removeLocalStorage, setLocalStorage } from '../../../services/base/useLocalStorage';
import { useSubcribeCourseMutation } from '../../../services/courses';
const { Title, Text } = Typography;

function Login() {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [courses, setCourses] = useState(null);
  const [usersCurrent, setUsersCurrent] = useState();
  const [authLogin, { isLoading }] = useAuthLoginMutation();
  const [subcribeCourse] = useSubcribeCourseMutation();
  const [api, contextHolder] = notification.useNotification();

  const handleLogin = async (values) => {
    const { data, error } = await authLogin(values);
    if (error) {
      api.error({
        description: 'Tài khoản hoặc mật khẩu không đúng!',
      });
      return;
    };

    if (data) {
      api.success({
        description: 'Đăng nhập thành công!',
      });
      const { access_token, refresh_token } = data;
      setLocalStorage('access_token', access_token);
      setLocalStorage('refresh_token', refresh_token);

      if (courses && (courses?.is_free == 1)) {
        const data = { course_id: courses?.id }
        const res = await subcribeCourseConfig(data, access_token)
        setTimeout(() => {
          let lesson_id = courses?.modules[0]?.lessons[0]?.id
          navigate(`/lessons/${lesson_id}`)
          removeLocalStorage('hd-course')
          location.reload()
        }, 3000);
        return;
      };
    };

    if (!courses) {
      setTimeout(() => {
        navigate('/')
        location.reload();
      }, 3000)
      return;
    };

    navigate(`/payment/${courses?.id}`)
    removeLocalStorage('hd-course')
    location.reload()
  };

  useEffect(() => {
    if (getLocalStorage('hd-course')) {
      const course = getLocalStorage('hd-course');
      setCourses(course)
    };
  }, []);

  return (
    <>
      {contextHolder}
      <Loading loading={isLoading} size='large'>
        <div className='wrapper__login' style={backgroundStyles}>
          <Row justify='center' align='middle' className='min-vh-100'>
            <Col xl={6} className='content-body bg-light rounded-1'>
              <div className='header-title'>
                <h4>ĐĂNG NHẬP</h4>
              </div>
              <div className='body'>
                <Form name="login-form" layout='vertical' onFinish={handleLogin}>
                  <Form.Item name="email" rules={Rules.EMAIL}>
                    <Input
                      size='large'
                      placeholder='Nhập email...'
                      onChange={() => setMessage('')}
                      prefix={<AiOutlineUser />}
                    />
                  </Form.Item>
                  <Form.Item name="password" rules={Rules.PASSWORD}>
                    <Input.Password
                      size='large'
                      placeholder='Nhập mật khẩu...'
                      onChange={() => setMessage('')}
                      prefix={<AiOutlineLock />}
                    />
                  </Form.Item>
                  <div className='message-error'>
                    {message && <span>{message}</span>}
                  </div>
                  <Text className='text-primary ms-1'>
                    <Link to={RoutesConstant.FORGOTPASSWORD}>Quên mật khẩu</Link>
                  </Text>
                  <Form.Item className='text-center'>
                    <Button type="primary" shape='round' size='large' htmlType="submit">
                      Đăng nhập
                    </Button>
                  </Form.Item>
                </Form>
              </div>
              <div>
                <div className='text-center mb-3'>
                  <Text level={5} type="secondary">Hoặc đăng nhập với</Text>
                </div>
                <div>
                  <div className='d-flex justify-content-around flex-wrap'>
                    <div>
                      <Button
                        size='large'
                        className='px-4'
                        icon={<FcGoogle />}
                      > Google
                      </Button>
                    </div>
                    <div>
                      <Button
                        size='large'
                        className='px-4'
                        icon={<AiOutlineGithub />}
                      > Github
                      </Button>
                    </div>
                  </div>
                </div>
                <div className='text-center mt-3'>
                  <Text level={5} type="secondary">
                    Bạn chưa có tài khoản?
                    <Text className='text-primary ms-1'>
                      <Link to={RoutesConstant.REGISTER}>đăng kí</Link>
                    </Text>
                  </Text>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Loading>
    </>
  )
};

const backgroundStyles = {
  backgroundImage: `url(${BackgroundAuth})`,
  backgroundSize: 'cover',
  minHeight: '100vh'
}

export default Login;
