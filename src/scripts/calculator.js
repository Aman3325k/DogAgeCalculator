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

const POPULAR_BREEDS = [
  { name: 'Chihuahua', size: 'small' },
  { name: 'Pomeranian', size: 'small' },
  { name: 'Pug', size: 'small' },
  { name: 'Beagle', size: 'medium' },
  { name: 'Bulldog', size: 'medium' },
  { name: 'Border Collie', size: 'medium' },
  { name: 'Labrador', size: 'large' },
  { name: 'Golden Retriever', size: 'large' },
  { name: 'German Shepherd', size: 'large' },
  { name: 'Husky', size: 'large' },
  { name: 'Great Dane', size: 'giant' },
  { name: 'Saint Bernard', size: 'giant' },
];

const PERSONALIZED_MESSAGES = {
  Puppy: 'is just a tiny baby! Enjoy these precious early months.',
  Teenager: 'is in their rebellious teenage phase. Lots of energy and curiosity!',
  'Young Adult': 'is in the prime of life. Active, healthy, and full of spirit!',
  Adult: 'is a mature and wise companion. The best years of companionship.',
  Senior: 'is entering their golden years. Time for extra love and gentle care.',
  Elder: 'is a distinguished elder. Cherish every moment with this wise soul.',
};

function calculateHumanAge(dogYears, months, breedSize) {
  const totalYears = dogYears + months / 12;
  if (totalYears <= 0) return null;
  const breed = BREED_DATA[breedSize];
  const ln = Math.log(totalYears);
  const baseAge = 16 * ln + 31;
  const adjusted = baseAge * breed.multiplier;
  return Math.round(adjusted * 10) / 10;
}

function getLifeStage(totalYears, breedSize) {
  const breed = BREED_DATA[breedSize];
  for (const stage of breed.stageThresholds) {
    if (totalYears <= stage.max) return stage.label;
  }
  return 'Elder';
}

function getLifeExpectancy(breedSize) {
  const breed = BREED_DATA[breedSize];
  return breed.lifespan;
}

function getFunFact(breedSize) {
  return BREED_DATA[breedSize].funFact;
}

function getPersonalizedMessage(dogName, stage) {
  const msg = PERSONALIZED_MESSAGES[stage] || 'is a wonderful companion!';
  const name = dogName && dogName.trim() ? dogName.trim() : 'Your dog';
  return `${name} ${msg}`;
}

function getStageProgress(totalYears, breedSize) {
  const breed = BREED_DATA[breedSize];
  const maxAge = breed.lifespan[1];
  return Math.min(100, (totalYears / maxAge) * 100);
}

function calculateComparisonData(totalYears, humanAge, breedSize) {
  const breed = BREED_DATA[breedSize];
  return {
    dogYears: totalYears,
    humanAge,
    dogStage: getLifeStage(totalYears, breedSize),
    humanStage: humanAge < 2 ? 'Infant' : humanAge < 13 ? 'Child' : humanAge < 20 ? 'Teenager' : humanAge < 35 ? 'Young Adult' : humanAge < 50 ? 'Adult' : humanAge < 65 ? 'Middle-Aged' : 'Senior',
    dogPct: getStageProgress(totalYears, breedSize),
    humanPct: Math.min(100, (humanAge / 85) * 100),
  };
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
