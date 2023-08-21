import {
  Avatar,
  Breadcrumb,
  Button,
  Card,
  Col,
  Divider,
  Image,
  Input,
  Modal,
  Row,
  Select,
  Skeleton,
  Space,
  Tag,
  Typography,
  notification, AutoComplete
} from "antd";
import {useEffect, useState} from "react";
import {CardForum} from "../CardForum/index.jsx";
import SkeletonPage from "../SkeletonPage/index.jsx";
import {FaEdit, FaRocketchat} from "react-icons/fa";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {
  useAddPostMutation, useGetFeedbacksQuery,
  useGetNotificationsQuery,
  useGetPostsCateQuery,
  useGetPostsLatestQuery,
  useGetPostsQuery,
  useGetPostsTrendingQuery, useSearchPostQuery
} from "../../../services/forum/index.jsx";
import {useGetCategoryQuery} from "../../../services/courses/index.jsx";
import {FieldTimeOutlined, FolderOpenOutlined, HomeOutlined} from "@ant-design/icons";
import moment from "moment";
import {Link, useNavigate} from "react-router-dom"
import CateHomePage from "../CateHomePage/CateHomePage.jsx";
import {useProfileQuery} from "../../../services/users/index.jsx";
import Loading from "../Spin/index.jsx";

function ForumPage() {
  const { Title, Text } = Typography;
  const [pageNumber, setPageNumber] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataCKEditor, setDataCKEditor] = useState('')
  const [titlePost, setTitlePost] = useState('')
  const [idType, setIdType] = useState(1);
  const [idCategory, setIdCategory] = useState(1);
  const [keyword, setKeyword] = useState('');

  const [api, contextHolder] = notification.useNotification();

  const {data: posts, isLoading} = useGetPostsQuery(pageNumber)

  const { data: postTrending } = useGetPostsTrendingQuery()

  const { data: postLatest } = useGetPostsLatestQuery()

  const {data: user} = useProfileQuery()

  const [addPost] = useAddPostMutation()

  const { data: categories } = useGetCategoryQuery()

  const {data: notifications} = useGetNotificationsQuery()

  const {data: getPostsByCate} = useGetPostsCateQuery()

  const {data: feedbacks} = useGetFeedbacksQuery()
  const {data: dataSearch} = useSearchPostQuery(keyword);


  const navigate = useNavigate()
  const showModal = () => {
    if (!user) {
      navigate('/login')
    }
    setIsModalOpen(true);
  };

  const optionsCategory = categories && categories?.data.map((item) => {
    return {
      value: item.id, label: item.name
    }
  })
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

  const openNotificationWithIcon = (type) => {
    api[type]({
      message: 'Tạo bài viết', description: "Tạo bài viết thành công",
    });
  };
  const handleChangeTypePost = (value) => {
    setIdType(value)
  };
  const handleChangeCategory = (value) => {
    setIdCategory(value)
  };
  const handleChangeTitle = (e) => {
    setTitlePost(e.target.value)
  }
  const handleAddPost = async () => {
    const dataPost = {
      title: titlePost, content: dataCKEditor, type: idType, category_id: idCategory
    }
    const { data } = await addPost(dataPost)
    if (data.status) {
      openNotificationWithIcon('success')
      setDataCKEditor('')
      setTitlePost('')
      setIsModalOpen(false)
    }
  }
  return (
    <div style={{ marginTop: 10 }}>
      <div className="header_forum">
        <div className="header_search">
          <AutoComplete
            options={[{
              label: (
                <Loading loading={isLoading} size='small'>
                  <div>
                    {dataSearch?.search_results.length < 0
                      ? <span>Nhập để tìm kiếm!</span>
                      : (
                        <div className='list-content-search'>
                          {dataSearch?.search_results && (
                            <>
                              {dataSearch.search_results.map((post, index) => (
                                <div key={index} style={{padding: 10, borderBottom: 2, border: 1}}>
                                  <Row>
                                    <Col>
                                      <Link to={`/forum/detailPost/${post.id}`}>
                                        <div>{post.title}</div>
                                      </Link>
                                    </Col>
                                  </Row>
                                </div>
                              ))}
                            </>
                          )}
                        </div>
                      )}
                  </div>
                </Loading>
              )
            }]}
            style={{width: 600}}
            onSearch={(value) => {
              setKeyword(value)
            }}
            placeholder="Tìm kiếm bài viết..."
          />
          <Title style={{ marginLeft: 50, marginTop: 10 }} level={5}>Tìm kiếm phổ biến : Backend, Frontend </Title>
        </div>
      </div>
      <div className="breadcrumb_header">
        <div>
          <Breadcrumb items={[{
            title: (<div style={{display: "flex", alignItems: "center"}}>
              <HomeOutlined style={{fontSize: 20}}/>
              <span style={{marginLeft: 10, fontSize: 20}}>Home</span>
            </div>)
          },]}/>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <FieldTimeOutlined style={{ fontSize: 20 }} />
          <span style={{ marginLeft: 10 }}>{moment(new Date()).format('LLL')}</span>
        </div>
      </div>
      <div className="wrapper__blog--page">
        <Row gutter={20}>
          <Col span={16}>
            {contextHolder}
            <Card>
              <Row gutter={10}>
                <Col span={19}>
                  <Row>
                    <Col span={5}>
                      <Image width={100}
                        src={"https://html-template.spider-themes.net/docy/img/home_support/answer.png"} />
                    </Col>
                    <Col span={16}>
                      <Title level={3}>
                        Bạn không thể tìm kiếm 1 câu trả lời?
                      </Title>
                      <Text>
                        Hãy tham gia cộng đồng của chúng tôi để tìm kiếm những câu trả lời nhanh nhất
                      </Text>
                    </Col>
                  </Row>
                </Col>
                <Col span={5}>
                  <Button
                    type="primary"
                    color="#FFF"
                    size="large"
                    icon={<FaEdit />}
                    onClick={() => showModal()}
                  >Thêm bài viết</Button>
                </Col>
              </Row>
            </Card>
            <Modal width={"50%"} title="Thêm bài viết" onOk={() => handleAddPost()}
              onCancel={() => setIsModalOpen(false)}
              open={isModalOpen}>
              <Row>
                <Col span={12}>
                  <Title level={4}>Chuyên mục</Title>
                  <Select
                    defaultValue="Thắc mắc"
                    style={{
                      width: 300,
                    }}
                    onChange={(value) => handleChangeTypePost(value)}
                    options={options}
                  />
                </Col>
                <Col span={12}>
                  <Title level={4}>Danh mục</Title>
                  <Select
                    defaultValue="Backend"
                    style={{
                      width: 300,
                    }}
                    onChange={(value) => handleChangeCategory(value)}
                    options={optionsCategory}
                  />
                </Col>
                <Title level={4}>Tiêu đề</Title>
                <Input placeholder="Tiêu đề" onChange={(e) => handleChangeTitle(e)} />
              </Row>
              <Divider />
              <CKEditor
                editor={ClassicEditor}
                data={dataCKEditor}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setDataCKEditor(data)
                }}
              />
            </Modal>
            <div style={{marginTop: 30}}>
              <div style={{marginTop: 20, marginBottom: 20}}>
                <Card type="inner" title="Sảnh chung">
                  <Card>
                    <Row>
                      <Col span={9}>
                        <div style={{display: "flex", marginTop: 10}}>
                          <FolderOpenOutlined style={{fontSize: 30, color: "#009DA6"}}/>
                          <Link to={`/forum/listNotifications`}>
                          <Title level={3} style={{marginLeft: 10, color: "#F26F27"}}>Thông báo</Title>
                          </Link>
                        </div>
                      </Col>
                      <Col span={3} style={{textAlign: "center"}}>
                        <div style={{opacity: "60%"}}>
                          Posts
                        </div>
                        <Text>
                          {notifications && notifications.length}
                        </Text>
                      </Col>
                      <Col span={9}>
                        <Row gutter={10}>
                          <Col span={4}>
                            {/*<Avatar src={data?.posts[0]?.user_id?.avatar} size={35} alt='avatar'/>*/}
                          </Col>
                          <Col span={20}>
                            <Text ellipsis={true} className="title">
                              {notifications && notifications[0]?.title}
                            </Text>
                            <div>
                              <span
                                className="dateTime">{moment(notifications && notifications[0]?.created_at).format('LLL')}</span>
                              <span>{notifications?.posts && notifications[0].user_id.user}</span>
                            </div>
                            <div>
                              <Tag color={"red"}>
                                Thông báo
                              </Tag>
                            </div>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Card>
                  <Card style={{marginTop: 15}}>
                    <Row>
                      <Col span={9}>
                        <div style={{display: "flex", marginTop: 10}}>
                          <FolderOpenOutlined style={{fontSize: 30, color: "#009DA6"}}/>
                          <Link to={`/forum/listFeedbacks`}>
                          <Title level={3} style={{marginLeft: 10, color: "#F26F27"}}>Góp ý</Title>
                          </Link>
                        </div>
                      </Col>
                      <Col span={3} style={{textAlign: "center"}}>
                        <div style={{opacity: "60%"}}>
                          Posts
                        </div>
                        <Text>
                          {feedbacks?.data && feedbacks?.data.length}
                        </Text>
                      </Col>
                      <Col span={9}>
                        <Row gutter={10}>
                          <Col span={4}>
                          </Col>
                          <Col span={20}>
                            <Text ellipsis={true} className="title">
                              {feedbacks?.data && feedbacks?.data[0]?.title}
                            </Text>
                            <div>
                              <span
                                className="dateTime">{moment(feedbacks?.data && feedbacks?.data[0]?.created_at).format('LLL')}</span>
                              {/*<span>{feedbacks?.data && feedbacks?.data[0].user_id.user}</span>*/}
                            </div>
                            <div>
                              <Tag color={"blue"}>
                                Góp ý
                              </Tag>
                            </div>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Card>
                </Card>

              </div>
              <Card type="inner" title="Bài viết theo danh mục">
                {getPostsByCate && getPostsByCate?.data.map((item, index) => {
                  return (
                    <div key={index}>
                      <CateHomePage filterPostByIdCate={item}/>
                    </div>
                  )
                })}
              </Card>
            </div>
          </Col>
          <Col span={8} style={{ marginTop: 10 }}>
            <Row gutter={[0, 30]}>
              <Col span={24}>
                <div style={{ marginTop: 30 }}>
                  <Card type="inner" title="Bài viết mới nhất">
                    {postTrending && postTrending.map((data, index) => {
                      const color = data?.type.type === "Thắc mắc" ? "#2db7f5" : data?.type.type === "Câu hỏi" ? "#f50" : data?.type.type === "Thảo luận" ? "#108ee9" : "#87d068"
                      if (!postTrending) {
                        return <Skeleton/>
                      }
                      return (
                        <div key={index} style={{ marginTop: 20, marginBottom: 20 }}>
                          <Card>
                            <Row gutter={10}>
                              <Col span={5}>
                                <Avatar src={data?.user.avatar} size={35} alt='avatar' />
                              </Col>
                              <Col span={19}>
                                <Link to={`/forum/detailPost/${data.id}`}>
                                  <Text ellipsis={true} className="title">{data.title}</Text>
                                </Link>
                                <div>
                                  <Tag color={color}>
                                    {data?.type.type}
                                  </Tag>
                                  <span className="dateTime">{moment(data?.created_at).format('LLL')}</span>
                                  <span>{data?.user.user}</span>
                                </div>
                              </Col>
                            </Row>
                          </Card>
                        </div>)
                    })}
                  </Card>
                </div>
              </Col>
              <Col span={24}>
                <Card type="inner" title="Bài viết nổi bật">
                  {postLatest && postLatest.map((data, index) => {
                    const color = data?.type.type === "Thắc mắc" ? "#2db7f5" : data?.type.type === "Câu hỏi" ? "#f50" : data?.type.type === "Thảo luận" ? "#108ee9" : "#87d068"
                    if (!postLatest) {
                      return <Skeleton/>
                    }
                    return (<div key={index} style={{marginTop: 20, marginBottom: 20}}>
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
                              <Tag color={color}>
                                {data?.type.type}
                              </Tag>
                              <span className="dateTime">{moment(data.created_at).format('LLL')}</span>
                              <span>{data.user.user}</span>
                            </div>
                          </Col>
                        </Row>
                      </Card>
                    </div>)
                  })}
                </Card>
              </Col>
              <Col span={24} style={{ marginBottom: 10 }}>
                <Title level={3}>Tags</Title>
                <Space size={[0, 8]} wrap>
                  {options && options.map((item, index) => {
                    return (<div key={index}>
                      <Tag style={{padding: 10}} color="#55acee">
                        {item.label}
                      </Tag>
                    </div>)
                  })}
                </Space>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>)
}

export default ForumPage;
