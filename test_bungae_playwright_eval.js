import { chromium } from 'playwright';

async function testBungaeDOM() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  let apiResults = [];

  page.on('response', async (response) => {
    const url = response.url();
    if (url.includes('api.bunjang.co.kr') && (url.includes('search') || url.includes('products') || url.includes('find'))) {
      try {
        const json = await response.json();
        if (json.data?.products || json.data?.items || json.list || json.data?.results) {
          const list = json.data?.products || json.data?.items || json.list || json.data?.results;
          console.log('Intercepted product API list count:', list.length, 'URL:', url);
          if (list.length > 0) apiResults = list;
        }
      } catch (e) {}
    }
  });

  await page.goto('https://m.bunjang.co.kr/search/products?q=' + encodeURIComponent('아이폰 15'), {
    waitUntil: 'networkidle',
    timeout: 15000
  });

  await page.waitForTimeout(2000);

  // Check all anchor tags
  const links = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('a'))
      .map(a => ({
        href: a.getAttribute('href'),
        text: a.innerText.trim(),
        innerHTML: a.innerHTML
      }))
      .filter(a => a.href && a.href.includes('/products/'));
  });

  console.log('Product links count in DOM:', links.length);
  if (links.length > 0) {
    console.log('Sample product link:', links[0]);
  }
  if (apiResults.length > 0) {
    console.log('Sample API product:', apiResults[0]);
  }

  await browser.close();
}

testBungaeDOM();
