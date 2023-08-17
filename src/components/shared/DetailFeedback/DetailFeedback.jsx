import {Link, useNavigate, useParams} from "react-router-dom";
import {
  useGetFeedbackQuery,
  useGetPostsLatestQuery, useRemoveFeedbackMutation,
  useSearchPostQuery,
  useUpdateFeedbackMutation
} from "../../../services/forum/index.jsx";
import {
  AutoComplete, Avatar,
  Breadcrumb,
  Button,
  Card,
  Col,
  Divider, message,
  Modal, notification,
  Pagination, Popconfirm,
  Popover,
  Rate,
  Row,
  Skeleton, Space,
  Tag, Typography
} from "antd";
import Loading from "../Spin/index.jsx";
import {FieldTimeOutlined, FileOutlined, HomeOutlined, MoreOutlined, UserOutlined} from "@ant-design/icons";
import moment from "moment/moment.js";
import {handleDisplayCkeditor} from "../../../common/handleDisplayCkeditor.jsx";
import {FaEdit, FaRocketchat, FaUserCheck} from "react-icons/fa";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {useState} from "react";
import {useProfileQuery} from "../../../services/users/index.jsx";
import {useGetCategoryQuery} from "../../../services/courses/index.jsx";
import Logo from "../../../../public/images/logo_ong_vang.jpg";

const DetailFeedback = () => {
  const [keyword, setKeyword] = useState('');
  const {Title, Text, Paragraph} = Typography;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataCKEditor, setDataCKEditor] = useState('');
  const [api, contextHolder] = notification.useNotification();
  const [openOptions, setOpenOptions] = useState(false)

  const {id} = useParams()
  const {data: feedback} = useGetFeedbackQuery(id)
  const {data: dataSearch} = useSearchPostQuery(keyword);
  const {data: postLatest} = useGetPostsLatestQuery()
  const {data: user} = useProfileQuery()
  const {data: categories} = useGetCategoryQuery()
  const [updateFeedback] = useUpdateFeedbackMutation(id)
  const [removeFeedback] = useRemoveFeedbackMutation(id)

  const routes = [{
    path: '/', breadcrumbName: (<Link to={"/forum"}>
      <div style={{display: "flex", alignItems: "center"}}>
        <HomeOutlined/>
        <span style={{marginLeft: 10}}>Forums</span>
      </div>
    </Link>)
  },
    {
      path: '/forum/listFeedback', breadcrumbName: (<div style={{display: "flex", alignItems: "center", marginTop: 3}}>
        <FileOutlined/>
        <span style={{marginLeft: 5}}>ListPost</span>
      </div>),
    }, {
      path: '',
      breadcrumbName: (<div style={{display: "flex", alignItems: "center", marginTop: 3}}>
        <FileOutlined/>
        <span style={{marginLeft: 5}}>PostDetail</span>
      </div>),
    },];

  function itemRender(route, params, routes, paths) {
    const last = routes.indexOf(route) === routes.length - 1;
    return last ? (<span>{route.breadcrumbName}</span>) : (<Link to={paths.join('/')}>{route.breadcrumbName}</Link>);
  }


  const showModal = () => {
    if (feedback.data) {
      setDataCKEditor(feedback.data.content)
    }
    setIsModalOpen(true)
    setOpenOptions(false)
  };
  const handleOpenChange = (newOpen) => {
    setOpenOptions(newOpen);
  };

  const handleUpdateFeedback = async () => {
    const {data} = await updateFeedback({content: dataCKEditor, user_id: user, id: id})
    if (data.status) {
      openNotificationWithIcon('success', `Chỉnh sửa thành công!!`, 'Chỉnh sửa bài viết')
      setIsModalOpen(false)
      setDataCKEditor('')
    }
  }
  const openNotificationWithIcon = (type, description, message) => {
    api[type]({
      message: message, description: description,
    });
  };
  const contentPopover = () => {
    const navigate = useNavigate()
    const confirmRemovePost = async () => {
      const {data} = await removeFeedback(id)
      if (data.status) {
        navigate("/forum")
      }
      message.success('Xóa thành công');
    };

    return (
      <div style={{display: "flex", justifyContent: "space-between"}}>
        <Button
          style={{marginLeft: 5}}
          type="primary"
          icon={<FaRocketchat/>}
          onClick={() => showModal()}
        >
          Sửa
        </Button>
        <Popconfirm
          title="Xóa bài viết"
          description="Bạn có chắc chắn muốn xóa bài viết này?"
          onConfirm={confirmRemovePost}
          okText="Xóa"
          cancelText="Hủy"
        >
          <Button
            size="middle"
            type="primary"
            danger
            icon={<FaEdit/>}
          >
            Delete
          </Button>
        </Popconfirm>
      </div>
    )
  }

  return (
    <div style={{marginTop: 10}}>
      <div className="header_forum">
        <div className="header_search">
          <AutoComplete
            options={[{
              label: (
                <Loading size='small'>
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
          <Title style={{marginLeft: 50, marginTop: 10}} level={5}>Tìm kiếm phổ biến : Backend, Frontend </Title>
        </div>
      </div>
      <div className="breadcrumb_header">
        <div>
          <Breadcrumb items={routes} itemRender={itemRender}/>
        </div>
        <div style={{display: "flex", alignItems: "center"}}>
          <FieldTimeOutlined style={{fontSize: 20}}/>
          <span style={{marginLeft: 10}}>{moment(feedback?.data?.created_at).format('LLL')}</span>
        </div>
      </div>
      <div className="wrapper__blog--page">
        {contextHolder}
        {feedback?.data && (
          <Row gutter={20}>
            <Col span={16}>
              <div className="card_title">
                <Tag style={{marginTop: 10, marginBottom: 10}} color={"green"}>
                  Góp ý
                </Tag>
                <div style={{display: "flex", justifyContent: "space-between"}}>
                  <Title level={3}>{feedback?.data?.title || "Tiêu đề bài viết"}</Title>
                  <Popover
                    placement="left"
                    title="Tùy chọn"
                    trigger="click"
                    open={openOptions}
                    content={contentPopover}
                    onOpenChange={handleOpenChange}
                  >
                    <MoreOutlined style={{fontSize: 30}}/>
                  </Popover>
                </div>
                <div style={{display: "flex", alignItems: "center", marginTop: 10, marginBottom: 5}}>
                  <FieldTimeOutlined/>
                  <span className="dateTime">{moment(feedback?.data?.created_at).format('LLL')}</span>
                  <div style={{display: "flex", alignItems: "center"}}>
                    <UserOutlined/>
                    <span style={{marginLeft: 5}}>{feedback?.data?.name || "anonymous"}</span>
                  </div>
                </div>
                <Card>
                  <Row gutter={15}>
                    <Col span={24}>
                      <span
                        style={{lineHeight: 2.5, fontWeight: 500, fontSize: 20}}
                        dangerouslySetInnerHTML={{__html: handleDisplayCkeditor(feedback?.data?.content)}}
                      ></span>
                      <div style={{display: "flex", justifyContent: "space-between"}}>
                        <div style={{marginTop: 10}}>
                          <Modal style={{zIndex: 10}} width={"50%"} title={"Sửa góp ý"}
                                 onOk={() => handleUpdateFeedback()}
                                 onCancel={() => setIsModalOpen(false)} open={isModalOpen}>
                            <CKEditor
                              editor={ClassicEditor}
                              data={dataCKEditor}
                              onChange={(event, editor) => {
                                const data = editor.getData();
                                setDataCKEditor(data)
                              }}
                            />
                          </Modal>
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <Divider>Lượt xem</Divider>
                  <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                    <div style={{display: "flex", alignItems: "center"}}>
                      <FaUserCheck size={20} color="#009DA6"/>
                      <span style={{marginLeft: 10}}>Có dangthais, khanhnb và 20 người khác đã xem</span>
                    </div>
                    <div style={{alignItems: "center"}}>
                      <Text>Trung bình đánh giá</Text>
                      <div>
                        <Rate disabled allowHalf defaultValue={4.5}/>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </Col>
            <Col span={8}>
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
              <div style={{marginTop: 10}}>
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
                  {/*<div style={{marginTop: 20}}>*/}
                  {/*  <Title level={3}>Tags</Title>*/}
                  {/*  <Space size={[0, 8]} wrap>*/}
                  {/*    {options && options.map((item, index) => {*/}
                  {/*      return (*/}
                  {/*        <div key={index}>*/}
                  {/*          <Tag style={{padding: 10}} color={item.color}>*/}
                  {/*            {item.label}*/}
                  {/*          </Tag>*/}
                  {/*        </div>*/}
                  {/*      )*/}
                  {/*    })}*/}
                  {/*  </Space>*/}
                  {/*</div>*/}
                </Space>
              </div>
            </Col>
          </Row>)}
      </div>
    </div>
  )
}

export default DetailFeedback
