import {Button, Card, Col, Input, List, Modal, Row, Statistic, Typography} from "antd";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useGetCourseQuery} from '../../../services/courses';
import {usePaymentCourseMutation, useVoucherCourseMutation} from "../../../services/payment/index.jsx";
import Community from "../Community";
import PaymentForm from "../PaymentForm";
import {setLocalStorage} from "../../../services/base/useLocalStorage.jsx";
const Payment = () => {
  const {Title, Text} = Typography
  const {Search} = Input
  const {id} = useParams()
  const {data: course} = useGetCourseQuery(id)

  const [voucherCourse] = useVoucherCourseMutation()
  const dataInfor = [
    'Truy cập toàn bộ khóa học',
    `Hơn ${20} video bài tập`,
    'Các bài tập thực hành sau mỗi video',
    'Hỏi đáp trực tiếp ngay dưới mỗi bài học',
    'Có cộng đồng bàn luận trên facbook, forum',
    "Mua một lần học vĩnh viễn"
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingPay, setIsLoadingPay] = useState(false)
  const [textDiscount, setTextDiscount] = useState('');
  const [status, setStatus] = useState(false);
  const [priceTotal, setPriceTotal] = useState(course?.data?.price);
  const [discountPrice, setDiscountPrice] = useState(0);

  const [paymentCourse, loading] = usePaymentCourseMutation()

  const disable = !!discountPrice
  const showModal = () => {
    setIsModalOpen(true);
  };
  useEffect(() => {
    if (course !== undefined) {
      setPriceTotal(course.data.price)
    }
  }, [course?.data?.price])

  const handleCheckDiscount = async (codeDiscount) => {
    setIsLoading(true)
    const {data} = await voucherCourse({voucher: codeDiscount})
    if (!data.status) {
      setStatus(data.status)
      setTimeout(() => {
        setIsLoading(false)
        setTextDiscount(data?.message)
      }, 2000)
    } else {
      setTimeout(() => {
        setDiscountPrice(data.data.value)
        const result = data.data.unit === "Percent" ? priceTotal - ((priceTotal / 100) * data.data.value) : priceTotal - data.data.value
        setPriceTotal(result)
        setTextDiscount("Voucher áp dụng thành công!")
        setIsLoading(false)
        setStatus(data.status)
      }, 2000)
    }
  }

  const handlePayment = async () => {
    const {data} = await paymentCourse({course_id: id, amount: priceTotal})
    if (data) {
      setLocalStorage("course_id", id)
    }
    window.location.replace(data.data);
  }
  const price = () => {
    return (
      <div>
        {course && (
          <Row className="price" gutter={10}>
            <Col>
              <Title style={{margin: 0}} level={5} className="price_number color-text">Giá bán : </Title>
            </Col>
            <Col>
              <Text delete className="color-text">{course && discountPrice ? course.data.price : ''}</Text>
            </Col>
            <Col>
              <Statistic valueStyle={{color: "orange"}} value={priceTotal}/>
            </Col>
          </Row>
        )}
      </div>
    )
  }
  return (
    <div className="wrapper_payment">
      {loading && course && (
        <>
          <Row className="payment-title">
            <Col>
              <Title>Mở khóa toàn bộ khóa học</Title>
            </Col>
          </Row>
          <Row gutter={20}>
            <Col span={14}>
              <Title level={3}>Thanh toán để sở hữu toàn bộ khóa học</Title>
              <Card
                title={price()}
                className="card_price"
              >
                <div className="discount_input">
                  <Search status="warning" disabled={disable} placeholder="nhập mã giảm giá" enterButton="Áp dụng"
                          size="middle" loading={isLoading}
                          onSearch={(codeDiscount) => handleCheckDiscount(codeDiscount)}/>
                  <Text>{!status ? (
                    <div style={{color: "red"}}>{textDiscount}</div>
                  ) : (
                    <div style={{color: "white"}}>{textDiscount}</div>
                  )}</Text>
                </div>
                <Row className="price">
                  <Col>
                    <Title level={4} style={{margin: 0}} className="color-text">Tổng tiền : </Title>
                  </Col>
                  <Col style={{marginLeft: "10px"}}>
                    <Statistic valueStyle={{color: "orange", fontSize: 40}} value={priceTotal}/>
                  </Col>
                </Row>
              </Card>
              <Row gutter={10} style={{alignItems: "center"}}>
                <Col span={12}>
                  <Button
                    loading={isLoadingPay}
                    className="btn-payment color-text"
                    size={"large"}
                    onClick={() => handlePayment()}
                  >Thanh toán bằng VN PAY</Button>
                </Col>
                <Col span={12}>
                  <Button
                    loading={isLoadingPay}
                    className="btn-bank color-text"
                    size={"large"}
                    onClick={() => showModal()}
                  >Thanh toán chuyển khoản</Button>
                </Col>
              </Row>
              <Modal open={isModalOpen} onOk={() => setIsModalOpen(false)} onCancel={() => setIsModalOpen(false)}
                     width={"50%"}>
                <PaymentForm setIsModalOpen={setIsModalOpen} price={price} data={course} priceTotal={priceTotal}/>
              </Modal>
            </Col>
            <Col span={10}>
              <Card className="card_infor" bordered={true}>
                <Title level={3}>Bạn sẽ nhận được gì</Title>
                <List
                  dataSource={dataInfor}
                  renderItem={(item) => (
                    <List.Item>
                      <Text></Text> {item}
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
          </Row>
          <Community/>
        </>
      )}
    </div>
  )
}

export default Payment
