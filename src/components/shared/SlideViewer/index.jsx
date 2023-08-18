import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { fetchPdf } from "../../../services/base/convertFilePdf";

function SlideViewer() {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    fetchPdf(pdfUrl).then(pdfSlides => setSlides(pdfSlides));
  }, [pdfUrl]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <Slider {...settings}>
      {slides.map((slide, index) => (
        <div key={index}>
          <p>{slide}</p>
        </div>
      ))}
    </Slider>
  );
}

export default SlideViewer;