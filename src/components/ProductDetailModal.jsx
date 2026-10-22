import React from 'react';
import { X, ShieldCheck, Heart, Eye, MapPin, Clock, ExternalLink, Share2, MessageCircle, AlertCircle } from 'lucide-react';

export function ProductDetailModal({ item, onClose }) {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200 flex flex-col relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full transition-colors"
          title="닫기"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Image Section */}
        <div className="relative w-full aspect-16/10 bg-gray-100 overflow-hidden">
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full object-cover"
          />

          {/* Platform Badge Overlay */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            {item.platform === 'bungae' ? (
              <span className="bg-red-500 text-white font-extrabold text-xs px-3 py-1.5 rounded-lg shadow-md flex items-center gap-1">
                <span>⚡</span> 번개장터 매물
              </span>
            ) : (
              <span className="bg-emerald-600 text-white font-extrabold text-xs px-3 py-1.5 rounded-lg shadow-md flex items-center gap-1">
                <span>N</span> 중고나라 매물
              </span>
            )}

            {item.safeTrade && (
              <span className="bg-emerald-500 text-white font-bold text-xs px-2.5 py-1.5 rounded-lg shadow-md flex items-center gap-1">
                <ShieldCheck className="w-4 h-4" /> 안전결제 지원
              </span>
            )}
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 flex-1 flex flex-col justify-between">
          <div>
            {/* Price & Meta */}
            <div className="flex items-baseline justify-between mb-2">
              <div className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
                {item.price.toLocaleString()}
                <span className="text-sm font-bold text-gray-600 ml-1">원</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-400">
                <span className="flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5 text-red-400" /> {item.likes}
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5 text-gray-400" /> {item.views}
                </span>
              </div>
            </div>

            {/* Product Title */}
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 leading-snug mb-4">
              {item.title}
            </h2>

            {/* Spec Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              {item.condition && (
                <span className="bg-gray-100 text-gray-800 text-xs font-bold px-3 py-1 rounded-lg border border-gray-200">
                  상품 상태: {item.condition}
                </span>
              )}
              <span className="bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1 rounded-lg flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-gray-500" /> {item.location}
              </span>
              <span className="bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1 rounded-lg flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-gray-500" /> {item.date}
              </span>
            </div>

            {/* Seller Info Box */}
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200/80 mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-400 to-indigo-500 text-white font-bold flex items-center justify-center text-sm shadow-xs">
                  {item.seller.slice(0, 1)}
                </div>
                <div>
                  <div className="font-bold text-sm text-gray-900">{item.seller}</div>
                  <div className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> 신뢰도 검증 완료 판매자
                  </div>
                </div>
              </div>

              <span className="text-xs text-gray-400 font-mono">ID: {item.id}</span>
            </div>

            {/* Detailed Description */}
            <div className="border-t border-gray-100 pt-4 mb-6">
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                상품 상세 설명
              </h4>
              <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line bg-gray-50/50 p-4 rounded-xl border border-gray-100">
                안녕하세요! {item.title} 판매합니다.
                {'\n'}• 상태: {item.condition || '정상 작동 및 최상급 상태'}
                {'\n'}• 희망 거래 지역: {item.location} (직거래 / 택배 거래 가능)
                {'\n'}• 거래방식: {item.safeTrade ? '안전결제(번개페이/중고나라 안전거래) 가능' : '일반 계좌 이체 거래'}
                {'\n\n'}관심 있으신 분은 아래 문의하기 버튼을 눌러 바로 연결하실 수 있습니다.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-gray-200 flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={() => alert(`[안내] '${item.seller}' 판매자에게 채팅 및 문의를 연결합니다.`)}
              className="w-full sm:flex-1 py-3 px-4 bg-red-500 hover:bg-red-600 active:bg-red-700 text-white font-bold text-sm rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>판매자에게 문의하기</span>
            </button>

            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:flex-1 py-3 px-4 bg-gray-900 hover:bg-black text-white font-bold text-sm rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
            >
              <span>{item.platform === 'bungae' ? '번개장터 원문보기' : '중고나라 원문보기'}</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
