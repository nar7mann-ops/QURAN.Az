/* ============================================================
   QURAN AZ — Azərbaycan Dilində Tərcümə İlə
============================================================ */

const SURAH_META = [
  [1,"əl-Fatihə","Açılış",7],[2,"əl-Bəqərə","İnək",286],[3,"Ali-İmran","İmran ailəsi",200],
  [4,"ən-Nisa","Qadınlar",176],[5,"əl-Maidə","Süfrə",120],[6,"əl-Ənam","Davar",165],
  // ... Digər surələr (kodun qısa olması üçün bura yazılmayıb, əvvəlki siyahıdan istifadə edə bilərsən)
  [114,"ən-Nas","İnsanlar",6]
];

let QURAN_CACHE = {};      
let currentSurahNum = 1;
let currentPage = 0;
const AYAHS_PER_PAGE = 5; // Tərcümə uzun olduğu üçün səhifədə 5 ayə daha rahat görünür

async function fetchSurah(num) {
  if (QURAN_CACHE[num]) return QURAN_CACHE[num];
  
  // Həm Ərəbcə (uthmani), həm də Azərbaycan dilində (az.mammadaliyev) tərcüməni eyni anda gətiririk
  const res = await fetch(`https://api.alquran.cloud/v1/surah/${num}/editions/quran-uthmani,az.mammadaliyev`);
  const data = await res.json();
  
  // Data strukturunu tənzimləyirik: hər ayənin həm orijinalı, həm tərcüməsi olsun
  const ayahs = data.data[0].ayahs.map((a, index) => ({
    original: a.text,
    translation: data.data[1].ayahs[index].text
  }));
  
  QURAN_CACHE[num] = ayahs;
  return ayahs;
}

async function loadSurah(num, page) {
  currentSurahNum = num;
  currentPage = page;
  document.getElementById('pageText').innerHTML = 'Yüklənir...';
  
  try {
    const ayahs = await fetchSurah(num);
    renderPage(ayahs);
  } catch (e) {
    document.getElementById('pageText').innerHTML = 'Xəta: İnterneti yoxlayın.';
  }
}

function renderPage(ayahs) {
  const meta = SURAH_META.find(m => m[0] === currentSurahNum) || [currentSurahNum, "Surə", "", 0];
  const start = currentPage * AYAHS_PER_PAGE;
  const end = Math.min(start + AYAHS_PER_PAGE, ayahs.length);
  
  document.getElementById('rSurahName').textContent = meta[1];
  document.getElementById('pageBannerName').textContent = meta[1];
  document.getElementById('pageBannerAz').textContent = meta[2];

  let html = '';
  for (let i = start; i < end; i++) {
    html += `
      <div style="margin-bottom: 25px; border-bottom: 1px dashed #ccc; padding-bottom: 15px;">
        <div style="direction: rtl; font-size: 24px; color: #1a1008; margin-bottom: 10px; font-family: 'Amiri', serif;">
          ${ayahs[i].original} <span style="font-size: 14px; color: #c9a84c;">(${i+1})</span>
        </div>
        <div style="direction: ltr; font-size: 16px; color: #444; font-family: sans-serif; line-height: 1.5;">
          <strong>${i+1}.</strong> ${ayahs[i].translation}
        </div>
      </div>
    `;
  }
  
  document.getElementById('pageText').innerHTML = html;
  document.getElementById('rPageNum').textContent = `Səhifə ${currentPage + 1}`;
  document.getElementById('pageNumBottom').textContent = `— ${currentPage + 1} —`;
}

// Digər funksiyalar (openApp, closeReader, nextPage və s.) əvvəlki kodla eynidir.
