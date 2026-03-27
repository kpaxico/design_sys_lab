# Design System Reference

Complete technical reference for generating design system files in the `design_sys_lab` project at `d:/dex/app_ui_design/design_sys_lab`.

---

## 1. File Locations

Every new design system named `{name}` requires changes to these files (paths relative to project root):

### Files to CREATE

| File | Purpose |
|------|---------|
| `src/lib/registry/styles/style-{name}.css` | Component style definitions using cn-* classes |
| `src/lib/registry/styles/icons/{name}.svelte` | Icon component displayed in the style picker |

### Files to MODIFY

| File | What to add |
|------|-------------|
| `src/lib/registry/styles/index.ts` | Import icon + add entry to `STYLES` array |
| `src/lib/registry/themes.ts` | Add theme object to `THEMES` array (or `BASE_THEMES` if it defines all 30+ tokens) |
| `src/app.css` | Add CSS import line + `@custom-variant` declaration |
| `src/lib/registry/config.ts` | Add entry to `PRESETS` array |
| `src/lib/registry/fonts.ts` | Add font entry (only if using a new font not already listed) |

---

## 2. Style CSS Format

Each style CSS file wraps all component classes inside a `.style-{name} { ... }` selector. This enables runtime style switching -- only classes inside the active style wrapper are applied.

### Overall Structure

```css
.style-{name} {
	/* MARK: Accordion */
	.cn-accordion-item {
		@apply not-last:border-b;
	}

	.cn-accordion-trigger {
		@apply focus-visible:ring-ring/50 ...;
	}

	/* MARK: Alert */
	.cn-alert {
		@apply grid gap-0.5 rounded-lg border ...;
	}

	/* ... all 328 cn-* classes ... */

	/* MARK: Menu Translucent */
	.cn-menu-translucent {
		@apply bg-popover/70 ...;
	}
}
```

### Key Rules

1. **Everything is inside `.style-{name} { ... }`** -- a single top-level CSS selector wraps all classes.
2. **Each `cn-*` class uses `@apply` directives** with Tailwind CSS v4 utility classes.
3. **`/* MARK: ComponentName */` comments** organize sections alphabetically by component.
4. **Design tokens** (like `bg-primary`, `text-foreground`, `border-border`) are used instead of hard-coded colors, so the theme system controls the actual colors.
5. **No bare colors** -- all color references use semantic tokens (`primary`, `secondary`, `muted`, `accent`, `destructive`, `foreground`, `background`, etc.).

### Representative Examples

**Simple class:**
```css
.cn-skeleton {
	@apply bg-muted rounded-md;
}
```

**Class with variants and states:**
```css
.cn-button-variant-outline {
	@apply border-border bg-background hover:bg-muted hover:text-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 aria-expanded:bg-muted aria-expanded:text-foreground;
}
```

**Complex class with data attributes:**
```css
.cn-checkbox {
	@apply border-input dark:bg-input/30 data-checked:bg-primary data-checked:text-primary-foreground dark:data-checked:bg-primary data-checked:border-primary aria-invalid:aria-checked:border-primary aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 flex size-4 items-center justify-center rounded-[4px] border transition-colors group-has-disabled/field:opacity-50 focus-visible:ring-3 aria-invalid:ring-3;
}
```

**Class with sizing and deep selectors:**
```css
.cn-badge {
	@apply h-5 gap-1 rounded-4xl border border-transparent px-2 py-0.5 text-xs font-medium transition-all has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&>svg]:size-3!;
}
```

### What Differentiates Styles

Different styles vary in:
- **Border radius** (`rounded-lg` vs `rounded-xl` vs `rounded-sm` vs `rounded-none`)
- **Padding/spacing** (`p-4` vs `p-3` vs `p-2`)
- **Height/sizing** (`h-8` vs `h-9` vs `h-10`)
- **Shadow usage** (`shadow-sm` vs `shadow-md` vs no shadow)
- **Ring styles** (`ring-1` vs `ring-2`)
- **Animation choices** (subtle vs pronounced)
- **Font sizes** (`text-sm` vs `text-base`)
- **Visual density** (compact vs spacious)

---

## 3. Complete cn-* Class List (328 classes)

### Accordion (4 classes)
```
cn-accordion-item
cn-accordion-trigger
cn-accordion-content
cn-accordion-content-inner
```

### Alert (6 classes)
```
cn-alert
cn-alert-variant-default
cn-alert-variant-destructive
cn-alert-title
cn-alert-description
cn-alert-action
```

### Alert Dialog (7 classes)
```
cn-alert-dialog-overlay
cn-alert-dialog-content
cn-alert-dialog-header
cn-alert-dialog-media
cn-alert-dialog-title
cn-alert-dialog-description
cn-alert-dialog-footer
```

### Avatar (4 classes)
```
cn-avatar
cn-avatar-fallback
cn-avatar-image
cn-avatar-badge
cn-avatar-group-count
```

### Badge (7 classes)
```
cn-badge
cn-badge-variant-default
cn-badge-variant-secondary
cn-badge-variant-outline
cn-badge-variant-destructive
cn-badge-variant-ghost
cn-badge-variant-link
```

### Breadcrumb (6 classes)
```
cn-breadcrumb-list
cn-breadcrumb-item
cn-breadcrumb-link
cn-breadcrumb-page
cn-breadcrumb-separator
cn-breadcrumb-ellipsis
```

### Button (13 classes)
```
cn-button
cn-button-variant-default
cn-button-variant-outline
cn-button-variant-secondary
cn-button-variant-ghost
cn-button-variant-destructive
cn-button-variant-link
cn-button-size-xs
cn-button-size-sm
cn-button-size-default
cn-button-size-lg
cn-button-size-icon-xs
cn-button-size-icon-sm
cn-button-size-icon
cn-button-size-icon-lg
```

### Button Group (5 classes)
```
cn-button-group
cn-button-group-orientation-horizontal
cn-button-group-orientation-vertical
cn-button-group-text
cn-button-group-separator
```

### Calendar (3 classes)
```
cn-calendar
cn-calendar-dropdown-root
cn-calendar-caption-label
```

### Card (6 classes)
```
cn-card
cn-card-header
cn-card-title
cn-card-description
cn-card-content
cn-card-footer
```

### Carousel (2 classes)
```
cn-carousel-previous
cn-carousel-next
```

### Chart (1 class)
```
cn-chart-tooltip
```

### Checkbox (2 classes)
```
cn-checkbox
cn-checkbox-indicator
```

### Combobox (12 classes)
```
cn-combobox-content
cn-combobox-content-logical
cn-combobox-label
cn-combobox-item
cn-combobox-item-indicator
cn-combobox-empty
cn-combobox-list
cn-combobox-item-text
cn-combobox-separator
cn-combobox-trigger
cn-combobox-trigger-icon
cn-combobox-chips
cn-combobox-chip
cn-combobox-chip-remove
```

### Command (10 classes)
```
cn-command
cn-command-dialog
cn-command-input-wrapper
cn-command-input-group
cn-command-input-icon
cn-command-input
cn-command-list
cn-command-empty
cn-command-group
cn-command-separator
cn-command-item
cn-command-shortcut
```

### Context Menu (11 classes)
```
cn-context-menu-content
cn-context-menu-content-logical
cn-context-menu-item
cn-context-menu-checkbox-item
cn-context-menu-radio-item
cn-context-menu-item-indicator
cn-context-menu-label
cn-context-menu-separator
cn-context-menu-shortcut
cn-context-menu-sub-trigger
cn-context-menu-sub-content
cn-context-menu-subcontent
```

### Dialog (7 classes)
```
cn-dialog-overlay
cn-dialog-content
cn-dialog-close
cn-dialog-header
cn-dialog-footer
cn-dialog-title
cn-dialog-description
```

### Drawer (7 classes)
```
cn-drawer-overlay
cn-drawer-content
cn-drawer-handle
cn-drawer-header
cn-drawer-title
cn-drawer-description
cn-drawer-footer
```

### Dropdown Menu (11 classes)
```
cn-dropdown-menu-content
cn-dropdown-menu-content-logical
cn-dropdown-menu-item
cn-dropdown-menu-checkbox-item
cn-dropdown-menu-radio-item
cn-dropdown-menu-item-indicator
cn-dropdown-menu-label
cn-dropdown-menu-separator
cn-dropdown-menu-shortcut
cn-dropdown-menu-sub-trigger
cn-dropdown-menu-sub-content
cn-dropdown-menu-subcontent
```

### Empty (7 classes)
```
cn-empty
cn-empty-header
cn-empty-media
cn-empty-media-default
cn-empty-media-icon
cn-empty-title
cn-empty-description
cn-empty-content
```

### Field (11 classes)
```
cn-field-set
cn-field-legend
cn-field-group
cn-field
cn-field-content
cn-field-label
cn-field-title
cn-field-description
cn-field-separator
cn-field-separator-content
cn-field-error
```

### Hover Card (2 classes)
```
cn-hover-card-content
cn-hover-card-content-logical
```

### Input (1 class)
```
cn-input
```

### Input OTP (5 classes)
```
cn-input-otp
cn-input-otp-group
cn-input-otp-slot
cn-input-otp-caret-line
cn-input-otp-separator
```

### Item (16 classes)
```
cn-item
cn-item-variant-default
cn-item-variant-outline
cn-item-variant-muted
cn-item-size-default
cn-item-size-sm
cn-item-size-xs
cn-item-media
cn-item-media-variant-default
cn-item-media-variant-icon
cn-item-media-variant-image
cn-item-content
cn-item-title
cn-item-description
cn-item-actions
cn-item-header
cn-item-footer
cn-item-group
cn-item-separator
```

### Kbd (2 classes)
```
cn-kbd
cn-kbd-group
```

### Label (1 class)
```
cn-label
```

### Menubar (13 classes)
```
cn-menubar
cn-menubar-trigger
cn-menubar-content
cn-menubar-content-logical
cn-menubar-item
cn-menubar-checkbox-item
cn-menubar-checkbox-item-indicator
cn-menubar-radio-item
cn-menubar-radio-item-indicator
cn-menubar-label
cn-menubar-separator
cn-menubar-shortcut
cn-menubar-sub-trigger
cn-menubar-sub-content
```

### Navigation Menu (12 classes)
```
cn-navigation-menu
cn-navigation-menu-list
cn-navigation-menu-trigger
cn-navigation-menu-link
cn-navigation-menu-trigger-icon
cn-navigation-menu-content
cn-navigation-menu-viewport
cn-navigation-menu-indicator
cn-navigation-menu-indicator-arrow
cn-navigation-menu-positioner
cn-navigation-menu-popup
```

### Native Select (2 classes)
```
cn-native-select
cn-native-select-icon
```

### Pagination (4 classes)
```
cn-pagination-content
cn-pagination-ellipsis
cn-pagination-previous
cn-pagination-next
```

### Popover (5 classes)
```
cn-popover-content
cn-popover-content-logical
cn-popover-header
cn-popover-title
cn-popover-description
```

### Progress (5 classes)
```
cn-progress
cn-progress-track
cn-progress-indicator
cn-progress-label
cn-progress-value
```

### Radio Group (4 classes)
```
cn-radio-group
cn-radio-group-item
cn-radio-group-indicator
cn-radio-group-indicator-icon
```

### Resizable (1 class)
```
cn-resizable-handle-icon
```

### Scroll Area (2 classes)
```
cn-scroll-area-scrollbar
cn-scroll-area-thumb
```

### Select (11 classes)
```
cn-select-trigger
cn-select-value
cn-select-trigger-icon
cn-select-content
cn-select-content-logical
cn-select-label
cn-select-item
cn-select-item-indicator
cn-select-group
cn-select-item-text
cn-select-separator
cn-select-scroll-up-button
cn-select-scroll-down-button
```

### Separator (3 classes)
```
cn-separator
cn-separator-horizontal
cn-separator-vertical
```

### Sheet (7 classes)
```
cn-sheet-overlay
cn-sheet-content
cn-sheet-close
cn-sheet-header
cn-sheet-footer
cn-sheet-title
cn-sheet-description
```

### Sidebar (28 classes)
```
cn-sidebar-gap
cn-sidebar-inner
cn-sidebar-rail
cn-sidebar-inset
cn-sidebar-input
cn-sidebar-header
cn-sidebar-content
cn-sidebar-footer
cn-sidebar-separator
cn-sidebar-group
cn-sidebar-menu
cn-sidebar-group-content
cn-sidebar-group-label
cn-sidebar-group-action
cn-sidebar-menu-button
cn-sidebar-menu-button-variant-default
cn-sidebar-menu-button-variant-outline
cn-sidebar-menu-button-size-default
cn-sidebar-menu-button-size-sm
cn-sidebar-menu-button-size-lg
cn-sidebar-menu-action
cn-sidebar-menu-badge
cn-sidebar-menu-skeleton
cn-sidebar-menu-skeleton-icon
cn-sidebar-menu-skeleton-text
cn-sidebar-menu-sub
cn-sidebar-menu-sub-button
```

### Skeleton (1 class)
```
cn-skeleton
```

### Slider (4 classes)
```
cn-slider
cn-slider-track
cn-slider-range
cn-slider-thumb
```

### Sonner / Toast (1 class)
```
cn-toast
```

### Switch (2 classes)
```
cn-switch
cn-switch-thumb
```

### Table (9 classes)
```
cn-table-container
cn-table
cn-table-header
cn-table-body
cn-table-footer
cn-table-row
cn-table-head
cn-table-cell
cn-table-caption
```

### Tabs (4 classes)
```
cn-tabs
cn-tabs-list
cn-tabs-trigger
cn-tabs-content
```

### Textarea (1 class)
```
cn-textarea
```

### Toggle (6 classes)
```
cn-toggle
cn-toggle-variant-default
cn-toggle-variant-outline
cn-toggle-size-default
cn-toggle-size-sm
cn-toggle-size-lg
```

### Toggle Group (2 classes)
```
cn-toggle-group
cn-toggle-group-item
```

### Tooltip (4 classes)
```
cn-tooltip-content
cn-tooltip-content-logical
cn-tooltip-arrow
cn-tooltip-arrow-logical
```

### Input Group (13 classes)
```
cn-input-group
cn-input-group-addon
cn-input-group-addon-align-inline-start
cn-input-group-addon-align-inline-end
cn-input-group-addon-align-block-start
cn-input-group-addon-align-block-end
cn-input-group-button
cn-input-group-button-size-xs
cn-input-group-button-size-icon-xs
cn-input-group-button-size-icon-sm
cn-input-group-text
cn-input-group-input
cn-input-group-textarea
```

### Menu Translucent (1 class)
```
cn-menu-translucent
```

---

## 4. Theme Format

Themes are defined in `src/lib/registry/themes.ts`. There are two arrays:

- **`BASE_THEMES`** -- Full theme definitions (all 30+ tokens for light and dark). These define complete color palettes like `neutral`, `stone`, `zinc`, `mauve`, `olive`, `mist`, `taupe`.
- **`THEMES`** -- Spread of `BASE_THEMES` plus color accent themes that only override `primary`, `secondary`, `chart-*`, and `sidebar-primary` tokens. These inherit the rest from the active base theme.

### TypeScript Object Structure

**Base Theme (full definition):**
```typescript
{
    name: "mytheme",          // lowercase, url-safe identifier
    title: "My Theme",       // display name
    type: "registry:theme",  // always this literal
    cssVars: {
        light: {
            // ALL tokens must be defined for light mode
            background: "oklch(1 0 0)",
            foreground: "oklch(0.145 0 0)",
            card: "oklch(1 0 0)",
            "card-foreground": "oklch(0.145 0 0)",
            popover: "oklch(1 0 0)",
            "popover-foreground": "oklch(0.145 0 0)",
            primary: "oklch(0.205 0 0)",
            "primary-foreground": "oklch(0.985 0 0)",
            secondary: "oklch(0.97 0 0)",
            "secondary-foreground": "oklch(0.205 0 0)",
            muted: "oklch(0.97 0 0)",
            "muted-foreground": "oklch(0.556 0 0)",
            accent: "oklch(0.97 0 0)",
            "accent-foreground": "oklch(0.205 0 0)",
            destructive: "oklch(0.577 0.245 27.325)",
            border: "oklch(0.922 0 0)",
            input: "oklch(0.922 0 0)",
            ring: "oklch(0.708 0 0)",
            "chart-1": "oklch(0.809 0.105 251.813)",
            "chart-2": "oklch(0.623 0.214 259.815)",
            "chart-3": "oklch(0.546 0.245 262.881)",
            "chart-4": "oklch(0.488 0.243 264.376)",
            "chart-5": "oklch(0.424 0.199 265.638)",
            radius: "0.625rem",
            sidebar: "oklch(0.985 0 0)",
            "sidebar-foreground": "oklch(0.145 0 0)",
            "sidebar-primary": "oklch(0.205 0 0)",
            "sidebar-primary-foreground": "oklch(0.985 0 0)",
            "sidebar-accent": "oklch(0.97 0 0)",
            "sidebar-accent-foreground": "oklch(0.205 0 0)",
            "sidebar-border": "oklch(0.922 0 0)",
            "sidebar-ring": "oklch(0.708 0 0)",
        },
        dark: {
            // ALL tokens must be defined for dark mode
            background: "oklch(0.145 0 0)",
            foreground: "oklch(0.985 0 0)",
            card: "oklch(0.205 0 0)",
            "card-foreground": "oklch(0.985 0 0)",
            popover: "oklch(0.205 0 0)",
            "popover-foreground": "oklch(0.985 0 0)",
            primary: "oklch(0.922 0 0)",
            "primary-foreground": "oklch(0.205 0 0)",
            secondary: "oklch(0.269 0 0)",
            "secondary-foreground": "oklch(0.985 0 0)",
            muted: "oklch(0.269 0 0)",
            "muted-foreground": "oklch(0.708 0 0)",
            accent: "oklch(0.269 0 0)",
            "accent-foreground": "oklch(0.985 0 0)",
            destructive: "oklch(0.704 0.191 22.216)",
            border: "oklch(1 0 0 / 10%)",
            input: "oklch(1 0 0 / 15%)",
            ring: "oklch(0.556 0 0)",
            "chart-1": "oklch(0.809 0.105 251.813)",
            "chart-2": "oklch(0.623 0.214 259.815)",
            "chart-3": "oklch(0.546 0.245 262.881)",
            "chart-4": "oklch(0.488 0.243 264.376)",
            "chart-5": "oklch(0.424 0.199 265.638)",
            sidebar: "oklch(0.205 0 0)",
            "sidebar-foreground": "oklch(0.985 0 0)",
            "sidebar-primary": "oklch(0.488 0.243 264.376)",
            "sidebar-primary-foreground": "oklch(0.985 0 0)",
            "sidebar-accent": "oklch(0.269 0 0)",
            "sidebar-accent-foreground": "oklch(0.985 0 0)",
            "sidebar-border": "oklch(1 0 0 / 10%)",
            "sidebar-ring": "oklch(0.556 0 0)",
        },
    },
}
```

**Color Accent Theme (partial override, added to THEMES array):**
```typescript
{
    name: "blue",
    title: "Blue",
    type: "registry:theme",
    cssVars: {
        light: {
            primary: "oklch(0.488 0.243 264.376)",
            "primary-foreground": "oklch(0.97 0.014 254.604)",
            secondary: "oklch(0.967 0.001 286.375)",
            "secondary-foreground": "oklch(0.21 0.006 285.885)",
            "chart-1": "oklch(0.809 0.105 251.813)",
            "chart-2": "oklch(0.623 0.214 259.815)",
            "chart-3": "oklch(0.546 0.245 262.881)",
            "chart-4": "oklch(0.488 0.243 264.376)",
            "chart-5": "oklch(0.424 0.199 265.638)",
            "sidebar-primary": "oklch(0.546 0.245 262.881)",
            "sidebar-primary-foreground": "oklch(0.97 0.014 254.604)",
        },
        dark: {
            primary: "oklch(0.424 0.199 265.638)",
            "primary-foreground": "oklch(0.97 0.014 254.604)",
            secondary: "oklch(0.274 0.006 286.033)",
            "secondary-foreground": "oklch(0.985 0 0)",
            "chart-1": "oklch(0.809 0.105 251.813)",
            "chart-2": "oklch(0.623 0.214 259.815)",
            "chart-3": "oklch(0.546 0.245 262.881)",
            "chart-4": "oklch(0.488 0.243 264.376)",
            "chart-5": "oklch(0.424 0.199 265.638)",
            "sidebar-primary": "oklch(0.623 0.214 259.815)",
            "sidebar-primary-foreground": "oklch(0.97 0.014 254.604)",
        },
    },
}
```

### Complete List of Color Tokens (30+ tokens, light AND dark)

**Core surface tokens:**
| Token | Purpose |
|-------|---------|
| `background` | Page background |
| `foreground` | Default text color |
| `card` | Card background |
| `card-foreground` | Card text |
| `popover` | Popover/dropdown background |
| `popover-foreground` | Popover text |

**Semantic color tokens:**
| Token | Purpose |
|-------|---------|
| `primary` | Main brand/action color (buttons, links) |
| `primary-foreground` | Text on primary backgrounds |
| `secondary` | Supporting/neutral color |
| `secondary-foreground` | Text on secondary backgrounds |
| `muted` | Subtle backgrounds |
| `muted-foreground` | De-emphasized text |
| `accent` | Highlight/hover states |
| `accent-foreground` | Text on accent backgrounds |
| `destructive` | Error/danger color |

**UI chrome tokens:**
| Token | Purpose |
|-------|---------|
| `border` | Border color for most elements |
| `input` | Input field border color |
| `ring` | Focus ring color |

**Chart tokens:**
| Token | Purpose |
|-------|---------|
| `chart-1` | Lightest chart color |
| `chart-2` | Second chart color |
| `chart-3` | Middle chart color |
| `chart-4` | Fourth chart color |
| `chart-5` | Darkest chart color |

**Layout token:**
| Token | Purpose |
|-------|---------|
| `radius` | Base border radius (light mode only, e.g. `"0.625rem"`) |

**Sidebar tokens:**
| Token | Purpose |
|-------|---------|
| `sidebar` | Sidebar background |
| `sidebar-foreground` | Sidebar text |
| `sidebar-primary` | Sidebar active/primary action |
| `sidebar-primary-foreground` | Text on sidebar primary |
| `sidebar-accent` | Sidebar hover/accent background |
| `sidebar-accent-foreground` | Text on sidebar accent |
| `sidebar-border` | Sidebar border color |
| `sidebar-ring` | Sidebar focus ring |

### Color Format

All colors MUST use OKLCH format:
```
oklch(lightness chroma hue)
```

- **lightness**: 0 (black) to 1 (white)
- **chroma**: 0 (gray) to ~0.4 (maximum saturation, varies by hue)
- **hue**: 0-360 degrees on the color wheel

Alpha variants are also supported:
```
oklch(1 0 0 / 10%)
oklch(1 0 0 / 15%)
```

### Existing Base Theme Names
`neutral`, `stone`, `zinc`, `mauve`, `olive`, `mist`, `taupe`

### Existing Color Accent Theme Names
`amber`, `blue`, `cyan`, `emerald`, `fuchsia`, `green`, `indigo`, `lime`, `orange`, `pink`, `purple`, `red`, `rose`, `sky`, `teal`, `violet`, `yellow`, `custom`

---

## 5. Styles Registry Format

### File: `src/lib/registry/styles/index.ts`

**Import the icon component and add an entry to the STYLES array:**

```typescript
import Vega from "./icons/vega.svelte";
import Nova from "./icons/nova.svelte";
import Maia from "./icons/maia.svelte";
import Lyra from "./icons/lyra.svelte";
import Mira from "./icons/mira.svelte";
import Custom from "./icons/custom.svelte";
import MyStyle from "./icons/mystyle.svelte";  // <-- ADD import

export const STYLES = [
	{
		name: "vega",
		title: "Vega",
		description: "The classic shadcn/ui look. Clean, neutral, and familiar.",
		icon: Vega,
	},
	// ... existing entries ...
	{
		name: "mystyle",                           // <-- ADD entry
		title: "My Style",
		description: "Short description of this style's visual personality.",
		icon: MyStyle,
	},
] as const;

export type Style = (typeof STYLES)[number];
```

### Icon Component Format

**File: `src/lib/registry/styles/icons/{name}.svelte`**

Each icon is a simple Svelte component wrapping an SVG:

```svelte
<script lang="ts">
	import type { SVGAttributes } from "svelte/elements";

	let { ...restProps }: SVGAttributes<SVGSVGElement> = $props();
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	width="128"
	height="128"
	viewBox="0 0 24 24"
	fill="none"
	role="img"
	color="currentColor"
	{...restProps}
>
	<path
		d="M2 12C2 9.19974 ... Z"
		stroke="currentColor"
		stroke-width="2"
		stroke-linejoin="round"
	></path>
</svg>
```

The SVG should be a simple geometric shape (24x24 viewBox) that visually represents the style's personality:
- **Nova** uses a rounded rectangle (compact, structured)
- **Vega**, **Lyra**, **Maia**, **Mira** each use distinct shapes

Use `stroke="currentColor"` so the icon inherits the text color.

---

## 6. app.css Integration

### File: `src/app.css`

Two additions are needed in specific locations:

**1. Add the CSS import (lines 4-9 area):**

```css
@import "tailwindcss";
@import "tw-animate-css";

@import "./lib/registry/styles/style-vega.css" layer(base);
@import "./lib/registry/styles/style-nova.css" layer(base);
@import "./lib/registry/styles/style-lyra.css" layer(base);
@import "./lib/registry/styles/style-maia.css" layer(base);
@import "./lib/registry/styles/style-mira.css" layer(base);
@import "./lib/registry/styles/style-custom.css" layer(base);
@import "./lib/registry/styles/style-mystyle.css" layer(base);  /* <-- ADD */
```

The `layer(base)` is required so styles apply at the correct cascade level.

**2. Add the @custom-variant (lines 29-34 area):**

```css
@custom-variant style-vega (&:where(.style-vega *));
@custom-variant style-nova (&:where(.style-nova *));
@custom-variant style-lyra (&:where(.style-lyra *));
@custom-variant style-maia (&:where(.style-maia *));
@custom-variant style-mira (&:where(.style-mira *));
@custom-variant style-custom (&:where(.style-custom *));
@custom-variant style-mystyle (&:where(.style-mystyle *));  /* <-- ADD */
```

This enables the `style-{name}:` variant prefix in Tailwind, scoping classes to only apply when the named style is active.

---

## 7. Config/Preset Format

### File: `src/lib/registry/config.ts`

Add an entry to the `PRESETS` array:

```typescript
export const PRESETS: Preset[] = [
	{
		name: "vega",
		title: "Vega",
		description: "Vega / Lucide / Geist Sans",
		style: "vega",
		baseColor: "neutral",
		theme: "neutral",
		iconLibrary: "lucide",
		font: "geist",
		menuAccent: "subtle",
		menuColor: "default",
		radius: "default",
	},
	// ... other presets ...
	{
		name: "mystyle",                              // <-- ADD
		title: "My Style",
		description: "My Style / Lucide / Inter",     // format: "Style / IconLib / Font"
		style: "mystyle",                             // must match STYLES entry name
		baseColor: "neutral",                         // one of: neutral, stone, zinc, mauve, olive, mist, taupe
		theme: "mystyle",                             // must match THEMES entry name (or a base theme name)
		iconLibrary: "lucide",                        // one of: lucide, hugeicons, tabler
		font: "inter",                                // one of the PRESET_FONTS values
		menuAccent: "subtle",                         // "subtle" or "bold"
		menuColor: "default",                         // "default", "inverted", "default-translucent", "inverted-translucent"
		radius: "default",                            // "default", "none", "small", "medium", "large"
	},
];
```

### Preset Type Definition
```typescript
export type Preset = {
	name: string;
	title: string;
	description: string;
} & DesignSystemConfig;

// Where DesignSystemConfig is:
export type DesignSystemConfig = {
	style: string;        // matches a STYLES[].name
	baseColor: string;    // matches a BASE_THEMES[].name
	theme: string;        // matches a THEMES[].name
	iconLibrary: string;  // "lucide" | "hugeicons" | "tabler"
	font: string;         // from PRESET_FONTS
	menuAccent: string;   // "subtle" | "bold"
	menuColor: string;    // "default" | "inverted" | "default-translucent" | "inverted-translucent"
	radius: string;       // "default" | "none" | "small" | "medium" | "large"
};
```

### Radius Values
| Name | Label | Value |
|------|-------|-------|
| `default` | Default | `0.5rem` |
| `none` | None | `0rem` |
| `small` | Small | `0.45rem` |
| `medium` | Medium | `0.625rem` |
| `large` | Large | `0.875rem` |

---

## 8. Font Integration

### File: `src/lib/registry/fonts.ts`

Each font entry has this structure:

```typescript
{
    name: "font-inter",                               // "font-" prefix + slug
    title: "Inter",                                   // display name
    type: "registry:font",                            // always this literal
    font: {
        family: "'Inter Variable', sans-serif",       // CSS font-family value
        provider: "google",                           // font provider
        variable: "--font-sans",                      // CSS variable: --font-sans, --font-mono, or --font-serif
        subsets: ["latin"],                            // optional
        import: "Inter",                              // Google Fonts import name
        dependency: "@fontsource-variable/inter",     // npm package
    },
}
```

### Existing Fonts

**Sans-serif fonts** (variable: `--font-sans`):
- `geist` -- Geist (`@fontsource-variable/geist`)
- `inter` -- Inter (`@fontsource-variable/inter`)
- `noto-sans` -- Noto Sans (`@fontsource-variable/noto-sans`)
- `nunito-sans` -- Nunito Sans (`@fontsource-variable/nunito-sans`)
- `figtree` -- Figtree (`@fontsource-variable/figtree`)
- `roboto` -- Roboto (`@fontsource-variable/roboto`)
- `raleway` -- Raleway (`@fontsource-variable/raleway`)
- `dm-sans` -- DM Sans (`@fontsource-variable/dm-sans`)
- `public-sans` -- Public Sans (`@fontsource-variable/public-sans`)
- `outfit` -- Outfit (`@fontsource-variable/outfit`)

**Monospace fonts** (variable: `--font-mono`):
- `jetbrains-mono` -- JetBrains Mono (`@fontsource-variable/jetbrains-mono`)
- `geist-mono` -- Geist Mono (`@fontsource-variable/geist-mono`)

**Serif fonts** (variable: `--font-serif`):
- `noto-serif` -- Noto Serif (`@fontsource-variable/noto-serif`)
- `roboto-slab` -- Roboto Slab (`@fontsource-variable/roboto-slab`)
- `merriweather` -- Merriweather (`@fontsource-variable/merriweather`)
- `lora` -- Lora (`@fontsource-variable/lora`)
- `playfair-display` -- Playfair Display (`@fontsource-variable/playfair-display`)

### Adding a New Font

If a new font is needed:

1. **Install the package:**
   ```bash
   pnpm add @fontsource-variable/{font-slug}
   ```

2. **Add import to `src/app.css`** (in the font imports section, lines 11-27):
   ```css
   @import "@fontsource-variable/{font-slug}/index.css";
   ```

3. **Add entry to `src/lib/registry/fonts.ts`** in the `fonts` array.

---

## 9. Hex to OKLCH Conversion Guide

### OKLCH Color Space

OKLCH stands for **Oklab Lightness, Chroma, Hue**. It is a perceptually uniform color space, meaning equal numeric differences produce equal perceived color differences.

```
oklch(L C H)
```

- **L (Lightness)**: 0 = black, 1 = white
- **C (Chroma)**: 0 = gray, higher = more colorful (max varies, typically 0-0.4)
- **H (Hue)**: 0-360 degrees

### Conversion Approach

To convert hex colors to OKLCH:

1. **Use browser DevTools**: Chrome/Firefox DevTools color picker can convert between formats.
2. **Use online tools**: [oklch.com](https://oklch.com) provides interactive conversion.
3. **Use CSS Color Level 4**: Modern browsers natively understand `oklch()`.
4. **Programmatic**: Use the `culori` npm package:
   ```javascript
   import { oklch, formatCss } from "culori";
   const color = oklch("#3b82f6");
   // Returns { mode: "oklch", l: 0.6233, c: 0.2138, h: 259.8 }
   ```

### Common Color Mappings (Hex to OKLCH)

#### Pure Colors
| Color | Hex | OKLCH |
|-------|-----|-------|
| White | `#ffffff` | `oklch(1 0 0)` |
| Black | `#000000` | `oklch(0 0 0)` |
| Pure Red | `#ff0000` | `oklch(0.628 0.258 29.234)` |
| Pure Green | `#00ff00` | `oklch(0.866 0.295 142.495)` |
| Pure Blue | `#0000ff` | `oklch(0.452 0.313 264.052)` |

#### Grays (chroma = 0, hue = 0)
| Shade | Hex | OKLCH |
|-------|-----|-------|
| Gray 50 | `#fafafa` | `oklch(0.985 0 0)` |
| Gray 100 | `#f5f5f5` | `oklch(0.97 0 0)` |
| Gray 200 | `#e5e5e5` | `oklch(0.922 0 0)` |
| Gray 300 | `#d4d4d4` | `oklch(0.869 0 0)` |
| Gray 400 | `#a3a3a3` | `oklch(0.708 0 0)` |
| Gray 500 | `#737373` | `oklch(0.556 0 0)` |
| Gray 600 | `#525252` | `oklch(0.439 0 0)` |
| Gray 700 | `#404040` | `oklch(0.371 0 0)` |
| Gray 800 | `#262626` | `oklch(0.269 0 0)` |
| Gray 900 | `#171717` | `oklch(0.205 0 0)` |
| Gray 950 | `#0a0a0a` | `oklch(0.145 0 0)` |

#### Tailwind Blue Scale
| Shade | Hex | OKLCH |
|-------|-----|-------|
| Blue 50 | `#eff6ff` | `oklch(0.97 0.014 254.604)` |
| Blue 100 | `#dbeafe` | `oklch(0.932 0.032 255.585)` |
| Blue 200 | `#bfdbfe` | `oklch(0.882 0.059 254.128)` |
| Blue 300 | `#93c5fd` | `oklch(0.809 0.105 251.813)` |
| Blue 400 | `#60a5fa` | `oklch(0.718 0.165 254.624)` |
| Blue 500 | `#3b82f6` | `oklch(0.623 0.214 259.815)` |
| Blue 600 | `#2563eb` | `oklch(0.546 0.245 262.881)` |
| Blue 700 | `#1d4ed8` | `oklch(0.488 0.243 264.376)` |
| Blue 800 | `#1e40af` | `oklch(0.424 0.199 265.638)` |
| Blue 900 | `#1e3a8a` | `oklch(0.379 0.146 265.522)` |

#### Tailwind Red Scale
| Shade | Hex | OKLCH |
|-------|-----|-------|
| Red 50 | `#fef2f2` | `oklch(0.971 0.013 17.38)` |
| Red 500 | `#ef4444` | `oklch(0.637 0.237 25.331)` |
| Red 600 | `#dc2626` | `oklch(0.577 0.245 27.325)` |
| Red 700 | `#b91c1c` | `oklch(0.505 0.213 27.518)` |

#### Tailwind Green Scale
| Shade | Hex | OKLCH |
|-------|-----|-------|
| Green 50 | `#f0fdf4` | `oklch(0.982 0.018 155.826)` |
| Green 500 | `#22c55e` | `oklch(0.723 0.219 149.579)` |
| Green 600 | `#16a34a` | `oklch(0.627 0.194 149.214)` |
| Green 700 | `#15803d` | `oklch(0.527 0.154 150.069)` |

### OKLCH Hue Reference

| Hue Range | Color Family |
|-----------|-------------|
| 0-30 | Red / Rose |
| 30-60 | Orange / Amber |
| 60-110 | Yellow / Lime |
| 110-160 | Green |
| 160-200 | Teal / Cyan |
| 200-250 | Sky / Blue |
| 250-290 | Indigo / Violet |
| 290-330 | Purple / Fuchsia |
| 330-360 | Pink / Rose |

### Light/Dark Mode Pattern

For light mode:
- **Primary**: Use a darker shade (lower L, ~0.4-0.55)
- **Primary foreground**: Use a very light tint (high L, ~0.97-0.99)
- **Backgrounds**: White or near-white (L ~1.0)
- **Foregrounds**: Very dark (L ~0.14-0.21)
- **Borders**: Light gray (L ~0.92)
- **Muted**: Light gray (L ~0.96-0.97)

For dark mode:
- **Primary**: Use a lighter shade (higher L, ~0.7-0.92) OR a slightly darker but vivid shade (~0.42-0.48)
- **Primary foreground**: Depends on primary lightness (dark text on light primary, light text on dark primary)
- **Backgrounds**: Very dark (L ~0.14-0.15)
- **Card/Popover**: Slightly lighter than background (L ~0.20-0.22)
- **Foregrounds**: Near white (L ~0.985)
- **Borders**: Semi-transparent white (`oklch(1 0 0 / 10%)`)
- **Input borders**: Semi-transparent white (`oklch(1 0 0 / 15%)`)
- **Muted**: Dark gray (L ~0.26-0.28)

---

## 10. Design Token Mapping Guide

When implementing a design system based on a brand's color palette, map the source colors to shadcn tokens as follows:

### Primary Token Family
**Source**: Main brand color (the color used for primary CTAs, buttons, links)

| Token | Maps to |
|-------|---------|
| `primary` | The brand's main action color at medium-dark shade |
| `primary-foreground` | White or very light tint that is legible on primary |

Example: If brand color is `#2563eb` (Blue 600), then:
- Light `primary`: `oklch(0.546 0.245 262.881)` (the color itself)
- Light `primary-foreground`: `oklch(0.97 0.014 254.604)` (very light blue-white)
- Dark `primary`: `oklch(0.424 0.199 265.638)` (darker shade, or lighter to be visible on dark bg)
- Dark `primary-foreground`: `oklch(0.97 0.014 254.604)` (same light tint)

### Secondary Token Family
**Source**: Supporting/neutral color, often gray-based

| Token | Maps to |
|-------|---------|
| `secondary` | Light neutral background (for secondary buttons, tags) |
| `secondary-foreground` | Dark text on secondary background |

Typical approach: Use the base theme's gray with minimal chroma for neutrality.

### Accent Token Family
**Source**: Highlight color for hover states, menu highlights

| Token | Maps to |
|-------|---------|
| `accent` | Hover/highlight background (menus, list items) |
| `accent-foreground` | Text color when on accent background |

Default: Same as `secondary` (neutral gray). Override to `primary` values for "bold" menu accent.

### Destructive Token
**Source**: Error/danger/delete color (almost always red)

| Token | Maps to |
|-------|---------|
| `destructive` | Red shade for error states, delete buttons |

Standard values:
- Light: `oklch(0.577 0.245 27.325)` (Red 600 equivalent)
- Dark: `oklch(0.704 0.191 22.216)` (lighter red for dark backgrounds)

### Muted Token Family
**Source**: Subtle backgrounds, disabled states, de-emphasized elements

| Token | Maps to |
|-------|---------|
| `muted` | Very light background (tooltips, badges, subtle areas) |
| `muted-foreground` | Dimmed text (descriptions, placeholders, timestamps) |

### Surface Tokens (Background, Card, Popover)
These tokens control the layering of surfaces:

| Token | Light Mode | Dark Mode |
|-------|------------|-----------|
| `background` | Pure white `oklch(1 0 0)` | Very dark `oklch(0.14-0.15 ...)` |
| `card` | White (same as bg, or very slightly tinted) | Slightly lighter than bg `oklch(0.20-0.22 ...)` |
| `popover` | Same as card | Same as card |
| `sidebar` | Slightly off-white `oklch(0.985 ...)` | Same as card |

For each, the `-foreground` variant is the text color used on that surface.

### Border / Input / Ring Tokens

| Token | Light Mode | Dark Mode |
|-------|------------|-----------|
| `border` | Light gray `oklch(0.92 ...)` | Semi-transparent `oklch(1 0 0 / 10%)` |
| `input` | Same as border | `oklch(1 0 0 / 15%)` (slightly more visible) |
| `ring` | Medium gray `oklch(0.70 ...)` | Darker gray `oklch(0.55 ...)` |

### Chart Tokens (chart-1 through chart-5)
Chart colors form a **5-step gradient** from light to dark in the brand hue:

| Token | Role | Typical Lightness |
|-------|------|-------------------|
| `chart-1` | Lightest chart color | L ~0.80-0.90 |
| `chart-2` | Second lightest | L ~0.62-0.77 |
| `chart-3` | Middle | L ~0.55-0.65 |
| `chart-4` | Second darkest | L ~0.48-0.55 |
| `chart-5` | Darkest chart color | L ~0.42-0.48 |

Pattern: Keep the same hue (H), decrease lightness (L), and adjust chroma (C) for each step. Chart colors are typically the same in both light and dark modes.

### Sidebar Tokens
Sidebar tokens mirror the main tokens but allow independent sidebar theming:

| Token | Maps to |
|-------|---------|
| `sidebar` | Sidebar background (slightly off-white in light, same as card in dark) |
| `sidebar-foreground` | Same as foreground |
| `sidebar-primary` | Active item color in sidebar (often matches primary or a brighter variant) |
| `sidebar-primary-foreground` | Text on sidebar primary |
| `sidebar-accent` | Hover background in sidebar (same as muted/accent) |
| `sidebar-accent-foreground` | Text on sidebar accent |
| `sidebar-border` | Same as border |
| `sidebar-ring` | Same as ring |

### Quick Mapping Checklist

When given a design system with a color palette:

1. Identify the **primary brand color** -> `primary` + `primary-foreground`
2. Pick a **neutral gray family** (pure gray, warm gray, cool gray) -> `background`, `foreground`, `card`, `popover`, `muted`, `secondary`, `border`, `input`, `ring`, all sidebar tokens
3. Use **red/danger** for `destructive` (usually keep the standard values)
4. Set `accent` = `secondary` for subtle mode, or `accent` = `primary` for bold mode
5. Generate **5-step chart palette** from the primary hue
6. Create the **dark mode** counterpart by inverting light/dark relationships while preserving the color identity
7. Ensure **contrast ratios**: foreground text must be legible on its background (minimum 4.5:1 for normal text per WCAG)

### Example: Mapping a Teal Brand (#0d9488)

```
Hex #0d9488 -> oklch(0.6 0.118 184.704)

Light mode primary:    oklch(0.511 0.096 186.391)  -- slightly darker for better contrast
Light mode primary-fg: oklch(0.984 0.014 180.72)   -- near-white with teal tint

Dark mode primary:     oklch(0.437 0.078 188.216)  -- darker for dark backgrounds
Dark mode primary-fg:  oklch(0.984 0.014 180.72)   -- same light tint

Chart gradient (teal):
  chart-1: oklch(0.855 0.138 181.071)  -- lightest
  chart-2: oklch(0.704 0.14 182.503)
  chart-3: oklch(0.6 0.118 184.704)
  chart-4: oklch(0.511 0.096 186.391)
  chart-5: oklch(0.437 0.078 188.216)  -- darkest
```
