import { AutoComplete, Avatar, Badge, Button, Col, List, Popover, Row, Skeleton } from 'antd';
import { useEffect, useState } from 'react';
import { IoMdNotifications } from 'react-icons/io';
import { Link } from 'react-router-dom';
import Loading from '../../shared/Spin';

import Logo from '../../../../public/images/beesquad-logo.png';
import AvatarImage from '../../../../public/images/logo_ong_vang.jpg';
import { imageUrl } from '../../../common/imageUrl';
import { RoutesConstant } from '../../../routes';
import { useGetNotificationsQuery } from "../../../services/forum/index.jsx";
import { useSearchQuery } from '../../../services/search';
import { useProfileQuery } from '../../../services/users';
import UserMenu from '../../shared/UserMenu';

function Headers() {
  const { data: users, isSuccess, isFetching } = useProfileQuery();
  const { data: notifications } = useGetNotificationsQuery()

  const [options, setOptions] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [filterHistory, setFilterHistory] = useState();
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [dataNotifications, setDataNotifications] = useState([]);
  const [list, setList] = useState([]);

  const { data: dataSearch, isLoading } = useSearchQuery(keyword);

  const url = !!(window.location.href ===
    'http://localhost:4000/forum' &&
    'http://localhost:4000/forum/detailPost' &&
    'http://localhost:4000/forum/detailPostforum/listPosts');

  useEffect(() => {
    if (notifications !== undefined) {
      const notificationSlice = notifications.slice(0, 2)
      setDataNotifications(notificationSlice)
      setList(notificationSlice);
      setInitLoading(false);
    }
  }, [notifications])

  useEffect(() => {
    if (dataSearch?.data?.courses) {
      const { courses } = dataSearch?.data;
      if (!isFetching) {
        if ((!users?.id)) return setFilterHistory(courses);
      }
      ;

      if (users) {
        const { histories } = users;
        if (histories.length <= 0) {
          return setFilterHistory(courses)
        }
        ;

        let filterCourse = histories.reduce((accumulator, currentValue) => {
          let existCourseId = accumulator.find((item) => item.course_id == currentValue.course_id);
          if (existCourseId) {
            existCourseId.lessonId.push(currentValue.lesson_id);
          } else {
            accumulator.push({
              course_id: currentValue.course_id,
              lessonId: [currentValue.lesson_id]
            });
          }
          return accumulator;
        }, []);

        let historyNew = filterCourse.map((item) => {
          return {
            courseId: item.course_id,
            lessonId: Math.max.apply(null, item.lessonId)
          }
        });

        const mapHistory = new Map(historyNew.map((item) => [item.courseId, item]));
        let newCourse = courses.map((items) => {
          let arrCourse = [];
          let existLesson = items;
          const checkExistCourseId = mapHistory.get(items.id);
          if (checkExistCourseId) {
            existLesson = { ...items, completed: checkExistCourseId.lessonId }
          }
          ;
          arrCourse.push(existLesson)
          return arrCourse
        });
        setFilterHistory(newCourse)
      }
    }
  }, [dataSearch, users]);

  const count = 1
  const handleNotifications = () => {
    const onLoadMore = () => {
      setList(dataNotifications.concat(
        [...new Array(count)].map(() => ({
          loading: true,
          title: {},
          content: {},
        })),
      ))
      fetch('http://143.198.91.100/api/notify/list')
        .then((res) => res.json())
        .then((res) => {
          const newData = [...dataNotifications, ...res]
          setDataNotifications(newData);
          setList(newData);
          setLoading(false);
          window.dispatchEvent(new Event('resize'));
        });
    };

    const loadMore =
      !initLoading && !loading ? (
        <div
          style={{
            textAlign: 'center',
            marginTop: 12,
            height: 32,
            lineHeight: '32px',
          }}
        >
          <Button onClick={onLoadMore}>Xem thêm</Button>
        </div>
      ) : null;
    return (
      <List
        className="demo-loadmore-list"
        loading={initLoading}
        itemLayout="horizontal"
        loadMore={loadMore}
        dataSource={list}
        renderItem={(item) => (
          <List.Item
          >
            <Skeleton avatar title={false} loading={item.loading} active>
              <List.Item.Meta
                title={item.title}
                description={item.content}
              />
            </Skeleton>
          </List.Item>
        )}
      />
    )
  };
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
                <Col flex='80px' className='notification'>
                  <Popover
                    placement="bottomRight"
                    title={<h4 className='title-notification'>Thông báo</h4>}
                    content={() => handleNotifications()}
                    trigger="click"
                  >
                    <Badge count={notifications?.length} size="small">
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
                    <Avatar src={AvatarImage} size={35} alt='avatar' />
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
