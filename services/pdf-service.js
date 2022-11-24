const PDFDocument = require('pdfkit');

function buildPDF(images, dataCallback, endCallback) {
  const doc = new PDFDocument({ bufferPages: true, font: 'Courier' });

  doc.on('data', dataCallback);
  doc.on('end', endCallback);

  let y = 0;
  for (const img of images) {
    doc.image(img, 0, y, {fit: [200, 200], align: 'center', valign: 'center'});
    y+= 200;
  }
  
  doc.end();
  
}

module.exports = { buildPDF };