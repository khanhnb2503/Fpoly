import { Avatar, Button, Col, Drawer, Row } from 'antd';
import { useState } from 'react';
import avatar1 from '../../../../public/images/images.jfif';

function DrawerComment() {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const Input = () => {
    return (
      <div>
        <input type="text" />
      </div>
    )
  }
  return (
    <div>
      <Button type="primary" onClick={showDrawer}>
        Open
      </Button>
      <Drawer
        width={450}
        placement="right"
        className='wrapper__drawer'
        onClose={onClose}
        open={open}
        footer={<Input />}
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