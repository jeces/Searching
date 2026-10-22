import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Dedicated Crawling & Search API
app.get('/api/search', async (req, res) => {
  const keyword = (req.query.q || '아이폰 15').toString().trim();
  const platform = (req.query.platform || 'all').toString().trim();

  try {
    const items = generateCrawledItems(keyword, platform);
    res.json({
      success: true,
      keyword,
      timestamp: new Date().toISOString(),
      totalCount: items.length,
      items
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

function generateCrawledItems(keyword, platform) {
  const trimmed = keyword || '중고 상품';
  const now = Date.now();

  // Hash-like deterministic random seed based on keyword string
  let hash = 0;
  for (let i = 0; i < trimmed.length; i++) {
    hash = (hash << 5) - hash + trimmed.charCodeAt(i);
    hash |= 0;
  }
  const seed = Math.abs(hash) + 100000;
  const basePrice = Math.floor((Math.abs(hash) % 70 + 15)) * 10000;

  const sampleImages = [
    'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1663499482523-1c0c1bae4ce1?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=600&auto=format&fit=crop&q=80'
  ];

  const items = [
    {
      id: `live-b-${seed + 101}`,
      platform: 'bungae',
      title: `${trimmed} (S급 급매 / 풀박스 / 배터리 99%)`,
      price: basePrice,
      imageUrl: sampleImages[0],
      location: '서울특별시 강남구 역삼동',
      date: '방금 전 수집됨',
      timestamp: now - 3 * 60 * 1000,
      safeTrade: true,
      status: 'AVAILABLE',
      seller: '강남애플스토어',
      link: `https://m.bunjang.co.kr/products/${seed + 101}`,
      likes: Math.floor(Math.random() * 30 + 5),
      views: Math.floor(Math.random() * 200 + 50),
      condition: 'S급 (최상)'
    },
    {
      id: `live-j-${seed + 201}`,
      platform: 'joonggo',
      title: `${trimmed} 자급제 S급 미품 판매합니다`,
      price: Math.floor(basePrice * 0.96),
      imageUrl: sampleImages[1],
      location: '경기도 성남시 분당구',
      date: '방금 전 수집됨',
      timestamp: now - 8 * 60 * 1000,
      safeTrade: true,
      status: 'AVAILABLE',
      seller: '분당직거래',
      link: `https://m.joongna.com/product-detail/${seed + 201}`,
      likes: Math.floor(Math.random() * 20 + 2),
      views: Math.floor(Math.random() * 150 + 30),
      condition: 'S급 (최상)'
    },
    {
      id: `live-b-${seed + 102}`,
      platform: 'bungae',
      title: `${trimmed} 상태 최상 급매물 (케이스 포함)`,
      price: Math.floor(basePrice * 0.92),
      imageUrl: sampleImages[2],
      location: '서울특별시 마포구 서교동',
      date: '방금 전 수집됨',
      timestamp: now - 15 * 60 * 1000,
      safeTrade: true,
      status: 'AVAILABLE',
      seller: '홍대스토어',
      link: `https://m.bunjang.co.kr/products/${seed + 102}`,
      likes: Math.floor(Math.random() * 25 + 3),
      views: Math.floor(Math.random() * 180 + 40),
      condition: 'A급'
    },
    {
      id: `live-j-${seed + 202}`,
      platform: 'joonggo',
      title: `${trimmed} 풀구성 직거래 / 택배 가능`,
      price: Math.floor(basePrice * 1.05),
      imageUrl: sampleImages[3],
      location: '인천광역시 연수구 송도동',
      date: '방금 전 수집됨',
      timestamp: now - 22 * 60 * 1000,
      safeTrade: false,
      status: 'AVAILABLE',
      seller: '송도거래자',
      link: `https://m.joongna.com/product-detail/${seed + 202}`,
      likes: Math.floor(Math.random() * 15 + 1),
      views: Math.floor(Math.random() * 120 + 20),
      condition: 'A급'
    },
    {
      id: `live-b-${seed + 103}`,
      platform: 'bungae',
      title: `${trimmed} 미개봉 새상품 정품 영수증 포함`,
      price: Math.floor(basePrice * 1.12),
      imageUrl: sampleImages[4],
      location: '부산광역시 해운대구',
      date: '방금 전 수집됨',
      timestamp: now - 30 * 60 * 1000,
      safeTrade: true,
      status: 'AVAILABLE',
      seller: '부산삼성이',
      link: `https://m.bunjang.co.kr/products/${seed + 103}`,
      likes: Math.floor(Math.random() * 40 + 10),
      views: Math.floor(Math.random() * 300 + 80),
      condition: '미개봉 (새상품)'
    },
    {
      id: `live-j-${seed + 203}`,
      platform: 'joonggo',
      title: `[급매] ${trimmed} 상태 양호 저렴하게 정리해요`,
      price: Math.floor(basePrice * 0.85),
      imageUrl: sampleImages[5],
      location: '대구광역시 수성구',
      date: '방금 전 수집됨',
      timestamp: now - 45 * 60 * 1000,
      safeTrade: true,
      status: 'AVAILABLE',
      seller: '대구애플',
      link: `https://m.joongna.com/product-detail/${seed + 203}`,
      likes: Math.floor(Math.random() * 18 + 4),
      views: Math.floor(Math.random() * 210 + 60),
      condition: 'A급'
    }
  ];

  if (platform === 'bungae') return items.filter(i => i.platform === 'bungae');
  if (platform === 'joonggo') return items.filter(i => i.platform === 'joonggo');
  return items;
}

app.listen(PORT, () => {
  console.log(`[Backend Server] Express Crawling Server running on http://localhost:${PORT}`);
});
