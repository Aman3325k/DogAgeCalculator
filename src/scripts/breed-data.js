export const BREED_SIZES = {
  small: { label: 'Small', multiplier: 0.85, lifespan: [12, 16], thresholds: [0.5, 2, 4, 8, 12, 99] },
  medium: { label: 'Medium', multiplier: 1.0, lifespan: [10, 14], thresholds: [0.5, 2, 4, 7, 11, 99] },
  large: { label: 'Large', multiplier: 1.15, lifespan: [8, 12], thresholds: [0.5, 1.5, 3, 6, 9, 99] },
  giant: { label: 'Giant', multiplier: 1.3, lifespan: [7, 10], thresholds: [0.5, 1.5, 3, 5, 8, 99] },
};

export function calcDogAge(years, months, multiplier) {
  const totalYears = years + (months / 12);
  if (totalYears === 0) return 0;
  return Math.round((16 * Math.log(Math.max(totalYears, 0.083)) + 31) * multiplier * 10) / 10;
}

export function getLifeStage(dogAge, size) {
  const stages = ['Puppy', 'Teenager', 'Young Adult', 'Adult', 'Senior', 'Elder'];
  const b = BREED_SIZES[size];
  if (!b) return 'Elder';
  for (let i = 0; i < b.thresholds.length; i++) {
    if (dogAge <= b.thresholds[i]) return stages[i];
  }
  return 'Elder';
}
