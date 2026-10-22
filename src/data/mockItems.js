// Sample item database for Bungaejangter and Joonggonara generating 1,000+ items per search query
export const INITIAL_ITEMS = generateDynamicItems('아이폰 15');

export function generateDynamicItems(keyword) {
  const trimmed = (keyword || '아이폰 15').trim();
  const now = Date.now();

  let hash = 0;
  for (let i = 0; i < trimmed.length; i++) {
    hash = (hash << 5) - hash + trimmed.charCodeAt(i);
    hash |= 0;
  }
  const baseSeed = Math.abs(hash) + 100000;
  const basePrice = Math.floor((Math.abs(hash) % 70 + 15)) * 10000;

  const sampleImages = [
    'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1663499482523-1c0c1bae4ce1?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=600&auto=format&fit=crop&q=80'
  ];

  const locations = [
    '서울특별시 강남구 역삼동', '서울특별시 마포구 서교동', '서울특별시 송파구 잠실동',
    '경기도 성남시 분당구', '경기도 수원시 영통구', '경기도 고양시 일산동구',
    '인천광역시 연수구 송도동', '부산광역시 해운대구', '대구광역시 수성구',
    '대전광역시 유성구', '광주광역시 서구 치평동', '울산광역시 남구 삼산동'
  ];

  const conditions = ['S급 (최상)', 'A급 (상태 양호)', 'B급 (사용감 있음)', '미개봉 (새상품)'];
  const titlesPrefix = ['[급매]', '[자급제]', '[풀박스]', '[배터리100%]', '[정품보증]', '[직거래선호]', '[S급미품]', '[무흠집]'];

  const items = [];
  const TOTAL_COUNT = 1200; // Generate 1,200 items per search query

  for (let i = 1; i <= TOTAL_COUNT; i++) {
    const isBungae = i % 2 === 1;
    const itemPlatform = isBungae ? 'bungae' : 'joonggo';

    const priceVariance = ((i * 17) % 70 - 35) / 100;
    const price = Math.round((basePrice * (1 + priceVariance)) / 10000) * 10000 || 50000;

    const imgIndex = (i + baseSeed) % sampleImages.length;
    const locIndex = (i * 3 + baseSeed) % locations.length;
    const condIndex = (i * 7 + baseSeed) % conditions.length;
    const prefixIndex = (i * 11) % titlesPrefix.length;

    const timeAgoMinutes = i * 2;
    let dateStr = '방금 전';
    if (timeAgoMinutes >= 60 * 24) {
      dateStr = `${Math.floor(timeAgoMinutes / (60 * 24))}일 전`;
    } else if (timeAgoMinutes >= 60) {
      dateStr = `${Math.floor(timeAgoMinutes / 60)}시간 전`;
    } else {
      dateStr = `${timeAgoMinutes}분 전`;
    }

    const link = isBungae
      ? `https://m.bunjang.co.kr/search/products?q=${encodeURIComponent(trimmed)}`
      : `https://m.joongna.com/search/${encodeURIComponent(trimmed)}`;

    items.push({
      id: `${itemPlatform}-${baseSeed}-${i}`,
      platform: itemPlatform,
      title: `${titlesPrefix[prefixIndex]} ${trimmed} #${i}`,
      price,
      imageUrl: sampleImages[imgIndex],
      location: locations[locIndex],
      date: dateStr,
      timestamp: now - timeAgoMinutes * 60 * 1000,
      safeTrade: i % 3 !== 0,
      status: 'AVAILABLE',
      seller: `${itemPlatform === 'bungae' ? '번개' : '중고'}_판매자${(i * 13) % 999 + 1}`,
      link,
      likes: (i * 7) % 50,
      views: (i * 23) % 800 + 10,
      condition: conditions[condIndex]
    });
  }

  return items;
}
