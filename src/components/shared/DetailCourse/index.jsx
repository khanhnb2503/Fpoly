import { Button, Col, Collapse, List, Modal, Row, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { AiOutlineSafety, AiOutlineVideoCamera } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { imageUrl } from "../../../common/imageUrl";
import { setVideoTrial } from '../../../redux/features/video/videoSlice';
import { queryVideo } from '../../../services/base/baseQuery';
import { setLocalStorage } from '../../../services/base/useLocalStorage';
import { useGetCourseQuery, useSubcribeCourseMutation } from '../../../services/courses/index.jsx';
import { useProfileQuery } from '../../../services/users';
import Community from '../Community/index.jsx';

function DetailCourse() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { Title, Text } = Typography;
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [videoId, setVideoId] = useState();
  const [videos, setVideos] = useState();
  const [isFreeCourse, setIsFreeCourse] = useState(false);
  const { videoFree, isCompleted } = useSelector((state) => state.videoState.videoTrial);

  const [subcribeCourse] = useSubcribeCourseMutation();
  const { data: course, isSuccess } = useGetCourseQuery(id);
  const { data: users } = useProfileQuery();

  const handleSubcribeCourse = async () => {
    if (!id || !users?.id) {
      setLocalStorage('hd-course', course.data);
      navigate('/login')
    } else {
      const { data } = await subcribeCourse({ course_id: id });
      if (data.success) {
        let lesson_id = course?.data?.modules[0]?.lessons[0]?.id;
        navigate(`/lessons/${lesson_id}`)
      }
    }
  };

  const handlePayment = async () => {
    if (!id || !users?.id) {
      setLocalStorage('hd-course', course.data);
      navigate('/login');
    } else {
      navigate(`/payment/${id}`)
    }
  };

  useEffect(() => {
    try {
      (async () => {
        if (videoId) {
          const { data } = await queryVideo(videoId);
          setVideos(data);
          setLoading(true);
        }
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

  useEffect(() => {
    if (!users?.id && course) {
      let defaultFree = course?.data?.is_free == 0 ? true : false;
      setIsFreeCourse(defaultFree)
      return;
    };

    if (course, users?.id) {
      let defaultFree = course?.data?.is_free == 0 ? true : false;
      let existUserInCourse = course?.data?.studies.some((item) => item.user_id == users.id);
      if (defaultFree && !existUserInCourse) setIsFreeCourse(true)
    }
  }, [course]);

  return (
    <div className='wrapper__detail-course'>
      {loading && course && (
        <>
          <Modal
            title={<h3>{course.data.name}</h3>}
            centered
            onOk={() => dispatch(setVideoTrial({ videoId: '', isCompleted: false }))}
            onCancel={() => dispatch(setVideoTrial({ videoId: '', isCompleted: false }))}
            open={isCompleted}
            footer={null}
            width='43%'
            className='video-trial-content'
          >
            <div
              dangerouslySetInnerHTML={{ __html: videoFree ? videoFree : videos.embed_code }}
              className='video-player-modal'
            ></div>
            <h4>Video học thử miễn phí</h4>
            {course.data.modules.length > 0 && course.data.modules.map((items) => (
              <div key={items.id}>
                {items.lessons.map((value) => (
                  <div
                    key={value.id}
                    className={`trial-study-content ${value?.video_id == videoId ? 'active-default-bk' : ''}`}
                    onClick={() => setVideoId(value?.video_id)}
                  >
                    {value.is_trial_lesson === 1 &&
                      (<Row justify='space-between' align='middle'>
                        <Col xl={20}><h6>{value.name}</h6></Col>
                        <Col xl={2}><AiOutlineVideoCamera /></Col>
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
                <div
                  dangerouslySetInnerHTML={{ __html: course.data?.description }}
                  className='video-player-modal'
                ></div>
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
                <Col>
                  <Button
                    className='button btn-views'
                    shape='round'
                    size={'large'}
                    onClick={() => dispatch(setVideoTrial({ videoIframe: '', isCompleted: true }))}
                  >Học thử video
                  </Button>
                </Col>
                <Col>
                  {isFreeCourse
                    ? (

                      <Button
                        className='button-free'
                        shape='round'
                        size={'large'}
                        onClick={() => handlePayment()}
                      >Mua khóa học
                      </Button>
                    )
                    : (
                      <Button
                        className='button-free'
                        shape='round'
                        size={'large'}
                        onClick={handleSubcribeCourse}
                      >Đăng kí khóa học
                      </Button>
                    )
                  }
                </Col>
              </Row>
            </Col>
          </Row>
        </>
      )}
    </div>
  )
}

export default DetailCourse
