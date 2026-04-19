#!/usr/bin/env node
/**
 * Generate examples/components/<slug>.html pages from a declarative source.
 * Each page: shell with title + sections of live example + code snippet + modifier ref.
 * Run:  node scripts/build-playground.js
 */
const fs = require('node:fs');
const path = require('node:path');
const OUT = path.resolve(__dirname, '..', 'examples', 'components');

const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function example({ title, preview, code, soft, pad }) {
  const cls = ['pg-example__preview'];
  if (soft) cls.push('pg-example__preview--soft');
  if (pad === 'lg') cls.push('pg-example__preview--pad-lg');
  return `<div class="pg-example">
  ${title ? `<div class="pg-example__title">${title}</div>` : ''}
  <div class="${cls.join(' ')}">${preview}</div>
  <pre class="pg-example__code"><code class="language-html">${esc(code.trim())}</code></pre>
</div>`;
}

function ref(rows, { columns = ['Class', 'Effect'] } = {}) {
  return `<table class="pg-ref">
  <thead><tr>${columns.map(c => `<th>${c}</th>`).join('')}</tr></thead>
  <tbody>
    ${rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('\n    ')}
  </tbody>
</table>`;
}

function page({ slug, title, intro, body, extraHead = '', extraScript = '' }) {
  return `<!DOCTYPE html>
<html lang="en" data-theme="auto">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Litura — ${title}</title>
  <link rel="stylesheet" href="../../index.css">
  <link rel="stylesheet" href="_playground.css">
  ${extraHead}
</head>
<body data-page="${slug}">
  <main class="pg-main">
    <header>
      <h1>${title}</h1>
      <p>${intro}</p>
    </header>
    ${body}
  </main>
  <script src="_playground.js"></script>
  ${extraScript}
</body>
</html>
`;
}

const pages = {};

// ---------- Accordion ----------
pages.accordion = page({
  slug: 'accordion',
  title: 'Accordion',
  intro: 'CSS-only, built on <code>&lt;details&gt;</code>/<code>&lt;summary&gt;</code>. No JavaScript required. Chevron rotates when open.',
  body: `
  <h2>Default</h2>
  ${example({
    preview: `<div class="accordion">
  <details class="accordion__item" open>
    <summary class="accordion__header">How do I get started?</summary>
    <div class="accordion__content">Add a <code>&lt;link&gt;</code> to index.css and use the component classes.</div>
  </details>
  <details class="accordion__item">
    <summary class="accordion__header">Does it require JavaScript?</summary>
    <div class="accordion__content">No. Just plain HTML + CSS.</div>
  </details>
  <details class="accordion__item">
    <summary class="accordion__header">What are the variants?</summary>
    <div class="accordion__content"><code>--borderless</code>, <code>--flush</code>.</div>
  </details>
</div>`,
    code: `<div class="accordion">
  <details class="accordion__item" open>
    <summary class="accordion__header">Question</summary>
    <div class="accordion__content">Answer…</div>
  </details>
</div>`
  })}

  <h2>Flush (full-width, no outer frame)</h2>
  ${example({
    preview: `<div class="accordion accordion--flush">
  <details class="accordion__item">
    <summary class="accordion__header">Item one</summary>
    <div class="accordion__content">Content.</div>
  </details>
  <details class="accordion__item">
    <summary class="accordion__header">Item two</summary>
    <div class="accordion__content">Content.</div>
  </details>
</div>`,
    code: `<div class="accordion accordion--flush">…</div>`
  })}

  <h2>Borderless (no container border)</h2>
  ${example({
    preview: `<div class="accordion accordion--borderless">
  <details class="accordion__item" open>
    <summary class="accordion__header">Hello</summary>
    <div class="accordion__content">No frame around the whole thing.</div>
  </details>
</div>`,
    code: `<div class="accordion accordion--borderless">…</div>`
  })}

  <h2>Modifiers</h2>
  ${ref([
    ['<code>.accordion</code>', 'Base container. Rounded border, soft bg.'],
    ['<code>.accordion--borderless</code>', 'Remove outer border.'],
    ['<code>.accordion--flush</code>', 'Remove outer border AND side padding; items span full width.'],
    ['<code>.accordion--animated</code>', 'Animate height on open/close. Requires <code>interpolate-size: allow-keywords</code> (Chrome 129+).'],
    ['<code>.accordion__item</code>', 'Single <code>&lt;details&gt;</code> row.'],
    ['<code>.accordion__header</code>', 'Trigger summary with chevron.'],
    ['<code>.accordion__content</code>', 'Expanded content area.'],
  ])}
  `
});

// ---------- Tabs ----------
pages.tabs = page({
  slug: 'tabs',
  title: 'Tabs',
  intro: 'CSS-only via radio inputs + <code>:has()</code> panel routing. Works without JavaScript; full ARIA needs JS with <code>aria-controls</code>.',
  body: `
  <h2>Default (underline)</h2>
  ${example({
    preview: `<div class="tabs" role="tablist" aria-label="Docs">
  <div class="tabs__list">
    <input type="radio" name="d" id="t1" class="tabs__input" checked>
    <label for="t1" class="tabs__tab" role="tab">Overview</label>
    <input type="radio" name="d" id="t2" class="tabs__input">
    <label for="t2" class="tabs__tab" role="tab">Install</label>
    <input type="radio" name="d" id="t3" class="tabs__input">
    <label for="t3" class="tabs__tab" role="tab">API</label>
  </div>
  <div class="tabs__panel" data-for="t1" role="tabpanel">Minimal content-first CSS library.</div>
  <div class="tabs__panel" data-for="t2" role="tabpanel"><code>npm install litura</code></div>
  <div class="tabs__panel" data-for="t3" role="tabpanel">See the README for all classes.</div>
</div>`,
    code: `<div class="tabs" role="tablist">
  <div class="tabs__list">
    <input type="radio" name="x" id="t1" class="tabs__input" checked>
    <label for="t1" class="tabs__tab" role="tab">One</label>
    <input type="radio" name="x" id="t2" class="tabs__input">
    <label for="t2" class="tabs__tab" role="tab">Two</label>
  </div>
  <div class="tabs__panel" data-for="t1" role="tabpanel">…</div>
  <div class="tabs__panel" data-for="t2" role="tabpanel">…</div>
</div>`
  })}

  <h2>Pills</h2>
  ${example({
    preview: `<div class="tabs tabs--pills" role="tablist">
  <div class="tabs__list">
    <input type="radio" name="p" id="p1" class="tabs__input" checked>
    <label for="p1" class="tabs__tab" role="tab">Daily</label>
    <input type="radio" name="p" id="p2" class="tabs__input">
    <label for="p2" class="tabs__tab" role="tab">Weekly</label>
    <input type="radio" name="p" id="p3" class="tabs__input">
    <label for="p3" class="tabs__tab" role="tab">Monthly</label>
  </div>
  <div class="tabs__panel" data-for="p1" role="tabpanel">Daily view</div>
  <div class="tabs__panel" data-for="p2" role="tabpanel">Weekly view</div>
  <div class="tabs__panel" data-for="p3" role="tabpanel">Monthly view</div>
</div>`,
    code: `<div class="tabs tabs--pills" role="tablist">…</div>`
  })}

  <h2>Vertical</h2>
  ${example({
    preview: `<div class="tabs tabs--vertical" role="tablist">
  <div class="tabs__list">
    <input type="radio" name="v" id="v1" class="tabs__input" checked>
    <label for="v1" class="tabs__tab" role="tab">Section 1</label>
    <input type="radio" name="v" id="v2" class="tabs__input">
    <label for="v2" class="tabs__tab" role="tab">Section 2</label>
    <input type="radio" name="v" id="v3" class="tabs__input">
    <label for="v3" class="tabs__tab" role="tab">Section 3</label>
  </div>
  <div class="tabs__panel" data-for="v1" role="tabpanel">Panel 1</div>
  <div class="tabs__panel" data-for="v2" role="tabpanel">Panel 2</div>
  <div class="tabs__panel" data-for="v3" role="tabpanel">Panel 3</div>
</div>`,
    code: `<div class="tabs tabs--vertical">…</div>`
  })}

  <h2>Modifiers</h2>
  ${ref([
    ['<code>.tabs</code>', 'Base container.'],
    ['<code>.tabs--pills</code>', 'Rounded pills; selected fills with accent.'],
    ['<code>.tabs--vertical</code>', 'Vertical list with right-side indicator.'],
    ['<code>.tabs__list</code>', 'Container for input+label pairs.'],
    ['<code>.tabs__input</code>', 'Hidden radio input (one per tab).'],
    ['<code>.tabs__tab</code>', 'Clickable label (rendered tab).'],
    ['<code>.tabs__panel[data-for="id"]</code>', 'Panel shown when matching input is <code>:checked</code>.'],
  ])}

  <p class="text-sm" style="color:var(--muted);margin-top:var(--size-4)"><strong>Note:</strong> The CSS routes panels for IDs <code>t1</code>–<code>t6</code> out of the box. For unique IDs, extend the <code>:has</code> selector in <code>components/tabs.css</code>.</p>
  `
});

// ---------- Tooltip ----------
pages.tooltip = page({
  slug: 'tooltip',
  title: 'Tooltip',
  intro: 'CSS-only tooltip via a <code>data-tooltip</code> attribute. Shows on <code>:hover</code> and <code>:focus-visible</code>. Always pair with an <code>aria-label</code> — the tooltip is decorative.',
  body: `
  <h2>Four directions</h2>
  ${example({
    pad: 'lg',
    preview: `<div style="display:flex;gap:1rem;flex-wrap:wrap">
  <button class="btn tooltip" data-tooltip="Default — top" aria-label="Info">Top</button>
  <button class="btn btn--ghost tooltip tooltip--bottom" data-tooltip="Bottom" aria-label="Bottom">Bottom</button>
  <button class="btn btn--soft tooltip tooltip--left" data-tooltip="Left side" aria-label="Left">Left</button>
  <button class="btn btn--ghost tooltip tooltip--right" data-tooltip="Right side" aria-label="Right">Right</button>
</div>`,
    code: `<button class="btn tooltip" data-tooltip="Hint" aria-label="Copy">Top</button>
<button class="btn tooltip tooltip--bottom" data-tooltip="Hint">Bottom</button>
<button class="btn tooltip tooltip--left" data-tooltip="Hint">Left</button>
<button class="btn tooltip tooltip--right" data-tooltip="Hint">Right</button>`
  })}

  <h2>Icon buttons with tooltip</h2>
  ${example({
    pad: 'lg',
    preview: `<div style="display:flex;gap:1rem;color:var(--accent)">
  <button class="btn btn--ghost tooltip" data-tooltip="Edit" aria-label="Edit">
    <svg class="icon icon--md icon--stroke" viewBox="0 0 24 24"><path d="M12 20h9M16.5 3.5a2.12 2.12 0 013 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>
  </button>
  <button class="btn btn--ghost tooltip" data-tooltip="Delete" aria-label="Delete">
    <svg class="icon icon--md icon--stroke" viewBox="0 0 24 24"><path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6"/></svg>
  </button>
  <button class="btn btn--ghost tooltip" data-tooltip="Share" aria-label="Share">
    <svg class="icon icon--md icon--stroke" viewBox="0 0 24 24"><path d="M18 8a3 3 0 100-6 3 3 0 000 6zM6 15a3 3 0 100-6 3 3 0 000 6zM18 22a3 3 0 100-6 3 3 0 000 6z"/><path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98"/></svg>
  </button>
</div>`,
    code: `<button class="btn tooltip" data-tooltip="Edit" aria-label="Edit">
  <svg class="icon icon--md">…</svg>
</button>`
  })}

  <h2>Modifiers</h2>
  ${ref([
    ['<code>.tooltip</code>', 'Base; tooltip renders above on <code>[data-tooltip]</code>.'],
    ['<code>.tooltip--top</code>', 'Explicit top (same as default).'],
    ['<code>.tooltip--bottom</code>', 'Tooltip below the element.'],
    ['<code>.tooltip--left</code>', 'Tooltip to the left.'],
    ['<code>.tooltip--right</code>', 'Tooltip to the right.'],
  ])}
  <p class="text-sm" style="color:var(--muted);margin-top:var(--size-3)"><strong>Accessibility:</strong> <code>data-tooltip</code> text is not read by AT. Always add <code>aria-label</code> (or visible text) describing the action.</p>
  `
});

// ---------- Toast ----------
pages.toast = page({
  slug: 'toast',
  title: 'Toast',
  intro: 'Stackable notifications with a left accent bar. Triggered from JavaScript. Auto-dismisses after a timeout of your choice.',
  body: `
  <h2>Live demo</h2>
  ${example({
    preview: `<div class="cluster">
  <button class="btn" onclick="showPgToast('success','Saved','Your changes are live.')">Success</button>
  <button class="btn btn--ghost" onclick="showPgToast('info','Heads up','You have a new message.')">Info</button>
  <button class="btn btn--ghost" onclick="showPgToast('warning','Session expiring','Only 5 minutes left.')">Warning</button>
  <button class="btn btn--ghost" onclick="showPgToast('error','Connection lost','Please retry in a moment.')">Error</button>
</div>
<div class="toast-container toast-container--top-right" role="region" aria-label="Notifications" id="pg-toasts"></div>`,
    code: `<div class="toast-container toast-container--top-right" role="region" aria-label="Notifications">
  <div class="toast toast--success" role="status">
    <span class="toast__icon">✓</span>
    <div class="toast__body">
      <p class="toast__title">Saved</p>
      <p class="toast__message">Your changes are live.</p>
    </div>
    <button class="toast__close" aria-label="Dismiss">×</button>
  </div>
</div>`
  })}

  <h2>Tones (static preview)</h2>
  ${example({
    soft: true,
    preview: `<div style="display:flex;flex-direction:column;gap:var(--size-2);max-width:24rem">
  <div class="toast toast--info" role="status" style="animation:none"><span class="toast__icon">i</span><div class="toast__body"><p class="toast__title">Info</p><p class="toast__message">An informational message.</p></div><button class="toast__close" aria-label="Dismiss" type="button">×</button></div>
  <div class="toast toast--success" role="status" style="animation:none"><span class="toast__icon">✓</span><div class="toast__body"><p class="toast__title">Success</p><p class="toast__message">Operation completed.</p></div><button class="toast__close" aria-label="Dismiss" type="button">×</button></div>
  <div class="toast toast--warning" role="status" style="animation:none"><span class="toast__icon">!</span><div class="toast__body"><p class="toast__title">Warning</p><p class="toast__message">Requires your attention.</p></div><button class="toast__close" aria-label="Dismiss" type="button">×</button></div>
  <div class="toast toast--error" role="alert" style="animation:none"><span class="toast__icon">✕</span><div class="toast__body"><p class="toast__title">Error</p><p class="toast__message">Something went wrong.</p></div><button class="toast__close" aria-label="Dismiss" type="button">×</button></div>
</div>`,
    code: `<div class="toast toast--info"    role="status">…</div>
<div class="toast toast--success" role="status">…</div>
<div class="toast toast--warning" role="status">…</div>
<div class="toast toast--error"   role="alert">…</div>`
  })}

  <h2>Modifiers</h2>
  ${ref([
    ['<code>.toast-container</code>', 'Fixed container. Position via modifier below.'],
    ['<code>.toast-container--top-right</code>', 'Top-right corner (default).'],
    ['<code>.toast-container--top-left</code>', 'Top-left corner.'],
    ['<code>.toast-container--top-center</code>', 'Top, horizontally centered.'],
    ['<code>.toast-container--bottom-right</code>', 'Bottom-right corner.'],
    ['<code>.toast-container--bottom-left</code>', 'Bottom-left corner.'],
    ['<code>.toast-container--bottom-center</code>', 'Bottom, horizontally centered.'],
    ['<code>.toast</code>', 'Single toast.'],
    ['<code>.toast--info / --success / --warning / --error</code>', 'Tonal left accent bar.'],
    ['<code>.toast--dismissing</code>', 'Triggers exit animation before removal.'],
    ['<code>.toast__icon / __body / __title / __message / __close</code>', 'Sub-elements.'],
  ])}
  `,
  extraScript: `<script>
    function showPgToast(tone, title, msg) {
      const el = document.createElement('div');
      el.className = 'toast toast--' + tone;
      el.setAttribute('role', tone === 'error' ? 'alert' : 'status');
      const icon = { success: '✓', error: '✕', warning: '!', info: 'i' }[tone];
      el.innerHTML = '<span class="toast__icon">' + icon + '</span>' +
        '<div class="toast__body"><p class="toast__title">' + title + '</p><p class="toast__message">' + msg + '</p></div>' +
        '<button class="toast__close" aria-label="Dismiss">×</button>';
      el.querySelector('.toast__close').addEventListener('click', () => dismissPgToast(el));
      document.getElementById('pg-toasts').appendChild(el);
      setTimeout(() => dismissPgToast(el), 4000);
    }
    function dismissPgToast(el) {
      if (!el || el.classList.contains('toast--dismissing')) return;
      el.classList.add('toast--dismissing');
      setTimeout(() => el.remove(), 250);
    }
  </script>`
});

// ---------- Animations ----------
pages.animations = page({
  slug: 'animations',
  title: 'Animations',
  intro: 'Keyframes + <code>.animate-*</code>, <code>.hover-*</code> utilities and a skeleton loader. All honor <code>prefers-reduced-motion</code>.',
  body: `
  <h2>Entrance (click card to replay)</h2>
  ${example({
    preview: `<div class="grid md:grid-cols-3 gap-3">
  <button class="card card--interactive animate-fade-in" onclick="pgReplay(this,'animate-fade-in')"><div class="card__body"><strong>animate-fade-in</strong><p class="text-sm text-muted">opacity 0→1, 300ms</p></div></button>
  <button class="card card--interactive animate-slide-up" onclick="pgReplay(this,'animate-slide-up')"><div class="card__body"><strong>animate-slide-up</strong><p class="text-sm text-muted">translateY .75rem→0</p></div></button>
  <button class="card card--interactive animate-slide-down" onclick="pgReplay(this,'animate-slide-down')"><div class="card__body"><strong>animate-slide-down</strong><p class="text-sm text-muted">translateY -.75rem→0</p></div></button>
  <button class="card card--interactive animate-slide-left" onclick="pgReplay(this,'animate-slide-left')"><div class="card__body"><strong>animate-slide-left</strong><p class="text-sm text-muted">translateX .75rem→0</p></div></button>
  <button class="card card--interactive animate-slide-right" onclick="pgReplay(this,'animate-slide-right')"><div class="card__body"><strong>animate-slide-right</strong><p class="text-sm text-muted">translateX -.75rem→0</p></div></button>
  <button class="card card--interactive animate-scale-in" onclick="pgReplay(this,'animate-scale-in')"><div class="card__body"><strong>animate-scale-in</strong><p class="text-sm text-muted">scale .95→1</p></div></button>
</div>`,
    code: `<div class="animate-fade-in">Fade in</div>
<div class="animate-slide-up">Slide up</div>
<div class="animate-slide-up animate-delay-150">Slide up, delayed</div>`
  })}

  <h2>Loops</h2>
  ${example({
    preview: `<div class="cluster">
  <span class="badge animate-pulse">pulse</span>
  <span class="badge badge--success animate-bounce">bounce</span>
  <span class="badge badge--info animate-ping">ping</span>
  <span class="badge badge--error animate-shake">shake</span>
  <svg class="icon icon--xl animate-spin" style="color:var(--accent)" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="3" stroke-dasharray="14 40"/></svg>
</div>`,
    code: `<span class="animate-pulse">Pulse</span>
<span class="animate-bounce">Bounce</span>
<span class="animate-ping">Ping</span>
<span class="animate-shake">Shake</span>
<svg class="icon animate-spin">…</svg>`
  })}

  <h2>Stagger (delays)</h2>
  ${example({
    preview: `<div class="grid md:grid-cols-4 gap-3">
  <div class="stat-card animate-slide-up animate-delay-0"><span class="stat-number">01</span><span class="text-muted">delay-0</span></div>
  <div class="stat-card animate-slide-up animate-delay-150"><span class="stat-number">02</span><span class="text-muted">delay-150</span></div>
  <div class="stat-card animate-slide-up animate-delay-300"><span class="stat-number">03</span><span class="text-muted">delay-300</span></div>
  <div class="stat-card animate-slide-up animate-delay-500"><span class="stat-number">04</span><span class="text-muted">delay-500</span></div>
</div>`,
    code: `<div class="animate-slide-up animate-delay-0">…</div>
<div class="animate-slide-up animate-delay-75">…</div>
<div class="animate-slide-up animate-delay-150">…</div>
<div class="animate-slide-up animate-delay-300">…</div>
<div class="animate-slide-up animate-delay-500">…</div>
<div class="animate-slide-up animate-delay-700">…</div>`
  })}

  <h2>Hover micro-interactions</h2>
  ${example({
    preview: `<div class="cluster">
  <button class="btn hover-lift">hover-lift</button>
  <button class="btn btn--ghost hover-grow">hover-grow</button>
  <button class="btn btn--soft hover-glow">hover-glow</button>
</div>`,
    code: `<button class="btn hover-lift">Lift</button>
<button class="btn hover-grow">Grow</button>
<button class="btn hover-glow">Glow</button>`
  })}

  <h2>Skeleton loader</h2>
  ${example({
    preview: `<div class="card" style="max-width:28rem">
  <div class="card__body">
    <div class="skeleton" style="height:1.25rem;width:70%">&nbsp;</div>
    <div class="skeleton mt-2" style="height:0.875rem;width:90%">&nbsp;</div>
    <div class="skeleton mt-2" style="height:0.875rem;width:50%">&nbsp;</div>
  </div>
</div>`,
    code: `<div class="skeleton" style="height:1rem;width:80%">&nbsp;</div>`
  })}

  <h2>Reference</h2>
  ${ref([
    ['<code>.animate-fade-in / -fade-out</code>', 'opacity transitions'],
    ['<code>.animate-slide-up / -down / -left / -right</code>', '0.75rem translate + fade'],
    ['<code>.animate-scale-in / -scale-out</code>', 'scale 0.95 ↔ 1 + fade'],
    ['<code>.animate-pulse</code>', 'opacity 1→.5→1, infinite'],
    ['<code>.animate-ping</code>', 'scale(2) + fade, infinite'],
    ['<code>.animate-bounce</code>', 'vertical bounce'],
    ['<code>.animate-spin</code>', '360° rotate, infinite'],
    ['<code>.animate-shake</code>', 'horizontal shake, single-shot'],
    ['<code>.animate-delay-{0,75,150,300,500,700}</code>', 'animation-delay'],
    ['<code>.animate-once / -infinite</code>', 'iteration-count'],
    ['<code>.hover-lift / -grow / -glow</code>', 'hover micro-interactions'],
    ['<code>.skeleton</code>', 'shimmer loader background'],
  ])}
  `,
  extraScript: `<script>function pgReplay(el,cls){el.classList.remove(cls);void el.offsetWidth;el.classList.add(cls);}</script>`
});

// ---------- Icon ----------
pages.icon = page({
  slug: 'icon',
  title: 'Icon',
  intro: 'Base <code>.icon</code> class (1em × 1em, inherits <code>currentColor</code> for fill + stroke) plus sizes and modifiers.',
  body: `
  <h2>Sizes</h2>
  ${example({
    preview: `<div style="display:flex;align-items:end;gap:1rem;color:var(--accent)">
  <span style="display:flex;flex-direction:column;align-items:center;gap:2px"><svg class="icon icon--xs" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg><small>xs</small></span>
  <span style="display:flex;flex-direction:column;align-items:center;gap:2px"><svg class="icon icon--sm" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg><small>sm</small></span>
  <span style="display:flex;flex-direction:column;align-items:center;gap:2px"><svg class="icon icon--md" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg><small>md</small></span>
  <span style="display:flex;flex-direction:column;align-items:center;gap:2px"><svg class="icon icon--lg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg><small>lg</small></span>
  <span style="display:flex;flex-direction:column;align-items:center;gap:2px"><svg class="icon icon--xl" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg><small>xl</small></span>
  <span style="display:flex;flex-direction:column;align-items:center;gap:2px"><svg class="icon icon--2xl" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg><small>2xl</small></span>
</div>`,
    code: `<svg class="icon icon--lg" viewBox="0 0 24 24">…</svg>`
  })}

  <h2>Stroke variant</h2>
  ${example({
    preview: `<div style="display:flex;gap:1rem;color:var(--accent)">
  <svg class="icon icon--xl icon--stroke" viewBox="0 0 24 24"><path d="M5 12l5 5L20 7"/></svg>
  <svg class="icon icon--xl icon--stroke" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
  <svg class="icon icon--xl icon--stroke" viewBox="0 0 24 24"><path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6"/></svg>
</div>`,
    code: `<svg class="icon icon--xl icon--stroke" viewBox="0 0 24 24">
  <path d="…"/>
</svg>`
  })}

  <h2>Spin (loader)</h2>
  ${example({
    preview: `<div style="display:flex;gap:1rem;align-items:center;color:var(--accent)">
  <svg class="icon icon--xl icon--stroke icon--spin" viewBox="0 0 24 24"><path d="M12 3a9 9 0 1 0 9 9"/></svg>
  <span class="text-muted">Loading…</span>
</div>`,
    code: `<svg class="icon icon--xl icon--stroke icon--spin">…</svg>`
  })}

  <h2>Inside a button</h2>
  ${example({
    preview: `<div class="cluster">
  <button class="btn"><svg class="icon icon--sm icon--stroke" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg> Add</button>
  <button class="btn btn--ghost"><svg class="icon icon--sm icon--stroke" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg> Save</button>
</div>`,
    code: `<button class="btn"><svg class="icon icon--sm icon--stroke">…</svg> Add</button>`
  })}

  <h2>Modifiers</h2>
  ${ref([
    ['<code>.icon</code>', 'Base. 1em × 1em, fill + stroke = currentColor, vertical-align −0.125em.'],
    ['<code>.icon--xs / sm / md / lg / xl / 2xl</code>', '0.75 / 0.875 / 1 / 1.25 / 1.5 / 2 em.'],
    ['<code>.icon--stroke</code>', 'fill: none; stroke-width: 1.5; round line cap/join.'],
    ['<code>.icon--spin</code>', 'Applies the <code>spin</code> keyframe.'],
  ])}
  `
});

// ---------- Density & Fluid ----------
pages.density = page({
  slug: 'density',
  title: 'Density & Fluid typography',
  intro: '<code>data-density</code> on <code>&lt;html&gt;</code> scales every <code>--size-*</code> token. <code>data-typo="fixed"</code> disables the fluid <code>clamp()</code> scale.',
  body: `
  <div style="display:flex;gap:var(--size-2);padding:var(--size-3);background:var(--soft);border-radius:var(--radius-2);margin-bottom:var(--size-4);flex-wrap:wrap;align-items:center">
    <strong>Density:</strong>
    <button class="btn btn--ghost" onclick="document.documentElement.removeAttribute('data-density')">Normal</button>
    <button class="btn btn--ghost" onclick="document.documentElement.dataset.density='compact'">Compact</button>
    <button class="btn btn--ghost" onclick="document.documentElement.dataset.density='spacious'">Spacious</button>
    <strong style="margin-left:var(--size-3)">Typo:</strong>
    <button class="btn btn--ghost" onclick="document.documentElement.removeAttribute('data-typo')">Fluid</button>
    <button class="btn btn--ghost" onclick="document.documentElement.dataset.typo='fixed'">Fixed</button>
  </div>

  <h2>Type scale</h2>
  ${example({
    preview: `<div>
  <h1 class="text-5xl">text-5xl</h1>
  <h2 class="text-4xl">text-4xl</h2>
  <h3 class="text-3xl">text-3xl</h3>
  <h4 class="text-2xl">text-2xl</h4>
  <p class="text-lg">text-lg — paragraph</p>
  <p class="text-base">text-base — body</p>
  <p class="text-sm text-muted">text-sm — small</p>
</div>`,
    code: `<html data-typo="fixed"> <!-- disables fluid scaling -->`
  })}

  <h2>Spacing under density</h2>
  ${example({
    soft: true,
    preview: `<div class="grid md:grid-cols-3 gap-3">
  <div class="card"><div class="card__body">Card 1</div></div>
  <div class="card"><div class="card__body">Card padding scales with density.</div></div>
  <div class="card"><div class="card__body">Try compact or spacious above.</div></div>
</div>`,
    code: `<html data-density="compact">   <!-- ~80% spacing -->
<html data-density="spacious">  <!-- ~120% spacing -->`
  })}

  <h2>Attribute reference</h2>
  ${ref([
    ['<code>data-density="compact"</code>', 'All <code>--size-1…-10</code> tokens scaled down ~80%.'],
    ['<code>data-density="spacious"</code>', 'All size tokens scaled up ~120%.'],
    ['<code>data-typo="fixed"</code>', 'Locks <code>--text-*</code> to static rem values (disables <code>clamp()</code>).'],
    ['<code>data-theme="dark"</code>', 'Force dark scheme (plus <code>light / high-contrast / sepia / nord / ocean / rose</code>).'],
    ['<code>data-font="modern"</code>', 'Swap font stack (<code>modern / tech / minimal / artistic</code>).'],
  ], { columns: ['Attribute', 'Effect'] })}
  `
});

// ---------- Button ----------
pages.button = page({
  slug: 'button',
  title: 'Button',
  intro: 'Primary action button with ghost (outline) and soft (15% accent tint) variants. Disabled state via the <code>disabled</code> attribute.',
  body: `
  <h2>Variants</h2>
  ${example({
    preview: `<div class="cluster">
  <button class="btn">Primary</button>
  <button class="btn btn--ghost">Ghost</button>
  <button class="btn btn--soft">Soft</button>
  <button class="btn" disabled>Disabled</button>
</div>`,
    code: `<button class="btn">Primary</button>
<button class="btn btn--ghost">Ghost</button>
<button class="btn btn--soft">Soft</button>
<button class="btn" disabled>Disabled</button>`
  })}

  <h2>With icon</h2>
  ${example({
    preview: `<div class="cluster">
  <button class="btn"><svg class="icon icon--sm icon--stroke" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg> Add</button>
  <button class="btn btn--ghost">Download <svg class="icon icon--sm icon--stroke" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg></button>
</div>`,
    code: `<button class="btn">
  <svg class="icon icon--sm">…</svg> Label
</button>`
  })}

  <h2>As a link</h2>
  ${example({
    preview: `<div class="cluster">
  <a href="#" class="btn">Link button</a>
  <a href="#" class="btn btn--soft">Soft link</a>
</div>`,
    code: `<a href="#" class="btn">Click me</a>`
  })}

  <h2>Modifiers</h2>
  ${ref([
    ['<code>.btn</code>', 'Base — solid accent background, accent-fg text.'],
    ['<code>.btn--ghost</code>', 'Transparent background + accent border/text.'],
    ['<code>.btn--soft</code>', '15% accent tint background + accent text.'],
    ['<code>[disabled]</code>', 'Reduces opacity and disables pointer.'],
  ])}
  `
});

// ---------- Card ----------
pages.card = page({
  slug: 'card',
  title: 'Card',
  intro: 'Flexible container with header / media / body / footer sub-elements. Visual and layout variants.',
  body: `
  <h2>Default</h2>
  ${example({
    preview: `<div class="card" style="max-width:22rem">
  <div class="card__header">
    <div>
      <h3 class="card__title">Card title</h3>
      <p class="card__subtitle">Subtitle</p>
    </div>
  </div>
  <div class="card__body">Body content goes here.</div>
  <div class="card__footer">
    <button class="btn btn--ghost">Cancel</button>
    <button class="btn">Action</button>
  </div>
</div>`,
    code: `<div class="card">
  <div class="card__header">
    <h3 class="card__title">Title</h3>
    <p class="card__subtitle">Subtitle</p>
  </div>
  <div class="card__body">Content</div>
  <div class="card__footer">Actions</div>
</div>`
  })}

  <h2>With media (flush to edges)</h2>
  ${example({
    preview: `<div class="card" style="max-width:22rem">
  <div class="card__media">
    <div style="aspect-ratio:16/9;background:linear-gradient(135deg,var(--accent),color-mix(in oklch,var(--accent) 40%,var(--bg)))"></div>
  </div>
  <div class="card__body">
    <h3 class="card__title">Media card</h3>
    <p class="text-sm text-muted">Media reaches the card edges via a negative margin.</p>
  </div>
</div>`,
    code: `<div class="card">
  <div class="card__media">
    <img src="..." alt="...">
  </div>
  <div class="card__body">…</div>
</div>`
  })}

  <h2>Visual variants</h2>
  ${example({
    preview: `<div class="grid md:grid-cols-2 gap-3">
  <div class="card card--soft"><div class="card__body"><strong>Soft</strong><p class="text-muted">Tinted background.</p></div></div>
  <div class="card card--elevated"><div class="card__body"><strong>Elevated</strong><p class="text-muted">Shadow-lg.</p></div></div>
  <div class="card card--accented"><div class="card__body"><strong>Accented</strong><p class="text-muted">Top accent line.</p></div></div>
  <div class="card card--interactive"><div class="card__body"><strong>Interactive</strong><p class="text-muted">Hover: lift + shadow.</p></div></div>
</div>`,
    code: `<div class="card card--elevated">…</div>
<div class="card card--accented">…</div>
<div class="card card--interactive">…</div>`
  })}

  <h2>Horizontal layout</h2>
  ${example({
    preview: `<div class="card card--horizontal" style="max-width:32rem">
  <div class="card__media" style="width:8rem">
    <div style="height:100%;background:var(--accent)"></div>
  </div>
  <div class="card__body">
    <h3 class="card__title">Horizontal</h3>
    <p class="text-muted">Media left, body right.</p>
  </div>
</div>`,
    code: `<div class="card card--horizontal">
  <div class="card__media">…</div>
  <div class="card__body">…</div>
</div>`
  })}

  <h2>Modifiers</h2>
  ${ref([
    ['<code>.card</code>', 'Base — padded, bordered, max-width 36rem.'],
    ['<code>.card--soft</code>', 'Tinted background (<code>--soft</code>).'],
    ['<code>.card--elevated</code>', 'Drop shadow (<code>--shadow-lg</code>).'],
    ['<code>.card--glass</code>', 'Translucent bg + backdrop blur.'],
    ['<code>.card--interactive</code>', 'Hover: translateY(-1px) + shadow.'],
    ['<code>.card--accented</code>', 'Top 3px accent border.'],
    ['<code>.card--bordered / --borderless</code>', 'Toggle base border.'],
    ['<code>.card--horizontal</code>', 'Media left, body right.'],
    ['<code>.card--compact / --spacious</code>', 'Scale padding down / up.'],
    ['<code>.card--fluid</code>', 'Remove max-width.'],
    ['<code>.card--narrow / --wide</code>', 'Set max-width to 24rem / 48rem.'],
    ['<code>.card--centered</code>', 'Auto margin-inline.'],
    ['<code>.card--stretch</code>', 'Stretch to grid cell height.'],
    ['<code>.card__header / __title / __subtitle / __media / __body / __footer</code>', 'Sub-elements.'],
  ])}
  `
});

// ---------- Alert ----------
pages.alert = page({
  slug: 'alert',
  title: 'Alert',
  intro: 'Inline messages with a tone + optional icon. Solid variants and size modifiers available.',
  body: `
  <h2>Tonal variants (subtle)</h2>
  ${example({
    preview: `<div style="display:flex;flex-direction:column;gap:var(--size-2)">
  <div class="alert alert--info" role="status"><div class="alert__content"><p class="alert__title">Info</p><p class="alert__message">An informational message.</p></div></div>
  <div class="alert alert--success" role="status"><div class="alert__content"><p class="alert__title">Success</p><p class="alert__message">Operation succeeded.</p></div></div>
  <div class="alert alert--warning" role="alert"><div class="alert__content"><p class="alert__title">Warning</p><p class="alert__message">Take note.</p></div></div>
  <div class="alert alert--error" role="alert"><div class="alert__content"><p class="alert__title">Error</p><p class="alert__message">Something went wrong.</p></div></div>
</div>`,
    code: `<div class="alert alert--info" role="status">
  <div class="alert__content">
    <p class="alert__title">Info</p>
    <p class="alert__message">Message.</p>
  </div>
</div>`
  })}

  <h2>Solid</h2>
  ${example({
    preview: `<div style="display:flex;flex-direction:column;gap:var(--size-2)">
  <div class="alert alert--info-solid"><div class="alert__content"><p class="alert__title">Info solid</p></div></div>
  <div class="alert alert--success-solid"><div class="alert__content"><p class="alert__title">Success solid</p></div></div>
  <div class="alert alert--warning-solid"><div class="alert__content"><p class="alert__title">Warning solid</p></div></div>
  <div class="alert alert--error-solid"><div class="alert__content"><p class="alert__title">Error solid</p></div></div>
</div>`,
    code: `<div class="alert alert--info-solid">…</div>`
  })}

  <h2>Sizes</h2>
  ${example({
    preview: `<div style="display:flex;flex-direction:column;gap:var(--size-2)">
  <div class="alert alert--info alert--small"><div class="alert__content"><p class="alert__message">Small alert</p></div></div>
  <div class="alert alert--info"><div class="alert__content"><p class="alert__message">Default</p></div></div>
  <div class="alert alert--info alert--large"><div class="alert__content"><p class="alert__title">Large</p><p class="alert__message">With title and extra padding.</p></div></div>
</div>`,
    code: `<div class="alert alert--small">…</div>
<div class="alert alert--large">…</div>`
  })}

  <h2>Modifiers</h2>
  ${ref([
    ['<code>.alert</code>', 'Base. Defaults to info tone.'],
    ['<code>.alert--info / --success / --warning / --error</code>', 'Subtle tonal variant.'],
    ['<code>.alert--info-solid / ...-solid</code>', 'Solid bg, white text.'],
    ['<code>.alert--small / --large</code>', 'Scale padding + font.'],
    ['<code>.alert--no-icon / --no-close</code>', 'Hide icon or close button.'],
    ['<code>.alert--auto-dismiss</code>', 'Shows progress bar (pair with JS timeout).'],
    ['<code>.alert--dismissing</code>', 'Triggers exit animation.'],
    ['<code>.alert__icon / __content / __title / __message / __close</code>', 'Sub-elements.'],
    ['<code>.alert-container--{top,bottom}-{left,right,center}</code>', 'Floating toast-style container.'],
  ])}
  `
});

// ---------- Badge & Label ----------
pages['badge-label'] = page({
  slug: 'badge-label',
  title: 'Badge & Label',
  intro: 'Tiny inline markers. Badge — denser and bolder. Label — slightly roomier. Both share the same tone system.',
  body: `
  <h2>Badge — subtle tones</h2>
  ${example({
    preview: `<div class="cluster">
  <span class="badge">default</span>
  <span class="badge badge--info">info</span>
  <span class="badge badge--success">success</span>
  <span class="badge badge--warning">warning</span>
  <span class="badge badge--error">error</span>
</div>`,
    code: `<span class="badge badge--success">New</span>`
  })}

  <h2>Badge — solid + pill</h2>
  ${example({
    preview: `<div class="cluster">
  <span class="badge badge--info-solid">info solid</span>
  <span class="badge badge--success-solid badge--pill">success pill</span>
  <span class="badge badge--warning-solid">warning</span>
  <span class="badge badge--error-solid badge--pill">urgent</span>
</div>`,
    code: `<span class="badge badge--success-solid badge--pill">Live</span>`
  })}

  <h2>Badge — sizes & dot</h2>
  ${example({
    preview: `<div class="cluster items-center">
  <span class="badge badge--info badge--small">small</span>
  <span class="badge badge--info">default</span>
  <span class="badge badge--info badge--large">large</span>
  <span class="badge badge--dot badge--success"></span>
  <span class="badge badge--dot badge--warning"></span>
  <span class="badge badge--dot badge--error"></span>
</div>`,
    code: `<span class="badge badge--dot badge--success"></span>`
  })}

  <h2>Label</h2>
  ${example({
    preview: `<div class="cluster">
  <span class="label">default</span>
  <span class="label label--info">info</span>
  <span class="label label--success">success</span>
  <span class="label label--warning">warning</span>
  <span class="label label--error">error</span>
  <span class="label label--info label--pill">pill</span>
</div>`,
    code: `<span class="label label--info label--pill">Info</span>`
  })}

  <h2>Modifiers</h2>
  ${ref([
    ['<code>.badge / .label</code>', 'Base markers.'],
    ['<code>.{badge,label}--info / --success / --warning / --error</code>', 'Subtle tone.'],
    ['<code>.{badge,label}--info-solid / ...-solid</code>', 'Solid tone.'],
    ['<code>.{badge,label}--pill</code>', 'Fully rounded.'],
    ['<code>.{badge,label}--small / --large</code>', 'Size variants.'],
    ['<code>.badge--dot</code>', 'Round 0.5rem dot. Compose with a tone class.'],
    ['<code>.{badge,label}__icon</code>', 'Leading SVG icon slot.'],
  ])}
  `
});

// ---------- Dialog ----------
pages.dialog = page({
  slug: 'dialog',
  title: 'Dialog',
  intro: 'Built on the native <code>&lt;dialog&gt;</code> element — the browser handles focus trap + ESC to close. Entry via <code>@starting-style</code> with a keyframe fallback.',
  body: `
  <h2>Basic</h2>
  ${example({
    preview: `<button class="btn" onclick="document.getElementById('pg-dialog').showModal()">Open dialog</button>
<dialog class="dialog" id="pg-dialog">
  <div class="dialog__content">
    <header class="dialog__header">
      <h3 class="dialog__title">Confirm action</h3>
      <button class="dialog__close" onclick="this.closest('dialog').close()" aria-label="Close"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6l12 12M6 18L18 6"/></svg></button>
    </header>
    <div class="dialog__body">
      <p>Are you sure you want to continue?</p>
    </div>
    <footer class="dialog__footer">
      <button class="btn btn--ghost" onclick="this.closest('dialog').close()">Cancel</button>
      <button class="btn" onclick="this.closest('dialog').close()">Confirm</button>
    </footer>
  </div>
</dialog>`,
    code: `<dialog class="dialog" id="d1">
  <div class="dialog__content">
    <header class="dialog__header">
      <h3 class="dialog__title">Title</h3>
      <button class="dialog__close">×</button>
    </header>
    <div class="dialog__body">Content</div>
    <footer class="dialog__footer">Actions</footer>
  </div>
</dialog>
<script>d1.showModal()</script>`
  })}

  <h2>Modifiers</h2>
  ${ref([
    ['<code>dialog.dialog</code>', 'Base — use the native element.'],
    ['<code>.dialog--small / --large</code>', 'Max-width 20rem / 48rem.'],
    ['<code>.dialog--fullscreen</code>', 'Covers the viewport.'],
    ['<code>.dialog--no-header / --no-footer</code>', 'Hide sub-regions.'],
    ['<code>.dialog--enhanced</code>', 'Heavier shadow + ring.'],
    ['<code>.dialog__header / __title / __body / __footer / __close</code>', 'Sub-elements.'],
  ])}
  <p class="text-sm" style="color:var(--muted);margin-top:var(--size-3)">Open with <code>dialogEl.showModal()</code> (traps focus) or <code>dialogEl.show()</code> (no backdrop). Close with <code>dialogEl.close()</code>.</p>
  `
});

// ---------- Menu ----------
pages.menu = page({
  slug: 'menu',
  title: 'Menu',
  intro: 'Dropdown built on <code>&lt;details&gt;</code>. Works without JS; the optional <code>js/menu-enhancement.js</code> adds click-outside-to-close.',
  body: `
  <h2>Basic</h2>
  ${example({
    pad: 'lg',
    preview: `<details class="menu">
  <summary class="menu__trigger">
    Actions
    <svg class="menu__arrow" fill="currentColor" viewBox="0 0 20 20" width="16" height="16"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
  </summary>
  <div class="menu__content">
    <div class="menu__item"><a href="#" class="menu__link">Edit</a></div>
    <div class="menu__item"><a href="#" class="menu__link">Copy</a></div>
    <div class="menu__separator"></div>
    <div class="menu__item"><a href="#" class="menu__link">Delete</a></div>
  </div>
</details>`,
    code: `<details class="menu">
  <summary class="menu__trigger">Actions <svg>▾</svg></summary>
  <div class="menu__content">
    <div class="menu__item"><a href="#" class="menu__link">Edit</a></div>
    <div class="menu__separator"></div>
    <div class="menu__item"><a href="#" class="menu__link">Delete</a></div>
  </div>
</details>`
  })}

  <h2>Modifiers</h2>
  ${ref([
    ['<code>details.menu</code>', 'Base dropdown.'],
    ['<code>.menu--right</code>', 'Align menu content to the right edge of trigger.'],
    ['<code>.menu--enhanced</code>', 'Applied by <code>menu-enhancement.js</code>, enables deeper shadow.'],
    ['<code>.menu__trigger / __arrow / __content / __item / __link / __separator / __label / __icon</code>', 'Sub-elements.'],
  ])}
  `
});

// ---------- Nav ----------
pages.nav = page({
  slug: 'nav',
  title: 'Nav',
  intro: 'Horizontal or vertical navigation with pills, tabs, and underline variants.',
  body: `
  <h2>Pills</h2>
  ${example({
    soft: true,
    preview: `<nav class="nav nav--pills" aria-label="Pills">
  <div class="nav__item"><a class="nav__link nav__link--active" href="#" aria-current="page">Home</a></div>
  <div class="nav__item"><a class="nav__link" href="#">Docs</a></div>
  <div class="nav__item"><a class="nav__link" href="#">Blog</a></div>
  <div class="nav__item"><a class="nav__link" href="#">Contact</a></div>
</nav>`,
    code: `<nav class="nav nav--pills">
  <div class="nav__item"><a class="nav__link nav__link--active" href="#">Home</a></div>
</nav>`
  })}

  <h2>Tabs</h2>
  ${example({
    preview: `<nav class="nav nav--tabs" aria-label="Tabs">
  <div class="nav__item"><a class="nav__link nav__link--active" href="#" aria-current="page">Overview</a></div>
  <div class="nav__item"><a class="nav__link" href="#">Settings</a></div>
</nav>`,
    code: `<nav class="nav nav--tabs">…</nav>`
  })}

  <h2>Underline</h2>
  ${example({
    preview: `<nav class="nav nav--underline" aria-label="Underline">
  <div class="nav__item"><a class="nav__link nav__link--active" href="#" aria-current="page">First</a></div>
  <div class="nav__item"><a class="nav__link" href="#">Second</a></div>
  <div class="nav__item"><a class="nav__link" href="#">Third</a></div>
</nav>`,
    code: `<nav class="nav nav--underline">…</nav>`
  })}

  <h2>Modifiers</h2>
  ${ref([
    ['<code>.nav</code>', 'Base horizontal flex row.'],
    ['<code>.nav--vertical</code>', 'Stack items vertically.'],
    ['<code>.nav--pills</code>', 'Rounded chip style.'],
    ['<code>.nav--tabs</code>', 'Tab-style indicator.'],
    ['<code>.nav--underline</code>', 'Underlined active item.'],
    ['<code>.nav--compact / --spacious</code>', 'Size variants.'],
    ['<code>.nav--responsive</code>', 'Wrap / collapse on small viewports.'],
    ['<code>.nav__item / __link / __link--active / __brand / __divider</code>', 'Sub-elements.'],
  ])}
  `
});

// ---------- Form ----------
pages.form = page({
  slug: 'form',
  title: 'Form',
  intro: 'Complete set: input / textarea / select / checkbox / radio / switch / file. Smart validation via <code>:user-invalid</code> (with legacy fallback).',
  body: `
  <h2>Full form</h2>
  ${example({
    preview: `<form class="form" onsubmit="event.preventDefault();alert('Submit')" style="max-width:32rem">
  <div class="form__group">
    <label for="f-name" class="required">Full name</label>
    <input id="f-name" type="text" required placeholder="Jane Doe">
  </div>
  <div class="form__group">
    <label for="f-email">Email</label>
    <input id="f-email" type="email" placeholder="you@example.com">
    <p class="form__hint">We only use it to contact you.</p>
  </div>
  <div class="form__group">
    <label for="f-msg">Message</label>
    <textarea id="f-msg" rows="4" placeholder="Your message..."></textarea>
  </div>
  <label class="form__checkbox"><input type="checkbox" required> I accept the terms</label>
  <label class="form__switch"><input type="checkbox" checked> Email notifications</label>
  <div class="form__actions">
    <button class="btn" type="submit">Send</button>
    <button class="btn btn--ghost" type="reset">Clear</button>
  </div>
</form>`,
    code: `<form class="form">
  <div class="form__group">
    <label class="required">Required</label>
    <input type="text" required>
  </div>
  <label class="form__switch"><input type="checkbox"> Label</label>
  <div class="form__actions"><button class="btn">OK</button></div>
</form>`
  })}

  <h2>Input group (addons)</h2>
  ${example({
    preview: `<div class="form__input-group" style="max-width:22rem">
  <span class="form__input-addon">$</span>
  <input type="number" placeholder="0.00">
  <span class="form__input-addon">USD</span>
</div>`,
    code: `<div class="form__input-group">
  <span class="form__input-addon">$</span>
  <input type="number">
  <span class="form__input-addon">USD</span>
</div>`
  })}

  <h2>Modifiers</h2>
  ${ref([
    ['<code>.form</code>', 'Grid layout with gap.'],
    ['<code>.form__group</code>', 'Field wrapper (label + input + hint).'],
    ['<code>.form__row</code>', 'Multiple fields side-by-side.'],
    ['<code>.form__checkbox / .form__radio / .form__switch</code>', 'Styled control wrappers.'],
    ['<code>.form__input-group / .form__input-addon</code>', 'Prefix/suffix addons.'],
    ['<code>.form__file / .form__file--compact</code>', 'Styled file input.'],
    ['<code>.form__range</code>', 'Styled range slider.'],
    ['<code>.form__hint / .form__error</code>', 'Help / error message slots.'],
    ['<code>.form__actions</code>', 'Button row at the bottom.'],
    ['<code>label.required</code>', 'Appends a red asterisk.'],
    ['<code>[aria-invalid="true"]</code>', 'Forces the error border regardless of interaction state.'],
  ])}
  `
});

// ---------- Table ----------
pages.table = page({
  slug: 'table',
  title: 'Table',
  intro: 'Styled table. Composable modifiers: striped, compact, borderless, fixed, responsive, stack (mobile).',
  body: `
  <h2>Default + striped</h2>
  ${example({
    preview: `<table class="table table--striped">
  <thead><tr><th>Product</th><th>Price</th><th>Status</th></tr></thead>
  <tbody>
    <tr><td>Laptop</td><td>$3,499</td><td><span class="badge badge--success">In stock</span></td></tr>
    <tr><td>Monitor</td><td>$1,299</td><td><span class="badge badge--success">In stock</span></td></tr>
    <tr><td>Keyboard</td><td>$299</td><td><span class="badge badge--error">Out</span></td></tr>
  </tbody>
</table>`,
    code: `<table class="table table--striped">
  <thead><tr><th>…</th></tr></thead>
  <tbody><tr><td>…</td></tr></tbody>
</table>`
  })}

  <h2>Compact + borderless</h2>
  ${example({
    preview: `<table class="table table--compact table--borderless">
  <thead><tr><th>File</th><th>Size</th><th>Modified</th></tr></thead>
  <tbody>
    <tr><td>document.pdf</td><td>2.4 MB</td><td>2026-01-15</td></tr>
    <tr><td>image.jpg</td><td>456 KB</td><td>2026-01-14</td></tr>
    <tr><td>sheet.xlsx</td><td>1.2 MB</td><td>2026-01-13</td></tr>
  </tbody>
</table>`,
    code: `<table class="table table--compact table--borderless">…</table>`
  })}

  <h2>Modifiers</h2>
  ${ref([
    ['<code>.table</code>', 'Base — left-aligned, bordered.'],
    ['<code>.table--striped</code>', 'Zebra rows.'],
    ['<code>.table--compact</code>', 'Tighter cell padding.'],
    ['<code>.table--borderless</code>', 'Remove vertical/outer borders.'],
    ['<code>.table--fixed</code>', 'Fixed <code>table-layout</code> for equal columns.'],
    ['<code>.table--responsive</code>', 'Horizontal scroll on small screens.'],
    ['<code>.table--stack</code>', 'On mobile, rows stack as cards (requires <code>data-label</code> on cells).'],
  ])}
  `
});

// ---------- Hero ----------
pages.hero = page({
  slug: 'hero',
  title: 'Hero',
  intro: 'Landing section with gradient background and CTAs.',
  body: `
  ${example({
    preview: `<section class="hero">
  <h1>Litura — content-first CSS</h1>
  <p>Modern primitives: layers, tokens, color-mix, @starting-style.</p>
  <div class="cluster justify-center mt-3">
    <a href="#" class="btn">Get started</a>
    <a href="#" class="btn btn--ghost">Documentation</a>
  </div>
</section>`,
    code: `<section class="hero">
  <h1>Title</h1>
  <p>Tagline</p>
  <a class="btn">CTA</a>
</section>`
  })}

  <h2>Modifiers</h2>
  ${ref([
    ['<code>.hero</code>', 'Centered text, gradient background.'],
  ])}
  `
});

// ---------- Stats ----------
pages.stats = page({
  slug: 'stats',
  title: 'Stats',
  intro: 'Statistic grid with auto-fit sizing and a stat card component.',
  body: `
  ${example({
    preview: `<div class="stats-grid">
  <div class="stat-card"><span class="stat-number">12.5k</span><span class="text-muted">Users</span></div>
  <div class="stat-card"><span class="stat-number">98%</span><span class="text-muted">Uptime</span></div>
  <div class="stat-card"><span class="stat-number">4.9</span><span class="text-muted">Rating</span></div>
  <div class="stat-card"><span class="stat-number">24/7</span><span class="text-muted">Support</span></div>
</div>`,
    code: `<div class="stats-grid">
  <div class="stat-card">
    <span class="stat-number">12.5k</span>
    <span class="text-muted">Users</span>
  </div>
</div>`
  })}

  <h2>Modifiers</h2>
  ${ref([
    ['<code>.stats-grid</code>', 'Auto-fit grid container.'],
    ['<code>.stat-card</code>', 'Padded card with hover-lift.'],
    ['<code>.stat-number</code>', 'Large accent-colored number.'],
  ])}
  `
});

// ---------- Feature ----------
pages.feature = page({
  slug: 'feature',
  title: 'Feature grid',
  intro: 'Feature list with icon tiles. Hover lifts and borders with the accent color.',
  body: `
  ${example({
    preview: `<div class="feature-grid">
  <div class="feature-card">
    <div class="feature-icon">⚡</div>
    <h3>Fast</h3>
    <p>Pure CSS, no runtime overhead.</p>
  </div>
  <div class="feature-card">
    <div class="feature-icon">🎨</div>
    <h3>Themeable</h3>
    <p>8 themes + fluid typography + density.</p>
  </div>
  <div class="feature-card">
    <div class="feature-icon">♿</div>
    <h3>Accessible</h3>
    <p>ARIA, reduced-motion, focus-visible.</p>
  </div>
</div>`,
    code: `<div class="feature-grid">
  <div class="feature-card">
    <div class="feature-icon">⚡</div>
    <h3>Fast</h3>
    <p>Description…</p>
  </div>
</div>`
  })}

  <h2>Modifiers</h2>
  ${ref([
    ['<code>.feature-grid</code>', 'Auto-fit grid.'],
    ['<code>.feature-card</code>', 'Padded card with hover behavior.'],
    ['<code>.feature-icon</code>', 'Accent-filled icon square.'],
  ])}
  `
});

// ---------- Pricing ----------
pages.pricing = page({
  slug: 'pricing',
  title: 'Pricing',
  intro: 'Pricing grid with a <code>.featured</code> variant (scaled + accent border).',
  body: `
  ${example({
    preview: `<div class="pricing-grid">
  <div class="pricing-card">
    <h3>Basic</h3>
    <div class="price">$9<span class="price-period">/mo</span></div>
    <ul><li>10 projects</li><li>1 GB storage</li><li>Email support</li></ul>
    <a class="btn btn--ghost" href="#">Choose</a>
  </div>
  <div class="pricing-card featured">
    <span class="pricing-badge">Recommended</span>
    <h3>Pro</h3>
    <div class="price">$29<span class="price-period">/mo</span></div>
    <ul><li>Unlimited projects</li><li>10 GB storage</li><li>Priority support</li></ul>
    <a class="btn" href="#">Choose</a>
  </div>
  <div class="pricing-card">
    <h3>Enterprise</h3>
    <div class="price">custom</div>
    <ul><li>Dedicated support</li><li>SLA</li><li>SSO</li></ul>
    <a class="btn btn--ghost" href="#">Contact</a>
  </div>
</div>`,
    code: `<div class="pricing-grid">
  <div class="pricing-card featured">
    <span class="pricing-badge">Recommended</span>
    <h3>Pro</h3>
    <div class="price">$29<span class="price-period">/mo</span></div>
  </div>
</div>`
  })}

  <h2>Modifiers</h2>
  ${ref([
    ['<code>.pricing-grid</code>', 'Auto-fit grid.'],
    ['<code>.pricing-card</code>', 'Base card.'],
    ['<code>.pricing-card.featured</code>', 'Scaled + accent border.'],
    ['<code>.pricing-badge</code>', 'Top-positioned pill.'],
    ['<code>.price / .price-period</code>', 'Large number + period.'],
  ])}
  `
});

// ---------- Testimonial ----------
pages.testimonial = page({
  slug: 'testimonial',
  title: 'Testimonial',
  intro: 'Quote cards with a decorative quote mark.',
  body: `
  ${example({
    preview: `<div class="grid md:grid-cols-2 gap-3">
  <div class="testimonial">
    <p class="testimonial-quote">The most enjoyable CSS library I have tried. Zero setup, just works.</p>
    <div class="testimonial-meta">
      <div class="testimonial-author">Jane Doe</div>
      <div class="testimonial-role">CTO, Acme</div>
    </div>
  </div>
  <div class="testimonial">
    <p class="testimonial-quote">Fluid typography and density in a single attribute — priceless for our dashboards.</p>
    <div class="testimonial-meta">
      <div class="testimonial-author">Anna Smith</div>
      <div class="testimonial-role">Design Lead</div>
    </div>
  </div>
</div>`,
    code: `<div class="testimonial">
  <p class="testimonial-quote">Quote…</p>
  <div class="testimonial-meta">
    <div class="testimonial-author">Name</div>
    <div class="testimonial-role">Role</div>
  </div>
</div>`
  })}

  <h2>Modifiers</h2>
  ${ref([
    ['<code>.testimonial</code>', 'Quote card.'],
    ['<code>.testimonial-quote</code>', 'Quoted text.'],
    ['<code>.testimonial-meta / .testimonial-author / .testimonial-role</code>', 'Author info.'],
  ])}
  `
});

// ---------- Breadcrumb ----------
pages.breadcrumb = page({
  slug: 'breadcrumb',
  title: 'Breadcrumb',
  intro: 'Breadcrumb trail. Remember to set <code>aria-label="Breadcrumb"</code> and <code>aria-current="page"</code> on the last item.',
  body: `
  ${example({
    preview: `<nav class="breadcrumb" aria-label="Breadcrumb">
  <a href="#">Home</a>
  <span class="breadcrumb-separator" aria-hidden="true">/</span>
  <a href="#">Blog</a>
  <span class="breadcrumb-separator" aria-hidden="true">/</span>
  <span aria-current="page">Current article</span>
</nav>`,
    code: `<nav class="breadcrumb" aria-label="Breadcrumb">
  <a href="#">Home</a>
  <span class="breadcrumb-separator" aria-hidden="true">/</span>
  <span aria-current="page">Current</span>
</nav>`
  })}

  <h2>Modifiers</h2>
  ${ref([
    ['<code>.breadcrumb</code>', 'Horizontal trail container.'],
    ['<code>.breadcrumb-separator</code>', 'Decorative separator.'],
    ['<code>.breadcrumb-current</code>', 'Styling for the active crumb.'],
  ])}
  `
});

// --- Write all pages ---

let written = 0;
for (const [slug, html] of Object.entries(pages)) {
  const target = path.join(OUT, `${slug}.html`);
  fs.writeFileSync(target, html);
  written++;
}
console.log(`Wrote ${written} playground pages to ${path.relative(process.cwd(), OUT)}/`);
