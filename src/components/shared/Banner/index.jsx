import { Col, Row } from 'antd';
import Carousel from 'nuka-carousel';
import { Link } from 'react-router-dom';

import { useGetAllBannerQuery } from '../../../services/banners';

function Banner() {
  const { data: banners, isLoading } = useGetAllBannerQuery();

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
          {!isLoading && banners.map((slide) => (
            <Row key={slide.id} justify='space-between'>
              <Col xl={10} className='slide-show-left'>
                <h3>{slide.name}</h3>
                <p>{slide.content}</p>
                <div>
                  <Link to={`${slide.url}`}>{slide.content_btn}</Link>
                </div>
              </Col>
              <Col xl={14} className='slide-show-right'>
                <Row justify='end'>
                  <Col>
                    <img src={slide.image} alt={`banner-${slide.id}`} />
                  </Col>
                </Row>
              </Col>
            </Row>
          ))}
        </Carousel>
      </div>
    </div>
  );
}

export default Banner;