---
name: export-design-system
description: Export a design system as a standalone package with resolved components (cn-* classes baked into Tailwind utilities), ready to drop into a production shadcn-svelte project. Use when the user wants to export or extract a design system for use in another project.
argument-hint: "<design-system-name>"
---

# Export Design System

Export a custom design system from `design_sys_lab` as a production-ready package.

This is a **deterministic** operation — the script at `scripts/export-transform.mjs` handles everything.

## How to Run

```bash
cd d:/dex/app_ui_design/design_sys_lab
node scripts/export-transform.mjs $ARGUMENTS
```

Or via npm:

```bash
npm run export:ds -- $ARGUMENTS
```

## What it Does

The script reads the design system configuration from `config.ts`, parses the style CSS, extracts theme tokens and font config, then:

1. Parses `style-{name}.css` → extracts 328 cn-* → Tailwind utility mappings
2. Extracts theme OKLCH color tokens (light + dark) from `themes.ts`
3. Reads font configuration from `fonts.ts`
4. Generates `app.css` with theme variables, font import, custom variants
5. Transforms all 56 component directories (397 files):
   - Resolves cn-* classes to inline Tailwind utilities
   - Replaces IconPlaceholder with concrete icon imports
   - Rewrites import paths to relative
   - Removes marker classes
6. Copies utility files (utils.ts, hooks, lib)
7. Generates README with setup instructions
8. Verifies: 0 remaining cn-*, 0 IconPlaceholder, 0 $lib/registry/

## Output

```
design_systems/{name}/export/
├── app.css
├── utils.ts
├── hooks/is-mobile.svelte.ts
├── lib/casing.ts
├── ui/ (56 component directories, 397 files)
└── README.md
```

## After Running

Tell the user:
- The export is at `design_systems/{name}/export/`
- Follow the README.md for setup instructions in a target project
- All cn-* classes are resolved — no style CSS or runtime switching needed
