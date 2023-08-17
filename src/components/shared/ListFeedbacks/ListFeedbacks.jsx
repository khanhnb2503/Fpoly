import {Link, useParams} from "react-router-dom";
import {
  useAddFeedbackMutation,
  useGetFeedbacksQuery,
  useGetNotificationsQuery,
  useGetPostsCateQuery,
  useGetPostsLatestQuery,
  useGetPostsTrendingQuery
} from "../../../services/forum/index.jsx";
import {useGetCategoryQuery} from "../../../services/courses/index.jsx";
import {useState} from "react";
import {
  Avatar,
  Breadcrumb,
  Button,
  Card,
  Col, Divider,
  Image,
  Input, Modal,
  notification,
  Pagination,
  Row, Select,
  Space,
  Tag,
  Typography
} from "antd";
import {
  CommentOutlined,
  EyeOutlined,
  FieldTimeOutlined,
  FileOutlined,
  HeartOutlined,
  HomeOutlined
} from "@ant-design/icons";
import moment from "moment/moment.js";
import {FaEdit} from "react-icons/fa";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const ListFeedback = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const {Title, Text, Paragraph} = Typography;
  const [api, contextHolder] = notification.useNotification();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [titlePost, setTitlePost] = useState('')
  const [dataCKEditor, setDataCKEditor] = useState('')

  const {data: categories} = useGetCategoryQuery()
  const {data: postCate} = useGetPostsCateQuery()
  const {data: postTrending} = useGetPostsTrendingQuery()
  const {data: postLatest} = useGetPostsLatestQuery()

  const {data: feedbacks} = useGetFeedbacksQuery()

  const [addFeedback] = useAddFeedbackMutation()
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
    path: '/forum/listFeedback', breadcrumbName: (<div style={{display: "flex", alignItems: "center", marginTop: 3}}>
      <FileOutlined/>
      <span style={{marginLeft: 5}}>ListPost</span>
    </div>),
  },];
  const openNotificationWithIcon = (type) => {
    api[type]({
      message: 'Tạo bài viết', description: "Tạo bài viết thành công",
    });
  };

  function itemRender(route, params, routes, paths) {
    const last = routes.indexOf(route) === routes.length - 1;
    return last ? (<span>{route.breadcrumbName}</span>) : (<Link to={paths.join('/')}>{route.breadcrumbName}</Link>);
  }

  const handleChangeTitle = (e) => {
    setTitlePost(e.target.value)
  }
  const handleAddFeedback = async () => {
    const dataFeedback = {
      title: titlePost, content: dataCKEditor
    }
    const {data} = await addFeedback(dataFeedback)
    if (data.status) {
      openNotificationWithIcon('success')
      setDataCKEditor('')
      setTitlePost('')
      setIsModalOpen(false)
    }
  }
  const showModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div>
      <div className="header_forum">
        {contextHolder}
        <Modal width={"50%"} title="Thêm góp ý" onOk={() => handleAddFeedback()}
               onCancel={() => setIsModalOpen(false)}
               open={isModalOpen}>
          <Title level={4}>Tiêu đề</Title>
          <Input placeholder="Tiêu đề" onChange={(e) => handleChangeTitle(e)}/>
          <Divider/>
          <CKEditor
            editor={ClassicEditor}
            data={dataCKEditor}
            onChange={(event, editor) => {
              const data = editor.getData();
              setDataCKEditor(data)
            }}
          />
        </Modal>
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
      <div>
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
            </Space>
          </Col>
          <Col span={13}>
            <div>
              <Card>
                <Row gutter={10}>
                  <Col span={19}>
                    <Row gutter={[30]}>
                      <Col span={5}>
                        <Image width={100}
                               src={"https://html-template.spider-themes.net/docy/img/home_support/answer.png"}/>
                      </Col>
                      <Col span={18}>
                        <Title level={3}>
                          Bạn có trải nghiệm không tốt về trang web ?
                        </Title>
                        <Text>
                          Hãy góp ý để chúng tôi nâng cấp trải nghiệm tốt nhất cho bạn!
                        </Text>
                      </Col>
                    </Row>
                  </Col>
                  <Col span={3}>
                    <Button
                      type="primary"
                      color="#FFF"
                      size="large"
                      icon={<FaEdit/>}
                      onClick={() => showModal()}
                    >Góp ý</Button>
                  </Col>
                </Row>
              </Card>
            </div>
            <Card type="inner" title="Góp ý">
              {feedbacks?.data && feedbacks?.data.map((data, index) => {
                return (
                  <div key={index} style={{marginTop: 20, marginBottom: 20}}>
                    <Card>
                      <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                        <Text ellipsis={true} style={{fontWeight: 600, fontSize: 20}}>{data.title || "Bài viết 1"}</Text>
                        <div>
                          <span className="dateTime">{moment(data?.created_at).startOf('hour').fromNow()}</span>
                        </div>
                      </div>
                      <div>
                        <Link to={`/forum/detailFeedback/${data.id}`}>
                          <Text ellipsis={true} style={{marginLeft: 10, fontSize: 18, marginTop: 10}}>
                            {data.content}
                          </Text>
                        </Link>
                      </div>
                    </Card>
                    <div>
                    </div>
                  </div>
                )
              })}
            </Card>
            <div style={{marginLeft: "35%", marginTop: 10}}>
              <Pagination current={pageNumber} onChange={onChangePage} total={feedbacks?.length}/>
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

export default ListFeedback
