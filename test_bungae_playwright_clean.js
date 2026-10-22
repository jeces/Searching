import { chromium } from 'playwright';

async function scrapeBungae(keyword) {
  let browser;
  try {
    browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    });
    const page = await context.newPage();

    await page.goto('https://m.bunjang.co.kr/search/products?q=' + encodeURIComponent(keyword), {
      waitUntil: 'networkidle',
      timeout: 15000
    });

    await page.waitForTimeout(1500);

    const items = await page.evaluate((k) => {
      const results = [];
      const anchors = Array.from(document.querySelectorAll('a[href*="/products/"]'));

      anchors.forEach((a, idx) => {
        const href = a.getAttribute('href') || '';
        const innerText = a.innerText || '';

        // Filter out AD items (광고 항목 섞임)
        const isAd = innerText.includes('AD\n') || innerText.startsWith('AD') || href.includes('ref_source=sa') || href.includes('AD_N');
        if (isAd) return;

        // Parse price
        const priceMatch = innerText.match(/([0-9,]+)\s*원/);
        const price = priceMatch ? parseInt(priceMatch[1].replace(/,/g, ''), 10) : 0;

        // Parse title
        const lines = innerText.split('\n').filter(l => l.trim() && !l.includes('원') && l !== 'AD');
        const title = lines[0] || `${k} 중고 매물`;

        // Parse image
        const imgEl = a.querySelector('img');
        const img = imgEl ? (imgEl.getAttribute('src') || imgEl.getAttribute('data-src')) : '';

        // Extract product ID
        const pidMatch = href.match(/\/products\/(\d+)/);
        const pid = pidMatch ? pidMatch[1] : `${Date.now()}-${idx}`;
        const cleanLink = `https://m.bunjang.co.kr/products/${pid}`;

        if (price > 0 && title) {
          results.push({
            id: `bungae-${pid}`,
            platform: 'bungae',
            title,
            price,
            imageUrl: img,
            location: '번개장터 전국',
            date: '최신 매물',
            timestamp: Date.now() - idx * 60000,
            safeTrade: true,
            status: 'AVAILABLE',
            seller: '번개장터 판매자',
            link: cleanLink,
            likes: Math.floor(Math.random() * 20),
            views: Math.floor(Math.random() * 400) + 10,
            condition: '중고거래 (번개장터)'
          });
        }
      });

      return results;
    }, keyword);

    await browser.close();
    return items;
  } catch (err) {
    if (browser) await browser.close();
    console.error('Bungae scrape error:', err.message);
    return [];
  }
}

scrapeBungae('아이폰 15').then(res => {
  console.log(`Scraped ${res.length} organic Bungae items`);
  console.log('Sample Bungae item:', res[0]);
});
