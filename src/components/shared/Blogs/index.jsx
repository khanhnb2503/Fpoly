import { Card, Col, Row, Tag } from "antd";
import moment from "moment";
import { ImHistory } from "react-icons/im";
import { Link } from "react-router-dom";
import {useAddViewPostMutation, useGetPostsTrendingQuery} from '../../../services/forum';

const { Meta } = Card;

function Blogs() {
	const { data: forums, isSuccess } = useGetPostsTrendingQuery();
	const [addViewPost] = useAddViewPostMutation()

	const handleAddView = (id) => {
		const {data} = addViewPost({post_id : id})
	}

	return (
		<div className="wrapper__blogs">
			{isSuccess && (
				<div className="blogs">
					<Row justify='start' align='middle' gutter={[50, 45]}>
						{isSuccess > 0 && forums.map((item) => (
							<Col key={item.id} xl={6} className="blog-item">
								<Card
									hoverable
									cover={<img alt="example" src={`./public/images/blog ${item.id}.jpg`} />}
									className="item-forums"
								>
									<Row justify='space-between' align='middle'>
										<Col xl={12}>
											<Tag color="cyan">{item.user.name}</Tag>
										</Col>
										<Col xl={12}>
											<Row justify='end' align='middle' gutter={6}>
												<Col><ImHistory size={15} style={{ marginBottom: 4, color: '#a7a7a7' }} /></Col>
												<Col>
													<span style={{ color: '#a7a7a7' }}>
														{moment(item.created_at).startOf('hour').fromNow()}
													</span>
												</Col>
											</Row>
										</Col>
									</Row>
									<Link to={`forum/detailPost/${item.id}`}>
										<div onClick={() => handleAddView(item.id)}>
											<Meta title={item.title} className="title-forums" />
										</div>
									</Link>
								</Card>
							</Col>
						))}
					</Row>
				</div>
			)}
		</div>
	)
}
export default Blogs;
