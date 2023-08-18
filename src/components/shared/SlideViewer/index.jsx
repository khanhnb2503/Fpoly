import pdfjs from 'pdfjs-dist';
import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export async function fetchPdf(url) {
  const pdfDoc = await pdfjs.getDocument(url).promise;
  const slides = [];

  for (let pageNum = 1; pageNum <= pdfDoc.numPages; pageNum++) {
    const page = await pdfDoc.getPage(pageNum);
    const textContent = await page.getTextContent();
    const text = textContent.items.map(item => item.str).join(' ');
    slides.push(text);
  }
  return slides;
};


function SlideViewer({ pdfUrl }) {
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