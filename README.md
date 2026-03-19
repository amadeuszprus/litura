# Litura

A minimalist CSS library focused on content. Pure CSS project using modern features like CSS Layers, Custom Properties, and `color-mix()`.

---

## Features

- **8 Color Schemes**: Auto, Light, Dark, High Contrast, Sepia, Nord, Ocean, Rose  
- **Responsive Design**: Mobile-first with logical properties  
- **Component Library**: Buttons, forms, tables, cards, alerts, labels, badges, navigation, hero, pricing, stats, testimonials, breadcrumbs, dialogs, and more
- **Utility Classes**: Spacing, typography, flexbox, grid, colors, borders, sizing, effects  
- **Modern CSS**: CSS Layers, Custom Properties, `color-mix()`, `:has()`, `:user-invalid`  
- **Multiple Font Stacks**: Modern, Tech, Minimal, Artistic variants
- **Zero Dependencies**: Pure CSS, no build step required  
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

- Chrome / Edge 105+  
- Firefox 103+  
- Safari 15.4+  

Requires support for: **CSS Layers**, **Custom Properties**, **`color-mix()`**, **`:has()`**, **`:user-invalid`**.

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

## Contributing

1. Fork the repository  
2. Create your feature branch (`git checkout -b feature/amazing-feature`)  
3. Commit your changes (`git commit -m "feat: add amazing feature"`)  
4. Push to the branch (`git push origin feature/amazing-feature`)  
5. Open a Pull Request  

---

## License

This project is licensed under the MIT License - see the [LICENCE.md](LICENCE.md) file for details.
