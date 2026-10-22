import axios from 'axios';
import * as cheerio from 'cheerio';

async function testJoongnaHTML() {
  const url = 'https://web.joongna.com/search/' + encodeURIComponent('아이폰 15');
  const res = await axios.get(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7'
    }
  });

  const $ = cheerio.load(res.data);
  const items = [];

  // Check __NEXT_DATA__
  const nextDataRaw = $('#__NEXT_DATA__').html();
  if (nextDataRaw) {
    try {
      const nextData = JSON.parse(nextDataRaw);
      const pageProps = nextData?.props?.pageProps;
      console.log('PageProps keys:', Object.keys(pageProps || {}));

      // Look for products array in pageProps
      const searchData = pageProps?.dehydratedState?.queries || [];
      console.log('Queries count:', searchData.length);

      searchData.forEach((q, idx) => {
        const stateData = q?.state?.data;
        if (stateData && (stateData.items || stateData.products || stateData.data)) {
          const list = stateData.items || stateData.products || stateData.data || [];
          console.log(`Query ${idx} has items count:`, list.length);
          if (list.length > 0) {
            console.log('Sample item from query:', list[0]);
          }
        }
      });
    } catch (e) {
      console.error('Error parsing __NEXT_DATA__:', e);
    }
  }

  // Parse <a> tags with product hrefs
  $('a[href*="/product/"]').each((i, el) => {
    if (i < 5) {
      const href = $(el).attr('href');
      const text = $(el).text().trim();
      const img = $(el).find('img').attr('src');
      console.log('Product A Tag:', { href, text: text.substring(0, 50), img });
    }
  });
}

testJoongnaHTML();
