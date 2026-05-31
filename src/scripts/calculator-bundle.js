const BREED_DATA = {
  small: {
    label: 'Small (under 20 lbs)',
    examples: ['Chihuahua', 'Pomeranian', 'Shih Tzu', 'Yorkshire Terrier', 'Pug', 'Maltese'],
    lifespan: [12, 16],
    multiplier: 0.85,
    funFact: 'Small dogs age more slowly than larger breeds. A Chihuahua at 15 can still be energetic — equivalent to a healthy 70-year-old human!',
    stageThresholds: [
      { max: 0.5, label: 'Puppy' },
      { max: 2, label: 'Teenager' },
      { max: 4, label: 'Young Adult' },
      { max: 8, label: 'Adult' },
      { max: 12, label: 'Senior' },
      { max: 99, label: 'Elder' },
    ],
  },
  medium: {
    label: 'Medium (20-50 lbs)',
    examples: ['Beagle', 'Bulldog', 'Border Collie', 'Cocker Spaniel', 'Australian Shepherd'],
    lifespan: [10, 14],
    multiplier: 1.0,
    funFact: 'Medium breeds reach adulthood at about 2 years old. Their aging rate closely mirrors the standard 16 × ln(dog age) + 31 formula.',
    stageThresholds: [
      { max: 0.5, label: 'Puppy' },
      { max: 2, label: 'Teenager' },
      { max: 4, label: 'Young Adult' },
      { max: 7, label: 'Adult' },
      { max: 11, label: 'Senior' },
      { max: 99, label: 'Elder' },
    ],
  },
  large: {
    label: 'Large (50-90 lbs)',
    examples: ['Labrador Retriever', 'Golden Retriever', 'Husky', 'German Shepherd', 'Boxer'],
    lifespan: [8, 12],
    multiplier: 1.15,
    funFact: 'Large breeds like Labs enter their senior years around age 7 — about 5 years earlier than small breeds.',
    stageThresholds: [
      { max: 0.5, label: 'Puppy' },
      { max: 1.5, label: 'Teenager' },
      { max: 3, label: 'Young Adult' },
      { max: 6, label: 'Adult' },
      { max: 9, label: 'Senior' },
      { max: 99, label: 'Elder' },
    ],
  },
  giant: {
    label: 'Giant (90+ lbs)',
    examples: ['Great Dane', 'Saint Bernard', 'Mastiff', 'Irish Wolfhound', 'Tibetan Mastiff'],
    lifespan: [7, 10],
    multiplier: 1.3,
    funFact: 'Giant breeds age fastest. A 6-year-old Great Dane is already a senior, while a small dog of the same age is still in its prime!',
    stageThresholds: [
      { max: 0.5, label: 'Puppy' },
      { max: 1.5, label: 'Teenager' },
      { max: 3, label: 'Young Adult' },
      { max: 5, label: 'Adult' },
      { max: 8, label: 'Senior' },
      { max: 99, label: 'Elder' },
    ],
  },
};

const PERSONALIZED_MESSAGES = {
  Puppy: 'is just a tiny baby! Enjoy these precious early months.',
  Teenager: 'is in their rebellious teenage phase. Lots of energy and curiosity!',
  'Young Adult': 'is in the prime of life. Active, healthy, and full of spirit!',
  Adult: 'is a mature and wise companion. The best years of companionship.',
  Senior: 'is entering their golden years. Time for extra love and gentle care.',
  Elder: 'is a distinguished elder. Cherish every moment with this wise soul.',
};

function getLifeStage(totalYears, breedSize) {
  const breed = BREED_DATA[breedSize];
  for (const stage of breed.stageThresholds) {
    if (totalYears <= stage.max) return stage.label;
  }
  return 'Elder';
}

function getShareText(dogName, humanAge, breedSize, dogYears, months) {
  const name = dogName && dogName.trim() ? dogName.trim() : 'My dog';
  const size = BREED_DATA[breedSize].label.split(' ')[0];
  return `${name} is ${humanAge} human years old (${dogYears}y ${months}m ${size} breed)! Calculate yours at dogbreedage.com`;
}

function triggerConfetti() {
  const colors = ['#ff0080', '#7928ca', '#0070f3', '#50e3c2', '#f5a623', '#ffffff'];
  const count = 80;
  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    const color = colors[Math.floor(Math.random() * colors.length)];
    const left = Math.random() * 100;
    const size = 6 + Math.random() * 6;
    const duration = 2 + Math.random() * 2;
    const delay = Math.random() * 1.5;
    const rotation = Math.random() * 360;
    el.style.cssText = `
      position: fixed; top: -10px; left: ${left}%; width: ${size}px; height: ${size * 0.6}px;
      background: ${color}; border-radius: 2px; z-index: 9999; pointer-events: none;
      transform: rotate(${rotation}deg);
      animation: confetti-fall ${duration}s ease-in ${delay}s forwards;
    `;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), (duration + delay) * 1000 + 100);
  }
}

const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes confetti-fall {
    0% { transform: translateY(0) rotate(0deg); opacity: 1; }
    100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
  }
`;
document.head.appendChild(styleSheet);

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('calc-form');
  const result = document.getElementById('result');
  const humanAgeEl = document.getElementById('human-age');
  const lifeStageEl = document.getElementById('life-stage');
  const lifeExpectancyEl = document.getElementById('life-expectancy');
  const messageEl = document.getElementById('personalized-message');
  const progressFill = document.getElementById('progress-fill');
  const funFactEl = document.getElementById('fun-fact');
  const compDogAge = document.getElementById('comp-dog-age');
  const compDogStage = document.getElementById('comp-dog-stage');
  const compDogBar = document.getElementById('comp-dog-bar');
  const compHumanAge = document.getElementById('comp-human-age');
  const compHumanStage = document.getElementById('comp-human-stage');
  const compHumanBar = document.getElementById('comp-human-bar');
  const breedPills = document.querySelectorAll('.breed-pill');
  const sizeOptions = document.querySelectorAll('.size-option');
  const popularBreedsSection = document.getElementById('popular-breeds');
  const nameInput = document.getElementById('dog-name');
  const yearsInput = document.getElementById('dog-years');
  const monthsSelect = document.getElementById('dog-months');

  let selectedSize = null;

  sizeOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      const radio = opt.querySelector('input[type="radio"]');
      radio.checked = true;
      selectedSize = radio.value;
      sizeOptions.forEach(o => {
        o.classList.remove('ring-1', 'ring-white');
      });
      opt.classList.add('ring-1', 'ring-white');
      popularBreedsSection.classList.remove('hidden');
    });
  });

  breedPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const size = pill.dataset.size;
      selectedSize = size;
      sizeOptions.forEach(o => {
        const radio = o.querySelector('input[type="radio"]');
        if (radio.value === size) {
          radio.checked = true;
          o.classList.add('ring-1', 'ring-white');
        } else {
          o.classList.remove('ring-1', 'ring-white');
        }
      });
      breedPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      popularBreedsSection.classList.remove('hidden');
      yearsInput.focus();
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = nameInput.value.trim();
    const years = parseInt(yearsInput.value);
    const months = parseInt(monthsSelect.value);

    let errors = [];
    if (!selectedSize) errors.push('Please select a breed size');
    if (isNaN(years) || years < 0 || yearsInput.value === '') errors.push('Please enter a valid age in years');
    if (years === 0 && months === 0) errors.push('Age must be greater than 0');
    if (years > 40) errors.push('Please enter a realistic age (max 40 years)');

    if (errors.length > 0) {
      alert(errors.join('\n'));
      return;
    }

    const totalYears = years + months / 12;
    const breedData = BREED_DATA[selectedSize];
    const ln = Math.log(totalYears);
    const baseAge = 16 * ln + 31;
    const humanAge = Math.round(baseAge * breedData.multiplier * 10) / 10;

    const stage = getLifeStage(totalYears, selectedSize);
    const lifespan = breedData.lifespan;
    const funFact = breedData.funFact;
    const msg = PERSONALIZED_MESSAGES[stage] || 'is a wonderful companion!';
    const dogName = name || 'Your dog';
    const message = `${dogName} ${msg}`;
    const progress = Math.min(100, (totalYears / lifespan[1]) * 100);

    const humanStage = humanAge < 2 ? 'Infant' : humanAge < 13 ? 'Child' : humanAge < 20 ? 'Teenager' : humanAge < 35 ? 'Young Adult' : humanAge < 50 ? 'Adult' : humanAge < 65 ? 'Middle-Aged' : 'Senior';
    const dogPct = progress;
    const humanPct = Math.min(100, (humanAge / 85) * 100);

    humanAgeEl.textContent = humanAge;
    lifeStageEl.textContent = stage;
    lifeExpectancyEl.textContent = `Life expectancy: ${lifespan[0]}-${lifespan[1]} years`;
    messageEl.textContent = message;
    funFactEl.textContent = funFact;

    progressFill.style.width = `${progress}%`;

    compDogAge.textContent = `${totalYears.toFixed(1)} years`;
    compDogStage.textContent = stage;
    compHumanAge.textContent = `${humanAge} years`;
    compHumanStage.textContent = humanStage;
    compDogBar.style.width = `${dogPct}%`;
    compHumanBar.style.width = `${humanPct}%`;

    result.classList.remove('hidden');
    setTimeout(() => result.classList.add('visible'), 10);

    triggerConfetti();

    window.shareData = {
      name: name || 'My dog',
      humanAge,
      breedSize: selectedSize,
      dogYears: years,
      months,
    };
  });

  document.getElementById('share-whatsapp')?.addEventListener('click', () => {
    const d = window.shareData;
    if (!d) return;
    const text = getShareText(d.name, d.humanAge, d.breedSize, d.dogYears, d.months);
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  });

  document.getElementById('share-twitter')?.addEventListener('click', () => {
    const d = window.shareData;
    if (!d) return;
    const text = getShareText(d.name, d.humanAge, d.breedSize, d.dogYears, d.months);
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
  });

  document.getElementById('share-copy')?.addEventListener('click', async () => {
    const d = window.shareData;
    if (!d) return;
    const text = getShareText(d.name, d.humanAge, d.breedSize, d.dogYears, d.months) + ' https://dogbreedage.com';
    try {
      await navigator.clipboard.writeText(text);
      const btn = document.getElementById('share-copy');
      btn.textContent = 'Copied!';
      setTimeout(() => {
        btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg> Copy Link`;
      }, 2000);
    } catch {
      // fallback
    }
  });
});
