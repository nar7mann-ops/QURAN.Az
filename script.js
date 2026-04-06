let currentLang = 'az.sultanov';
let currentSurahNum = 1;
let currentPage = 0;
let QURAN_CACHE = {};
const AYAHS_PER_PAGE = 7;

// SURƏ SİYAHISI (SƏNİN METADATAN ƏSASINDA)
const SURAHS = [
  "Fatihə","Bəqərə","Ali İmran","Nisa","Maidə","Ənam","Əraf","Ənfal","Tövbə","Yunus","Hud","Yusif","Rəd","İbrahim","Hicr","Nəhl","İsra","Kəhf","Məryəm","Taha","Ənbiya","Həcc","Muminun","Nur","Furqan","Şuəra","Nəml","Qəsəs","Ənkəbut","Rum","Loqman","Səcdə","Əhzab","Səba","Fatir","Yasin","Saffat","Sad","Zümər","Ğafir","Fussilət","Şura","Zuxruf","Duxan","Casiyə","Əhqaf","Muhəmməd","Fəth","Hucurat","Qaf","Zariyat","Tur","Nəcm","Qəmər","Rəhman","Vaqiə","Hədid","Mücadilə","Həşr","Mumtəhinə","Səff","Cumə","Munafiqun","Təğabun","Talaq","Təhrim","Mulk","Qələm","Haqqə","Məaric","Nuh","Cin","Müzzəmmil","Müddəssir","Qiyamət","İnsan","Mürsəlat","Nəbə","Naziət","Əbəsə","Təkvir","İnfitar","Mutaffifin","İnşiqaq","Buruc","Tariq","Əla","Ğaşiyə","Fəcr","Bələd","Şəms","Leyl","Duha","Şərh","Tin","Ələq","Qədr","Beyyinə","Zəlzələ","Adiyat","Qariə","Təkasür","Əsr","Huməzə","Fil","Qureyş","Maun","Kövsər","Kafirun","Nəsr","Məsəd","İxlas","Fələq","Nas"
];

// SƏNİN ULDUZ KODUN
(function(){
  const c=document.getElementById('stars');
  for(let i=0;i<100;i++){
    const s=document.createElement('div');s.className='s';
    s.style.cssText=`left:${Math.random()*100}%;top:${Math.random()*100}%;width:1.5px;height:1.5px;--d:${2+Math.random()*4}s;--dl:${Math.random()*5}s;--op:${.3+Math.random()*.7}`;
    c.appendChild(s);
  }
})();

function createDust(){
  const l=document.getElementById('dustLayer');
  for(let i=0;i<18;i++){
    const p=document.createElement('div');p.className='dust-p';
    p.style.cssText=`left:${Math.random()*100}%;bottom:10%;--dd:${5+Math.random()*5}s;--ddl:${Math.random()*5}s;--dx:${-40+Math.random()*80}px;--dy:${-100-Math.random()*100}px`;
    l.appendChild(p);
  }
}

function openApp(){
  document.getElementById('intro').classList.add('hide');
  setTimeout(()=>{
    document.getElementById('app').style.display='flex';
    createDust();
  },900);
}

function openReader(){
  document.getElementById('book3d').classList.add('open-anim');
  setTimeout(()=>{
    document.getElementById('reader').style.display='flex';
    buildChips();
    loadSurah(1);
  },800);
}

function closeReader(){
  document.getElementById('reader').style.display='none';
  document.getElementById('book3d').classList.remove('open-anim');
}

function buildChips(){
  const wrap=document.getElementById('surahChips');
  wrap.innerHTML='';
  SURAHS.forEach((name, i) => {
    const chip=document.createElement('div');
    chip.className='surah-chip' + (i+1 === currentSurahNum ? ' active' : '');
    chip.innerText = `${i+1}. ${name}`;
    chip.onclick = () => loadSurah(i+1);
    wrap.appendChild(chip);
  });
}

// DİL DƏYİŞMƏ FUNKSİYASI
async function changeLanguage(val){
  currentLang = val;
  QURAN_CACHE = {}; // Keşi təmizlə ki, yeni dildə yüklənsin
  loadSurah(currentSurahNum);
}

async function loadSurah(num){
  currentSurahNum = num;
  currentPage = 0;
  document.getElementById('pageText').innerText = "Yüklənir...";
  buildChips();
  
  try {
    const res = await fetch(`https://api.alquran.cloud/v1/surah/${num}/${currentLang}`);
    const data = await res.json();
    QURAN_CACHE[num] = data.data.ayahs;
    renderPage();
  } catch(e) {
    document.getElementById('pageText').innerText = "İnternet xətası!";
  }
}

function renderPage(){
  const ayahs = QURAN_CACHE[currentSurahNum];
  const start = currentPage * AYAHS_PER_PAGE;
  const chunk = ayahs.slice(start, start + AYAHS_PER_PAGE);
  const textEl = document.getElementById('pageText');
  
  // Əgər ərəbcədirsə sağdan sola, digər dillərdə soldan sağa
  textEl.className = 'page-text ' + (currentLang === 'quran-uthmani' ? 'rtl' : 'ltr');
  
  document.getElementById('pageBannerName').innerText = SURAHS[currentSurahNum-1];
  document.getElementById('rSurahName').innerText = SURAHS[currentSurahNum-1];
  document.getElementById('rPageNum').innerText = `Səhifə ${currentPage + 1}`;
  
  textEl.innerHTML = chunk.map(a => `${a.text} <span style="color:var(--gold3); font-size:14px;">(${a.numberInSurah})</span>`).join(' ');
  
  // Progress Bar
  const prog = ((currentPage + 1) / Math.ceil(ayahs.length / AYAHS_PER_PAGE)) * 100;
  document.getElementById('progressBar').style.width = prog + '%';
}

function nextPage(){
  const max = Math.ceil(QURAN_CACHE[currentSurahNum].length / AYAHS_PER_PAGE);
  if(currentPage < max - 1) {
    currentPage++; renderPage();
  } else if(currentSurahNum < 114) {
    loadSurah(currentSurahNum + 1);
  }
}

function prevPage(){
  if(currentPage > 0) {
    currentPage--; renderPage();
  } else if(currentSurahNum > 1) {
    loadSurah(currentSurahNum - 1);
  }
}
