// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────
const LETTER_DATA = {
  A:{word:'Apple', emoji:'🍎'},
  B:{word:'Ball',  emoji:'⚽'},
  C:{word:'Cat',   emoji:'🐱'},
  D:{word:'Dog',   emoji:'🐶'},
  E:{word:'Egg',   emoji:'🥚'},
  F:{word:'Fish',  emoji:'🐟'},
  G:{word:'Grapes',emoji:'🍇'},
  H:{word:'Hat',   emoji:'🎩'},
  I:{word:'Ice cream',emoji:'🍦'},
  J:{word:'Juice', emoji:'🧃'},
  K:{word:'Kite',  emoji:'🪁'},
  L:{word:'Lion',  emoji:'🦁'},
  M:{word:'Moon',  emoji:'🌙'},
  N:{word:'Nest',  emoji:'🪺'},
  O:{word:'Orange',emoji:'🍊'},
  P:{word:'Pig',   emoji:'🐷'},
  Q:{word:'Queen', emoji:'👑'},
  R:{word:'Rainbow',emoji:'🌈'},
  S:{word:'Sun',   emoji:'☀️'},
  T:{word:'Train', emoji:'🚂'},
  U:{word:'Umbrella',emoji:'☂️'},
  V:{word:'Van',   emoji:'🚐'},
  W:{word:'Water', emoji:'💧'},
  X:{word:'X-ray', emoji:'🦴'},
  Y:{word:'Yo-yo', emoji:'🪀'},
  Z:{word:'Zebra', emoji:'🦓'},
};
const LETTER_SETS = {
  1:['A','B','C','D','E'],
  2:['F','G','H','I','J'],
  3:['K','L','M','N','O'],
  4:['P','Q','R','S','T'],
  5:['U','V','W','X','Y','Z'],
};

const NUMBER_WORDS = {
  0:'Zero', 1:'One', 2:'Two', 3:'Three', 4:'Four', 5:'Five', 6:'Six', 7:'Seven', 8:'Eight', 9:'Nine', 10:'Ten',
  11:'Eleven', 12:'Twelve', 13:'Thirteen', 14:'Fourteen', 15:'Fifteen', 16:'Sixteen', 17:'Seventeen', 18:'Eighteen', 19:'Nineteen',
  20:'Twenty', 30:'Thirty', 40:'Forty', 50:'Fifty', 60:'Sixty', 70:'Seventy', 80:'Eighty', 90:'Ninety', 100:'One hundred'
};

const NUMBER_DATA = Array.from({length:100}, (_,idx) => {
  const n = idx + 1;
  return [n, { word: numberToWords(n) }];
}).reduce((acc,[k,v]) => { acc[k]=v; return acc; }, {});

const MATH_IMAGE_SETS = [
  { item:'🍎', name:'apples' },
  { item:'⭐', name:'stars' },
  { item:'🦆', name:'ducks' },
  { item:'🚗', name:'cars' },
  { item:'🎈', name:'balloons' },
  { item:'🍪', name:'cookies' },
  { item:'🐻', name:'bears' }
];

const SAYIT_WORDS = buildSayItWords();

function buildSayItWords() {
  const base = Object.values(LETTER_DATA).map(item => ({ word:item.word, emoji:item.emoji }));
  const extras = [
    {word:'Train', emoji:'🚂'}, {word:'Hat', emoji:'🎩'}, {word:'Juice', emoji:'🧃'},
    {word:'Kite', emoji:'🪁'}, {word:'Lion', emoji:'🦁'}, {word:'Nest', emoji:'🪺'},
    {word:'Orange', emoji:'🍊'}, {word:'Pig', emoji:'🐷'}, {word:'Queen', emoji:'👑'},
    {word:'Rainbow', emoji:'🌈'}, {word:'Umbrella', emoji:'☂️'}, {word:'Van', emoji:'🚐'},
    {word:'Water', emoji:'💧'}, {word:'Zebra', emoji:'🦓'}, {word:'Bear', emoji:'🐻'},
    {word:'Cookie', emoji:'🍪'}, {word:'Duck', emoji:'🦆'}, {word:'Balloon', emoji:'🎈'},
    {word:'Moon', emoji:'🌙'}, {word:'Star', emoji:'⭐'}, {word:'Apple', emoji:'🍎'},
    {word:'Banana', emoji:'🍌'}, {word:'Car', emoji:'🚗'}, {word:'Bus', emoji:'🚌'}
  ];
  const seen = new Set();
  return [...base, ...extras].filter(item => {
    const key = item.word.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}


const PRAISE_OPTIONS = [
  {emoji:'🎉', text:'Amazing!'},
  {emoji:'⭐', text:'Super Star!'},
  {emoji:'🎊', text:'Well done!'},
  {emoji:'🌈', text:'Brilliant!'},
  {emoji:'🏆', text:'You got it!'},
  {emoji:'💛', text:'Wonderful!'},
];


const YESNO_DATA = [
  {q:'Is this a dog?', emoji:'🐶', correct:'yes'},
  {q:'Is this a cat?', emoji:'🐶', correct:'no'},
  {q:'Is this an apple?', emoji:'🍎', correct:'yes'},
  {q:'Is this a car?', emoji:'🍌', correct:'no'},
  {q:'Is this a bus?', emoji:'🚌', correct:'yes'},
  {q:'Is this a fish?', emoji:'🐟', correct:'yes'},
  {q:'Is this a bird?', emoji:'⚽', correct:'no'},
  {q:'Is this the sun?', emoji:'☀️', correct:'yes'},
  {q:'Is this the moon?', emoji:'🌙', correct:'yes'},
  {q:'Is this a banana?', emoji:'🍌', correct:'yes'},
  {q:'Do you see a star?', emoji:'⭐', correct:'yes'},
  {q:'Is this a zebra?', emoji:'🚗', correct:'no'}
];

const DIRECTIONS = [
  {dir:'UP', emoji:'⬆️', prompt:'Tap UP', action:'up'},
  {dir:'DOWN', emoji:'⬇️', prompt:'Tap DOWN', action:'down'},
  {dir:'LEFT', emoji:'⬅️', prompt:'Tap LEFT', action:'left'},
  {dir:'RIGHT', emoji:'➡️', prompt:'Tap RIGHT', action:'right'}
];

// ─────────────────────────────────────────────
// SETTINGS STATE
// ─────────────────────────────────────────────
let cfg = {
  sound: true,
  music: true,
  voice: true,
  timer: false,
  prompt: true,
  qcount: 5,
  choices: 2,
  letterSets: [1],
  numRange: '1-10',
};

function saveSetting() {
  cfg.sound  = document.getElementById('s-sound').checked;
  cfg.music  = document.getElementById('s-music').checked;
  cfg.voice  = document.getElementById('s-voice').checked;
  cfg.timer  = document.getElementById('s-timer').checked;
  cfg.prompt = document.getElementById('s-prompt').checked;

  if (!cfg.sound || !cfg.music) {
    stopMenuMusic();
  } else if (document.getElementById('home').classList.contains('active')) {
    playMenuMusic();
  }
}
function selectChip(groupId, val) {
  document.querySelectorAll(`#${groupId} .chip`).forEach(c=>c.classList.remove('selected'));
  document.querySelector(`#${groupId} [data-val="${val}"]`).classList.add('selected');
  if(groupId==='s-qcount')   cfg.qcount  = val;
  if(groupId==='s-choices')  cfg.choices = val;
  if(groupId==='s-numrange') cfg.numRange= val;
}
function toggleLetterSet(val) {
  const el = document.querySelector(`#s-lettersets [data-val="${val}"]`);
  const idx = cfg.letterSets.indexOf(val);
  if(idx>=0 && cfg.letterSets.length>1) { cfg.letterSets.splice(idx,1); el.classList.remove('selected'); }
  else if(idx<0) { cfg.letterSets.push(val); el.classList.add('selected'); }
}


let menuMusicStarted = false;

function getMenuMusic() {
  return document.getElementById('menu-music');
}

function playMenuMusic() {
  const audio = getMenuMusic();
  const homeScreen = document.getElementById('home');
  const onHome = homeScreen && homeScreen.classList.contains('active');
  if (!audio || !cfg.sound || !cfg.music || !onHome) return;
  audio.volume = 0.45;
  const p = audio.play();
  if (p !== undefined && typeof p.catch === 'function') {
    p.catch(() => {});
  }
  menuMusicStarted = true;
}

function stopMenuMusic() {
  const menuMusic = document.getElementById('menu-music');
  if (!menuMusic) return;
  try {
    menuMusic.pause();
    menuMusic.currentTime = 0;
  } catch (e) {}
}


// ─────────────────────────────────────────────
// SCREEN NAV
// ─────────────────────────────────────────────
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  addTouchActivation(document.getElementById(id));
  if (id === 'home') playMenuMusic();
  else stopMenuMusic();
}
function goHome() {
  ensureMenuMusicStopped();
  clearTimer();
  stopTimerAlarm();
  resetJigsawState();
  document.getElementById('round-end').classList.remove('show');
  document.getElementById('praise').classList.remove('show');
  showScreen('home');
  document.getElementById('total-stars').textContent = totalStars;
}

// ─────────────────────────────────────────────
// GAME STATE
// ─────────────────────────────────────────────
let currentMode = '';
let questions = [];
let qIndex = 0;
let roundStars = 0;
let totalStars = 0;
let timerInterval = null;
let timerLeft = 0;
let answered = false;
let modeHistory = {
  letterChoiceSignatures: [],
  numberChoiceSignatures: [],
  mathChoiceSignatures: [],
  recentSayItWords: [],
  recentMathItems: [],
};

function resetModeHistory(mode) {
  if (mode === 'letter') modeHistory.letterChoiceSignatures = [];
  if (mode === 'number') modeHistory.numberChoiceSignatures = [];
  if (mode === 'addition' || mode === 'subtraction') {
    modeHistory.mathChoiceSignatures = [];
    modeHistory.recentMathItems = [];
  }
  if (mode === 'sayit') modeHistory.recentSayItWords = [];
}



function ensureMenuMusicStopped(){
  const menuMusic = document.getElementById('menu-music');
  if (!menuMusic) return;
  try {
    menuMusic.pause();
    menuMusic.currentTime = 0;
  } catch (e) {}
}

function startMode(mode) {
  ensureMenuMusicStopped();
  if (mode === 'commands') {
    currentMode = mode;
    stopMenuMusic();
    showScreen('commands');
    setTimeout(() => showListenPage(1), 0);
    return;
  }
  currentMode = mode;
  roundStars = 0;
  qIndex = 0;
  questions = buildQuestions(mode);
  stopMenuMusic();
  showScreen('game');
  updateSoundBtn();

  const matchArea = document.getElementById('match-area');
  const choicesArea = document.getElementById('choices-area');
  const sayitArea = document.getElementById('sayit-area');

  if(mode==='sayit') {
    matchArea.classList.add('hidden');
    choicesArea.classList.add('hidden');
    sayitArea.classList.remove('hidden');
  } else {
    matchArea.classList.remove('hidden');
    choicesArea.classList.remove('hidden');
    sayitArea.classList.add('hidden');
  }

  renderProgress();
  renderQuestion();
}

function buildQuestions(mode) {
  let pool = [];
  if(mode==='letter') {
    cfg.letterSets.forEach(s=>{ pool.push(...LETTER_SETS[s]); });
    resetModeHistory('letter');
    return sampleVaried(pool, cfg.qcount, value => value);
  }
  if(mode==='number') {
    const range = parseNumberRange(cfg.numRange);
    pool = Array.from({length: range.max - range.min + 1},(_, i)=>range.min + i);
    resetModeHistory('number');
    return sampleVaried(pool, Math.min(cfg.qcount, pool.length), value => String(value));
  }
  if(mode==='addition') {
    resetModeHistory('addition');
    return buildMathQuestions('addition');
  }
  if(mode==='subtraction') {
    resetModeHistory('subtraction');
    return buildMathQuestions('subtraction');
  }
  if(mode==='yesno') {
    resetModeHistory('yesno');
    return sampleVaried([...YESNO_DATA], cfg.qcount, item => item.q + '|' + item.correct);
  }
  if(mode==='directions') {
    resetModeHistory('directions');
    const directionPool = [];
    for (let i = 0; i < cfg.qcount; i++) {
      directionPool.push(DIRECTIONS[i % DIRECTIONS.length]);
    }
    return shuffleCopy(directionPool);
  }
  if(mode==='sayit') {
    resetModeHistory('sayit');
    return sampleVaried([...SAYIT_WORDS], cfg.qcount, item => item.word.toLowerCase());
  }
  return [];
}


function renderProgress() {
  const dots = document.getElementById('progress-dots');
  dots.innerHTML = '';
  for(let i=0;i<questions.length;i++){
    const d = document.createElement('div');
    d.className = 'progress-dot' + (i<qIndex?' done': i===qIndex?' current':'');
    dots.appendChild(d);
  }
}

function renderQuestion() {
  answered = false;
  renderProgress();
  const q = questions[qIndex];

  if(currentMode==='letter') renderLetterQ(q);
  if(currentMode==='number') renderNumberQ(q);
  if(currentMode==='addition') renderMathQ(q, 'addition');
  if(currentMode==='subtraction') renderMathQ(q, 'subtraction');
  if(currentMode==='yesno') renderYesNoQ(q);
  if(currentMode==='directions') renderDirectionsQ(q);
  if(currentMode==='sayit')  renderSayItQ(q);

  if(cfg.timer && currentMode!=='sayit') startTimer();
  else clearTimer();
}

// ── LETTER MODE ──
function renderLetterQ(letter) {
  const bd = document.getElementById('big-content');
  bd.className = 'big-letter';
  bd.textContent = letter;
  document.getElementById('question-label').textContent = 'Tap the letter to hear it';

  const activeLetters = [];
  cfg.letterSets.forEach(s => activeLetters.push(...LETTER_SETS[s]));
  const wrong = pickVariedLetterDistractors(letter, activeLetters, cfg.choices - 1);
  const all = shuffleCopy([letter, ...wrong]);
  rememberSignature(modeHistory.letterChoiceSignatures, all.join('|'));

  const ca = document.getElementById('choices-area');
  ca.innerHTML = '';
  ca.className = 'choices-area ' + (cfg.choices<=2?'cols-2': cfg.choices===3?'cols-3':'cols-4');

  all.forEach(l => {
    const d = LETTER_DATA[l];
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.innerHTML = `<span class="choice-emoji">${d.emoji}</span><span class="choice-label">${d.word}</span>`;
    btn.onclick = () => onLetterChoice(l, letter, btn);
    ca.appendChild(btn);
  });

  setTimeout(()=>speakLetter(letter), 600);
}


function onLetterChoice(chosen, correct, btn) {
  if(answered) return;
  answered = true;
  clearTimer();
  const allBtns = document.querySelectorAll('.choice-btn');
  allBtns.forEach(b=>b.classList.add('disabled'));

  if(chosen===correct) {
    btn.classList.add('correct');
    const d = LETTER_DATA[correct];
    const phrase = `${correct} is for ${d.word}`;
    const sub = cfg.prompt ? `Can you say "${d.word}"?` : '';
    playSuccess();
    setTimeout(()=>speak(phrase), 200);
    setTimeout(()=>showPraise(d.emoji, phrase, sub), 300);
  } else {
    btn.classList.add('wrong');
    // show correct
    document.querySelectorAll('.choice-btn').forEach((b,i)=>{
      const label = b.querySelector('.choice-label').textContent;
      if(label===LETTER_DATA[correct].word) b.classList.add('correct');
    });
    playWrong();
    setTimeout(()=>{ nextQuestion(); }, 1800);
  }
}

function speakLetter(letter) {
  if(!cfg.sound) return;
  if(!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  // Speak the letter as lowercase to avoid TTS saying "capital A"
  const u = new SpeechSynthesisUtterance(letter.toLowerCase());
  u.rate = 0.78;
  u.pitch = 1.05;
  u.lang = 'en-US';
  const voices = window.speechSynthesis.getVoices();
  const pref = voices.find(v=>v.name.includes('Samantha')||v.name.includes('Karen')||v.name.includes('Moira'))||
               voices.find(v=>v.lang==='en-US')||voices[0];
  if(pref) u.voice = pref;
  window.speechSynthesis.speak(u);
}

// ── NUMBER MODE ──
function renderNumberQ(num) {
  const bd = document.getElementById('big-content');
  bd.className = 'big-number';
  bd.textContent = num;
  document.getElementById('question-label').textContent = 'Tap the number to hear it';

  const range = parseNumberRange(cfg.numRange);
  const wrong = pickVariedNumberDistractors(num, range, cfg.choices - 1);
  const all = shuffleCopy([num, ...wrong]);
  rememberSignature(modeHistory.numberChoiceSignatures, all.join('|'));

  const ca = document.getElementById('choices-area');
  ca.innerHTML = '';
  ca.className = 'choices-area ' + (cfg.choices<=2?'cols-2': cfg.choices===3?'cols-3':'cols-4');

  all.forEach(n => {
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    const dotsHtml = renderDots(n);
    btn.innerHTML = `<div class="dots-wrap">${dotsHtml}</div><span class="choice-count">${n}</span>`;
    btn.onclick = () => onNumberChoice(n, num, btn);
    ca.appendChild(btn);
  });

  setTimeout(()=>speak(NUMBER_DATA[num].word), 600);
}


function renderDots(n) {
  let html = '';
  for(let i=0;i<n;i++) html += `<div class="dot"></div>`;
  return html;
}

function onNumberChoice(chosen, correct, btn) {
  if(answered) return;
  answered = true;
  clearTimer();
  document.querySelectorAll('.choice-btn').forEach(b=>b.classList.add('disabled'));

  if(chosen===correct) {
    btn.classList.add('correct');
    const phrase = `${NUMBER_DATA[correct].word}!`;
    playSuccess();
    setTimeout(()=>speak(NUMBER_DATA[correct].word), 200);
    setTimeout(()=>showPraise('🔢', phrase, ''), 300);
  } else {
    btn.classList.add('wrong');
    document.querySelectorAll('.choice-btn').forEach(b=>{
      const label = b.querySelector('.choice-count');
      if(label && parseInt(label.textContent)===correct) b.classList.add('correct');
    });
    playWrong();
    setTimeout(()=>{ nextQuestion(); }, 1800);
  }
}


function buildMathQuestions(mode) {
  const total = Math.max(3, cfg.qcount);
  const questions = [];
  let lastItem = '';
  const recentAnswers = [];

  for (let i = 0; i < total; i++) {
    const set = pickDifferentMathSet(lastItem);
    lastItem = set.item;

    let a, b, answer;
    let attempts = 0;
    do {
      if (mode === 'addition') {
        a = randInt(1, 6);
        b = randInt(1, 6);
        answer = a + b;
      } else {
        a = randInt(3, 10);
        b = randInt(1, Math.max(1, a - 1));
        answer = a - b;
      }
      attempts++;
    } while (recentAnswers.includes(answer) && attempts < 10);

    recentAnswers.push(answer);
    if (recentAnswers.length > 4) recentAnswers.shift();

    const choices = buildMathChoices(answer, mode);
    const signature = `${mode}:${choices.join('|')}:${set.item}`;
    if (modeHistory.mathChoiceSignatures.includes(signature)) {
      i--;
      continue;
    }
    rememberSignature(modeHistory.mathChoiceSignatures, signature);

    questions.push({ mode, a, b, answer, item: set.item, itemName: set.name, choices });
  }
  return questions;
}

function buildMathChoices(answer, mode) {
  const set = new Set([answer]);
  const closeOffsets = shuffleCopy([-3, -2, -1, 1, 2, 3, 4, -4]);
  for (const offset of closeOffsets) {
    const candidate = answer + offset;
    const maxVal = mode === 'addition' ? 12 : 10;
    if (candidate >= 0 && candidate <= maxVal) set.add(candidate);
    if (set.size >= cfg.choices) break;
  }
  while (set.size < cfg.choices) {
    const maxVal = mode === 'addition' ? 12 : 10;
    set.add(randInt(0, maxVal));
  }
  return shuffleCopy(Array.from(set)).slice(0, cfg.choices);
}


function renderMathQ(q, mode) {
  const bd = document.getElementById('big-content');
  bd.className = '';
  const symbol = mode === 'addition' ? '+' : '−';
  const actionText = mode === 'addition' ? 'Add the pictures' : 'Take away the pictures';
  document.getElementById('question-label').textContent = actionText;
  bd.innerHTML = `
    <div class="math-board">
      <div class="math-equation">${q.a} ${symbol} ${q.b} = ?</div>
      <div class="math-visual-row">
        <div class="math-group">
          <div class="math-group-items">${renderMathItems(q.item, q.a)}</div>
        </div>
        <div class="math-symbol">${symbol}</div>
        <div class="math-group">
          <div class="math-group-items">${renderMathItems(q.item, q.b)}</div>
        </div>
      </div>
    </div>`;

  const ca = document.getElementById('choices-area');
  ca.innerHTML = '';
  ca.className = 'choices-area ' + (cfg.choices<=2?'cols-2': cfg.choices===3?'cols-3':'cols-4');
  q.choices.forEach(choice => {
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.innerHTML = `<span class="choice-emoji">${q.item}</span><span class="choice-count">${choice}</span><span class="math-choice-expression">${choice} ${q.itemName}</span>`;
    btn.onclick = () => onMathChoice(choice, q.answer, btn, q);
    ca.appendChild(btn);
  });

  setTimeout(() => {
    speak(mode === 'addition' ? `${q.a} plus ${q.b}` : `${q.a} take away ${q.b}`);
  }, 500);
}

function renderMathItems(item, count) {
  let html = '';
  for (let i = 0; i < count; i++) html += `<span class="math-item">${item}</span>`;
  return html;
}

function onMathChoice(chosen, correct, btn, q) {
  if (answered) return;
  answered = true;
  clearTimer();
  document.querySelectorAll('.choice-btn').forEach(b=>b.classList.add('disabled'));

  if (chosen === correct) {
    btn.classList.add('correct');
    playSuccess();
    const phrase = currentMode === 'addition'
      ? `${q.a} plus ${q.b} is ${q.answer}`
      : `${q.a} take away ${q.b} is ${q.answer}`;
    setTimeout(() => speak(phrase), 150);
    setTimeout(() => showPraise(q.item, phrase, `Great counting with ${q.itemName}!`), 300);
  } else {
    btn.classList.add('wrong');
    document.querySelectorAll('.choice-btn').forEach(b=>{
      const label = b.querySelector('.choice-count');
      if (label && parseInt(label.textContent, 10) === correct) b.classList.add('correct');
    });
    playWrong();
    setTimeout(() => nextQuestion(), 1800);
  }
}


function renderYesNoQ(q){
  document.getElementById('question-label').textContent = 'YES or NO?';
  document.getElementById('big-content').innerHTML = q.emoji;
  document.getElementById('tap-hint').textContent = q.q;
  const ca = document.getElementById('choices-area');
  ca.innerHTML='';
  ca.className = 'choices-area cols-2';

  const options = [
    {key:'yes', emoji:'✅', label:'YES'},
    {key:'no', emoji:'❌', label:'NO'}
  ];

  options.forEach(opt=>{
    const btn=document.createElement('button');
    btn.className='choice-btn yn-btn';
    btn.innerHTML=`<span class="yn-main">${opt.emoji}</span><span class="yn-text">${opt.label}</span>`;
    btn.onclick=()=>onYesNo(opt.key,q.correct,btn);
    ca.appendChild(btn);
  });

  setTimeout(()=>speak(q.q), 500);
}

function onYesNo(chosen,correct,btn){
  if(answered) return;
  answered = true;
  speak(chosen === 'yes' ? 'Yes' : 'No');
  clearTimer();
  document.querySelectorAll('.choice-btn').forEach(b=>b.classList.add('disabled'));
  if(chosen===correct){
    btn.classList.add('correct');
    playSuccess();
    setTimeout(()=>showPraise(correct==='yes'?'✅':'❌', correct==='yes'?'Yes!':'No!', 'Great answering!'),300);
  } else {
    btn.classList.add('wrong');
    document.querySelectorAll('.choice-btn').forEach(b=>{
      const text = b.textContent.trim().toLowerCase();
      if ((correct === 'yes' && text.includes('yes')) || (correct === 'no' && text.includes('no'))) {
        b.classList.add('correct');
      }
    });
    playWrong();
    setTimeout(nextQuestion, 1400);
  }
}

function renderDirectionsQ(q){
  document.getElementById('question-label').textContent = 'Directions';
  document.getElementById('big-content').innerHTML = q.emoji;
  document.getElementById('tap-hint').textContent = q.prompt;
  const ca = document.getElementById('choices-area');
  ca.innerHTML='';
  ca.className = 'choices-area cols-2';
  const allChoices = shuffle([...DIRECTIONS]).slice(0, Math.min(cfg.choices, DIRECTIONS.length));
  if (!allChoices.some(d => d.dir === q.dir)) {
    allChoices[0] = DIRECTIONS.find(d => d.dir === q.dir);
    shuffle(allChoices);
  }

  allChoices.forEach(d=>{
    const btn=document.createElement('button');
    btn.className='choice-btn direction-choice';
    btn.innerHTML=`<span class="choice-emoji">${d.emoji}</span><span class="choice-label">${d.dir}</span>`;
    btn.onclick=()=>onDirection(d.dir,q.dir,btn);
    ca.appendChild(btn);
  });

  setTimeout(()=>speak(q.prompt), 500);
}

function onDirection(chosen,correct,btn){
  if(answered) return;
  answered=true;
  clearTimer();
  document.querySelectorAll('.choice-btn').forEach(b=>b.classList.add('disabled'));
  if(chosen===correct){
    btn.classList.add('correct');
    playSuccess();
    setTimeout(()=>showPraise('🧭','Nice!', 'You followed the direction!'),300);
  } else {
    btn.classList.add('wrong');
    document.querySelectorAll('.choice-btn').forEach(b=>{
      const text = b.textContent.trim().toUpperCase();
      if (text.includes(correct)) b.classList.add('correct');
    });
    playWrong();
    setTimeout(nextQuestion,1400);
  }
}

// ── SAY IT MODE ──
let recog = null;
let micReady = false;
let sayItAttempts = 0;

function initRecog() {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if(!SR) { micReady = false; return; }
  micReady = true;
}

function buildRecog() {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if(!SR) return null;
  const r = new SR();
  r.lang = 'en-AU'; // Australian English for iPad locale
  r.continuous = false;
  r.interimResults = true;
  r.maxAlternatives = 6;
  return r;
}

function renderSayItQ(item) {
  sayItAttempts = 0;
  document.getElementById('sayit-pic').textContent = item.emoji;
  document.getElementById('sayit-word').textContent = item.word.toUpperCase();
  document.getElementById('sayit-prompt').textContent = '👂 Listen…';
  document.getElementById('heard-text').textContent = '';

  const micBtn     = document.getElementById('mic-btn');
  const parentBtn  = document.getElementById('parent-btn');

  micBtn.classList.add('disabled-mic');
  micBtn.classList.remove('listening', 'success', 'fail');
  micBtn.textContent = '🎤';
  parentBtn.style.opacity = '0';
  parentBtn.style.pointerEvents = 'none';

  setTimeout(() => {
    speak(item.word);
    setTimeout(() => {
      if (micReady) {
        document.getElementById('sayit-prompt').textContent = '🎤 Tap the mic and say the word!';
      } else {
        document.getElementById('sayit-prompt').textContent = '🚫 Microphone not available on this device.';
        parentBtn.style.opacity = '1';
        parentBtn.style.pointerEvents = 'auto';
      }
      micBtn.classList.remove('disabled-mic');
    }, 1600);
  }, 700);
}

function onMicTap() {
  if (!micReady) return;
  const item = questions[qIndex];
  if (!item || answered) return;

  const micBtn = document.getElementById('mic-btn');

  // If already listening, stop
  if (micBtn.classList.contains('listening')) {
    if (recog) { try { recog.stop(); } catch(e) {} }
    return;
  }

  recog = buildRecog();
  if (!recog) { micReady = false; return; }

  micBtn.classList.add('listening');
  micBtn.classList.remove('fail');
  micBtn.textContent = '🔴';
  document.getElementById('sayit-prompt').textContent = '🟡 Listening… say the word!';
  document.getElementById('heard-text').textContent = '';

  let finalResult = '';
  let resultReceived = false;

  recog.onresult = (e) => {
    let interimText = '';
    for (let i = e.resultIndex; i < e.results.length; i++) {
      const t = e.results[i][0].transcript.trim();
      if (e.results[i].isFinal) {
        // Collect all alternatives from all results
        for (let j = 0; j < e.results[i].length; j++) {
          const alt = e.results[i][j].transcript.trim().toLowerCase();
          if (alt.length > finalResult.length) finalResult = alt;
        }
        resultReceived = true;
      } else {
        interimText = t;
      }
    }
    if (interimText) {
      document.getElementById('heard-text').textContent = '“' + interimText + '…”';
    }
  };

  recog.onend = () => {
    micBtn.classList.remove('listening');
    micBtn.textContent = '🎤';

    if (!resultReceived || finalResult.length === 0) {
      // Nothing was heard at all
      sayItAttempts++;
      document.getElementById('heard-text').textContent = '';
      document.getElementById('sayit-prompt').textContent = '🤔 Nothing heard — tap the mic and try again!';
      micBtn.classList.remove('disabled-mic');
      if (sayItAttempts >= 3) showParentOverride();
      return;
    }

    document.getElementById('heard-text').textContent = '“' + finalResult + '”';

    const target  = item.word.toLowerCase();
    const matched = wordMatch(finalResult, target);

    if (matched) {
      micBtn.classList.add('success');
      micBtn.textContent = '✅';
      document.getElementById('sayit-prompt').textContent = '🎉 You said it!';
      playSuccess();
      speak(item.word);
      setTimeout(() => {
        const sub = cfg.prompt ? `You said "${item.word}" — brilliant!` : '';
        showPraise(item.emoji, item.word, sub);
      }, 800);
    } else {
      // Heard something but wrong word
      sayItAttempts++;
      micBtn.classList.add('fail');
      micBtn.textContent = '🎤';
      const tryPhrases = [
        `🙂 Good try! Can you say "${item.word}"?`,
        `😊 Almost! Try saying "${item.word}" again!`,
        `👍 Keep trying! Say "${item.word}"!`,
      ];
      document.getElementById('sayit-prompt').textContent =
        tryPhrases[Math.min(sayItAttempts - 1, tryPhrases.length - 1)];
      // Speak the word again as a gentle model
      setTimeout(() => speak(item.word), 600);
      setTimeout(() => {
        micBtn.classList.remove('fail', 'disabled-mic');
      }, 400);
      if (sayItAttempts >= 3) showParentOverride();
    }
  };

  recog.onerror = (e) => {
    micBtn.classList.remove('listening');
    micBtn.textContent = '🎤';
    if (e.error === 'not-allowed' || e.error === 'service-not-allowed') {
      micReady = false;
      document.getElementById('sayit-prompt').textContent = '🚫 Microphone blocked. Please allow mic access in Chrome settings.';
      showParentOverride();
    } else if (e.error === 'no-speech') {
      sayItAttempts++;
      document.getElementById('sayit-prompt').textContent = '🤔 Nothing heard — tap the mic and try again!';
      if (sayItAttempts >= 3) showParentOverride();
    } else {
      document.getElementById('sayit-prompt').textContent = '🤔 Something went wrong — try again!';
    }
  };

  try {
    recog.start();
  } catch(err) {
    micBtn.classList.remove('listening');
    micBtn.textContent = '🎤';
    document.getElementById('sayit-prompt').textContent = '🤔 Mic error — tap to try again!';
  }
}

function showParentOverride() {
  const btn = document.getElementById('parent-btn');
  btn.style.opacity = '1';
  btn.style.pointerEvents = 'auto';
}

function onParentOverride() {
  // Parent manually confirms the child said the word
  if (answered) return;
  answered = true;
  if (recog) { try { recog.stop(); } catch(e) {} }
  const item = questions[qIndex];
  playSuccess();
  const sub = cfg.prompt ? `Well done saying "${item.word}"!` : '';
  setTimeout(() => showPraise(item.emoji, item.word, sub), 200);
}

function wordMatch(heard, target) {
  if (!heard || !target) return false;
  const h = heard.toLowerCase().trim();
  const t = target.toLowerCase().trim();
  if (h === t) return true;
  if (h.includes(t)) return true;
  if (t.includes(h) && h.length >= 2) return true;
  // Check all space-separated tokens in heard
  const tokens = h.split(/\s+/);
  for (const tok of tokens) {
    if (tok === t) return true;
    if (levenshtein(tok, t) <= Math.max(1, Math.floor(t.length * 0.35))) return true;
    if (soundexSimple(tok) === soundexSimple(t)) return true;
  }
  return false;
}

function soundexSimple(s) {
  if (!s) return '';
  const map = {b:1,f:1,p:1,v:1,c:2,g:2,j:2,k:2,q:2,s:2,x:2,z:2,d:3,t:3,l:4,m:5,n:5,r:6};
  let code = s[0].toUpperCase();
  let prev = map[s[0].toLowerCase()] || 0;
  for (let i = 1; i < s.length && code.length < 4; i++) {
    const v = map[s[i].toLowerCase()] || 0;
    if (v && v !== prev) code += v;
    prev = v;
  }
  return code.padEnd(4, '0');
}

function levenshtein(a, b) {
  const m = a.length, n = b.length;
  const dp = Array.from({length: m+1}, (_, i) =>
    Array.from({length: n+1}, (_, j) => i === 0 ? j : j === 0 ? i : 0)
  );
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      dp[i][j] = a[i-1] === b[j-1] ? dp[i-1][j-1] : 1 + Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]);
  return dp[m][n];
}

function onSayItTry() {} // disabled - mic only now


function speakCurrent() {
  const q = questions[qIndex];
  if(!q) return;
  if(currentMode==='letter') speakLetter(q);
  if(currentMode==='number') speak(NUMBER_DATA[q].word);
  if(currentMode==='addition') speak(`${q.a} plus ${q.b}`);
  if(currentMode==='subtraction') speak(`${q.a} take away ${q.b}`);
  if(currentMode==='sayit')  speak(q.word);
  const bd = document.getElementById('big-display');
  bd.classList.remove('speak-pulse');
  void bd.offsetWidth;
  bd.classList.add('speak-pulse');
}

// ─────────────────────────────────────────────
// PRAISE & NEXT
// ─────────────────────────────────────────────
function showPraise(emoji, text, sub) {
  const p = PRAISE_OPTIONS[Math.floor(Math.random()*PRAISE_OPTIONS.length)];
  const overlay = document.getElementById('praise');
  document.getElementById('praise-emoji').textContent = emoji || p.emoji;
  document.getElementById('praise-text').textContent = text || p.text;
  document.getElementById('praise-sub').textContent = sub || text || p.text;
  document.getElementById('stars-earned').textContent = '⭐';
  overlay.classList.add('show');
  roundStars++;

  setTimeout(()=>{
    overlay.classList.remove('show');
    if (currentMode === 'jigsaw') {
      endRound();
    } else {
      nextQuestion();
    }
  }, 2000);
}

function nextQuestion() {
  qIndex++;
  if(qIndex >= questions.length) {
    endRound();
  } else {
    renderQuestion();
  }
}

function endRound() {
  totalStars += roundStars;
  document.getElementById('total-stars').textContent = totalStars;

  const titles = ['Great job!','You did it!','Brilliant!','Amazing work!'];
  document.getElementById('re-title').textContent = titles[Math.floor(Math.random()*titles.length)];
  document.getElementById('re-stars').textContent = '⭐'.repeat(Math.min(roundStars,10));
  document.getElementById('re-sub').textContent = `You earned ${roundStars} star${roundStars!==1?'s':''}!`;
  document.getElementById('round-end').classList.add('show');
  if(cfg.sound) speak(`You did it! ${roundStars} star${roundStars!==1?'s':''}`);
}

function restartRound() {
  if (currentMode === 'jigsaw') { restartJigsawPuzzle(); return; }
  document.getElementById('round-end').classList.remove('show');
  startMode(currentMode);
}

// ─────────────────────────────────────────────
// TIMER
// ─────────────────────────────────────────────
const TIMER_SECONDS = 10;

function startTimer() {
  if(!cfg.timer) { document.getElementById('timer-bar-wrap').classList.add('hidden'); return; }
  document.getElementById('timer-bar-wrap').classList.remove('hidden');
  timerLeft = TIMER_SECONDS;
  document.getElementById('timer-bar-fill').style.width = '100%';
  clearInterval(timerInterval);
  timerInterval = setInterval(()=>{
    timerLeft -= 0.5;
    const pct = Math.max(0, (timerLeft/TIMER_SECONDS)*100);
    document.getElementById('timer-bar-fill').style.width = pct+'%';
    if(timerLeft<=0) { clearInterval(timerInterval); if(!answered){ answered=true; setTimeout(nextQuestion,400); } }
  }, 500);
}
function clearTimer() {
  clearInterval(timerInterval);
  document.getElementById('timer-bar-wrap').classList.add('hidden');
}

// ─────────────────────────────────────────────
// SPEECH
// ─────────────────────────────────────────────
function speak(text) {
  if(!cfg.sound || !cfg.voice) return;
  if(!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.rate = 0.82;
  u.pitch = 1.05;
  u.lang = 'en-US';
  // prefer a clear voice
  const voices = window.speechSynthesis.getVoices();
  const pref = voices.find(v=>v.name.includes('Samantha')||v.name.includes('Karen')||v.name.includes('Moira'))||
               voices.find(v=>v.lang==='en-US')||voices[0];
  if(pref) u.voice = pref;
  window.speechSynthesis.speak(u);
}

// ─────────────────────────────────────────────
// SOUNDS (Web Audio)
// ─────────────────────────────────────────────
function getAudioCtx() {
  if(!window._actx) window._actx = new (window.AudioContext||window.webkitAudioContext)();
  return window._actx;
}
function playSuccess() {
  if(!cfg.sound) return;
  try {
    const ctx = getAudioCtx();
    const notes = [523,659,784,1047];
    notes.forEach((freq,i)=>{
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.connect(g); g.connect(ctx.destination);
      o.type='sine'; o.frequency.value=freq;
      const t = ctx.currentTime + i*0.1;
      g.gain.setValueAtTime(0.18,t);
      g.gain.exponentialRampToValueAtTime(0.001,t+0.3);
      o.start(t); o.stop(t+0.35);
    });
  } catch(e){}
}
function playWrong() {
  if(!cfg.sound) return;
  try {
    const ctx = getAudioCtx();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.connect(g); g.connect(ctx.destination);
    o.type='sine'; o.frequency.setValueAtTime(300,ctx.currentTime);
    o.frequency.linearRampToValueAtTime(220, ctx.currentTime+0.3);
    g.gain.setValueAtTime(0.12,ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001,ctx.currentTime+0.4);
    o.start(); o.stop(ctx.currentTime+0.45);
  } catch(e){}
}

// ─────────────────────────────────────────────
// SOUND TOGGLE
// ─────────────────────────────────────────────
function toggleSound() {
  cfg.sound = !cfg.sound;
  document.getElementById('s-sound').checked = cfg.sound;
  updateSoundBtn();
  if (!cfg.sound) {
    stopMenuMusic();
  } else if (document.getElementById('home').classList.contains('active') && cfg.music) {
    playMenuMusic();
  }
}
function updateSoundBtn() {
  document.getElementById('sound-btn').textContent = cfg.sound ? '🔊' : '🔇';
}

// ─────────────────────────────────────────────
// UTILS
// ─────────────────────────────────────────────

function shuffle(arr) {
  for(let i=arr.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [arr[i],arr[j]]=[arr[j],arr[i]];
  }
  return arr;
}

function shuffleCopy(arr) {
  return shuffle([...arr]);
}

function sampleVaried(pool, count, keyFn) {
  const available = shuffleCopy(pool);
  const picked = [];
  const seen = new Set();
  for (const item of available) {
    const key = keyFn(item);
    if (seen.has(key)) continue;
    picked.push(item);
    seen.add(key);
    if (picked.length >= count) break;
  }
  return picked;
}

function rememberSignature(historyArr, signature, limit = 8) {
  historyArr.push(signature);
  while (historyArr.length > limit) historyArr.shift();
}

function pickVariedLetterDistractors(correct, activeLetters, count) {
  const candidates = shuffleCopy(activeLetters.filter(l => l !== correct));
  const picked = [];
  for (const letter of candidates) {
    picked.push(letter);
    const signature = shuffleCopy([correct, ...picked]).join('|');
    if (picked.length === count && !modeHistory.letterChoiceSignatures.includes(signature)) {
      return picked;
    }
    if (picked.length === count) break;
  }
  return candidates.slice(0, count);
}

function pickVariedNumberDistractors(correct, range, count) {
  const pool = [];
  const span = range.max - range.min;
  const offsets = shuffleCopy([-10,-7,-5,-3,-2,-1,1,2,3,5,7,10]);
  for (const offset of offsets) {
    const n = correct + offset;
    if (n >= range.min && n <= range.max && n !== correct) pool.push(n);
  }
  const randomPool = shuffleCopy(Array.from({length: range.max - range.min + 1}, (_, i) => range.min + i)
    .filter(n => n !== correct && !pool.includes(n)));
  const combined = [...pool, ...randomPool];
  const picked = [];
  for (const n of combined) {
    picked.push(n);
    const signature = shuffleCopy([correct, ...picked]).join('|');
    if (picked.length === count && !modeHistory.numberChoiceSignatures.includes(signature)) {
      return picked;
    }
    if (picked.length === count) break;
  }
  return combined.slice(0, count);
}

function pickDifferentMathSet(lastItem) {
  const shuffled = shuffleCopy(MATH_IMAGE_SETS);
  return shuffled.find(set => set.item !== lastItem) || shuffled[0];
}

function parseNumberRange(rangeValue) {
  const [minStr, maxStr] = String(rangeValue).split('-');
  const min = parseInt(minStr, 10);
  const max = parseInt(maxStr, 10);
  return { min, max };
}

function numberToWords(n) {
  if (NUMBER_WORDS[n]) return NUMBER_WORDS[n];
  if (n < 100) {
    const tens = Math.floor(n / 10) * 10;
    const ones = n % 10;
    return `${NUMBER_WORDS[tens]} ${NUMBER_WORDS[ones].toLowerCase()}`;
  }
  return String(n);
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Load voices async (Safari/iOS needs this)
window.speechSynthesis.onvoiceschanged = ()=>{ window.speechSynthesis.getVoices(); };

// Init speech recognition
initRecog();


function showListenPage(page){
  const p1 = document.getElementById('listen-page-1');
  const p2 = document.getElementById('listen-page-2');
  if (!p1 || !p2) return;
  p1.classList.toggle('hidden', page !== 1);
  p2.classList.toggle('hidden', page !== 2);
}

function speakWord(word){
  if(!window.speechSynthesis) return;
  const u = new SpeechSynthesisUtterance(word);
  u.rate = 0.85;
  speechSynthesis.speak(u);
}


let timerHoursValue = 0;
let timerMinutesValue = 0;

let timerSecondsValue = 0;

function changeTimerSeconds(delta){
  if (timerRunning) return;
  timerSecondsValue += delta;
  if (timerSecondsValue < 0) timerSecondsValue = 59;
  if (timerSecondsValue > 59) timerSecondsValue = 0;
  const s = document.getElementById('timer-seconds');
  if (s) s.textContent = String(timerSecondsValue).padStart(2, '0');
  if (timerRemainingSeconds === 0) updateTimerDisplay();
}

let timerRemainingSeconds = 0;
let timerTotalSeconds = 0;
let countdownInterval = null;
let timerRunning = false;
let timerAlarmInterval = null;
let timerCountdownMarks = new Set();

function openTimerMode(){
  ensureMenuMusicStopped();
  stopTimerAlarm();
  if (countdownInterval) {
    clearInterval(countdownInterval);
    countdownInterval = null;
    timerRunning = false;
  }
  updateTimerSelectors();
  updateTimerDisplay();
  const status = document.getElementById('timer-status');
  if (status) status.textContent = 'Choose a time and press Start';
  timerCountdownMarks = new Set();
  showScreen('timer-screen');
}

function closeTimerMode(){
  if (countdownInterval) {
    clearInterval(countdownInterval);
    countdownInterval = null;
  }
  timerRunning = false;
  stopTimerAlarm();
  goHome();
}

function updateTimerSelectors(){
  const h = document.getElementById('timer-hours');
  const m = document.getElementById('timer-minutes');
  if (h) h.textContent = String(timerHoursValue);
  if (m) m.textContent = String(timerMinutesValue).padStart(2, '0');
  const s = document.getElementById('timer-seconds');
  if (s) s.textContent = String(timerSecondsValue).padStart(2, '0');
}

function formatTimerTime(totalSeconds){
  const hrs = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;
  return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function updateTimerDisplay(){
  const display = document.getElementById('timer-display');
  const source = timerRunning || timerRemainingSeconds > 0
    ? timerRemainingSeconds
    : (timerHoursValue * 3600 + timerMinutesValue * 60 + timerSecondsValue);
  if (display) display.textContent = formatTimerTime(source);
  updateTimerRing(source);
}

function changeTimerHours(delta){
  if (timerRunning) return;
  timerHoursValue = Math.max(0, Math.min(23, timerHoursValue + delta));
  updateTimerSelectors();
  if (timerRemainingSeconds === 0) updateTimerDisplay();
}

function changeTimerMinutes(delta){
  if (timerRunning) return;
  timerMinutesValue += delta;
  if (timerMinutesValue < 0) timerMinutesValue = 59;
  if (timerMinutesValue > 59) timerMinutesValue = 0;
  updateTimerSelectors();
  if (timerRemainingSeconds === 0) updateTimerDisplay();
}


function updateTimerRing(currentSeconds){
  const ring = document.getElementById('timer-ring');
  const inner = document.getElementById('timer-ring-inner');
  if (!ring || !inner) return;

  const configuredTotal = (timerTotalSeconds && timerTotalSeconds > 0)
    ? timerTotalSeconds
    : (timerHoursValue * 3600 + timerMinutesValue * 60 + timerSecondsValue);

  let progress = 0;
  if (configuredTotal > 0) {
    progress = Math.max(0, Math.min(1, currentSeconds / configuredTotal));
  }

  const degrees = Math.round(progress * 360);
  ring.style.background = `conic-gradient(var(--primary) ${degrees}deg, #dce8f5 0deg)`;

  if (timerRunning) {
    inner.textContent = currentSeconds <= 3 && currentSeconds > 0 ? `Ending in ${currentSeconds}` : 'Running';
  } else if (currentSeconds > 0) {
    inner.textContent = 'Ready';
  } else {
    inner.textContent = 'Done';
  }
}

function speakCountdownNumber(n){
  if (!window.speechSynthesis) return;
  try { window.speechSynthesis.cancel(); } catch (e) {}
  const u = new SpeechSynthesisUtterance(String(n));
  u.rate = 0.9;
  u.pitch = 1;
  speechSynthesis.speak(u);
}

function startTimerCountdown(){
  stopTimerAlarm();
  timerCountdownMarks = new Set();
  if (timerRunning) return;

  if (timerRemainingSeconds <= 0) {
    timerTotalSeconds = (timerHoursValue * 3600) + (timerMinutesValue * 60) + timerSecondsValue;
    timerRemainingSeconds = timerTotalSeconds;
  }

  const status = document.getElementById('timer-status');
  if (timerRemainingSeconds <= 0) {
    if (status) status.textContent = 'Please set some time';
    return;
  }

  timerRunning = true;
  if (status) status.textContent = 'Timer running';
  updateTimerDisplay();

  countdownInterval = setInterval(() => {
    timerRemainingSeconds -= 1;

    if (timerRemainingSeconds > 0 && timerRemainingSeconds <= 3 && !timerCountdownMarks.has(timerRemainingSeconds)) {
      timerCountdownMarks.add(timerRemainingSeconds);
      speakCountdownNumber(timerRemainingSeconds);
    }

    updateTimerDisplay();

    if (timerRemainingSeconds <= 0) {
      clearInterval(countdownInterval);
      countdownInterval = null;
      timerRunning = false;
      timerRemainingSeconds = 0;
      updateTimerDisplay();
      if (status) status.textContent = 'Time is up!';
      triggerTimerAlarm();
    }
  }, 1000);
}

function pauseTimerCountdown(){
  if (!timerRunning) return;
  clearInterval(countdownInterval);
  countdownInterval = null;
  timerRunning = false;
  const status = document.getElementById('timer-status');
  if (status) status.textContent = 'Timer paused';
  updateTimerDisplay();
}

function resetTimerCountdown(){
  if (countdownInterval) {
    clearInterval(countdownInterval);
    countdownInterval = null;
  }
  timerRunning = false;
  stopTimerAlarm();
  timerRemainingSeconds = 0;
  timerTotalSeconds = 0;
  updateTimerSelectors();
  updateTimerDisplay();
  const status = document.getElementById('timer-status');
  if (status) status.textContent = 'Choose a time and press Start';
  timerCountdownMarks = new Set();
}

function triggerTimerAlarm(){
  const alarm = document.getElementById('timer-alarm');
  if (!alarm) return;

  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (AudioCtx) {
      const ctx = new AudioCtx();
      let count = 0;
      timerAlarmInterval = setInterval(() => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = count % 2 === 0 ? 880 : 660;
        gain.gain.value = 0.08;
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.25);
        count++;
      }, 400);
      return;
    }
  } catch (e) {}

  const speak = () => {
    if (window.speechSynthesis) {
      const u = new SpeechSynthesisUtterance('Time is up');
      u.rate = 0.95;
      speechSynthesis.speak(u);
    }
  };
  speak();
  timerAlarmInterval = setInterval(speak, 1500);
}

function stopTimerAlarm(){
  if (timerAlarmInterval) {
    clearInterval(timerAlarmInterval);
    timerAlarmInterval = null;
  }
  if (window.speechSynthesis) {
    try { speechSynthesis.cancel(); } catch (e) {}
  }
}




function shuffleArray(arr){
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const JIGSAW_DIFFICULTIES = [
  { pieces: 10, cols: 5, rows: 2 },
  { pieces: 20, cols: 5, rows: 4 },
  { pieces: 30, cols: 6, rows: 5 },
  { pieces: 40, cols: 8, rows: 5 },
  { pieces: 50, cols: 10, rows: 5 },
  { pieces: 100, cols: 10, rows: 10 }
];

const JIGSAW_THEMES = [
  { id: 'cars', name: 'Race Cars' },
  { id: 'dino', name: 'Dinosaurs' },
  { id: 'farm', name: 'Farm Animals' },
  { id: 'halloween', name: 'Halloween' },
  { id: 'food', name: 'Japanese Food' },
  { id: 'jungle', name: 'Jungle Animals' },
  { id: 'mario', name: 'Mario World' },
  { id: 'robot', name: 'Robots' },
  { id: 'space', name: 'Space Battle' },
  { id: 'ocean', name: 'Underwater' }
];

let selectedJigsawTheme = 'cars';
let selectedJigsawPieces = 10;
let currentJigsaw = null;
let currentDraggedPiece = null;
let currentJigsawMoveStarted = false;
let jigsawSfxCtx = null;

function jigsawSvgData(theme){
  const map = {
    cars: 'images/cars_theme.jpg',
    dino: 'images/dinosaur_theme.jpg',
    farm: 'images/farm_theme.jpg',
    halloween: 'images/halloween_theme.jpg',
    food: 'images/japanese_food_theme.jpg',
    jungle: 'images/jungle_theme.jpg',
    mario: 'images/mario_theme.jpg',
    robot: 'images/robot_theme.jpg',
    space: 'images/space_theme.jpg',
    ocean: 'images/underwater_theme.jpg'
  };
  return map[theme.id] || map.cars;
}

function getJigsawSfxCtx(){
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) return null;
  if (!jigsawSfxCtx) jigsawSfxCtx = new AudioCtx();
  if (jigsawSfxCtx.state === 'suspended') {
    try { jigsawSfxCtx.resume(); } catch (e) {}
  }
  return jigsawSfxCtx;
}

function playJigsawDragSound(){
  if (!cfg.sound) return;
  try {
    const ctx = getJigsawSfxCtx();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(420, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(560, ctx.currentTime + 0.08);
    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.04, ctx.currentTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.10);
    osc.connect(gain); gain.connect(ctx.destination);
    osc.start(); osc.stop(ctx.currentTime + 0.11);
  } catch(e) {}
}

function playJigsawPlaceSound(){
  if (!cfg.sound) return;
  try {
    const ctx = getJigsawSfxCtx();
    if (!ctx) return;
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();
    osc1.type = 'sine';
    osc2.type = 'sine';
    osc1.frequency.setValueAtTime(660, ctx.currentTime);
    osc2.frequency.setValueAtTime(880, ctx.currentTime + 0.02);
    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.055, ctx.currentTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.18);
    osc1.connect(gain); osc2.connect(gain); gain.connect(ctx.destination);
    osc1.start(); osc2.start(ctx.currentTime + 0.02);
    osc1.stop(ctx.currentTime + 0.16); osc2.stop(ctx.currentTime + 0.18);
  } catch(e) {}
}

function playJigsawSuccessSound(){
  if (!cfg.sound) return;
  try {
    const ctx = getJigsawSfxCtx();
    if (!ctx) return;
    [523.25, 659.25, 783.99].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.08);
      gain.gain.setValueAtTime(0.0001, ctx.currentTime + i * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.06, ctx.currentTime + i * 0.08 + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + i * 0.08 + 0.18);
      osc.connect(gain); gain.connect(ctx.destination);
      osc.start(ctx.currentTime + i * 0.08);
      osc.stop(ctx.currentTime + i * 0.08 + 0.18);
    });
  } catch(e) {}
}

function buildJigsawTabMap(rows, cols){
  const map = [];
  for (let r = 0; r < rows; r++) {
    map[r] = [];
    for (let c = 0; c < cols; c++) {
      const top = r === 0 ? 0 : -map[r - 1][c].bottom;
      const left = c === 0 ? 0 : -map[r][c - 1].right;
      const right = c === cols - 1 ? 0 : (((r + c) % 2 === 0) ? 1 : -1);
      const bottom = r === rows - 1 ? 0 : (((r * 3 + c) % 2 === 0) ? -1 : 1);
      map[r][c] = { top, right, bottom, left };
    }
  }
  return map;
}

function jigsawPiecePath(w, h, t, tabs){
  const m = t;
  const x0 = m, y0 = m, x1 = m + w, y1 = m + h;
  const midX = x0 + w / 2;
  const midY = y0 + h / 2;
  const neck = t * 0.42;
  const knob = t * 0.95;

  function topEdge(){
    if (!tabs.top) return `L ${x1} ${y0}`;
    const dir = tabs.top;
    return [
      `L ${midX - knob} ${y0}`,
      `C ${midX - knob * 0.55} ${y0}, ${midX - neck} ${y0 - dir * knob}, ${midX} ${y0 - dir * knob}`,
      `C ${midX + neck} ${y0 - dir * knob}, ${midX + knob * 0.55} ${y0}, ${midX + knob} ${y0}`,
      `L ${x1} ${y0}`
    ].join(' ');
  }
  function rightEdge(){
    if (!tabs.right) return `L ${x1} ${y1}`;
    const dir = tabs.right;
    return [
      `L ${x1} ${midY - knob}`,
      `C ${x1} ${midY - knob * 0.55}, ${x1 + dir * knob} ${midY - neck}, ${x1 + dir * knob} ${midY}`,
      `C ${x1 + dir * knob} ${midY + neck}, ${x1} ${midY + knob * 0.55}, ${x1} ${midY + knob}`,
      `L ${x1} ${y1}`
    ].join(' ');
  }
  function bottomEdge(){
    if (!tabs.bottom) return `L ${x0} ${y1}`;
    const dir = tabs.bottom;
    return [
      `L ${midX + knob} ${y1}`,
      `C ${midX + knob * 0.55} ${y1}, ${midX + neck} ${y1 + dir * knob}, ${midX} ${y1 + dir * knob}`,
      `C ${midX - neck} ${y1 + dir * knob}, ${midX - knob * 0.55} ${y1}, ${midX - knob} ${y1}`,
      `L ${x0} ${y1}`
    ].join(' ');
  }
  function leftEdge(){
    if (!tabs.left) return `L ${x0} ${y0}`;
    const dir = tabs.left;
    return [
      `L ${x0} ${midY + knob}`,
      `C ${x0} ${midY + knob * 0.55}, ${x0 - dir * knob} ${midY + neck}, ${x0 - dir * knob} ${midY}`,
      `C ${x0 - dir * knob} ${midY - neck}, ${x0} ${midY - knob * 0.55}, ${x0} ${midY - knob}`,
      `L ${x0} ${y0}`
    ].join(' ');
  }
  return `M ${x0} ${y0} ${topEdge()} ${rightEdge()} ${bottomEdge()} ${leftEdge()} Z`;
}

function renderJigsawPieceSvg(image, boardSize, row, col, pieceW, pieceH, tabSize, tabs, pieceId){
  const pad = tabSize;
  const boxW = pieceW + pad * 2;
  const boxH = pieceH + pad * 2;
  const path = jigsawPiecePath(pieceW, pieceH, tabSize, tabs);
  const imgX = pad - col * pieceW;
  const imgY = pad - row * pieceH;
  return `
  <svg xmlns="http://www.w3.org/2000/svg" width="${boxW}" height="${boxH}" viewBox="0 0 ${boxW} ${boxH}">
    <defs>
      <clipPath id="clip-${pieceId}">
        <path d="${path}"></path>
      </clipPath>
      <filter id="shadow-${pieceId}" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="rgba(0,0,0,0.22)"/>
      </filter>
    </defs>
    <image href="${image}" x="${imgX}" y="${imgY}" width="${boardSize}" height="${boardSize}" clip-path="url(#clip-${pieceId})" preserveAspectRatio="none" filter="url(#shadow-${pieceId})"/>
    <path d="${path}" fill="none" stroke="rgba(70,55,32,0.55)" stroke-width="2.2" stroke-linejoin="round"/>
  </svg>`;
}

function resetJigsawState(){
  currentDraggedPiece = null;
  currentJigsaw = null;
  const board = document.getElementById('jigsaw-board');
  const area = document.getElementById('jigsaw-pieces-area');
  const end = document.getElementById('round-end');
  const praise = document.getElementById('praise');
  if (board) board.innerHTML = '<div id="jigsaw-board-preview" class="jigsaw-board-preview"></div>';
  if (area) area.innerHTML = '';
  if (end) end.classList.remove('show');
  if (praise) praise.classList.remove('show');
}

function openJigsawMode(){
  ensureMenuMusicStopped();
  stopTimerAlarm();
  resetJigsawState();
  renderJigsawSelectors();
  showScreen('jigsaw-select');
}

function renderJigsawSelectors(){
  const diffRow = document.getElementById('jigsaw-difficulty-row');
  const grid = document.getElementById('jigsaw-theme-grid');
  if (!diffRow || !grid) return;

  diffRow.innerHTML = '';
  JIGSAW_DIFFICULTIES.forEach(d => {
    const btn = document.createElement('button');
    btn.className = 'jigsaw-chip' + (selectedJigsawPieces === d.pieces ? ' selected' : '');
    btn.textContent = `${d.pieces} pieces`;
    btn.onclick = () => {
      selectedJigsawPieces = d.pieces;
      renderJigsawSelectors();
      addTouchActivation(document.getElementById('jigsaw-select'));
    };
    diffRow.appendChild(btn);
  });

  grid.innerHTML = '';
  JIGSAW_THEMES.forEach(theme => {
    const card = document.createElement('div');
    card.className = 'jigsaw-theme-card' + (selectedJigsawTheme === theme.id ? ' selected' : '');
    card.onclick = () => {
      selectedJigsawTheme = theme.id;
      renderJigsawSelectors();
      addTouchActivation(document.getElementById('jigsaw-select'));
    };

    const thumb = document.createElement('div');
    thumb.className = 'jigsaw-thumb';
    thumb.style.backgroundImage = `url("${jigsawSvgData(theme)}")`;

    const name = document.createElement('div');
    name.className = 'jigsaw-theme-name';
    name.textContent = theme.name;

    card.appendChild(thumb);
    card.appendChild(name);
    grid.appendChild(card);
  });
}

function startSelectedJigsaw(){
  const theme = JIGSAW_THEMES.find(t => t.id === selectedJigsawTheme) || JIGSAW_THEMES[0];
  const diff = JIGSAW_DIFFICULTIES.find(d => d.pieces === selectedJigsawPieces) || JIGSAW_DIFFICULTIES[0];
  const img = new Image();
  img.onload = () => {
    showScreen('jigsaw-play');
    requestAnimationFrame(() => buildJigsawGame(theme, diff));
  };
  img.onerror = () => {
    alert('Puzzle image could not load. Keep the images folder beside index.html.');
  };
  img.src = jigsawSvgData(theme);
}

function restartJigsawPuzzle(){
  if (!currentJigsaw || !currentJigsaw.themeId || !currentJigsaw.pieces) {
    resetJigsawState();
    showScreen('jigsaw-select');
    return;
  }
  const theme = JIGSAW_THEMES.find(t => t.id === currentJigsaw.themeId) || JIGSAW_THEMES[0];
  const diff = JIGSAW_DIFFICULTIES.find(d => d.pieces === currentJigsaw.pieces) || JIGSAW_DIFFICULTIES[0];
  resetJigsawState();
  showScreen('jigsaw-play');
  requestAnimationFrame(() => buildJigsawGame(theme, diff));
}

function buildJigsawGame(theme, diff){
  currentMode = 'jigsaw';
  const board = document.getElementById('jigsaw-board');
  const area = document.getElementById('jigsaw-pieces-area');
  const themeBadge = document.getElementById('jigsaw-theme-badge');
  const diffBadge = document.getElementById('jigsaw-difficulty-badge');
  const progressBadge = document.getElementById('jigsaw-progress-badge');
  if (!board || !area || !themeBadge || !diffBadge || !progressBadge) return;

  board.innerHTML = '<div id="jigsaw-board-preview" class="jigsaw-board-preview"></div>';
  area.innerHTML = '';
  const previewEl = document.getElementById('jigsaw-board-preview');
  const image = jigsawSvgData(theme);
  previewEl.style.backgroundImage = `url("${image}")`;

  const boardSize = Math.round(board.getBoundingClientRect().width || 420);
  const pieceW = boardSize / diff.cols;
  const pieceH = boardSize / diff.rows;
  const tabSize = Math.max(10, Math.min(pieceW, pieceH) * 0.22);
  const tabMap = buildJigsawTabMap(diff.rows, diff.cols);

  currentJigsaw = {
    themeId: theme.id,
    pieces: diff.pieces,
    cols: diff.cols,
    rows: diff.rows,
    pieceW,
    pieceH,
    tabSize,
    tabMap,
    placed: 0,
    pieceEls: []
  };

  themeBadge.textContent = theme.name;
  diffBadge.textContent = `${diff.pieces} pieces`;

  for (let row = 0; row < diff.rows; row++) {
    for (let col = 0; col < diff.cols; col++) {
      const slot = document.createElement('div');
      slot.className = 'jigsaw-slot';
      slot.style.left = `${col * pieceW}px`;
      slot.style.top = `${row * pieceH}px`;
      slot.style.width = `${pieceW}px`;
      slot.style.height = `${pieceH}px`;
      slot.dataset.row = String(row);
      slot.dataset.col = String(col);
      board.appendChild(slot);
    }
  }

  const pieceBoxW = pieceW + tabSize * 2;
  const pieceBoxH = pieceH + tabSize * 2;
  const denseTray = diff.pieces >= 40;
  const maxTrayW = denseTray ? Math.min(window.innerWidth * 0.97, 1180) : Math.min(window.innerWidth * 0.94, 860);
  const padding = denseTray ? 10 : 18;
  const gap = denseTray ? 6 : 12;
  const colsInTray = denseTray
    ? Math.max(6, Math.min(Math.max(3, Math.floor((maxTrayW - padding * 2 + gap) / (pieceBoxW + gap))), Math.ceil(Math.sqrt(diff.pieces * 1.9))))
    : Math.max(2, Math.min(5, Math.floor((maxTrayW - padding * 2) / (pieceBoxW + gap))));
  const rowsInTray = Math.ceil(diff.pieces / colsInTray);
  const usedTrayW = Math.min(maxTrayW, padding * 2 + colsInTray * pieceBoxW + (colsInTray - 1) * gap);
  area.style.width = `${usedTrayW}px`;
  area.style.minHeight = `${Math.max(denseTray ? 220 : 280, padding * 2 + rowsInTray * pieceBoxH + (rowsInTray - 1) * gap)}px`;

  const trayPositions = [];
  for (let i = 0; i < diff.pieces; i++) {
    const tr = Math.floor(i / colsInTray);
    const tc = i % colsInTray;
    trayPositions.push({
      x: padding + tc * (pieceBoxW + gap),
      y: padding + tr * (pieceBoxH + gap)
    });
  }
  shuffleArray(trayPositions);

  let idx = 0;
  for (let row = 0; row < diff.rows; row++) {
    for (let col = 0; col < diff.cols; col++) {
      const pos = trayPositions[idx];
      const x = pos.x;
      const y = pos.y;
      const piece = document.createElement('div');
      const pieceId = `piece-${row}-${col}`;
      const tabs = tabMap[row][col];
      piece.className = 'jigsaw-piece';
      piece.style.width = `${pieceBoxW}px`;
      piece.style.height = `${pieceBoxH}px`;
      piece.style.left = `${x}px`;
      piece.style.top = `${y}px`;
      piece.dataset.row = String(row);
      piece.dataset.col = String(col);
      piece.dataset.homeX = String(x);
      piece.dataset.homeY = String(y);
      piece.dataset.placed = '0';
      piece.innerHTML = renderJigsawPieceSvg(image, boardSize, row, col, pieceW, pieceH, tabSize, tabs, pieceId);
      enableJigsawPieceDrag(piece);
      area.appendChild(piece);
      currentJigsaw.pieceEls.push(piece);
      idx++;
    }
  }

  updateJigsawProgress();
}

function enableJigsawPieceDrag(piece){
  piece.addEventListener('pointerdown', (e) => {
    if (!currentJigsaw || piece.dataset.placed === '1') return;
    e.preventDefault();
    getJigsawSfxCtx();
    playJigsawDragSound();
    currentDraggedPiece = piece;
    currentJigsawMoveStarted = false;
    piece.classList.add('dragging');
    pulsePress(piece);

    const rect = piece.getBoundingClientRect();
    piece.dataset.offsetX = String(e.clientX - rect.left);
    piece.dataset.offsetY = String(e.clientY - rect.top);

    if (piece.parentElement.id === 'jigsaw-board') {
      const area = document.getElementById('jigsaw-pieces-area');
      const areaRect = area.getBoundingClientRect();
      const boardRect = document.getElementById('jigsaw-board').getBoundingClientRect();
      const curLeft = parseFloat(piece.style.left || '0');
      const curTop = parseFloat(piece.style.top || '0');
      piece.style.left = `${boardRect.left - areaRect.left + curLeft}px`;
      piece.style.top = `${boardRect.top - areaRect.top + curTop}px`;
      area.appendChild(piece);
    }

    try { piece.setPointerCapture(e.pointerId); } catch (err) {}

    const startClientX = e.clientX;
    const startClientY = e.clientY;

    const onMove = (ev) => {
      if (currentDraggedPiece !== piece) return;
      if (!currentJigsawMoveStarted && Math.hypot(ev.clientX - startClientX, ev.clientY - startClientY) < 4) {
        return;
      }
      currentJigsawMoveStarted = true;
      const area = document.getElementById('jigsaw-pieces-area');
      const areaRect = area.getBoundingClientRect();
      const left = ev.clientX - areaRect.left - parseFloat(piece.dataset.offsetX || '0');
      const top = ev.clientY - areaRect.top - parseFloat(piece.dataset.offsetY || '0');
      piece.style.left = `${left}px`;
      piece.style.top = `${top}px`;
    };

    const onUp = (ev) => {
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerup', onUp);
      piece.classList.remove('dragging');
      try { piece.releasePointerCapture(ev.pointerId); } catch (err) {}
      currentDraggedPiece = null;
      tryPlaceJigsawPiece(piece, ev.clientX, ev.clientY);
    };

    document.addEventListener('pointermove', onMove);
    document.addEventListener('pointerup', onUp);
  });
}

function tryPlaceJigsawPiece(piece, clientX, clientY){
  if (!currentJigsaw) return;
  const board = document.getElementById('jigsaw-board');
  const area = document.getElementById('jigsaw-pieces-area');
  const boardRect = board.getBoundingClientRect();
  const row = parseInt(piece.dataset.row, 10);
  const col = parseInt(piece.dataset.col, 10);

  const targetCenterX = boardRect.left + col * currentJigsaw.pieceW + currentJigsaw.pieceW / 2;
  const targetCenterY = boardRect.top + row * currentJigsaw.pieceH + currentJigsaw.pieceH / 2;
  const dx = clientX - targetCenterX;
  const dy = clientY - targetCenterY;
  const threshold = Math.min(currentJigsaw.pieceW, currentJigsaw.pieceH) * 0.62;

  if (Math.hypot(dx, dy) <= threshold) {
    const areaRect = area.getBoundingClientRect();
    const boardLeftInArea = boardRect.left - areaRect.left;
    const boardTopInArea = boardRect.top - areaRect.top;
    piece.style.left = `${boardLeftInArea + col * currentJigsaw.pieceW - currentJigsaw.tabSize}px`;
    piece.style.top = `${boardTopInArea + row * currentJigsaw.pieceH - currentJigsaw.tabSize}px`;
    piece.dataset.placed = '1';
    piece.classList.add('placed');
    playJigsawPlaceSound();

    if (!piece.dataset.counted) {
      piece.dataset.counted = '1';
      currentJigsaw.placed += 1;
    }
    updateJigsawProgress();

    const slot = Array.from(board.querySelectorAll('.jigsaw-slot')).find(s => parseInt(s.dataset.row, 10) === row && parseInt(s.dataset.col, 10) === col);
    if (slot) slot.style.borderColor = 'rgba(92,184,92,0.35)';

    if (currentJigsaw.placed >= currentJigsaw.pieces) {
      playJigsawSuccessSound();
      speakWord('Good job');
      showPraise('🧩', 'Puzzle complete!', `${currentJigsaw.pieces} pieces finished`);
    }
  } else {
    returnPieceHome(piece);
  }
}

function returnPieceHome(piece){
  piece.style.left = `${piece.dataset.homeX}px`;
  piece.style.top = `${piece.dataset.homeY}px`;
  piece.dataset.placed = '0';
  piece.classList.remove('placed');
}

function updateJigsawProgress(){
  if (!currentJigsaw) return;
  const badge = document.getElementById('jigsaw-progress-badge');
  if (badge) badge.textContent = `${currentJigsaw.placed} / ${currentJigsaw.pieces}`;
}

function shuffleCurrentJigsaw(){
  if (!currentJigsaw) return;
  const theme = JIGSAW_THEMES.find(t => t.id === currentJigsaw.themeId) || JIGSAW_THEMES[0];
  const diff = JIGSAW_DIFFICULTIES.find(d => d.pieces === currentJigsaw.pieces) || JIGSAW_DIFFICULTIES[0];
  resetJigsawState();
  showScreen('jigsaw-play');
  requestAnimationFrame(() => buildJigsawGame(theme, diff));
}

function restartCurrentJigsaw(){
  restartJigsawPuzzle();
}



function addTouchActivation(root=document){
  if (!root) return;
  const selector = 'button, .mode-card, .jigsaw-theme-card, .chip, .set-chip, .jigsaw-chip, .settings-btn, .back-btn, .sound-btn';
  root.querySelectorAll(selector).forEach(el => {
    if (el.dataset.touchActivated === '1') return;
    el.dataset.touchActivated = '1';

    let startX = 0, startY = 0, moved = false;
    el.addEventListener('touchstart', (e) => {
      const t = e.changedTouches && e.changedTouches[0];
      if (!t) return;
      startX = t.clientX;
      startY = t.clientY;
      moved = false;
    }, { passive: true });

    el.addEventListener('touchmove', (e) => {
      const t = e.changedTouches && e.changedTouches[0];
      if (!t) return;
      if (Math.hypot(t.clientX - startX, t.clientY - startY) > 14) moved = true;
    }, { passive: true });

    el.addEventListener('touchend', (e) => {
      if (moved) return;
      if (el.disabled) return;
      if (el.tagName !== 'BUTTON') {
        e.preventDefault();
        el.click();
      }
    }, { passive: false });
  });
}

function pulsePress(el){
  if (!el) return;
  el.style.transform = 'scale(0.98)';
  setTimeout(() => { el.style.transform = ''; }, 90);
}

window.addEventListener('load', () => {
  addTouchActivation(document);
  try {
    const audio = getMenuMusic && getMenuMusic();
    const homeScreen = document.getElementById('home');
    const onHome = homeScreen && homeScreen.classList.contains('active');
    if (audio && cfg && cfg.sound && cfg.music && onHome) {
      audio.volume = 0.45;
      const p = audio.play();
      if (p && p.catch) p.catch(() => {});
      menuMusicStarted = true;
    }
  } catch(e){}
});

document.addEventListener('pointerdown', () => {
  const homeScreen = document.getElementById('home');
  const onHome = homeScreen && homeScreen.classList.contains('active');
  if (onHome && cfg.sound && cfg.music) {
    playMenuMusic();
  } else {
    stopMenuMusic();
  }
}, { passive: true });