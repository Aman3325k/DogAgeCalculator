const BREED_DATA = {
  small: { label: 'Small (under 20 lbs)', kgLabel: 'Small (under 9 kg)', examples: ['Chihuahua', 'Pomeranian', 'Shih Tzu', 'Yorkshire Terrier', 'Pug', 'Maltese'], lifespan: [12, 16], multiplier: 0.85, funFact: 'Small dogs age more slowly than larger breeds. A Chihuahua at 15 can still be energetic — equivalent to a healthy 70-year-old human!', stageThresholds: [{ max: 0.5, label: 'Puppy' }, { max: 2, label: 'Teenager' }, { max: 4, label: 'Young Adult' }, { max: 8, label: 'Adult' }, { max: 12, label: 'Senior' }, { max: 99, label: 'Elder' }] },
  medium: { label: 'Medium (20-50 lbs)', kgLabel: 'Medium (9-23 kg)', examples: ['Beagle', 'Bulldog', 'Border Collie', 'Cocker Spaniel', 'Australian Shepherd'], lifespan: [10, 14], multiplier: 1.0, funFact: 'Medium breeds reach adulthood at about 2 years old. Their aging rate closely mirrors the standard 16 × ln(dog age) + 31 formula.', stageThresholds: [{ max: 0.5, label: 'Puppy' }, { max: 2, label: 'Teenager' }, { max: 4, label: 'Young Adult' }, { max: 7, label: 'Adult' }, { max: 11, label: 'Senior' }, { max: 99, label: 'Elder' }] },
  large: { label: 'Large (50-90 lbs)', kgLabel: 'Large (23-41 kg)', examples: ['Labrador Retriever', 'Golden Retriever', 'Husky', 'German Shepherd', 'Boxer'], lifespan: [8, 12], multiplier: 1.15, funFact: 'Large breeds like Labs enter their senior years around age 7 — about 5 years earlier than small breeds.', stageThresholds: [{ max: 0.5, label: 'Puppy' }, { max: 1.5, label: 'Teenager' }, { max: 3, label: 'Young Adult' }, { max: 6, label: 'Adult' }, { max: 9, label: 'Senior' }, { max: 99, label: 'Elder' }] },
  giant: { label: 'Giant (90+ lbs)', kgLabel: 'Giant (41+ kg)', examples: ['Great Dane', 'Saint Bernard', 'Mastiff', 'Irish Wolfhound', 'Tibetan Mastiff'], lifespan: [7, 10], multiplier: 1.3, funFact: 'Giant breeds age fastest. A 6-year-old Great Dane is already a senior, while a small dog of the same age is still in its prime!', stageThresholds: [{ max: 0.5, label: 'Puppy' }, { max: 1.5, label: 'Teenager' }, { max: 3, label: 'Young Adult' }, { max: 5, label: 'Adult' }, { max: 8, label: 'Senior' }, { max: 99, label: 'Elder' }] },
};

const STAGE_EMOJIS = { Puppy: '🐶', Teenager: '🐕', 'Young Adult': '💪', Adult: '🦴', Senior: '🐾', Elder: '❤️' };

const HEALTH_MILESTONES = {
  small: [
    { weeks: 7, label: 'Puppy Vaccines (DHPP) 6-8 weeks', desc: 'First round of core vaccines', icon: '💉' },
    { weeks: 11, label: 'Puppy Vaccines (DHPP) 10-12 weeks', desc: 'Second round of core vaccines', icon: '💉' },
    { weeks: 15, label: 'Puppy Vaccines (DHPP) 14-16 weeks', desc: 'Third round + rabies vaccine', icon: '💉' },
    { weeks: 26, label: 'Spay/Neuter Recommended', desc: 'Best time for the procedure (6 months)', icon: '🏥' },
    { weeks: 260, label: 'First Dental Cleaning', desc: 'Annual dental check begins (5 years)', icon: '🦷' },
    { weeks: 572, label: 'Senior Bloodwork Begins', desc: 'Annual senior health screening (11 years)', icon: '🩸' },
    { weeks: 624, label: 'Annual Checkup Every 6 Months', desc: 'Bi-annual vet visits recommended (12 years)', icon: '📅' },
  ],
  medium: [
    { weeks: 7, label: 'Puppy Vaccines (DHPP) 6-8 weeks', desc: 'First round of core vaccines', icon: '💉' },
    { weeks: 11, label: 'Puppy Vaccines (DHPP) 10-12 weeks', desc: 'Second round of core vaccines', icon: '💉' },
    { weeks: 15, label: 'Puppy Vaccines (DHPP) 14-16 weeks', desc: 'Third round + rabies vaccine', icon: '💉' },
    { weeks: 26, label: 'Spay/Neuter Recommended', desc: 'Best time for the procedure (6 months)', icon: '🏥' },
    { weeks: 208, label: 'First Dental Cleaning', desc: 'Annual dental check begins (4 years)', icon: '🦷' },
    { weeks: 520, label: 'Senior Bloodwork Begins', desc: 'Annual senior health screening (10 years)', icon: '🩸' },
    { weeks: 572, label: 'Annual Checkup Every 6 Months', desc: 'Bi-annual vet visits recommended (11 years)', icon: '📅' },
  ],
  large: [
    { weeks: 7, label: 'Puppy Vaccines (DHPP) 6-8 weeks', desc: 'First round of core vaccines', icon: '💉' },
    { weeks: 11, label: 'Puppy Vaccines (DHPP) 10-12 weeks', desc: 'Second round of core vaccines', icon: '💉' },
    { weeks: 15, label: 'Puppy Vaccines (DHPP) 14-16 weeks', desc: 'Third round + rabies vaccine', icon: '💉' },
    { weeks: 26, label: 'Spay/Neuter Recommended', desc: 'Best time for the procedure (6 months)', icon: '🏥' },
    { weeks: 52, label: 'Joint Supplement Recommended', desc: 'Start joint care for large breeds (1 year)', icon: '🦴' },
    { weeks: 156, label: 'First Dental Cleaning', desc: 'Annual dental check begins (3 years)', icon: '🦷' },
    { weeks: 364, label: 'Senior Bloodwork Begins', desc: 'Annual senior health screening (7 years)', icon: '🩸' },
    { weeks: 416, label: 'Annual Checkup Every 6 Months', desc: 'Bi-annual vet visits recommended (8 years)', icon: '📅' },
  ],
  giant: [
    { weeks: 7, label: 'Puppy Vaccines (DHPP) 6-8 weeks', desc: 'First round of core vaccines', icon: '💉' },
    { weeks: 11, label: 'Puppy Vaccines (DHPP) 10-12 weeks', desc: 'Second round of core vaccines', icon: '💉' },
    { weeks: 15, label: 'Puppy Vaccines (DHPP) 14-16 weeks', desc: 'Third round + rabies vaccine', icon: '💉' },
    { weeks: 26, label: 'Spay/Neuter Recommended', desc: 'Best time for the procedure (6 months)', icon: '🏥' },
    { weeks: 52, label: 'Joint Supplement Recommended', desc: 'Start joint care for giant breeds (1 year)', icon: '🦴' },
    { weeks: 104, label: 'First Dental Cleaning', desc: 'Annual dental check begins (2 years)', icon: '🦷' },
    { weeks: 312, label: 'Senior Bloodwork Begins', desc: 'Annual senior health screening (6 years)', icon: '🩸' },
    { weeks: 364, label: 'Annual Checkup Every 6 Months', desc: 'Bi-annual vet visits recommended (7 years)', icon: '📅' },
  ],
};

const PERSONALIZED_MESSAGES = {
  Puppy: 'is just a tiny baby! Enjoy these precious early months.',
  Teenager: 'is in their rebellious teenage phase. Lots of energy and curiosity!',
  'Young Adult': 'is in the prime of life. Active, healthy, and full of spirit!',
  Adult: 'is a mature and wise companion. The best years of companionship.',
  Senior: 'is entering their golden years. Time for extra love and gentle care.',
  Elder: 'is a distinguished elder. Cherish every moment with this wise soul.',
};

const DOG_FACTS = [
  'Small dogs age about 15% slower than large dogs in human-year terms.',
  'A 1-year-old dog is equivalent to a 31-year-old human by DNA methylation.',
  'Giant breed dogs age fastest — a 6-year-old Great Dane is already a senior.',
  'Chihuahuas can live up to 18 years, while Great Danes average only 7-10 years.',
  'Dogs age faster in their first 2 years than in any other life period.',
  'A 2-year-old dog is roughly 42 in human years — more than half their adult life!',
  'Large breeds enter seniorhood around age 7, small breeds not until 11-12.',
  'The 7x rule was invented in the 1950s as a marketing slogan, not science.',
  'DNA methylation is the same biological clock used to study human aging.',
  'Regular vet checkups can add 2-3 years to your dog\'s lifespan.',
  'Small breed dogs under 20 lbs live 4-6 years longer than giant breeds on average.',
  'A Great Dane at age 5 is already a senior, while a Chihuahua at 5 is still a young adult.',
  'Dogs have 28 baby teeth and 42 adult teeth — more than humans!',
  'The oldest dog ever recorded lived to 29.5 years — a Blue Heeler named Bluey.',
  'Puppies age the fastest: a 3-month-old puppy is already about 10 in human years.',
];

function getLifeStage(totalYears, breedSize) {
  const breed = BREED_DATA[breedSize];
  if (!breed) return 'Elder';
  for (const s of breed.stageThresholds) { if (totalYears <= s.max) return s.label; }
  return 'Elder';
}

function calcHumanAge(totalYears, breedSize) {
  const b = BREED_DATA[breedSize];
  return Math.round((16 * Math.log(Math.max(totalYears, 0.083)) + 31) * (b ? b.multiplier : 1) * 10) / 10;
}

function getShareText(n, ha, sz, dy, mo) {
  const name = (n && n.trim()) || 'My dog';
  const b = BREED_DATA[sz];
  const s = b ? b.label.split(' ')[0] : 'mixed';
  return `${name} is ${ha} human years old (${dy}y ${mo}m ${s} breed)! Calculate yours at dogbreedage.com`;
}

function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = 'toast pointer-events-auto bg-[var(--bg-secondary)] border border-[var(--border-default)] rounded-lg px-4 py-2.5 text-sm text-[var(--text-primary)] shadow-lg';
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => { toast.style.opacity = '0'; toast.style.transition = 'opacity 0.3s'; setTimeout(() => toast.remove(), 300); }, 3000);
}

function triggerConfetti() {
  if (localStorage.getItem('confetti_shown')) return;
  localStorage.setItem('confetti_shown', '1');
  const colors = ['#ff0080', '#7928ca', '#0070f3', '#50e3c2', '#f5a623', '#fff'];
  for (let i = 0; i < 80; i++) {
    const el = document.createElement('div');
    const c = colors[Math.floor(Math.random() * colors.length)];
    const dur = 2 + Math.random() * 2;
    el.style.cssText = `position:fixed;top:-10px;left:${Math.random()*100}%;width:${6+Math.random()*6}px;height:${(6+Math.random()*6)*0.6}px;background:${c};border-radius:2px;z-index:9999;pointer-events:none;transform:rotate(${Math.random()*360}deg);animation:cf-fall ${dur}s ease-in ${Math.random()*1.5}s forwards;`;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), (dur + 2) * 1000);
  }
}

function setText(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
}

function setStyle(id, prop, val) {
  const el = document.getElementById(id);
  if (el) el.style[prop] = val;
}

function setClass(id, cls, add) {
  const el = document.getElementById(id);
  if (el) el.classList.toggle(cls, add);
}

function renderResults(totalYears, breedSize, name, years, months) {
  const b = BREED_DATA[breedSize];
  if (!b) return;
  const humanAge = calcHumanAge(totalYears, breedSize);
  const stage = getLifeStage(totalYears, breedSize);
  const msg = PERSONALIZED_MESSAGES[stage] || 'is a wonderful companion!';
  const dogName = (name && name.trim()) || 'Your dog';
  const progress = Math.min(100, (totalYears / b.lifespan[1]) * 100);
  const hStage = humanAge < 2 ? 'Infant' : humanAge < 13 ? 'Child' : humanAge < 20 ? 'Teenager' : humanAge < 35 ? 'Young Adult' : humanAge < 50 ? 'Adult' : humanAge < 65 ? 'Middle-Aged' : 'Senior';

  const haEl = document.getElementById('human-age');
  if (haEl) {
    haEl.textContent = '0';
    const target = humanAge;
    const duration = 1000;
    const start = performance.now();
    function countUp(now) {
      const elapsed = now - start;
      const progress2 = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress2, 3);
      haEl.textContent = Math.round(eased * target);
      if (progress2 < 1) requestAnimationFrame(countUp);
    }
    requestAnimationFrame(countUp);
  }
  const stageEl = document.getElementById('life-stage');
  if (stageEl) {
    stageEl.textContent = STAGE_EMOJIS[stage] ? `${STAGE_EMOJIS[stage]} ${stage}` : stage;
    const stageSlug = stage.replace(/\s+/g, '-');
    stageEl.className = 'stage-pill';
    stageEl.classList.add('stage-' + stageSlug);
  }
  const emojiEl = document.getElementById('stage-emoji');
  if (emojiEl) emojiEl.textContent = '';
  setText('life-expectancy', `Life expectancy: ${b.lifespan[0]}-${b.lifespan[1]} years`);
  setText('personalized-message', `${dogName} ${msg}`);
  setText('fun-fact', b.funFact);
  setStyle('progress-fill', 'width', `${progress}%`);
  setText('comp-dog-age', `${totalYears.toFixed(1)} years`);
  setText('comp-dog-stage', stage);
  setText('comp-human-age', `${humanAge} years`);
  setText('comp-human-stage', hStage);
  setStyle('comp-dog-bar', 'width', `${progress}%`);
  setStyle('comp-human-bar', 'width', `${Math.min(100, (humanAge / 85) * 100)}%`);

  const result = document.getElementById('result');
  if (result) {
    result.classList.remove('hidden');
    setTimeout(() => result.classList.add('visible'), 10);
    const form = document.getElementById('calc-form');
    if (form) form.classList.add('no-print');
  }

  const resultPhoto = document.getElementById('result-photo');
  const photoPreview = document.getElementById('dog-photo-preview');
  if (resultPhoto && photoPreview && photoPreview.src && photoPreview.src !== '') {
    resultPhoto.src = photoPreview.src;
    resultPhoto.alt = dogName ? `Photo of ${dogName}` : 'Dog photo';
    resultPhoto.classList.remove('hidden');
  } else if (resultPhoto) {
    resultPhoto.classList.add('hidden');
  }

  // Fun Stats grid
  const formatNumber = (num) =>
    num >= 1e9 ? (num / 1e9).toFixed(1) + 'B' :
    num >= 1e6 ? (num / 1e6).toFixed(1) + 'M' :
    num.toLocaleString();
  const days = totalYears * 365.25;
  const grid = document.getElementById('fun-stats-grid');
  if (grid) {
    const statDays = Math.floor(days);
    const statHours = Math.floor(days * 24);
    const statMinutes = Math.floor(days * 24 * 60);
    const statSeconds = Math.floor(days * 24 * 60 * 60);
    document.getElementById('stat-days').textContent = formatNumber(statDays);
    document.getElementById('stat-hours').textContent = formatNumber(statHours);
    document.getElementById('stat-minutes').textContent = formatNumber(statMinutes);
    document.getElementById('stat-seconds').textContent = formatNumber(statSeconds);
    // Store for copy-text button
    grid.dataset.days = statDays;
    setTimeout(() => grid.classList.remove('opacity-0'), 150);
  }

  triggerConfetti();
  renderAgeChart(totalYears, breedSize);
  renderHealthTimeline(totalYears, breedSize, dogName);

  currentShareData = { name: name || 'My dog', humanAge, breedSize, dogYears: years, months, totalDays: Math.floor(days) };
  document.dispatchEvent(new CustomEvent('resultCalculated'));
}

function renderAgeChart(currentDogAge, breedSize) {
  const section = document.getElementById('age-chart-section');
  const tbody = document.getElementById('chart-body');
  if (!section || !tbody) return;
  const b = BREED_DATA[breedSize];
  if (!b) return;
  setText('chart-title', `Complete Age Chart for ${b.label.split(' ')[0]} Dogs`);
  setText('chart-subtitle', `Dog years to human years for ${b.label.split(' ')[0].toLowerCase()} breeds`);
  tbody.innerHTML = '';
  for (let age = 1; age <= 20; age++) {
    const ha = calcHumanAge(age, breedSize);
    const st = getLifeStage(age, breedSize);
    const isCurrent = Math.abs(age - currentDogAge) < 0.01;
    const row = document.createElement('tr');
    row.className = `border-b border-[var(--border-default)] ${isCurrent ? 'bg-[var(--hover-overlay)]' : ''}`;
    row.innerHTML = `
      <td class="py-2.5 pr-4 text-sm ${isCurrent ? 'text-[var(--text-primary)] font-medium' : 'text-[var(--text-secondary)]'}">${age}</td>
      <td class="py-2.5 pr-4 text-sm ${isCurrent ? 'text-[var(--text-primary)] font-medium' : 'text-[var(--text-secondary)]'}">${ha}</td>
      <td class="py-2.5 text-sm ${isCurrent ? 'text-[var(--text-primary)] font-medium' : 'text-[var(--text-secondary)]'}"><span class="px-2 py-0.5 rounded-full text-xs ${isCurrent ? 'bg-[var(--hover-overlay-strong)] text-[var(--text-primary)]' : 'bg-[var(--bg-secondary)] text-[var(--text-muted)]'}">${st}</span></td>`;
    tbody.appendChild(row);
  }
  section.classList.remove('hidden');
}

function renderHealthTimeline(totalYears, breedSize, dogName) {
  const section = document.getElementById('health-timeline-section');
  const container = document.getElementById('timeline-container');
  if (!section || !container) return;
  const milestones = HEALTH_MILESTONES[breedSize] || [];
  const totalWeeks = totalYears * 52;
  setText('timeline-title', `Health Milestones for ${dogName}`);
  setText('timeline-subtitle', `Based on ${breedSize} breed size`);
  container.innerHTML = '';
  milestones.forEach((m) => {
    const passed = totalWeeks >= m.weeks;
    const dotClass = passed ? 'passed' : '';
    const weeksLeft = Math.max(0, m.weeks - totalWeeks);
    const timeStr = weeksLeft === 0 ? 'Done ✓' : weeksLeft < 4 ? `${Math.round(weeksLeft / 0.43)} days away` : weeksLeft < 52 ? `${Math.round(weeksLeft / 4.3)} months away` : `${(weeksLeft / 52).toFixed(1)} years away`;
    const div = document.createElement('div');
    div.className = 'timeline-item';
    div.innerHTML = `
      <div class="timeline-dot ${dotClass}"></div>
      <p class="text-sm font-medium text-[var(--text-primary)] break-words">${m.icon} ${m.label}</p>
      <p class="text-xs text-[var(--text-muted)] mt-0.5 break-words">${m.desc}</p>
      <p class="text-xs text-[var(--text-faint)] mt-0.5 break-words">${passed ? 'Completed' : timeStr}</p>`;
    container.appendChild(div);
  });
  section.classList.remove('hidden');
}

let currentShareData = null;
let factTimer = null;
function startFactRotation() {
  const el = document.getElementById('did-you-know-text');
  if (!el) return;
  let index = Math.floor(Math.random() * DOG_FACTS.length);
  el.textContent = DOG_FACTS[index];
  el.style.opacity = '1';
  if (factTimer) clearInterval(factTimer);
  factTimer = setInterval(() => {
    index = (index + 1) % DOG_FACTS.length;
    el.style.opacity = '0';
    setTimeout(() => { el.textContent = DOG_FACTS[index]; el.style.opacity = '1'; }, 400);
  }, 8000);
}

// CSS custom property names used across the design system
const CSS_VARS_TO_RESOLVE = [
  '--bg-primary', '--bg-secondary', '--bg-elevated',
  '--text-primary', '--text-secondary', '--text-muted', '--text-faint',
  '--border-default', '--border-strong',
  '--color-link', '--hover-overlay', '--hover-overlay-strong',
  '--btn-primary-bg', '--btn-primary-text',
  '--card-shadow', '--card-shadow-hover',
  '--stage-puppy', '--stage-teenager', '--stage-young-adult',
  '--stage-adult', '--stage-senior', '--stage-elder',
];

function resolveCssVarsToInline(el) {
  const root = document.documentElement;
  const computed = getComputedStyle(root);
  // Build a map of var name -> resolved value
  const resolved = {};
  CSS_VARS_TO_RESOLVE.forEach(v => {
    resolved[v] = computed.getPropertyValue(v).trim();
  });
  // Walk every element and replace var() references in style with resolved values
  const snapshot = [];
  el.querySelectorAll('*').forEach(node => {
    const cs = getComputedStyle(node);
    const props = {
      backgroundColor: cs.backgroundColor,
      color: cs.color,
      borderColor: cs.borderColor,
      borderTopColor: cs.borderTopColor,
      borderBottomColor: cs.borderBottomColor,
      borderLeftColor: cs.borderLeftColor,
      borderRightColor: cs.borderRightColor,
      boxShadow: cs.boxShadow,
    };
    const prev = {};
    Object.keys(props).forEach(p => { prev[p] = node.style[p]; node.style[p] = props[p]; });
    snapshot.push({ node, prev });
  });
  // Also handle the root element itself
  const rootCs = getComputedStyle(el);
  const rootPrev = {
    backgroundColor: el.style.backgroundColor,
    color: el.style.color,
  };
  el.style.backgroundColor = rootCs.backgroundColor;
  el.style.color = rootCs.color;
  snapshot.push({ node: el, prev: rootPrev });
  return snapshot;
}

function restoreCssVars(snapshot) {
  snapshot.forEach(({ node, prev }) => {
    Object.keys(prev).forEach(p => { node.style[p] = prev[p]; });
  });
}

async function loadHtml2Canvas() {
  if (typeof window.__h2c === 'function') return window.__h2c;
  return new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
    s.onload = () => { window.__h2c = window.html2canvas; resolve(window.__h2c); };
    s.onerror = () => reject(new Error('Failed to load html2canvas'));
    document.head.appendChild(s);
  });
}

async function saveAsImage(elementId, cloneWidth, filenamePrefix) {
  const el = document.getElementById(elementId);
  if (!el) return;
  const isLight = document.documentElement.classList.contains('light');
  const bgColor = isLight ? '#ffffff' : '#000000';
  let snapshot = null;
  try {
    const h2c = await loadHtml2Canvas();
    // Resolve CSS custom properties to computed values before capture
    snapshot = resolveCssVarsToInline(el);
    const canvas = await h2c(el, {
      backgroundColor: bgColor,
      scale: 2,
      useCORS: true,
      allowTaint: true,
      logging: false,
      onclone: (clonedDoc) => {
        const clonedEl = clonedDoc.getElementById(elementId);
        if (clonedEl) {
          clonedEl.querySelectorAll('.no-print, button, a[href]').forEach(n => {
            n.style.setProperty('display', 'none', 'important');
          });
          if (cloneWidth) {
            clonedEl.style.setProperty('width', `${cloneWidth}px`, 'important');
            clonedEl.style.setProperty('min-width', `${cloneWidth}px`, 'important');
          }
          clonedEl.style.transform = 'none';
          clonedEl.style.margin = '0';
          clonedEl.style.borderRadius = '0';
        }
      }
    });
    const name = (currentShareData && currentShareData.name) || 'dog';
    const slug = (filenamePrefix || name).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    const link = document.createElement('a');
    link.download = `${slug}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    showToast('✅ Image saved!');
  } catch (e) {
    console.error('saveAsImage failed:', e);
    showToast('❌ Could not save image. Try Print instead.');
  } finally {
    if (snapshot) restoreCssVars(snapshot);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const cfsheet = document.createElement('style');
  cfsheet.textContent = `@keyframes cf-fall{0%{transform:translateY(0) rotate(0deg);opacity:1}100%{transform:translateY(100vh) rotate(720deg);opacity:0}}`;
  document.head.appendChild(cfsheet);

  const form = document.getElementById('calc-form');
  const breedPills = document.querySelectorAll('.breed-pill');
  const sizeOptions = document.querySelectorAll('.size-option');
  const popularBreedsSection = document.getElementById('popular-breeds');
  const nameInput = document.getElementById('dog-name');
  const yearsInput = document.getElementById('dog-years');
  const monthsSelect = document.getElementById('dog-months');
  const birthdayInput = document.getElementById('dog-birthday');
  const inputMode = document.getElementById('input-mode');
  const ageInputs = document.getElementById('age-inputs');
  const birthdayInputs = document.getElementById('birthday-inputs');
  const unitToggle = document.getElementById('unit-toggle');
  const calcBtn = document.getElementById('calc-btn');
  const calcBtnText = document.getElementById('calc-btn-text');
  const calcSpinner = document.getElementById('calc-spinner');
  const nameCounter = document.getElementById('name-counter');

  let selectedSize = null;
  let useKg = localStorage.getItem('dogbreedage_unit') === 'kg';

  function resetCalcBtn() {
    if (calcBtn && calcSpinner && calcBtnText) {
      calcBtn.disabled = false;
      calcBtnText.textContent = '🐾 Calculate Human Age';
      calcSpinner.classList.add('hidden');
    }
  }

  if (nameInput && nameCounter) {
    nameInput.addEventListener('input', () => {
      const len = nameInput.value.length;
      nameCounter.textContent = `${len}/20`;
      if (len >= 20) nameInput.value = nameInput.value.slice(0, 20);
    });
  }

  if (yearsInput) {
    yearsInput.addEventListener('input', () => {
      const v = parseInt(yearsInput.value, 10);
      if (!isNaN(v) && v < 0) yearsInput.value = 0;
      if (!isNaN(v) && v > 40) yearsInput.value = 40;
    });
  }

  const cookieBanner = document.getElementById('cookie-banner');
  if (cookieBanner && !localStorage.getItem('dogbreedage_cookie')) {
    cookieBanner.classList.remove('hidden');
    document.getElementById('cookie-accept')?.addEventListener('click', () => {
      localStorage.setItem('dogbreedage_cookie', 'accepted');
      cookieBanner.classList.add('hidden');
    });
  }

  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('show', window.scrollY > 300);
    }, { passive: true });
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  startFactRotation();

  function updateUnitLabels() {
    document.querySelectorAll('.size-option').forEach(el => {
      const radio = el.querySelector('input[type="radio"]');
      if (!radio) return;
      const size = radio.value;
      const b = BREED_DATA[size];
      const desc = el.querySelector('[data-desc]');
      if (desc && b) desc.textContent = useKg ? b.kgLabel.split('(')[1].replace(')', '') : b.label.split('(')[1].replace(')', '');
    });
  }
  updateUnitLabels();

  if (unitToggle) {
    if (useKg) unitToggle.textContent = 'kg';
    unitToggle.addEventListener('click', () => {
      useKg = !useKg;
      unitToggle.textContent = useKg ? 'kg' : 'lbs';
      localStorage.setItem('dogbreedage_unit', useKg ? 'kg' : 'lbs');
      updateUnitLabels();
    });
  }

  function addRipple(e) {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.className = 'btn-ripple';
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = e.clientX - rect.left - size / 2 + 'px';
    ripple.style.top = e.clientY - rect.top - size / 2 + 'px';
    btn.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
  }
  document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
    btn.addEventListener('click', addRipple);
  });

  function updateSizeSelection(size) {
    sizeOptions.forEach(o => {
      const r = o.querySelector('input[type="radio"]');
      o.classList.toggle('selected', r && r.value === size);
      o.classList.toggle('ring-1', r && r.value === size);
      o.classList.toggle('ring-white', r && r.value === size);
    });
  }

  sizeOptions.forEach(opt => {
    opt.addEventListener('click', (e) => {
      const radio = opt.querySelector('input[type="radio"]');
      if (!radio) return;
      radio.checked = true;
      selectedSize = radio.value;
      updateSizeSelection(selectedSize);
      if (popularBreedsSection) popularBreedsSection.classList.remove('hidden');
      sizeOptions.forEach(o => o.classList.remove('tooltip-visible'));
      opt.classList.add('tooltip-visible');
    });
  });
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.size-option')) {
      sizeOptions.forEach(o => o.classList.remove('tooltip-visible'));
    }
  });

  breedPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const size = pill.dataset.size;
      if (!size) return;
      selectedSize = size;
      updateSizeSelection(size);
      breedPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      if (popularBreedsSection) popularBreedsSection.classList.remove('hidden');
      if (yearsInput) yearsInput.focus();
    });
  });

  if (inputMode) {
    inputMode.addEventListener('change', () => {
      const mode = inputMode.value;
      if (mode === 'birthday') {
        if (ageInputs) ageInputs.classList.add('hidden');
        if (birthdayInputs) birthdayInputs.classList.remove('hidden');
        if (birthdayInput) birthdayInput.max = new Date().toISOString().split('T')[0];
        const d = new Date(); d.setFullYear(d.getFullYear() - 30);
        if (birthdayInput) birthdayInput.min = d.toISOString().split('T')[0];
      } else {
        if (ageInputs) ageInputs.classList.remove('hidden');
        if (birthdayInputs) birthdayInputs.classList.add('hidden');
      }
    });
  }

  function computeAgeFromBirthday() {
    if (!birthdayInput || !birthdayInput.value) return null;
    const bd = new Date(birthdayInput.value);
    const now = new Date();
    let years = now.getFullYear() - bd.getFullYear();
    let months = now.getMonth() - bd.getMonth();
    if (months < 0) { years--; months += 12; }
    if (now.getDate() < bd.getDate()) { months--; if (months < 0) { years--; months += 12; } }
    return { years, months, total: years + months / 12 };
  }

  if (birthdayInput) {
    birthdayInput.addEventListener('change', () => {
      try {
        if (!selectedSize) { showToast('Please select a breed size first'); return; }
        const age = computeAgeFromBirthday();
        if (age && age.total > 0) {
          const name = nameInput ? nameInput.value.trim() : '';
          renderResults(age.total, selectedSize, name, age.years, age.months);
          showToast('Result calculated!');
        }
      } catch (e) { /* ignore */ }
    });
  }

  document.getElementById('calc-again-btn')?.addEventListener('click', () => {
    const root = document.getElementById('calculator-root');
    if (root) root.scrollIntoView({ behavior: 'smooth', block: 'start' });
    const resultEl = document.getElementById('result');
    if (resultEl) resultEl.classList.add('hidden');
    const form = document.getElementById('calc-form');
    if (form) form.classList.remove('no-print');
    // Clear photo preview state
    const photoPreview = document.getElementById('dog-photo-preview');
    if (photoPreview) { photoPreview.src = ''; photoPreview.classList.add('hidden'); }
    const photoInput = document.getElementById('dog-photo');
    if (photoInput) photoInput.value = '';
  });

  form.addEventListener('submit', (e) => {
    try {
    e.preventDefault();
    if (calcBtn) calcBtn.classList.add('pulsed');
    const mode = inputMode ? inputMode.value : 'age';
    const name = nameInput ? nameInput.value.trim() : '';
    let years, months, totalYears;

    if (calcBtn && calcSpinner && calcBtnText) {
      calcBtn.disabled = true;
      calcBtnText.textContent = 'Calculating...';
      calcSpinner.classList.remove('hidden');
    }

    if (mode === 'birthday') {
      if (!selectedSize) { showToast('Please select a breed size first'); resetCalcBtn(); return; }
      const age = computeAgeFromBirthday();
      if (!age) { showToast('Please select your dog\'s date of birth'); resetCalcBtn(); return; }
      years = age.years; months = age.months; totalYears = age.total;
      if (totalYears <= 0) { showToast('Birth date must be in the past'); resetCalcBtn(); return; }
      if (totalYears > 40) { showToast('Please enter a realistic date of birth'); resetCalcBtn(); return; }
    } else {
      years = parseInt(yearsInput?.value);
      months = parseInt(monthsSelect?.value);
      if (!selectedSize) { showToast('Please select a breed size'); resetCalcBtn(); return; }
      if (isNaN(years) || years < 0 || yearsInput?.value === '') { showToast('Please enter a valid age in years'); resetCalcBtn(); return; }
      if (years === 0 && months === 0) { showToast('Age must be greater than 0'); resetCalcBtn(); return; }
      if (years > 40) { showToast('Please enter a realistic age (max 40 years)'); resetCalcBtn(); return; }
      totalYears = years + months / 12;
    }

    setTimeout(() => {
      renderResults(totalYears, selectedSize, name, years, months);
      showToast('Result calculated!');
      resetCalcBtn();
      const resultEl = document.getElementById('result');
      if (resultEl) resultEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 200);
    } catch (e) { resetCalcBtn(); }
  });

  document.getElementById('share-whatsapp')?.addEventListener('click', () => {
    try {
    const d = currentShareData; if (!d) return;
    window.open(`https://wa.me/?text=${encodeURIComponent(getShareText(d.name, d.humanAge, d.breedSize, d.dogYears, d.months))}`, '_blank');
    } catch (e) { /* ignore */ }
  });
  document.getElementById('share-twitter')?.addEventListener('click', () => {
    try {
    const d = currentShareData; if (!d) return;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(getShareText(d.name, d.humanAge, d.breedSize, d.dogYears, d.months))}`, '_blank');
    } catch (e) { /* ignore */ }
  });
  document.getElementById('share-copy')?.addEventListener('click', async () => {
    try {
    const d = currentShareData; if (!d) return;
    try {
      await navigator.clipboard.writeText(getShareText(d.name, d.humanAge, d.breedSize, d.dogYears, d.months) + ' https://dogbreedage.com');
      showToast('Link copied!');
    } catch {
      const ta = document.createElement('textarea');
      ta.value = getShareText(d.name, d.humanAge, d.breedSize, d.dogYears, d.months) + ' https://dogbreedage.com';
      ta.style.position = 'fixed'; ta.style.left = '-9999px';
      document.body.appendChild(ta); ta.select();
      document.execCommand('copy');
      ta.remove();
      showToast('Link copied!');
    }
    } catch (e) { /* ignore */ }
  });

  if (navigator.share) {
    const shareContainer = document.getElementById('share-whatsapp')?.parentNode;
    if (shareContainer) {
      const shareBtn = document.createElement('button');
      shareBtn.type = 'button';
      shareBtn.className = 'btn-secondary text-sm btn-mobile-full justify-center';
      shareBtn.innerHTML = '📤 Share';
      shareBtn.setAttribute('aria-label', 'Share result');
      shareBtn.addEventListener('click', () => {
        const d = currentShareData; if (!d) return;
        navigator.share({ title: 'Dog Age Calculator', text: getShareText(d.name, d.humanAge, d.breedSize, d.dogYears, d.months), url: 'https://dogbreedage.com' }).catch(() => {});
      });
      shareContainer.insertBefore(shareBtn, shareContainer.firstChild);
    }
  }

  const photoInput = document.getElementById('dog-photo');
  if (photoInput) {
    photoInput.addEventListener('change', (e) => {
      try {
      const file = e.target.files[0];
      if (!file) return;
      if (file.size > 5 * 1024 * 1024) { showToast('Photo must be under 5MB'); photoInput.value = ''; return; }
      const reader = new FileReader();
      reader.onload = (ev) => {
        const preview = document.getElementById('dog-photo-preview');
        if (preview) {
          preview.src = ev.target.result;
          preview.classList.remove('hidden');
          preview.alt = nameInput?.value?.trim() ? `Photo of ${nameInput.value.trim()}` : 'Dog photo';
        }
        showToast('Photo uploaded!');
      };
      reader.readAsDataURL(file);
      } catch (e) { /* ignore */ }
    });
  }

  document.getElementById('save-chart-btn')?.addEventListener('click', async () => {
    try {
    await saveAsImage('age-chart-section', 800, 'dog-age-chart');
    } catch (e) { /* ignore */ }
  });

  document.getElementById('save-result-btn')?.addEventListener('click', async () => {
    try {
    const name = (currentShareData && currentShareData.name) || 'dog';
    await saveAsImage('result', 600, `${name}-age-result`);
    } catch (e) { /* ignore */ }
  });

  document.getElementById('print-result-btn')?.addEventListener('click', () => {
    window.print();
  });

  document.getElementById('copy-text-btn')?.addEventListener('click', async () => {
    try {
      const d = currentShareData;
      if (!d) { showToast('Calculate first!'); return; }
      const days = d.totalDays || 0;
      const daysStr = days >= 1e6 ? (days / 1e6).toFixed(1) + 'M' : days.toLocaleString();
      const text = `${d.name} is ${d.humanAge} in human years! 🐾 ${daysStr} days old — DogBreedAge.com`;
      try {
        await navigator.clipboard.writeText(text);
      } catch {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.cssText = 'position:fixed;left:-9999px;top:-9999px;';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        ta.remove();
      }
      showToast('📋 Copied! Share it anywhere.');
    } catch (e) { /* ignore */ }
  });


  const banner = document.getElementById('pwa-banner');
  let pwaPromptReady = false;
  if (banner) {
    const dismissed = localStorage.getItem('dogbreedage_pwa_dismissed');
    if (!dismissed) {
      document.addEventListener('resultCalculated', () => {
        if (!pwaPromptReady) {
          pwaPromptReady = true;
          setTimeout(() => {
            banner.classList.remove('hidden');
            const cb = document.getElementById('cookie-banner');
            if (cb && !cb.classList.contains('hidden')) cb.classList.add('hidden');
          }, 2000);
        }
      });
    }
    document.getElementById('pwa-dismiss')?.addEventListener('click', () => {
      banner.classList.add('hidden');
      localStorage.setItem('dogbreedage_pwa_dismissed', 'true');
    });
    let deferredPrompt;
    window.addEventListener('beforeinstallprompt', (e) => {
      deferredPrompt = e;
      document.getElementById('pwa-install')?.addEventListener('click', () => {
        banner.classList.add('hidden');
        deferredPrompt.prompt();
      });
    });
    window.addEventListener('appinstalled', () => {
      banner.classList.add('hidden');
      localStorage.setItem('dogbreedage_pwa_dismissed', 'true');
    });
  }

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  }
});
