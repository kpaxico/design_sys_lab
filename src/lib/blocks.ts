import { z } from "zod";

// Stub: no blocks registry in standalone mode
const blocks = [] as const;

export type BlockName = (typeof blocks)[number];

export function isBlock(name: unknown): name is BlockName {
	return blocks.includes(name as BlockName);
}

export const blockSchema = z.object({
	name: z.string(),
	description: z.string(),
	container: z
		.object({
			height: z.string().optional(),
			className: z.string().nullish(),
		})
		.optional(),
});

export type Block = z.infer<typeof blockSchema>;
