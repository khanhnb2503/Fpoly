import { AutoComplete, Avatar, Badge, Col, Popover, Row } from 'antd';
import { useState } from 'react';
import { IoMdNotifications } from 'react-icons/io';
import { Link } from 'react-router-dom';
import Loading from '../../shared/Spin';

import Logo from '../../../../public/images/logo_ong_vang.jpg';
import { imageUrl } from '../../../common/imageUrl';
import { RoutesConstant } from '../../../routes';
import { useSearchQuery } from '../../../services/search';
import { useProfileQuery } from '../../../services/users';
import UserMenu from '../../shared/UserMenu';

function Headers() {
  const [options, setOptions] = useState([]);
  const [keyword, setKeyword] = useState('');

  const { data: user, isSuccess } = useProfileQuery();
  const { data: dataSearch, isLoading } = useSearchQuery(keyword);

  const url = window.location.href === 'http://localhost:4000/forum' || 'http://localhost:4000/forum/detailPost' || 'http://localhost:4000/forum/detailPostforum/listPosts'
  return (
    <div className='wrapper__header'>
      <Row align="middle" className='horizontal-header'>
        <Col sm={4} md={6} lg={8} xl={8}>
          <Row justify="start" align="middle" className='navbar-logo'>
            <Link to='/'>
              <img src={Logo} alt='logo' />
            </Link>
            <h4>BeeSquad</h4>
          </Row>
        </Col>
        <Col sm={16} md={12} lg={8} xl={8}>
          {!url && (
            <Row justify="center">
              <AutoComplete
                options={[{
                  label: (
                    <Loading loading={isLoading} size='small'>
                      <div className='list-item-search'>
                        {dataSearch?.message
                          ? <span>Nhập để tìm kiếm!</span>
                          : (
                            <div className='list-content-search'>
                              {dataSearch?.data?.blogs?.length > 0 && (
                                <>
                                  <h4>Bài viết</h4>
                                  {dataSearch.data.blogs.map((blog, index) => (
                                    <div key={index}>
                                      <Row>
                                        <Col>
                                          <p><Link>{blog.title}</Link></p>
                                        </Col>
                                      </Row>
                                    </div>
                                  ))}
                                </>
                              )}
                              <h4>Khóa học</h4>
                              {dataSearch?.data?.courses?.length > 0 && (
                                <>
                                  {dataSearch.data.courses.map((course, index) => (
                                    <div key={index}>
                                      <Row justify='start' align='middle' gutter={[5, 20]}>
                                        <Col>
                                          <Avatar src={`${imageUrl}${course.image}`} />
                                        </Col>
                                        <Col>
                                          <p><Link to={`courses/${course.id}`}>{course.name}</Link></p>
                                        </Col>
                                      </Row>
                                    </div>
                                  ))}
                                </>
                              )}
                            </div>
                          )}
                      </div>
                    </Loading>
                  )
                }]}
                onSearch={(value) => setKeyword(value)}
                placeholder="Tìm kiếm khóa học, bài viết..."
                className='navbar-search-input'
              />
            </Row>
          )}

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
                    content={<span>Chưa có thông báo nào</span>}
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
