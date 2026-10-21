import React from 'react';
import { ExternalLink, ShieldCheck, Heart, Eye, MapPin, Clock, AlertCircle } from 'lucide-react';

export function ProductList({ items, viewMode }) {
  if (!items || items.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center my-8 shadow-xs">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-gray-800 mb-1">
          검색 조건과 일치하는 중고 매물이 없습니다.
        </h3>
        <p className="text-sm text-gray-500 max-w-md mx-auto">
          검색어를 확인하시거나 가격 및 안전거래 필터를 조정하여 다시 검색해 보세요.
        </p>
      </div>
    );
  }

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs md:text-sm">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 font-bold uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4 text-center">플랫폼</th>
                <th className="py-3.5 px-4">상품 정보</th>
                <th className="py-3.5 px-4 text-right">판매 가격</th>
                <th className="py-3.5 px-4 hidden md:table-cell">지역 / 판매자</th>
                <th className="py-3.5 px-4 text-center hidden sm:table-cell">안전거래</th>
                <th className="py-3.5 px-4 text-center">등록시간</th>
                <th className="py-3.5 px-4 text-center">바로가기</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/80 transition-colors">
                  {/* Platform */}
                  <td className="py-3 px-4 text-center align-middle whitespace-nowrap">
                    {item.platform === 'bungae' ? (
                      <span className="inline-flex items-center gap-1 bg-red-100 text-red-700 font-bold text-xs px-2.5 py-1 rounded-md">
                        <span>⚡</span> 번개장터
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 font-bold text-xs px-2.5 py-1 rounded-md">
                        <span>N</span> 중고나라
                      </span>
                    )}
                  </td>

                  {/* Title & Image thumbnail */}
                  <td className="py-3 px-4 align-middle">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-12 h-12 object-cover rounded-lg border border-gray-200 shrink-0 bg-gray-100"
                        loading="lazy"
                      />
                      <div className="min-w-0">
                        <div className="font-semibold text-gray-900 line-clamp-1 hover:text-red-600 transition-colors">
                          <a href={item.link} target="_blank" rel="noopener noreferrer">
                            {item.title}
                          </a>
                        </div>
                        <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                          {item.condition && (
                            <span className="bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded font-medium">
                              {item.condition}
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <Heart className="w-3 h-3 text-red-400" /> {item.likes}
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="w-3 h-3 text-gray-400" /> {item.views}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Price */}
                  <td className="py-3 px-4 text-right align-middle whitespace-nowrap font-extrabold text-base text-gray-900">
                    {item.price.toLocaleString()}<span className="text-xs font-normal text-gray-600 ml-0.5">원</span>
                  </td>

                  {/* Location / Seller */}
                  <td className="py-3 px-4 align-middle hidden md:table-cell text-gray-600">
                    <div className="line-clamp-1 text-xs font-medium">{item.location}</div>
                    <div className="text-[11px] text-gray-400">{item.seller}</div>
                  </td>

                  {/* Safe trade */}
                  <td className="py-3 px-4 text-center align-middle hidden sm:table-cell whitespace-nowrap">
                    {item.safeTrade ? (
                      <span className="inline-flex items-center gap-0.5 text-emerald-600 font-bold text-xs bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        <ShieldCheck className="w-3.5 h-3.5" /> 가능
                      </span>
                    ) : (
                      <span className="text-gray-400 text-xs">일반거래</span>
                    )}
                  </td>

                  {/* Date */}
                  <td className="py-3 px-4 text-center align-middle whitespace-nowrap text-xs text-gray-500">
                    {item.date}
                  </td>

                  {/* Link Button */}
                  <td className="py-3 px-4 text-center align-middle whitespace-nowrap">
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="원문 게시글 보기"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // Grid Mode (Default Responsive Cards)
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 mb-8">
      {items.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 flex flex-col group"
        >
          {/* Card Top Image & Badges */}
          <div className="relative aspect-4/3 bg-gray-100 overflow-hidden">
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />

            {/* Platform Badge Overlay */}
            <div className="absolute top-3 left-3 flex items-center gap-1.5">
              {item.platform === 'bungae' ? (
                <span className="bg-red-500/90 backdrop-blur-md text-white font-black text-xs px-2.5 py-1 rounded-lg shadow-md flex items-center gap-1">
                  <span>⚡</span> 번개장터
                </span>
              ) : (
                <span className="bg-emerald-600/90 backdrop-blur-md text-white font-black text-xs px-2.5 py-1 rounded-lg shadow-md flex items-center gap-1">
                  <span>N</span> 중고나라
                </span>
              )}
            </div>

            {/* Safe Trade Badge Overlay */}
            {item.safeTrade && (
              <div className="absolute top-3 right-3 bg-emerald-500/90 backdrop-blur-md text-white text-[11px] font-bold px-2 py-0.5 rounded-md shadow-md flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> 안전결제
              </div>
            )}

            {/* Item Condition */}
            {item.condition && (
              <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-white text-[11px] font-medium px-2 py-0.5 rounded-md">
                {item.condition}
              </div>
            )}
          </div>

          {/* Card Body */}
          <div className="p-4 flex-1 flex flex-col justify-between">
            <div>
              {/* Price */}
              <div className="text-xl font-extrabold text-gray-900 mb-1 tracking-tight">
                {item.price.toLocaleString()}
                <span className="text-xs font-semibold text-gray-600 ml-1">원</span>
              </div>

              {/* Title */}
              <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 mb-3 leading-snug group-hover:text-red-600 transition-colors">
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  {item.title}
                </a>
              </h3>
            </div>

            {/* Meta Info */}
            <div className="pt-3 border-t border-gray-100 flex flex-col gap-2 text-xs text-gray-500">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-gray-500 truncate max-w-[170px]">
                  <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                  <span className="truncate">{item.location}</span>
                </div>
                <div className="flex items-center gap-1 text-gray-400 shrink-0">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{item.date}</span>
                </div>
              </div>

              {/* Bottom Actions: Views/Likes + Link Button */}
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-3 text-gray-400 text-[11px]">
                  <span className="flex items-center gap-1">
                    <Heart className="w-3 h-3 text-red-400" /> {item.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3 text-gray-400" /> {item.views}
                  </span>
                  <span className="text-gray-400">· {item.seller}</span>
                </div>

                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-100 hover:bg-red-500 hover:text-white text-gray-700 font-semibold text-xs rounded-lg transition-all"
                >
                  <span>보기</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

          </div>
        </div>
      ))}
    </div>
  );
}
