import React from 'react';
import { Search, Globe, X, RefreshCw } from 'lucide-react';

export function Header({
  searchQuery,
  setSearchQuery,
  handleSearch,
  platformFilter,
  setPlatformFilter,
  stats,
  quickTags,
  onTagClick,
  isCrawling,
  onTriggerCrawl
}) {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top bar: Brand, Search, & Crawl Button */}
        <div className="py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Logo Brand */}
          <div className="flex items-center justify-between md:justify-start space-x-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-500 via-red-500 to-emerald-600 flex items-center justify-center text-white font-black text-xl shadow-md">
                중
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-bold tracking-tight text-gray-900">
                    중고통합시세 <span className="text-orange-500">검색</span>
                  </h1>
                  <span className="bg-orange-100 text-orange-700 text-xs font-semibold px-2 py-0.5 rounded-full">
                    LIVE
                  </span>
                </div>
                <p className="text-xs text-gray-500 font-medium">
                  당근마켓 · 번개장터 · 중고나라 통합 수집
                </p>
              </div>
            </div>

            {/* Mobile Crawl Refresh Button */}
            <button
              onClick={onTriggerCrawl}
              disabled={isCrawling}
              className="md:hidden flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold text-xs rounded-xl shadow transition-all active:scale-95 disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isCrawling ? 'animate-spin' : ''}`} />
              <span>{isCrawling ? '크롤링중...' : '크롤링'}</span>
            </button>
          </div>

          {/* Search Input Box + Crawl Refresh Action */}
          <div className="flex-1 max-w-2xl flex items-center gap-2">
            <form
              onSubmit={handleSearch}
              className="flex-1 relative"
            >
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="검색어를 입력하세요 (예: 아이폰 15, 맥북, 에어팟)"
                  className="w-full pl-11 pr-24 py-3 bg-gray-100 hover:bg-gray-50 focus:bg-white rounded-2xl border-2 border-transparent focus:border-orange-500 text-gray-900 placeholder-gray-400 text-sm md:text-base font-medium transition-all shadow-inner outline-none"
                />
                <Search className="absolute left-4 w-5 h-5 text-gray-400" />

                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-20 text-gray-400 hover:text-gray-600 p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}

                <button
                  type="submit"
                  disabled={isCrawling}
                  className="absolute right-1.5 top-1.5 bottom-1.5 px-4 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-semibold rounded-xl text-sm transition-colors flex items-center gap-1 shadow-sm disabled:opacity-50"
                >
                  {isCrawling ? '조회중...' : '검색'}
                </button>
              </div>
            </form>

            {/* Desktop Crawl Refresh Button */}
            <button
              onClick={onTriggerCrawl}
              disabled={isCrawling}
              className="hidden md:flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-orange-500 via-red-500 to-emerald-600 hover:from-orange-600 hover:to-emerald-700 text-white font-bold text-sm rounded-2xl shadow-md hover:shadow-lg transition-all active:scale-95 disabled:opacity-50 shrink-0"
              title="클릭 시 당근마켓, 번개장터, 중고나라 최신 매물 데이터를 실시간 크롤링하여 갱신합니다."
            >
              <RefreshCw className={`w-4 h-4 ${isCrawling ? 'animate-spin' : ''}`} />
              <span>{isCrawling ? '실시간 크롤링 중...' : '실시간 크롤링 새로고침'}</span>
            </button>
          </div>
        </div>

        {/* Quick Search Keyword Tags */}
        <div className="pb-3 flex items-center gap-2 overflow-x-auto no-scrollbar text-xs">
          <span className="text-gray-400 font-semibold shrink-0">인기 검색:</span>
          {quickTags.map((tag) => (
            <button
              key={tag}
              onClick={() => onTagClick(tag)}
              className="shrink-0 px-2.5 py-1 bg-gray-100 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200 border border-transparent rounded-full text-gray-600 font-medium transition-colors"
            >
              #{tag}
            </button>
          ))}
        </div>

        {/* Platform Selection Tabs */}
        <div className="flex border-t border-gray-100 pt-2 gap-2 overflow-x-auto">
          <button
            onClick={() => setPlatformFilter('all')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-lg font-bold text-sm transition-all border-b-2 whitespace-nowrap ${
              platformFilter === 'all'
                ? 'border-gray-900 text-gray-900 bg-gray-100/70'
                : 'border-transparent text-gray-500 hover:text-gray-800 hover:bg-gray-50'
            }`}
          >
            <Globe className="w-4 h-4 text-gray-600" />
            전체 매물
            <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
              platformFilter === 'all' ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              {stats.count}
            </span>
          </button>

          <button
            onClick={() => setPlatformFilter('daangn')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-lg font-bold text-sm transition-all border-b-2 whitespace-nowrap ${
              platformFilter === 'daangn'
                ? 'border-orange-500 text-orange-600 bg-orange-50'
                : 'border-transparent text-gray-500 hover:text-orange-600 hover:bg-orange-50/50'
            }`}
          >
            <span className="w-5 h-5 rounded-md bg-orange-500 text-white flex items-center justify-center font-black text-xs shadow-xs">
              🥕
            </span>
            당근마켓
            <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
              platformFilter === 'daangn' ? 'bg-orange-500 text-white' : 'bg-orange-100 text-orange-700'
            }`}>
              {stats.daangnCount}
            </span>
          </button>

          <button
            onClick={() => setPlatformFilter('bungae')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-lg font-bold text-sm transition-all border-b-2 whitespace-nowrap ${
              platformFilter === 'bungae'
                ? 'border-red-500 text-red-600 bg-red-50'
                : 'border-transparent text-gray-500 hover:text-red-600 hover:bg-red-50/50'
            }`}
          >
            <span className="w-5 h-5 rounded-md bg-red-500 text-white flex items-center justify-center font-black text-xs shadow-xs">
              ⚡
            </span>
            번개장터
            <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
              platformFilter === 'bungae' ? 'bg-red-500 text-white' : 'bg-red-100 text-red-700'
            }`}>
              {stats.bungaeCount}
            </span>
          </button>

          <button
            onClick={() => setPlatformFilter('joonggo')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-lg font-bold text-sm transition-all border-b-2 whitespace-nowrap ${
              platformFilter === 'joonggo'
                ? 'border-emerald-600 text-emerald-700 bg-emerald-50'
                : 'border-transparent text-gray-500 hover:text-emerald-600 hover:bg-emerald-50/50'
            }`}
          >
            <span className="w-5 h-5 rounded-md bg-emerald-600 text-white flex items-center justify-center font-black text-xs shadow-xs">
              N
            </span>
            중고나라
            <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
              platformFilter === 'joonggo' ? 'bg-emerald-600 text-white' : 'bg-emerald-100 text-emerald-800'
            }`}>
              {stats.joonggoCount}
            </span>
          </button>
        </div>

      </div>
    </header>
  );
}
