import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { StatsDashboard } from './components/StatsDashboard';
import { FilterToolbar } from './components/FilterToolbar';
import { ProductList } from './components/ProductList';
import { searchAllPlatforms, filterAndSortItems, calculateStats } from './services/searchService';
import { exportToExcel } from './utils/excelExport';
import { Search, Compass, Heart, User, Sparkles } from 'lucide-react';

const POPULAR_TAGS = ['아이폰 15', '맥북 프로', '갤럭시 S24', '에어팟 프로', '닌텐도 스위치', 'PS5', '아이패드'];

export function App() {
  const [searchQuery, setSearchQuery] = useState('아이폰 15');
  const [currentKeyword, setCurrentKeyword] = useState('아이폰 15');

  // Platform Filter: 'all', 'bungae', 'joonggo'
  const [platformFilter, setPlatformFilter] = useState('all');

  // Filter States
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [safeTradeOnly, setSafeTradeOnly] = useState(false);
  const [sortBy, setSortBy] = useState('newest'); // 'newest', 'price_asc', 'price_desc', 'likes'
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Raw Search Data
  const rawDataset = useMemo(() => {
    return searchAllPlatforms(currentKeyword);
  }, [currentKeyword]);

  // Filtered and Sorted Data
  const filteredItems = useMemo(() => {
    return filterAndSortItems(rawDataset, {
      keyword: '', // Keyword already fetched dynamic dataset
      platform: platformFilter,
      minPrice,
      maxPrice,
      safeTradeOnly,
      sortBy
    });
  }, [rawDataset, platformFilter, minPrice, maxPrice, safeTradeOnly, sortBy]);

  // Real-time Statistics
  const stats = useMemo(() => {
    return calculateStats(filteredItems);
  }, [filteredItems]);

  // Event Handlers
  const handleSearch = (e) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) return;
    setCurrentKeyword(searchQuery.trim());
  };

  const handleTagClick = (tag) => {
    setSearchQuery(tag);
    setCurrentKeyword(tag);
  };

  const handleResetFilters = () => {
    setMinPrice('');
    setMaxPrice('');
    setSafeTradeOnly(false);
    setSortBy('newest');
    setPlatformFilter('all');
  };

  const handleExportExcel = () => {
    exportToExcel(filteredItems, currentKeyword);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-16 md:pb-8">
      {/* Top Header */}
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
        platformFilter={platformFilter}
        setPlatformFilter={setPlatformFilter}
        stats={stats}
        quickTags={POPULAR_TAGS}
        onTagClick={handleTagClick}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">

        {/* Realtime Market Price Dashboard */}
        <StatsDashboard stats={stats} currentKeyword={currentKeyword} />

        {/* Filter Controls & View Switcher Toolbar */}
        <FilterToolbar
          minPrice={minPrice}
          setMinPrice={setMinPrice}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          safeTradeOnly={safeTradeOnly}
          setSafeTradeOnly={setSafeTradeOnly}
          sortBy={sortBy}
          setSortBy={setSortBy}
          viewMode={viewMode}
          setViewMode={setViewMode}
          onResetFilters={handleResetFilters}
          onExportExcel={handleExportExcel}
          totalCount={filteredItems.length}
          showMobileFilters={showMobileFilters}
          setShowMobileFilters={setShowMobileFilters}
        />

        {/* Product Items List or Grid */}
        <ProductList items={filteredItems} viewMode={viewMode} />

      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-gray-500">
          <p className="font-semibold text-gray-700 mb-1">
            번개장터 &amp; 중고나라 가격 비교 스마트 알리미
          </p>
          <p>
            본 서비스는 번개장터와 중고나라의 오픈 데이터를 한 곳에서 실시간 비교 및 시세 산출을 용이하게 지원합니다.
          </p>
          <p className="mt-2 text-gray-400">© 2025 Market Price Aggregator. All rights reserved.</p>
        </div>
      </footer>

      {/* Mobile Sticky Bottom Navigation Bar (App Experience) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-2.5 z-40 flex items-center justify-between shadow-lg">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex flex-col items-center gap-1 text-red-500 font-bold text-[11px]"
        >
          <Search className="w-5 h-5" />
          <span>시세검색</span>
        </button>

        <button
          onClick={handleExportExcel}
          className="flex flex-col items-center gap-1 text-emerald-600 font-bold text-[11px]"
        >
          <Sparkles className="w-5 h-5" />
          <span>엑셀출력</span>
        </button>

        <button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="flex flex-col items-center gap-1 text-gray-600 font-medium text-[11px]"
        >
          <Compass className="w-5 h-5" />
          <span>상세필터</span>
        </button>

        <button
          onClick={() => alert('찜 기능 준비 중입니다.')}
          className="flex flex-col items-center gap-1 text-gray-600 font-medium text-[11px]"
        >
          <Heart className="w-5 h-5" />
          <span>관심목록</span>
        </button>

        <button
          onClick={() => alert('내 정보 준비 중입니다.')}
          className="flex flex-col items-center gap-1 text-gray-600 font-medium text-[11px]"
        >
          <User className="w-5 h-5" />
          <span>마이</span>
        </button>
      </div>
    </div>
  );
}

export default App;
