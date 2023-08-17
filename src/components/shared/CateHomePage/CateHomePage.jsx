import {Avatar, Card, Col, Row, Skeleton, Tag, Typography} from "antd";
import {FolderOpenOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import moment from "moment/moment.js";

const CateHomePage = ({filterPostByIdCate}) => {
  const {Title, Text} = Typography;
  const color = filterPostByIdCate?.posts[0].type?.type === "Thắc mắc" ? "#2db7f5" : filterPostByIdCate?.posts[0].type?.type === "Câu hỏi" ? "#f50" : filterPostByIdCate?.posts[0].type?.type === "Thảo luận" ? "#108ee9" : "#87d068"
  return (
    <div style={{marginTop: 20, marginBottom: 20}}>
      <Card>
        <Row>
          <Col span={9}>
            <div style={{display: "flex", marginTop: 10}}>
              <FolderOpenOutlined style={{fontSize: 30, color: "#009DA6"}}/>
              <Link to={`/forum/listPosts/${filterPostByIdCate.category.id}`}>
                <Title level={3} style={{marginLeft: 10, color: "#F26F27"}}>{filterPostByIdCate.category.name}</Title>
              </Link>
            </div>
          </Col>
          <Col span={3} style={{textAlign: "center"}}>
            <div style={{opacity: "60%"}}>
              Posts
            </div>
            <Text>
              {filterPostByIdCate?.posts && filterPostByIdCate?.posts.length}
            </Text>
          </Col>
          <Col span={3} style={{textAlign: "center"}}>
            <div style={{opacity: "60%"}}>
              Comments
            </div>
            <Text>
              {filterPostByIdCate?.posts && filterPostByIdCate?.posts[0]?.comments.length}
            </Text>
          </Col>
          <Col span={9}>
            <Row gutter={10}>
              <Col span={4}>
                {/*<Avatar src={data?.posts[0]?.user_id?.avatar} size={35} alt='avatar'/>*/}
              </Col>
              <Col span={20}>
                <Link to={`/forum/detailPost/${filterPostByIdCate.posts[0]?.id}`} >
                  <Text ellipsis={true} className="title">
                    {filterPostByIdCate?.posts && filterPostByIdCate.posts[0]?.title}
                  </Text>
                </Link>
                <div>
                  <span
                    className="dateTime">{moment(filterPostByIdCate?.posts && filterPostByIdCate.posts[0]?.created_at).format('LLL')}</span>
                  <span>{filterPostByIdCate?.posts && filterPostByIdCate?.posts[0].user_id.user}</span>
                </div>
                <div>
                  <Tag color={color}>
                    {filterPostByIdCate.posts && filterPostByIdCate?.posts[0]?.type?.type}
                  </Tag>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>
    </div>
  )
}

export default CateHomePage
