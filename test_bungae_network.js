import { chromium } from 'playwright';

async function testBungaeNetwork() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  page.on('response', async (res) => {
    const url = res.url();
    if (url.includes('api.bunjang.co.kr') || url.includes('find_v2') || url.includes('search')) {
      console.log('Intercepted API:', res.status(), url);
      try {
        const json = await res.json();
        console.log('API JSON keys:', Object.keys(json));
        if (json.list) console.log('Items in list:', json.list.length);
      } catch (e) {}
    }
  });

  await page.goto('https://m.bunjang.co.kr/search/products?q=' + encodeURIComponent('아이폰 15'), {
    waitUntil: 'domcontentloaded',
    timeout: 10000
  });

  await page.waitForTimeout(3000);

  const content = await page.content();
  console.log('Page content length:', content.length);

  await browser.close();
}

testBungaeNetwork();
