import { Card, Col, Row, Tag } from "antd";
import moment from "moment";
import { ImHistory, ImTelegram } from "react-icons/im";
import { Link } from "react-router-dom";
import { useAddViewPostMutation, useGetPostsTrendingQuery } from '../../../services/forum';

import AvatarForum5 from '../../../../public/images/blog 11.png';
import AvatarForum2 from '../../../../public/images/blog 12.png';
import AvatarForum4 from '../../../../public/images/blog 13.png';
import AvatarForum3 from '../../../../public/images/blog 14.png';
import AvatarForum1 from '../../../../public/images/blog 9.png';
import { useEffect, useState } from "react";


const { Meta } = Card;

function Blogs() {
	const { data: forums, isSuccess } = useGetPostsTrendingQuery();
	const [addViewPost] = useAddViewPostMutation();
	const [filterForum, setFilterForum] = useState([]);

	const handleAddView = (id) => {
		const { data } = addViewPost({ post_id: id })
	};

	const listArrayForum = [
		{ id: 9, image: AvatarForum1 },
		{ id: 12, image: AvatarForum2 },
		{ id: 11, image: AvatarForum3 },
		{ id: 13, image: AvatarForum4 },
		{ id: 14, image: AvatarForum5 }
	];

	useEffect(() => {
		if(forums) {
			forums.map((forum) => {
				let arr;
				listArrayForum.map((item) => {
					if(forum.id == item.id) {
						arr = {id: forum.id, title: forum.title, image: item.image, user: forum.user}
					}
				});
				setFilterForum((state) => [...state, arr]);
			})
		}
	}, [isSuccess]);


	return (
		<div className="wrapper__blogs">
			{isSuccess && (
				<div className="blogs">
					<Row justify='start' align='middle' gutter={[50, 45]}>
						{isSuccess > 0 && filterForum.map((item) => (
							<Col key={item.id} xl={6} className="blog-item">
								<Card
									hoverable
									cover={
										<img
											alt="example"
											src={item.image}
										/>
									}
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
