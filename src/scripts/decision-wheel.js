/**
 * Decision Wheel engine: rendering, physics-based rotation, touch gestures, and state management.
 * Features multi-line word wrapping, dynamic font scaling, reading direction flipping, and retina sharpness.
 */

export const WHEEL_PALETTE = [
  { bg: '#6366F1', text: '#FFFFFF' }, // Indigo
  { bg: '#14B8A6', text: '#FFFFFF' }, // Teal
  { bg: '#64748B', text: '#FFFFFF' }, // Slate
  { bg: '#F59E0B', text: '#111315' }, // Amber (dark text on light segment)
  { bg: '#8B5CF6', text: '#FFFFFF' }, // Purple
  { bg: '#3B82F6', text: '#FFFFFF' }, // Blue
  { bg: '#EC4899', text: '#FFFFFF' }, // Pink
  { bg: '#10B981', text: '#FFFFFF' }, // Emerald
];

export const PRESETS = {
  eat: ['Pizza', 'Tacos', 'Sushi', 'Burgers', 'Salad', 'Pasta'],
  watch: ['Action', 'Comedy', 'Sci-Fi', 'Horror', 'Documentary', 'Drama'],
  yesno: ['Yes', 'No', 'Maybe', 'Definitely', 'Ask Again'],
};

/**
 * URL Base64URL-safe encoding for wheel options
 */
export function encodeOptionsToUrl(options) {
  try {
    const json = JSON.stringify(options);
    const b64 = btoa(
      encodeURIComponent(json).replace(/%([0-9A-F]{2})/g, (_, p1) =>
        String.fromCharCode('0x' + p1)
      )
    );
    return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  } catch (e) {
    return '';
  }
}

/**
 * URL Base64URL-safe decoding for wheel options
 */
export function decodeOptionsFromUrl(encoded) {
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
    if (Array.isArray(parsed) && parsed.length >= 2 && parsed.length <= 12) {
      return parsed.map((s) => String(s).trim().slice(0, 40)).filter(Boolean);
    }
    return null;
  } catch (e) {
    return null;
  }
}

/**
 * Truncates text with ellipsis if too long
 */
export function truncateLabel(text, maxLength = 16) {
  if (!text) return '';
  return text.length > maxLength ? text.slice(0, maxLength - 1) + '…' : text;
}

/**
 * Computes precomputed multi-line label layout for a wheel segment.
 * Runs once when options change or canvas resizes — NOT on every animation frame.
 *
 * @param {string} text - The option text to render.
 * @param {number} count - Total number of slices on the wheel.
 * @param {number} radius - Outer radius of the wheel in CSS pixels.
 * @param {CanvasRenderingContext2D} ctx - Canvas context for font measurement.
 * @returns {object} Layout definition { lines, fontSize, lineHeight, totalHeight, outerMargin }.
 */
export function computeLabelLayout(text, count, radius, ctx) {
  // Thin segments (>= 9 options) allow max 2 lines to prevent tangential overflow.
  // Wider segments (< 9 options) allow up to 3 lines.
  const maxLines = count > 8 ? 2 : 3;

  // Scaling factor based on standard 190-200px baseline radius
  const scale = radius / 190;
  let baseFontSize = 15;
  if (count > 8) baseFontSize = 12;
  else if (count > 5) baseFontSize = 13;
  else if (count > 3) baseFontSize = 14;

  let fontSize = Math.max(11, Math.round(baseFontSize * scale));
  const minFontSize = Math.max(10, Math.round(11 * Math.min(1, scale)));

  // Available radial line length (between center hub clearance and outer perimeter)
  const outerMargin = Math.max(16, radius * 0.1);
  const innerMargin = Math.max(48, radius * 0.28);
  const maxLineWidth = Math.max(40, radius - outerMargin - innerMargin);

  const rawWords = String(text || '').trim().split(/\s+/).filter(Boolean);
  if (!rawWords.length) {
    return { lines: [], fontSize, lineHeight: 14, totalHeight: 0, outerMargin };
  }

  let bestLines = null;
  let finalFontSize = fontSize;

  // Step down font size if text overflows max lines or line width
  while (fontSize >= minFontSize) {
    ctx.font = `600 ${fontSize}px Inter, system-ui, sans-serif`;
    const lines = [];
    let curLine = '';
    let hasOverflowWord = false;

    for (let i = 0; i < rawWords.length; i++) {
      const word = rawWords[i];
      const test = curLine ? `${curLine} ${word}` : word;
      if (ctx.measureText(test).width <= maxLineWidth) {
        curLine = test;
      } else {
        if (curLine) {
          lines.push(curLine);
          curLine = word;
          if (ctx.measureText(word).width > maxLineWidth) {
            hasOverflowWord = true;
          }
        } else {
          // Single word exceeds available line width
          lines.push(word);
          curLine = '';
          hasOverflowWord = true;
        }
      }
    }
    if (curLine) lines.push(curLine);

    if (lines.length <= maxLines && !hasOverflowWord) {
      bestLines = lines;
      finalFontSize = fontSize;
      break;
    }

    fontSize--;
  }

  // Fallback if still overflowing at minFontSize: clamp to maxLines and truncate long single words
  if (!bestLines) {
    finalFontSize = minFontSize;
    ctx.font = `600 ${finalFontSize}px Inter, system-ui, sans-serif`;
    const rawLines = [];
    let cur = '';

    for (const w of rawWords) {
      const test = cur ? `${cur} ${w}` : w;
      if (ctx.measureText(test).width <= maxLineWidth) {
        cur = test;
      } else {
        if (cur) rawLines.push(cur);
        cur = w;
      }
    }
    if (cur) rawLines.push(cur);

    if (rawLines.length > maxLines) {
      bestLines = rawLines.slice(0, maxLines);
      let last = bestLines[maxLines - 1];
      while (last.length > 0 && ctx.measureText(last + '…').width > maxLineWidth) {
        last = last.slice(0, -1).trim();
      }
      bestLines[maxLines - 1] = last + '…';
    } else {
      bestLines = rawLines;
    }

    // Truncate any single words that exceed maxLineWidth (e.g. 20+ chars)
    bestLines = bestLines.map((line) => {
      if (ctx.measureText(line).width <= maxLineWidth) return line;
      let trimmed = line;
      while (trimmed.length > 1 && ctx.measureText(trimmed + '…').width > maxLineWidth) {
        trimmed = trimmed.slice(0, -1);
      }
      return trimmed + '…';
    });
  }

  const lineHeight = Math.round(finalFontSize * 1.25);
  const totalHeight = bestLines.length * lineHeight;

  return {
    lines: bestLines,
    fontSize: finalFontSize,
    lineHeight,
    totalHeight,
    outerMargin,
  };
}

/**
 * Determines winner strictly based on wheel angle and top pointer (12 o'clock).
 * Canvas 0 rad = 3 o'clock. Top pointer = 3*PI/2 (270°).
 */
export function getWinnerIndex(currentRotation, optionCount) {
  if (optionCount <= 0) return 0;
  const sliceAngle = (2 * Math.PI) / optionCount;
  const pointerAngle = (3 * Math.PI) / 2; // Top 12 o'clock
  const normalizedAngle =
    ((pointerAngle - (currentRotation % (2 * Math.PI))) + 2 * Math.PI) %
    (2 * Math.PI);
  return Math.floor(normalizedAngle / sliceAngle) % optionCount;
}

export class DecisionWheel {
  constructor({ canvas, options = [], onSpinEnd, onSpinStart }) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.options = options.slice(0, 12);
    this.labelLayouts = [];
    this.onSpinEnd = onSpinEnd;
    this.onSpinStart = onSpinStart;

    this.currentRotation = 0;
    this.isSpinning = false;
    this.animId = null;

    this.setupRetina();
    this.precomputeLabels();
    this.setupGestures();
    this.draw();
  }

  setupRetina() {
    const dpr =
      (typeof window !== 'undefined' && window.devicePixelRatio) || 1;
    const rect = this.canvas.getBoundingClientRect
      ? this.canvas.getBoundingClientRect()
      : { width: 380, height: 380 };
    const size = Math.min(rect.width || 380, 420);

    this.width = size;
    this.height = size;
    this.canvas.width = size * dpr;
    this.canvas.height = size * dpr;
    this.ctx.scale(dpr, dpr);
  }

  precomputeLabels() {
    const { ctx, width, height, options } = this;
    const count = options.length;
    if (count < 1) {
      this.labelLayouts = [];
      return;
    }

    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(centerX, centerY) - 8;

    this.labelLayouts = options.map((opt) =>
      computeLabelLayout(opt, count, radius, ctx)
    );
  }

  setOptions(newOptions) {
    this.options = newOptions.slice(0, 12);
    this.precomputeLabels();
    this.draw();
  }

  setupGestures() {
    let startX = 0;
    let startY = 0;
    let startTime = 0;

    this.canvas.addEventListener(
      'touchstart',
      (e) => {
        if (this.isSpinning || this.options.length < 2) return;
        const touch = e.touches[0];
        startX = touch.clientX;
        startY = touch.clientY;
        startTime = performance.now();
      },
      { passive: true }
    );

    this.canvas.addEventListener(
      'touchend',
      (e) => {
        if (this.isSpinning || this.options.length < 2) return;
        const touch = e.changedTouches[0];
        const deltaX = touch.clientX - startX;
        const deltaY = touch.clientY - startY;
        const distance = Math.hypot(deltaX, deltaY);
        const duration = performance.now() - startTime;

        // Swipe / flick detected
        if (distance > 40 && duration < 350) {
          this.spin();
        }
      },
      { passive: true }
    );
  }

  draw() {
    const { ctx, width, height, options, currentRotation, labelLayouts } = this;
    ctx.clearRect(0, 0, width, height);

    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(centerX, centerY) - 8;
    const count = options.length;

    if (count < 1) return;

    const sliceAngle = (2 * Math.PI) / count;

    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(currentRotation);

    // 1. Draw Slices
    for (let i = 0; i < count; i++) {
      const startAngle = i * sliceAngle;
      const endAngle = startAngle + sliceAngle;
      const colorItem = WHEEL_PALETTE[i % WHEEL_PALETTE.length];

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, radius, startAngle, endAngle);
      ctx.closePath();

      ctx.fillStyle = colorItem.bg;
      ctx.fill();

      // Slice perimeter border
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // 2. Draw Slice Text Label
      const layout = labelLayouts[i];
      if (!layout || !layout.lines || layout.lines.length === 0) continue;

      const midAngle = startAngle + sliceAngle / 2;
      // Screen angle relative to viewer (0 = 3 o'clock, PI/2 = 6 o'clock, PI = 9 o'clock, 3PI/2 = 12 o'clock)
      const screenAngle =
        ((currentRotation + midAngle) % (2 * Math.PI) + 2 * Math.PI) %
        (2 * Math.PI);
      // Flip reading direction on the left hemisphere so labels are never upside down
      const shouldFlip = screenAngle > Math.PI / 2 && screenAngle < 1.5 * Math.PI;

      ctx.save();
      ctx.rotate(midAngle);
      ctx.fillStyle = colorItem.text;
      ctx.font = `600 ${layout.fontSize}px Inter, system-ui, sans-serif`;
      ctx.textBaseline = 'middle';

      const xPos = radius - layout.outerMargin;
      const { lines, lineHeight, totalHeight } = layout;

      if (!shouldFlip) {
        // Right hemisphere: text anchored near outer rim, reading outward/inward right-side up
        ctx.textAlign = 'right';
        for (let k = 0; k < lines.length; k++) {
          const y = -(totalHeight / 2) + (k + 0.5) * lineHeight;
          ctx.fillText(lines[k], xPos, y);
        }
      } else {
        // Left hemisphere: rotate 180° around rim anchor so letters are right-side up
        ctx.translate(xPos, 0);
        ctx.rotate(Math.PI);
        ctx.textAlign = 'left';
        for (let k = 0; k < lines.length; k++) {
          const y = -(totalHeight / 2) + (k + 0.5) * lineHeight;
          ctx.fillText(lines[k], 0, y);
        }
      }

      ctx.restore();
    }

    // Outer wheel border (subtle contrast in light mode, crisp accent border in dark mode)
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    const isDark = typeof document !== 'undefined' && document.documentElement.classList.contains('dark');
    ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.25)' : 'rgba(0, 0, 0, 0.15)';
    ctx.lineWidth = 4;
    ctx.stroke();

    ctx.restore();
  }

  spin() {
    if (this.isSpinning || this.options.length < 2) return;

    this.isSpinning = true;
    if (this.onSpinStart) this.onSpinStart();

    const startTime = performance.now();
    const duration = 4500; // 4.5 seconds duration
    const startRotation = this.currentRotation;

    // 4 to 6 full rotations plus random final angle offset
    const fullTurns = (4 + Math.random() * 2) * 2 * Math.PI;
    const extraAngle = Math.random() * 2 * Math.PI;
    const totalRotation = fullTurns + extraAngle;

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic curve: fast start, gradual silky stop
      const ease = 1 - Math.pow(1 - progress, 3);
      this.currentRotation = startRotation + totalRotation * ease;
      this.draw();

      if (progress < 1) {
        this.animId = requestAnimationFrame(animate);
      } else {
        this.isSpinning = false;
        const winnerIndex = getWinnerIndex(
          this.currentRotation,
          this.options.length
        );
        const winner = this.options[winnerIndex];
        if (this.onSpinEnd) {
          this.onSpinEnd({
            winner,
            winnerIndex,
            rotation: this.currentRotation,
          });
        }
      }
    };

    this.animId = requestAnimationFrame(animate);
  }

  resize() {
    this.setupRetina();
    this.precomputeLabels();
    this.draw();
  }

  destroy() {
    if (this.animId) cancelAnimationFrame(this.animId);
  }
}
