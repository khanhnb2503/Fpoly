import { Button, Result } from 'antd';
import {Link} from "react-router-dom";
import {useGetStatusPaymentQuery} from "../../../services/payment/index.jsx";
export function PaymentSuccess() {
  return (
    <div>
      <Result
        status="success"
        title="THANH TOÁN THÀNH CÔNG!"
        subTitle="Bạn đã có thể học toàn bộ khóa học. Chúc bạn có những giờ học vui vẻ!!"
        extra={
          <Link to="/">
            <Button type="primary">Vào học</Button>
          </Link>
        }
      />
    </div>
  )
}
