import {Button, Result} from 'antd';
import {useNavigate} from "react-router-dom";
import {getLocalStorage, removeLocalStorage} from "../../../services/base/useLocalStorage.jsx";
import {useGetCourseQuery} from "../../../services/courses/index.jsx";

export function PaymentSuccess() {
  const navigate = useNavigate()
  const courseId = getLocalStorage("course_id")
  const { data: course } = useGetCourseQuery(courseId);

  const handleNavigateLesson = () => {
    navigate(`/lessons/${course.data.modules[0].lessons[0].id}`)
    removeLocalStorage("course_id")
  }
  const handleNavigateHome = () => {
    navigate(`/`)
    removeLocalStorage("course_id")
  }
  return (
    <div>
      <Result
        status="success"
        title="THANH TOÁN THÀNH CÔNG!"
        subTitle="Bạn đã có thể học toàn bộ khóa học. Chúc bạn có những giờ học vui vẻ!!"
        extra={
          <div>
            <Button style={{marginRight: 40}} type="primary" onClick={() => handleNavigateLesson()}>Vào học</Button>
            <Button type="primary" onClick={() => handleNavigateHome()}>Về trang chủ</Button>
          </div>
        }
      />
    </div>
  )
}
