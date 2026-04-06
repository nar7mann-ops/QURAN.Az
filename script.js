let currentLang = 'az.mammadaliyev';
let currentSurah = 1;
let currentPage = 0;
let zoomLevel = 1;
const AYAHS_PER_PAGE = 6;
let quranCache = {};

const SURAH_NAMES = [
    "Fatihə","Bəqərə","Ali-İmran","Nisa","Maidə","Ənam","Əraf","Ənfal","Tövbə","Yunus",
    "Hud","Yusif","Rəd","İbrahim","Hicr","Nəhl","İsra","Kəhf","Məryəm","Taha",
    "Ənbiya","Həcc","Muminun","Nur","Furqan","Şuəra","Nəml","Qəsəs","Ənkəbut","Rum",
    "Loqman","Səcdə","Əhzab","Səba","Fatir","Yasin","Saffat","Sad","Zumər","Ğafir",
    "Fussilət","Şura","Zuxruf","Duxan","Casiyə","Əhqaf","Muhəmməd","Fəth","Hucurat","Qaf",
    "Zariyat","Tur","Nəcm","Qəmər","Rəhman","Vaqiə","Hədid","Mucadilə","Həşr","Mumtəhinə",
    "Səff","Cumuə","Munafiqun","Təğabun","Talaq","Təhrim","Mulk","Qələm","Haqqə","Məaric",
    "Nuh","Cin","Muzzəmmil","Muddəssir","Qiyamə","İnsan","Mursəlat","Nəbə","Naziət","Əbəsə",
    "Təkvir","İnfitar","Mutaffifin","İnşiqaq","Buruc","Tariq","Əla","Ğaşiyə","Fəcr","Bələd",
    "Şəms","Leyl","Duha","Şərh","Tin","Ələq","Qədr","Beyyinə","Zəlzələ","Adiyat",
    "Qariə","Təkasur","Əsr","Huməzə","Fil","Qureyş","Maun","Kövsər","Kafirun","Nəsr",
    "Məsəd","İxlas","Fələq","Nas"
];

async function changeLanguage() {
    currentLang = document.getElementById('langSelect').value;
    const langNames = {
        'az.mammadaliyev': 'AZƏRBAYCAN',
        'tr.diyanet': 'TÜRKÇE',
        'ru.kuliev': 'РУССКИЙ',
        'en.sahih': 'ENGLISH',
        'de.aburida': 'DEUTSCH'
    };
    document.getElementById('activeLangName').textContent = langNames[currentLang];
    quranCache = {}; 
    await loadSurah(currentSurah, 0);
}

function buildSurahChips() {
    const wrap = document.getElementById('surahChips');
    wrap.innerHTML = '';
    SURAH_NAMES.forEach((name, i) => {
        const chip = document.createElement('div');
        chip.className = 'surah-chip' + (i + 1 === currentSurah ? ' active' : '');
        chip.textContent = `${i + 1}. ${name}`;
        chip.onclick = () => loadSurah(i + 1, 0);
        wrap.appendChild(chip);
    });
}

async function loadSurah(num, page) {
    currentSurah = num;
    currentPage = page;
    const cacheKey = `${currentLang}_${num}`;
    
    document.getElementById('pageText').innerHTML = 'Yüklənir...';
    
    if (!quranCache[cacheKey]) {
        try {
            const res = await fetch(`https://api.alquran.cloud/v1/surah/${num}/${currentLang}`);
            const data = await res.json();
            quranCache[cacheKey] = data.data;
        } catch (e) {
            document.getElementById('pageText').innerHTML = 'İnternet xətası!';
            return;
        }
    }
    
    renderPage();
    buildSurahChips();
}

function renderPage() {
    const data = quranCache[`${currentLang}_${currentSurah}`];
    const ayahs = data.ayahs;
    const start = currentPage * AYAHS_PER_PAGE;
    const end = Math.min(start + AYAHS_PER_PAGE, ayahs.length);
    
    let html = '';
    for (let i = start; i < end; i++) {
        html += `<p style="margin-bottom:15px">${ayahs[i].text} <span class="ayah-num">${ayahs[i].numberInSurah}</span></p>`;
    }
    
    document.getElementById('pageText').innerHTML = html;
    document.getElementById('pageBannerName').textContent = data.name;
    document.getElementById('rSurahName').textContent = SURAH_NAMES[currentSurah-1];
    document.getElementById('rPageNum').textContent = `Səhifə ${currentPage + 1}`;
    document.getElementById('pageNumBottom').textContent = `— ${currentPage + 1} —`;
    document.getElementById('progressBar').style.width = (currentSurah / 114 * 100) + '%';
}

function nextPage() {
    const data = quranCache[`${currentLang}_${currentSurah}`];
    if ((currentPage + 1) * AYAHS_PER_PAGE < data.ayahs.length) {
        currentPage++;
        renderPage();
    } else if (currentSurah < 114) {
        loadSurah(currentSurah + 1, 0);
    }
}

function prevPage() {
    if (currentPage > 0) {
        currentPage--;
        renderPage();
    } else if (currentSurah > 1) {
        loadSurah(currentSurah - 1, 0);
    }
}

function zoomIn() { zoomLevel += 0.1; applyZoom(); }
function zoomOut() { if(zoomLevel > 0.7) zoomLevel -= 0.1; applyZoom(); }
function applyZoom() { document.getElementById('pageText').style.fontSize = (19 * zoomLevel) + 'px'; }

function openApp() { document.getElementById('intro').style.display = 'none'; document.getElementById('app').style.display = 'flex'; }
function openReader() { document.getElementById('reader').classList.add('show'); loadSurah(1, 0); }
function closeReader() { document.getElementById('reader').classList.remove('show'); }

// Ulduzlar üçün sadə effekt
(function(){
    const stars = document.getElementById('stars');
    for(let i=0; i<50; i++) {
        const s = document.createElement('div');
        s.style.position = 'absolute';
        s.style.width = '2px';
        s.style.height = '2px';
        s.style.background = '#fff';
        s.style.left = Math.random() * 100 + '%';
        s.style.top = Math.random() * 100 + '%';
        s.style.opacity = Math.random();
        stars.appendChild(s);
    }
})();
