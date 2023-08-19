import pdfjs from 'pdfjs-dist';
import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

async function extractPdfPagesToImages(pdfUrl) {
  console.log(pdfUrl)
  const pdf = await pdfjs.getDocument(pdfUrl).promise;
  const images = [];

  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
    const page = await pdf.getPage(pageNumber);
    const viewport = page.getViewport({ scale: 1.0 });
    const canvas = document.createElement('canvas');
    const canvasContext = canvas.getContext('2d');

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    const renderContext = {
      canvasContext,
      viewport,
    };
    await page.render(renderContext).promise;
    images.push(canvas.toDataURL('image/jpeg'));
  }
  return images;
}


function PdfSlider({ pdfUrl }) {
  const [images, setImages] = useState([]);

  useEffect(() => {
    async function fetchImages() {
      const extractedImages = await extractPdfPagesToImages(pdfUrl);
      setImages(extractedImages);
    }

    fetchImages();
  }, [pdfUrl]);

  return (
    <Carousel>
      {images.map((imageDataUrl, index) => (
        <div key={index}>
          <img src={imageDataUrl} alt={`Page ${index + 1}`} />
        </div>
      ))}
    </Carousel>
  );
};

export default PdfSlider
