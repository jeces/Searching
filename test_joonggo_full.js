import axios from 'axios';
import * as cheerio from 'cheerio';

async function scrapeJoonggonara(keyword) {
  try {
    const url = 'https://web.joongna.com/search/' + encodeURIComponent(keyword);
    const res = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7'
      },
      timeout: 5000
    });

    const $ = cheerio.load(res.data);
    const items = [];

    $('a[href*="/product/"]').each((i, el) => {
      const href = $(el).attr('href') || '';
      if (href.includes('/product/form') || href.includes('type=regist')) return;

      const title = $(el).find('h2, div[class*="title"], span[class*="title"]').text().trim() || $(el).find('div').first().text().trim() || $(el).text().trim();
      const rawText = $(el).text().trim();

      // Extract price (e.g., 850,000원 -> 850000)
      const priceMatch = rawText.match(/([0-9,]+)\s*원/);
      const price = priceMatch ? parseInt(priceMatch[1].replace(/,/g, ''), 10) : 0;

      // Extract image
      const img = $(el).find('img').attr('src') || '';

      // Construct direct URL
      const link = href.startsWith('http') ? href : `https://web.joongna.com${href}`;
      const productIdMatch = href.match(/\/product\/(\d+)/);
      const productId = productIdMatch ? productIdMatch[1] : `${Date.now()}-${i}`;

      // Clean title if it contains price and time concatenated
      let cleanedTitle = title;
      if (priceMatch && cleanedTitle.includes(priceMatch[0])) {
        cleanedTitle = cleanedTitle.split(priceMatch[0])[0].trim();
      }

      if (cleanedTitle && price > 0) {
        items.push({
          id: `joonggo-${productId}`,
          platform: 'joonggo',
          title: cleanedTitle,
          price,
          imageUrl: img.startsWith('//') ? `https:${img}` : img,
          location: '중고나라 전국',
          date: '최신 매물',
          timestamp: Date.now() - i * 60000,
          safeTrade: true,
          status: 'AVAILABLE',
          seller: '중고나라 회원',
          link,
          likes: Math.floor(Math.random() * 15),
          views: Math.floor(Math.random() * 300) + 20,
          condition: '상태 양호 (중고나라)'
        });
      }
    });

    return items;
  } catch (err) {
    console.error('Joonggo error:', err.message);
    return [];
  }
}

scrapeJoonggonara('아이폰 15').then(res => {
  console.log(`Scraped ${res.length} Joonggonara items`);
  console.log('Sample item:', res[0]);
});
