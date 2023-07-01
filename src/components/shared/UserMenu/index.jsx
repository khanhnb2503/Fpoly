import { Avatar, Col, Row } from "antd";
import { Link } from "react-router-dom";

import avatar from '../../../../public/images/logo_ong_vang.jpg';

function UserMenu() {
  const handleLogout = () => {
    alert("Hello")
  }

  return (
    <div className='wrapper__user--menu'>
      <Row justify='start' align='middle' className='menu-header'>
        <Col>
          <Avatar src={avatar} size={47} />
        </Col>
        <Col className='user-info'>
          <h5>BinhKhanh2503</h5>
          <span>khanh2503@gmail.com</span>
        </Col>
      </Row>
      <div className='list-items'>
        <ul>
          <li><Link to=''>Trang cá nhân</Link></li>
          <li><Link to=''>Bài viết của tôi</Link></li>
          <li><Link onClick={handleLogout}>Đăng xuất</Link></li>
        </ul>
      </div>
    </div>
  );
}

export default UserMenu;