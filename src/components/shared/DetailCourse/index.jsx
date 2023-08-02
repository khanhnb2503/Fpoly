import { Button, Col, Collapse, List, Modal, Row, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { AiOutlineSafety } from 'react-icons/ai';
import {Link, useNavigate, useParams} from 'react-router-dom';
import { imageUrl } from "../../../common/imageUrl";
import { queryVideo } from '../../../services/base/baseQuery';
import { setLocalStorage } from '../../../services/base/useLocalStorage';
import { useGetCourseQuery, useSubcribeCourseMutation } from '../../../services/courses/index.jsx';
import { useProfileQuery } from '../../../services/users';
import Community from '../Community/index.jsx';
import Loading from '../Spin';

function DetailCourse() {
  const { Title, Text } = Typography;
  const { id } = useParams();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [videoId, setVideoId] = useState();
  const [videos, setVideos] = useState();

  const [subcribeCourse] = useSubcribeCourseMutation();

  const {data: course, isSuccess} = useGetCourseQuery (id);
  const {data: users} = useProfileQuery();


  const handleSubcribeCourse = async () => {
    setLocalStorage('course_id', id);
    if (!id || !users?.id) {
      navigate('/login')
    } else {
      const { data } = await subcribeCourse({ course_id: id });
      if (data.success) {
        let lesson_id = course?.data?.modules[0]?.lessons[0]?.id;
        navigate(`/lessons/${lesson_id}`)
      }
    }
  };

  const handlePaymentCourse = async () => {
    if (id) {
      navigate(`/payment/${id}`)
    }
  }

  useEffect(() => {
    try {
      (async () => {
        const { data } = await queryVideo(videoId);
        setVideos(data);
        setLoading(true);
      })()
    } catch (error) {
      navigate('/not-found')
    }
  }, [course, videoId]);

  useEffect(() => {
    if (isSuccess) {
      let isTrial = [];
      course?.data?.modules.map((module) => {
        module?.lessons.map((lesson) => {
          if (lesson.is_trial_lesson == 1) isTrial.push(lesson.video_id);
        })
      });
      setVideoId(isTrial[0])
    }
  }, [course]);

  return (
    <div className='wrapper__detail-course'>
      <Loading loading={false} size='large'>
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
                      {value.is_trial_lesson === 1 &&
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
                <Row className='content'>
                  <Collapse accordion size={'large'} style={{width: '100%'}} expandIconPosition={'end'}>
                    {course.data.modules.length > 0 && course.data.modules.map(item => (
                      <Collapse.Panel key={item.id} header={<h6>{item.name}</h6>}>
                        <List
                          dataSource={item.lessons}
                          renderItem={(item, index) => (
                            <List.Item>
                              <List.Item.Meta
                                avatar={<AiOutlineSafety/>}
                                title={<p>{item.name}</p>}
                              />
                            </List.Item>
                          )}/>
                      </Collapse.Panel>
                    ))}
                  </Collapse>
                </Row>
                <Row justify='center'>
                  <Community/>
                </Row>
              </div>
            </Col>
            <Col xl={9} className='thumbnail'>
              <div className='reviewer-course'>
                <img src={`${imageUrl}${course.data?.image}`} alt=''/>
              </div>
              <Row justify='space-evenly' className='content'>
                <Col>
                  <Button
                    className='button btn-views'
                    shape='round'
                    size={'large'}
                    onClick={() => setOpen(true)}
                  >Học thử video
                  </Button>
                </Col>
                <Col>
                  {course?.data?.is_free == 1
                    ? (
                      <Button
                        className='button-free'
                        shape='round'
                        size={'large'}
                        onClick={handleSubcribeCourse}
                      >Đăng kí khóa học
                      </Button>
                    )
                    : (
                        <Button
                          className='button-free'
                          shape='round'
                          size={'large'}
                          onClick={() => handlePaymentCourse()}
                        >Mua khóa học
                        </Button>
                    )
                  }
                </Col>
              </Row>
            </Col>
          </Row>
        </>
      )
      }
    </div>
  )
}

export default DetailCourse
