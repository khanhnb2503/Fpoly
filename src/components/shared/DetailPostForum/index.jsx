import {
  Avatar, Breadcrumb, Button, Card, Col, Divider, Image, message, Modal, Popconfirm, Rate, Row, Typography, notification
} from "antd";
import {FaEdit, FaRocketchat, FaUserCheck} from "react-icons/fa";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Logo from "../../../../public/images/logo_ong_vang.jpg";
import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {
  useAddCommentMutation,
  useAddStarPostMutation,
  useGetPostQuery,
  useRemoveCommentMutation,
  useReplyCommentMutation,
  useUpdateCommentMutation
} from "../../../services/forum/index.jsx";
import {FieldTimeOutlined, FileOutlined, HomeOutlined, UserOutlined} from "@ant-design/icons";
import moment from "moment";
import {handleDisplayCkeditor} from "../../../common/handleDisplayCkeditor.jsx";
import {useProfileQuery} from "../../../services/users/index.jsx";
import {forEach} from "react-bootstrap/ElementChildren";

const DetailPostForum = () => {
  const {Title, Text, Paragraph} = Typography;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataCKEditor, setDataCKEditor] = useState('');
  const [disable, setDisable] = useState(false);
  const [titleModal, setTitleModal] = useState('');
  const [api, contextHolder] = notification.useNotification();
  const [idComment, setIdComment] = useState();

  const {id} = useParams()
  const {data: post, isLoading} = useGetPostQuery(id)
  const [removeComment] = useRemoveCommentMutation()
  const {data: user} = useProfileQuery()
  const [postData, setPostData] = useState(post);
  const [replyComment] = useReplyCommentMutation()

  console.log(isLoading)
  useEffect(() => {
    if (post) {
        setPostData(post)
    }
  }, [isLoading])

  const filterCommentReply = post?.data.comments.filter(item => item.parent_id)
  const filterCommentByPost = post?.data.comments.filter(comment => {
    const result = filterCommentReply.filter(item => item.parent_id === comment.id)
    console.log(result)
    return {
      ...comment,
      reply: result
    }
  })

  console.log(filterCommentByPost)
  const [addStarPost] = useAddStarPostMutation()

  const [addComment] = useAddCommentMutation()

  const [updateComment] = useUpdateCommentMutation()

  const gridStyle = {
    width: "100%",
  }
  const routes = [{
    path: '/', breadcrumbName: (<Link to={"/forum"}>
      <div style={{display: "flex", alignItems: "center"}}>
        <HomeOutlined/>
        <span style={{marginLeft: 10}}>Forums</span>
      </div>
    </Link>)
  }, {
    path: '/forum/detailPost/:id', breadcrumbName: (<div style={{display: "flex", alignItems: "center", marginTop: 3}}>
      <FileOutlined/>
      <span style={{marginLeft: 5}}>PostDetail</span>
    </div>),
  },];

  function itemRender(route, params, routes, paths) {
    const last = routes.indexOf(route) === routes.length - 1;
    return last ? (<span>{route.breadcrumbName}</span>) : (<Link to={paths.join('/')}>{route.breadcrumbName}</Link>);
  }

  const openNotificationWithIcon = (type, description, message) => {
    api[type]({
      message: message, description: description,
    });
  };
  const showModal = (title) => {
    setTitleModal(title)
    setIsModalOpen(true);
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
        console.log(idComment)
        const {data} = await replyComment({content: dataCKEditor, parent_id: idComment, post_id: id})
        console.log(idComment)
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
  const CommentBox = ({comment}) => {
    const confirm = async () => {
      const {data} = await removeComment(comment?.id)
      if (data.status) {
        message.success('Xóa thành công');
      }
    };
    return (
      <div style={{marginTop: 30}}>
        {comment.parent_id ? (
          <>
            <Card style={{marginTop: 20, marginBottom: 20}} className="background">
              <Row gutter={10} style={{alignItems: "center", justifyContent: "space-between"}}>
                <Col span={3}>
                  <div style={{textAlign: "center"}}>
                    <Avatar src={Logo} size={35} alt='avatar'/>
                    <div>{user?.name}</div>
                  </div>
                </Col>
                <Col span={14}>
                  <span>
                    {`@${user?.name}`}
                  </span>
              <span
                style={{fontSize: 20, fontWeight: 500}}
                dangerouslySetInnerHTML={{__html: handleDisplayCkeditor(comment?.content)}}
              >
              </span>
                </Col>
                <Col span={7} style={{display: "flex"}}>
                  <Row>
                    {user.id === comment.user_id ? (<>
                      <Col span={14}>
                        <Button
                          size="middle"
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
                            size="middle"
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
                        size="large"
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
            </Card>
          </>
        ) : (
          <Card style={{marginTop: 20, marginBottom: 20}} className="background">
            <Row gutter={10} style={{alignItems: "center", justifyContent: "space-between"}}>
              <Col span={3}>
                <div style={{textAlign: "center"}}>
                  <Avatar src={Logo} size={35} alt='avatar'/>
                  <div>{user?.name}</div>
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
                        size="middle"
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
                          size="middle"
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
                      size="large"
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
          </Card>
        )}

      </div>)
  }


  return (<div className="wrapper__blog--page">
    {contextHolder}
    <Breadcrumb items={routes} itemRender={itemRender}/>
    {postData && (<Row gutter={20}>
      <Col span={16}>
        <div className="card_title">
          <Title level={3}>{post.data.title}</Title>
          <div style={{display: "flex", alignItems: "center"}}>
            <FieldTimeOutlined/>
            <span className="dateTime">{moment(post.data.created_at).format('LLL')}</span>
            <UserOutlined/>
            <span>{user?.name || "anonymous"}</span>
          </div>
          <Card className="background">
            <Row gutter={15}>
              <Col span={3}>
                <div style={{textAlign: "center"}}>
                  <Avatar src={user?.avatar || Logo} size={35} alt='avatar'/>
                  <div>{user?.name}</div>
                </div>
              </Col>
              <Col span={21}>
                      <span
                        dangerouslySetInnerHTML={{__html: handleDisplayCkeditor(post?.data.content)}}
                      ></span>
                <div style={{display: "flex", justifyContent: "space-between"}}>
                  <Title level={3}>
                    Đánh giá bài viết
                  </Title>
                  <div style={{marginTop: 10}}>
                    <Button
                      size="large"
                      type="primary"
                      icon={<FaRocketchat/>}
                      onClick={() => showModal("Bình luận")}
                    >
                      Comment
                    </Button>
                    <Modal width={"50%"} title={titleModal} onOk={() => handleCommentPost()}
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
                  <Rate disabled={disable} onChange={(item) => handleCountStar(item)} allowHalf defaultValue={2.5}/>
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
          {post?.data.comments.length > 0 && post?.data.comments.map((item, index) => {
            return (<div key={index}>
              <CommentBox comment={item}/>
            </div>)
          })}
        </div>
      </Col>
      <Col span={8} style={{marginTop: 75}}>
        <Row gutter={[0, 20]} style={{marginBottom: 20}}>
          <Col span={24}>
            <Card title="Bai viet lien quan" className="background">
              <Card.Grid style={gridStyle}>
                <Row>
                  <Col span={5}>
                    <Avatar src={user?.avatar || Logo} size={35} alt='avatar'/>
                  </Col>
                  <Col span={19}>
                    <Text className="title">bai viet moi nhat</Text>
                    <div>
                      <span className="dateTime">06/08/2023</span>
                      <span>{user?.name}</span>
                    </div>
                  </Col>
                </Row>
              </Card.Grid>
            </Card>
          </Col>
        </Row>
      </Col>
    </Row>)}
  </div>)
}

export default DetailPostForum
