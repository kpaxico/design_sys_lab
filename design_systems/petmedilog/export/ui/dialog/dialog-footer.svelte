<script lang="ts">
	import { cn, type WithElementRef } from "../../utils.js";
	import type { HTMLAttributes } from "svelte/elements";
	import { Dialog as DialogPrimitive } from "bits-ui";
	import { Button } from "../button/index.js";

	let {
		ref = $bindable(null),
		class: className,
		children,
		showCloseButton = false,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		showCloseButton?: boolean;
	} = $props();
</script>

<div
	bind:this={ref}
	data-slot="dialog-footer"
	class={cn("bg-muted/50 -mx-5 -mb-5 rounded-b-3xl border-t border-t-[#211b10]/5 p-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className)}
	{...restProps}
>
	{@render children?.()}
	{#if showCloseButton}
		<DialogPrimitive.Close>
			{#snippet child({ props })}
				<Button variant="outline" {...props}>Close</Button>
			{/snippet}
		</DialogPrimitive.Close>
	{/if}
</div>
