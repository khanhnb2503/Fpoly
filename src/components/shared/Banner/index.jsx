import { Col, Row } from 'antd';
import Carousel from 'nuka-carousel';
import { Link } from 'react-router-dom';

import { useGetAllBannerQuery } from '../../../services/banners';

function Banner() {
  const { data: banners, isSuccess } = useGetAllBannerQuery();
  return (
    <div className="wrapper__banner">
      <div className="slide-show">
        <Carousel
          autoplay={true}
          dragging={true}
          wrapAround={true}
          speed={1000}
          autoplayInterval={5000}
        >
          {/* {isSuccess && banners.data.map((slide) => ( */}
          <Row key={1} justify='space-between'>
            <Col xl={10} className='slide-show-left'>
              <h3>REACT - C# - PHP</h3>
              <p>
                Tổng hợp những khóa học mới nhất dành cho lập trình viên.
                Tạo nên sản phẩm, mang lại giá trị cho cộng đồng.
              </p>
            </Col>
            <Col xl={14} className='slide-show-right'>
              <Row justify='end'>
                <Col xl={24}>
                  <img className='image-background' src='../../../../public/images/background1.jpg' />
                </Col>
              </Row>
            </Col>
          </Row>
          {/* ))} */}
        </Carousel>
      </div>
    </div>
  );
}

export default Banner;