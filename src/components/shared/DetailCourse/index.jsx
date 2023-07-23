import { Button, Col, Collapse, List, Modal, Row, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { AiOutlineSafety } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { imageUrl } from "../../../common/imageUrl";
import { queryVideo } from '../../../services/base/baseQuery';
import { useGetCourseQuery, useSubcribeCourseMutation } from '../../../services/courses/index.jsx';
import { useProfileQuery } from '../../../services/users';
import Community from '../Community/index.jsx';

function DetailCourse() {
  const { id } = useParams();
  const { Title, Text } = Typography;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [videoId, setVideoId] = useState('709fd5b8181fe1c6f9');
  const [videos, setVideos] = useState();

  const [subcribeCourse] = useSubcribeCourseMutation();
  const { data: course } = useGetCourseQuery(id);
  const { data: users } = useProfileQuery();

  const handleSubcribeCourse = async () => {
    if (!id || !users.id) navigate('/login');
    dispatch(setIdCourse(id));
    const response = await subcribeCourse({ course_id: id });
    console.log(response);
  };

  useEffect(() => {
    try {
      (async () => {
        const { data } = await queryVideo(videoId);
        setVideos(data);
        setLoading(true);
      })()
    } catch (error) {
      console.log('Error');
    }
  }, [course, videoId]);

  return (
    <div className='wrapper__detail-course'>
      {loading && course && (
        <>
          <Modal
            title={<h3>{course.data.name}</h3>}
            centered
            onOk={() => setOpen(false)}
            onCancel={() => setOpen(false)}
            open={open}
            footer={null}
            width='35.4%'
            className='video-trial-content'
          >
            <div
              dangerouslySetInnerHTML={{ __html: videos.embed_code }}
              className='video-player-modal'
            ></div>
            <h4>Video học thử miễn phí</h4>
            {course.data.modules.length > 0 && course.data.modules.map((items) => (
              <div key={items.id}>
                {items.lessons.map((value) => (
                  <div
                    key={value.id}
                    className={`trial-study-content ${value.video_id == videoId ? 'active-default-bk' : ''}`}
                    onClick={() => setVideoId(value.video_id)}
                  >
                    {value.status === 1 &&
                      (<Row justify='space-between' align='middle'>
                        <Col xl={20}><h6>{value.name}</h6></Col>
                        <Col xl={2}><span>20 phút</span></Col>
                      </Row>)
                    }
                  </div>
                ))}
              </div>
            ))}
          </Modal>
          <Row justify='space-between' align='top' gutter={50}>
            <Col xl={15}>
              <div className='details'>
                <h5>{course.data?.name}</h5>
                <p>{course.data?.description}</p>
                <Title
                  level={5}>Các khái niệm chính được đề cập đến ở khóa học:
                </Title>
                <List
                  dataSource={course.data?.modules}
                  className='item-list'
                  renderItem={(item, index) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<AiOutlineSafety size={20} />}
                        title={<p>{item.name}</p>}
                      />
                    </List.Item>
                  )} />
                <Row justify='space-between' className='list-description'>
                  <Col>
                    <Title level={3}>Nội dung khóa học: </Title>
                  </Col>
                </Row>
                <Row className='content'>
                  <Collapse accordion size={'large'} style={{ width: '100%' }} expandIconPosition={'end'}>
                    {course.data.modules.length > 0 && course.data.modules.map(item => (
                      <Collapse.Panel key={item.id} header={<h6>{item.name}</h6>}>
                        <List
                          dataSource={item.lessons}
                          renderItem={(item, index) => (
                            <List.Item>
                              <List.Item.Meta
                                avatar={<AiOutlineSafety />}
                                title={<p>{item.name}</p>}
                              />
                            </List.Item>
                          )} />
                      </Collapse.Panel>
                    ))}
                  </Collapse>
                </Row>
                <Row justify='center'>
                  <Community />
                </Row>
              </div>
            </Col>
            <Col xl={9} className='thumbnail'>
              <div className='reviewer-course'>
                <img src={`${imageUrl}${course.data?.image}`} alt='' />
              </div>
              <Row justify='space-evenly' className='content'>
                <Col >
                  <Button
                    className='button btn-views'
                    shape='round'
                    size={'large'}
                    onClick={() => setOpen(true)}
                  >Học thử video
                  </Button>
                </Col>
                <Col >
                  <Button
                    className='button-free'
                    shape='round'
                    size={'large'}
                    onClick={handleSubcribeCourse}
                  >Đăng kí khóa học
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </>
      )
      }
    </div >
  )
}
export default DetailCourse