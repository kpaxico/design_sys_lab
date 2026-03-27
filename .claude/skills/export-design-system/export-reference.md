# Export Design System -- Reference

Templates and lookup tables referenced by the `/export-design-system` skill instructions.

---

## Section 1: Icon Library Resolution Patterns

### Lucide (default)

- **Import:** `import XIcon from '@lucide/svelte/icons/x';` (kebab-case path)
- **Usage:** `<XIcon class="..." />`
- **Icon name conversion:** PascalCase `ChevronDownIcon` to kebab `chevron-down` (strip "Icon" suffix, convert PascalCase to kebab-case)

### Tabler

- **Import:** `import { IconX } from '@tabler/icons-svelte/icons';`
- **Usage:** `<IconX class="..." />`

### Hugeicons

- **Import:**

  ```svelte
  import { HugeiconsIcon } from "@hugeicons/svelte";
  import { XIcon } from '@hugeicons/core-free-icons';
  ```

- **Usage:** `<HugeiconsIcon icon={XIcon} strokeWidth={2} class="..." />`

### Phosphor

- **Import:** `import XIcon from 'phosphor-svelte/lib/X';`
- **Usage:** `<XIcon class="..." />`

### Remixicon

- **Import:** `import { RiXLine } from "svelte-remixicon";`
- **Usage:** `<RiXLine class="..." />`

---

## Section 2: app.css Template

### @theme inline block

```css
@theme inline {
 --font-sans: {FONT_FAMILY};
 --font-mono: var(--font-mono);
 --radius: {RADIUS};
 --breakpoint-3xl: 1600px;
 --breakpoint-4xl: 2000px;
 --radius-sm: calc(var(--radius) - 4px);
 --radius-md: calc(var(--radius) - 2px);
 --radius-lg: var(--radius);
 --radius-xl: calc(var(--radius) + 4px);
 --radius-2xl: calc(var(--radius) + 8px);
 --radius-3xl: calc(var(--radius) + 12px);
 --radius-4xl: calc(var(--radius) + 16px);
 --color-background: var(--background);
 --color-foreground: var(--foreground);
 --color-card: var(--card);
 --color-card-foreground: var(--card-foreground);
 --color-popover: var(--popover);
 --color-popover-foreground: var(--popover-foreground);
 --color-primary: var(--primary);
 --color-primary-foreground: var(--primary-foreground);
 --color-secondary: var(--secondary);
 --color-secondary-foreground: var(--secondary-foreground);
 --color-muted: var(--muted);
 --color-muted-foreground: var(--muted-foreground);
 --color-accent: var(--accent);
 --color-accent-foreground: var(--accent-foreground);
 --color-destructive: var(--destructive);
 --color-destructive-foreground: var(--destructive-foreground);
 --color-border: var(--border);
 --color-input: var(--input);
 --color-ring: var(--ring);
 --color-chart-1: var(--chart-1);
 --color-chart-2: var(--chart-2);
 --color-chart-3: var(--chart-3);
 --color-chart-4: var(--chart-4);
 --color-chart-5: var(--chart-5);
 --color-sidebar: var(--sidebar);
 --color-sidebar-foreground: var(--sidebar-foreground);
 --color-sidebar-primary: var(--sidebar-primary);
 --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
 --color-sidebar-accent: var(--sidebar-accent);
 --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
 --color-sidebar-border: var(--sidebar-border);
 --color-sidebar-ring: var(--sidebar-ring);
 --color-surface: var(--surface);
 --color-surface-foreground: var(--surface-foreground);
 --color-code: var(--code);
 --color-code-foreground: var(--code-foreground);
 --color-code-highlight: var(--code-highlight);
 --color-code-number: var(--code-number);
 --color-selection: var(--selection);
 --color-selection-foreground: var(--selection-foreground);
}
```

### :root and .dark blocks

```css
:root {
 {LIGHT_TOKENS}
}

.dark {
 {DARK_TOKENS}
}
```

### @layer base block

```css
@layer base {
 * {
  @apply border-border outline-ring/50;
 }

 ::selection {
  @apply bg-selection text-selection-foreground;
 }

 html {
  @apply overscroll-none scroll-smooth;
 }

 body {
  font-synthesis-weight: none;
  text-rendering: optimizeLegibility;
 }

 @supports (font: -apple-system-body) and (-webkit-appearance: none) {
  [data-wrapper] {
   @apply min-[1800px]:border-t;
  }
 }

 a:active,
 button:active {
  @apply opacity-60 md:opacity-100;
 }
}
```

### @custom-variant definitions (data-*)

```css
@custom-variant dark (&:is(.dark *));

@custom-variant data-open {
 &:where([data-state="open"]),
 &:where([data-open]:not([data-open="false"])) {
  @slot;
 }
}

@custom-variant data-closed {
 &:where([data-state="closed"]),
 &:where([data-closed]:not([data-closed="false"])) {
  @slot;
 }
}

@custom-variant data-checked {
 &:where([data-state="checked"]),
 &:where([data-checked]:not([data-checked="false"])) {
  @slot;
 }
}

@custom-variant data-unchecked {
 &:where([data-state="unchecked"]),
 &:where([data-unchecked]:not([data-unchecked="false"])) {
  @slot;
 }
}

@custom-variant data-selected {
 &:where([data-selected]) {
  @slot;
 }
}

@custom-variant data-disabled {
 &:where([data-disabled="true"]),
 &:where([data-disabled]:not([data-disabled="false"])) {
  @slot;
 }
}

@custom-variant data-active {
 &:where([data-state="active"]),
 &:where([data-active]:not([data-active="false"])) {
  @slot;
 }
}

@custom-variant data-horizontal {
 &:where([data-orientation="horizontal"]) {
  @slot;
 }
}

@custom-variant data-vertical {
 &:where([data-orientation="vertical"]) {
  @slot;
 }
}
```

### Essential @utility definitions

```css
@utility no-scrollbar {
 -ms-overflow-style: none;
 scrollbar-width: none;

 &::-webkit-scrollbar {
  display: none;
 }
}

@utility border-grid {
 @apply border-border/50 dark:border-border;
}

@utility extend-touch-target {
 @media (pointer: coarse) {
  @apply relative touch-manipulation after:absolute after:-inset-2;
 }
}
```

---

## Section 3: Import Path Rewriting Rules

| Original path                                              | Rewritten path (from `ui/{component}/`)           |
|------------------------------------------------------------|---------------------------------------------------|
| `$lib/utils.js`                                            | `../../utils.js`                                  |
| `$lib/registry/ui/{other}/index.js`                        | `../{other}/index.js`                             |
| `$lib/registry/hooks/`                                     | `../../hooks/`                                    |
| `$lib/registry/lib/`                                       | `../../lib/`                                      |
| `$lib/components/icon-placeholder/icon-placeholder.svelte` | REMOVE (replaced by icon transform)               |
| Type imports from `$lib/registry/icons/__*__/index.js`     | REMOVE (no longer needed)                         |

---

## Section 4: npm Dependencies

### Core

- `bits-ui` -- headless components
- `tailwind-variants` -- tv utility
- `clsx` -- class merging
- `tailwind-merge` -- class merging
- `tw-animate-css` -- animations
- `tailwindcss` -- build

### Component-specific

- `vaul-svelte` -- drawer
- `embla-carousel-svelte` -- carousel
- `paneforge` -- resizable
- `svelte-sonner` -- toast
- `runed` -- utilities/hooks
- `mode-watcher` -- dark mode
- `cmdk-sv` -- command palette
- `formsnap` -- form
- `sveltekit-superforms` -- form
- `zod` -- form validation

### Icon libraries (install one of)

- `@lucide/svelte`
- `@tabler/icons-svelte`
- `@hugeicons/svelte` + `@hugeicons/core-free-icons`
- `phosphor-svelte`
- `svelte-remixicon`

---

## Section 5: Radius Values

| Preset name | CSS value           |
|-------------|---------------------|
| `none`      | `0rem`              |
| `small`     | `0.25rem`           |
| `medium`    | `0.5rem` (default)  |
| `large`     | `0.625rem`          |
| `full`      | `1rem`              |
