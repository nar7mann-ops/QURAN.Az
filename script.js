let currentLang = 'az.sultanov';
let currentSurahNum = 1;
let currentPage = 0;
let QURAN_DATA = [];
const AYAHS_PER_PAGE = 7;

// SƏNİN METADATA SİYAHIN (Bütün 114 Surə)
const SURAHS = [
  [1,"الفاتحة","əl-Fatihə"],[2,"البقرة","əl-Bəqərə"],[3,"آل عمران","Ali İmran"],[4,"النساء","ən-Nisa"],[5,"المائدة","əl-Maidə"],[6,"الأنعام","əl-Ənam"],[7,"الأعراف","əl-Əraf"],[8,"الأنفال","əl-Ənfal"],[9,"التوبة","ət-Tövbə"],[10,"يونس","Yunus"],[11,"هود","Hud"],[12,"يوسف","Yusif"],[13,"الرعد","ər-Rəd"],[14,"إبراهيم","İbrahim"],[15,"الحجر","əl-Hicr"],[16,"النحل","ən-Nəhl"],[17,"الإسراء","əl-İsra"],[18,"الكهf","əl-Kəhf"],[19,"مريم","Məryəm"],[20,"طه","Ta-Ha"],[21,"الأنبياء","əl-Ənbiya"],[22,"الحج","əl-Həcc"],[23,"المؤمنون","əl-Muminun"],[24,"النور","ən-Nur"],[25,"الفرقان","əl-Furqan"],[26,"الشعراء","əş-Şuəra"],[27,"النمل","ən-Nəml"],[28,"القصص","əl-Qəsəs"],[29,"العنكبوت","əl-Ənkəbut"],[30,"الروم","ər-Rum"],[31,"لقمان","Loqman"],[32,"السجدə","əs-Səcdə"],[33,"الأحزاب","əl-Əhzab"],[34,"سبأ","Səba"],[35,"فاطر","Fatir"],[36,"يس","Ya-Sin"],[37,"الصافات","əs-Saffat"],[38,"ص","Sad"],[39,"الزمر","əz-Zümər"],[40,"غافر","Ğafir"],[41,"فصلت","Fussilət"],[42,"الشورى","əş-Şura"],[43,"الزخرف","əz-Zuxruf"],[44,"الدخان","əd-Duxan"],[45,"الجاثية","əl-Casiyə"],[46,"الأحقاف","əl-Əhqaf"],[47,"محمد","Muhəmməd"],[48,"الفتح","əl-Fəth"],[49,"الحجرات","əl-Hucurat"],[50,"ق","Qaf"],[51,"الذاريات","əz-Zariyat"],[52,"الطور","ət-Tur"],[53,"النجم","ən-Nəcm"],[54,"القمر","əl-Qəmər"],[55,"الرحمن","ər-Rəhman"],[56,"الواقعة","əl-Vaqiə"],[57,"الحديد","əl-Hədid"],[58,"المجادلة","əl-Mücadilə"],[59,"الحشر","əl-Həşr"],[60,"الممتحنة","əl-Mumtəhinə"],[61,"الصف","əs-Səff"],[62,"الجمعة","əl-Cumə"],[63,"المنافقون","əl-Munafiqun"],[64,"التغابن","ət-Təğabun"],[65,"الطلاق","ət-Talaq"],[66,"التحريم","ət-Təhrim"],[67,"الملك","əl-Mulk"],[68,"القلم","əl-Qələm"],[69,"الحاقة","əl-Haqqə"],[70,"المعارج","əl-Məaric"],[71,"نوح","Nuh"],[72,"الجن","əl-Cin"],[73,"المزمل","əl-Müzzəmmil"],[74,"المدثر","əl-Müddəssir"],[75,"القيامة","əl-Qiyamət"],[76,"الإنسان","əl-İnsan"],[77,"المرسلات","əl-Mürsəlat"],[78,"النبأ","ən-Nəbə"],[79,"النازعات","ən-Naziət"],[80,"عبس","Əbəsə"],[81,"التكوir","ət-Təkvir"],[82,"الانفطار","əl-İnfitar"],[83,"المطففين","əl-Mutaffifin"],[84,"الانشقاق","əl-İnşiqaq"],[85,"البروج","əl-Buruc"],[86,"الطارق","ət-Tariq"],[87,"الأعلى","əl-Əla"],[88,"الغاشية","əl-Ğaşiyə"],[89,"الفجر","əl-Fəcr"],[90,"البلد","əl-Bələd"],[91,"الشمس","əş-Şəms"],[92,"الليل","əl-Leyl"],[93,"الضحى","əd-Duha"],[94,"الشرح","əş-Şərh"],[95,"التين","ət-Tin"],[96,"العلق","əl-Ələq"],[97,"القدر","əl-Qədr"],[98,"البينة","əl-Beyyinə"],[99,"الزلزلة","əz-Zəlzələ"],[100,"العاديات","əl-Adiyat"],[101,"القارعة","əl-Qariə"],[102,"التكاثر","ət-Təkasür"],[103,"العصر","əl-Əsr"],[104,"الهمزة","əl-Huməzə"],[105,"الفيل","əl-Fil"],[106,"قريش","Qureyş"],[107,"الماعون","əl-Maun"],[108,"الكوثر","əl-Kövsər"],[109,"الكافرون","əl-Kafirun"],[110,"النصر","ən-Nəsr"],[111,"المسد","əl-Məsəd"],[112,"الإخلاص","əl-İxlas"],[113,"الفلق","əl-Fələq"],[114,"الناس","ən-Nas"]
];

// SƏNİN ULDUZ GENERATORUN
(function(){
  const c=document.getElementById('stars');
  for(let i=0;i<100;i++){
    const s=document.createElement('div');s.className='s';
    s.style.cssText=`left:${Math.random()*100}%;top:${Math.random()*100}%;width:1.5px;height:1.5px;--d:${2+Math.random()*4}s;--dl:${Math.random()*5}s;--op:${.3+Math.random()*.7}`;
    c.appendChild(s);
  }
})();

function openApp(){
  document.getElementById('intro').classList.add('hide');
  setTimeout(()=>{
    document.getElementById('app').style.display='flex';
    createDust();
  },900);
}

function createDust(){
  const l=document.getElementById('dustLayer');
  for(let i=0;i<20;i++){
    const p=document.createElement('div');p.className='dust-p';
    p.style.cssText=`left:${Math.random()*100}%;bottom:10%;--dd:${4+Math.random()*6}s;--ddl:${Math.random()*5}s;--dx:${-40+Math.random()*80}px;--dy:${-100-Math.random()*150}px`;
    l.appendChild(p);
  }
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
  SURAHS.forEach((m) => {
    const chip=document.createElement('div');
    chip.className='surah-chip' + (m[0] === currentSurahNum ? ' active' : '');
    chip.innerText = `${m[0]}. ${m[2]}`;
    chip.onclick = () => loadSurah(m[0]);
    wrap.appendChild(chip);
  });
}

// DİL DƏYİŞDİRMƏ VƏ YÜKLƏMƏ
async function changeLanguage(val){
    currentLang = val;
    document.getElementById('langIndicator').innerText = document.getElementById('langSelect').options[document.getElementById('langSelect').selectedIndex].text;
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
        QURAN_DATA = data.data.ayahs;
        renderPage();
    } catch(e) {
        document.getElementById('pageText').innerText = "Bağlantı xətası!";
    }
}

function renderPage(){
    const start = currentPage * AYAHS_PER_PAGE;
    const chunk = QURAN_DATA.slice(start, start + AYAHS_PER_PAGE);
    const textEl = document.getElementById('pageText');
    const meta = SURAHS[currentSurahNum-1];
    
    // Dilə görə istiqamət: Ərəbcədirsə sağdan sola (rtl), yoxsa soldan sağa (ltr)
    if(currentLang === 'quran-uthmani'){
        textEl.className = 'page-text rtl';
    } else {
        textEl.className = 'page-text ltr';
    }
    
    document.getElementById('pageBannerName').innerText = meta[1];
    document.getElementById('pageBannerAz').innerText = meta[2];
    document.getElementById('rSurahName').innerText = meta[2];
    document.getElementById('rPageNum').innerText = `Səhifə ${currentPage + 1}`;
    
    textEl.innerHTML = chunk.map(a => `${a.text} <span style="color:var(--gold3); font-size:13px;">(${a.numberInSurah})</span>`).join(' ');
    
    const prog = ((currentPage + 1) / Math.ceil(QURAN_DATA.length / AYAHS_PER_PAGE)) * 100;
    document.getElementById('progressBar').style.width = prog + '%';
}

function nextPage(){
    if(currentPage < Math.ceil(QURAN_DATA.length / AYAHS_PER_PAGE) - 1) {
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
