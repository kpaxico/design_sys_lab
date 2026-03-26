/**
 * Local preset codec that supports custom styles/themes/fonts.
 * Replaces the shadcn-svelte/preset encode/decode which only supports hardcoded values.
 * Uses JSON+base64 encoding — longer URLs but works with any values.
 */

import {
	encodePreset as upstreamEncode,
	decodePreset as upstreamDecode,
	DEFAULT_PRESET_CONFIG,
	type PresetConfig,
} from "shadcn-svelte/preset";

/**
 * Encode a preset config to a compact string.
 * Tries upstream encoder first (shorter URLs for built-in values).
 * Falls back to JSON+base64 for custom values.
 */
export function encodePreset(config: PresetConfig): string {
	try {
		const encoded = upstreamEncode(config);
		// Verify round-trip works
		const decoded = upstreamDecode(encoded);
		if (decoded && decoded.style === config.style && decoded.theme === config.theme) {
			return encoded;
		}
	} catch {
		// Fall through to JSON encoding
	}

	// JSON fallback for custom values — prefix with 'j' to distinguish
	const json = JSON.stringify(config);
	return "j" + btoa(json);
}

/**
 * Decode a preset string back to a PresetConfig.
 * Handles both upstream format and our JSON format.
 */
export function decodePreset(encoded: string): PresetConfig | null {
	if (!encoded) return null;

	// JSON format (our custom encoding)
	if (encoded.startsWith("j")) {
		try {
			const json = atob(encoded.slice(1));
			return JSON.parse(json) as PresetConfig;
		} catch {
			return null;
		}
	}

	// Upstream format (built-in values)
	try {
		return upstreamDecode(encoded);
	} catch {
		return null;
	}
}

export { DEFAULT_PRESET_CONFIG, type PresetConfig };
