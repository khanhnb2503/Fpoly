import { Button, Col, Row } from "antd";
import { ImHistory } from "react-icons/im";
import { Link } from "react-router-dom";
import { useGetBlogsQuery } from "../../../services/blogs";


function Blogs() {
	const { data: blogs, isSuccess } = useGetBlogsQuery();
	return (
		<div className="wrapper__blogs">
			<div className="blogs">
				<Row justify='start' align='middle' gutter={[50, 45]}>
					{isSuccess > 0 && blogs.data.map((item) => (
						<Col key={item.id} xl={6} className="blog-item">
							<div className="less-blog">
								<Link>
									<img src="./public/images/blog 1.jpg" alt={`lesson-${item.id}`} />
								</Link>
								<Row justify='space-between' align='middle' className="horizontal-info">
									<Col xl={12}>
										<Row justify='start' align='middle' gutter={6}>
											<Col className="author"><span>KhanhNb</span></Col>
										</Row>
									</Col>
									<Col xl={12}>
										<Row justify='end' align='middle' gutter={6}>
											<Col><ImHistory size={15} /></Col>
											<Col><span>12/06/2023</span></Col>
										</Row>
									</Col>
								</Row>
								<div className="blog--name">
									<h6><Link to="">{item.title}</Link></h6>
								</div>
								<div className="btn-views">
									<Button shape="round" size="large">
										<Link>Xem bài viết</Link>
									</Button>
								</div>
							</div>
						</Col>
					))}
				</Row>
			</div>
		</div>
	)
}
export default Blogs;