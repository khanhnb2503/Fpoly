import { Col, Row } from 'antd';
import { Link } from 'react-router-dom';
import Logo from '../../../../public/images/logo_ong_vang.jpg';
import { IoLogoFacebook, IoLogoTwitter, IoLogoYoutube, IoMdMail } from 'react-icons/io';


function Footers() {
  return (
    <div className='wrapper__footer'>
      <Row>
        <Col sm={8} md={8} xl={8}>
          <Row justify="start" className='footer-logo'>
            <Link to='/'>
              <img src={Logo} alt='logo' />
            </Link>
          </Row>
          <Row justify="start" align="middle" className='footer-description'>
            <h1>Lĩnh vực: Công nghệ, giáo dục, lập trình. F8 xây dựng và phát triển những sản phẩm mang lại giá trị cho cộng đồng.</h1>
          </Row>
        </Col>
        <Col sm={8} md={8} xl={8}>
          <Row justify="start" className='footer-tools'>
            <h1>Công cụ</h1>
          </Row>
          <Row justify="start" className='footer-listTools'>
            <ul>
              <Link to='/'>
                <li>Tạo CV xin việc</li>
              </Link>
              <Link to='/'>
                <li>Ruts gọn liên kết</li>
              </Link>
              <Link to='/'>
                <li>Clip-path maker</li>
              </Link>
              <Link to='/'>
                <li>Snippet generator</li>
              </Link>
            </ul>
          </Row>
        </Col>
        <Col sm={8} md={8} xl={8}>
            <Row justify="start" className='footer-contact'>
              <h1>Liên Hệ</h1>
            </Row>
            <Row justify="start" className='footer-contacts'>
              <ul>
                <li>Điện thoại: 0246.329.1102</li>
                <li>Email : Contact@gmail.com</li>
                <li>Địa chỉ: Số 26 Dương Đình Nghệ, Phường Yên Hòa, Quận Cầu Giấy, TP. Hà Nội</li>
              </ul>
            </Row>
          <Row justify="space-between" className='footer-socials'>
            <Link to='/'>
              <i><IoLogoFacebook size={50} color='#009DA6' /></i>
            </Link>
            <Link to='/'>
              <i><IoLogoYoutube size={50} color='#009DA6' /></i>
            </Link>
            <Link to='/'>
              <i><IoMdMail size={50} color='#009DA6' /></i>
            </Link>
            <Link to='/'>
              <i><IoLogoTwitter size={50} color='#009DA6' /></i>
            </Link>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default Footers;