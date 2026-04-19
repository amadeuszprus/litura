(function () {
  // Preload the four font stacks referenced by --font-modern / --font-tech /
  // --font-minimal / --font-artistic so the font switcher actually changes
  // something visible.
  const preconnect1 = document.createElement('link');
  preconnect1.rel = 'preconnect';
  preconnect1.href = 'https://fonts.googleapis.com';
  document.head.appendChild(preconnect1);

  const preconnect2 = document.createElement('link');
  preconnect2.rel = 'preconnect';
  preconnect2.href = 'https://fonts.gstatic.com';
  preconnect2.crossOrigin = 'anonymous';
  document.head.appendChild(preconnect2);

  const fonts = document.createElement('link');
  fonts.rel = 'stylesheet';
  fonts.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300..700&family=Poppins:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&family=Source+Serif+4:wght@400;500;600;700&family=IBM+Plex+Sans:wght@300;400;500;600;700&display=swap';
  document.head.appendChild(fonts);

  // Single flat list, alphabetical.
  const items = [
    ['accordion', 'Accordion'],
    ['alert', 'Alert'],
    ['animations', 'Animations'],
    ['badge-label', 'Badge & Label'],
    ['breadcrumb', 'Breadcrumb'],
    ['button', 'Button'],
    ['card', 'Card'],
    ['density', 'Density & Fluid'],
    ['dialog', 'Dialog'],
    ['feature', 'Feature grid'],
    ['form', 'Form'],
    ['hero', 'Hero'],
    ['icon', 'Icon'],
    ['menu', 'Menu'],
    ['nav', 'Nav'],
    ['pricing', 'Pricing'],
    ['stats', 'Stats'],
    ['table', 'Table'],
    ['tabs', 'Tabs'],
    ['testimonial', 'Testimonial'],
    ['toast', 'Toast'],
    ['tooltip', 'Tooltip'],
  ];

  const current = document.body.dataset.page || '';

  // --- Sidebar ---
  const sidebar = document.createElement('aside');
  sidebar.className = 'pg-sidebar';
  sidebar.innerHTML = `<h1><a href="index.html" style="text-decoration:none;color:var(--fg)">Litura playground</a></h1>`;

  const nav = document.createElement('nav');
  for (const [slug, label] of items) {
    const a = document.createElement('a');
    a.href = `${slug}.html`;
    a.textContent = label;
    if (slug === current) a.setAttribute('aria-current', 'page');
    nav.appendChild(a);
  }
  sidebar.appendChild(nav);

  const footer = document.createElement('div');
  footer.className = 'pg-sidebar__footer';
  footer.innerHTML = `
    <a href="../../" class="pg-sidebar__footer-link">← Home</a>
    <a href="../" class="pg-sidebar__footer-link">Templates →</a>`;
  sidebar.appendChild(footer);

  document.body.insertBefore(sidebar, document.body.firstChild);
  document.body.classList.add('pg-shell');

  // --- Theme switcher (top-right) ---
  const switcher = document.createElement('div');
  switcher.className = 'pg-themer';
  switcher.innerHTML = `
    <label>Theme
      <select id="pg-theme">
        <option value="auto">Auto</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="high-contrast">High contrast</option>
        <option value="sepia">Sepia</option>
        <option value="nord">Nord</option>
        <option value="ocean">Ocean</option>
        <option value="rose">Rose</option>
      </select>
    </label>
    <label>Font
      <select id="pg-font">
        <option value="system">System</option>
        <option value="modern">Modern</option>
        <option value="tech">Tech</option>
        <option value="minimal">Minimal</option>
        <option value="artistic">Artistic</option>
      </select>
    </label>
    <label>Density
      <select id="pg-density">
        <option value="normal">Normal</option>
        <option value="compact">Compact</option>
        <option value="spacious">Spacious</option>
      </select>
    </label>`;
  document.body.appendChild(switcher);

  const root = document.documentElement;
  const themeSel = switcher.querySelector('#pg-theme');
  const fontSel = switcher.querySelector('#pg-font');
  const densitySel = switcher.querySelector('#pg-density');

  const savedTheme = localStorage.getItem('litura-theme') || 'auto';
  const savedFont = localStorage.getItem('litura-font') || 'system';
  const savedDensity = localStorage.getItem('litura-density') || 'normal';
  themeSel.value = savedTheme;
  fontSel.value = savedFont;
  densitySel.value = savedDensity;
  applyAttr('data-theme', savedTheme, 'auto');
  applyAttr('data-font', savedFont, 'system');
  applyAttr('data-density', savedDensity, 'normal');

  function applyAttr(attr, value, neutral) {
    if (!value || value === neutral) root.removeAttribute(attr);
    else root.setAttribute(attr, value);
  }
  themeSel.addEventListener('change', e => { localStorage.setItem('litura-theme', e.target.value); applyAttr('data-theme', e.target.value, 'auto'); syncHljsTheme(); });
  fontSel.addEventListener('change', e => { localStorage.setItem('litura-font', e.target.value); applyAttr('data-font', e.target.value, 'system'); });
  densitySel.addEventListener('change', e => { localStorage.setItem('litura-density', e.target.value); applyAttr('data-density', e.target.value, 'normal'); });

  // --- Syntax highlighting via highlight.js CDN (theme-aware) ---
  const DARK_HREF = 'https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.9.0/build/styles/github-dark.min.css';
  const LIGHT_HREF = 'https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.9.0/build/styles/github.min.css';

  const hljsCss = document.createElement('link');
  hljsCss.rel = 'stylesheet';
  hljsCss.id = 'pg-hljs-theme';
  document.head.appendChild(hljsCss);

  const DARK_THEMES = new Set(['dark', 'high-contrast', 'nord']);
  function isDarkTheme() {
    const attr = root.getAttribute('data-theme');
    if (attr) return DARK_THEMES.has(attr);
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  function syncHljsTheme() {
    const dark = isDarkTheme();
    hljsCss.href = dark ? DARK_HREF : LIGHT_HREF;
    root.style.setProperty('--code-bg', dark ? '#0d1117' : '#f6f8fa');
    root.style.setProperty('--code-fg', dark ? '#e6edf3' : '#24292f');
  }
  syncHljsTheme();
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', syncHljsTheme);

  const hljsJs = document.createElement('script');
  hljsJs.src = 'https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.9.0/build/highlight.min.js';
  hljsJs.onload = () => {
    if (window.hljs) document.querySelectorAll('pre code').forEach(b => window.hljs.highlightElement(b));
  };
  document.head.appendChild(hljsJs);
})();
