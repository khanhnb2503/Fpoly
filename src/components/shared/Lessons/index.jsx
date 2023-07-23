import { Button, Col, Collapse, List, Progress, Row } from 'antd';
import Carousel from 'nuka-carousel';
import { useEffect, useState } from 'react';
import {
  AiOutlineComment, AiOutlineLeft, AiOutlineLock,
  AiOutlineRight, AiOutlineVideoCamera
} from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { onOpen } from '../../../redux/features/comment/commentSlice.jsx';
import { queryVideo } from '../../../services/base/baseQuery.jsx';
import { useGetLessonsQuery } from '../../../services/courses/index.jsx';
import DrawerComment from '../DrawerComment/index.jsx';
// import Loading from '../Spin';

function Iframe(props) {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: props.iframe ? props.iframe : "" }}
    />
  );
}

function Lessons() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [videoId, setVideoId] = useState();
  const [videos, setVideos] = useState();
  const [loading, setLoading] = useState(false);
  const { data: lessons, isSuccess } = useGetLessonsQuery(id);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await queryVideo(lessons?.data?.video_id);
        setVideos(data);
        setLoading(true);
      } catch (error) {
        console.log(error);
      }
    })()
  }, [loading]);

  return (
    <>
      {isSuccess && loading && (
        <>
          <DrawerComment />
          <div className="wrapper__lessons">
            <div className="header">
              <Row justify='space-between' align='middle'>
                <Col xl={12}>
                  <Button type='link' className='btn-come-back' onClick={() => navigate('/')}>
                    <AiOutlineLeft size={20} /><span>Quay lại</span>
                  </Button>
                </Col>
                <Col xl={12}>
                  <Row justify='end' align='middle' gutter={10} className='progress-learn'>
                    <Col><span>Tiến độ</span></Col>
                    <Col>
                      <Progress size={40} type="circle" percent={48} />
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
                          dangerouslySetInnerHTML={{ __html: videos.embed_code }}
                          className='video-player'
                        ></div>
                      </Row>
                    </div>
                    <div className='video-info-bio'>
                      <div>
                        <Row justify='space-between' align='middle'>
                          <Col xl={21}>
                            <h3>{lessons.data.description}</h3>
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
                            <Button> <span>Bài tiếp</span><AiOutlineRight /></Button>
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
                    <Collapse accordion defaultActiveKey={[id]} expandIconPosition={'end'}>
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
                                  className={`items-list ${lessons?.data?.video_id === item.video_id ? 'active-info' : 'un-active-info'}`}
                                  onClick={() => setVideoId(item.video_id)}
                                >
                                  <Col>
                                    <h6 className='topic-link'>{item.id}.{item.name}</h6>
                                    <Row justify='start' align='middle' gutter={3} className='hours-group'>
                                      <Col><AiOutlineVideoCamera /></Col>
                                      <Col><span>15 phút</span></Col>
                                    </Row>
                                  </Col>
                                  <Col><AiOutlineLock /></Col>
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