import { Button, Col, Row } from "antd";
import { AiFillEnvironment, AiFillMail, AiFillPhone, AiFillFacebook, AiFillYoutube } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";


import Banner from "../../../components/shared/Banner";


function Contact() {

    return (

        <div className="wrapper__contact">
            <div className="contact">
                <Banner />
                <div className="wrapper__contact-title">
                    <div className="contact-body">
                        <Row justify='start' align='middle'>
                            <Col xl={12} className="contact-item">
                                <div className="item_title">
                                    <h2>Liên hệ </h2>
                                    <h6> Chúng tôi luôn sẵn sàng tiếp nhận mọi ý kiến ​đóng góp và giải đáp những yêu cầu của bạn.Hãy liên hệ ngay với chúng tôi</h6>
                                </div>
                                <div>
                                    <div className="item_map">
                                        <AiFillEnvironment size={20} />
                                        <span>Phương Canh, Nam Từ Liêm, Hà Nội</span>
                                    </div>
                                    <div className="item_email">
                                        <AiFillMail size={20} />
                                        <span>Contact@gmail.com</span>
                                    </div>
                                    <div className="item_phone">
                                        <AiFillPhone size={20} />
                                        <span>0988888999</span>
                                    </div>
                                    <div className="item_keep">
                                        <span>Keep in Touch</span>
                                        <AiFillFacebook size={20} />
                                        <AiFillYoutube size={22} />

                                    </div>
                                </div>
                                
                            </Col>
                            <Col xl={12} className="right-item">
                                <div className="item--name">
                                    <h6>Học và tên</h6>
                                    <input type="text" placeholder="Nhập tên đầy đủ" />
                                </div>
                               
                            </Col>

                        </Row>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;