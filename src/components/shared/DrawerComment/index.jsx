import { Avatar, Col, Drawer, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import avatar1 from '../../../../public/images/images.jfif';
import { onClose } from '../../../redux/features/comment/commentSlice';
import InputComment from '../InputComment';

function DrawerComment() {
  const dispatch = useDispatch();
  const { isCompleted } = useSelector((state) => state.commentState);
  return (
    <div>
      <Drawer
        width={450}
        placement="right"
        className='wrapper__drawer'
        onClose={() => dispatch(onClose(false))}
        open={isCompleted}
        footer={<InputComment />}
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