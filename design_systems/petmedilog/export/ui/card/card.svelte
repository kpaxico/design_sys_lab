<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import { cn, type WithElementRef } from "../../utils.js";

	let {
		ref = $bindable(null),
		class: className,
		children,
		size = "default",
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> & { size?: "default" | "sm" } = $props();
</script>

<div
	bind:this={ref}
	data-slot="card"
	data-size={size}
	class={cn("bg-card text-card-foreground gap-5 overflow-hidden rounded-3xl py-6 text-sm shadow-sm shadow-[#211b10]/5 has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:gap-4 data-[size=sm]:py-4 data-[size=sm]:has-data-[slot=card-footer]:pb-0 *:[img:first-child]:rounded-t-3xl *:[img:last-child]:rounded-b-3xl group/card flex flex-col", className)}
	{...restProps}
>
	{@render children?.()}
</div>
