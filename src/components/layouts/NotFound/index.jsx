import { Result } from 'antd';
import { Link } from 'react-router-dom';

export function NotFound() {

	return (
		<div className='wrapper__notfound'>
			<Result
				status="404"
				title={<h4 className='number-error'>404</h4>}
				subTitle={<h3 className='content'>Không tìm thấy nội dung</h3>}
				extra={
					<Link className='direct-link' to='/'>Truy cập trang chủ</Link>
				}
			/>
		</div>
	)
}