let currentLang = 'az.sultanov';
let currentSurahNum = 1;
let currentPage = 0;
let QURAN_CACHE = {};
const AYAHS_PER_PAGE = 7;

// SƏNİN FAYLINDAKI TAM SURAH_META MASSİVİ
const SURAH_META = [[1,"الفاتحة","əl-Fatihə",7,"Məkkə"],[2,"البقرة","əl-Bəqərə",286,"Mədinə"],[3,"آل عمران","Ali İmran",200,"Mədinə"],[4,"النساء","ən-Nisa",176,"Mədinə"],[5,"المائدة","əl-Maidə",120,"Mədinə"],[6,"الأنعام","əl-Ənam",165,"Məkkə"],[7,"الأعراف","əl-Əraf",206,"Məkkə"],[8,"الأنفال","əl-Ənfal",75,"Mədinə"],[9,"التوبة","ət-Tövbə",129,"Mədinə"],[10,"يونس","Yunus",109,"Məkkə"],[11,"هود","Hud",123,"Məkkə"],[12,"يوسف","Yusif",111,"Məkkə"],[13,"الرعد","ər-Rəd",43,"Mədinə"],[14,"إبراهيم","İbrahim",52,"Məkkə"],[15,"الحجر","əl-Hicr",99,"Məkkə"],[16,"النحل","ən-Nəhl",128,"Məkkə"],[17,"الإسراء","əl-İsra",111,"Məkkə"],[18,"الكهf","əl-Kəhf",110,"Məkkə"],[19,"مريم","Məryəm",98,"Məkkə"],[20,"طه","Ta-Ha",135,"Məkkə"],[21,"الأنبياء","əl-Ənbiya",112,"Məkkə"],[22,"الحج","əl-Həcc",78,"Mədinə"],[23,"المؤمنون","əl-Muminun",118,"Məkkə"],[24,"النور","ən-Nur",64,"Mədinə"],[25,"الفرقان","əl-Furqan",77,"Məkkə"],[26,"الشعراء","əş-Şuəra",227,"Məkkə"],[27,"النمل","ən-Nəml",93,"Məkkə"],[28,"القصص","əl-Qəsəs",88,"Məkkə"],[29,"العنكبوت","əl-Ənkəbut",69,"Məkkə"],[30,"الروم","ər-Rum",60,"Məkkə"],[31,"لقمان","Loqman",34,"Məkkə"],[32,"السجدة","əs-Səcdə",30,"Məkkə"],[33,"الأحزاب","əl-Əhzab",73,"Mədinə"],[34,"سبأ","Səba",54,"Məkkə"],[35,"فاطر","Fatir",45,"Məkkə"],[36,"يس","Ya-Sin",83,"Məkkə"],[37,"الصافات","əs-Saffat",182,"Məkkə"],[38,"ص","Sad",88,"Məkkə"],[39,"الزمر","əz-Zümər",75,"Məkkə"],[40,"غافر","Ğafir",85,"Məkkə"],[41,"فصلت","Fussilət",54,"Məkkə"],[42,"الشورى","əş-Şura",53,"Məkkə"],[43,"الزخرف","əz-Zuxruf",89,"Məkkə"],[44,"الدخان","əd-Duxan",59,"Məkkə"],[45,"الجاثية","əl-Casiyə",37,"Məkkə"],[46,"الأحقاف","əl-Əhqaf",35,"Məkkə"],[47,"محمد","Muhəmməd",38,"Mədinə"],[48,"الفتح","əl-Fəth",29,"Mədinə"],[49,"الحجرات","əl-Hucurat",18,"Mədinə"],[50,"ق","Qaf",45,"Məkkə"],[51,"الذاريات","əz-Zariyat",60,"Məkkə"],[52,"الطور","ət-Tur",49,"Məkkə"],[53,"النجم","ən-Nəcm",62,"Məkkə"],[54,"القمر","əl-Qəmər",55,"Məkkə"],[55,"الرحمن","ər-Rəhman",78,"Mədinə"],[56,"الواقعة","əl-Vaqiə",96,"Məkkə"],[57,"الحديد","əl-Hədid",29,"Mədinə"],[58,"المجادلة","əl-Mücadilə",22,"Mədinə"],[59,"الحشر","əl-Həşr",24,"Mədinə"],[60,"الممتحنة","əl-Mumtəhinə",13,"Mədinə"],[61,"الصف","əs-Səff",14,"Mədinə"],[62,"الجمعة","əl-Cumə",11,"Mədinə"],[63,"المنافقون","əl-Munafiqun",11,"Mədinə"],[64,"التغابن","ət-Təğabun",18,"Mədinə"],[65,"الطلاق","ət-Talaq",12,"Mədinə"],[66,"التحريم","ət-Təhrim",12,"Mədinə"],[67,"الملك","əl-Mulk",30,"Məkkə"],[68,"القلم","əl-Qələm",52,"Məkkə"],[69,"الحاقة","əl-Haqqə",52,"Məkkə"],[70,"المعارج","əl-Məaric",44,"Məkkə"],[71,"نوح","Nuh",28,"Məkkə"],[72,"الجن","əl-Cin",28,"Məkkə"],[73,"المزمل","əl-Müzzəmmil",20,"Məkkə"],[74,"المدثر","əl-Müddəssir",56,"Məkkə"],[75,"القيامة","əl-Qiyamət",40,"Məkkə"],[76,"الإنسان","əl-İnsan",31,"Mədinə"],[77,"المرسلات","əl-Mürsəlat",50,"Məkkə"],[78,"النبأ","ən-Nəbə",40,"Məkkə"],[79,"النازعات","ən-Naziət",46,"Məkkə"],[80,"عبس","Əbəsə",42,"Məkkə"],[81,"التكوir","ət-Təkvir",29,"Məkkə"],[82,"الانفطار","əl-İnfitar",19,"Məkkə"],[83,"المطففين","əl-Mutaffifin",36,"Məkkə"],[84,"الانشقاق","əl-İnşiqaq",25,"Məkkə"],[85,"البروج","əl-Buruc",22,"Məkkə"],[86,"الطارق","ət-Tariq",17,"Məkkə"],[87,"الأعلى","əl-Əla",19,"Məkkə"],[88,"الغاشية","əl-Ğaşiyə",26,"Məkkə"],[89,"الفجر","əl-Fəcr",30,"Məkkə"],[90,"البلد","əl-Bələd",20,"Məkkə"],[91,"الشمس","əş-Şəms",15,"Məkkə"],[92,"الليل","əl-Leyl",21,"Məkkə"],[93,"الضحى","əd-Duha",11,"Məkkə"],[94,"الشرح","əş-Şərh",8,"Məkkə"],[95,"التين","ət-Tin",8,"Məkkə"],[96,"العلق","əl-Ələq",19,"Məkkə"],[97,"القدر","əl-Qədr",5,"Məkkə"],[98,"البينة","əl-Beyyinə",8,"Mədinə"],[99,"الزلزلة","əz-Zəlzələ",8,"Mədinə"],[100,"العاديات","əl-Adiyat",11,"Məkkə"],[101,"القارعة","əl-Qariə",11,"Məkkə"],[102,"التكاثر","ət-Təkasür",8,"Məkkə"],[103,"العصر","əl-Əsr",3,"Məkkə"],[104,"الهمزة","əl-Huməzə",9,"Məkkə"],[105,"الفيل","əl-Fil",5,"Məkkə"],[106,"قريش","Qureyş",4,"Məkkə"],[107,"الماعون","əl-Maun",7,"Məkkə"],[108,"الكوثر","əl-Kövsər",3,"Məkkə"],[109,"الكافرون","əl-Kafirun",6,"Məkkə"],[110,"النصر","ən-Nəsr",3,"Mədinə"],[111,"المسد","əl-Məsəd",5,"Məkkə"],[112,"الإخلاص","əl-İxlas",4,"Məkkə"],[113,"الفلق","əl-Fələq",5,"Məkkə"],[114,"الناس","ən-Nas",6,"Məkkə"]];

// SƏNİN ULDUZ GENERATORUN
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
  for(let i=0;i<20;i++){
    const p=document.createElement('div');p.className='dust-p';
    p.style.cssText=`left:${Math.random()*100}%;bottom:10%;--dd:${4+Math.random()*6}s;--ddl:${Math.random()*5}s;--dx:${-40+Math.random()*80}px;--dy:${-100-Math.random()*150}px`;
    l.appendChild(p);
  }
}

// READER FUNKSİYALARI
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
  SURAH_META.forEach((m, i) => {
    const chip=document.createElement('div');
    chip.className='surah-chip' + (m[0] === currentSurahNum ? ' active' : '');
    chip.innerText = `${m[0]}. ${m[2]}`;
    chip.onclick = () => loadSurah(m[0]);
    wrap.appendChild(chip);
  });
}

// MULTILINGUAL API LOADER
async function changeLanguage(val){
    currentLang = val;
    QURAN_CACHE = {}; 
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
        document.getElementById('pageText').innerText = "Xəta! İnterneti yoxlayın.";
    }
}

function renderPage(){
    const ayahs = QURAN_CACHE[currentSurahNum];
    const meta = SURAH_META[currentSurahNum-1];
    const start = currentPage * AYAHS_PER_PAGE;
    const chunk = ayahs.slice(start, start + AYAHS_PER_PAGE);
    
    const textEl = document.getElementById('pageText');
    textEl.className = 'page-text ' + (currentLang === 'quran-uthmani' ? 'rtl' : 'ltr');
    
    document.getElementById('pageBannerName').innerText = meta[1];
    document.getElementById('pageBannerAz').innerText = meta[2];
    document.getElementById('rSurahName').innerText = meta[2];
    document.getElementById('rPageNum').innerText = `Səhifə ${currentPage + 1}`;
    
    textEl.innerHTML = chunk.map(a => `${a.text} <span class="ayah-num" style="color:var(--gold3); font-size:12px;">(${a.numberInSurah})</span>`).join(' ');
    
    const prog = ((currentPage + 1) / Math.ceil(ayahs.length / AYAHS_PER_PAGE)) * 100;
    document.getElementById('progressBar').style.width = prog + '%';
}

function nextPage(){
    const max = Math.ceil(QURAN_CACHE[currentSurahNum].length / AYAHS_PER_PAGE);
    if(currentPage < max - 1) { currentPage++; renderPage(); }
    else if(currentSurahNum < 114) { loadSurah(currentSurahNum + 1); }
}

function prevPage(){
    if(currentPage > 0) { currentPage--; renderPage(); }
    else if(currentSurahNum > 1) { loadSurah(currentSurahNum - 1); }
}

// SƏNİN FAYLINDAKI SWIPE/TOUCH HADİSƏLƏRİ BURAYA ƏLAVƏ EDİLƏ BİLƏR
