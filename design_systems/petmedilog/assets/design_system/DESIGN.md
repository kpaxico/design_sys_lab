# Design System Document

## 1. Overview & Creative North Star: "The Heirloom Guardian"
This design system moves away from the sterile, high-tech aesthetic often found in digital care apps. Instead, it adopts the "Heirloom Guardian" persona—a visual identity that feels like a well-loved nursery, blending a classic editorial sensibility with modern digital precision. 

The Creative North Star is **Curated Warmth**. We achieve this by breaking the rigid, boxy nature of traditional UI. By utilizing intentional asymmetry, overlapping elements that mimic stacked physical papers, and a sophisticated "Midnight" grounding against "Khaki" surfaces, the interface feels less like a database and more like a cherished journal.

---

## 2. Colors: Tonal Depth & The "No-Line" Rule
The palette is rooted in a nursery-inspired spectrum of **Khaki (`#fff8f3`)**, **Slate (`#595f69`)**, **Baby Blue (`#b7c7ea`)**, and **Midnight (`#172642`)**.

### The "No-Line" Rule
To maintain the premium "Gentle Guardian" feel, **1px solid borders are strictly prohibited for sectioning.** We do not define boundaries with lines; we define them with light and mass.
- **Sectioning:** Use background shifts (e.g., a `surface-container-low` section sitting on a `surface` background) to define the end of a content block.
- **Nesting Hierarchy:** Treat the UI as physical layers. An inner container (like a profile card) should use a slightly higher tier (e.g., `surface-container-highest`) than the section it sits on (`surface-container-low`).

### The "Glass & Gradient" Rule
To inject visual "soul" into the UI:
- **Glassmorphism:** For floating navigation bars or contextual overlays, use semi-transparent surface colors with a `backdrop-filter: blur(20px)`. This allows the nursery tones to bleed through, creating a soft, integrated feel.
- **Signature Textures:** For high-impact areas like Hero sections or main CTAs, use a subtle linear gradient transitioning from `primary` (`#172642`) to `primary_container` (`#2e3c59`). This adds a sense of depth and quality that flat fills cannot match.

---

## 3. Typography: Editorial Authority
We utilize **Plus Jakarta Sans** as our sole typeface, relying on extreme scale differences to create an editorial hierarchy.

- **Display (lg/md/sm):** Used for big, welcoming moments. These should feel like book titles. The generous x-height and rounded terminals of Plus Jakarta Sans provide the "friendly" touch.
- **Headlines & Titles:** Set in `primary` (`#172642`) to provide a grounded, authoritative anchor for the content.
- **Body (lg/md/sm):** Use `on_surface_variant` (`#43474c`) for body text. This slightly softer contrast reduces eye strain and maintains the "gentle" personality.
- **Labels:** Reserved for functional metadata. These are small but legible, often used in `secondary` (`#595f69`) to recede behind the primary content.

---

## 4. Elevation & Depth: Tonal Layering
Traditional drop shadows are often too harsh for a nursery-inspired theme. We lean into **Tonal Layering**.

- **The Layering Principle:** Softness is key. Place a `surface_container_lowest` (#ffffff) card on a `surface_container` (#faecda) background. This creates a natural, "paper-on-table" lift.
- **Ambient Shadows:** If a floating effect is required (e.g., a FAB or a modal), use a shadow with a 40px-60px blur and 5% opacity. The shadow color must be a tinted version of `on_surface` (`#211b10`), never pure black.
- **The "Ghost Border" Fallback:** If a border is essential for accessibility, use the `outline_variant` (`#c4c6cd`) at **15% opacity**. It should be a whisper of a line, not a statement.
- **Glassmorphism:** Utilize `surface_bright` at 80% opacity with a blur to create a "frosted" look for components that hover over dynamic content.

---

## 5. Components: Soft & Purposeful
All components must adhere to the `ROUND_FULL` (9999px) or `xl` (3rem) corner radius to ensure the "Gentle Guardian" personality is felt in every interaction.

- **Buttons:** 
  - *Primary:* Midnight (`primary`) fill with White text. Use `full` roundness.
  - *Secondary:* Baby Blue (`primary_fixed`) fill with `on_primary_fixed` text.
- **Input Fields:** Use `surface_container_low` for the field fill. No borders. Use `title-sm` for labels to give them an editorial weight.
- **Cards & Lists:** **Forbid the use of divider lines.** Separate list items using `3` (1rem) or `4` (1.4rem) spacing units. If items must be distinct, give each its own `surface_container` background with `lg` (2rem) rounded corners.
- **Chips:** Highly rounded (`full`). Use `secondary_container` for inactive states and `primary` for active states.
- **Contextual Additions (Pet/Nursery Specific):**
  - *Progress Rings:* Use `primary` and `secondary_fixed` to track care routines, styled with soft, rounded caps.
  - *Status Badges:* Use `tertiary_container` for "Calm" statuses and `error_container` for "Urgent" alerts, keeping the palette harmonious.

---

## 6. Do’s and Don'ts

### Do:
- **Embrace Asymmetry:** Align a headline to the left and a supporting image slightly offset to the right to create an editorial, "scrapbook" feel.
- **Use Generous White Space:** Use the `16` (5.5rem) or `20` (7rem) spacing tokens between major sections to let the design breathe.
- **Layer Softly:** Use `surface_container_highest` for "active" or "pressed" states of cards.

### Don't:
- **Don't use 1px Borders:** Never use a solid line to separate content; it breaks the "Gentle Guardian" softness.
- **Don't use Pure Black:** Avoid `#000000`. Use Midnight (`primary`) for high contrast or Slate (`secondary`) for medium contrast.
- **Don't use Sharp Corners:** Even in nested elements, maintain at least a `md` (1.5rem) roundness.
- **Don't Overcrowd:** This design system relies on the "Khaki" (`surface`) acting as a calming negative space. If a screen feels busy, increase the spacing tokens.