import React from 'react';
import { TrendingUp, ArrowDownRight, ArrowUpRight, ShoppingBag, Info } from 'lucide-react';

export function StatsDashboard({ stats, currentKeyword }) {
  if (stats.count === 0) return null;

  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-gray-100">
        <div>
          <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
            <span className="p-1.5 bg-orange-100 text-orange-600 rounded-lg">
              <TrendingUp className="w-4 h-4" />
            </span>
            <span>"{currentKeyword || '전체'}" 실시간 시세 분석</span>
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            등록된 중고 매물의 가격 범위를 실시간 집계한 결과입니다.
          </p>
        </div>
        <div className="text-xs text-gray-500 bg-gray-50 px-3 py-1.5 rounded-lg flex items-center gap-1 self-start sm:self-auto">
          <Info className="w-3.5 h-3.5 text-gray-400" />
          통합 검색결과 {stats.count}개 기준
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {/* Average Price Card */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-orange-50 to-red-50 border border-orange-100/80">
          <div className="text-xs font-semibold text-orange-700 mb-1 flex items-center gap-1">
            <span>평균 시세</span>
          </div>
          <div className="text-lg md:text-xl font-extrabold text-orange-900">
            {stats.avgPrice.toLocaleString()}<span className="text-xs font-normal text-orange-700 ml-0.5">원</span>
          </div>
          <div className="text-[11px] text-orange-600/80 mt-1">
            중고 거래 권장가
          </div>
        </div>

        {/* Lowest Price Card */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100">
          <div className="text-xs font-semibold text-emerald-700 mb-1 flex items-center gap-1">
            <ArrowDownRight className="w-3.5 h-3.5 text-emerald-600" />
            <span>최저가</span>
          </div>
          <div className="text-lg md:text-xl font-extrabold text-emerald-900">
            {stats.minPrice.toLocaleString()}<span className="text-xs font-normal text-emerald-700 ml-0.5">원</span>
          </div>
          <div className="text-[11px] text-emerald-600/80 mt-1">
            가장 저렴한 매물
          </div>
        </div>

        {/* Highest Price Card */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100">
          <div className="text-xs font-semibold text-blue-700 mb-1 flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5 text-blue-600" />
            <span>최고가</span>
          </div>
          <div className="text-lg md:text-xl font-extrabold text-blue-900">
            {stats.maxPrice.toLocaleString()}<span className="text-xs font-normal text-blue-700 ml-0.5">원</span>
          </div>
          <div className="text-[11px] text-blue-600/80 mt-1">
            미개봉/최상급 기준
          </div>
        </div>

        {/* Total Listed Card */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-gray-50 to-slate-100 border border-gray-200">
          <div className="text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1">
            <ShoppingBag className="w-3.5 h-3.5 text-gray-500" />
            <span>전체 매물수</span>
          </div>
          <div className="text-lg md:text-xl font-extrabold text-gray-900">
            {stats.count}<span className="text-xs font-normal text-gray-600 ml-0.5">개</span>
          </div>
          <div className="text-[11px] text-gray-500 mt-1 flex items-center gap-1 flex-wrap">
            <span className="text-orange-600 font-semibold">당근 {stats.daangnCount}</span>
            <span>·</span>
            <span className="text-red-600 font-semibold">번개 {stats.bungaeCount}</span>
            <span>·</span>
            <span className="text-emerald-700 font-semibold">중고 {stats.joonggoCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
