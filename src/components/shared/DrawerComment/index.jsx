import { Avatar, Button, Col, Drawer, Form, Input, Row } from 'antd';
import { MdSend } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useCommentsCourseMutation } from '../../../services/courses';
import { useProfileQuery } from '../../../services/users/index.jsx';

import avatar1 from '../../../../public/images/images.jfif';
import { onClose } from '../../../redux/features/comment/commentSlice';

function DrawerComment({ courseId }) {
  const dispatch = useDispatch();
  const { isCompleted } = useSelector((state) => state.commentState);
  const { data: users, isFetching } = useProfileQuery();
  const [commentsCourse] = useCommentsCourseMutation();

  const sendComment = async (data) => {
    const res = await commentsCourse({
      course_id: courseId,
      user_id: users?.id,
      content: data.content,
      comment_id: 1
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
        <Row justify="space-between" align="top">
          <Col flex="40px">
            <Avatar src={<img src={avatar1} alt="avatar" />} className='avatar' />
          </Col>
          <Col flex="auto">
            <div className='content'>
              <h5>KhanhNB</h5>
              <p>Bạn đang làm gì thế </p>
            </div>
          </Col>
        </Row>
      </Drawer>
    </div>
  )
};

export default DrawerComment;