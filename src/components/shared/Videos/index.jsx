// import { Button, Col, Row } from 'antd';
// import { AiFillEye, AiOutlineComment } from 'react-icons/ai';
// import { Link } from 'react-router-dom';

// import { baseUrl } from '../../../constants/errors';
// import { useGetAllVideosQuery } from '../../../services/videos';

function Videos() {
  // const { data: videos, isSuccess } = useGetAllVideosQuery();

  return (
    <div className='wrapper__video'>
      {/* <Row justify='start' gutter={[50, 45]}>
        {isSuccess > 0 && videos.data.map((video) => (
          <Col key={video.id} xl={6} className='video-outstanding'>
            <Link className='thumbnail-video'>
              <img src="./public/images/video1.jpg" alt={`video-${video.id}`} />
              <div className="overlay-vd">
                <Button shape="round" className="btn-action-views">Xem video</Button>
              </div>
            </Link>
            <h6><Link to={`${baseUrl}/${video.id}`}>{video.name}</Link></h6>
            <Row justify='space-between' align='middle' className='video-status'>
              <Col xl={12}>
                <Row justify='start' align='middle' gutter={6}>
                  <Col><AiOutlineComment size={20} /></Col>
                  <Col><span>450</span></Col>
                </Row>
              </Col>
              <Col xl={12}>
                <Row justify='end' align='middle' gutter={6}>
                  <Col><AiFillEye size={20} /></Col>
                  <Col><span>985</span></Col>
                </Row>
              </Col>
            </Row>
          </Col>
        ))}
      </Row> */}
    </div>
  );
}

export default Videos;