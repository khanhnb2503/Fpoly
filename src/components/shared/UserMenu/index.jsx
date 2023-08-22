import { Avatar, Col, Row } from "antd";
import { Link, useNavigate } from "react-router-dom";

import avatar from '../../../../public/images/logo_ong_vang.jpg';
import { removeLocalStorage } from "../../../services/base/useLocalStorage";
import { useProfileQuery } from '../../../services/users';

function UserMenu() {
  const navigate = useNavigate();
  const { data: user, isSuccess } = useProfileQuery();

  const handleLogout = () => {
    removeLocalStorage('access_token');
    removeLocalStorage('refresh_token');
    navigate('/')
    location.reload();
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
          <li><Link to='/profile'>Trang cá nhân</Link></li>
          <li><Link to='/ListVoucher'>Voucher của tôi</Link></li>
          <li><Link onClick={handleLogout}>Đăng xuất</Link></li>
        </ul>
      </div>
    </div>
  );
}

export default UserMenu;
