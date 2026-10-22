import axios from 'axios';
import * as cheerio from 'cheerio';

async function testJoongna() {
  const urls = [
    'https://m.joongna.com/search/' + encodeURIComponent('아이폰 15'),
    'https://web.joongna.com/search/' + encodeURIComponent('아이폰 15'),
    'https://api.joongna.com/search?keyword=' + encodeURIComponent('아이폰 15')
  ];

  for (const url of urls) {
    try {
      console.log('Testing URL:', url);
      const res = await axios.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7'
        },
        timeout: 5000
      });
      console.log('Status:', res.status, 'Data len:', res.data?.length || typeof res.data);
      const $ = cheerio.load(res.data);
      console.log('Title:', $('title').text());
      console.log('Links count:', $('a').length);
      console.log('Images count:', $('img').length);
      console.log('Script count:', $('script').length);

      // Check Next.js __NEXT_DATA__
      const nextData = $('#__NEXT_DATA__').html();
      if (nextData) {
        console.log('Found __NEXT_DATA__ len:', nextData.length);
        const parsed = JSON.parse(nextData);
        console.log('__NEXT_DATA__ keys:', Object.keys(parsed));
      }
    } catch(e) {
      console.error('Failed:', e.message, e.response?.status);
    }
  }
}

testJoongna();
