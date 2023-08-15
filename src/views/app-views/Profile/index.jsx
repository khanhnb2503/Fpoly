import { Avatar, Badge, Col, Image, Popover, Row, Typography } from "antd";
import { IoMdNotifications } from 'react-icons/io';
import { Link } from "react-router-dom";

import course from '../../../../public/images/course_3.png';
import Logo from '../../../../public/images/logo_ong_vang.jpg';
import profile from '../../../../public/images/profile.png';
import UserMenu from '../../../components/shared/UserMenu';
const { Text, Title, Paragraph, } = Typography

function Profile() {
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
                    <Avatar src={Logo} size={35} alt='avatar' />
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
              <Avatar src={Logo} size={156} alt='avatar' />
            </Col>
            <Col xl={14} className="info--text">
              <h5>Nguyễn Bỉnh Khánh</h5>
            </Col>
          </Row>
        </div>
        <div className="course--my">
          <h5>Các khóa học đã tham gia</h5>
          <Row justify='start' align='start' gutter={[20, 50]} className="list-course">
            <Col xl={8} className="avatar--course">
              <Link>
                <Image preview={false} src={course} height={160} alt='avatar' />
              </Link>
            </Col>
            <Col xl={16} className="content-item">
              <h6>
                <Link>Kiến thức nhập môn IT</Link>
              </h6>
              <Paragraph
                style={{ width: "100%", }}
                ellipsis={{
                  rows: 5,
                }}
              >
                Khóa học lập trình C++ từ cơ bản tới nâng cao dành cho
                người mới bắt đầu. Mục tiêu của khóa học này nhằm giúp
                các bạn nắm được các khái niệm căn cơ của lập trình,
                giúp các bạn có nền tảng vững chắc để chinh phục con
                đường trở thành một lập trình
              </Paragraph>
            </Col>
          </Row>
          <Row justify='start' align='start' gutter={[20, 50]} className="list-course">
            <Col xl={8} className="avatar--course">
              <Link>
                <Image preview={false} src={course} height={160} alt='avatar' />
              </Link>
            </Col>
            <Col xl={16} className="content-item">
              <h6>
                <Link>Kiến thức nhập môn IT</Link>
              </h6>
              <Paragraph
                style={{ width: "100%", }}
                ellipsis={{
                  rows: 5,
                }}
              >
                Khóa học lập trình C++ từ cơ bản tới nâng cao dành cho
                người mới bắt đầu. Mục tiêu của khóa học này nhằm giúp
                các bạn nắm được các khái niệm căn cơ của lập trình,
                giúp các bạn có nền tảng vững chắc để chinh phục con
                đường trở thành một lập trình
              </Paragraph>
            </Col>
          </Row>
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

export default Profile;