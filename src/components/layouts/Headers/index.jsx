import { AutoComplete, Avatar, Badge, Col, Popover, Row } from 'antd';
import { useState } from 'react';
import { IoMdNotifications } from 'react-icons/io';
import { Link } from 'react-router-dom';

import Logo from '../../../../public/images/logo_ong_vang.jpg';
import { RoutesConstant } from '../../../routes';
import { useSearchQuery } from '../../../services/search';
import { useProfileQuery } from '../../../services/users';
import UserMenu from '../../shared/UserMenu';

function Headers() {
  const [options, setOptions] = useState([]);
  const [keyword, setKeyword] = useState('');

  const { data: user, isSuccess } = useProfileQuery();
  const { data: results } = useSearchQuery(keyword);
  const content = (
    <div>
      <p>Content</p>
      <p>Content</p>
    </div>
  );
  const text = <span>Title</span>;

  const handleSearch = (value) => {
    setKeyword(value);
    let res = [];
    if (!value || value.indexOf('@') >= 0) {
      res = [];
    } else {
      res = ['gmail.com', '163.com', 'qq.com'].map((domain) => ({
        value,
        label: `${value}@${domain}`,
      }));
    }
    setOptions([{ label: 'khanhb', value: 'mai di lam' }]);
  };

  return (
    <div className='wrapper__header'>
      <Row align="middle" className='horizontal-header'>
        <Col sm={4} md={6} lg={8} xl={8}>
          <Row justify="start" align="middle" className='navbar-logo'>
            <Link to='/'>
              <img src={Logo} alt='logo' />
            </Link>
            <h4>FptPolytechnic</h4>
          </Row>
        </Col>
        <Col sm={16} md={12} lg={8} xl={8}>
          <Row justify="center">
            <AutoComplete
              onSearch={handleSearch}
              placeholder="Tìm kiếm video,khóa học,bài viết..."
              className='navbar-search-input'
            />
          </Row>
        </Col>
        <Col sm={4} md={6} lg={8} xl={8}>
          <Row justify="end" align="middle" className='navbar-action'>
            {!isSuccess ? (
              <Col className='action-login'>
                <Link to={RoutesConstant.LOGIN}>Đăng nhập</Link>
              </Col>
            ) : (
              <>
                <Col flex='60px' className='notification'>
                  <Popover
                    placement="bottomRight"
                    title={<h4 className='title-notification'>Thông báo</h4>}
                    content={content}
                    trigger="click"
                  >
                    <Badge count={2} size="small">
                      <IoMdNotifications size='2em' className='icon-light' />
                    </Badge>
                  </Popover>
                </Col>
                <Col flex='35px' className='avatar'>
                  <Popover
                    placement="bottomRight"
                    content={<UserMenu />}
                    trigger="click"
                  >
                    <Avatar src={Logo} size={35} alt='avatar' />
                  </Popover>
                </Col>
              </>
            )}
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default Headers;