import axios from 'axios';
import * as cheerio from 'cheerio';

async function scrapeDaangn(keyword) {
  try {
    const response = await axios.get(`https://www.daangn.com/search/${encodeURIComponent(keyword)}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      },
      timeout: 5000
    });

    const $ = cheerio.load(response.data);
    const items = [];

    // Parse JSON-LD structured data
    $('script[type="application/ld+json"]').each((_, el) => {
      try {
        const json = JSON.parse($(el).html() || '{}');
        const list = json.itemListElement || (Array.isArray(json) ? json : [json]);

        list.forEach((entry, idx) => {
          const itemData = entry.item || entry;
          if (itemData && itemData['@type'] === 'Product') {
            const title = itemData.name || '';
            const price = parseInt(itemData.offers?.price || '0', 10);
            const link = itemData.url || '';
            const imageUrl = itemData.image || '';
            const description = itemData.description || '';

            if (title && link) {
              items.push({
                id: `daangn-${Date.now()}-${idx}`,
                platform: 'daangn',
                title,
                price: isNaN(price) ? 0 : price,
                imageUrl,
                location: '당근 이웃 동네',
                date: '최신 매물',
                timestamp: Date.now(),
                safeTrade: true,
                status: 'AVAILABLE',
                seller: '당근이웃',
                link,
                likes: Math.floor(Math.random() * 20),
                views: Math.floor(Math.random() * 200) + 10,
                condition: '상태 양호 (당근)'
              });
            }
          }
        });
      } catch (err) {
        // ignore invalid json snippet
      }
    });

    // Fallback if HTML article parsing is available
    if (items.length === 0) {
      $('article.flea-market-article, .article-card').each((i, el) => {
        const title = $(el).find('.article-title').text().trim();
        const priceStr = $(el).find('.article-price').text().replace(/[^0-9]/g, '');
        const price = parseInt(priceStr, 10) || 0;
        const region = $(el).find('.article-region-name').text().trim() || '당근 동네';
        const rawLink = $(el).find('a').attr('href') || '';
        const link = rawLink.startsWith('http') ? rawLink : `https://www.daangn.com${rawLink}`;
        const imageUrl = $(el).find('img').attr('src') || '';

        if (title) {
          items.push({
            id: `daangn-html-${Date.now()}-${i}`,
            platform: 'daangn',
            title,
            price,
            imageUrl,
            location: region,
            date: '최신 매물',
            timestamp: Date.now(),
            safeTrade: true,
            status: 'AVAILABLE',
            seller: '당근이웃',
            link,
            likes: Math.floor(Math.random() * 10),
            views: Math.floor(Math.random() * 100) + 5,
            condition: '중고거래 (당근)'
          });
        }
      });
    }

    return items;
  } catch (err) {
    console.error('Daangn scrape error:', err.message);
    return [];
  }
}

scrapeDaangn('아이폰 15').then(res => {
  console.log(`Scraped ${res.length} Daangn items`);
  console.log('Sample item:', res[0]);
});
