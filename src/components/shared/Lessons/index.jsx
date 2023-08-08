import { Button, Col, Collapse, List, Progress, Row, Form } from 'antd';
import Carousel from 'nuka-carousel';
import { useEffect, useState } from 'react';
import {
  AiFillCheckSquare,
  AiOutlineLeft, AiOutlineLock,
  AiOutlineRight, AiOutlineVideoCamera
} from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { videoInfo } from '../../../redux/features/video/videoSlice';
import { getHistoryCourse, queryVideo } from '../../../services/base/baseQuery.jsx';
import {
  useGetLessonsQuery,
  useSaveHistoryCourseMutation
} from '../../../services/courses/index.jsx';
import { useProfileQuery } from '../../../services/users/index.jsx';

function Lessons() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { iframe, course_id } = useSelector((state) => state.videoState);
  const { data: lessons, isSuccess } = useGetLessonsQuery(id);
  const [saveHistoryCourse] = useSaveHistoryCourseMutation();
  const { data: users, isFetching } = useProfileQuery();

  const [completeCourse, setCompleteCourse] = useState([]);
  const [progress, setProgress] = useState(false);
  const [checked, setChecked] = useState([]);
  const [loading, setLoading] = useState(false);

  if (!isFetching) {
    if (!users?.id) return navigate('/login');
  };

  window.addEventListener('message', async (e) => {
    if (!e.data?.source) {
      const listener = JSON.parse(e.data);
      let currentTime = 0;
      if (listener.type === 'progress') currentTime = (listener?.data?.percent).toFixed(1);
      if (currentTime >= 0.9) {
        setProgress(true);
      }
    }
  });

  useEffect(() => {
    (async () => {
      try {
        if (lessons) {
          const { data } = await queryVideo(lessons?.data?.video_id);
          dispatch(videoInfo({
            video_id: data.id,
            time: data?.duration,
            iframe: data.embed_code,
            course_id: lessons?.data?.course_id
          }));
          setLoading(true);
        }
      } catch (error) {
        navigate('/login')
      }
    })()
  }, [lessons]);

  useEffect(() => {
    (async () => {
      if (course_id) {
        const { data } = await getHistoryCourse(course_id);
        let lessonIds = [];
        lessons?.data?.course?.modules.map((item) => {
          item.lessons.map((lesson) => lessonIds.push(lesson.id))
        });

        let status = 0;
        if (data?.history[0]?.lesson_id) {
          let ids = [];
          data.history.map((item) => {
            if ((ids.indexOf(item.lesson_id) == -1) && (item.status == 1)) {
              ids.push(item.lesson_id)
            }
          });
          status = ids.includes(Number(id)) ? 1 : 0;
          setCompleteCourse(ids)
          if (ids.length == 1) ids.push(Number(id))
          setChecked(ids)
        } else {
          setChecked([Number(id)])
        };

        if (!progress) {
          return;
          // return await saveHistoryCourse({ course_id: course_id, lesson_id: id, status: status });
        };

        let totals = checked.length;
        let index = lessonIds[totals];

        setCompleteCourse((state) => !state.includes(Number(id)) ? [...state, Number(id)] : [...state])
        setChecked((state) => state.includes(Number(id)) ? [...state, index] : [...state])
        return;
        // return await saveHistoryCourse({ course_id: course_id, lesson_id: id, status: 1 });
      }
    })()
  }, [progress, iframe]);

  return (
    <>
      {isSuccess && loading && (
        <>
          <div className="wrapper__lessons">
            <div className="header">
              <Row justify='space-between' align='middle'>
                <Col xl={12}>
                  <Button type='link' onClick={() => navigate('/')} className='btn-come-back'>
                    <AiOutlineLeft size={20} /><span>Quay lại</span>
                  </Button>
                </Col>
                <Col xl={12}>
                  <Row justify='end' align='middle' gutter={10} className='progress-learn'>
                    <Col><span>Tiến độ</span></Col>
                    <Col>
                      <Progress size={40} type="circle" percent={15} />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
            <div>
              <Row>
                <Col xl={18}>
                  <div className='quiz-content'>
                    <div className='box-large'>
                      <Form>
                        
                      </Form>
                    </div>
                  </div>
                  {/* <div className='side-left-video'>
                    <div className='video-scroll'>
                      <Row justify='center'>
                        <div
                          dangerouslySetInnerHTML={{ __html: iframe }}
                          className='video-player'
                        ></div>
                      </Row>
                    </div>
                    <div className='video-info-bio'>
                      <div>
                        <Row justify='space-between' align='middle'>
                          <Col xl={21}>
                            <h3>{lessons?.data?.name}</h3>
                          </Col>
                        </Row>
                      </div>
                      <div className='action-next'>
                        <Row justify='space-between' align='middle'>
                          <Col>
                            <Button onClick={() => navigate(`/lessons/${Number(id) - 1}`)}> <AiOutlineLeft /><span>Bài trước</span></Button>
                          </Col>
                          <Col>
                            <Button
                              onClick={() => navigate(`/lessons/${Number(id) + 1}`)}
                            >
                              <span>Bài tiếp</span><AiOutlineRight />
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </div> */}
                </Col>
                <Col xl={6} className='side-right-box'>
                  <div className='carousel-theory'>
                    <h4>Lý thuyết</h4>
                    <Carousel
                      autoplay={true}
                      dragging={true}
                      wrapAround={true}
                      speed={1000}
                      autoplayInterval={5000}
                    >
                      <div className='content-box'>
                        React Player là một thư viện phát video rất linh hoạt cho các ReactJs app.
                        Tuỳ vào cách sử dụng của bạn, thư viện này có thể phát nhiều định dạng video
                        từ nhiều nguồn khác nhau như YouTube, Facebook, Twitch, SoundCloud, Vimeo.
                        React Player là một thư viện phát video rất linh hoạt cho các ReactJs app.
                      </div>
                    </Carousel>
                  </div>
                  <div className='content-lesson'>
                    <h4>Nội dung bài học</h4>
                    <Collapse 
                      accordion 
                      defaultActiveKey={[lessons.data?.module_id]} 
                      expandIconPosition={'end'}
                      className='list-items-module'
                    >
                      {lessons?.data?.course?.modules?.length > 0 &&
                        lessons?.data?.course?.modules?.map((item) => (
                          <Collapse.Panel key={item.id} className='topic-items'
                            header={
                              <div className='details-course'>
                                <h6>{`${item.id}.${item.name}`}</h6>
                                <span>Tổng thời gian: 20 phút</span>
                              </div>
                            }>
                            <List
                              dataSource={item.lessons}
                              renderItem={(item, index) => (
                                <div className={`${checked.includes(item.id) ? 'has-next' : ''}`}>
                                  <Row
                                    key={index}
                                    justify='space-between'
                                    align='middle'
                                    className={`items-list ${id == item.id ? 'active-info' : ''} `}
                                    onClick={() => {
                                      setProgress(false)
                                      checked.includes(item.id) ? navigate(`/lessons/${item.id}`) : null
                                    }}
                                  >
                                    <Col>
                                      <h6 className='topic-link'>{item.id}.{item.name}</h6>
                                      <Row justify='start' align='middle' gutter={3} className='hours-group'>
                                        <Col><AiOutlineVideoCamera /></Col>
                                        <Col><span>15 phút</span></Col>
                                      </Row>
                                    </Col>
                                    <Col>
                                      {(completeCourse.includes(item.id))
                                        ? <AiFillCheckSquare style={{ color: '#06ac33' }} size={20} />
                                        : <AiOutlineLock
                                          className={`
                                          ${id == item.id ? 'hide-lock' : ''} ${checked.includes(item.id) ? 'checked-hand' : ''}
                                        `}
                                          size={20}
                                        />
                                      }
                                    </Col>
                                  </Row>
                                </div>

                              )} />
                          </Collapse.Panel>
                        ))}
                    </Collapse>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Lessons;
