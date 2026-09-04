/**
 * Shared History & State Management Utility for ToolNest
 * All activity is stored purely in client-side localStorage.
 * Zero servers, zero external network calls, zero accounts.
 */

export const STORAGE_PREFIX = 'toolnest_history_';
export const LAST_STATE_PREFIX = 'toolnest_last_';
export const MAX_ENTRIES = 10;

export const TOOL_ICONS = {
  age: '🎂',
  facts: '🎉',
  wheel: '🎡',
  picker: '🎲',
  countdown: '⏳',
  names: '🏷️',
};

export const TOOL_METADATA = {
  age: { name: 'Age Calculator', href: '/age-calculator', badge: 'Age' },
  facts: { name: 'Birthday Facts', href: '/birthday-facts', badge: 'Facts' },
  wheel: { name: 'Decision Wheel', href: '/decision-wheel', badge: 'Wheel' },
  picker: { name: 'Random Picker', href: '/random-picker', badge: 'Picker' },
  countdown: { name: 'Countdown', href: '/countdown', badge: 'Timer' },
  names: { name: 'Baby Names', href: '/names', badge: 'Names' },
};

/**
 * Safe localStorage accessor that never throws in restricted or private modes
 */
function safeStorage() {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      return window.localStorage;
    }
    if (typeof localStorage !== 'undefined') {
      return localStorage;
    }
  } catch (e) {
    // Restricted or private browsing sandbox
  }
  return null;
}

/**
 * Retrieves history entries for a given tool (newest first, capped at limit).
 * @param {string} toolId
 * @param {number} [limit=10]
 * @returns {Array<{t: string, d: string, x: any}>}
 */
export function getHistory(toolId, limit = MAX_ENTRIES) {
  const storage = safeStorage();
  if (!storage || !toolId) return [];

  try {
    const raw = storage.getItem(`${STORAGE_PREFIX}${toolId}`);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.slice(0, Math.min(MAX_ENTRIES, limit));
  } catch (e) {
    return [];
  }
}

/**
 * Saves a new history entry for a tool.
 * Deduplicates consecutive identical entries and caps storage at 10 items.
 * @param {string} toolId
 * @param {{t: string, d?: string, x?: any}} entry
 */
export function saveHistory(toolId, entry) {
  const storage = safeStorage();
  if (!storage || !toolId || !entry || !entry.t) return;

  try {
    const current = getHistory(toolId, MAX_ENTRIES);
    const newEntry = {
      t: String(entry.t).trim(),
      d: entry.d || new Date().toISOString(),
      x: entry.x || {},
    };

    // Deduplicate consecutive identical entries:
    // If the latest item already has the identical title, remove it so the new one takes the top spot
    const filtered = current.filter((item) => item.t !== newEntry.t);
    const updated = [newEntry, ...filtered].slice(0, MAX_ENTRIES);

    storage.setItem(`${STORAGE_PREFIX}${toolId}`, JSON.stringify(updated));

    // Notify any active history card UI instances to refresh
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('toolnest:history-updated', {
          detail: { toolId, entry: newEntry },
        })
      );
    }
  } catch (e) {
    // Fail silently in private/quota-exceeded contexts
  }
}

/**
 * Removes a single history item by index.
 * @param {string} toolId
 * @param {number} index
 */
export function removeHistoryItem(toolId, index) {
  const storage = safeStorage();
  if (!storage || !toolId) return;

  try {
    const current = getHistory(toolId, MAX_ENTRIES);
    if (index >= 0 && index < current.length) {
      current.splice(index, 1);
      storage.setItem(`${STORAGE_PREFIX}${toolId}`, JSON.stringify(current));

      if (typeof window !== 'undefined') {
        window.dispatchEvent(
          new CustomEvent('toolnest:history-updated', { detail: { toolId } })
        );
      }
    }
  } catch (e) {}
}

/**
 * Clears all history entries for a given tool.
 * @param {string} toolId
 */
export function clearHistory(toolId) {
  const storage = safeStorage();
  if (!storage || !toolId) return;

  try {
    storage.removeItem(`${STORAGE_PREFIX}${toolId}`);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('toolnest:history-updated', { detail: { toolId } })
      );
    }
  } catch (e) {}
}

/**
 * Retrieves the most recent history entries across all tools, sorted chronologically.
 * @param {number} [limit=4]
 * @returns {Array<{toolId: string, toolName: string, href: string, badge: string, t: string, d: string, x: any}>}
 */
export function getAllRecentHistory(limit = 4) {
  const allTools = Object.keys(TOOL_METADATA);
  const combined = [];

  for (const toolId of allTools) {
    const items = getHistory(toolId, limit);
    const meta = TOOL_METADATA[toolId] || { name: toolId, href: `/${toolId}`, badge: toolId };
    for (const item of items) {
      combined.push({
        toolId,
        toolName: meta.name,
        badge: meta.badge,
        href: meta.href,
        t: item.t,
        d: item.d,
        x: item.x,
      });
    }
  }

  combined.sort((a, b) => new Date(b.d).getTime() - new Date(a.d).getTime());
  return combined.slice(0, limit);
}


/**
 * Saves the last input state for a tool (for the "welcome back" prefill effect).
 * @param {string} toolId
 * @param {any} state
 */
export function saveLastState(toolId, state) {
  const storage = safeStorage();
  if (!storage || !toolId || !state) return;

  try {
    storage.setItem(`${LAST_STATE_PREFIX}${toolId}`, JSON.stringify(state));
  } catch (e) {}
}

/**
 * Retrieves the last input state for a tool.
 * @param {string} toolId
 * @returns {any|null}
 */
export function getLastState(toolId) {
  const storage = safeStorage();
  if (!storage || !toolId) return null;

  try {
    const raw = storage.getItem(`${LAST_STATE_PREFIX}${toolId}`);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

/**
 * Formats an ISO date into a human-readable relative time string.
 * Examples: "just now", "5 mins ago", "2 hours ago", "yesterday", "3 days ago"
 * @param {string|Date} dateInput
 * @returns {string}
 */
export function formatRelativeTime(dateInput) {
  if (!dateInput) return '';
  const date = new Date(dateInput);
  if (isNaN(date.getTime())) return '';

  const now = Date.now();
  const diffSec = Math.floor((now - date.getTime()) / 1000);

  if (diffSec < 45) return 'Just now';
  if (diffSec < 90) return '1 min ago';

  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin} mins ago`;

  const diffHours = Math.floor(diffMin / 60);
  if (diffHours === 1) return '1 hour ago';
  if (diffHours < 24) return `${diffHours} hours ago`;

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;

  const diffWeeks = Math.floor(diffDays / 7);
  if (diffWeeks === 1) return '1 week ago';
  if (diffWeeks < 4) return `${diffWeeks} weeks ago`;

  return date.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Initializes and binds a HistoryCard component instance.
 * Handles rendering, auto-expansion, item restoration, row deletion, and inline clear confirmation.
 *
 * @param {object} config
 * @param {string} config.toolId - The unique tool identifier
 * @param {function} [config.onRestore] - Callback invoked when a user clicks a row to restore
 */
export function initHistoryCard(config) {
  if (typeof document === 'undefined' || !config) return;

  const options = typeof config === 'string' ? { toolId: config } : config;
  const { toolId, onRestore } = options;
  if (!toolId) return;

  const card = document.getElementById(`history-card-${toolId}`);
  const toggleBtn = document.getElementById(`history-toggle-${toolId}`);
  const badge = document.getElementById(`history-count-badge-${toolId}`);
  const content = document.getElementById(`history-content-${toolId}`);
  const listEl = document.getElementById(`history-list-${toolId}`);
  const emptyEl = document.getElementById(`history-empty-${toolId}`);
  const chevron = document.getElementById(`history-chevron-${toolId}`);
  const clearPromptBtn = document.getElementById(`history-clear-prompt-${toolId}`);
  const confirmBox = document.getElementById(`history-confirm-box-${toolId}`);
  const confirmYesBtn = document.getElementById(`history-confirm-yes-${toolId}`);
  const confirmNoBtn = document.getElementById(`history-confirm-no-${toolId}`);
  const liveRegion = document.getElementById(`history-live-${toolId}`);

  if (!card || !toggleBtn || !content || !listEl || !emptyEl) return;

  let isExpanded = false;

  function setExpanded(expanded) {
    isExpanded = expanded;
    toggleBtn.setAttribute('aria-expanded', String(expanded));
    if (expanded) {
      content.classList.remove('hidden');
      if (chevron) chevron.classList.add('rotate-180');
    } else {
      content.classList.add('hidden');
      if (chevron) chevron.classList.remove('rotate-180');
    }
  }

  function render() {
    const items = getHistory(toolId);

    // Update count badge
    if (badge) {
      badge.textContent = String(items.length);
      if (items.length > 0) {
        badge.classList.remove('hidden');
      } else {
        badge.classList.add('hidden');
      }
    }

    // Reset inline confirmation box
    if (confirmBox) confirmBox.classList.add('hidden');
    if (clearPromptBtn) {
      if (items.length > 0) {
        clearPromptBtn.classList.remove('hidden');
      } else {
        clearPromptBtn.classList.add('hidden');
      }
    }

    if (items.length === 0) {
      emptyEl.classList.remove('hidden');
      listEl.classList.add('hidden');
      listEl.innerHTML = '';
      return;
    }

    emptyEl.classList.add('hidden');
    listEl.classList.remove('hidden');

    const icon = TOOL_ICONS[toolId] || '🕘';

    listEl.innerHTML = items
      .map(
        (item, idx) => `
      <div class="group flex items-center justify-between p-3 rounded-xl bg-input-light/60 dark:bg-input-dark/60 border border-border-light dark:border-border-dark hover:border-accent/40 transition-colors">
        <button
          type="button"
          class="history-restore-btn flex items-center gap-3 text-left flex-1 min-w-0 py-1 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent rounded-lg"
          data-index="${idx}"
          aria-label="Restore ${item.t}"
        >
          <span class="text-base shrink-0 select-none">${icon}</span>
          <div class="min-w-0 flex-1">
            <div class="text-sm font-semibold text-primary-light dark:text-primary-dark truncate group-hover:text-accent transition-colors">
              ${item.t}
            </div>
            <div class="text-xs text-secondary-light dark:text-secondary-dark">
              ${formatRelativeTime(item.d)}
            </div>
          </div>
          <span class="text-xs font-semibold text-accent opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity flex items-center gap-1 shrink-0 ml-2">
            Restore &rarr;
          </span>
        </button>
        <button
          type="button"
          class="history-delete-btn w-10 h-10 flex items-center justify-center rounded-lg text-secondary-light dark:text-secondary-dark hover:text-red-500 hover:bg-red-500/10 transition-colors shrink-0 ml-2 focus:outline-none focus:ring-2 focus:ring-red-500"
          data-index="${idx}"
          aria-label="Remove '${item.t}' from history"
        >
          <svg class="w-4 h-4 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
    `
      )
      .join('');

    // Bind row restore buttons
    listEl.querySelectorAll('.history-restore-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-index'), 10);
        const entry = items[idx];
        if (entry && onRestore) {
          onRestore(entry.x, entry);
          if (liveRegion) liveRegion.textContent = `Restored ${entry.t}`;
        }
      });
    });

    // Bind row delete buttons
    listEl.querySelectorAll('.history-delete-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const idx = parseInt(btn.getAttribute('data-index'), 10);
        removeHistoryItem(toolId, idx);
        if (liveRegion) liveRegion.textContent = 'Removed item from history.';
        render();
      });
    });
  }

  // Toggle card expansion
  toggleBtn.addEventListener('click', () => {
    setExpanded(!isExpanded);
  });

  // Clear prompt click -> reveal inline confirm
  if (clearPromptBtn && confirmBox) {
    clearPromptBtn.addEventListener('click', () => {
      clearPromptBtn.classList.add('hidden');
      confirmBox.classList.remove('hidden');
      if (confirmYesBtn) confirmYesBtn.focus();
    });
  }

  // Confirm clear yes
  if (confirmYesBtn) {
    confirmYesBtn.addEventListener('click', () => {
      clearHistory(toolId);
      if (liveRegion) liveRegion.textContent = 'All history cleared.';
      render();
    });
  }

  // Confirm clear cancel
  if (confirmNoBtn && clearPromptBtn && confirmBox) {
    confirmNoBtn.addEventListener('click', () => {
      confirmBox.classList.add('hidden');
      clearPromptBtn.classList.remove('hidden');
    });
  }

  // Listen for global history updates
  const updateListener = (e) => {
    if (e.detail?.toolId === toolId) {
      render();
    }
  };
  window.addEventListener('toolnest:history-updated', updateListener);

  // Initial render
  render();

  // Auto-expand if history has entries, otherwise remain collapsed
  const initialItems = getHistory(toolId);
  if (initialItems.length > 0) {
    setExpanded(true);
  } else {
    setExpanded(false);
  }

  return {
    render,
    setExpanded,
  };
}
