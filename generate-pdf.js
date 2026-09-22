const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 1200, height: 1600 }
  });

  const monthDay = new Date().toLocaleString('en-US', {
    month: 'short',
    day: '2-digit'
  }).replace(/\s+/g, '').replace(',', '');
  const nameStamp = 'JiemingZhang';
  const htmlPath = path.join(__dirname, 'resume.html');
  const pdfPath = path.join(__dirname, `Resume-${nameStamp}-${monthDay}.pdf`);

  await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle' });
  await page.emulateMedia({ media: 'print' });

  await page.pdf({
    path: pdfPath,
    format: 'Letter',
    printBackground: true,
    preferCSSPageSize: true
  });

  await browser.close();
  console.log(`Created ${pdfPath}`);
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
