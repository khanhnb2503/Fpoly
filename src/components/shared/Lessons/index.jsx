import { Button, Col, Collapse, List, Progress, Row } from 'antd';
import Carousel from 'nuka-carousel';
import { useEffect, useState } from 'react';
import {
  AiFillCheckSquare,
  AiOutlineComment, AiOutlineLeft, AiOutlineLock,
  AiOutlineRight, AiOutlineVideoCamera
} from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { onOpen } from '../../../redux/features/comment/commentSlice.jsx';
import { videoInfo } from '../../../redux/features/video/videoSlice';
import { getHistoryCourse, queryVideo } from '../../../services/base/baseQuery.jsx';
import { removeLocalStorage } from '../../../services/base/useLocalStorage.jsx';
import {
  useGetLessonsQuery,
  useSaveHistoryCourseMutation
} from '../../../services/courses/index.jsx';
import { useProfileQuery } from '../../../services/users/index.jsx';
import DrawerComment from '../DrawerComment/index.jsx';

function Lessons() {
  const { id } = useParams();
  const navigate = useNavigate();
  removeLocalStorage('course_id');
  const dispatch = useDispatch();
  const { totalTime, iframe, course_id } = useSelector((state) => state.videoState);
  const { data: lessons, isSuccess } = useGetLessonsQuery(id);
  const [saveHistoryCourse] = useSaveHistoryCourseMutation();
  const { data: users, isFetching } = useProfileQuery();

  const [loading, setLoading] = useState(false);
  const [histories, setHistories] = useState([]);
  const [times, setTimes] = useState(false);
  const [complete, setComplete] = useState(0);

  if (!isFetching) {
    if (!users?.id) navigate('/login');
  };

  window.addEventListener('message', async (e) => {
    if (!e.data?.source) {
      const listener = JSON.parse(e.data);
      let currentTime = 0;
      if (listener.type === 'progress') currentTime = (listener?.data?.time).toFixed();
      if (totalTime && ((totalTime.toFixed() - currentTime) == 60)) {
        setTimes(true);
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
        const { data: history } = await getHistoryCourse(lessons?.data?.course_id);
        console.log(history)
        setComplete(history.complete_rate);
        if (history) {
          let historyStatus = 1;
          if ((history?.history?.length <= 0) || (history?.history[0]?.status == 0)) {
            historyStatus = 0
          };

          if (times) historyStatus = 1;
          const response = await saveHistoryCourse({
            course_id: course_id,
            lesson_id: id,
            status: historyStatus
          });
          console.log(response);
        }
      }
    })()
  }, [loading, times]);

  return (
    <>
      {isSuccess && loading && (
        <>
          <DrawerComment />
          <div className="wrapper__lessons">
            <div className="header">
              <Row justify='space-between' align='middle'>
                <Col xl={12}>
                  <Button type='link' className='btn-come-back'>
                    <AiOutlineLeft size={20} /><span>Quay lại</span>
                  </Button>
                </Col>
                <Col xl={12}>
                  <Row justify='end' align='middle' gutter={10} className='progress-learn'>
                    <Col><span>Tiến độ</span></Col>
                    <Col>
                      <Progress size={40} type="circle" percent={complete} />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
            <div>
              <Row>
                <Col xl={18}>
                  <div className='side-left-video'>
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
                          <Col xl={3.2}>
                            <Button
                              shape="round"
                              className='btn-action-comment'
                              onClick={() => dispatch(onOpen(true))}
                            >
                              <AiOutlineComment size={20} />
                              <span>Thêm bình luận</span>
                            </Button>
                          </Col>
                        </Row>
                      </div>
                      <div className='action-next'>
                        <Row justify='space-between' align='middle'>
                          <Col>
                            <Button> <AiOutlineLeft /><span>Bài trước</span></Button>
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
                  </div>
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
                    <Collapse accordion defaultActiveKey={[lessons.data?.module_id]} expandIconPosition={'end'}>
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
                                <Row
                                  key={index}
                                  justify='space-between'
                                  align='middle'
                                  className={
                                    `items-list 
                                    ${lessons?.data?.video_id === item.video_id ? 'active-info' : 'un-active-info'}
                                    ${(histories.includes(item.id)) ? 'active-hand' : ''}`
                                  }
                                  // onClick={() => (histories.includes(item.id))
                                  //   ? navigate(`/lessons/${item.id}`) : null
                                  // }
                                  onClick={() => (navigate(`/lessons/${item.id}`))}
                                >
                                  <Col>
                                    <h6 className='topic-link'>{item.id}.{item.name}</h6>
                                    <Row justify='start' align='middle' gutter={3} className='hours-group'>
                                      <Col><AiOutlineVideoCamera /></Col>
                                      <Col><span>15 phút</span></Col>
                                    </Row>
                                  </Col>
                                  <Col>
                                    {(histories.includes(item.id))
                                      ? <AiFillCheckSquare style={{ color: '#06ac33' }} size={20} />
                                      : <AiOutlineLock className={`${id == item.id ? 'hide-lock' : ''}`} size={20} />
                                    }
                                  </Col>
                                </Row>
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