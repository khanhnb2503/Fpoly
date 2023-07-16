import { Button, Col, Form, Input, Row, Typography } from 'antd';
import { useState } from 'react';
import { AiOutlineLock, AiOutlineMail, AiOutlineUser } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';

import BackgroundAuth from '../../../../public/images/auth.jpg';
import { Rules } from '../../../common/validator';
import Loading from '../../../components/shared/Spin';
import { RoutesConstant } from '../../../routes';
import { useAuthRegisterMutation } from '../../../services/authentication/auth';
const { Title, Text } = Typography;

function Register() {
	const navigate = useNavigate();
	const [message, setMessage] = useState('');
	const [authRegister, { isLoading }] = useAuthRegisterMutation();
	const handleLogin = async (values) => {
		console.log(values);
		const response = await authRegister(values);
		console.log(response);
		// if (error) setMessage(error.data.message);
		// navigate('/');
	};

	return (
		<>
			<Loading loading={isLoading} size='large'>
				<div className='wrapper__register' style={backgroundStyles}>
					<Row justify='center' align='middle' className='min-vh-100'>
						<Col lg={10} xl={5} className='content-body bg-light rounded-1'>
							<div className='header-title'>
								<h4>ĐĂNG KÍ</h4>
							</div>
							<div className='body'>
								<Form name="login-form" layout='vertical' onFinish={handleLogin}>
									<Form.Item name="name" rules={Rules.USERNAME} >
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
						</Col>
					</Row>
				</div>
			</Loading >
		</>
	)
};

const backgroundStyles = {
	backgroundImage: `url(${BackgroundAuth})`,
	backgroundSize: 'cover',
	minHeight: '100vh'
}

export default Register;