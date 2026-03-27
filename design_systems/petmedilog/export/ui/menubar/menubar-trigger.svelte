<script lang="ts">
	import { Menubar as MenubarPrimitive } from "bits-ui";
	import { cn } from "../../utils.js";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: MenubarPrimitive.TriggerProps = $props();
</script>

<MenubarPrimitive.Trigger
	bind:ref
	data-slot="menubar-trigger"
	class={cn("hover:bg-muted aria-expanded:bg-muted rounded-lg px-2 py-[2px] text-sm font-medium flex items-center outline-hidden select-none", className)}
	{...restProps}
/>
