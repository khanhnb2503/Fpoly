import {Avatar, Card, Col, Image, Row, Typography} from "antd";
import {BsClockHistory} from "react-icons/bs";
import {Link} from "react-router-dom";
import Logo from "../../../../public/images/logo_ong_vang.jpg";
import {FaEye, FaRegCommentAlt, FaStar} from "react-icons/fa";

export const CardForum = ({data}) => {
  const {Text, Title, Paragraph,} = Typography
  const gridStyle = {
    width: "100%",
  };
  return (
    <div className="wrapper__card--blog">
      <Card title={data.title} className="background">
        {data.post.map((item, index) => {
          return (
            <div key={index}>
              <Card.Grid style={gridStyle}>
                <Row gutter={5}>
                  <Col span={2}>
                    <Avatar src={Logo} size={35} alt='avatar'/>
                  </Col>
                  <Col span={13}>
                    <Row>
                      <Col span={19}>
                        <Link to={`/forum/detailPost/${item.id}`}>
                          <Text ellipsis={
                            {
                              rows: 2,
                              expandable: true,
                              symbol: '',
                            }
                          } className="title">{item.title}</Text>
                        </Link>
                        <div>
                          <span className="dateTime">{item.date}</span>

                          <span>{item.user.name}</span>
                        </div>
                      </Col>
                    </Row>
                  </Col>
                  <Col span={3} className="content_right">
                    <FaEye/>
                    <span className="count">{item.view}</span>
                  </Col>
                  <Col span={3} className="content_right">
                    <FaStar/>
                    <span className="count">{item.star}</span>
                  </Col>
                  <Col span={3} className="content_right">
                    <FaRegCommentAlt/>
                    <span className="count">{item.comment.length}</span>
                  </Col>
                </Row>
              </Card.Grid>
            </div>
          )
        })}
      </Card>
    </div>
  )
}
