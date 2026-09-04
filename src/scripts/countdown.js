/**
 * Countdown engine: ISO datetime calculations, Base64URL encoding/decoding,
 * and quick template generators.
 */

export const PRESET_EMOJIS = ['🎉', '🎂', '✈️', '🎓', '📚', '💍', '🏆', '🎄'];

/**
 * Encodes countdown object into URL-safe Base64 string
 */
export function encodeCountdown(data) {
  try {
    const payload = {
      t: String(data.t || '').trim().slice(0, 60),
      d: String(data.d || ''),
      e: String(data.e || '🎉'),
    };
    if (data.c) {
      payload.c = String(data.c);
    }
    const json = JSON.stringify(payload);
    const b64 = btoa(encodeURIComponent(json).replace(/%([0-9A-F]{2})/g, (_, p1) => String.fromCharCode('0x' + p1)));
    return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  } catch (e) {
    return '';
  }
}

/**
 * Decodes URL-safe Base64 string into verified countdown object
 */
export function decodeCountdown(encoded) {
  if (!encoded || typeof encoded !== 'string') return null;
  try {
    let b64 = encoded.replace(/-/g, '+').replace(/_/g, '/');
    while (b64.length % 4) b64 += '=';
    const jsonStr = decodeURIComponent(
      atob(b64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    const parsed = JSON.parse(jsonStr);
    if (!parsed || !parsed.t || !parsed.d) return null;

    const parsedDate = new Date(parsed.d);
    if (isNaN(parsedDate.getTime())) return null;

    return {
      title: String(parsed.t).trim().slice(0, 60),
      date: parsed.d,
      emoji: String(parsed.e || '🎉'),
      createdAt: parsed.c ? String(parsed.c) : null,
      timestamp: parsedDate.getTime(),
    };
  } catch (e) {
    return null;
  }
}

/**
 * Formats a Date object into YYYY-MM-DDTHH:mm string for datetime-local input
 */
export function toDatetimeLocal(date) {
  const pad = (n) => String(n).padStart(2, '0');
  const y = date.getFullYear();
  const m = pad(date.getMonth() + 1);
  const d = pad(date.getDate());
  const h = pad(date.getHours());
  const min = pad(date.getMinutes());
  return `${y}-${m}-${d}T${h}:${min}`;
}

/**
 * Calculates time remaining until target timestamp
 */
export function getTimeRemaining(targetDateInput) {
  const targetTime = typeof targetDateInput === 'number' ? targetDateInput : new Date(targetDateInput).getTime();
  const now = Date.now();
  const diff = targetTime - now;

  if (isNaN(targetTime)) {
    return {
      isPast: false,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      formattedDays: '0',
      formattedHours: '00',
      formattedMinutes: '00',
      formattedSeconds: '00',
      diff: 0,
    };
  }

  if (diff <= 0) {
    const elapsed = Math.abs(diff);
    const seconds = Math.floor((elapsed / 1000) % 60);
    const minutes = Math.floor((elapsed / (1000 * 60)) % 60);
    const hours = Math.floor((elapsed / (1000 * 60 * 60)) % 24);
    const days = Math.floor(elapsed / (1000 * 60 * 60 * 24));
    return {
      isPast: true,
      days,
      hours,
      minutes,
      seconds,
      formattedDays: String(days),
      formattedHours: String(hours).padStart(2, '0'),
      formattedMinutes: String(minutes).padStart(2, '0'),
      formattedSeconds: String(seconds).padStart(2, '0'),
      diff,
    };
  }

  const seconds = Math.floor((diff / 1000) % 60);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  return {
    isPast: false,
    days,
    hours,
    minutes,
    seconds,
    formattedDays: String(days),
    formattedHours: String(hours).padStart(2, '0'),
    formattedMinutes: String(minutes).padStart(2, '0'),
    formattedSeconds: String(seconds).padStart(2, '0'),
    diff,
  };
}

/**
 * Generates quick preset dates (10 popular countdown ideas)
 */
export function getPresetTemplate(presetKey) {
  const now = new Date();
  const currentYear = now.getFullYear();

  if (presetKey === 'newyear') {
    const target = new Date(currentYear + 1, 0, 1, 0, 0, 0);
    return {
      title: 'New Year Countdown',
      emoji: '🎆',
      date: toDatetimeLocal(target),
    };
  }

  if (presetKey === 'christmas') {
    let target = new Date(currentYear, 11, 25, 0, 0, 0);
    if (target.getTime() <= now.getTime()) {
      target = new Date(currentYear + 1, 11, 25, 0, 0, 0);
    }
    return {
      title: 'Christmas Countdown',
      emoji: '🎄',
      date: toDatetimeLocal(target),
    };
  }

  if (presetKey === 'halloween') {
    let target = new Date(currentYear, 9, 31, 18, 0, 0);
    if (target.getTime() <= now.getTime()) {
      target = new Date(currentYear + 1, 9, 31, 18, 0, 0);
    }
    return {
      title: 'Halloween Countdown',
      emoji: '🎃',
      date: toDatetimeLocal(target),
    };
  }

  if (presetKey === 'summersolstice') {
    let target = new Date(currentYear, 5, 21, 12, 0, 0);
    if (target.getTime() <= now.getTime()) {
      target = new Date(currentYear + 1, 5, 21, 12, 0, 0);
    }
    return {
      title: 'Summer Solstice',
      emoji: '☀️',
      date: toDatetimeLocal(target),
    };
  }

  if (presetKey === 'friday5pm') {
    const target = new Date(now);
    const dayOfWeek = target.getDay(); // 0 is Sun, 5 is Fri
    let daysUntilFriday = (5 - dayOfWeek + 7) % 7;
    if (daysUntilFriday === 0 && target.getHours() >= 17) {
      daysUntilFriday = 7;
    }
    target.setDate(target.getDate() + daysUntilFriday);
    target.setHours(17, 0, 0, 0);
    return {
      title: 'Weekend Countdown',
      emoji: '🍻',
      date: toDatetimeLocal(target),
    };
  }

  if (presetKey === 'fullmoon') {
    // Approximate next full moon (~29.53-day cycle)
    const target = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000);
    target.setHours(21, 0, 0, 0);
    return {
      title: 'Next Full Moon',
      emoji: '🌕',
      date: toDatetimeLocal(target),
    };
  }

  if (presetKey === 'graduation') {
    let target = new Date(currentYear, 4, 25, 10, 0, 0);
    if (target.getTime() <= now.getTime()) {
      target = new Date(currentYear + 1, 4, 25, 10, 0, 0);
    }
    return {
      title: 'Graduation Ceremony',
      emoji: '🎓',
      date: toDatetimeLocal(target),
    };
  }

  if (presetKey === 'birthday') {
    const target = new Date(now.getTime() + 60 * 24 * 60 * 60 * 1000);
    target.setHours(0, 0, 0, 0);
    return {
      title: 'Birthday Celebration',
      emoji: '🎂',
      date: toDatetimeLocal(target),
    };
  }

  if (presetKey === 'vacation') {
    const target = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000);
    target.setHours(8, 0, 0, 0);
    return {
      title: 'Summer Vacation',
      emoji: '✈️',
      date: toDatetimeLocal(target),
    };
  }

  if (presetKey === 'exam') {
    const target = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
    target.setHours(9, 0, 0, 0);
    return {
      title: 'Final Exam',
      emoji: '📚',
      date: toDatetimeLocal(target),
    };
  }

  if (presetKey === 'productlaunch') {
    const target = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    target.setHours(10, 0, 0, 0);
    return {
      title: 'Product Launch',
      emoji: '🚀',
      date: toDatetimeLocal(target),
    };
  }

  return null;
}

