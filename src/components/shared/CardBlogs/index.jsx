import {Col, Row, Typography, Card, Avatar, Image, Space} from "antd";
import {Link} from "react-router-dom";
import {BsClockHistory} from "react-icons/bs";
import {useState} from "react";

export const CardsBlog = ({data}) => {
  const {Text, Title, Paragraph,} = Typography
  return (
    <div className="wrapper__cardsBlog">
      <Card>
        <Card.Meta
          avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel"/>}
          title="Nguyễn Đăng Thái"
          style={{marginBottom: 20}}
        />
        <Row gutter={10}>
          <Col span={15}>
            <Link to={"/"}>
              <Title level={2}>{data.title}</Title>
            </Link>
            <Paragraph
              style={{width: "100%",}}
              ellipsis={{
                rows: 5,
              }}
            >{data.content}</Paragraph>
            <Card.Meta
              avatar={<BsClockHistory/>}
              title="23/04/2023"
              style={{position: "absolute", bottom: 0}}
            />
          </Col>
          <Col span={9}>
            <Image src={data.image} width={"100%"} height={230}/>
          </Col>
        </Row>
      </Card>
    </div>
  )
}
