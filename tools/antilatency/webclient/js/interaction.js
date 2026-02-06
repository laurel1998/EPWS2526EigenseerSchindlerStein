//nur Raum→Zeit→Bild Logik

export function isInCenter(x, y) {
  return Math.abs(x) < 0.3 && Math.abs(y) < 0.3;
}

export function getMonthFromXY(x, y) {
  const angle = Math.atan2(y, x);
  const normalized = (angle + Math.PI * 2) % (Math.PI * 2);
  return Math.floor(normalized / (Math.PI * 2 / 12)) + 1;
}

const TIME_SLOTS = [
  { max: 0.6, hour: 8 },
  { max: 1.2, hour: 12 },
  { max: 1.8, hour: 16 },
  { max: 2.4, hour: 20 },
  { max: Infinity, hour: 23 }
];

export function getHourFromRadius(x, y) {
  const r = Math.sqrt(x * x + y * y);
  for (const slot of TIME_SLOTS) {
    if (r <= slot.max) return slot.hour;
  }
}

const YEAR_LEVELS = [
  { z: 0.4, year: 2010 },
  { z: 0.7, year: 2012 },
  { z: 1.0, year: 2014 },
  { z: 1.3, year: 2018 },
  { z: 1.6, year: 2020 },
  { z: 1.9, year: 2024 }
];

export function getYearFromZ(z) {
  let closest = YEAR_LEVELS[0];
  let minDiff = Math.abs(z - closest.z);

  for (const level of YEAR_LEVELS) {
    const diff = Math.abs(z - level.z);
    if (diff < minDiff) {
      minDiff = diff;
      closest = level;
    }
  }
  return closest.year;
}

export function getImageForPosition(mapping, x, y, z) {
  if (!mapping) return null;

  if (isInCenter(x, y)) {
    return mapping.title;
  }

  const year = getYearFromZ(z);
  const month = getMonthFromXY(x, y);
  const hour = getHourFromRadius(x, y);

  const match = mapping.images.find(img =>
    img.year === year &&
    img.month === month &&
    img.hour === hour
  );

  if (match) {
    console.log('Image:', year, month, hour, match.src);
  }

  return match ? (mapping.baseUrl + match.src) : null;
}
