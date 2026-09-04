class MockElement {
  constructor(tag, id = '') {
    this.tagName = tag;
    this.id = id;
    this.attributes = {};
    this.classList = new Set();
    this.textContent = '';
    this.listeners = {};
  }
  getAttribute(name) { return this.attributes[name] || null; }
  setAttribute(name, val) { this.attributes[name] = String(val); }
  removeAttribute(name) { delete this.attributes[name]; }
  hasAttribute(name) { return name in this.attributes; }
  addEventListener(event, cb) {
    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event].push(cb);
  }
  click() {
    (this.listeners['click'] || []).forEach(cb => cb({}));
  }
}

class MockClassList {
  constructor() { this.classes = new Set(); }
  add(cls) { this.classes.add(cls); }
  remove(cls) { this.classes.delete(cls); }
  contains(cls) { return this.classes.has(cls); }
}

const elements = {
  'theme-color-meta': new MockElement('meta', 'theme-color-meta'),
  'theme-toggle': new MockElement('button', 'theme-toggle'),
  'drawer-theme-toggle': new MockElement('button', 'drawer-theme-toggle'),
  'drawer-theme-icon': new MockElement('span', 'drawer-theme-icon'),
  'drawer-theme-label': new MockElement('span', 'drawer-theme-label'),
};
elements['theme-color-meta'].setAttribute('content', '#F4F5F7');

const htmlElement = new MockElement('html');
htmlElement.classList = new MockClassList();

const localStorageStore = {};
global.localStorage = {
  getItem: (k) => localStorageStore[k] || null,
  setItem: (k, v) => { localStorageStore[k] = String(v); },
  removeItem: (k) => { delete localStorageStore[k]; },
};

global.document = {
  documentElement: htmlElement,
  getElementById: (id) => elements[id] || null,
};

const windowListeners = {};
global.window = {
  matchMedia: () => ({
    matches: false,
    addEventListener: () => {},
  }),
  addEventListener: (event, cb) => {
    if (!windowListeners[event]) windowListeners[event] = [];
    windowListeners[event].push(cb);
  },
  dispatchEvent: (event) => {
    (windowListeners[event.type] || []).forEach(cb => cb(event));
  },
};

global.CustomEvent = class {
  constructor(type, init = {}) {
    this.type = type;
    this.detail = init.detail;
  }
};

const { initThemeToggle, toggleTheme, applyTheme, getStoredTheme } = await import('../src/scripts/theme-toggle.js');

let themeChangeEvents = [];
window.addEventListener('themechange', (e) => {
  themeChangeEvents.push(e.detail);
});

console.log('Testing theme initialization without stored preference (system=light)...');
initThemeToggle();

if (document.documentElement.classList.contains('dark')) {
  throw new Error('Expected light mode initially');
}
if (elements['theme-color-meta'].getAttribute('content') !== '#F4F5F7') {
  throw new Error('Expected light theme-color meta');
}
console.log('✅ Initialized in light mode successfully.');

console.log('Testing toggle to dark mode...');
toggleTheme();

if (!document.documentElement.classList.contains('dark')) {
  throw new Error('Expected dark mode class on <html>');
}
if (elements['theme-color-meta'].getAttribute('content') !== '#111315') {
  throw new Error('Expected dark theme-color meta #111315');
}
if (getStoredTheme() !== 'dark') {
  throw new Error('Expected toolnest_theme to be "dark" in localStorage');
}
if (!themeChangeEvents[themeChangeEvents.length - 1]?.isDark) {
  throw new Error('Expected themechange event with isDark: true');
}
if (elements['theme-toggle'].getAttribute('aria-label') !== 'Switch to light mode') {
  throw new Error('Expected aria-label to update to Switch to light mode');
}
console.log('✅ Toggled to dark mode successfully.');

console.log('Testing toggle back to light mode...');
toggleTheme();

if (document.documentElement.classList.contains('dark')) {
  throw new Error('Expected light mode class removed from <html>');
}
if (elements['theme-color-meta'].getAttribute('content') !== '#F4F5F7') {
  throw new Error('Expected light theme-color meta #F4F5F7');
}
if (getStoredTheme() !== 'light') {
  throw new Error('Expected toolnest_theme to be "light" in localStorage');
}
if (themeChangeEvents[themeChangeEvents.length - 1]?.isDark !== false) {
  throw new Error('Expected themechange event with isDark: false');
}
if (elements['theme-toggle'].getAttribute('aria-label') !== 'Switch to dark mode') {
  throw new Error('Expected aria-label to update to Switch to dark mode');
}
console.log('✅ Toggled back to light mode successfully.');

console.log('\n🎉 Unit test passed with 100% assertions verified!');
