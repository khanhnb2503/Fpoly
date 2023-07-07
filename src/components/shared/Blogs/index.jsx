import { Button, Col, Row } from "antd"
import { Link } from "react-router-dom"
import { ImHistory } from "react-icons/im";
import { useGetBlogsQuery } from "../../../services/blogs";


function Blogs() {
    const { data: blogs, isSuccess } = useGetBlogsQuery();

    return (
        <div className="wrapper__blogs">
            <div className="blogs">
                {isSuccess && blogs.length > 0 && blogs.map((blog) => (
                    <div key={blog.id} className="blog-body">
                        <Row justify='start' align='middle' gutter={[50, 30]}>
                            {blogs.map((item) => (

                                <Col key={item.id} xl={6} className="blog-item">
                                    <div className="less-blog">
                                        <Link className="thumbnail-link">
                                            <img src={item.image} alt={`lesson-${item.id}`} />
                                        </Link>
                                        <Row justify='space-between' align='middle' className="horizontal-info">
                                            <Col xl={12}>
                                                <Row justify='start' align='middle' gutter={6}>
                                                    <Col className="author"><span>{item.author}</span></Col>
                                                </Row>
                                            </Col>
                                            <Col xl={12}>
                                                <Row justify='end' align='middle' gutter={6}>
                                                    <Col><ImHistory size={12} /></Col>
                                                    <Col><span>{item.date}</span></Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                        <div className="blog--name">
                                            <h6><Link to="">{item.name}</Link></h6>
                                        </div>
                                        <div className="text-button">
                                            <Button shape="round" className="btn-views">Xem bài viết </Button>
                                        </div>
                                    </div>

                                </Col>
                            ))}
                        </Row>
                    </div>

                ))}

            </div>

        </div>
    )
}
export default Blogs;