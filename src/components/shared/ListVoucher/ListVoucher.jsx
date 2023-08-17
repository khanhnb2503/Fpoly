import {Avatar, Badge, Card, Col, Image, List, Popover, Row, Typography} from "antd";
import { IoMdNotifications } from 'react-icons/io';
import { Link } from "react-router-dom";

import course from '../../../../public/images/course_3.png';
import Logo from '../../../../public/images/logo_ong_vang.jpg';
import profile from '../../../../public/images/profile.png';
import UserMenu from '../UserMenu/index.jsx';
import {useProfileQuery} from "../../../services/users/index.jsx"
import {useGetCategoryQuery} from "../../../services/courses/index.jsx";
function ListVoucher() {
  const { Text, Title, Paragraph, } = Typography

  const {data: user} = useProfileQuery()

  return (
    <div className="wrapper__profile">
      <div className="profile--header">
        <Row align="middle" className='horizontal-header'>
          <Col sm={4} md={6} lg={12} xl={12}>
            <Row justify="start" align="middle" className='navbar-logo'>
              <Link to='/'>
                <img src={Logo} alt='logo' />
              </Link>
              <h4>FptPolytechnic</h4>
            </Row>
          </Col>
          <Col sm={4} md={6} lg={12} xl={12}>
            <Row justify="end" align="middle" className='navbar-action'>
              <>
                <Col flex='60px' className='notification'>
                  <Popover
                    placement="bottomRight"
                    title={<h4 className='title-notification'>Thông báo</h4>}
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
                    <Avatar src={user.avatar || Logo} size={35} alt='avatar' />
                  </Popover>
                </Col>
              </>
            </Row>
          </Col>
        </Row>
      </div>
      <div className="profile--content">
        <div className="background-profile" style={backgroundProfile}>
          <Row justify='space-between' align='bottom' className="info-my">
            <Col xl={9} className="avatar-user">
              <Avatar src={user.avatar || Logo} size={156} alt='avatar' />
            </Col>
            <Col xl={14} className="info--text">
              <h5>{user?.name}</h5>
            </Col>
          </Row>
        </div>
        <div className="course--my">
          <Card type="inner" title="Voucher của tôi">
            <List
              grid={{
                gutter: 16,
                column: 4,
              }}
              dataSource={data}
              renderItem={(item) => (
                <List.Item>
                  <Card title={item.title}>Card content</Card>
                </List.Item>
              )}
            />
          </Card>
        </div>
      </div>
    </div>

  );
};

const backgroundProfile = {
  backgroundImage: `url(${profile})`,
  backgroundSize: 'cover',
  width: '100%',
  height: '300px',
  borderRadius: '5px'
}

export default ListVoucher;
