import { Avatar, Col, Row } from "antd";
import { Link } from "react-router-dom";

import avatar from '../../../../public/images/logo_ong_vang.jpg';
import { useProfileQuery } from '../../../services/users';

function UserMenu() {
  const { data: user, isSuccess } = useProfileQuery();

  const handleLogout = () => {
    alert("Hello")
  }

  return (
    <div className='wrapper__user--menu'>
      {isSuccess && user && (
        <Row justify='start' align='middle' className='menu-header'>
          <Col>
            <Avatar src={avatar} size={47} />
          </Col>
          <Col className='user-info'>
            <h5>{user.name}</h5>
            <span>{user.email}</span>
          </Col>
        </Row>
      )}
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