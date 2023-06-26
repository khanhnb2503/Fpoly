import { Col, Row } from "antd";

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
                  <img src={item.image} alt={`lesson-${item.id}`} />
                  <Row justify='space-between' align='middle' className="horizontal-info">
                    <Col>
                      <h6>{item.title}</h6>
                    </Col>
                    <Col>
                      <span>{item.subcribe}</span>
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