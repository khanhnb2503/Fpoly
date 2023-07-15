import { Button, Col, Row } from "antd";
import { HiUserGroup } from 'react-icons/hi';
import { Link } from "react-router-dom";

import { useGetCoursesQuery } from '../../../services/courses';

function Courses() {
  const { data: courses, isLoading, isSuccess } = useGetCoursesQuery();

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
                    <img src="./public/images/course_3.png" alt={`lesson-${item.id}`} />
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
