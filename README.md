# Litura

A minimalist CSS library focused on content. Pure CSS project using modern features like CSS Layers, Custom Properties, and `color-mix()`.

---

## Features

- **8 Color Schemes**: Auto, Light, Dark, High Contrast, Sepia, Nord, Ocean, Rose  
- **Responsive Design**: Mobile-first with logical properties  
- **Component Library**: Buttons, forms, tables, info panels, and more  
- **Utility Classes**: Spacing, typography, flexbox utilities  
- **Modern CSS**: CSS Layers, Custom Properties, `color-mix()`, `:has()`, `:user-invalid`  
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
```

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

> Note: Local `demo.html` / `docs.html` are intentionally not tracked; see online docs.

---

## Project Structure

```
litura/
├─ core/               # Core styles
│  ├─ tokens.css       # Variables and color schemes
│  ├─ reset.css        # Style reset
│  └─ base.css         # Basic HTML styles
├─ components/         # UI components
│  ├─ button.css
│  ├─ form.css
│  ├─ table.css
│  ├─ info-panel.css
│  └─ prose.css
├─ utilities/          # Utility classes
│  ├─ layout.css
│  ├─ spacing.css
│  ├─ typography.css
│  └─ flexbox.css
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
