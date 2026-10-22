import React from 'react';
import { Download, SlidersHorizontal, LayoutGrid, List, RotateCcw, ShieldCheck } from 'lucide-react';

export function FilterToolbar({
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  safeTradeOnly,
  setSafeTradeOnly,
  sortBy,
  setSortBy,
  viewMode,
  setViewMode,
  onResetFilters,
  onExportExcel,
  totalCount,
  showMobileFilters,
  setShowMobileFilters
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-4 mb-6 shadow-sm">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">

        {/* Left side: Quick Info & Mobile Filter Toggle */}
        <div className="flex items-center justify-between lg:justify-start gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-gray-900 text-base">검색 결과</span>
            <span className="bg-gray-100 text-gray-800 font-extrabold text-xs px-2.5 py-1 rounded-full border border-gray-200">
              총 {totalCount}개
            </span>
          </div>

          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-xs rounded-xl transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4 text-gray-600" />
            <span>필터</span>
          </button>
        </div>

        {/* Desktop Filter Controls */}
        <div className={`lg:flex flex-wrap items-center gap-3 ${showMobileFilters ? 'flex flex-col items-stretch' : 'hidden lg:flex'}`}>

          {/* Safe Trade Checkbox */}
          <label className="flex items-center gap-2 px-3 py-2 bg-emerald-50 hover:bg-emerald-100/70 border border-emerald-200/80 rounded-xl cursor-pointer transition-colors text-xs font-semibold text-emerald-800 shrink-0">
            <input
              type="checkbox"
              checked={safeTradeOnly}
              onChange={(e) => setSafeTradeOnly(e.target.checked)}
              className="w-4 h-4 text-emerald-600 focus:ring-emerald-500 rounded border-gray-300"
            />
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>안전거래 전용</span>
          </label>

          {/* Price Range Inputs */}
          <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-xl px-3 py-1.5 text-xs">
            <span className="text-gray-500 font-medium shrink-0">가격:</span>
            <input
              type="number"
              placeholder="최소"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-20 md:w-24 bg-white border border-gray-200 rounded-lg px-2 py-1 text-xs focus:outline-none focus:border-red-500 text-gray-800"
            />
            <span className="text-gray-400">~</span>
            <input
              type="number"
              placeholder="최대"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-20 md:w-24 bg-white border border-gray-200 rounded-lg px-2 py-1 text-xs focus:outline-none focus:border-red-500 text-gray-800"
            />
            <span className="text-gray-500 font-medium shrink-0">원</span>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-xl px-3 py-1.5 text-xs">
            <span className="text-gray-500 font-medium shrink-0">정렬:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent font-semibold text-gray-800 focus:outline-none cursor-pointer text-xs"
            >
              <option value="newest">최신순</option>
              <option value="price_asc">낮은 가격순</option>
              <option value="price_desc">높은 가격순</option>
              <option value="likes">인기순 (관심)</option>
            </select>
          </div>

          {/* Filter Reset Button */}
          <button
            onClick={onResetFilters}
            className="flex items-center gap-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl text-xs font-semibold transition-colors shrink-0"
            title="필터 초기화"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>초기화</span>
          </button>

          <div className="h-6 w-px bg-gray-200 hidden lg:block mx-1"></div>

          {/* Right Action Group: View Switcher & Excel Download */}
          <div className="flex items-center justify-between lg:justify-end gap-2 w-full lg:w-auto mt-2 lg:mt-0 pt-2 lg:pt-0 border-t border-gray-100 lg:border-t-0">

            {/* View Mode Toggle */}
            <div className="flex items-center bg-gray-100 p-1 rounded-xl border border-gray-200 shrink-0">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg text-xs font-semibold transition-all ${
                  viewMode === 'grid'
                    ? 'bg-white text-gray-900 shadow-xs'
                    : 'text-gray-500 hover:text-gray-800'
                }`}
                title="카드형 보기"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg text-xs font-semibold transition-all ${
                  viewMode === 'list'
                    ? 'bg-white text-gray-900 shadow-xs'
                    : 'text-gray-500 hover:text-gray-800'
                }`}
                title="리스트형 보기"
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            {/* Excel Download Button */}
            <button
              onClick={onExportExcel}
              className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-xs md:text-sm rounded-xl transition-all shadow-sm hover:shadow shrink-0"
            >
              <Download className="w-4 h-4" />
              <span>Excel 다운로드</span>
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}
