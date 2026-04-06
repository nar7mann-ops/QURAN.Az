let currentLang = 'az.sultanov';
let currentSurah = 1;
let currentPage = 0;
let QURAN_CACHE = {};
const AYAHS_PER_PAGE = 6;

// Surah List (Simplified for example)
const SURAHS = [
    {id: 1, ar: "الفاتحة", az: "əl-Fatihə", count: 7},
    {id: 2, ar: "البقرة", az: "əl-Bəqərə", count: 286},
    {id: 3, ar: "آل عمران", az: "Ali İmran", count: 200},
    // ... Digər 111 surə bura SURAH_META-dan əlavə edilə bilər
];

function openApp() {
    document.getElementById('intro').classList.add('hide');
    document.getElementById('app').style.display = 'block';
}

async function openReader() {
    document.getElementById('reader').classList.add('show');
    buildChips();
    loadSurah(1);
}

function closeReader() {
    document.getElementById('reader').classList.remove('show');
}

function buildChips() {
    const container = document.getElementById('surahChips');
    container.innerHTML = '';
    // Tam siyahı üçün SURAH_META massivini bura loop edirik
    for(let i=1; i<=114; i++) {
        const chip = document.createElement('div');
        chip.className = `surah-chip ${currentSurah === i ? 'active' : ''}`;
        chip.innerText = i;
        chip.onclick = () => loadSurah(i);
        container.appendChild(chip);
    }
}

async function changeLanguage(lang) {
    currentLang = lang;
    QURAN_CACHE = {}; // Dili dəyişəndə cache-i təmizləyirik
    loadSurah(currentSurah);
}

async function loadSurah(id) {
    currentSurah = id;
    currentPage = 0;
    const textEl = document.getElementById('pageText');
    textEl.innerHTML = "Yüklənir...";
    
    try {
        const data = await fetchQuranData(id, currentLang);
        QURAN_CACHE[id] = data;
        renderPage();
    } catch (e) {
        textEl.innerHTML = "Xəta baş verdi. İnterneti yoxlayın.";
    }
    buildChips();
}

async function fetchQuranData(id, lang) {
    const res = await fetch(`https://api.alquran.cloud/v1/surah/${id}/${lang}`);
    const json = await res.json();
    return json.data.ayahs;
}

function renderPage() {
    const ayahs = QURAN_CACHE[currentSurah];
    const start = currentPage * AYAHS_PER_PAGE;
    const end = start + AYAHS_PER_PAGE;
    const chunk = ayahs.slice(start, end);
    
    const textEl = document.getElementById('pageText');
    // Ərəb dili üçün RTL, digərləri üçün LTR
    textEl.className = `page-text ${currentLang === 'quran-uthmani' ? 'rtl' : 'ltr'}`;
    
    textEl.innerHTML = chunk.map(a => `${a.text} <b style="color:var(--gold)">(${a.numberInSurah})</b>`).join(' ');
    
    document.getElementById('rSurahName').innerText = `Surə ${currentSurah}`;
    document.getElementById('rPageNum').innerText = `Səhifə ${currentPage + 1}`;
    
    // Progress bar
    const progress = (currentSurah / 114) * 100;
    document.getElementById('progressBar').style.width = `${progress}%`;
}

function nextPage() {
    const total = Math.ceil(QURAN_CACHE[currentSurah].length / AYAHS_PER_PAGE);
    if (currentPage < total - 1) {
        currentPage++;
        renderPage();
    } else if (currentSurah < 114) {
        loadSurah(currentSurah + 1);
    }
}

function prevPage() {
    if (currentPage > 0) {
        currentPage--;
        renderPage();
    } else if (currentSurah > 1) {
        loadSurah(currentSurah - 1);
    }
}
