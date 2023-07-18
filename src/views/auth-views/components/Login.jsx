
import { Button, Col, Form, Input, Row, Typography } from 'antd';
import { signInWithPopup } from 'firebase/auth';
import { useState } from 'react';
import { AiOutlineGithub, AiOutlineLock, AiOutlineUser } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router-dom';

import BackgroundAuth from '../../../../public/images/auth.jpg';
import { Rules } from '../../../common/validator';
import Loading from '../../../components/shared/Spin';
import { auth, githubAuthProvider, googleAuthProvider } from '../../../firebase/auth/FirebaseAuth';
import { RoutesConstant } from '../../../routes';
import { useAuthLoginMutation } from '../../../services/authentication/auth';
import { setLocalStorage } from '../../../services/base/useLocalStorage';
const { Title, Text } = Typography;

function Login() {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [authLogin, { isLoading }] = useAuthLoginMutation();

  const handleLogin = async (values) => {
    const { data, error } = await authLogin(values);
    if (error) setMessage(error.data.message);
    if (data) {
      const { access_token, refresh_token } = data;
      setLocalStorage('access_token', access_token);
      setLocalStorage('refresh_token', refresh_token);
      navigate('/');
    }
  };

  const loginWithGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, googleAuthProvider);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const loginWithGithub = async () => {
    try {
      const { user: { displayName, email, photoURL } } = await signInWithPopup(auth, githubAuthProvider);
      console.log(displayName, email, photoURL)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Loading loading={isLoading} size='large'>
        <div className='wrapper__login' style={backgroundStyles}>
          <Row justify='center' align='middle' className='min-vh-100'>
            <Col lg={10} xl={5} className='content-body bg-light rounded-1'>
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
                        onClick={loginWithGoogle}
                      > Google
                      </Button>
                    </div>
                    <div>
                      <Button
                        size='large'
                        className='px-4'
                        icon={<AiOutlineGithub />}
                        onClick={loginWithGithub}
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
