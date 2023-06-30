import { Button, Col, Row } from "antd";
import { HiUserGroup } from 'react-icons/hi';
import { Link } from "react-router-dom";

import { useGetAllCoursesQuery } from '../../../services/courses';

function Courses() {
  const { data, isLoading, isSuccess } = useGetAllCoursesQuery();

  return (
    <div className="wrapper__courses">
      <div className="courses">
        {isSuccess && data.length > 0 && data.map((course) => (
          <div key={course.id} className="course-body">
            <h3>{course.name}</h3>
            <Row justify='start' align='middle' gutter={[50, 30]}>
              {course.courses.map((item) => (
                <Col key={item.id} xl={6} className="less-item">
                  <Link className="thumbnail-link">
                    <img src={item.image} alt={`lesson-${item.id}`} />
                    <div className="overlay">
                      <Button shape="round" className="btn-action-views">Xem khóa học</Button>
                    </div>
                  </Link>
                  <Row justify='space-between' align='middle' className="horizontal-info">
                    <Col xl={19}>
                      <h6>
                        <Link to={`oke`}>{item.title}</Link>
                      </h6>
                    </Col>
                    <Col xl={3}>
                      <div className="subcribe">
                        <HiUserGroup size={18} />
                        <span>{item.subcribe}</span>
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