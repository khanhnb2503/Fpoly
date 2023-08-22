import { Avatar, Button, Col, Drawer, Form, Input, Row } from 'antd';
import { FiDelete } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { useCommentsCourseMutation, useGetListCommentQuery } from '../../../services/courses';
import { useProfileQuery } from '../../../services/users/index.jsx';
const { TextArea } = Input;

import { useEffect, useState } from 'react';
import avatar1 from '../../../../public/images/images.jfif';
import { onClose, replyComment } from '../../../redux/features/comment/commentSlice';

function DrawerComment({ courseId }) {
  const dispatch = useDispatch();
  const { isCompleted, username, commentId } = useSelector((state) => state.commentState);
  const { data: users, isFetching } = useProfileQuery();
  const { data: comments, isLoading } = useGetListCommentQuery();
  const [commentsCourse] = useCommentsCourseMutation();

  const [filterComment, setFilterComment] = useState([]);

  useEffect(() => {
    if (!isLoading) {
      let filterByIdComment = [];

      if (comments?.comments?.length == 0) return setFilterComment([]);
      comments?.comments.map((items) => {
        let course_id = items.course.id;
        if (course_id == courseId) {
          filterByIdComment.push(items)
        }
      });

      setFilterComment(filterByIdComment)
    }
  }, [isLoading]);

  const sendComment = async (data) => {
    const res = await commentsCourse({
      course_id: courseId,
      user_id: users?.id,
      content: data.content,
      comment_id: commentId ? commentId : null
    });
  };

  return (
    <div>
      <Drawer
        width={500}
        placement="right"
        className='wrapper__drawer'
        onClose={() => dispatch(onClose(false))}
        open={isCompleted}
        footer={
          <div className="wrapper__input--comment">
            <Form onFinish={sendComment}>
              <Row>
                <Col xl={24}>
                  {username &&
                    (
                      <>
                        <p className='reply-comment-user'>
                          Bạn trả lời: <span>{username}</span>
                        </p>
                        <Button
                          type='text'
                          onClick={() => dispatch(replyComment({
                            username: '',
                            commentId: ''
                          }))}
                        ><FiDelete />
                        </Button>
                      </>
                    )
                  }
                  <Form.Item name='content' rules={[{ required: true, message: 'Nhập bình luận...' }]}>
                    <TextArea rows={4} placeholder="Nhập bình luận..." />
                  </Form.Item>
                </Col>
                <Col xl={1}>
                  <Form.Item>
                    <Button
                      type="primary"
                      size='large'
                      className='btn-send-comment'
                      htmlType='submit'
                    >
                      Gửi bình luận
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </div>
        }
      >
        {
          filterComment.length !== 0 && filterComment.map((comment) => (
            <div key={comment.id} className='comment-list'>
              <Row justify="space-between" align="top">
                <Col flex="40px">
                  <Avatar src={<img src={avatar1} alt="avatar" />} className='avatar' />
                </Col>
                <Col flex="auto">
                  <div className='content'>
                    <h5>{comment?.user?.name}</h5>
                    <p>{comment?.content}</p>
                  </div>
                </Col>
              </Row>
              <div className='reply-comment'>
                <Button
                  type='text'
                  onClick={() => dispatch(replyComment({
                    username: comment?.user?.name,
                    commentId: comment.id
                  }))}
                >Trả lời
                </Button>
              </div>
              {comment?.length !== 0 && (
                comment.replies.map((item, index) => (
                  <>
                    <Row key={index} justify="space-between" align="top" className='comment-children'>
                      <Col flex="40px">
                        <Avatar src={<img src={avatar1} alt="avatar" />} className='avatar' />
                      </Col>
                      <Col flex="auto">
                        <div className='content'>
                          <h5>{item?.user?.name}</h5>
                          <p>{item?.content}</p>
                        </div>
                      </Col>
                    </Row>
                    <div className='reply-comment-children'>
                      <Button
                        type='text'
                        onClick={() => dispatch(replyComment({
                          username: comment?.user?.name,
                          commentId: comment.id
                        }))}
                      >Trả lời
                      </Button>
                    </div>
                  </>
                ))
              )}
            </div>
          ))
        }
      </Drawer>
    </div>
  )
};

export default DrawerComment;