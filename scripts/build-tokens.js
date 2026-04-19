#!/usr/bin/env node
/**
 * Litura token generator.
 * Reads tokens.json (W3C Design Tokens Format) and emits a CSS block that
 * can be diffed against the theme portion of core/tokens.css.
 *
 * Scope: emits :root (light) and [data-theme="dark"] color blocks plus the
 * core scalar groups (size, radius, text, breakpoint, transition, duration).
 * Motif tokens (sepia, nord, ocean, rose, high-contrast) remain hand-authored
 * in core/tokens.css because they intentionally diverge from the base palette.
 *
 * Usage:
 *   node scripts/build-tokens.js            # print to stdout
 *   node scripts/build-tokens.js --write    # overwrite core/tokens.generated.css
 */

const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const tokens = JSON.parse(fs.readFileSync(path.join(root, "tokens.json"), "utf8"));

const write = process.argv.includes("--write");

function emitGroup(prefix, group, indent = "    ") {
  return Object.entries(group)
    .map(([key, token]) => `${indent}--${prefix}-${key}: ${token.$value};`)
    .join("\n");
}

function emitColors(scheme) {
  return Object.entries(tokens.color[scheme])
    .map(([key, token]) => `    --${key}: ${token.$value};`)
    .join("\n");
}

const lines = [];
lines.push("/* AUTO-GENERATED from tokens.json — do not edit by hand. Run `npm run build:tokens`. */");
lines.push("@layer tokens {");
lines.push("  :root,");
lines.push('  :root[data-theme="light"],');
lines.push('  [data-theme="light"] {');
lines.push("    color-scheme: light;");
lines.push(emitColors("light"));
lines.push("");
lines.push(emitGroup("size", tokens.size));
lines.push("");
lines.push(emitGroup("radius", tokens.radius));
lines.push("");
lines.push(emitGroup("text", tokens.text));
lines.push("");
lines.push(emitGroup("bp", tokens.breakpoint));
lines.push("");
lines.push(emitGroup("transition", tokens.transition));
lines.push("");
lines.push(emitGroup("duration", tokens.duration));
lines.push("  }");
lines.push("");
lines.push('  :root[data-theme="dark"],');
lines.push('  [data-theme="dark"] {');
lines.push("    color-scheme: dark;");
lines.push(emitColors("dark"));
lines.push("  }");
lines.push("}");
lines.push("");

const output = lines.join("\n");

if (write) {
  const target = path.join(root, "core", "tokens.generated.css");
  fs.writeFileSync(target, output);
  console.log(`Wrote ${path.relative(root, target)} (${output.length} bytes)`);
} else {
  process.stdout.write(output);
}
