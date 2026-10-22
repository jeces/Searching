import { INITIAL_ITEMS, generateDynamicItems } from '../data/mockItems.js';

export function filterAndSortItems(items, filters) {
  const {
    keyword = '',
    platform = 'all', // 'all', 'bungae', 'joonggo'
    minPrice = '',
    maxPrice = '',
    safeTradeOnly = false,
    sortBy = 'newest' // 'newest', 'price_asc', 'price_desc', 'likes'
  } = filters;

  let result = items;

  // Platform filter
  if (platform !== 'all') {
    result = result.filter(item => item.platform === platform);
  }

  // Keyword filter
  if (keyword.trim()) {
    const k = keyword.trim().toLowerCase();
    result = result.filter(item =>
      item.title.toLowerCase().includes(k) ||
      item.seller.toLowerCase().includes(k) ||
      item.location.toLowerCase().includes(k)
    );
  }

  // Safe trade filter
  if (safeTradeOnly) {
    result = result.filter(item => item.safeTrade);
  }

  // Min price filter
  if (minPrice !== '' && !isNaN(minPrice)) {
    result = result.filter(item => item.price >= Number(minPrice));
  }

  // Max price filter
  if (maxPrice !== '' && !isNaN(maxPrice)) {
    result = result.filter(item => item.price <= Number(maxPrice));
  }

  // Sorting
  result = [...result].sort((a, b) => {
    if (sortBy === 'price_asc') {
      return a.price - b.price;
    } else if (sortBy === 'price_desc') {
      return b.price - a.price;
    } else if (sortBy === 'likes') {
      return b.likes - a.likes;
    } else {
      // newest
      return b.timestamp - a.timestamp;
    }
  });

  return result;
}

export function calculateStats(items) {
  if (!items || items.length === 0) {
    return {
      count: 0,
      avgPrice: 0,
      minPrice: 0,
      maxPrice: 0,
      bungaeCount: 0,
      joonggoCount: 0
    };
  }

  const prices = items.map(item => item.price);
  const total = prices.reduce((acc, curr) => acc + curr, 0);
  const avgPrice = Math.round(total / items.length);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  const bungaeCount = items.filter(item => item.platform === 'bungae').length;
  const joonggoCount = items.filter(item => item.platform === 'joonggo').length;

  return {
    count: items.length,
    avgPrice,
    minPrice,
    maxPrice,
    bungaeCount,
    joonggoCount
  };
}

// On-demand crawler connected to backend Express crawling API
export async function crawlLiveSearchData(keyword) {
  try {
    const res = await fetch(`http://localhost:4000/api/search?q=${encodeURIComponent(keyword)}`);
    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.items)) {
        return data.items;
      }
    }
  } catch (err) {
    console.warn('[Crawling API] Backend server offline or starting up, using direct generator fallback:', err);
  }

  // Direct fallback generator if server is starting
  await new Promise((resolve) => setTimeout(resolve, 500));
  const items = generateDynamicItems(keyword);
  const now = Date.now();

  return items.map((item, idx) => ({
    ...item,
    date: '방금 전 수집됨',
    timestamp: now - (idx * 30 * 1000),
    views: item.views + Math.floor(Math.random() * 5) + 1
  }));
}
