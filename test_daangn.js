import axios from 'axios';
import * as cheerio from 'cheerio';

async function testDaangn() {
  try {
    const res = await axios.get('https://www.daangn.com/search/' + encodeURIComponent('아이폰 15'), {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    const $ = cheerio.load(res.data);

    const scripts = $('script[type="application/ld+json"]');
    console.log('JSON-LD scripts count:', scripts.length);
    scripts.each((i, el) => {
      console.log(`Script ${i}:`, $(el).html());
    });

    const articles = $('article, .flea-market-article, .article-card, a.flea-market-article-link');
    console.log('Articles count:', articles.length);
    articles.each((i, el) => {
      if (i < 5) {
        const title = $(el).find('.article-title, .title').text().trim();
        const price = $(el).find('.article-price, .price').text().trim();
        const region = $(el).find('.article-region-name, .region-name').text().trim();
        const link = $(el).attr('href') || $(el).find('a').attr('href');
        const img = $(el).find('img').attr('src');
        console.log({ title, price, region, link, img });
      }
    });
  } catch(e) {
    console.error(e);
  }
}
testDaangn();
