# React Portfolio & Resume Content System (V2)

This plan outlines the architecture and implementation for your single-source-of-truth portfolio and resume site, adapting to your feedback for a minimalist design, interactive storytelling, and refined project visualization.

## Architecture & Tech Stack

*   **Framework:** React (Vite) + React Router.
*   **Styling:** Vanilla CSS with a strict **Minimalism** approach (inspired by Tilda guidelines). Focus on ample whitespace, clean typography (sans-serif), high contrast, and removal of unnecessary borders or shadows.
*   **Data Source:** Local JSON files (`profile.json`, `experience.json`, `skills.json`, `projects.json`, `resumes.json`).
*   **PDF Generation:** Browser-native print styles (`window.print()`) optimized for PDF export, ensuring high-quality outputs without heavy libraries.

## User Review Required

> [!IMPORTANT]
> **Narrative Animations:** For the scroll-driven storytelling page, I propose using a lightweight CSS-based sprite animation or SVG animation for the "walking person" to avoid heavy animation libraries. Let me know if you prefer a specific graphics style (e.g., pixel art, flat vector).

## Open Questions

> [!WARNING]
> **Inline HTML vs. New Tab:** For hosted projects ("Developer Home", "Learning Gen-AI"), an `iframe` can be used to render the live site inline within the dialog, but some sites block iframes via X-Frame-Options. Should we default to a "Launch Website in New Tab" button if inline rendering isn't preferred?

---

## Proposed Changes

### 1. Minimalist Theme Overhaul (`src/index.css`)
*   **[MODIFY]** `src/index.css`: Redesign to a minimalist aesthetic.
    *   Remove heavy drop-shadows and borders.
    *   Use a monochromatic scale with a single sparse accent color.
    *   Increase font sizes and line heights for readability.
    *   Implement smooth, subtle micro-interactions on hover.

### 2. Tech Stack Reordering (`src/pages/Stack.jsx`)
*   **[MODIFY]** `src/content/skills.json`: Reorder categories to: Domain Expertise -> SDET / QE / Automation -> Mobile Development -> CI/CD / DevOps / Tooling -> Data / Backend / Platform.

### 3. Refined Project Showcase (`src/pages/Projects.jsx`)
*   **[MODIFY]** `src/content/projects.json`: Update statuses to industry standards (e.g., "Live", "Internal Beta", "Active Development").
*   **[MODIFY]** `src/pages/Projects.jsx`: Keep the existing card layout but update status chips. Add tap interaction to open the new dialog.
*   **[NEW]** `src/components/ProjectDialog.jsx`: A modal dialog that opens on card tap.
    *   Displays full Google Play Store listing descriptions and links.
    *   For hosted websites (Developer Home, Learning Gen-AI), includes action buttons to open the sites in a new tab.

### 4. Advanced Resume Builder (`src/pages/ResumeBuilder.jsx`)
*   **[MODIFY]** `src/pages/ResumeBuilder.jsx`:
    *   Render the resume in a clean UI format (HTML) rather than raw markdown.
    *   Add a "Copy UI Text" button that strips markdown.
    *   Add a "Generate PDF" button utilizing a dedicated print stylesheet.
    *   Add a toggle for "Markdown Editor Mode" to let the user edit the raw markdown and copy it.

### 5. Narrative & Storytelling View (`src/pages/Narrative.jsx`)
*   **[NEW]** `src/pages/Narrative.jsx`: A scroll-driven interactive page.
    *   **Layout:** Two-column alternating or side-by-side design. Left: Year/Project. Right: Summary/Milestone.
    *   **Animation:** A fixed walking character graphic at the bottom center that animates as the user scrolls down the page, visually moving through the timeline.
*   **[MODIFY]** `src/components/Navbar.jsx`: Add a "Story" or "Narrative" link to the navigation.

---

## Verification Plan

### Automated Checks
*   Verify successful React build (`npm run build`).

### Manual Verification
*   **Aesthetics:** Ensure the design strictly adheres to minimalist principles (whitespace, typography, lack of clutter).
*   **Projects:** Click on project cards to ensure dialogs open and display detailed content and functional links.
*   **Resume:** Test the PDF generation (via print dialog), text copying, and markdown editor toggle.
*   **Narrative:** Scroll through the Narrative page to ensure the walking animation feels smooth and the layout matches the requested split design.
