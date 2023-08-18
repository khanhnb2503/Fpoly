import {
  Avatar,
  Breadcrumb,
  Button,
  Card,
  Col,
  Divider,
  Image,
  message,
  Modal,
  Popconfirm,
  Rate,
  Row,
  Typography,
  notification,
  Skeleton, Tag, Space, Input, Pagination, Popover, AutoComplete
} from "antd";
import {FaEdit, FaRocketchat, FaUserCheck} from "react-icons/fa";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Logo from "../../../../public/images/logo_ong_vang.jpg";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {
  useAddCommentMutation,
  useAddStarPostMutation,
  useGetPostQuery, useGetPostsLatestQuery,
  useRemoveCommentMutation, useRemovePostMutation,
  useReplyCommentMutation, useSearchPostQuery,
  useUpdateCommentMutation, useUpdatePostMutation
} from "../../../services/forum/index.jsx";
import {FieldTimeOutlined, FileOutlined, HomeOutlined, MoreOutlined, UserOutlined} from "@ant-design/icons";
import moment from "moment";
import {handleDisplayCkeditor} from "../../../common/handleDisplayCkeditor.jsx";
import {useProfileQuery} from "../../../services/users/index.jsx";
import {useGetCategoryQuery} from "../../../services/courses/index.jsx";
import {useSearchQuery} from "../../../services/search/index.jsx";
import Loading from "../Spin/index.jsx";

const DetailPostForum = () => {
  const {Title, Text, Paragraph} = Typography;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataCKEditor, setDataCKEditor] = useState('');
  const [disable, setDisable] = useState(false);
  const [titleModal, setTitleModal] = useState('');
  const [api, contextHolder] = notification.useNotification();
  const [idComment, setIdComment] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [openOptions, setOpenOptions] = useState(false)
  const [keyword, setKeyword] = useState('');

  const {id} = useParams()
  const {data: post, isLoading} = useGetPostQuery(id)
  const [removeComment] = useRemoveCommentMutation()
  const {data: user} = useProfileQuery()
  const [postData, setPostData] = useState(post);
  const [replyComment] = useReplyCommentMutation()
  const {data: postLatest} = useGetPostsLatestQuery()
  const {data: categories} = useGetCategoryQuery()
  const {data: dataSearch} = useSearchPostQuery(keyword);

  useEffect(() => {
    if (post) {
      setPostData(post)
    }
  }, [isLoading])

  const [addStarPost] = useAddStarPostMutation()

  const [removePost] = useRemovePostMutation()

  const [addComment] = useAddCommentMutation()

  const [updateComment] = useUpdateCommentMutation()

  const [updatePost] = useUpdatePostMutation()

  const routes = [{
    path: '/', breadcrumbName: (<Link to={"/forum"}>
      <div style={{display: "flex", alignItems: "center"}}>
        <HomeOutlined/>
        <span style={{marginLeft: 10}}>Forums</span>
      </div>
    </Link>)
  },
    {
      path: '/forum/listPost/1', breadcrumbName: (<div style={{display: "flex", alignItems: "center", marginTop: 3}}>
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

  const options = [
    {
      value: 1, label: 'Thắc mắc', color: "#2db7f5"
    }, {
      value: 2, label: 'Câu hỏi', color: "#f50"
    }, {
      value: 3, label: 'Thảo luận', color: "#108ee9"
    }, {
      value: 4, label: 'Giải trí', color: "#87d068"
    },]

  function itemRender(route, params, routes, paths) {
    const last = routes.indexOf(route) === routes.length - 1;
    return last ? (<span>{route.breadcrumbName}</span>) : (<Link to={paths.join('/')}>{route.breadcrumbName}</Link>);
  }

  const handleOpenChange = (newOpen) => {
    setOpenOptions(newOpen);
  };
  const openNotificationWithIcon = (type, description, message) => {
    api[type]({
      message: message, description: description,
    });
  };
  const showModal = (title) => {
    setTitleModal(title)
    if (title === "Sửa bài viết") {
      setDataCKEditor(postData?.data?.content)
    } else {
      setDataCKEditor('')
    }
    setIsModalOpen(true)
    setOpenOptions(false)
  };
  const handleCommentPost = async () => {
    try {
      if (titleModal === "Bình luận") {
        const {data} = await addComment({content: dataCKEditor, post_id: id})
        if (data.status) {
          openNotificationWithIcon('success', `Bình luận  thành công!!`, 'Bình luận bài viết')
        }
      }
      if (titleModal === "Trả lời") {
        const {data} = await replyComment({content: dataCKEditor, parent_id: idComment, post_id: id})
        if (data.status) {
          openNotificationWithIcon('success', `Trả lời thành công!!`, 'Trả lời bình luận')
        }
      }
      if (titleModal === "Chỉnh sửa") {
        const {data} = await updateComment({content: dataCKEditor, id: idComment})
        if (data.status) {
          openNotificationWithIcon('success', `Chỉnh sửa thành công!!`, 'Chỉnh sửa bài viết')
        }
      }
      if (titleModal === "Sửa bài viết") {
        const {data} = await updatePost({content: dataCKEditor, id: idComment})
        if (data.status) {
          openNotificationWithIcon('success', `Chỉnh sửa thành công!!`, 'Chỉnh sửa bài viết')
        }
      }
    } catch (e) {
      // openNotificationWithIcon('error', `Bình luận thất bại!`, 'Bình luận bài viết')
    } finally {
      setIsModalOpen(false)
      setDataCKEditor('')
    }
  }
  const handleCountStar = async (star) => {
    const {data} = await addStarPost({id: id})
    if (data.code === 200) {
      openNotificationWithIcon('success', `Bạn đã đánh giá ${star} sao cho bài viết này!`, 'Đánh giá bài viết')
    }
  }
  const onChangePage = (page) => {
    setPageNumber(page);
  };
  const contentPopover = () => {
    const navigate = useNavigate()
    const confirmRemovePost = async () => {
      const {data} = await removePost(id)
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
          onClick={() => showModal("Sửa bài viết")}
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
  const CommentBox = ({comment}) => {
    const confirm = async () => {
      const {data} = await removeComment(comment?.id)
      if (data.status) {
        message.success('Xóa thành công');
      }
    };
    return (
      <div style={{marginTop: 30}}>
        <Card>
          <Row gutter={10} style={{alignItems: "center", justifyContent: "space-between"}}>
            <Col span={3}>
              <div style={{textAlign: "center"}}>
                <Avatar src={Logo} size={35} alt='avatar'/>
                <div>{comment?.user_id.name}</div>
              </div>
            </Col>
            <Col span={14}>
              <span
                style={{fontSize: 20, fontWeight: 500}}
                dangerouslySetInnerHTML={{__html: handleDisplayCkeditor(comment?.content)}}
              >
              </span>
            </Col>
            <Col span={7} style={{display: "flex"}}>
              <Row>
                {user?.id === comment.user_id ? (<>
                  <Col span={14}>
                    <Button
                      size="small"
                      type="primary"
                      icon={<FaEdit/>}
                      onClick={() => {
                        showModal("Chỉnh sửa")
                        setIdComment(comment.id)
                      }}
                    >
                      Chỉnh sửa
                    </Button>
                  </Col>
                  <Col span={5}>
                    <Popconfirm
                      title="Xóa bình luận"
                      description="Bạn có chắc chắn muốn xóa bình luận này?"
                      onConfirm={confirm}
                      okText="Xóa"
                      cancelText="Hủy"
                    >
                      <Button
                        size="small"
                        type="primary"
                        danger
                        icon={<FaEdit/>}
                      >
                        Delete
                      </Button>
                    </Popconfirm>
                  </Col>
                </>) : (<>
                  <Button
                    size="small"
                    type="primary"
                    icon={<FaRocketchat/>}
                    onClick={() => {
                      showModal("Trả lời")
                      setIdComment(comment.id)
                    }}
                  >
                    Trả lời
                  </Button>
                </>)}
              </Row>
            </Col>
          </Row>
          <div style={{marginLeft: 50}}>
            {
              comment.chillden && comment.chillden.map(reply => {
                return (
                  <Row gutter={10} style={{alignItems: "center", justifyContent: "space-between", marginTop: 15}}>
                    <Col span={2}>
                      <div style={{textAlign: "center"}}>
                        <Avatar src={Logo} size={35} alt='avatar'/>
                        <div>{user?.name}</div>
                      </div>
                    </Col>
                    <Col span={14}>
                       <span
                         style={{fontSize: 15, fontWeight: 500}}
                         dangerouslySetInnerHTML={{__html: handleDisplayCkeditor(reply?.content)}}
                       >
                        </span>
                    </Col>
                    <Col span={7}>
                      <Row>
                        {user?.id === comment.user_id ? (<>
                          <Col span={14}>
                            <Button
                              size="small"
                              type="primary"
                              icon={<FaEdit/>}
                              onClick={() => {
                                showModal("Chỉnh sửa")
                                setIdComment(comment.id)
                              }}
                            >
                              Chỉnh sửa
                            </Button>
                          </Col>
                          <Col span={5}>
                            <Popconfirm
                              title="Xóa bình luận"
                              description="Bạn có chắc chắn muốn xóa bình luận này?"
                              onConfirm={confirm}
                              okText="Xóa"
                              cancelText="Hủy"
                            >
                              <Button
                                size="small"
                                type="primary"
                                danger
                                icon={<FaEdit/>}
                              >
                                Delete
                              </Button>
                            </Popconfirm>
                          </Col>
                        </>) : (<>
                          <Button
                            size="small"
                            type="primary"
                            icon={<FaRocketchat/>}
                            onClick={() => {
                              showModal("Trả lời")
                              setIdComment(comment.id)
                            }}
                          >
                            Trả lời
                          </Button>
                        </>)}
                      </Row>
                    </Col>
                  </Row>
                )
              })
            }
          </div>
        </Card>
      </div>
    )
  }
  const color = postData?.data && postData?.type?.type === "Thắc mắc" ? "#2db7f5" : postData?.type?.type === "Câu hỏi" ? "#f50" : postData?.type?.type === "Thảo luận" ? "#108ee9" : "#87d068"
  const postType = postData?.data === 1 ? "Thắc mắc" : postData?.data === 2 ? "Câu Hỏi" : postData?.data === 2 ? "Thảo luận" : "Giải trí"
  return (
    <div style={{marginTop: 10}}>
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
          <Title style={{marginLeft: 50, marginTop: 10}} level={5}>Tìm kiếm phổ biến : Backend, Frontend </Title>
        </div>
      </div>
      <div className="breadcrumb_header">
        <div>
          <Breadcrumb items={routes} itemRender={itemRender}/>
        </div>
        <div style={{display: "flex", alignItems: "center"}}>
          <FieldTimeOutlined style={{fontSize: 20}}/>
          <span style={{marginLeft: 10}}>{moment(postData?.created_at).format('LLL')}</span>
        </div>
      </div>
      <div className="wrapper__blog--page">
        {contextHolder}
        {postData && (
          <Row gutter={20}>
            <Col span={16}>
              <div className="card_title">
                <Tag style={{marginTop: 10, marginBottom: 10}} color={color}>
                  {postType}
                </Tag>
                <div style={{display: "flex", justifyContent: "space-between"}}>
                  <Title level={3}>{post?.title}</Title>
                  <Popover
                    placement="left"
                    title="Tùy chọn"
                    trigger="click"
                    open={openOptions}
                    content={contentPopover}
                    onOpenChange={handleOpenChange}
                  >
                    {user?.id === postData.user.id && (
                      <MoreOutlined style={{fontSize: 30}}/>
                    )}
                  </Popover>
                </div>
                <div style={{display: "flex", alignItems: "center", marginTop: 10, marginBottom: 5}}>
                  <FieldTimeOutlined/>
                  <span className="dateTime">{moment(post?.created_at).format('LLL')}</span>
                  <div style={{display: "flex", alignItems: "center"}}>
                    <UserOutlined/>
                    <span style={{marginLeft: 5}}>{user?.name || "anonymous"}</span>
                  </div>
                </div>
                <Card>
                  <Row gutter={15}>
                    <Col span={24}>
                      <span
                        style={{lineHeight: 2.5, fontWeight: 500, fontSize: 20}}
                        dangerouslySetInnerHTML={{__html: handleDisplayCkeditor(post?.content)}}
                      ></span>
                      <div style={{display: "flex", justifyContent: "space-between"}}>
                        <Title level={3}>
                          Đánh giá bài viết
                        </Title>
                        <div style={{marginTop: 10}}>
                          {user?.id && (
                            <Button
                              size="large"
                              type="primary"
                              icon={<FaRocketchat/>}
                              onClick={() => showModal("Bình luận")}
                            >
                              Comment
                            </Button>
                          )}

                          <Modal style={{zIndex: 10}} width={"50%"} title={titleModal} onOk={() => handleCommentPost()}
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
                      <div>
                        <Rate disabled={disable} onChange={(item) => handleCountStar(item)} allowHalf
                              defaultValue={2.5}/>
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
              <div>
                {post?.comments.length > 0 && post?.comments.map((item, index) => {
                  return (
                    <div key={index}>
                      <CommentBox comment={item}/>
                    </div>)
                })}
              </div>
              <div style={{marginLeft: "40%", marginBottom: 20}}>
                {post?.comments.length > 5 && (
                  <Pagination current={pageNumber} onChange={onChangePage} total={post?.comments.length}/>
                )}
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
              </div>
            </Col>
          </Row>)}
      </div>
    </div>

  )
}

export default DetailPostForum
