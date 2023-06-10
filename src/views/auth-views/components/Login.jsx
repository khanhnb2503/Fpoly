import { Button, Form, Input, Typography } from 'antd';
import { signInWithPopup } from 'firebase/auth';
import { AiOutlineGithub, AiOutlineLock, AiOutlineUser } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';

import { Link } from 'react-router-dom';
import BackgroundAuth from '../../../../public/images/auth.jpg';
import { Rules } from '../../../common/validator';
import { RoutesConstant } from '../../../constants/routes';
import { auth, githubAuthProvider, googleAuthProvider } from '../../../firebase/auth/FirebaseAuth';
const { Title, Text } = Typography;

function Login() {

  const handleLogin = (values) => {
    console.log('Success:', values);
  };

  const loginWithGoogle = async () => {
    try {
      const { user: { displayName, email, photoURL } } = await signInWithPopup(auth, googleAuthProvider);
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
  }

  return (
    <>
      <div style={backgroundStyles}>
        <div className='d-flex justify-content-center align-items-center min-vh-100'>
          <div className='w-25 p-5 bg-light rounded-1'>
            <div>
              <Form name="login-form" layout='vertical' onFinish={handleLogin}>
                <Form.Item name="username" rules={Rules.USERNAME}>
                  <Input
                    size='large'
                    className='text-secondary'
                    placeholder='Nhập username...'
                    prefix={<AiOutlineUser />}
                  />
                </Form.Item>
                <Form.Item name="password" rules={Rules.PASSWORD}>
                  <Input.Password
                    size='large'
                    className='text-secondary'
                    placeholder='Nhập mật khẩu...'
                    prefix={<AiOutlineLock />}
                  />
                </Form.Item>
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
                    <Link to={RoutesConstant.REGISTER}>Đăng kí</Link>
                  </Text>
                </Text>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
};

const backgroundStyles = {
  backgroundImage: `url(${BackgroundAuth})`,
  backgroundSize: 'cover',
  minHeight: '100vh'
}

export default Login;