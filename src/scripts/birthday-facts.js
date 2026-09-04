import zodiacData from '../data/zodiac.json' with { type: 'json' };
import birthstonesData from '../data/birthstones.json' with { type: 'json' };
import birthFlowersData from '../data/birth-flowers.json' with { type: 'json' };
import generationsData from '../data/generations.json' with { type: 'json' };
import famousData from '../data/famous.json' with { type: 'json' };

export const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

/**
 * Check leap year.
 */
export function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

/**
 * Days in month.
 */
export function getDaysInMonth(year, month) {
  if (month === 2) return isLeapYear(year) ? 29 : 28;
  if ([4, 6, 9, 11].includes(month)) return 30;
  return 31;
}

/**
 * Validates date components.
 */
export function validateDate(year, month, day) {
  const currentYear = new Date().getFullYear();
  if (!year || isNaN(year) || year < 1920 || year > currentYear) {
    return { valid: false, error: `Please select a year between 1920 and ${currentYear}.` };
  }
  if (!month || isNaN(month) || month < 1 || month > 12) {
    return { valid: false, error: 'Please select a valid month.' };
  }
  if (!day || isNaN(day) || day < 1 || day > 31) {
    return { valid: false, error: 'Please select a valid day.' };
  }

  const maxDays = getDaysInMonth(year, month);
  if (day > maxDays) {
    const monthName = MONTH_NAMES[month - 1];
    return {
      valid: false,
      error: `Invalid date: ${monthName} ${year} has only ${maxDays} days.`,
    };
  }

  const birthUtc = Date.UTC(year, month - 1, day);
  const now = new Date();
  const todayUtc = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());

  if (birthUtc > todayUtc) {
    return { valid: false, error: 'That birth date is in the future.' };
  }

  return { valid: true };
}

/**
 * Determines zodiac sign from month and day.
 */
export function getZodiacSign(month, day) {
  const mm = String(month).padStart(2, '0');
  const dd = String(day).padStart(2, '0');
  const dateStr = `${mm}-${dd}`;

  for (const sign of zodiacData) {
    if (sign.id === 'capricorn') {
      // Capricorn spans Dec 22 to Jan 19
      if (dateStr >= sign.start || dateStr <= sign.end) {
        return sign;
      }
    } else {
      if (dateStr >= sign.start && dateStr <= sign.end) {
        return sign;
      }
    }
  }

  return zodiacData[0]; // fallback
}

/**
 * Determines generation from birth year.
 */
export function getGeneration(year) {
  const match = generationsData.find((g) => year >= g.startYear && year <= g.endYear);
  return (
    match || {
      name: 'Modern Generation',
      shortName: 'Modern',
      description: 'Defined by fast-paced global transformation.',
    }
  );
}

/**
 * Computes life milestones (10,000 days and next milestones).
 */
export function getLifeMilestones(birthUtc) {
  const now = new Date();
  const todayUtc = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  const daysLived = Math.max(0, Math.floor((todayUtc - birthUtc) / (1000 * 60 * 60 * 24)));

  // 10,000th day
  const day10kUtc = birthUtc + 10000 * 24 * 60 * 60 * 1000;
  const is10kPassed = daysLived >= 10000;
  const day10kDate = new Date(day10kUtc).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });

  // Next milestone (e.g. 10000, 15000, 20000, 25000, 30000, 35000, 40000)
  const milestoneSteps = [10000, 15000, 20000, 25000, 30000, 35000, 40000];
  const nextMilestone = milestoneSteps.find((m) => m > daysLived) || daysLived + 5000;
  const nextMilestoneUtc = birthUtc + nextMilestone * 24 * 60 * 60 * 1000;
  const nextMilestoneDate = new Date(nextMilestoneUtc).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });
  const daysUntilNextMilestone = nextMilestone - daysLived;

  return {
    daysLived,
    day10k: {
      date: day10kDate,
      isPassed: is10kPassed,
      daysUntil: 10000 - daysLived,
    },
    nextMilestone: {
      milestone: nextMilestone,
      date: nextMilestoneDate,
      daysUntil: daysUntilNextMilestone,
    },
  };
}

/**
 * Retrieves famous birthdays matching month and day.
 */
export function getFamousBirthdays(month, day) {
  let lookupKey = `${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  let leapDayNote = null;

  if (month === 2 && day === 29) {
    lookupKey = '02-28';
    leapDayNote = 'Because you were born on Leap Day (Feb 29), we matched famous figures born on February 28.';
  }

  const matches = famousData[lookupKey] || [];
  return {
    people: matches,
    leapDayNote,
    key: lookupKey,
  };
}

/**
 * Numerology Life Path Number Archetypes (Pythagorean system)
 */
export const LIFE_PATH_ARCHETYPES = {
  1: {
    title: 'The Leader',
    traits: 'Independent, Innovative, Ambitious',
    summary: 'Pioneering spirits driven to break new ground, embrace self-reliance, and lead with original vision.',
  },
  2: {
    title: 'The Peacemaker',
    traits: 'Diplomatic, Empathetic, Intuitive',
    summary: 'Natural mediators and compassionate listeners who thrive by fostering harmony and deep partnerships.',
  },
  3: {
    title: 'The Creative',
    traits: 'Expressive, Optimistic, Charismatic',
    summary: 'Joyful communicators and artistic souls with a gift for storytelling, humor, and inspiring others.',
  },
  4: {
    title: 'The Builder',
    traits: 'Disciplined, Practical, Trustworthy',
    summary: 'Steadfast foundations of society who construct lasting value through methodical effort and integrity.',
  },
  5: {
    title: 'The Adventurer',
    traits: 'Adaptable, Freedom-loving, Curious',
    summary: 'Dynamic free spirits who thrive on versatile exploration, cultural discovery, and transformative change.',
  },
  6: {
    title: 'The Nurturer',
    traits: 'Compassionate, Protective, Responsible',
    summary: 'Heart-centered guardians focused on family, community wellness, emotional healing, and domestic beauty.',
  },
  7: {
    title: 'The Seeker',
    traits: 'Analytical, Introspective, Spiritual',
    summary: 'Truth-seekers and philosophical thinkers drawn to unraveling life’s mysteries, sciences, and higher knowledge.',
  },
  8: {
    title: 'The Powerhouse',
    traits: 'Authoritative, Ambitious, Strategic',
    summary: 'Goal-oriented visionaries with an innate understanding of material success, executive strategy, and empowerment.',
  },
  9: {
    title: 'The Humanitarian',
    traits: 'Altruistic, Broad-minded, Empathetic',
    summary: 'Selfless world-citizens dedicated to universal compassion, artistic wisdom, and uplifting global consciousness.',
  },
  11: {
    title: 'The Master Intuitive',
    traits: 'Illuminated, Visionary, Inspiring',
    summary: 'A rare Master Number carrying profound spiritual intuition, heightened sensitivity, and prophetic insight.',
  },
  22: {
    title: 'The Master Builder',
    traits: 'Visionary, Pragmatic, Transformative',
    summary: 'A powerful Master Number capable of translating grand global ideals into tangible, world-changing structures.',
  },
  33: {
    title: 'The Master Teacher',
    traits: 'Compassionate, Guiding, Selfless',
    summary: 'The pinnacle Master Number embodying supreme empathy, spiritual mentorship, and selfless devotion to humanity.',
  },
};

/**
 * Calculates Pythagorean Life Path Number from birth year, month, and day.
 */
export function getLifePathNumber(year, month, day) {
  function reduceToSingleOrMaster(n) {
    while (n > 9 && n !== 11 && n !== 22 && n !== 33) {
      n = String(n).split('').reduce((sum, d) => sum + parseInt(d, 10), 0);
    }
    return n;
  }

  const rMonth = reduceToSingleOrMaster(month);
  const rDay = reduceToSingleOrMaster(day);
  const rYear = reduceToSingleOrMaster(year);

  let total = rMonth + rDay + rYear;
  let finalNum = reduceToSingleOrMaster(total);

  const archetype = LIFE_PATH_ARCHETYPES[finalNum] || LIFE_PATH_ARCHETYPES[1];
  return {
    number: finalNum,
    title: archetype.title,
    traits: archetype.traits,
    summary: archetype.summary,
  };
}

/**
 * Aggregate birthday facts report.
 */
export function getBirthdayFacts(year, month, day) {
  const birthUtc = Date.UTC(year, month - 1, day);
  const birthDate = new Date(birthUtc);

  const weekday = birthDate.toLocaleDateString('en-US', {
    weekday: 'long',
    timeZone: 'UTC',
  });

  const formattedDate = birthDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });

  const shortDate = birthDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  });

  const zodiac = getZodiacSign(month, day);
  const birthstone = birthstonesData[String(month)] || { name: 'Unknown', meaning: '' };
  const birthFlower = birthFlowersData[String(month)] || { name: 'Unknown', meaning: '' };
  const generation = getGeneration(year);
  const milestones = getLifeMilestones(birthUtc);
  const famous = getFamousBirthdays(month, day);
  const lifePath = getLifePathNumber(year, month, day);

  return {
    birthUtc,
    year,
    month,
    day,
    weekday,
    formattedDate,
    shortDate,
    zodiac,
    birthstone,
    birthFlower,
    generation,
    milestones,
    famous,
    lifePath,
  };
}
