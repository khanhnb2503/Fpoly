import {Button, Result} from 'antd';
import {Link, useNavigate} from "react-router-dom";
import {getLocalStorage} from "../../../services/base/useLocalStorage.jsx";

export function PaymentSuccess() {
  const navigate = useNavigate()
  const courseId = getLocalStorage("course_id")

  const handleNavigateLesson = () => {
    navigate(`/lessons/${courseId?.lessons[0]}`)
  }
  return (
    <div>
      <Result
        status="success"
        title="THANH TOÁN THÀNH CÔNG!"
        subTitle="Bạn đã có thể học toàn bộ khóa học. Chúc bạn có những giờ học vui vẻ!!"
        extra={
          <Button type="primary" onClick={() => handleNavigateLesson()}>Vào học</Button>
        }
      />
    </div>
  )
}
