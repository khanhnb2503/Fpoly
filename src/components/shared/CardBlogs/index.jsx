import { Avatar, Card, Col, Image, Row, Typography } from "antd";
import { BsClockHistory } from "react-icons/bs";
import { Link } from "react-router-dom";

export const CardsBlog = ({ data }) => {
  const { Text, Title, Paragraph, } = Typography
  return (
    <div className="wrapper__card--blog">
      <Card>
        <Card.Meta
          avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />}
          title="Nguyễn Đăng Thái"
          style={{ marginBottom: 20 }}
        />
        <Row gutter={[60]}>
          <Col span={15}>
            <Link to={"/"}>
              <Title level={3}>{data.title}</Title>
            </Link>
            <Paragraph
              style={{ width: "100%", }}
              ellipsis={{
                rows: 5,
              }}
            >{data.content}</Paragraph>
            <Card.Meta
              avatar={<BsClockHistory />}
              title="23/04/2023"
              style={{ position: "absolute", bottom: 0 }}
            />
          </Col>
          <Col span={9}>
            <Link>
              <Image preview={false} src='../../../../public/images/blog 2.jpg' width={"100%"} height={230} />
            </Link>
          </Col>
        </Row>
      </Card>
    </div>
  )
}
