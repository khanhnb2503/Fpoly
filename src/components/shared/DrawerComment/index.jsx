import { Avatar, Button, Col, Drawer, Form, Input, Row } from 'antd';
import { MdSend } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useCommentsCourseMutation, useGetListCommentQuery } from '../../../services/courses';
import { useProfileQuery } from '../../../services/users/index.jsx';

import avatar1 from '../../../../public/images/images.jfif';
import { onClose } from '../../../redux/features/comment/commentSlice';
import { useEffect, useState } from 'react';

function DrawerComment({ courseId }) {
  const dispatch = useDispatch();
  const { isCompleted } = useSelector((state) => state.commentState);
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
      })

      setFilterComment(filterByIdComment)
    }
  }, [isLoading]);

  const sendComment = async (data) => {
    const res = await commentsCourse({
      course_id: courseId,
      user_id: users?.id,
      content: data.content,
      comment_id: null
    })
    console.log(res)
  };

  return (
    <div>
      <Drawer
        width={450}
        placement="right"
        className='wrapper__drawer'
        onClose={() => dispatch(onClose(false))}
        open={isCompleted}
        footer={
          <div className="wrapper__input--comment">
            <Form onFinish={sendComment}>
              <Row>
                <Col xl={20}>
                  <Form.Item rules={[{
                    required: true,
                    message: 'Nhập nội dung bình luận!'
                  }]}
                    name='content'
                  >
                    <Input className='comment-groups' placeholder='Nhập bình luận...' />
                  </Form.Item>
                </Col>
                <Col xl={4}>
                  <Form.Item>
                    <Button
                      type="primary"
                      size='large'
                      className='btn-send-comment'
                      htmlType='submit'
                    >
                      <MdSend size={35} style={{ paddingBottom: 4 }} />
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
            <Row key={comment.id} justify="space-between" align="top">
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
          ))
        }
      </Drawer>
    </div>
  )
};

export default DrawerComment;