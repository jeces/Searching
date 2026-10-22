export function filterAndSortItems(items, filters) {
  const {
    keyword = '',
    platform = 'all', // 'all', 'daangn', 'bungae', 'joonggo'
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
      (item.seller && item.seller.toLowerCase().includes(k)) ||
      (item.location && item.location.toLowerCase().includes(k))
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
      return (b.likes || 0) - (a.likes || 0);
    } else {
      // newest
      return (b.timestamp || 0) - (a.timestamp || 0);
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
      daangnCount: 0,
      bungaeCount: 0,
      joonggoCount: 0
    };
  }

  const prices = items.map(item => item.price).filter(p => typeof p === 'number' && !isNaN(p));
  const total = prices.reduce((acc, curr) => acc + curr, 0);
  const avgPrice = prices.length > 0 ? Math.round(total / prices.length) : 0;
  const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
  const maxPrice = prices.length > 0 ? Math.max(...prices) : 0;

  const daangnCount = items.filter(item => item.platform === 'daangn').length;
  const bungaeCount = items.filter(item => item.platform === 'bungae').length;
  const joonggoCount = items.filter(item => item.platform === 'joonggo').length;

  return {
    count: items.length,
    avgPrice,
    minPrice,
    maxPrice,
    daangnCount,
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
    console.warn('[Crawling API] Backend server fetch error:', err);
  }

  return [];
}
