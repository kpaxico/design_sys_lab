#!/usr/bin/env node
/**
 * export-transform.mjs — Deterministic design system exporter
 *
 * Usage: node scripts/export-transform.mjs <design-system-name>
 *
 * Reads the design system configuration from config.ts, parses the style CSS,
 * extracts theme tokens and font config, then transforms all component files
 * and generates a complete export package.
 *
 * All output goes to: design_systems/{name}/export/
 */

import {
	readFileSync, writeFileSync, mkdirSync, readdirSync, statSync,
	rmSync, existsSync, copyFileSync,
} from "node:fs";
import { join, dirname, relative } from "node:path";

// ── CLI argument ─────────────────────────────────────────────────────────────
const DS_NAME = process.argv[2];
if (!DS_NAME) {
	console.error("Usage: node scripts/export-transform.mjs <design-system-name>");
	process.exit(1);
}

// ── Paths ────────────────────────────────────────────────────────────────────
const ROOT = process.cwd();
const SRC_UI = join(ROOT, "src/lib/registry/ui");
const EXPORT_DIR = join(ROOT, "design_systems", DS_NAME, "export");
const DEST_UI = join(EXPORT_DIR, "ui");

// ── Step 1: Read preset configuration ────────────────────────────────────────
console.log(`\n[1/8] Reading preset for "${DS_NAME}"...`);
const configSrc = readFileSync(join(ROOT, "src/lib/registry/config.ts"), "utf-8");

function extractPreset(source, name) {
	// Find the preset block: { name: "petmedilog", ... }
	const regex = new RegExp(
		`\\{[^}]*name:\\s*"${name}"[^}]*\\}`,
		"s"
	);
	const match = source.match(regex);
	if (!match) throw new Error(`Preset "${name}" not found in config.ts`);
	const block = match[0];

	const get = (key) => {
		const m = block.match(new RegExp(`${key}:\\s*"([^"]+)"`));
		return m ? m[1] : null;
	};

	return {
		style: get("style"),
		theme: get("theme"),
		baseColor: get("baseColor"),
		font: get("font"),
		iconLibrary: get("iconLibrary"),
		menuColor: get("menuColor"),
		menuAccent: get("menuAccent"),
		radius: get("radius"),
	};
}

const preset = extractPreset(configSrc, DS_NAME);
console.log(`  style=${preset.style}, theme=${preset.theme}, font=${preset.font}, iconLibrary=${preset.iconLibrary}, radius=${preset.radius}`);

// ── Step 2: Parse style CSS → cn-* mapping ───────────────────────────────────
console.log("[2/8] Parsing style CSS...");
const styleCss = readFileSync(
	join(ROOT, `src/lib/registry/styles/style-${preset.style}.css`),
	"utf-8"
);

function parseStyleCss(css) {
	const styles = {};
	// Match .cn-* class rules and extract their @apply values
	// This regex finds: .cn-class-name { ... @apply classes; ... }
	const ruleRegex = /\.(cn-[\w-]+)\s*\{([^}]*)\}/g;
	let match;
	while ((match = ruleRegex.exec(css)) !== null) {
		const className = match[1];
		const body = match[2];
		const applyRegex = /@apply\s+([^;]+);/g;
		let applyMatch;
		const applies = [];
		while ((applyMatch = applyRegex.exec(body)) !== null) {
			applies.push(applyMatch[1].trim());
		}
		if (applies.length > 0) {
			styles[className] = applies.join(" ");
		}
	}
	return styles;
}

const cnMappings = parseStyleCss(styleCss);
const cnKeys = Object.keys(cnMappings).sort((a, b) => b.length - a.length);
console.log(`  Extracted ${cnKeys.length} cn-* class mappings`);

// ── Step 3: Extract theme tokens ─────────────────────────────────────────────
console.log("[3/8] Extracting theme tokens...");
const themesSrc = readFileSync(join(ROOT, "src/lib/registry/themes.ts"), "utf-8");

function extractThemeTokens(source, baseColorName, themeName) {
	// Extract a theme block's cssVars by finding the name and then parsing the cssVars object
	function extractCssVars(searchName, arrayName) {
		// Find the block starting with name: "searchName"
		const nameIdx = source.indexOf(`name: "${searchName}"`);
		if (nameIdx === -1) return { light: {}, dark: {} };

		// Find cssVars: { after that point
		const cssVarsIdx = source.indexOf("cssVars:", nameIdx);
		if (cssVarsIdx === -1) return { light: {}, dark: {} };

		// Extract light and dark blocks
		function extractBlock(label, startFrom) {
			const blockStart = source.indexOf(`${label}:`, startFrom);
			if (blockStart === -1) return {};

			const braceStart = source.indexOf("{", blockStart);
			if (braceStart === -1) return {};

			let depth = 0;
			let braceEnd = braceStart;
			for (let i = braceStart; i < source.length; i++) {
				if (source[i] === "{") depth++;
				if (source[i] === "}") depth--;
				if (depth === 0) { braceEnd = i; break; }
			}

			const blockStr = source.substring(braceStart + 1, braceEnd);
			const tokens = {};
			const tokenRegex = /"?([^":\s]+)"?\s*:\s*"([^"]+)"/g;
			let m;
			while ((m = tokenRegex.exec(blockStr)) !== null) {
				tokens[m[1]] = m[2];
			}
			return tokens;
		}

		const light = extractBlock("light", cssVarsIdx);
		const dark = extractBlock("dark", cssVarsIdx);
		return { light, dark };
	}

	const base = extractCssVars(baseColorName);
	const theme = extractCssVars(themeName);

	// Merge: theme overrides base
	return {
		light: { ...base.light, ...theme.light },
		dark: { ...base.dark, ...theme.dark },
	};
}

const tokens = extractThemeTokens(themesSrc, preset.baseColor, preset.theme);
console.log(`  Light tokens: ${Object.keys(tokens.light).length}, Dark tokens: ${Object.keys(tokens.dark).length}`);

// ── Step 4: Get font configuration ──────────────────────────────────────────
console.log("[4/8] Getting font configuration...");
const fontsSrc = readFileSync(join(ROOT, "src/lib/registry/fonts.ts"), "utf-8");

function extractFont(source, fontName) {
	const fullName = `font-${fontName}`;
	const nameIdx = source.indexOf(`name: "${fullName}"`);
	if (nameIdx === -1) throw new Error(`Font "${fullName}" not found in fonts.ts`);

	const fontBlockStart = source.indexOf("font:", nameIdx);
	const braceStart = source.indexOf("{", fontBlockStart);
	let depth = 0, braceEnd = braceStart;
	for (let i = braceStart; i < source.length; i++) {
		if (source[i] === "{") depth++;
		if (source[i] === "}") depth--;
		if (depth === 0) { braceEnd = i; break; }
	}

	const block = source.substring(braceStart, braceEnd + 1);
	const get = (key) => {
		const m = block.match(new RegExp(`${key}:\\s*"([^"]+)"`));
		return m ? m[1] : null;
	};

	return {
		family: get("family"),
		variable: get("variable"),
		dependency: get("dependency"),
	};
}

const font = extractFont(fontsSrc, preset.font);
console.log(`  Font: ${font.family} (${font.dependency})`);

// ── Step 5: Create export directory (clean) ──────────────────────────────────
console.log("[5/8] Creating export directory...");
if (existsSync(EXPORT_DIR)) {
	rmSync(EXPORT_DIR, { recursive: true });
}
mkdirSync(join(EXPORT_DIR, "ui"), { recursive: true });
mkdirSync(join(EXPORT_DIR, "hooks"), { recursive: true });
mkdirSync(join(EXPORT_DIR, "lib"), { recursive: true });

// ── Step 6: Generate app.css from source template ────────────────────────────
console.log("[6/8] Generating app.css...");

const RADIUS_MAP = {
	none: "0rem",
	small: "0.25rem",
	medium: "0.5rem",
	large: "0.625rem",
	full: "1rem",
};
const radiusValue = RADIUS_MAP[preset.radius] || "0.625rem";

// Read the source app.css as a template — extract everything EXCEPT
// the style imports, style custom-variants, font imports, and :root/.dark token values
const sourceAppCss = readFileSync(join(ROOT, "src/app.css"), "utf-8");

function buildAppCss() {
	// Extract the @theme inline block (between @theme inline { ... })
	const themeInlineMatch = sourceAppCss.match(/@theme inline \{[\s\S]*?\n\}/);
	const themeInlineBlock = themeInlineMatch ? themeInlineMatch[0] : "";

	// Replace the radius value in @theme inline
	const themeInline = themeInlineBlock.replace(
		/--radius:\s*[^;]+;/,
		`--radius: ${radiusValue};`
	);

	// Extract everything from @layer base onwards (custom variants, utilities, etc.)
	const layerBaseIdx = sourceAppCss.indexOf("@layer base");
	let restOfCss = layerBaseIdx !== -1 ? sourceAppCss.substring(layerBaseIdx) : "";

	// Remove docs-specific stuff: @layer components with rehype/mdsx/super-debug
	const layerComponentsIdx = restOfCss.indexOf("@layer components");
	if (layerComponentsIdx !== -1) {
		restOfCss = restOfCss.substring(0, layerComponentsIdx).trimEnd();
	}

	// Extract @custom-variant data-* blocks (between @layer base end and @utility)
	const customVariantSection = sourceAppCss.match(
		/\/\* Custom variants \*\/[\s\S]*?(?=@utility)/
	);
	const customVariants = customVariantSection ? customVariantSection[0] : "";

	// Extract @utility blocks (only the essential ones)
	const utilityBlocks = [];
	const utilityRegex = /@utility\s+[\w-]+\s*\{[\s\S]*?\n\}/g;
	let utilMatch;
	while ((utilMatch = utilityRegex.exec(sourceAppCss)) !== null) {
		const block = utilMatch[0];
		// Skip docs-specific utilities
		if (block.includes("container-wrapper") || block.includes("container {") ||
			block.includes("section-soft") || block.includes("theme-container") ||
			block.includes("border-ghost") || block.includes("bg-svelte-orange") ||
			block.includes("step {")) continue;
		// Avoid duplicate no-scrollbar
		if (block.includes("no-scrollbar") && utilityBlocks.some(b => b.includes("no-scrollbar"))) continue;
		utilityBlocks.push(block);
	}

	// Build :root and .dark blocks from merged tokens
	function formatTokenBlock(tokenObj) {
		return Object.entries(tokenObj)
			.filter(([key]) => key !== "radius")
			.map(([key, value]) => `\t--${key}: ${value};`)
			.join("\n");
	}

	// Add tokens that themes.ts doesn't provide but components need
	const extraLightTokens = {
		"destructive-foreground": tokens.light["destructive-foreground"] || "oklch(0.95 0.02 25)",
		"selection": tokens.light["selection"] || tokens.light["accent"] || "oklch(0.82 0.06 260)",
		"selection-foreground": tokens.light["selection-foreground"] || "oklch(1 0 0)",
		"surface": tokens.light["surface"] || tokens.light["background"] || "oklch(0.98 0 0)",
		"surface-foreground": tokens.light["surface-foreground"] || "var(--foreground)",
		"code": tokens.light["code"] || "var(--surface)",
		"code-foreground": tokens.light["code-foreground"] || "var(--surface-foreground)",
		"code-highlight": tokens.light["code-highlight"] || "oklch(0.96 0 0)",
		"code-number": tokens.light["code-number"] || "oklch(0.56 0 0)",
	};
	const extraDarkTokens = {
		"destructive-foreground": tokens.dark["destructive-foreground"] || "oklch(0.95 0.02 25)",
		"selection": tokens.dark["selection"] || tokens.dark["accent"] || "oklch(0.30 0.05 260)",
		"selection-foreground": tokens.dark["selection-foreground"] || "oklch(0.95 0.01 80)",
		"surface": tokens.dark["surface"] || "oklch(0.20 0 0)",
		"surface-foreground": tokens.dark["surface-foreground"] || "oklch(0.708 0 0)",
		"code": tokens.dark["code"] || "var(--surface)",
		"code-foreground": tokens.dark["code-foreground"] || "var(--surface-foreground)",
		"code-highlight": tokens.dark["code-highlight"] || "oklch(0.27 0 0)",
		"code-number": tokens.dark["code-number"] || "oklch(0.72 0 0)",
	};

	const mergedLight = { ...tokens.light, ...extraLightTokens };
	const mergedDark = { ...tokens.dark, ...extraDarkTokens };

	return `@import "tailwindcss";
@import "tw-animate-css";
@import "${font.dependency}/index.css";

@custom-variant dark (&:is(.dark *));

${themeInline}

:root {
\t${font.variable}: ${font.family};
\t--font-mono: "Geist Mono Variable", monospace;
${formatTokenBlock(mergedLight)}
}

.dark {
${formatTokenBlock(mergedDark)}
}

@layer base {
\t* {
\t\t@apply border-border outline-ring/50;
\t}

\t::selection {
\t\t@apply bg-selection text-selection-foreground;
\t}

\thtml {
\t\t@apply overscroll-none scroll-smooth;
\t}

\tbody {
\t\tfont-synthesis-weight: none;
\t\ttext-rendering: optimizeLegibility;
\t}

\ta:active,
\tbutton:active {
\t\t@apply opacity-60 md:opacity-100;
\t}
}

${customVariants}
${utilityBlocks.join("\n\n")}
`;
}

const appCss = buildAppCss();
writeFileSync(join(EXPORT_DIR, "app.css"), appCss, "utf-8");

// ── Step 7: Transform and copy all components ────────────────────────────────
console.log("[7/8] Transforming components...");

// -- Helpers --
function walk(dir) {
	let results = [];
	for (const entry of readdirSync(dir)) {
		const full = join(dir, entry);
		if (statSync(full).isDirectory()) {
			results = results.concat(walk(full));
		} else {
			results.push(full);
		}
	}
	return results;
}

function escapeRegex(str) {
	return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function pascalToKebab(name) {
	let base = name.replace(/Icon$/, "");
	return base
		.replace(/([a-z])([A-Z])/g, "$1-$2")
		.replace(/([A-Z])([A-Z][a-z])/g, "$1-$2")
		.replace(/([a-zA-Z])(\d)/g, "$1-$2")
		.replace(/(\d)([a-zA-Z])/g, "$1-$2")
		.toLowerCase();
}

// Build cn-* replacement regexes sorted by length descending (word-boundary safe)
const cnReplacements = cnKeys.map((key) => ({
	regex: new RegExp(escapeRegex(key) + "(?![-\\w])", "g"),
	value: cnMappings[key],
}));

function transformCnClasses(content) {
	for (const { regex, value } of cnReplacements) {
		content = content.replace(regex, value);
	}
	// Clean up any remaining cn-* marker classes (those without @apply rules)
	// Remove them from class strings: "cn-foo bar" → "bar", "bar cn-foo" → "bar"
	content = content.replace(/\bcn-[\w-]+\s*/g, (match, offset, str) => {
		// Only remove if it looks like it's inside a class string (preceded by " or space)
		const before = offset > 0 ? str[offset - 1] : "";
		if (before === '"' || before === " " || before === "\t") {
			return "";
		}
		return match;
	});
	// Also handle trailing: "bar cn-foo"
	content = content.replace(/\s+cn-[\w-]+(?=")/g, "");
	return content;
}

function transformIcons(content) {
	if (!content.includes("IconPlaceholder")) {
		return { content, transformed: false };
	}

	const iconUsages = [];
	const tagRegex = /<IconPlaceholder\b([\s\S]*?)\/>/g;
	let match;
	while ((match = tagRegex.exec(content)) !== null) {
		const attrs = match[1];
		const lucideMatch = attrs.match(/lucide="([^"]+)"/);
		if (lucideMatch) {
			iconUsages.push({ fullMatch: match[0], attrs: attrs, lucideName: lucideMatch[1] });
		}
	}

	// Remove IconPlaceholder import
	content = content.replace(/\timport IconPlaceholder from "[^"]*";\r?\n/g, "");

	if (iconUsages.length === 0) {
		return { content, transformed: true };
	}

	// Build lucide imports
	const uniqueIcons = [...new Set(iconUsages.map((u) => u.lucideName))].sort();
	const importLines = uniqueIcons.map((iconName) => {
		const kebab = pascalToKebab(iconName);
		return `\timport ${iconName} from "@lucide/svelte/icons/${kebab}";`;
	});

	// Insert imports after the <script> opening tag's last import line
	// Find a good insertion point: after the last existing import
	const lastImportIdx = content.lastIndexOf("\timport ");
	if (lastImportIdx !== -1) {
		const lineEnd = content.indexOf("\n", lastImportIdx);
		content = content.substring(0, lineEnd + 1) + importLines.join("\n") + "\n" + content.substring(lineEnd + 1);
	}

	// Replace each <IconPlaceholder ... /> with <LucideIcon ... />
	for (const usage of iconUsages) {
		const { fullMatch, attrs, lucideName } = usage;
		let cleanedAttrs = attrs
			.replace(/\s*lucide="[^"]*"/g, "")
			.replace(/\s*tabler="[^"]*"/g, "")
			.replace(/\s*hugeicons="[^"]*"/g, "")
			.replace(/\s*phosphor="[^"]*"/g, "")
			.replace(/\s*remixicon="[^"]*"/g, "");
		cleanedAttrs = cleanedAttrs.split("\n").filter((l) => l.trim() !== "").join("\n");
		const trimmed = cleanedAttrs.trim();
		let replacement;
		if (trimmed) {
			const attrLines = trimmed.split("\n").map((l) => l.trim());
			if (attrLines.length <= 2 && trimmed.length < 80) {
				replacement = `<${lucideName} ${attrLines.join(" ")} />`;
			} else {
				const matchIdx = content.indexOf(fullMatch);
				const lineStart = content.lastIndexOf("\n", matchIdx) + 1;
				const indent = content.substring(lineStart, matchIdx);
				const attrIndent = indent + "\t";
				const formattedAttrs = attrLines.map((l) => attrIndent + l).join("\n");
				replacement = `<${lucideName}\n${formattedAttrs}\n${indent}/>`;
			}
		} else {
			replacement = `<${lucideName} />`;
		}
		content = content.replace(fullMatch, replacement);
	}

	// Remove icon type imports
	content = content.replace(/\timport type \{[^}]*\} from "\$lib\/registry\/icons\/[^"]*";\r?\n/g, "");

	return { content, transformed: true };
}

function transformImports(content) {
	content = content.replaceAll('from "$lib/utils.js"', 'from "../../utils.js"');
	content = content.replace(
		/from "\$lib\/registry\/ui\/([^"]+)\/index\.js"/g,
		'from "../$1/index.js"'
	);
	content = content.replace(
		/from "\$lib\/registry\/hooks\/([^"]+)"/g,
		'from "../../hooks/$1"'
	);
	content = content.replace(
		/from "\$lib\/registry\/lib\/([^"]+)"/g,
		'from "../../lib/$1"'
	);
	content = content.replace(/\timport IconPlaceholder from "[^"]*";\r?\n/g, "");
	content = content.replace(/\timport type \{[^}]*\} from "\$lib\/registry\/icons\/[^"]*";\r?\n/g, "");
	return content;
}

// -- Process all files --
const allFiles = walk(SRC_UI);
let totalProcessed = 0;
let iconTransformCount = 0;
const errors = [];

for (const srcPath of allFiles) {
	try {
		const relPath = relative(SRC_UI, srcPath).replace(/\\/g, "/");
		const destPath = join(DEST_UI, relPath);

		let content = readFileSync(srcPath, "utf-8");
		content = content.replace(/\r\n/g, "\n"); // normalize line endings

		content = transformCnClasses(content);

		const iconResult = transformIcons(content);
		content = iconResult.content;
		if (iconResult.transformed) iconTransformCount++;

		content = transformImports(content);

		mkdirSync(dirname(destPath), { recursive: true });
		writeFileSync(destPath, content, "utf-8");
		totalProcessed++;
	} catch (err) {
		errors.push({ file: srcPath, error: err.message });
	}
}

console.log(`  Processed ${totalProcessed} files (${iconTransformCount} with icon transforms)`);

// ── Step 7b: Copy utility files ──────────────────────────────────────────────
copyFileSync(join(ROOT, "src/lib/registry/lib/utils.ts"), join(EXPORT_DIR, "utils.ts"));
copyFileSync(join(ROOT, "src/lib/registry/hooks/is-mobile.svelte.ts"), join(EXPORT_DIR, "hooks/is-mobile.svelte.ts"));
copyFileSync(join(ROOT, "src/lib/registry/lib/casing.ts"), join(EXPORT_DIR, "lib/casing.ts"));
console.log("  Copied utility files");

// ── Step 8: Generate README ──────────────────────────────────────────────────
console.log("[8/8] Generating README...");

const presetTitle = DS_NAME.charAt(0).toUpperCase() + DS_NAME.slice(1);
const componentDirs = readdirSync(DEST_UI).filter((d) =>
	statSync(join(DEST_UI, d)).isDirectory()
);

const readme = `# ${presetTitle} Design System — Export Package

Exported from design_sys_lab with resolved components (no cn-* classes).
Font: ${font.family} | Icon library: ${preset.iconLibrary} | Radius: ${preset.radius}

## Quick Start

### 1. Copy files to your SvelteKit project

\`\`\`bash
cp -r ui/ src/lib/components/ui/
cp utils.ts src/lib/utils.ts
cp -r hooks/ src/lib/hooks/
cp -r lib/ src/lib/lib/
\`\`\`

### 2. Merge app.css

Copy the contents of \`app.css\` into your project's \`src/app.css\`.

### 3. Install dependencies

\`\`\`bash
# Core
npm install -D bits-ui tailwind-variants clsx tailwind-merge tw-animate-css tailwindcss

# Component-specific
npm install -D vaul-svelte embla-carousel-svelte paneforge svelte-sonner runed mode-watcher cmdk-sv

# Form (optional)
npm install -D formsnap sveltekit-superforms zod

# Icons (${preset.iconLibrary})
npm install -D @lucide/svelte

# Font
npm install -D ${font.dependency}
\`\`\`

## Usage Example

\`\`\`svelte
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
\`\`\`

## What's Included

- **${componentDirs.length} component directories** with all shadcn-svelte components
- **${totalProcessed} files** with styles baked in (no cn-* classes)
- **${preset.iconLibrary} icons** resolved to concrete imports
- **Light + Dark mode** color themes in OKLCH
- **${font.family.split(",")[0].replace(/'/g, "")}** font configured
- **Radius: ${preset.radius}** (${radiusValue})
`;

writeFileSync(join(EXPORT_DIR, "README.md"), readme, "utf-8");

// ── Verification ─────────────────────────────────────────────────────────────
console.log("\n=== Verification ===");
console.log(`Component dirs: ${componentDirs.length}`);
console.log(`Total files: ${totalProcessed}`);

// Check for remaining cn-* classes
let cnRemaining = 0;
for (const f of walk(DEST_UI)) {
	const content = readFileSync(f, "utf-8");
	const matches = content.match(/\bcn-[\w-]+/g);
	if (matches) cnRemaining += matches.length;
}
console.log(`Remaining cn-*: ${cnRemaining}`);

// Check for remaining IconPlaceholder
let ipRemaining = 0;
for (const f of walk(DEST_UI)) {
	if (readFileSync(f, "utf-8").includes("IconPlaceholder")) ipRemaining++;
}
console.log(`Remaining IconPlaceholder: ${ipRemaining}`);

// Check for remaining $lib/registry/
let libRegRemaining = 0;
for (const f of walk(DEST_UI)) {
	if (readFileSync(f, "utf-8").includes("$lib/registry/")) libRegRemaining++;
}
console.log(`Remaining $lib/registry/: ${libRegRemaining}`);

console.log(`Errors: ${errors.length}`);
if (errors.length > 0) {
	for (const e of errors) {
		console.error(`  ERROR in ${e.file}: ${e.error}`);
	}
}

if (cnRemaining === 0 && ipRemaining === 0 && libRegRemaining === 0 && errors.length === 0) {
	console.log(`\n✓ Export complete: design_systems/${DS_NAME}/export/`);
} else {
	console.log("\n⚠ Export completed with warnings — check counts above");
	process.exit(1);
}
