import { Button, Col, Row } from "antd";
import axios from "axios";
import { HiUserGroup } from 'react-icons/hi';
import { Link } from "react-router-dom";

import { imageUrl } from "../../../common/imageUrl";
import { useGetCoursesQuery } from '../../../services/courses';
// import { useGetVideoQuery } from "../../../services/videos";
import { useEffect } from "react";

function Courses() {
  axios.defaults.headers.common['SproutVideo-Api-Key'] = '699701dc7639206852db31e119899bdf';
  axios.defaults.headers.common['mode'] = 'no-cors';
  axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

  const { data: courses, isLoading, isSuccess } = useGetCoursesQuery();
  useEffect(() => {
    (async () => {
      const data = await axios.get('https://api.sproutvideo.com/v1/videos/069fd5bd1f1ae6c08f');
      console.log(data);
    })()
  }, [])
  // const { data: videos } = useGetVideoQuery('069fd5bd1f1ae6c08f');
  return (
    <div className="wrapper__courses">
      <div className="courses">
        {isSuccess && courses.data.map((course) => (
          <div key={course.id} className="course-body">
            <h3>{course.name}</h3>
            <Row justify='start' align='middle' gutter={[50, 30]}>
              {course.courses.map((item) => (
                <Col key={item.id} xl={6} className="less-item">
                  <Link to={`/courses/${item.id}`} className="thumbnail-link">
                    <img src={`${imageUrl}${item.image}`} alt={`lesson-${item.id}`} />
                    <div className="overlay">
                      <Button shape="round" className="btn-action-views">Xem khóa học</Button>
                    </div>
                  </Link>
                  <Row justify='space-between' align='middle' className="horizontal-info">
                    <Col xl={19}>
                      <h6>
                        <Link to={`oke`}>{item.name}</Link>
                      </h6>
                    </Col>
                    <Col xl={3}>
                      <div className="subcribe">
                        <HiUserGroup size={18} />
                        <span>357</span>
                      </div>
                    </Col>
                  </Row>
                </Col>
              ))}
            </Row>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Courses;
