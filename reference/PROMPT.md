# Prompt: rebuild the NiStudioUs site (paste into any AI assistant)

Attach or give access to the whole `design-kit/` folder (it holds everything, including `data.generic.json`, `placeholders/` and `assets/fonts/`), then paste the following:

---

You are rebuilding an existing website design **exactly**. The target is a visual and behavioural replica, not an interpretation.

**Inputs (in priority order when they disagree):**
1. `screenshots/*.png` and `layout/*.txt`: the look. Full-page captures at desktop 1440 px and mobile 390 px in dark and light theme, and the same pages as measured text (every element's box, font and colour). If the screenshots aren't included, build from `layout/*.txt`: match each box to within 2 px.
2. `tokens.json`: every value (colours per theme and per app, fonts, type scale with `clamp()` sizes, radii, spacing, shadows, motion, breakpoint).
3. `DESIGN-SPEC.md`: pages, section order, exact copy, components, behaviour, responsive rules, content model, assets, accessibility, acceptance checklist.
4. `structure/*.txt`: element nesting per page.
5. `data.generic.json` (or the live data prepared as in DESIGN-SPEC §9.1) + `placeholders/*.svg`: all content and generic images. Never invent text or numbers. Use only the placeholder images, at the sizes in DESIGN-SPEC §10.1.

**Target stack:** <write yours: e.g. Flutter 3 (web/mobile) using `flutter/design_tokens.dart`; or plain HTML/CSS/JS; or React>.

**Rules:**
- Use the tokens verbatim. No new colours, fonts, radii or spacing values.
- Section order, headings and copy exactly as in DESIGN-SPEC §6. Counts come from the data (apps, features, policies).
- Featured app = `scribble-notes`, shown first. App cards alternate their flip. IKY (no screenshots) shows the icon stage.
- Per-app accent colours apply inside each app's pages, its home card, its feature row and the spotlight.
- Skip `technicalDetails` items with `hide: true`. Text in square brackets in the data is literal.
- Implement every behaviour in DESIGN-SPEC §7 and the ≤ 900 px rules in §8, including reduced motion.
- Accessibility as in §11.

**Deliver in this order, stopping after each step so I can compare against the screenshot:**
1. Tokens/theme + global chrome (topbar with both dropdowns, footer, progress bar, theme toggle).
2. Home page.
3. App overview page.
4. Legal page.
5. How-to page.
6. Sitemap + 404.
7. Motion and interactions.
8. Mobile pass.

After each step, list any place where you could not match the screenshot exactly, and why.
