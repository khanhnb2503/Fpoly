export const Rules = {
	USERNAME: [
		{
			required: true,
			message: 'Tên không được để trống!',
		}
	],
	EMAIL: [
		{
			required: true,
			message: 'Email không được để trống!',
		},
		{
			type: 'email',
			message: 'Email không hợp lệ!',
		}
	],
	PASSWORD: [
		{
			required: true,
			message: 'Mật khẩu không được để trống!',
		}
	],
	CONFIRM: [
		{
			required: true,
			message: 'Mật khẩu không được để trống!',
		},
		({ getFieldValue }) => ({
			validator(_, value) {
				if (!value || getFieldValue('password') === value) {
					return Promise.resolve();
				}
				return Promise.reject(new Error('Mật khẩu không khớp!'));
			},
		})
	]
}