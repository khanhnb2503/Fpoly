import { Button, Form, Input, Typography } from 'antd';
import { AiOutlineLock, AiOutlineMail, AiOutlineUser } from 'react-icons/ai';
import { Link } from 'react-router-dom';

import BackgroundAuth from '../../../../public/images/auth.jpg';
import { Rules } from '../../../common/validator';
import { RoutesConstant } from '../../../routes';
const { Title, Text } = Typography;

function Register() {
	const handleLogin = ({ username, password }) => {
		console.log(username, password);
	};

	return (
		<>
			<div style={backgroundStyles}>
				<div className='d-flex justify-content-center align-items-center min-vh-100'>
					<div className='w-25 p-5 bg-light rounded-1'>
						<div>
							<Form name="login-form" layout='vertical' onFinish={handleLogin}>
								<Form.Item name="username" rules={Rules.USERNAME} >
									<Input
										size='large'
										className='text-secondary'
										placeholder='Nhập username...'
										prefix={<AiOutlineUser />}
									/>
								</Form.Item>

								<Form.Item name="email" rules={Rules.EMAIL} >
									<Input
										size='large'
										className='text-secondary'
										placeholder='Nhập email...'
										prefix={<AiOutlineMail />}
									/>
								</Form.Item>

								<Form.Item name="password" rules={Rules.PASSWORD} >
									<Input.Password
										size='large'
										className='text-secondary'
										placeholder='Nhập mật khẩu...'
										prefix={<AiOutlineLock />}
									/>
								</Form.Item>

								<Form.Item name="confirm" rules={Rules.CONFIRM} >
									<Input.Password
										size='large'
										className='text-secondary'
										placeholder='Xác nhận mật khẩu...'
										prefix={<AiOutlineLock />}
									/>
								</Form.Item>

								<Form.Item className='text-center'>
									<Button
										type="primary"
										shape='round'
										size='large'
										htmlType="submit"
									> Đăng kí
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

export default Register;