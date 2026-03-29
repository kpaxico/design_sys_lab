# PetMediLog Design System — "The Heirloom Guardian"

A warm, editorial design system inspired by curated nursery aesthetics. Soft roundness, tonal layering, no hard borders, generous spacing.

## Source Assets Analyzed

| Asset | What was extracted |
|-------|-------------------|
| `design_system/DESIGN.md` | Color palette, typography, "No-Line" rule, border radius strategy, elevation philosophy, component patterns |
| `design_system/design_system.png` | Visual reference for color swatches, button styles, typography scale |
| `dashboard/code.html` + `screen.png` | Tailwind color config, card patterns, metric layout, nav patterns |
| `add_med/code.html` + `screen.png` | Form input styling, frequency pill buttons, section containers |
| `meds_list/code.html` + `screen.png` | List item patterns (no dividers), timeline styling, hero card |
| `pet_profile/code.html` + `screen.png` | Profile card layering, bento grid, stat cards, action buttons |

## Color Mapping

| Design Token | Hex | OKLCH (light) | shadcn Token |
|-------------|-----|---------------|-------------|
| Midnight Blue (primary) | `#172642` | `oklch(0.271 0.056 262)` | `primary`, `foreground` |
| White (on-primary) | `#ffffff` | `oklch(1 0 0)` | `primary-foreground`, `card` |
| Warm White (surface) | `#fff8f3` | `oklch(0.983 0.010 58)` | `background` |
| Baby Blue (highlight) | `#b7c7ea` | `oklch(0.829 0.052 266)` | `accent`, `ring` |
| Khaki/Beige | `#f1e9db` | `oklch(0.937 0.021 82)` | `secondary`, `muted` |
| Slate | `#595f69` | `oklch(0.484 0.018 261)` | `muted-foreground` |
| Tertiary (Bronze) | `#7d6e5d` | `oklch(0.547 0.032 71)` | `chart-5` |
| Outline variant | `#d9e2f1` | `oklch(0.910 0.023 261)` | `border`, `input` |
| Error | `#b3261e` | `oklch(0.501 0.178 29)` | `destructive` |

## Typography

**Font:** Plus Jakarta Sans (Variable) — chosen because the design system explicitly specifies it as the sole typeface. Its generous x-height and rounded terminals provide the "friendly" touch required by the "Heirloom Guardian" persona.

## Design Decisions

### Border Radius: Very Rounded

- Buttons: `rounded-full` (pill shape, per DESIGN.md: "Use `full` roundness")
- Cards: `rounded-3xl` (per DESIGN.md: minimum `lg`=2rem)
- Inputs: `rounded-2xl`
- Badges/chips: `rounded-full`
- Tabs: `rounded-full`
- Dialogs: `rounded-3xl`

### Borders: "No-Line" Rule

Per DESIGN.md: "1px solid borders are strictly prohibited for sectioning."

- Cards use warm tinted shadows (`shadow-[#211b10]/5`) instead of ring/border
- Inputs use background fill (`bg-muted`) instead of borders
- Separators reduced to 30% opacity
- Table row borders removed where possible

### Spacing: Generous

Per DESIGN.md: "Use Generous White Space"

- Card padding increased from py-4 to py-6
- Content gaps increased from gap-4 to gap-5
- Dialog/sheet padding increased

### Elevation: Warm Tonal Shadows

Per DESIGN.md: "Shadow color must be a tinted version of `on_surface` (#211b10), never pure black."

- Cards: `shadow-sm shadow-[#211b10]/5`
- Dialogs: `shadow-xl shadow-[#211b10]/10`
- Popovers: `shadow-lg shadow-[#211b10]/8`

### Sidebar: Midnight Blue

The sidebar uses the primary Midnight Blue (#172642) as background, matching the dark nav bars seen in the dashboard and meds list screenshots.

## Generated Files

| File | Action |
|------|--------|
| `src/lib/registry/styles/style-petmedilog.css` | Created — 1367 lines, 328 cn-* classes |
| `src/lib/registry/styles/icons/petmedilog.svelte` | Created — style picker icon |
| `src/lib/registry/styles/index.ts` | Modified — added STYLES entry |
| `src/app.css` | Modified — added CSS import, custom variant, font import |
| `src/lib/registry/themes.ts` | Modified — added petmedilog theme (light + dark OKLCH) |
| `src/lib/registry/config.ts` | Modified — added preset |
| `src/lib/registry/fonts.ts` | Modified — added Plus Jakarta Sans entry |

## How to Customize

1. **Colors:** Edit the theme entry in `src/lib/registry/themes.ts` — change OKLCH values
2. **Component styling:** Edit `src/lib/registry/styles/style-petmedilog.css` — modify `@apply` directives in cn-* classes
3. **Add dark mode tweaks:** The dark mode colors in themes.ts invert lightness while keeping the same hues
4. **Test:** Visit `http://localhost:5180/create/preview` and select "PetMediLog" from the Style picker
