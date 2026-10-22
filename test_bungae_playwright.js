import { chromium } from 'playwright';

async function testBungae() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });
  const page = await context.newPage();

  console.log('Navigating to Bunjang...');
  await page.goto('https://m.bunjang.co.kr/search/products?q=' + encodeURIComponent('아이폰 15'), {
    waitUntil: 'networkidle',
    timeout: 15000
  });

  await page.waitForTimeout(2000);

  // Extract cards
  const items = await page.evaluate(() => {
    const results = [];
    // Select product anchor tags
    const anchors = Array.from(document.querySelectorAll('a[href*="/products/"]'));
    anchors.forEach((a, idx) => {
      const href = a.getAttribute('href');
      const isAd = a.innerText.includes('AD') || a.innerText.includes('광고') || a.querySelector('[class*="ad"]') !== null;
      const titleEl = a.querySelector('[class*="title"], [class*="Name"]') || a;
      const priceEl = a.querySelector('[class*="price"], [class*="Price"]');
      const imgEl = a.querySelector('img');

      const title = titleEl ? titleEl.innerText.trim() : '';
      const priceText = priceEl ? priceEl.innerText.replace(/[^0-9]/g, '') : '';
      const price = priceText ? parseInt(priceText, 10) : 0;
      const img = imgEl ? imgEl.getAttribute('src') : '';

      if (href && !isAd && price > 0) {
        results.push({
          href,
          title: title.split('\n')[0],
          price,
          img,
          isAd
        });
      }
    });
    return results;
  });

  console.log(`Extracted ${items.length} items from Bunjang`);
  if (items.length > 0) {
    console.log('Sample Bungae item:', items[0]);
  }

  await browser.close();
}

testBungae().catch(err => console.error('Error:', err));
