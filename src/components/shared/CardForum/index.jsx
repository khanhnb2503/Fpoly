import {Avatar, Card, Col, Image, Row, Typography} from "antd";
import {BsClockHistory} from "react-icons/bs";
import {Link} from "react-router-dom";
import Logo from "../../../../public/images/logo_ong_vang.jpg";
import {FaEye, FaRegCommentAlt, FaStar} from "react-icons/fa";
import {handleDisplayCkeditor} from "../../../common/handleDisplayCkeditor.jsx";

export const CardForum = ({data}) => {
  const {Text, Title, Paragraph,} = Typography
  const gridStyle = {
    width: "100%",
  }

  return (
    <div className="wrapper__card--blog">
          <Card.Grid style={gridStyle}>
            <Row gutter={5}>
              <Col span={2}>
                <Avatar src={Logo} size={35} alt='avatar'/>
              </Col>
              <Col span={13}>
                <Row>
                  <Col span={19}>
                    <Link to={`/forum/detailPost/${data.id}`}>
                      <Text ellipsis={
                        {
                          rows: 2,
                          expandable: true,
                          symbol: '',
                        }
                      } className="title">{data.title}</Text>
                    </Link>
                    <div>
                      <span style={{marginRight: 10}}>{data.user_id}</span>
                      <span className="dateTime">{data.date || "20/6/2023"}</span>
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col span={3} className="content_right">
                <FaEye/>
                <span className="count">{data.view}</span>
              </Col>
              <Col span={3} className="content_right">
                <FaStar/>
                <span className="count">{data.star}</span>
              </Col>
              <Col span={3} className="content_right">
                <FaRegCommentAlt/>
                <span className="count">{data.comments.length}</span>
              </Col>
            </Row>
          </Card.Grid>
    </div>
  )
}
