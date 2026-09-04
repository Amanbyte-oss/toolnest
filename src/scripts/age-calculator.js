/**
 * Client-side pure UTC date math & statistical computations for Age Calculator.
 * Designed to prevent timezone offset discrepancies and handle all leap year edge cases.
 */

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
 * Check if a given year is a leap year.
 * @param {number} year
 * @returns {boolean}
 */
export function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

/**
 * Returns the number of days in a specific year and month.
 * @param {number} year
 * @param {number} month 1-12
 * @returns {number}
 */
export function getDaysInMonth(year, month) {
  if (month === 2) {
    return isLeapYear(year) ? 29 : 28;
  }
  if ([4, 6, 9, 11].includes(month)) {
    return 30;
  }
  return 31;
}

/**
 * Validates date components and calendar existence.
 * @param {number} year
 * @param {number} month 1-12
 * @param {number} day 1-31
 * @param {object} [targetDate] optional { year, month, day }
 * @returns {{ valid: boolean, error?: string }}
 */
export function validateDate(year, month, day, targetDate) {
  if (!year || isNaN(year) || year < 1900 || year > 2100) {
    return { valid: false, error: 'Please enter a valid year between 1900 and 2100.' };
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
  let targetUtc;

  if (targetDate && targetDate.year && targetDate.month && targetDate.day) {
    const maxTargetDays = getDaysInMonth(targetDate.year, targetDate.month);
    if (targetDate.day > maxTargetDays) {
      return {
        valid: false,
        error: `Target date is invalid: ${MONTH_NAMES[targetDate.month - 1]} has ${maxTargetDays} days.`,
      };
    }
    targetUtc = Date.UTC(targetDate.year, targetDate.month - 1, targetDate.day);
  } else {
    const now = new Date();
    targetUtc = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  }

  if (birthUtc > targetUtc) {
    return { valid: false, error: 'That date is in the future.' };
  }

  return { valid: true };
}

/**
 * Computes exact chronological age and detailed statistical insights.
 * @param {{ year: number, month: number, day: number }} birth
 * @param {{ year: number, month: number, day: number }} target
 */
export function calculateAge(birth, target) {
  const bYear = birth.year;
  const bMonth = birth.month;
  const bDay = birth.day;

  const tYear = target.year;
  const tMonth = target.month;
  const tDay = target.day;

  const birthUtc = Date.UTC(bYear, bMonth - 1, bDay);
  const targetUtc = Date.UTC(tYear, tMonth - 1, tDay);

  // Exact calendar differences
  let years = tYear - bYear;
  let months = tMonth - bMonth;
  let days = tDay - bDay;

  if (days < 0) {
    // Borrow days from previous month in target calendar
    const prevMonth = tMonth === 1 ? 12 : tMonth - 1;
    const prevYear = tMonth === 1 ? tYear - 1 : tYear;
    const daysInPrev = getDaysInMonth(prevYear, prevMonth);
    days += daysInPrev;
    months -= 1;
  }

  if (months < 0) {
    months += 12;
    years -= 1;
  }

  // Absolute lived duration
  const diffMs = targetUtc - birthUtc;
  const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const totalHours = totalDays * 24;
  const totalWeeks = Math.floor(totalDays / 7);
  const totalMonths = years * 12 + months;

  // Fun Stats
  const hoursSlept = Math.round(totalDays * 8);
  const heartbeats = Math.round(totalDays * 24 * 60 * 80); // 80 bpm average
  const breaths = Math.round(totalDays * 24 * 60 * 16); // 16 breaths per minute

  // Planetary ages (orbital period in Earth days)
  const mercuryAge = Number((totalDays / 87.97).toFixed(1));
  const venusAge = Number((totalDays / 224.7).toFixed(1));
  const marsAge = Number((totalDays / 686.98).toFixed(1));
  const jupiterAge = Number((totalDays / 4332.59).toFixed(1));

  // Next birthday calculation (handling Feb 29 edge case)
  function getBirthdayUtcForYear(y) {
    if (bMonth === 2 && bDay === 29) {
      return isLeapYear(y) ? Date.UTC(y, 1, 29) : Date.UTC(y, 2, 1); // March 1st on non-leap years
    }
    return Date.UTC(y, bMonth - 1, bDay);
  }

  const thisYearBdayUtc = getBirthdayUtcForYear(tYear);
  let nextBirthdayUtc;
  let isBirthdayToday = false;
  let daysUntilNextBirthday = 0;

  if (thisYearBdayUtc === targetUtc) {
    isBirthdayToday = true;
    nextBirthdayUtc = thisYearBdayUtc;
    daysUntilNextBirthday = 0;
  } else if (thisYearBdayUtc > targetUtc) {
    nextBirthdayUtc = thisYearBdayUtc;
    daysUntilNextBirthday = Math.round((nextBirthdayUtc - targetUtc) / (1000 * 60 * 60 * 24));
  } else {
    nextBirthdayUtc = getBirthdayUtcForYear(tYear + 1);
    daysUntilNextBirthday = Math.round((nextBirthdayUtc - targetUtc) / (1000 * 60 * 60 * 24));
  }

  const nextBirthdayDate = new Date(nextBirthdayUtc);
  const weekdayName = nextBirthdayDate.toLocaleDateString('en-US', {
    weekday: 'long',
    timeZone: 'UTC',
  });
  const formattedNextDate = nextBirthdayDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });

  return {
    exact: {
      years,
      months,
      days,
    },
    totals: {
      months: totalMonths,
      weeks: totalWeeks,
      days: totalDays,
      hours: totalHours,
      initialSeconds: Math.floor(diffMs / 1000),
    },
    funStats: {
      hoursSlept,
      heartbeats,
      breaths,
      planetAges: {
        mercury: mercuryAge,
        venus: venusAge,
        mars: marsAge,
        jupiter: jupiterAge,
      },
    },
    nextBirthday: {
      isToday: isBirthdayToday,
      daysRemaining: daysUntilNextBirthday,
      weekday: weekdayName,
      formattedDate: formattedNextDate,
    },
    birthUtc,
    targetUtc,
  };
}
