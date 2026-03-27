# Petmedilog Design System — Export Package

Exported from design_sys_lab with resolved components (no cn-* classes).
Font: 'Plus Jakarta Sans Variable', sans-serif | Icon library: lucide | Radius: large

## Quick Start

### 1. Copy files to your SvelteKit project

```bash
cp -r ui/ src/lib/components/ui/
cp utils.ts src/lib/utils.ts
cp -r hooks/ src/lib/hooks/
cp -r lib/ src/lib/lib/
```

### 2. Merge app.css

Copy the contents of `app.css` into your project's `src/app.css`.

### 3. Install dependencies

```bash
# Core
npm install -D bits-ui tailwind-variants clsx tailwind-merge tw-animate-css tailwindcss

# Component-specific
npm install -D vaul-svelte embla-carousel-svelte paneforge svelte-sonner runed mode-watcher cmdk-sv

# Form (optional)
npm install -D formsnap sveltekit-superforms zod

# Icons (lucide)
npm install -D @lucide/svelte

# Font
npm install -D @fontsource-variable/plus-jakarta-sans
```

## Usage Example

```svelte
<script>
    import { Button } from "$lib/components/ui/button/index.js";
    import { Card, CardHeader, CardTitle, CardContent } from "$lib/components/ui/card/index.js";
</script>

<Card>
    <CardHeader>
        <CardTitle>Welcome</CardTitle>
    </CardHeader>
    <CardContent>
        <Button>Get Started</Button>
    </CardContent>
</Card>
```

## What's Included

- **56 component directories** with all shadcn-svelte components
- **397 files** with styles baked in (no cn-* classes)
- **lucide icons** resolved to concrete imports
- **Light + Dark mode** color themes in OKLCH
- **Plus Jakarta Sans Variable** font configured
- **Radius: large** (0.625rem)
