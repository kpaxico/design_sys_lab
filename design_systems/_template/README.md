# Design System Assets Template

Place your design assets in a folder under `design_systems/` and run the skill to generate all necessary files.

## Folder Structure

```
design_systems/
  your_design_name/
    assets/
      (your files here - any format)
```

## What to Provide

Put **anything** that describes your design system into the `assets/` folder. The skill can work with:

| Asset Type | Examples | What's Extracted |
|-----------|---------|-----------------|
| **Images** (PNG, JPG) | Screenshots, color palettes, component mockups | Visual identity, colors, spacing, radius |
| **HTML files** | Tailwind/CSS component implementations | Color tokens, class patterns, spacing values |
| **CSS files** | Stylesheets, custom properties | Color variables, typography, spacing tokens |
| **Markdown** | DESIGN.md, style guides, token docs | Design philosophy, rules, named tokens |
| **SVG files** | Icons, logos, illustrations | Brand identity cues |
| **PDF files** | Brand guidelines, style guides | Colors, typography, design rules |

## What Gets Generated

The skill creates/modifies these project files:

| File | Purpose |
|------|---------|
| `src/lib/registry/styles/style-{name}.css` | All 328 cn-* component class definitions |
| `src/lib/registry/styles/icons/{name}.svelte` | Style picker icon |
| `src/lib/registry/styles/index.ts` | Style registration |
| `src/app.css` | CSS import + custom variant |
| `src/lib/registry/themes.ts` | Color theme (OKLCH, light + dark) |
| `src/lib/registry/config.ts` | Preset configuration |
| `design_systems/{name}/README.md` | Documentation of decisions made |

## How to Run

```
/create-design-system your_design_name
```

## Tips

- **More assets = better results.** A DESIGN.md with explicit color hex values + component screenshots gives the best output.
- **Color palettes are key.** Even a simple image showing your brand colors helps enormously.
- **HTML examples are powerful.** If you have Tailwind HTML from tools like Google Stitch, Figma exports, or V0, include them.
- **Don't worry about structure.** Files can be in any subfolder arrangement. The skill reads everything recursively.
- **Re-run is safe.** Running the skill again overwrites previously generated files, letting you iterate.
