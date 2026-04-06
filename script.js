let currentLang = 'az.sultanov';
let currentSurah = 1;
let currentPage = 0;
let quranData = [];
const AYAHS_PER_PAGE = 8;

const SURAHS = ["Fatihə","Bəqərə","Ali İmran","Nisa","Maidə","Ənam","Əraf","Ənfal","Tövbə","Yunus","Hud","Yusif","Rəd","İbrahim","Hicr","Nəhl","İsra","Kəhf","Məryəm","Taha","Ənbiya","Həcc","Muminun","Nur","Furqan","Şuəra","Nəml","Qəsəs","Ənkəbut","Rum","Loqman","Səcdə","Əhzab","Səba","Fatir","Yasin","Saffat","Sad","Zümər","Ğafir","Fussilət","Şura","Zuxruf","Duxan","Casiyə","Əhqaf","Muhəmməd","Fəth","Hucurat","Qaf","Zariyat","Tur","Nəcm","Qəmər","Rəhman","Vaqiə","Hədid","Mücadilə","Həşr","Mumtəhinə","Səff","Cumə","Munafiqun","Təğabun","Talaq","Təhrim","Mulk","Qələm","Haqqə","Məaric","Nuh","Cin","Müzzəmmil","Müddəssir","Qiyamət","İnsan","Mürsəlat","Nəbə","Naziət","Əbəsə","Təkvir","İnfitar","Mutaffifin","İnşiqaq","Buruc","Tariq","Əla","Ğaşiyə","Fəcr","Bələd","Şəms","Leyl","Duha","Şərh","Tin","Ələq","Qədr","Beyyinə","Zəlzələ","Adiyat","Qariə","Təkasür","Əsr","Huməzə","Fil","Qureyş","Maun","Kövsər","Kafirun","Nəsr","Məsəd","İxlas","Fələq","Nas"];

// ULDUZLARIN YARADILMASI
(function createStars(){
    const container = document.getElementById('stars');
    for(let i=0; i<100; i++){
        const s = document.createElement('div');
        s.className = 's';
        s.style.cssText = `left:${Math.random()*100}%;top:${Math.random()*100}%;width:1.5px;height:1.5px;--d:${2+Math.random()*4}s;--dl:${Math.random()*5}s;--op:${0.5+Math.random()*0.5}`;
        container.appendChild(s);
    }
})();

function createDust(){
    const layer = document.getElementById('dustLayer');
    for(let i=0; i<20; i++){
        const p = document.createElement('div');
        p.className = 'dust-p';
        p.style.cssText = `left:${10+Math.random()*80}%;bottom:20%;--dd:${4+Math.random()*6}s;--ddl:${Math.random()*5}s;--dx:${-50+Math.random()*100}px;--dy:${-100-Math.random()*150}px`;
        layer.appendChild(p);
    }
}

function openApp(){
    document.getElementById('intro').classList.add('hide');
    setTimeout(() => {
        document.getElementById('app').style.display = 'flex';
        createDust();
    }, 900);
}

function openReader(){
    document.getElementById('book3d').classList.add('open-anim');
    setTimeout(() => {
        document.getElementById('reader').style.display = 'flex';
        buildChips();
        loadSurah(1);
    }, 800);
}

function closeReader(){
    document.getElementById('reader').style.display = 'none';
    document.getElementById('book3d').classList.remove('open-anim');
}

function buildChips(){
    const wrap = document.getElementById('surahChips');
    wrap.innerHTML = '';
    SURAHS.forEach((name, i) => {
        const chip = document.createElement('div');
        chip.className = 'surah-chip' + (i+1 === currentSurah ? ' active' : '');
        chip.innerText = `${i+1}. ${name}`;
        chip.onclick = () => loadSurah(i+1);
        wrap.appendChild(chip);
    });
}

async function changeLanguage(val){
    currentLang = val;
    loadSurah(currentSurah);
}

async function loadSurah(id){
    currentSurah = id;
    currentPage = 0;
    document.getElementById('pageText').innerText = "Yüklənir...";
    buildChips();
    try {
        const res = await fetch(`https://api.alquran.cloud/v1/surah/${id}/${currentLang}`);
        const data = await res.json();
        quranData = data.data.ayahs;
        renderPage();
    } catch(e) {
        document.getElementById('pageText').innerText = "Bağlantı xətası!";
    }
}

function renderPage(){
    const start = currentPage * AYAHS_PER_PAGE;
    const chunk = quranData.slice(start, start + AYAHS_PER_PAGE);
    const textEl = document.getElementById('pageText');
    
    textEl.className = 'page-text ' + (currentLang === 'quran-uthmani' ? 'rtl' : 'ltr');
    document.getElementById('pageBanner').innerText = SURAHS[currentSurah-1];
    document.getElementById('rSurahName').innerText = `Surə ${currentSurah}`;
    
    textEl.innerHTML = chunk.map(a => `${a.text} <span style="color:var(--gold3); font-size:14px;">(${a.numberInSurah})</span>`).join(' ');
}

function nextPage(){
    if(currentPage < Math.ceil(quranData.length / AYAHS_PER_PAGE) - 1) {
        currentPage++; renderPage();
    } else if(currentSurah < 114) {
        loadSurah(currentSurah + 1);
    }
}

function prevPage(){
    if(currentPage > 0) {
        currentPage--; renderPage();
    } else if(currentSurah > 1) {
        loadSurah(currentSurah - 1);
    }
}
