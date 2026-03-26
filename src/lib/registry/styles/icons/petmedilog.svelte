<script lang="ts">
	import type { SVGAttributes } from "svelte/elements";
	let { ...restProps }: SVGAttributes<SVGSVGElement> = $props();
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	viewBox="0 0 128 128"
	role="img"
	fill="none"
	stroke="currentColor"
	stroke-width="2"
	{...restProps}
>
	<rect x="20" y="20" width="88" height="88" rx="32" />
	<circle cx="64" cy="64" r="20" />
</svg>
