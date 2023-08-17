import {Link, useParams} from "react-router-dom";
import {useGetFeedbackQuery, useSearchPostQuery} from "../../../services/forum/index.jsx";
import {
  AutoComplete, Avatar,
  Breadcrumb,
  Button,
  Card,
  Col,
  Divider,
  Modal,
  Pagination,
  Popover,
  Rate,
  Row,
  Skeleton, Space,
  Tag
} from "antd";
import Loading from "../Spin/index.jsx";
import {FieldTimeOutlined, MoreOutlined, UserOutlined} from "@ant-design/icons";
import moment from "moment/moment.js";
import {handleDisplayCkeditor} from "../../../common/handleDisplayCkeditor.jsx";
import {FaRocketchat, FaUserCheck} from "react-icons/fa";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {useState} from "react";

const DetailFeedback = () => {
  const [keyword, setKeyword] = useState('');

  const {id} = useParams()
  const {data: feedback} = useGetFeedbackQuery(id)
  const {data: dataSearch} = useSearchPostQuery(keyword);
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
        {feedback.data && (
          <Row gutter={20}>
            <Col span={16}>
              <div className="card_title">
                <Tag style={{marginTop: 10, marginBottom: 10}} color={"green"}>
                  Góp ý
                </Tag>
                <div style={{display: "flex", justifyContent: "space-between"}}>
                  {/*<Title level={3}>{feedback?.data?.title}</Title>*/}
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
                      <Text>Trung bình đánh giá</Text>np
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

export default DetailFeedback
