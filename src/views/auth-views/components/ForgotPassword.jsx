import {Button, Col, Form, Input, Row, Typography, notification} from 'antd';
import { AiOutlineMail} from 'react-icons/ai';
import {Link, useNavigate} from 'react-router-dom';

import BackgroundAuth from '../../../../public/images/auth.jpg';
import {Rules} from '../../../common/validator';
import Loading from '../../../components/shared/Spin';
import {RoutesConstant} from '../../../routes';
import {useForgotPasswordMutation} from "../../../services/users/index.jsx";

const {Title, Text} = Typography;

function ForgotPassword() {
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();

  const [forgotPassword, { isLoading }] = useForgotPasswordMutation()
  const handleForgotPassword = async (values) => {
    const { data } = await forgotPassword(values);
    if (!data) {
      api.error({
        description: 'Email không tồn tại, vui lòng thử lại',
      });
    }
    if (data?.status === 'passwords.sent') {
      api.success({
        description: 'Quên mật khẩu thành công, vui lòng xem mật khẩu mới ở Mail của bạn',
      });
      navigate('/login')
    };
  };

  return (
    <>
      {contextHolder}
      <Loading loading={isLoading} size='large'>
        <div className='wrapper__register' style={backgroundStyles}>
          <Row justify='center' align='middle' className='min-vh-100'>
            <Col xl={6} className='content-body bg-light rounded-1'>
              <div className='header-title'>
                <h4>QUÊN MẬT KHẨU</h4>
              </div>
              <div className='body'>
                <Form name="login-form" layout='vertical' onFinish={handleForgotPassword}>
                  <Form.Item name="email" rules={Rules.EMAIL}>
                    <Input
                      size='large'
                      className='text-secondary'
                      placeholder='Nhập email...'
                      prefix={<AiOutlineMail/>}
                    />
                  </Form.Item>
                  <Form.Item className='text-center'>
                    <Button
                      type="primary"
                      shape='round'
                      size='large'
                      htmlType="submit"
                    > Quên mật khẩu
                    </Button>
                  </Form.Item>
                </Form>
              </div>
              <div>
                <div className='text-center mt-3'>
                  <Text level={5} type="secondary">
                    Bạn đã có tài khoản?
                    <Text className='text-primary ms-1'>
                      <Link to={RoutesConstant.LOGIN}>Đăng nhập</Link>
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

export default ForgotPassword;
