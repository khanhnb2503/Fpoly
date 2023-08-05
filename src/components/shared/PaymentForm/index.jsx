import {Card, Col, Image, Row, Typography, Statistic, Button} from "antd";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

const PaymentForm = ({setIsModalOpen,data, priceTotal, price}) => {
  const {Text, Title} = Typography
  const {Countdown} = Statistic;
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(false);
  const [textPayment, setTextPayment] = useState('');
  const deadlinePayment = Date.now() + 1000 * 60  * 5 ;
  const navigate = useNavigate()

  const handleCheckPayment = () => {
    setLoading(true)
    if (status) {
      setTimeout(() => {
        setStatus(true)
        navigate('/paymentSuccess')
        setLoading(false)
      }, 2000)
    } else {
      setTimeout(() => {
        setTextPayment("Thanh toán chưa thành công, xin vui lòng thử lại sau ít giây")
        setLoading(false)
      }, 2000)
    }
  }

  const handleFinishCountdown = () => {
    setIsModalOpen(false)
  }
  return (
    <div className="wrapper_payment_form">
      <Title level={3}>Thanh toán bằng VN PAY</Title>
      <Countdown onFinish={() => handleFinishCountdown()} title="Thời gian thanh toán" value={deadlinePayment} format="mm:ss"/>
      <Row gutter={10}>
        <Col span={12}>
          <Text>{`Tên khóa học : ${data.data.name}`}</Text>
          <div style={{margin: "10px 0"}}>Chi tiết thanh toán</div>
          <Card
            title={price()}
            className="card_price"
          >
            <div className="total_price">
              <Title level={4} style={{margin: 0}} className="color-text">Tổng tiền : </Title>
              <Statistic valueStyle={{color: "orange", fontWeight: "700", fontSize: 40, marginLeft: 10}}
                         value={priceTotal}/>
            </div>
          </Card>
          <Button loading={loading} onClick={() => handleCheckPayment()} className="btn-payment">Kiểm tra thanh
            toán</Button>
          {!status && (
            <Title style={{color: "red"}} level={3}>{textPayment}</Title>
          )}
        </Col>
        <Col span={12}>
          <Image preview={false} width={"250px"} height={"250px"}
                 src={"https://vinacheck.vn/media/2019/05/ma-qr-code_vinacheck.vm_001.jpg"}/>
          <div>Tên chủ tài khoản: Nguyễn Đăng Thái</div>
          <Text>Số Tài khoản: 12312312312312</Text>
        </Col>
      </Row>
    </div>
  )
}

export default PaymentForm
