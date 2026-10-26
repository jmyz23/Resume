const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 1200, height: 1600 }
  });

  const variant = process.argv[2] || 'general';
  const htmlPath = path.join(__dirname, `resume-${variant}.html`);
  const pdfPath = path.join(__dirname, `Resume-JiemingZhang-${variant}.pdf`);

  await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle' });
  await page.emulateMedia({ media: 'print' });

  await page.screenshot({
    path: path.join(__dirname, 'tmp', `resume-${variant}-qa.png`),
    fullPage: true
  });

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
