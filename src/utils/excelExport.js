import * as XLSX from 'xlsx';

export function exportToExcel(items, searchKeyword = '전체') {
  if (!items || items.length === 0) {
    alert('다운로드할 검색 결과가 없습니다.');
    return;
  }

  // Format data for Excel sheet
  const excelData = items.map((item, index) => ({
    '번호': index + 1,
    '플랫폼': item.platform === 'bungae' ? '번개장터' : '중고나라',
    '상품명': item.title,
    '가격(원)': item.price,
    '가격(가공)': `${item.price.toLocaleString()}원`,
    '상품상태': item.condition || '상태정보없음',
    '지역/위치': item.location || '전국',
    '등록시간': item.date || '최근',
    '안전거래여부': item.safeTrade ? 'Y (가능)' : 'N (일반거래)',
    '판매자': item.seller || '익명',
    '관심수': item.likes || 0,
    '조회수': item.views || 0,
    '원문링크': item.link
  }));

  // Create worksheet
  const worksheet = XLSX.utils.json_to_sheet(excelData);

  // Set column widths
  worksheet['!cols'] = [
    { wch: 6 },  // 번호
    { wch: 12 }, // 플랫폼
    { wch: 45 }, // 상품명
    { wch: 12 }, // 가격
    { wch: 14 }, // 가격(가공)
    { wch: 14 }, // 상품상태
    { wch: 22 }, // 지역/위치
    { wch: 12 }, // 등록시간
    { wch: 14 }, // 안전거래여부
    { wch: 14 }, // 판매자
    { wch: 8 },  // 관심수
    { wch: 8 },  // 조회수
    { wch: 45 }  // 원문링크
  ];

  // Create workbook
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, '검색결과');

  // Generate filename with timestamp and keyword
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const cleanKeyword = searchKeyword.trim().replace(/[\\/:*?"<>|]/g, '') || '전체';
  const fileName = `중고시세검색_${cleanKeyword}_${dateStr}.xlsx`;

  // Write file
  XLSX.writeFile(workbook, fileName);
}
