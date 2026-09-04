/**
 * ToolNest Global Toast Notification System
 * Accessible, mobile-first, swipe-to-dismiss toast utility.
 */

export function showToast(message, type = 'info', duration = 3000) {
  if (typeof document === 'undefined') return;

  const container = document.getElementById('toolnest-toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toolnest-toast pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-2xl shadow-xl border text-sm font-medium transform translate-y-8 opacity-0 transition-all duration-200 select-none max-w-sm w-full mx-auto sm:mx-0 ${
    type === 'success'
      ? 'bg-emerald-950/90 text-emerald-100 border-emerald-500/30 dark:bg-emerald-900/90'
      : type === 'error'
      ? 'bg-rose-950/90 text-rose-100 border-rose-500/30 dark:bg-rose-900/90'
      : 'bg-surface-light text-primary-light border-border-light shadow-lg dark:bg-surface-dark dark:text-primary-dark dark:border-border-dark'
  }`;

  toast.setAttribute('role', 'status');
  toast.setAttribute('aria-live', 'polite');

  // Icon based on type
  let iconSvg = '';
  if (type === 'success') {
    iconSvg = `<svg class="w-5 h-5 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>`;
  } else if (type === 'error') {
    iconSvg = `<svg class="w-5 h-5 text-rose-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`;
  } else {
    iconSvg = `<svg class="w-5 h-5 text-accent shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`;
  }

  toast.innerHTML = `
    ${iconSvg}
    <span class="flex-1 text-xs sm:text-sm leading-snug">${message}</span>
    <button type="button" class="text-xs opacity-60 hover:opacity-100 focus:outline-none p-1 shrink-0" aria-label="Dismiss">
      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
    </button>
  `;

  container.appendChild(toast);

  // Trigger entry animation
  requestAnimationFrame(() => {
    toast.classList.remove('translate-y-8', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');
  });

  let dismissTimeout = null;
  const dismiss = () => {
    if (dismissTimeout) clearTimeout(dismissTimeout);
    toast.classList.add('translate-y-4', 'opacity-0', 'scale-95');
    setTimeout(() => {
      toast.remove();
    }, 200);
  };

  // Close button click
  const closeBtn = toast.querySelector('button');
  if (closeBtn) {
    closeBtn.addEventListener('click', dismiss);
  }

  // Auto dismiss
  dismissTimeout = setTimeout(dismiss, duration);

  // Touch swipe to dismiss for mobile
  let startY = 0;
  let currentY = 0;
  toast.addEventListener('touchstart', (e) => {
    startY = e.touches[0].clientY;
  }, { passive: true });

  toast.addEventListener('touchmove', (e) => {
    currentY = e.touches[0].clientY;
    const diff = currentY - startY;
    if (diff > 0) {
      toast.style.transform = `translateY(${diff}px)`;
      toast.style.opacity = `${1 - diff / 100}`;
    }
  }, { passive: true });

  toast.addEventListener('touchend', () => {
    const diff = currentY - startY;
    if (diff > 40) {
      dismiss();
    } else {
      toast.style.transform = '';
      toast.style.opacity = '';
    }
  });
}

// Global window attachment for convenience
if (typeof window !== 'undefined') {
  window.toolnestToast = showToast;
}
