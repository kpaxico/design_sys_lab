<script lang="ts">
	import { cn, type WithElementRef } from "../../utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<div
	bind:this={ref}
	data-slot="alert-dialog-footer"
	class={cn(
		"bg-muted/50 -mx-5 -mb-5 rounded-b-3xl border-t border-t-[#211b10]/5 p-5 flex flex-col-reverse gap-2 group-data-[size=sm]/alert-dialog-content:grid group-data-[size=sm]/alert-dialog-content:grid-cols-2 sm:flex-row sm:justify-end",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</div>
