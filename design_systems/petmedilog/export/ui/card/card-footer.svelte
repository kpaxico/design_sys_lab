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
	data-slot="card-footer"
	class={cn("bg-muted/50 rounded-b-3xl border-t border-t-[#211b10]/5 p-5 group-data-[size=sm]/card:p-4 flex items-center", className)}
	{...restProps}
>
	{@render children?.()}
</div>
