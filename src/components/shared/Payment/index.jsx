// import PaymentForm from "../PaymentForm";
import { Button, Card, Col, List, Modal, Row, Typography } from "antd";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetCourseQuery } from '../../../services/courses';
import Community from "../Community";
import PaymentForm from "../PaymentForm";


const Payment = () => {
    const { Title, Text } = Typography
    const { id } = useParams()
    const { data: course } = useGetCourseQuery(id)
    const data = [
        'Truy cập toàn bộ khóa học',
        `Hơn ${course.data.modules.length} video bài tập`,
        'Các bài tập thực hành sau mỗi video',
        'Hỏi đáp trực tiếp ngay dưới mỗi bài học',
        'Có cộng đồng bàn luận trên facbook, forum',
        "Mua một lần học vĩnh viễn"
    ];

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };


    const price = () => {
        return (
            <div>
                <Row className="price" gutter={10}>
                    <Col>
                        <Title style={{ margin: 0 }} level={5} className="price_number color-text">Giá bán : </Title>
                    </Col>
                    <Col>
                        <Text delete className="color-text ">{course.price || "1.200.000"}</Text>
                        <Text className="price_sale">{(1200000 / 100) * 50}</Text>
                    </Col>
                </Row>
            </div>
        )
    }
    return (
        <div className="wrapper_payment">
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
                        <div className="total_price">
                            <Title level={4} style={{ margin: 0 }} className="color-text">Tổng tiền : </Title>
                            <Text className="price_sale">{(1200000 / 100) * 50}</Text>
                        </div>
                    </Card>
                    <div>
                        <Button
                            className="btn-payment color-text"
                            size={"large"}
                            onClick={() => showModal()}
                        >Thanh toán ngay</Button>
                    </div>
                    <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={"50%"}>
                        <PaymentForm data={course} price={price} />
                    </Modal>
                </Col>
                <Col span={10}>
                    <Card className="card_infor" bordered={true}>
                        <Title level={3}>Bạn sẽ nhận được gì</Title>
                        <List
                            dataSource={data}
                            renderItem={(item) => (
                                <List.Item>
                                    <Text></Text> {item}
                                </List.Item>
                            )}
                        />

                    </Card>
                </Col>
            </Row>
            <Community />
        </div>
    )
}

export default Payment
