import { Button, Col, Row } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setVideoTrial } from "../../../redux/features/video/videoSlice";
import { queryVideo } from "../../../services/base/baseQuery";
import { useGetTrialLessonQuery } from '../../../services/courses';

function Videos() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [videos, setVideos] = useState([]);
  const { data: trialLesson, isLoading } = useGetTrialLessonQuery();

  useEffect(() => {
    if (trialLesson) {
      let videoIds = [];

      trialLesson.data.map(async (item) => {
        !videoIds.includes(item.id) ? videoIds.push(item.video_id) : videoIds
        const { data } = await queryVideo(item.video_id);
        if (videoIds.includes(data.id)) {
          let videoInfo = {
            id: data.id,
            name: item.name,
            image: data.embed_code,
            course_id: item.course_id
          };
          setVideos((state) => [...state, videoInfo]);
        }
      });
    };
    setLoading(true);
  }, [isLoading]);

  return (
    <div className='wrapper__video'>
      {loading && (
        <Row justify='start' align='middle' gutter={[40, 30]}>
          {videos.map((item, index) => (
            <Col key={index} xl={6} md={6} className='video-player'>
              <Link className="thumbnail-link" to={`courses/${item.course_id}`}>
                <div
                  dangerouslySetInnerHTML={{ __html: item.image }}
                ></div>
                <div className="overlay">
                  <Button
                    shape="round"
                    className="btn-action-views"
                    navigate={`/courses/${item.course_id}`}
                    onClick={() => dispatch(setVideoTrial({ videoIframe: item.image, isCompleted: true }))}
                  >Xem video
                  </Button>
                </div>
              </Link>
              <h6 className="info-title-video">
                <Link
                  to={`/courses/${item.course_id}`}
                  onClick={() => dispatch(setVideoTrial({ videoIframe: item.image, isCompleted: true }))}
                >{item.name}</Link>
              </h6>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

export default Videos;