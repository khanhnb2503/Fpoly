import {Card, Col, Image, Row, Typography} from "antd";

const PaymentForm = ({data, price}) => {
  const {Text, Title} = Typography

  return (
    <div className="wrapper_payment_form">
      <Title level={3}>Thanh toán bằng VN PAY</Title>
      <Row gutter={10}>
        <Col span={11}>
          <Text>{`Tên khóa học : ${data.data.name}`}</Text>
          <div style={{margin: "10px 0"}}>Chi tiết thanh toán</div>
          <Card
            title={price()}
            className="card_price"
          >
            <div className="total_price">
              <Title level={4} style={{margin: 0}} className="color-text">Tổng tiền : </Title>
              <Text className="price_sale">{(1200000 / 100) * 50}</Text>
            </div>
          </Card>
        </Col>
        <Col span={13}>
          <Image preview={false} src={"https://vinacheck.vn/media/2020/09/unnamed-1-e1599126130688.png"} />
        </Col>
      </Row>
    </div>
  )
}

export default PaymentForm
