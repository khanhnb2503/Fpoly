import {Link, useParams} from "react-router-dom";
import {
  useGetPostsCateQuery,
  useGetPostsLatestQuery,
  useGetPostsQuery,
  useGetPostsTrendingQuery
} from "../../../services/forum/index.jsx";
import {useGetCategoryQuery} from "../../../services/courses/index.jsx";
import {useState} from "react";
import {Avatar, Breadcrumb, Card, Col, Input, Pagination, Row, Space, Tag, Typography} from "antd";
import {
  CommentOutlined,
  EyeOutlined,
  FieldTimeOutlined,
  FileOutlined,
  HeartOutlined,
  HomeOutlined
} from "@ant-design/icons";
import moment from "moment/moment.js";

const ListPosts = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const {Title, Text, Paragraph} = Typography;

  const {id} = useParams()
  const {data: posts, isLoading} = useGetPostsQuery(pageNumber)
  const {data: categories} = useGetCategoryQuery()
  const {data: postCate} = useGetPostsCateQuery()
  const {data: postTrending} = useGetPostsTrendingQuery()
  const {data: postLatest} = useGetPostsLatestQuery()
  const {data: getPostsByCate} = useGetPostsCateQuery()

  const onChangePage = (page) => {
    console.log(page)
    setPageNumber(page);
  };

  const routes = [{
    path: '/', breadcrumbName: (<Link to={"/forum"}>
      <div style={{display: "flex", alignItems: "center"}}>
        <HomeOutlined/>
        <span style={{marginLeft: 10}}>Forums</span>
      </div>
    </Link>)
  }, {
    path: '/forum/listPost/:id', breadcrumbName: (<div style={{display: "flex", alignItems: "center", marginTop: 3}}>
      <FileOutlined/>
      <span style={{marginLeft: 5}}>ListPost</span>
    </div>),
  },];

  const options = [
    {
      value: 1,
      label: 'Thắc mắc',
      color: "#2db7f5"
    },
    {
      value: 2,
      label: 'Câu hỏi',
      color: "#f50"
    },
    {
      value: 3,
      label: 'Thảo luận',
      color: "#108ee9"
    },
    {
      value: 4,
      label: 'Giải trí',
      color: "#87d068"
    },
  ]
  function itemRender(route, params, routes, paths) {
    const last = routes.indexOf(route) === routes.length - 1;
    return last ? (<span>{route.breadcrumbName}</span>) : (<Link to={paths.join('/')}>{route.breadcrumbName}</Link>);
  }
  return (
    <div>
      <div className="header_forum">
        <div className="header_search">
          <Input.Search
            placeholder="Tìm kiếm bài viết"
            allowClear
            size="large"
            onSearch={() => {
            }}
            style={{
              width: 600,
            }}
          />
          <Title style={{marginLeft: 50, marginTop: 10}} level={5}>Tìm kiếm phổ biến : Backend, Frontend </Title>
        </div>
      </div>
      <div className="breadcrumb_header">
        <div>
          <Breadcrumb items={routes} itemRender={itemRender}/>
        </div>
        <div style={{display: "flex", alignItems: "center"}}>
          <FieldTimeOutlined style={{fontSize: 20}}/>
          <span style={{marginLeft: 10}}>{moment(new Date()).format('LLL')}</span>
        </div>
      </div>
      <div className="wrapper_listPost">
        <Row gutter={[20, 10]}>
          <Col span={4}>
            <Title level={3}>Categories</Title>
            <Space size={[0, 8]} wrap>
              {categories && categories.data.map((item, index) => {
                return (
                  <div key={index}>
                    <Tag style={{padding: 10}} color="#55acee">
                      {item.name}
                    </Tag>
                  </div>
                )
              })}
              <div style={{marginTop: 20}}>
                <Title level={3}>Tags</Title>
                <Space size={[0, 8]} wrap>
                  {options && options.map((item, index) => {
                    return (
                      <div key={index}>
                        <Tag style={{padding: 10}} color={item.color}>
                          {item.label}
                        </Tag>
                      </div>
                    )
                  })}
                </Space>
              </div>
            </Space>
          </Col>
          <Col span={13}>
            <Card type="inner" title={getPostsByCate?.data[id - 1]?.category.name}>
              {getPostsByCate && getPostsByCate?.data[id - 1]?.posts?.map((data, index) => {
                const color = data?.type.type === "Thắc mắc" ? "#2db7f5" : data?.type.type === "Câu hỏi" ? "#f50" : data?.type.type === "Thảo luận" ? "#108ee9" : "#87d068"
                return (
                  <div key={index} style={{marginTop: 20, marginBottom: 20}}>
                    <Card>
                      <Row gutter={10} style={{alignItems: "center"}}>
                        <Col span={3}>
                          <Avatar src={data?.user_id.avatar || ""} size={35} alt='avatar'/>
                        </Col>
                        <Col span={12}>
                          <Link to={`/forum/detailPost/${data.id}`}>
                            <Text ellipsis={true} className="title">{data.title}</Text>
                          </Link>
                          <div>
                            <Tag color={color}>
                              {data?.type.type}
                            </Tag>
                            <span className="dateTime">{moment(data?.created_at).startOf('hour').fromNow()}</span>
                          </div>
                        </Col>
                        <Col span={7}>
                          <Row gutter={[0, 20]}>
                            <Col span={8} style={{display: "flex", alignItems: "center"}}>
                              <HeartOutlined style={{fontSize: 20}}/>
                              <span style={{marginLeft: 5}}>{data.star}</span>
                            </Col>
                            <Col span={8} style={{display: "flex", alignItems: "center"}}>
                              <CommentOutlined style={{fontSize: 20}}/>
                              <span style={{marginLeft: 5}}>{data.comments.length}</span>
                            </Col>
                            <Col span={8} style={{display: "flex", alignItems: "center"}}>
                              <EyeOutlined style={{fontSize: 20}}/>
                              <span style={{marginLeft: 5}}>{data.view}</span>
                            </Col>

                          </Row>

                        </Col>

                      </Row>
                    </Card>
                    <div>
                    </div>
                  </div>
                )
              })}
            </Card>
            <div style={{marginLeft: "35%", marginTop: 10}}>
              <Pagination current={pageNumber} onChange={onChangePage} total={posts?.length} />
            </div>
          </Col>
          <Col span={7}>
            <Row gutter={[0, 20]}>
              <Col span={24}>
                <Card type="inner" title="Bài viết mới nhất">
                  {postLatest && postLatest.map((data, index) => {
                    const color = data?.type.type === "Thắc mắc" ? "#2db7f5" : data?.type.type === "Câu hỏi" ? "#f50" : data?.type.type === "Thảo luận" ? "#108ee9" : "#87d068"
                    return (
                      <div key={index} style={{marginTop: 20, marginBottom: 20}}>
                        <Card>
                          <Row gutter={10}>
                            <Col span={5}>
                              <Avatar src={data.user.avatar} size={20} alt='avatar'/>
                            </Col>
                            <Col span={19}>
                              <Link to={`/forum/detailPost/${data.id}`}>
                                <Text ellipsis={true} className="title">{data.title}</Text>
                              </Link>
                              <div>
                                <span className="dateTime">{moment(data.created_at).format('LLL')}</span>
                                <div>
                                  <Tag color={color}>
                                    {data?.type.type}
                                  </Tag>

                                </div>
                              </div>
                            </Col>
                          </Row>
                        </Card>
                      </div>
                    )
                  })}
                </Card>
              </Col>
              <Col span={24}>
                <Card type="inner" title="Bài viết nổi bật">
                  {postLatest && postLatest.map((data, index) => {
                    const color = data?.type.type === "Thắc mắc" ? "#2db7f5" : data?.type.type === "Câu hỏi" ? "#f50" : data?.type.type === "Thảo luận" ? "#108ee9" : "#87d068"

                    return (
                      <div key={index} style={{marginTop: 20, marginBottom: 20}}>
                        <Card>
                          <Row gutter={10}>
                            <Col span={5}>
                              <Avatar src={data.user.avatar} size={35} alt='avatar'/>
                            </Col>
                            <Col span={19}>
                              <Link to={`/forum/detailPost/${data.id}`}>
                                <Text ellipsis={true} className="title">{data.title}</Text>
                              </Link>
                              <div>
                                <span className="dateTime">{moment(data.created_at).format('LLL')}</span>
                                <span>{data.user.user}</span>
                                <div>
                                  <Tag color={color}>
                                    {data?.type.type}
                                  </Tag>
                                </div>
                              </div>
                            </Col>
                          </Row>
                        </Card>
                      </div>
                    )
                  })}
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default ListPosts
