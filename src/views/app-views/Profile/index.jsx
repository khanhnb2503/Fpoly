import { HeartOutlined } from "@ant-design/icons";
import { Avatar, Badge, Card, Col, Image, Popover, Row, Typography } from "antd";
import { IoMdNotifications } from 'react-icons/io';
import { Link } from "react-router-dom";
import Logo from '../../../../public/images/beesquad-logo.png';
import profile from '../../../../public/images/profile.png';
import { handleDisplayCkeditor } from "../../../common/handleDisplayCkeditor.jsx";
import { imageUrl } from "../../../common/imageUrl.jsx";
import UserMenu from '../../../components/shared/UserMenu';
import { useGetMyCourseQuery } from "../../../services/courses/index.jsx";
import { useGetPostsByUserQuery } from "../../../services/forum/index.jsx";
import { useProfileQuery } from "../../../services/users/index.jsx";

import ProfileAvatar from '../../../../public/images/logo_ong_vang.jpg';

const { Paragraph, } = Typography

function Profile() {
  const { data: user } = useProfileQuery()
  const { data } = useGetMyCourseQuery()
  const { data: posts } = useGetPostsByUserQuery()
  return (
    <div className="wrapper__profile">
      <div className="profile--header">
        <Row align="middle" className='horizontal-header'>
          <Col sm={4} md={6} lg={12} xl={12}>
            <Row justify="start" align="middle" className='navbar-logo'>
              <Link to='/'>
                <img src={Logo} alt='logo' />
              </Link>
              <h4>BeeSquad</h4>
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
                    <Avatar src={user?.image || ProfileAvatar} size={35} alt='avatar' />
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
            <Col xl={9}>
              <Avatar src={ProfileAvatar} size={156} alt='avatar' />
            </Col>
            <Col xl={14} className="info--text">
              <h5>{user?.name}</h5>
            </Col>
          </Row>
        </div>
        <div className="course--my">
          <h5 style={{ marginBottom: 10 }}>Các khóa học đã tham gia</h5>
          {data && data.courses.map((course, index) => {
            return (
              <div key={index}>
                {course.studies.map((item, index) => {
                  const status = item?.status === 0 ? "Đang học" : "Đã hoàn thành"
                  const color = item?.status === 0 ? "pink" : "green"
                  return (
                    <Badge.Ribbon text={status} color={color} key={index}>
                      <Card style={{ marginBottom: 20 }} type="inner" title={course?.name || "Bạn chưa tham gia khóa học nào!"} hoverable>
                        <Row gutter={20}>
                          <Col span={15}>
                            <Paragraph
                              ellipsis={{
                                rows: 5,
                              }}
                            >
                              {course?.featured}
                            </Paragraph>
                          </Col>
                          <Col span={9}>
                            <Image preview={false} src={`${imageUrl}${course?.image}`} height={160} alt='avatar' />
                          </Col>
                        </Row>
                      </Card>
                    </Badge.Ribbon>
                  )
                })}
              </div>
            )
          })}
        </div>
        <div className="course--my1">
          <h5 style={{ marginBottom: 20 }}>Các bài viết của bạn</h5>
          {posts && posts.map(post => {
            return (
              <div key={post.id}>
                <Link to={`/forum/detailPost/${post.id}`}>
                  <Card style={{ marginBottom: 10 }} type="inner" title={post.title || "Bạn chưa viết bài nào!"} hoverable extra={
                    <Row>
                      <Col span={12} style={{ display: "flex", alignItems: "center" }}>
                        <HeartOutlined style={{ fontSize: 20 }} />
                        <span style={{ marginLeft: 5 }}>{post.star}</span>
                      </Col>
                    </Row>}>
                    <span
                      style={{ lineHeight: 2.5, fontWeight: 500, fontSize: 20 }}
                      dangerouslySetInnerHTML={{ __html: handleDisplayCkeditor(post?.content) }}
                    ></span>
                  </Card>
                </Link>
              </div>
            )
          })}
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
