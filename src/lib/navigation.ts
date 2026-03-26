import type { Component } from "svelte";

/** List new components here to highlight them in the sidebar */
export const NEW_COMPONENTS = new Set([
	"item",
	"button-group",
	"kbd",
	"spinner",
	"input-group",
	"field",
	"empty",
	"native-select",
]);

export type NavItem = {
	title: string;
	href?: string;
	disabled?: boolean;
	external?: boolean;
	label?: string;
	icon?: Component;
	indicator?: "new";
};

export type SidebarNavItem = NavItem & {
	items: SidebarNavItem[];
};

export type NavItemWithChildren = NavItem & {
	items: NavItemWithChildren[];
};

export const sidebarNavItems: SidebarNavItem[] = [];

export const mainNavItems: NavItem[] = [
	{
		title: "Docs",
		href: "/docs/installation",
	},
	{
		title: "Components",
		href: "/docs/components",
	},
	{
		title: "Blocks",
		href: "/blocks",
	},
	{
		title: "Charts",
		href: "/charts/area",
	},
	{
		title: "Colors",
		href: "/colors",
	},
	{
		title: "Create",
		href: "/create",
	},
];

export function getFullNavItems(): Array<SidebarNavItem & { index: number }> {
	return [];
}

export function findNeighbors(pathName: string): {
	previous: SidebarNavItem | null;
	next: SidebarNavItem | null;
} {
	return { previous: null, next: null };
}
