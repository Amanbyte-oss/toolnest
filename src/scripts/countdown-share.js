/**
 * countdown-share.js
 * Handles high-resolution image generation (PNG), file downloads,
 * and native Web Share API with files support for Countdown cards.
 */

import { getTimeRemaining } from './countdown.js';

/**
 * Creates a clean URL/filename-safe slug from title
 */
export function slugifyTitle(title) {
  const clean = String(title || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return clean || 'event';
}

/**
 * Ensures htmlToImage library is loaded in window
 */
export async function ensureHtmlToImage() {
  if (typeof window === 'undefined') return null;
  if (window.htmlToImage) return window.htmlToImage;

  return new Promise((resolve, reject) => {
    const existing = document.querySelector('script[src*="html-to-image"]');
    if (existing) {
      if (window.htmlToImage) {
        resolve(window.htmlToImage);
        return;
      }
      existing.addEventListener('load', () => resolve(window.htmlToImage));
      existing.addEventListener('error', () => reject(new Error('Failed to load html-to-image script')));
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/html-to-image@1.11.11/dist/html-to-image.min.js';
    script.crossOrigin = 'anonymous';
    script.onload = () => resolve(window.htmlToImage);
    script.onerror = () => reject(new Error('Failed to load html-to-image CDN'));
    document.head.appendChild(script);
  });
}

/**
 * Converts a data URL to a File object for navigator.share
 */
export function dataUrlToFile(dataUrl, filename) {
  const parts = dataUrl.split(',');
  const mime = parts[0].match(/:(.*?);/)[1] || 'image/png';
  const bstr = atob(parts[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}

/**
 * Updates the offscreen share card with the latest live countdown data
 */
export function updateShareCard(cardEl, data) {
  if (!cardEl) return;

  const emojiEl = cardEl.querySelector('[data-card-emoji]');
  const titleEl = cardEl.querySelector('[data-card-title]');
  const targetDateEl = cardEl.querySelector('[data-card-target-date]');
  const progressContainer = cardEl.querySelector('[data-card-progress-container]');
  const progressBar = cardEl.querySelector('[data-card-progress-bar]');
  const progressPct = cardEl.querySelector('[data-card-progress-pct]');
  const timerGrid = cardEl.querySelector('[data-card-timer-grid]');
  const celebrationBox = cardEl.querySelector('[data-card-celebration]');
  const elapsedText = cardEl.querySelector('[data-card-elapsed-text]');

  const daysEl = cardEl.querySelector('[data-card-days]');
  const hoursEl = cardEl.querySelector('[data-card-hours]');
  const minsEl = cardEl.querySelector('[data-card-minutes]');
  const secsEl = cardEl.querySelector('[data-card-seconds]');

  const title = String(data.title || 'My Event').trim();
  const emoji = String(data.emoji || '🎉');
  const targetTime = typeof data.timestamp === 'number' ? data.timestamp : new Date(data.date).getTime();
  const rem = getTimeRemaining(targetTime);

  // Emoji & Title
  if (emojiEl) emojiEl.textContent = emoji;
  if (titleEl) {
    titleEl.textContent = title;
    if (title.length > 35) {
      titleEl.classList.remove('text-3xl');
      titleEl.classList.add('text-2xl');
    } else {
      titleEl.classList.remove('text-2xl');
      titleEl.classList.add('text-3xl');
    }
  }

  // Target Date String
  const targetObj = new Date(targetTime);
  if (targetDateEl && !isNaN(targetObj.getTime())) {
    targetDateEl.textContent = targetObj.toLocaleDateString(undefined, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }) + ` at ${targetObj.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}`;
  }

  // Progress Bar (if creation time is known)
  if (progressContainer && progressBar && progressPct) {
    const createdTime = data.createdAt ? new Date(data.createdAt).getTime() : null;
    if (createdTime && !isNaN(createdTime) && targetTime > createdTime) {
      const now = Date.now();
      const totalDuration = targetTime - createdTime;
      const elapsed = Math.max(0, now - createdTime);
      const pct = Math.min(100, Math.max(0, Math.round((elapsed / totalDuration) * 100)));
      progressBar.style.width = `${pct}%`;
      progressPct.textContent = `${pct}% elapsed`;
      progressContainer.classList.remove('hidden');
    } else {
      progressContainer.classList.add('hidden');
    }
  }

  // Check if zero or elapsed
  if (rem.isPast) {
    if (timerGrid) timerGrid.classList.add('hidden');
    if (celebrationBox) celebrationBox.classList.remove('hidden');
    if (elapsedText) {
      elapsedText.textContent = `Elapsed since: ${rem.days}d ${rem.hours}h ${rem.minutes}m ${rem.seconds}s ago`;
    }
  } else {
    if (timerGrid) timerGrid.classList.remove('hidden');
    if (celebrationBox) celebrationBox.classList.add('hidden');

    if (daysEl) {
      daysEl.textContent = rem.formattedDays;
      // Shrink font for 4+ digits (> 999 days)
      if (rem.days > 999) {
        daysEl.classList.remove('text-4xl');
        daysEl.classList.add('text-2xl');
      } else {
        daysEl.classList.remove('text-2xl');
        daysEl.classList.add('text-4xl');
      }
    }
    if (hoursEl) hoursEl.textContent = rem.formattedHours;
    if (minsEl) minsEl.textContent = rem.formattedMinutes;
    if (secsEl) secsEl.textContent = rem.formattedSeconds;
  }
}

/**
 * Bulletproof fallback canvas generator if html-to-image fails
 */
export function drawCountdownCanvas(data, rem) {
  const width = 1080;
  const height = 1350;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas 2D context unavailable');

  // Background Slate Gradient
  const grad = ctx.createLinearGradient(0, 0, 0, height);
  grad.addColorStop(0, '#f8fafc');
  grad.addColorStop(0.5, '#f1f5f9');
  grad.addColorStop(1, '#e2e8f0');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  // Outer Card
  const pad = 60;
  const cardW = width - pad * 2;
  const cardH = height - pad * 2;
  const radius = 64;

  ctx.save();
  ctx.beginPath();
  ctx.roundRect(pad, pad, cardW, cardH, radius);
  ctx.fillStyle = '#ffffff';
  ctx.shadowColor = 'rgba(15, 23, 42, 0.12)';
  ctx.shadowBlur = 40;
  ctx.shadowOffsetY = 20;
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.strokeStyle = '#cbd5e1';
  ctx.stroke();
  ctx.restore();

  // Top Accent Bar
  ctx.save();
  const barGrad = ctx.createLinearGradient(pad + 80, pad, pad + cardW - 80, pad);
  barGrad.addColorStop(0, '#6366f1');
  barGrad.addColorStop(0.5, '#f43f5e');
  barGrad.addColorStop(1, '#f59e0b');
  ctx.fillStyle = barGrad;
  ctx.beginPath();
  ctx.roundRect(pad + 80, pad, cardW - 160, 10, 5);
  ctx.fill();
  ctx.restore();

  // Header Badge: "⏳ LIVE COUNTDOWN"
  ctx.save();
  ctx.fillStyle = '#eef2ff';
  ctx.beginPath();
  ctx.roundRect(width / 2 - 140, pad + 60, 280, 48, 24);
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = '#c7d2fe';
  ctx.stroke();

  ctx.fillStyle = '#4f46e5';
  ctx.font = 'bold 20px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('⏳ LIVE COUNTDOWN', width / 2, pad + 84);
  ctx.restore();

  // Event Emoji
  ctx.save();
  ctx.font = '96px -apple-system, BlinkMacSystemFont, "Segoe UI Emoji", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(data.emoji || '🎉', width / 2, pad + 200);
  ctx.restore();

  // Event Title
  ctx.save();
  ctx.fillStyle = '#0f172a';
  ctx.font = '900 48px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  const title = String(data.title || 'My Event').trim();
  // Simple 2-line wrap
  if (title.length > 28) {
    const words = title.split(' ');
    let line1 = '';
    let line2 = '';
    for (const w of words) {
      if ((line1 + ' ' + w).length <= 25) {
        line1 = (line1 + ' ' + w).trim();
      } else {
        line2 = (line2 + ' ' + w).trim();
      }
    }
    ctx.fillText(line1, width / 2, pad + 300);
    ctx.fillText(line2.slice(0, 30) + (line2.length > 30 ? '...' : ''), width / 2, pad + 360);
  } else {
    ctx.fillText(title, width / 2, pad + 320);
  }
  ctx.restore();

  // Target Date String
  const targetTime = typeof data.timestamp === 'number' ? data.timestamp : new Date(data.date).getTime();
  const targetObj = new Date(targetTime);
  const targetStr = !isNaN(targetObj.getTime())
    ? targetObj.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) +
      ` at ${targetObj.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}`
    : '';
  ctx.save();
  ctx.fillStyle = '#475569';
  ctx.font = '600 26px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(targetStr, width / 2, pad + 430);
  ctx.restore();

  // Center Area: 4-Unit Grid or Celebratory Banner
  if (rem.isPast) {
    // Celebratory Card
    ctx.save();
    const celW = cardW - 120;
    const celH = 260;
    const celX = pad + 60;
    const celY = pad + 520;
    const celGrad = ctx.createLinearGradient(celX, celY, celX + celW, celY + celH);
    celGrad.addColorStop(0, '#fef3c7');
    celGrad.addColorStop(1, '#fde68a');
    ctx.fillStyle = celGrad;
    ctx.beginPath();
    ctx.roundRect(celX, celY, celW, celH, 36);
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#f59e0b';
    ctx.stroke();

    ctx.fillStyle = '#b45309';
    ctx.font = '900 52px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText("🎉 It's here!", width / 2, celY + 90);

    ctx.fillStyle = '#475569';
    ctx.font = '600 26px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText(`Elapsed since: ${rem.days}d ${rem.hours}h ${rem.minutes}m ${rem.seconds}s ago`, width / 2, celY + 170);
    ctx.restore();
  } else {
    // 4 Unit Boxes
    const units = [
      { label: 'DAYS', val: rem.formattedDays, isAccent: true },
      { label: 'HOURS', val: rem.formattedHours },
      { label: 'MINUTES', val: rem.formattedMinutes },
      { label: 'SECONDS', val: rem.formattedSeconds },
    ];

    const boxGap = 24;
    const totalBoxesW = cardW - 120;
    const boxW = (totalBoxesW - boxGap * 3) / 4;
    const boxH = 240;
    const startX = pad + 60;
    const boxY = pad + 540;

    units.forEach((u, i) => {
      const bx = startX + i * (boxW + boxGap);
      ctx.save();
      ctx.fillStyle = '#f8fafc';
      ctx.beginPath();
      ctx.roundRect(bx, boxY, boxW, boxH, 28);
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#cbd5e1';
      ctx.stroke();

      // Number
      ctx.fillStyle = u.isAccent ? '#4f46e5' : '#0f172a';
      const fontSize = u.val.length > 3 ? 56 : 76;
      ctx.font = `900 ${fontSize}px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(u.val, bx + boxW / 2, boxY + boxH / 2 - 16);

      // Label
      ctx.fillStyle = '#64748b';
      ctx.font = 'bold 20px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      ctx.fillText(u.label, bx + boxW / 2, boxY + boxH - 45);
      ctx.restore();
    });
  }

  // Watermark Strip
  ctx.save();
  ctx.strokeStyle = '#e2e8f0';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(pad + 60, pad + cardH - 120);
  ctx.lineTo(pad + cardW - 60, pad + cardH - 120);
  ctx.stroke();

  ctx.fillStyle = '#334155';
  ctx.font = 'bold 26px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText('⏳ made with ToolNest', pad + 60, pad + cardH - 60);

  ctx.fillStyle = '#64748b';
  ctx.font = '600 24px ui-monospace, monospace';
  ctx.textAlign = 'right';
  ctx.fillText(window.location.host || 'toolnest.pages.dev', pad + cardW - 60, pad + cardH - 60);
  ctx.restore();

  return canvas.toDataURL('image/png');
}

/**
 * Triggers rendering of the card to PNG dataURL
 */
export async function renderCardToPng(cardEl, eventData) {
  if (!cardEl) throw new Error('Card element not found');

  // Immediately inject latest time and state so digits are accurate to the second
  updateShareCard(cardEl, eventData);

  const targetTime = typeof eventData.timestamp === 'number' ? eventData.timestamp : new Date(eventData.date).getTime();
  const rem = getTimeRemaining(targetTime);

  try {
    const htmlToImage = await ensureHtmlToImage();
    if (!htmlToImage || typeof htmlToImage.toPng !== 'function') {
      throw new Error('html-to-image unavailable');
    }

    // Capture using html-to-image with pixelRatio: 2 (540x675 * 2 = 1080x1350)
    const dataUrl = await htmlToImage.toPng(cardEl, {
      quality: 1,
      pixelRatio: 2,
      cacheBust: true,
      filter: (node) => {
        // Skip any non-visual elements
        if (node.tagName === 'SCRIPT' || node.tagName === 'STYLE') return false;
        return true;
      },
    });

    return dataUrl;
  } catch (err) {
    console.warn('html-to-image failed, falling back to Canvas 2D export:', err);
    // Canvas 2D fallback guarantees high quality sticker output even on CORS/font errors
    return drawCountdownCanvas(eventData, rem);
  }
}

/**
 * Downloads a dataURL as a PNG file
 */
export function triggerDownload(dataUrl, filename) {
  const link = document.createElement('a');
  link.download = filename;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Helper to manage button loading state (spinner + disabled)
 */
function setButtonLoading(btn, isLoading, loadingText = 'Generating...') {
  if (!btn) return;
  if (isLoading) {
    btn.setAttribute('disabled', 'true');
    btn.setAttribute('aria-busy', 'true');
    btn.dataset.origHtml = btn.innerHTML;
    btn.innerHTML = `
      <svg class="w-4 h-4 animate-spin shrink-0 text-current" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
      </svg>
      <span>${loadingText}</span>
    `;
  } else {
    btn.removeAttribute('disabled');
    btn.removeAttribute('aria-busy');
    if (btn.dataset.origHtml) {
      btn.innerHTML = btn.dataset.origHtml;
      delete btn.dataset.origHtml;
    }
  }
}

/**
 * Main handler for "Download Image" button
 */
export async function handleDownloadImage({ cardEl, getEventData, toastFn, buttonEl }) {
  if (!cardEl) return;
  const eventData = getEventData();
  if (!eventData || !eventData.date) {
    if (toastFn) toastFn('Please provide a valid countdown date first.');
    return;
  }

  setButtonLoading(buttonEl, true, 'Rendering Image...');
  if (toastFn) toastFn('Generating high-res sticker...');

  try {
    const dataUrl = await renderCardToPng(cardEl, eventData);
    const slug = slugifyTitle(eventData.title);
    const filename = `countdown-${slug}.png`;

    triggerDownload(dataUrl, filename);
    if (toastFn) toastFn('Image downloaded successfully!');
  } catch (err) {
    console.error('Failed to download image:', err);
    if (toastFn) toastFn('Failed to generate image. Please try again!');
  } finally {
    setButtonLoading(buttonEl, false);
  }
}

/**
 * Main handler for "Share Image" button
 * Fallback chain: share file -> share URL + text -> download + toast "Image saved — share it anywhere!"
 */
export async function handleShareImage({ cardEl, getEventData, shareUrl, toastFn, buttonEl }) {
  if (!cardEl) return;
  const eventData = getEventData();
  if (!eventData || !eventData.date) {
    if (toastFn) toastFn('Please provide a valid countdown date first.');
    return;
  }

  setButtonLoading(buttonEl, true, 'Preparing Share...');

  try {
    const dataUrl = await renderCardToPng(cardEl, eventData);
    const slug = slugifyTitle(eventData.title);
    const filename = `countdown-${slug}.png`;
    const file = dataUrlToFile(dataUrl, filename);

    let shared = false;

    // 1. Try sharing image file directly via Web Share API
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({
          files: [file],
          title: `⏳ ${eventData.title} Countdown`,
          text: `Check out this live countdown for "${eventData.title}"!`,
        });
        shared = true;
        if (toastFn) toastFn('Countdown sticker shared!');
      } catch (err) {
        if (err.name === 'AbortError') {
          // User closed share sheet, exit gracefully
          return;
        }
      }
    }

    // 2. Fallback: Share URL + text if file sharing was rejected or unsupported
    if (!shared && navigator.share) {
      try {
        await navigator.share({
          title: `⏳ ${eventData.title} Countdown`,
          text: `Check out this live countdown for "${eventData.title}"!`,
          url: shareUrl || window.location.href,
        });
        shared = true;
        if (toastFn) toastFn('Countdown link shared!');
      } catch (err) {
        if (err.name === 'AbortError') return;
      }
    }

    // 3. Fallback: Download file + show toast "Image saved — share it anywhere!"
    if (!shared) {
      triggerDownload(dataUrl, filename);
      if (toastFn) toastFn('Image saved — share it anywhere!');
    }
  } catch (err) {
    console.error('Failed to share image:', err);
    if (toastFn) toastFn('Unable to share image. Please try downloading!');
  } finally {
    setButtonLoading(buttonEl, false);
  }
}
