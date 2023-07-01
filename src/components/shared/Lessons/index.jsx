import { Button, Col, Progress, Row } from 'antd';
import Carousel from 'nuka-carousel';
import { AiOutlineComment, AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import ReactPlayer from 'react-player';
import { useNavigate } from 'react-router-dom';

function Lessons() {
  const navigate = useNavigate();
  return (
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
              <Col>
                <span>Tiến độ</span>
              </Col>
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
                  <ReactPlayer
                    url='https://www.youtube.com/watch?v=5MTSQspPjXQ'
                    className='video-player'
                    controls
                  />
                </Row>
              </div>
              <div className='video-info-bio'>
                <div>
                  <Row justify='space-between' align='middle'>
                    <Col xl={21}>
                      <h3>Cấu hình React Webpack config, nodejs</h3>
                    </Col>
                    <Col xl={3.2}>
                      <Button shape="round" className='btn-action-comment'>
                        <AiOutlineComment size={20} />
                        <span>Thêm bình luận</span>
                      </Button>
                    </Col>
                  </Row>
                </div>
                <div className='action-next'>
                  <Row justify='space-between' align='middle'>
                    <Col>
                      <Button>
                        <AiOutlineLeft />
                        <span>Bài trước</span>
                      </Button>
                    </Col>
                    <Col>
                      <Button>
                        <span>Bài tiếp</span>
                        <AiOutlineRight />
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
                  Tuỳ vào cách sử dụng của bạn, thư viện này có thể phát nhiều định dạng video
                  từ nhiều nguồn khác nhau như YouTube, Facebook, Twitch, SoundCloud, Vimeo.
                  React Player là một thư viện phát video rất linh hoạt cho các ReactJs app.
                  Tuỳ vào cách sử dụng của bạn, thư viện này có thể phát nhiều định dạng video
                  từ nhiều nguồn khác nhau như YouTube, Facebook, Twitch, SoundCloud, Vimeo
                </div>
              </Carousel>
            </div>
            <div className='content-lesson'>
              <h4>Nội dung bài học</h4>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Lessons;