---
name: create-design-system
description: Generate a complete design system (style CSS, color theme, font config, preset) for the design_sys_lab project from assets in a design_systems/ folder. Use when the user wants to create or regenerate a design system from provided assets (images, HTML, CSS, markdown).
argument-hint: "<design-system-name>"
allowed-tools: "Read, Write, Edit, Glob, Grep, Bash(npm install *), Bash(mkdir *), Bash(cp *), Bash(grep *), Bash(wc *), Bash(head *), Bash(cat *), Agent"
---

# Create Design System

Generate all necessary design system files for the `design_sys_lab` project from user-provided assets.

**Project root:** Use the workspace directory containing `design_systems/` (typically `d:/dex/app_ui_design/design_sys_lab`).

See [design-system-reference.md](design-system-reference.md) for exact file formats, the complete list of 328 cn-* classes, color token definitions, and integration points.

## Input

The design system name is provided via `$ARGUMENTS`. The assets are located at:

```text
design_systems/{name}/assets/
```

Assets can be ANY combination of:

- Images (PNG, JPG) — screenshots of designs, color palettes, component examples
- HTML files — Tailwind-based component implementations
- CSS files — custom stylesheets with color/spacing definitions
- Markdown files (DESIGN.md etc.) — design philosophy, rules, token definitions
- SVG files — icons, logos
- PDF files — style guides

## Steps

### Step 1: Read and Analyze Assets

1. **Glob** `design_systems/{name}/assets/` recursively to find all files
2. **Read every text file** (HTML, CSS, MD, SVG) completely
3. **View every image file** (PNG, JPG) to understand visual identity
4. Extract and document these design decisions:

| Decision               | What to look for                                                             |
|------------------------|------------------------------------------------------------------------------|
| **Colors**             | Hex values in CSS/HTML, color swatches in images, named tokens in markdown   |
| **Typography**         | Font-family declarations, Google Fonts imports, weight usage                 |
| **Border Radius**      | `border-radius` values, rounded-* Tailwind classes, design philosophy        |
| **Spacing**            | Padding/margin patterns, gap values, density philosophy                      |
| **Elevation**          | Box-shadow usage, border usage, layering approach                            |
| **Component Patterns** | Button styles, card styles, input styles, specific design rules              |

### Step 2: Map Colors to OKLCH Tokens

Map the extracted color palette to the shadcn token system. Use OKLCH color space.

**Hex to OKLCH conversion reference** (from [design-system-reference.md](design-system-reference.md)):

- Use the formula or common mappings provided in Section 9
- Every theme needs 30+ tokens for both light AND dark modes

**Token mapping strategy** (see Section 10 of reference):

| shadcn token                 | Map to...                                                         |
|------------------------------|-------------------------------------------------------------------|
| `primary`                    | Main brand color (darkest/strongest)                              |
| `primary-foreground`         | Text on primary (usually white)                                   |
| `secondary`                  | Supporting neutral color                                          |
| `accent`                     | Highlight/call-to-action color                                    |
| `destructive`                | Error/danger (keep red-ish unless brand overrides)                |
| `background`                 | Main page background                                              |
| `card`, `popover`            | Elevated surface color                                            |
| `muted`                      | Subtle background for inactive areas                              |
| `border`, `input`            | Border colors                                                     |
| `ring`                       | Focus ring color                                                  |
| `chart-1` through `chart-5`  | Data visualization gradient (derive from primary/accent)          |
| `sidebar-*`                  | Sidebar-specific variants                                         |

**For dark mode:** Invert the lightness — light backgrounds become dark, dark text becomes light. Keep the same hue and similar chroma.

### Step 3: Generate Style CSS

1. **Copy** `src/lib/registry/styles/style-nova.css` as the base template
2. **Rename** the scope from `.style-nova` to `.style-{name}`
3. **Modify the cn-* classes** based on the design analysis:

**What to change based on design decisions:**

- **Border radius:** Update `rounded-*` values across ALL classes
  - Sharp design → `rounded-none` or `rounded-sm`
  - Soft design → `rounded-xl`, `rounded-2xl`, `rounded-full`
- **Spacing/padding:** Update `p-*`, `px-*`, `py-*`, `gap-*` values
  - Compact → smaller values (p-2, gap-1)
  - Generous → larger values (p-6, gap-4)
- **Borders:** Update or remove `border`, `ring` classes
  - "No border" design → remove border classes, use background shifts
  - Strong borders → add `border-2` or custom border colors
- **Shadows:** Update `shadow-*` classes
  - Flat design → remove shadows
  - Elevated → `shadow-md`, `shadow-lg` with custom colors
- **Typography in components:** Update `text-*`, `font-*` classes
- **Colors:** Reference custom CSS variables where appropriate (e.g., `bg-[var(--custom-surface)]`)

**IMPORTANT:** You MUST keep ALL 328 cn-* classes. Never remove a class — components depend on them. Only modify the `@apply` directives inside each class.

1. **Add a comment header** at the top:

```css
/* {Name} Design System — Generated from design_systems/{name}/assets/ */
/* {Brief description of the design philosophy} */
```

### Step 4: Generate Theme Entry

Add a new theme object to the `THEMES` array in `src/lib/registry/themes.ts`.

Insert BEFORE the `] as const satisfies RegistryItem[];` closing line.

See Section 4 of [design-system-reference.md](design-system-reference.md) for the exact format.

**Decide:** Is this a full base theme (with ALL 30+ tokens) or an accent theme (overriding only primary/secondary/accent/chart colors)?

- If the design has a distinctive background/surface color → create as base theme addition to `BASE_THEMES`
- If it only changes accent colors → add to `THEMES` as a partial override

### Step 5: Create Style Icon

Create `src/lib/registry/styles/icons/{name}.svelte` — a simple SVG that represents the design's visual character.

See Section 5 of [design-system-reference.md](design-system-reference.md) for the template.

Choose an icon shape that reflects the design:

- Rounded/soft → circle or rounded rectangle
- Sharp/boxy → square or diamond
- Layered → stacked shapes
- Editorial → book or page shape

### Step 6: Register the Style

**Update `src/lib/registry/styles/index.ts`:**

1. Add import: `import {Name} from "./icons/{name}.svelte";`
2. Add entry to STYLES array (BEFORE the `] as const;`)

**Update `src/app.css`:**

1. Add CSS import after the other style imports: `@import "./lib/registry/styles/style-{name}.css" layer(base);`
2. Add custom variant after the other variants: `@custom-variant style-{name} (&:where(.style-{name} *));`

**Update `src/lib/registry/config.ts`:**
Add preset to PRESETS array (BEFORE the `];`).

**IMPORTANT:** The `font` field in the preset must use the SHORT name (without `font-` prefix): e.g. `"inter"`, `"plus-jakarta-sans"` — NOT `"font-inter"` or `"font-plus-jakarta-sans"`. The font picker strips the prefix when setting the value.

### Step 7: Install Custom Font (if needed)

If the design uses a font not already in the project:

1. `npm install -D @fontsource-variable/{font-name}`
2. Add `@import "@fontsource-variable/{font-name}/index.css";` to `src/app.css` in the fonts section
3. Add font entry to `src/lib/registry/fonts.ts` — see Section 8 of reference

**Already available fonts:** geist, inter, noto-sans, nunito-sans, figtree, roboto, raleway, dm-sans, public-sans, outfit, jetbrains-mono, geist-mono, noto-serif, roboto-slab, merriweather, lora, playfair-display

### Step 8: Write README

Create `design_systems/{name}/README.md` documenting:

1. **Design System Name** and brief description
2. **Source Assets** — what files were analyzed
3. **Color Mapping** — table showing original colors → shadcn tokens → OKLCH values
4. **Typography** — font choice and why
5. **Design Decisions** — radius strategy, spacing philosophy, border approach, elevation style
6. **Generated Files** — list of all files created/modified
7. **How to Customize** — brief guide for further modifications

### Step 9: Verify

After generating all files, verify:

1. The style CSS file exists and has the correct `.style-{name}` scope
2. The style is registered in `index.ts`
3. The CSS import and custom variant are in `app.css`
4. The theme entry is in `themes.ts`
5. The preset is in `config.ts`

Tell the user to visit `http://localhost:5180/create/preview` and select the new style from the Style picker.

## Important Notes

- **Never generate from scratch** — always copy style-nova.css as base and modify. This ensures all 328 cn-* classes are present.
- **OKLCH colors** — all theme colors MUST be in `oklch(L C H)` format, not hex or rgb.
- **Keep @apply syntax** — the cn-* classes use Tailwind's `@apply` directive. Don't replace with raw CSS.
- **Preserve variants** — some cn-* classes have variant sub-classes (e.g., `cn-button-variant-default`, `cn-button-variant-outline`). Keep all of them.
- **The preset codec** at `src/lib/features/design-system/preset-codec.ts` already supports custom values via JSON fallback — no changes needed there.
