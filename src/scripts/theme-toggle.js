/**
 * src/scripts/theme-toggle.js
 * Centralized theme controller for ToolNest.
 * Manages localStorage ('toolnest_theme'), OS system preference sync,
 * aria-labels, icon states, and dispatches 'themechange' custom events.
 */

const STORAGE_KEY = 'toolnest_theme';
const LEGACY_STORAGE_KEY = 'theme';

/**
 * Returns manually stored theme: 'light' | 'dark' | null
 */
export function getStoredTheme() {
  if (typeof localStorage === 'undefined') return null;
  try {
    return localStorage.getItem(STORAGE_KEY) || localStorage.getItem(LEGACY_STORAGE_KEY) || null;
  } catch (e) {
    return null;
  }
}

/**
 * Returns OS preferred theme: 'light' | 'dark'
 */
export function getSystemTheme() {
  if (typeof window === 'undefined' || !window.matchMedia) return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/**
 * Returns the currently active/resolved theme
 */
export function getResolvedTheme() {
  return getStoredTheme() || getSystemTheme();
}

/**
 * Updates UI elements (toggle button aria-label, drawer switch state, etc.)
 * @param {boolean} isDark
 */
export function updateThemeUi(isDark) {
  if (typeof document === 'undefined') return;

  const themeToggleBtn = document.getElementById('theme-toggle');
  const drawerThemeToggleBtn = document.getElementById('drawer-theme-toggle');
  const drawerThemeIcon = document.getElementById('drawer-theme-icon');
  const drawerThemeLabel = document.getElementById('drawer-theme-label');
  const metaThemeColor = document.getElementById('theme-color-meta');

  // Update theme-color meta tag
  if (metaThemeColor) {
    metaThemeColor.setAttribute('content', isDark ? '#111315' : '#F4F5F7');
  }

  // Update header desktop button
  if (themeToggleBtn) {
    const nextModeLabel = isDark ? 'Switch to light mode' : 'Switch to dark mode';
    themeToggleBtn.setAttribute('aria-label', nextModeLabel);
    themeToggleBtn.setAttribute('title', nextModeLabel);
  }

  // Update mobile drawer switch
  if (drawerThemeToggleBtn) {
    drawerThemeToggleBtn.setAttribute('aria-checked', isDark ? 'true' : 'false');
    drawerThemeToggleBtn.setAttribute(
      'aria-label',
      isDark ? 'Switch to light mode' : 'Switch to dark mode'
    );
  }

  if (drawerThemeIcon) {
    drawerThemeIcon.textContent = isDark ? '☀️' : '🌙';
  }

  if (drawerThemeLabel) {
    drawerThemeLabel.textContent = isDark ? 'Light Mode' : 'Dark Mode';
  }
}

/**
 * Applies a theme ('light' or 'dark') to the document and optionally persists it
 * @param {'light'|'dark'} theme
 * @param {boolean} persist
 */
export function applyTheme(theme, persist = false) {
  if (typeof document === 'undefined') return;

  const isDark = theme === 'dark';

  if (isDark) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  if (persist) {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
      localStorage.setItem(LEGACY_STORAGE_KEY, theme);
    } catch (e) {
      // Ignore private browsing storage errors
    }
  }

  updateThemeUi(isDark);

  // Dispatch custom themechange event for canvas/components
  window.dispatchEvent(
    new CustomEvent('themechange', {
      detail: { theme, isDark },
    })
  );
}

/**
 * Toggles between light and dark themes
 */
export function toggleTheme() {
  const isCurrentlyDark = document.documentElement.classList.contains('dark');
  const nextTheme = isCurrentlyDark ? 'light' : 'dark';
  applyTheme(nextTheme, true);
}

/**
 * Initializes theme toggle buttons, live mediaQuery listeners, and synchronizes state.
 * Guarded against double-binding.
 */
let isMediaListenerBound = false;

export function initThemeToggle() {
  if (typeof document === 'undefined') return;

  const currentTheme = getResolvedTheme();
  applyTheme(currentTheme, false);

  const themeToggleBtn = document.getElementById('theme-toggle');
  const drawerThemeToggleBtn = document.getElementById('drawer-theme-toggle');

  // Bind desktop toggle button
  if (themeToggleBtn && !themeToggleBtn.hasAttribute('data-theme-bound')) {
    themeToggleBtn.setAttribute('data-theme-bound', 'true');
    themeToggleBtn.addEventListener('click', () => {
      // Add subtle scale pulse
      themeToggleBtn.classList.add('scale-90');
      setTimeout(() => themeToggleBtn.classList.remove('scale-90'), 150);
      toggleTheme();
    });
  }

  // Bind drawer switch button
  if (drawerThemeToggleBtn && !drawerThemeToggleBtn.hasAttribute('data-theme-bound')) {
    drawerThemeToggleBtn.setAttribute('data-theme-bound', 'true');
    drawerThemeToggleBtn.addEventListener('click', toggleTheme);
  }

  // Live OS preference sync (if user has not explicitly chosen a manual preference)
  if (!isMediaListenerBound && window.matchMedia) {
    isMediaListenerBound = true;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleMediaChange = (e) => {
      const stored = getStoredTheme();
      // If user hasn't explicitly chosen a manual theme, follow OS
      if (!stored) {
        applyTheme(e.matches ? 'dark' : 'light', false);
      }
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleMediaChange);
    } else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleMediaChange);
    }
  }
}
