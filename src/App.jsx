import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Header } from './components/Header';
import { StatsDashboard } from './components/StatsDashboard';
import { FilterToolbar } from './components/FilterToolbar';
import { ProductList } from './components/ProductList';
import { ProductDetailModal } from './components/ProductDetailModal';
import { crawlLiveSearchData, filterAndSortItems, calculateStats } from './services/searchService';
import { exportToExcel } from './utils/excelExport';
import { Compass, Heart, User, Sparkles, RefreshCw, CheckCircle2 } from 'lucide-react';

const POPULAR_TAGS = ['아이폰 15', '맥북 프로', '갤럭시 S24', '에어팟 프로', '닌텐도 스위치', 'PS5', '아이패드'];

export function App() {
  const [searchQuery, setSearchQuery] = useState('아이폰 15');
  const [currentKeyword, setCurrentKeyword] = useState('아이폰 15');
  const [items, setItems] = useState([]);
  const [isCrawling, setIsCrawling] = useState(false);
  const [lastCrawledAt, setLastCrawledAt] = useState(null);

  // Selected Item for Product Detail Modal
  const [selectedItem, setSelectedItem] = useState(null);

  // Platform Filter: 'all', 'bungae', 'joonggo'
  const [platformFilter, setPlatformFilter] = useState('all');

  // Filter States
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [safeTradeOnly, setSafeTradeOnly] = useState(false);
  const [sortBy, setSortBy] = useState('newest'); // 'newest', 'price_asc', 'price_desc', 'likes'
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Perform crawl on demand
  const performCrawl = useCallback(async (keyword) => {
    setIsCrawling(true);
    try {
      const crawledData = await crawlLiveSearchData(keyword);
      setItems(crawledData);
      setLastCrawledAt(new Date().toLocaleTimeString('ko-KR'));
    } catch (err) {
      console.error('크롤링 실패:', err);
    } finally {
      setIsCrawling(false);
    }
  }, []);

  // Initial load crawl
  useEffect(() => {
    performCrawl(currentKeyword);
  }, [currentKeyword, performCrawl]);

  // Filtered and Sorted Data
  const filteredItems = useMemo(() => {
    return filterAndSortItems(items, {
      keyword: '',
      platform: platformFilter,
      minPrice,
      maxPrice,
      safeTradeOnly,
      sortBy
    });
  }, [items, platformFilter, minPrice, maxPrice, safeTradeOnly, sortBy]);

  // Real-time Statistics
  const stats = useMemo(() => {
    return calculateStats(filteredItems);
  }, [filteredItems]);

  // Event Handlers
  const handleSearch = (e) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) return;
    const trimmed = searchQuery.trim();
    setCurrentKeyword(trimmed);
  };

  const handleTriggerCrawl = () => {
    performCrawl(currentKeyword);
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

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
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
        isCrawling={isCrawling}
        onTriggerCrawl={handleTriggerCrawl}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">

        {/* Live Crawl Notice Bar */}
        <div className="bg-gradient-to-r from-red-500/10 via-emerald-500/10 to-indigo-500/10 rounded-xl p-3 mb-4 border border-gray-200/80 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-700">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-semibold text-gray-900">클릭 기반 실시간 크롤링 시스템</span>
            <span className="text-gray-500">| 버튼을 누르면 번개장터 &amp; 중고나라 최신 매물이 수집됩니다.</span>
          </div>

          <div className="flex items-center gap-2 font-medium shrink-0">
            {lastCrawledAt && (
              <span className="flex items-center gap-1 text-emerald-700 bg-emerald-100/80 px-2.5 py-0.5 rounded-full">
                <CheckCircle2 className="w-3.5 h-3.5" />
                마지막 크롤링: {lastCrawledAt}
              </span>
            )}
            <button
              onClick={handleTriggerCrawl}
              disabled={isCrawling}
              className="text-red-600 hover:text-red-700 font-bold flex items-center gap-1 underline underline-offset-2 ml-2"
            >
              <RefreshCw className={`w-3 h-3 ${isCrawling ? 'animate-spin' : ''}`} />
              지금 다시 크롤링
            </button>
          </div>
        </div>

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

        {/* Product Items List or Grid with Crawling Loading State */}
        {isCrawling ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center my-8 shadow-xs">
            <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h3 className="text-base font-bold text-gray-800">
              번개장터 &amp; 중고나라 매물을 실시간 크롤링 중입니다...
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              최신 가격, 등록 시간, 안전거래 여부를 실시간으로 수집하고 있습니다.
            </p>
          </div>
        ) : (
          <ProductList items={filteredItems} viewMode={viewMode} onItemClick={handleItemClick} />
        )}

      </main>

      {/* Product Detail Modal View */}
      {selectedItem && (
        <ProductDetailModal item={selectedItem} onClose={handleCloseModal} />
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-gray-500">
          <p className="font-semibold text-gray-700 mb-1">
            번개장터 &amp; 중고나라 가격 비교 스마트 알리미
          </p>
          <p>
            본 서비스는 매초 무분별한 요청 대신 사용자가 필요할 때 클릭하여 수집하는 On-Demand 크롤링 방식을 지원합니다.
          </p>
          <p className="mt-2 text-gray-400">© 2025 Market Price Aggregator. All rights reserved.</p>
        </div>
      </footer>

      {/* Mobile Sticky Bottom Navigation Bar (App Experience) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-2.5 z-40 flex items-center justify-between shadow-lg">
        <button
          onClick={handleTriggerCrawl}
          disabled={isCrawling}
          className="flex flex-col items-center gap-1 text-red-500 font-bold text-[11px]"
        >
          <RefreshCw className={`w-5 h-5 ${isCrawling ? 'animate-spin' : ''}`} />
          <span>크롤링</span>
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
