<script lang="ts">
	import { Button } from "$lib/registry/ui/button/index.js";
	import { UseClipboard } from "$lib/hooks/use-clipboard.svelte.js";
	import { useDesignSystem } from "$lib/features/design-system/index.js";
	import { cn } from "$lib/utils.js";

	type Props = {
		class?: string;
	};

	let { class: className }: Props = $props();

	const designSystem = useDesignSystem();
	const clipboard = new UseClipboard();

	const presetCode = $derived(new URL(designSystem.shareUrl).searchParams.get("preset") ?? "");

	function handleCopy() {
		clipboard.copy(`--preset ${presetCode}`);
	}
</script>

<Button
	variant="outline"
	onclick={handleCopy}
	class={cn(
		"hover:bg-muted! touch-manipulation bg-transparent! px-2! py-0! text-sm! transition-none select-none pointer-coarse:h-10!",
		className
	)}
>
	<span class="truncate">{clipboard.copied ? "Copied" : `--preset ${presetCode.length > 12 ? presetCode.slice(0, 12) + "…" : presetCode}`}</span>
</Button>
