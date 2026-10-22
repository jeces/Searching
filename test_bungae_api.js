import axios from 'axios';

async function testBungaeAPI() {
  const urls = [
    'https://api.bunjang.co.kr/api/1/find_v2.json?q=' + encodeURIComponent('아이폰 15') + '&page=0&n=12',
    'https://api.bunjang.co.kr/api/search/v8/pw/product/specs/keyword?q=' + encodeURIComponent('아이폰 15')
  ];

  for (const url of urls) {
    try {
      console.log('Testing Bunjang API:', url);
      const res = await axios.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Origin': 'https://m.bunjang.co.kr',
          'Referer': 'https://m.bunjang.co.kr/'
        }
      });
      console.log('Status:', res.status, 'Keys:', Object.keys(res.data));
      if (res.data.list) {
        console.log('List count:', res.data.list.length);
        console.log('Sample product:', res.data.list[0].pid, res.data.list[0].name, res.data.list[0].price, res.data.list[0].product_image);
      }
      if (res.data.data) {
        console.log('Data keys:', Object.keys(res.data.data));
      }
    } catch(e) {
      console.error('API Error:', e.message, e.response?.status);
    }
  }
}

testBungaeAPI();
