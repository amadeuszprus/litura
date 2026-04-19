# Litura

A minimalist, content-first CSS library built on modern primitives: `@layer`, custom properties, `color-mix(in oklch)`, `:has()`, `@starting-style`, container queries. 23 components, 8 themes, fluid typography, zero runtime dependencies.

[![npm](https://img.shields.io/npm/v/litura.svg)](https://www.npmjs.com/package/litura)
[![license](https://img.shields.io/npm/l/litura.svg)](./LICENCE.md)

**🔗 [Landing](https://litura.net/) · [Component playground](https://litura.net/examples/components/) · [Templates](https://litura.net/examples/)**

---

## Features

- **8 Color Schemes**: Auto, Light, Dark, High Contrast, Sepia, Nord, Ocean, Rose
- **Fluid Typography**: `clamp()`-based type scale adapts to viewport; opt-out via `data-typo="fixed"`
- **Density System**: `data-density="compact|spacious"` rescales every spacing token
- **Responsive by Default**: Logical properties, `sm:/md:/lg:/xl:/2xl:` utility prefixes, container queries on cards & grids
- **Component Library**: Buttons, forms, tables, cards, alerts, toasts, labels, badges, navigation, hero, pricing, stats, testimonials, breadcrumbs, dialogs, accordion, tabs, tooltip, and more
- **Animation Module**: Keyframes, `.animate-*` utilities, `.hover-lift/grow/glow` micro-interactions, skeleton loader
- **Utility Classes**: Spacing, typography, flexbox, grid, colors, borders, sizing, effects, icons, animations, print, view-transitions
- **Accessibility First**: `prefers-reduced-motion`, `::selection`, `aria-*` in examples, `focus-visible` everywhere
- **Modern CSS**: CSS Layers, Custom Properties, `color-mix(in oklch)`, `:has()`, `:user-invalid`, `@starting-style`, `@container`, `@supports(contrast-color)`
- **Multiple Font Stacks**: Modern, Tech, Minimal, Artistic variants
- **Design Tokens**: `tokens.json` (W3C spec) + generator for non-CSS consumers
- **Print Styles**: `.no-print`, `.print-only`, smart link URL reveal, break-inside rules
- **Zero Runtime Dependencies**: Pure CSS, optional minify via `npm run build`
- **BEM-like Methodology**: Clean, predictable class naming

---

## Quick Start

### CDN

```html
<link rel="stylesheet" href="https://unpkg.com/litura@latest/index.css">
```

### NPM

```bash
npm install litura
# or: pnpm add litura
# or: yarn add litura
```

```css
@import "litura";
/* or */
@import url("https://unpkg.com/litura@latest/index.css");
```

### Usage

```html
<!DOCTYPE html>
<html data-theme="auto">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <link rel="stylesheet" href="https://unpkg.com/litura@latest/index.css" />
    <title>Litura demo</title>
  </head>
  <body>
    <div class="container">
      <h1 class="text-3xl font-bold">Hello Litura!</h1>
      <button class="btn">Primary Button</button>
      <button class="btn btn--ghost">Ghost Button</button>
    </div>
  </body>
</html>
```

---

## Components

### Buttons

```html
<button class="btn">Primary</button>
<button class="btn btn--ghost">Ghost</button>
<button class="btn btn--soft">Soft</button>
```

### Forms

```html
<form class="form">
  <div class="form-row">
    <label>Email</label>
    <input type="email" placeholder="Enter your email" />
  </div>
</form>
```

### Info Panels

```html
<div class="info-panel info-panel--info">
  <h3 class="info-panel__title">Information</h3>
  <p>Information panel with blue styling.</p>
</div>
```

### Tables

```html
<table class="table table--striped">
  <thead>
    <tr>
      <th>Name</th>
      <th>Role</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>John Doe</td>
      <td>Developer</td>
    </tr>
  </tbody>
</table>
```

### Theme Switcher

The theme switcher component provides styling for a theme selection dropdown.

```html
<div class="theme-switcher">
  <select id="theme-select">
    <option value="auto">Auto</option>
    <option value="light">Light</option>
    <option value="dark">Dark</option>
    <!-- other themes -->
  </select>
</div>
```

### Cards

```html
<div class="card">
  <div class="card__header">
    <h3 class="card__title">Card Title</h3>
    <p class="card__subtitle">Subtitle text</p>
  </div>
  <div class="card__body">Card content here.</div>
  <div class="card__footer">Footer actions</div>
</div>

<div class="card card--soft">Soft background card</div>
<div class="card card--accented">Accented border card</div>
<div class="card card--fluid">Full-width fluid card</div>
```

### Alerts

```html
<div class="alert alert--info">
  <div class="alert__content">
    <h4 class="alert__title">Info</h4>
    <p class="alert__message">This is an informational alert.</p>
  </div>
</div>

<div class="alert alert--success">Success alert</div>
<div class="alert alert--warning">Warning alert</div>
<div class="alert alert--error">Error alert</div>
```

### Labels

```html
<span class="label">Default</span>
<span class="label label--info">Info</span>
<span class="label label--success">Success</span>
<span class="label label--warning">Warning</span>
<span class="label label--error">Error</span>
<span class="label label--pill">Pill shape</span>
```

### Badges

```html
<span class="badge">Default</span>
<span class="badge badge--info">Info</span>
<span class="badge badge--success">Success</span>
<span class="badge badge--warning">Warning</span>
<span class="badge badge--error">Error</span>
<span class="badge badge--pill">Pill</span>
<span class="badge badge--small">Small</span>
<span class="badge badge--large">Large</span>
```

### Navigation

```html
<nav class="nav">
  <div class="nav__item">
    <a class="nav__link" href="#">Home</a>
  </div>
  <div class="nav__item">
    <a class="nav__link" href="#">About</a>
  </div>
</nav>
```

### Hero

```html
<section class="hero">
  <h1>Welcome to Our Site</h1>
  <p>A compelling tagline goes here.</p>
  <button class="btn">Get Started</button>
</section>
```

### Feature

```html
<div class="feature-grid">
  <div class="feature-card">
    <div class="feature-icon">🚀</div>
    <h3>Fast</h3>
    <p>Lightning-fast performance.</p>
  </div>
</div>
```

### Pricing

```html
<div class="pricing-grid">
  <div class="pricing-card">
    <h3>Basic</h3>
    <p>$9/mo</p>
  </div>
  <div class="pricing-card pricing-card--featured">
    <h3>Pro</h3>
    <p>$29/mo</p>
  </div>
</div>
```

### Stats

```html
<div class="stats-grid">
  <div class="stat-card">
    <div class="stat-number">1,234</div>
    <p>Users</p>
  </div>
</div>
```

### Testimonials

```html
<div class="testimonial-grid">
  <div class="testimonial-card">
    <p>"An amazing product that changed our workflow."</p>
    <cite>Jane Doe</cite>
  </div>
</div>
```

### Breadcrumb

```html
<nav class="breadcrumb">
  <a href="#">Home</a>
  <a href="#">Blog</a>
  <span>Current Page</span>
</nav>
```

### Dialog

```html
<dialog class="dialog">
  <h2>Dialog Title</h2>
  <p>Dialog content goes here.</p>
  <button class="btn">Close</button>
</dialog>
```

### Accordion

```html
<div class="accordion">
  <details class="accordion__item" open>
    <summary class="accordion__header">Section one</summary>
    <div class="accordion__content">Hidden content for section one.</div>
  </details>
  <details class="accordion__item">
    <summary class="accordion__header">Section two</summary>
    <div class="accordion__content">Hidden content for section two.</div>
  </details>
</div>
```

### Tabs

```html
<div class="tabs" role="tablist" aria-label="Docs">
  <div class="tabs__list">
    <input type="radio" name="docs" id="t1" class="tabs__input" checked>
    <label for="t1" class="tabs__tab" role="tab">Overview</label>
    <input type="radio" name="docs" id="t2" class="tabs__input">
    <label for="t2" class="tabs__tab" role="tab">Install</label>
    <input type="radio" name="docs" id="t3" class="tabs__input">
    <label for="t3" class="tabs__tab" role="tab">API</label>
  </div>
  <div class="tabs__panel" data-for="t1" role="tabpanel">Overview content…</div>
  <div class="tabs__panel" data-for="t2" role="tabpanel">Install content…</div>
  <div class="tabs__panel" data-for="t3" role="tabpanel">API content…</div>
</div>
```
Variants: `.tabs--pills`, `.tabs--vertical`.

### Tooltip

```html
<button class="btn tooltip" data-tooltip="Copy to clipboard" aria-label="Copy">📋</button>
<span class="tooltip tooltip--bottom" data-tooltip="Hidden help">Hover me</span>
```
Variants: `--top` (default), `--bottom`, `--left`, `--right`.

### Toast

```html
<div class="toast-container toast-container--top-right" role="region" aria-label="Notifications">
  <div class="toast toast--success" role="status">
    <span class="toast__icon">✓</span>
    <div class="toast__body">
      <p class="toast__title">Saved</p>
      <p class="toast__message">Your changes are live.</p>
    </div>
    <button class="toast__close" aria-label="Dismiss">×</button>
  </div>
</div>
```

### Animations

```html
<div class="card animate-fade-in">Fades in on mount</div>
<div class="card animate-slide-up animate-delay-150">Slides up after 150ms</div>
<button class="btn hover-lift">Lifts on hover</button>
<button class="btn hover-glow">Glows on hover</button>
<div class="skeleton" style="height: 1rem; width: 80%;"></div>
<svg class="icon icon--lg animate-spin">…</svg>
```

---

## Color Schemes

Switch themes using the `data-theme` attribute on `<html>`:

- `auto` — respects system preference (default)  
- `light`  
- `dark`  
- `high-contrast`  
- `sepia`  
- `nord`  
- `ocean`  
- `rose`

```html
<html data-theme="dark">
```

---

## Utility Classes

### Spacing

```html
<div class="m-4 p-2">Margin 4, Padding 2</div>
<div class="mx-auto">Centered horizontally</div>
<div class="gap-3">Gap 3 (for flex/grid)</div>
```

### Typography

Set the font stack using the `data-font` attribute on the `<html>` element:

- (default) — System UI fonts
- `modern` — Inter / Modern sans-serif
- `tech` — Monospace / Technical look
- `minimal` — Clean / Minimalist sans-serif
- `artistic` — Serif / Elegant look

```html
<html data-font="modern">
```

### Typography Utilities

```html
<h1 class="text-3xl font-bold">Large Bold Text</h1>
<p class="text-sm text-muted">Small muted text</p>
<div class="text-center">Centered text</div>
```

### Fluid Typography

`--text-sm` … `--text-5xl` scale with viewport via `clamp()`. To lock them to fixed values:

```html
<html data-typo="fixed">
```

### Density

Rescale every `--size-*` token globally:

```html
<html data-density="compact">   <!-- ~80% spacing -->
<html data-density="spacious">  <!-- ~120% spacing -->
```

### Responsive Utilities

Prefix common utilities with `sm:` / `md:` / `lg:` / `xl:` / `2xl:` (breakpoints 40/48/64/80/96rem):

```html
<div class="flex flex-col md:flex-row gap-2 md:gap-4 text-center md:text-left">
  <p class="text-sm md:text-base">Responsive text</p>
</div>
```

### Icons

```html
<svg class="icon icon--lg" viewBox="0 0 24 24">…</svg>
<svg class="icon icon--stroke" viewBox="0 0 24 24">…</svg>
<svg class="icon icon--spin" viewBox="0 0 24 24">…</svg>
```

### Print

```html
<div class="no-print">Hidden when printing</div>
<div class="print-only">Only shown when printing</div>
```

### Flexbox

```html
<div class="flex items-center justify-between">
  <span>Left</span>
  <span>Right</span>
</div>
```

### Colors

```html
<div class="bg-soft text-accent">Themed colors</div>
<div class="border border-line">Themed border</div>
<span class="text-success">Success text</span>
<span class="text-error">Error text</span>
<div class="bg-success">Success background</div>
```

---

## Example Templates

The library includes ready-made templates demonstrating real-world usage:

- `examples/blog-template.html` — Blog layout with articles, sidebar, and pagination
- `examples/complete-website.html` — SaaS landing page with hero, features, pricing, FAQ
- `examples/dashboard-template.html` — Admin dashboard with stats, tables, and CSS-only charts
- `examples/forum-template.html` — Forum with category listings and user stats
- `examples/portfolio-template.html` — Creative portfolio with projects, services, and testimonials
- `examples/press-template.html` — News site with articles grid, live updates, and market data

---

## Browser Support

**Baseline:**
- Chrome / Edge 111+
- Firefox 113+
- Safari 16.4+

Requires: **CSS Layers**, **Custom Properties**, **`color-mix()`**, **`:has()`**, **`:user-invalid`**, **`@container`**.

**Progressive enhancement (optional, graceful fallback):**
- `@starting-style` — Chrome 117+, Safari 17.5+ (dialog/menu entry transitions)
- `contrast-color()` — Chrome 132+ (auto `--fg-on-accent`)
- `interpolate-size` — Chrome 129+ (`.accordion--animated`)
- `view-transition-name` — Chrome 111+, Safari 18+ (`utilities/view-transitions.css`)
- `transition-behavior: allow-discrete` — Chrome 117+

All progressive features are wrapped in `@supports` and ship with keyframe/CSS fallbacks.

## Build

```bash
npm install
npm run build:tokens   # regenerate core/tokens.generated.css from tokens.json
npm run lint           # eslint + stylelint + htmlhint
npm run minify         # → min/
npm run build          # full cycle
```

## Design Tokens

`tokens.json` follows the W3C Design Tokens Community Group format and is the source of truth for light/dark palettes plus scalar groups (size, radius, text, breakpoint, transition, duration). Non-standard themes (sepia, nord, ocean, rose, high-contrast) remain authored in `core/tokens.css`.

```bash
node scripts/build-tokens.js            # print to stdout
node scripts/build-tokens.js --write    # overwrite core/tokens.generated.css
```

---

## Documentation

- **Website**: https://litura.net  
- **NPM**: https://www.npmjs.com/package/litura  
- **GitHub**: https://github.com/amadeuszprus/litura

---

## Development

```bash
# Clone the repository
git clone https://github.com/amadeuszprus/litura.git
cd litura

# Install dev tooling (optional)
npm install

# Work on CSS in ./core, ./components, ./utilities
# Use the CDN example above or your own test HTML page.
```

### Development Scripts

After installing dependencies, you can use these npm scripts:

```bash
# Linting
npm run lint:js     # Lint JavaScript files with ESLint
npm run lint:css    # Lint CSS files with Stylelint
npm run lint:html   # Lint HTML files with HTMLHint
npm run lint        # Lint all files (JS, CSS, HTML)

# Minification
npm run minify:css  # Minify CSS files to min/ directory
npm run minify:js   # Minify JS files to min/ directory
npm run minify      # Minify all files

# Build
npm run build       # Lint and minify everything
```

The minified files are generated in the `min/` directory with the same structure as source files.

---

## Project Structure

```
litura/
├─ core/               # Core styles
│  ├─ tokens.css       # Variables and color schemes
│  ├─ reset.css        # Style reset
│  └─ base.css         # Basic HTML styles
├─ components/         # UI components
│  ├─ alert.css
│  ├─ badge.css
│  ├─ blog.css
│  ├─ breadcrumb.css
│  ├─ button.css
│  ├─ card.css
│  ├─ dialog.css
│  ├─ feature.css
│  ├─ form.css
│  ├─ forum.css
│  ├─ hero.css
│  ├─ info-panel.css
│  ├─ label.css
│  ├─ menu.css
│  ├─ nav.css
│  ├─ press.css
│  ├─ pricing.css
│  ├─ prose.css
│  ├─ stats.css
│  ├─ table.css
│  ├─ testimonial.css
│  └─ theme-switcher.css
├─ utilities/          # Utility classes
│  ├─ borders.css
│  ├─ colors.css
│  ├─ display.css
│  ├─ effects.css
│  ├─ flexbox.css
│  ├─ grid.css
│  ├─ helpers.css
│  ├─ layout.css
│  ├─ sizing.css
│  ├─ spacing.css
│  └─ typography.css
└─ index.css           # Main entry point
```

---

## CSS Architecture

Litura uses CSS Layers for predictable cascade control:

```css
@layer tokens, reset, base, components, utilities, overrides;
```

- **tokens** — CSS custom properties and color schemes  
- **reset** — normalize/reset styles  
- **base** — basic HTML element styles  
- **components** — components (buttons, forms, etc.)  
- **utilities** — utility classes (`!important`)  
- **overrides** — user overrides

---

## Changelog

### 0.3.0-alpha
- **New accent**: default brand color switched from emerald (`#0aa77a`) to deep teal (`#0f766e`) with a lighter teal (`#2dd4bf`) for dark mode. More refined, less "startup-y".
- **New components**: accordion, tabs, tooltip, toast.
- **Animation module** (`utilities/animations.css`): 12 keyframes, `.animate-*`, `.hover-*`, skeleton loader — all respect `prefers-reduced-motion`.
- **Fluid typography**: `--text-sm`..`--text-5xl` now use `clamp()`. Opt out with `<html data-typo="fixed">`.
- **Density system**: `<html data-density="compact|spacious">` rescales every `--size-*` token.
- **Icon utility** (`utilities/icon.css`): `.icon` + 6 sizes + `--stroke` / `--spin`.
- **Responsive utilities** (`utilities/responsive.css`): `sm:/md:/lg:/xl:/2xl:` prefixes for spacing, display, flex, typography, width.
- **Print styles** (`utilities/print.css`): `.no-print`, `.print-only`, smart link URL reveal.
- **View transitions** (`utilities/view-transitions.css`): opt-in helpers for the Navigation API.
- **Shadow tokens**: `--shadow-xs/sm/md/lg/xl` — replaces duplicated shadow formulas across 13 components.
- **Token generator**: `tokens.json` (W3C Design Tokens format) + `scripts/build-tokens.js` → `npm run build:tokens`.
- **Native `<dialog>`**: dialog component now uses the native element (focus trap + ESC built-in). Legacy `<details class="dialog">` pattern still supported.
- **`@starting-style`** entry transitions for dialog and menu, with keyframe fallback.
- **`contrast-color()` forward-compat**: `--fg-on-accent` token with `@supports` upgrade.
- **Card `overflow: clip`** + media flush-to-edges via grid layout.
- **Docs**: new landing page (`/`), component playground (`/examples/components/`), templates grid (`/examples/`).
- **Build**: new `npm run build:tokens`; existing `npm run build` now runs tokens → lint → minify.

### 0.1.0-alpha
- Initial components (button, form, table, card, alert, label, badge, nav, hero, pricing, stats, breadcrumb, dialog, menu, blog/forum/press layouts, theme-switcher).
- 8 color themes.
- Utility classes (spacing, typography, flex, grid, display, colors, borders, sizing, effects).

---

## Contributing

1. Fork the repository  
2. Create your feature branch (`git checkout -b feature/amazing-feature`)  
3. Commit your changes (`git commit -m "feat: add amazing feature"`)  
4. Push to the branch (`git push origin feature/amazing-feature`)  
5. Open a Pull Request  

---

## License

This project is licensed under the MIT License - see the [LICENCE.md](LICENCE.md) file for details.
