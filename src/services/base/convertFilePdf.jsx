import pdfjs from 'pdfjs-dist';

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
