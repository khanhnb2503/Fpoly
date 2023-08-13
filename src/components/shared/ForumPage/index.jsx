import {
  Avatar,
  Select,
  Breadcrumb,
  Button,
  Card,
  Col,
  Pagination,
  Popover,
  Row,
  Typography,
  Modal,
  Divider, Input, notification, Space,Tag,
  Image
} from "antd";
import {useState} from "react";
import {CardForum} from "../CardForum/index.jsx";
import SkeletonPage from "../SkeletonPage/index.jsx";
import {FaEdit, FaRocketchat} from "react-icons/fa";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {
  useAddPostMutation,
  useGetPostsLatestQuery,
  useGetPostsQuery,
  useGetPostsTrendingQuery
} from "../../../services/forum/index.jsx";
import {useGetCategoryQuery} from "../../../services/courses/index.jsx";
import {FieldTimeOutlined, FolderOpenOutlined, HomeOutlined} from "@ant-design/icons";
import moment from "moment";
import {Link} from "react-router-dom"

function ForumPage() {
  const {Title, Text, Link} = Typography;
  const [pageNumber, setPageNumber] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataCKEditor, setDataCKEditor] = useState('')
  const [titlePost, setTitlePost] = useState('')
  const [idType, setIdType] = useState(1);
  const [idCategory, setIdCategory] = useState(1);
  const [api, contextHolder] = notification.useNotification();

  const gridStyle = {
    width: "100%",
  }
  const {data: posts, isLoading} = useGetPostsQuery(pageNumber)

  const {data: postTrending} = useGetPostsTrendingQuery()

  const {data: postLatest} = useGetPostsLatestQuery()

  const [addPost] = useAddPostMutation()

  const {data: categories} = useGetCategoryQuery()

  console.log(posts)
  const filterPostByIdCate = categories?.data.map((item) => {
    const data = posts?.filter(post => post.category.id === item.id)
    return {
      ...item,
      posts: data
    }
  })

  const showModal = () => {
    setIsModalOpen(true);
  };

  const optionsCategory = categories && categories?.data.map((item) => {
    return {
      value: item.id,
      label: item.name
    }
  })
  const options = [
    {
      value: 1,
      label: 'Thắc mắc',
    },
    {
      value: 2,
      label: 'Câu hỏi',
    },
    {
      value: 3,
      label: 'Thảo luận',
    },
    {
      value: 4,
      label: 'Giải trí',
    },
  ]

  const openNotificationWithIcon = (type) => {
    api[type]({
      message: 'Tạo bài viết',
      description: "Tạo bài viết thành công",
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
  };

  const handleAddPost = async () => {
    const dataPost = {
      title: titlePost,
      content: dataCKEditor,
      type: idType,
      category_id: idCategory
    }
    const {data} = await addPost(dataPost)
    if (data.status) {
      openNotificationWithIcon('success')
      setDataCKEditor('')
      setTitlePost('')
      setIsModalOpen(false)
    }
  }
  return (
    <div style={{marginTop: 10}}>
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
          <Breadcrumb items={[
            {
              title: (
                <div style={{display: "flex", alignItems: "center"}}>
                  <HomeOutlined style={{fontSize: 20}}/>
                  <span style={{marginLeft: 10, fontSize: 20}}>Home</span>
                </div>
              )
            },
          ]}/>
        </div>
        <div style={{display: "flex", alignItems: "center"}}>
          <FieldTimeOutlined style={{fontSize: 20}}/>
          <span style={{marginLeft: 10}}>{moment(new Date()).format('LLL')}</span>
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
                             src={"https://html-template.spider-themes.net/docy/img/home_support/answer.png"}/>
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
                    icon={<FaEdit/>}
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
                      width: 120,
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
                      width: 120,
                    }}
                    onChange={(value) => handleChangeCategory(value)}
                    options={optionsCategory}
                  />
                </Col>
                <Title level={4}>Tiêu đề</Title>
                <Input placeholder="Tiêu đề" onChange={(e) => handleChangeTitle(e)}/>
              </Row>
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
            <div style={{marginTop: 30}}>
              <Card type="inner" title="Forum">
                {filterPostByIdCate && filterPostByIdCate.map((data, index) => {
                  return (
                    <div key={index} style={{marginTop: 20, marginBottom: 20}}>
                      <Card>
                        <Row>
                          <Col span={9}>
                            <div style={{display: "flex", marginTop: 10}}>
                              <FolderOpenOutlined style={{fontSize: 30, color: "#009DA6"}}/>
                              <Link to={`listPosts/${data.id}`}>
                                <Title level={3} style={{marginLeft: 10, color: "#F26F27"}}>{data.name}</Title>
                              </Link>
                            </div>
                          </Col>
                          <Col span={3} style={{textAlign: "center"}}>
                            <div style={{opacity: "60%"}}>
                              Posts
                            </div>
                            <Text>
                              {data?.posts && data?.posts.length}
                            </Text>
                          </Col>
                          <Col span={3} style={{textAlign: "center"}}>
                            <div style={{opacity: "60%"}}>
                              Comments
                            </div>
                            <Text>
                              {data?.posts && data?.posts[0]?.comments.length}
                            </Text>
                          </Col>
                          <Col span={9}>
                            <Row gutter={10}>
                              <Col span={4}>
                                <Avatar src={data?.posts[0]?.user_id.avatar || Logo} size={35} alt='avatar'/>
                              </Col>
                              <Col span={19}>
                                <Text ellipsis={true} className="title">
                                  {data?.posts && data?.posts[0]?.title}
                                </Text>
                                <div>
                                  <span className="dateTime">{
                                    moment(data?.posts[0]?.created_at).format('LLL')
                                  }</span>
                                  <span>{data?.posts[0]?.user_id.user}</span>
                                </div>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </Card>
                    </div>
                  )
                })}
              </Card>
            </div>
            {/*  {filterPostByIdCate && filterPostByIdCate.map((data, index) => {*/}
            {/*    return (*/}
            {/*      <div key={index} style={{marginTop: 20, marginBottom: 20}}>*/}
            {/*        <Card title={data.name} className="background">*/}
            {/*          {data.posts && data.posts.map((item, index) => {*/}
            {/*            return (*/}
            {/*              <div key={index}>*/}
            {/*                <CardForum data={item} isLoading={isLoading}/>*/}
            {/*              </div>*/}
            {/*            )*/}
            {/*          })}*/}
            {/*        </Card>*/}
            {/*      </div>*/}
            {/*    )*/}
            {/*  })}*/}
            {/*</div>*/}
          </Col>
          <Col span={8} style={{marginTop: 10}}>
            <Row gutter={[0, 30]}>
              <Col span={24}>
                <div style={{marginTop: 30}}>
                  <Card type="inner" title="Bài viết nổi bật">
                    {postTrending && postTrending.map((data, index) => {
                      return (
                        <div key={index} style={{marginTop: 20, marginBottom: 20}}>
                          <Card>
                            <Row gutter={10}>
                              <Col span={5}>
                                <Avatar src={data.user_id.avatar} size={35} alt='avatar'/>
                              </Col>
                              <Col span={19}>
                                <Text ellipsis={true} className="title">{data.title}</Text>
                                <div>
                                  <span className="dateTime">06/08/2023</span>
                                  <span>{data.user_id.user}</span>
                                </div>
                              </Col>
                            </Row>
                          </Card>
                        </div>
                      )
                    })}
                  </Card>
                </div>
              </Col>
              <Col span={24}>
                <Card type="inner" title="Bài viết nổi bật">
                  {postLatest && postLatest.map((data, index) => {
                    return (
                      <div key={index} style={{marginTop: 20, marginBottom: 20}}>
                        <Card>
                          <Row gutter={10}>
                            <Col span={5}>
                              <Avatar src={data.user_id.avatar} size={35} alt='avatar'/>
                            </Col>
                            <Col span={19}>
                              <Text ellipsis={true} className="title">{data.title}</Text>
                              <div>
                                <span className="dateTime">06/08/2023</span>
                                <span>{data.user_id.user}</span>
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
              </Col>
            </Row>ss

            {/*<Card type="inner" title="Bài viết mới nhất">*/}
            {/*  {postTrending && postTrending.map((post, index) => {*/}
            {/*    return (*/}
            {/*      <div style={{marginTop: 20, marginBottom: 20}} key={index}>*/}
            {/*        <Row>*/}
            {/*          <Col span={5}>*/}
            {/*            <Avatar src={Logo} size={35} alt='avatar'/>*/}
            {/*          </Col>*/}
            {/*          <Col span={19}>*/}
            {/*            <Text className="title">{post.title}</Text>*/}
            {/*            <div>*/}
            {/*              <span className="dateTime"></span>*/}
            {/*              <span>Dangthais</span>*/}
            {/*            </div>*/}
            {/*          </Col>*/}
            {/*        </Row>*/}
            {/*      </div>*/}
            {/*    )*/}
            {/*  })}*/}
            {/*</Card>*/}

          </Col>

        </Row>
      </div>
    </div>
  )
}

export default ForumPage;
