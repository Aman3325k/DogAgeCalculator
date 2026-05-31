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
    if (!years || isNaN(years) || years < 0) errors.push('Please enter a valid age in years');
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
    const lifespan = getLifeExpectancy(selectedSize);
    const funFact = getFunFact(selectedSize);
    const message = getPersonalizedMessage(name, stage);
    const progress = getStageProgress(totalYears, selectedSize);
    const comparison = calculateComparisonData(totalYears, humanAge, selectedSize);

    humanAgeEl.textContent = humanAge;
    lifeStageEl.textContent = stage;
    lifeExpectancyEl.textContent = `Life expectancy: ${lifespan[0]}-${lifespan[1]} years`;
    messageEl.textContent = message;
    funFactEl.textContent = funFact;

    progressFill.style.width = `${progress}%`;

    compDogAge.textContent = `${totalYears.toFixed(1)} years`;
    compDogStage.textContent = comparison.dogStage;
    compHumanAge.textContent = `${humanAge} years`;
    compHumanStage.textContent = comparison.humanStage;
    compDogBar.style.width = `${comparison.dogPct}%`;
    compHumanBar.style.width = `${comparison.humanPct}%`;

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
