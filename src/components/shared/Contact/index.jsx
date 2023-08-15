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

                        <Row justify='start' align='middle' gutter={[30, 30]}>
                            <Col xl={12} className="less-item">
                                <div className="item_title">
                                    <h2>Liên hệ </h2>
                                    <h6> Chúng tôi luôn sẵn sàng tiếp nhận mọi ý kiến ​đóng góp và giải đáp những yêu cầu của bạn.Hãy liên hệ ngay với chúng tôi</h6>
                                </div>
                                <div className="item_map">
                                    <AiFillEnvironment size={22} />
                                    <span>Phương Canh, Nam Từ Liêm, Hà Nội</span>
                                </div>
                                <div className="item_email">
                                    <AiFillMail size={22} />
                                    <span>Contact@gmail.com</span>
                                </div>
                                <div className="item_phone">
                                    <AiFillPhone size={22} />
                                    <span>0988888999</span>
                                </div>
                                <div className="item_keep">
                                    <span>Keep in Touch</span>
                                    <AiFillFacebook size={22} />
                                    <AiFillYoutube size={22}/>
                                    
                                </div>
                            </Col>
                            <Col xl={12} className="right-item">
                                <div className="item--name">
                                    <h6>Học và tên</h6>
                                    <input type="text" placeholder="Nhập tên đầy đủ" />
                                </div>
                                <div className="item--email">
                                    <h6>Email</h6>
                                    <input type="email" placeholder="Nhập email" />
                                </div>
                                <div className="item--phone">
                                    <h6>Điện thoại</h6>
                                    <input type="text" placeholder="Nhập điện thoại" />
                                </div>
                                <div className="item--discription">
                                    <h6>Nội dung</h6>
                                    <textarea name="" id="" cols="30" rows="10"></textarea>
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