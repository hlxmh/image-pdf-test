const express = require('express');
const pdfService = require('../services/pdf-service');

const router = express.Router();
router.put('/pdf', (req, res, next) => {
  const stream = res.writeHead(200, {
    'Content-Type': 'application/pdf',
    'Content-Disposition': `inline;filename=screenshots.pdf`,
  });
  pdfService.buildPDF(
    req.body,
    (chunk) => stream.write(chunk),
    () => stream.end()
  );
});

router.get('/lol', (req, res, next) => {
  res.send("cs")
});

module.exports = router;
