import axios from 'axios';

async function testServerEndpoint() {
  try {
    const res = await axios.get('http://localhost:4000/api/search?q=' + encodeURIComponent('아이폰 15'), { timeout: 25000 });
    console.log('API Status:', res.status);
    console.log('Success:', res.data.success);
    console.log('Keyword:', res.data.keyword);
    console.log('Total Count:', res.data.totalCount);
    console.log('Counts - Daangn:', res.data.daangnCount, 'Joonggo:', res.data.joonggoCount, 'Bungae:', res.data.bungaeCount);
    if (res.data.items && res.data.items.length > 0) {
      console.log('Sample item:', res.data.items[0]);
    }
  } catch(e) {
    console.error('Server Test Error:', e.message);
  }
}

testServerEndpoint();
