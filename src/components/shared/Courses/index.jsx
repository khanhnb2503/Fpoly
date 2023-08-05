import { Button, Col, Row } from "antd";
import { HiUserGroup } from 'react-icons/hi';
import { Link, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import { imageUrl } from "../../../common/imageUrl";
import { useGetCoursesQuery } from '../../../services/courses';
import { useProfileQuery } from '../../../services/users';

function Courses() {
  const navigate = useNavigate();
  const [complete, setComplete] = useState(false);
  const { data: courses, isSuccess } = useGetCoursesQuery();
  const { data: users } = useProfileQuery();

  useEffect(() => {
    // if (users && courses) {
    //   const existHistory = users.histories;
    //   const exist = ((existHistory[existHistory.length - 1]).lesson_id)
    //   setComplete(exist)
    // };
  }, [users, courses])

  return (
    <div className="wrapper__courses">
      <div className="courses">
        {isSuccess && courses?.data?.map((course) => (
          <div key={course.id} className="course-body">
            <h3>{course.name}</h3>
            <Row justify='start' align='middle' gutter={[50, 30]}>
              {course?.courses?.map((item) => (
                <Col key={item.id} xl={6} className="less-item">
                  <Link to={complete ? `/lessons/${complete}` : `/courses/${item.id}`} className="thumbnail-link">
                    <img src={`${imageUrl}${item.image}`} alt={`lesson-${item.id}`} />
                    <div className="overlay">
                      {complete
                        ? <Button
                          shape="round"
                          className="btn-action-views"
                          onClick={() => navigate(`/lessons/${complete}`)}
                        >Tiếp tục học
                        </Button>
                        : <Button shape="round" className="btn-action-views">Xem khóa học</Button>
                      }
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
