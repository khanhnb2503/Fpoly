import { Button, Col, Form, Input, Row, Typography, notification } from 'antd';
import { AiOutlineLock, AiOutlineMail, AiOutlineUser } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';

import { useEffect, useState } from 'react';
import BackgroundAuth from '../../../../public/images/auth.jpg';
import { Rules } from '../../../common/validator';
import Loading from '../../../components/shared/Spin';
import { RoutesConstant } from '../../../routes';
import { useAuthRegisterMutation } from '../../../services/authentication/auth';
import { subcribeCourseConfig } from '../../../services/base/baseQuery';
import { getLocalStorage, removeLocalStorage, setLocalStorage } from '../../../services/base/useLocalStorage';
import { useSubcribeCourseMutation } from '../../../services/courses';
const { Title, Text } = Typography;

function Register() {
	const navigate = useNavigate();
	const [courses, setCourses] = useState(null);

	const [api, contextHolder] = notification.useNotification();
	const [authRegister, { isLoading }] = useAuthRegisterMutation();
	const [subcribeCourse] = useSubcribeCourseMutation();

	const handleRegister = async (values) => {
		const { error, data } = await authRegister(values);
		if (error) {
			api.error({
				description: 'Tài khoản người dùng đã tồn tại!',
			});
			return;
		};

		if (data) {
			api.success({
				description: 'Tạo tài khoản thành công!',
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
			}, 3000);
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
				<div className='wrapper__register' style={backgroundStyles}>
					<Row justify='center' align='middle' className='min-vh-100'>
						<Col xl={6} className='content-body bg-light rounded-1'>
							<div className='header-title'>
								<h4>ĐĂNG KÍ</h4>
							</div>
							<div className='body'>
								<Form name="login-form" layout='vertical' onFinish={handleRegister}>
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