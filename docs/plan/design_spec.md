Hi,

Below is the full design spec of the NiStudioUs website redesign, written so the site can be rebuilt 1:1 in any stack (HTML, React or Flutter) by hand or with an AI assistant.

Attached:

PROMPT.md: paste into any AI assistant, together with the files below.
tokens.json: every design value. design_tokens.dart: the same values as a Flutter theme.
6 placeholder SVGs: the generic images (sizes and slots in section 10.1).
Instead of screenshots: the Appendix at the end of this email lists every element of every page as measured text (position, size, font, colour, background, border, radius) at 1440 and 390 px. Build against it.

Content: download the live data file and prepare it as in section 9.1 (images to placeholders, brackets removed).

Fonts: Inter and Space Grotesk, free on Google Fonts.

The full 12 MB kit (with the 20 PNG screenshots and the fonts) is in design-kit.zip if needed.

NiStudioUs redesign: design spec for a 1:1 rebuild
Version 2026-10-05 (generic images). It describes the NiStudioUs site exactly as built, with every image swapped for a generic placeholder. Use it to rebuild the same output in any stack (HTML, React, Flutter) with any AI assistant.

0. How to use this kit
File	What it is	Priority when sources disagree
screenshots/*.png	Full-page captures of every page type: desktop 1440 and mobile 390, dark and light	1. The look. Match these.
layout/*.txt	The screenshots as text: every element's measured box (x, y, width, height), font, size, weight, line height, colour, background, border and radius, per page at 1440 and 390 px	1. The look (same priority as the screenshots; use these when the screenshots are not at hand)
tokens.json	Every colour, font, size, radius, spacing, shadow, motion and breakpoint value	2. The numbers. Copied 1:1 from the CSS.
DESIGN-SPEC.md (this file)	Layout, components, pages, behaviour, content rules	3. Structure and behaviour
structure/*.txt	DOM outline of each built page (element › class › sample text)	4. Element order and nesting
flutter/design_tokens.dart	The tokens as Flutter ThemeData + ThemeExtension + helpers	For a Flutter build
PROMPT.md	A ready prompt to hand to an AI	Starting point
data.generic.json	All content (the same data the site renders), with every image URL pointing at a placeholder	The content
placeholders/*.svg	Generic images: screenshot (480×1013, 9:19), icon (192), avatar (96), learning (800×500), banner (1024×500), og (1200×630)	The images
reference/style.css, reference/app.js, reference/build.mjs, reference/accents.json	The working implementation	Ground truth for any detail not covered here
Rule: never invent content. Every text and number comes from data.generic.json or from the copy listed here. Every image is a placeholder from placeholders/ (§10.1); the screenshots were taken with these placeholders, so they match pixel for pixel. To use real images later, change only the URLs in the data. Sizes, crops and radii stay as specified.

1. Pages and routes
Route	Page	Count
/	Home	1
/apps/<id>/	App overview	3 (scribble-notes, sms-stack, iky)
/apps/<id>/how-to/	How-to guide	3
/apps/<id>/privacy/, /apps/<id>/terms/	Legal reader	6
/sitemap/	HTML sitemap	1
/404.html	Not found	1
Anchors: /#apps, /#features, /#learning, /#contact, and /apps/<id>/#<feature-slug>.
Slug = the title lowercased, runs of non-alphanumeric characters replaced by -, - trimmed from both ends.
Legacy hash links redirect:
#/app/<id>[/privacy|/terms] goes to the new route. Underscores in the id become dashes (scribble_notes → scribble-notes).
#/howto goes to the featured app's how-to.
2. Design language
Dark-first, near-black surfaces, one lavender/violet accent (#b4b0ff → #7c6cff) with a pink tail (#e6a8ff) in gradients.
Per-app accents override the accent inside anything that belongs to an app:
Scribble: teal.
SMS Stack: blue.
IKY: purple.
Type: Space Grotesk for display (headings, numbers, labels, eyebrows), Inter for body.
Big, tight headlines, with negative letter-spacing.
Shapes: soft rounded cards (18 / 28 px radii), pill buttons and chips, 1 px hairline borders, deep soft shadows.
Motion: slow and ambient (floating phones, drifting blurred blobs, a scrolling marquee). Content fades up once when it scrolls in. Everything stops under reduced motion.
Full light theme: the same structure, with lavender-white surfaces.
3. Tokens (full list in tokens.json)
Token	Dark	Light
bg	#0b0b10	#f8f7fc
bgAlt (alt sections, footer)	#0f0f16	#f0eef9
surface (cards)	#14141c	#ffffff
surface2 (chips, phone frames)	#1b1b26	#f3f1fb
border	#25252f	#e3e0f0
text	#ececf4	#17152b
muted	#9b9bb3	#62607a
accent	#b4b0ff	#5b4bdb
accent2	#7c6cff	#7c6cff
accentInk (text on accent)	#14112e	#ffffff
glow	rgba(124,108,255,.22)	rgba(91,75,219,.14)
shadow	0 20px 50px -20px rgba(0,0,0,.7)	0 20px 40px -22px rgba(60,40,140,.35)
Per-app accents (accent / accent2):

Glow is accent2 at 24% (dark) or 16% (light).
accentInk is #0b0b10 (dark) or #fff (light).
App	Dark	Light
scribble-notes	#5fd3dc / #2aa3b5	#1b6471 / #2aa3b5
sms-stack	#7ab8ff / #3b8cf0	#1560bd / #3b8cf0
iky	#b9a6ff / #7a5cf0	#4b2fb5 / #7a5cf0
Base typography:

Body: 16 px / 1.65, Inter 400, antialiased.
Headings: Space Grotesk, line height 1.12, letter-spacing −0.02em.
Content width: min(1160px, 100% − 32px), centred. This is a 16 px gutter on phones.
4. Global chrome (every page)
4.1 Reading-progress bar
Fixed at the top, 3 px tall, z above the topbar.
Width = scrollY ÷ (scrollHeight − innerHeight) × 100%.
Fill: gradient accent2 → accent.
4.2 Topbar
Container: sticky top, 64 px tall, bottom border 1 px border.
Background: bg at 78% opacity with a backdrop blur of 14 px (saturate 1.4).
Row: wrap width, items centred, gap 12.
Brand (left):
A 30×30 avatar with radius 9, then "Ni Studio Us".
Text: Space Grotesk 600, 1.02rem, colour text.
Nav (right, margin-left:auto, gap 4): links Apps, Learning, Contact, then two dropdowns, Features ▾ and Legal ▾.
Items are pills: padding 8×14, colour muted, .94rem.
Hover or open: colour text on surface2.
Features dropdown:
Panel: radius 14, surface with a 1 px border and shadow, padding 10, min width 560, max height 70vh (scrolls). Right-aligned with right −60, top 8 px under the trigger.
Inside: a 3-column grid, one column per app.
Each column: the app's short name in bold (Space Grotesk 600 .8rem, text), then every feature title as a link (muted, .9rem) to /apps/<id>/#<slug>.
Legal dropdown: the same panel at min width 250 in one column. Per app: the name, "Privacy Policy", "Terms".
Menus:
Only one is open at a time.
Clicking outside, pressing Esc, or clicking a link closes them.
Theme button:
A 40×40 circle on surface with a 1 px border; the border turns accent on hover.
Shows a sun in dark mode and a moon in light mode (19 px stroke icons, width 1.8).
Its accessible label states the action: "Switch to light theme" / "Switch to dark theme".
Burger (mobile only): the same circle with a menu icon. It toggles the nav.
4.3 Footer
Container: background bgAlt, top border, padding 52/0/24, margin-top 40.
Grid: 1.4fr 1fr 1fr 1fr, gap 32.
Column 1: the brand, then "Small, private, well-made apps. Built in Flutter." (muted, .9rem).
Columns 2–4: one per app.
Heading: the short name, Space Grotesk 600 .86rem.
Links: Overview, How to use, Privacy Policy, Terms & Conditions (block, muted, .9rem, 3 px vertical padding).
Base row:
Top border, margin-top 40, padding-top 20, muted .85rem, space-between.
Left: "© <year> Ni Studio Us · Sitemap". Right: the email ni.studio.us@outlook.com as a mailto link.
Both links are underlined.
4.4 Other chrome
Skip link: "Skip to content". It sits off-screen until focused, then appears at left 8 / top 8 on accent, radius 8. It focuses main.
Focus ring: 2 px accent, offset 3, radius 6.
Lightbox (screenshots and in-text images):
Full-screen scrim rgba(5,5,10,.88) with the image centred, max height 92vh, radius 16.
A × button at top 14 / right 20, white, 2rem.
The image is the large version (with placeholders, the same screenshot.svg).
Opens on click, or Enter/Space on a focused image. Focus moves to × and returns on close. Esc closes; Tab stays on ×.
5. Components
Component	Spec
Button	Inline-flex, gap 8, padding 12×20, radius 999, Inter 600 .95rem, 17 px stroke icon (width 2). Hover: translateY −2 px (.15s).
Primary	Background gradient 135° accent → accent2, text accentInk (#fff in light), shadow 0 10px 28px -10px accent2.
Ghost	Background surface, text text, 1 px border; border turns accent on hover.
Large (home hero)	Padding 16×28, 1.02rem.
CTA row	Flex-wrap, gap 10, margin-top 26.
Eyebrow	Space Grotesk 600 .74rem, line height 1, letter-spacing .14em, UPPERCASE, accent, margin-bottom 14.
Pill (hero)	Inline-flex, gap 10, padding 7/16/7/12, radius 999, 1 px border, surface, Inter 500 .85rem, muted, margin-bottom 26. Leading 8 px green dot #4ade80 with a 2 s "ping" ring.
Tags	Wrap row, gap 8, margin-top 14. Each: .78rem, padding 4×12, radius 999, surface2, 1 px border, muted.
Chips (feature links)	Wrap row, gap 8. Each: padding 7×14, radius 999, surface2, 1 px border, text, .88rem. Hover: background, border and text all switch to the accent colours (accentInk text), lift −2 px.
Badge	Space Grotesk 600 .7rem, letter-spacing .1em, padding 4×10, radius 999. Status badge ("IN DEV"): bg rgba(255,176,32,.15), fg #f5a623 (light: bg .18, fg #8a5300). "FEATURED" badge: bg accent at 18%, fg accent, margin-right 6.
Phone frame	Absolute, width 230 (home) / 210 (app page) / 160–170 on mobile; aspect 9:19; padding 7; surface2; 1 px border; radius 28; shadow. The image covers the frame from the top, radius 22. Float animation.
Spotlight card (featured app)	Flex, gap 16, margin-top 34, padding 14/20/14/14, max width 520, radius 20, 1 px border, surface at 85% with blur 8. Contents: a 52 px app icon (radius 22%, shadow), then a stack of "FEATURED APP" (Space Grotesk 600 .68rem, .14em, uppercase, accent), the app name (Space Grotesk 600 1.1rem) and the short description (muted .86rem), then a 20 px arrow in accent. Hover: border accent, lift −3. Uses the app's accent.
Section heading block	Max width 720, margin-bottom 44: eyebrow, h2, optional muted line.
Feature row (home)	Grid 250px 1fr, gap 24, centred, padding 20×24, radius 18, surface, 1 px border. Left: a 44 px icon (radius 22%), the name in bold, "<n> features" (muted). Right: chips. Uses the app's accent.
App card (home)	Grid of 2 equal columns, gap 32, centred, padding clamp(22px,3vw,40px), radius 28, surface, 1 px border, overflow hidden. Hover: border = accent 55% mixed with border, shadow 0 30px 70px -40px accent2 (.25s). Every 2nd card is flipped (shots on the left). Uses the app's accent.
↳ Copy column	Title row (gap 16, mb 14): a 56 px icon (radius 20%, shadow), h3 with the short name, then the FEATURED badge (featured app only) and the status badge. The short description in Space Grotesk 500 1.12rem. The full description cut to 227 characters at a word boundary plus "…" (muted). Tags. CTA: View app → (primary), Privacy (ghost), Terms (ghost).
↳ Shots column	Grid of 3 equal columns, gap 14, items aligned to the top, max height 440 (380 on mobile), overflow hidden, padding 6/4/0, a bottom fade mask (black to 80%, then transparent). Each shot: full width, aspect 9:19, cover from the top, radius 22, 5 px surface2 border, shadow. Shot 2 has margin-top 34; shot 3 has margin-top 10. The first 3 screenshots of the app.
↳ No screenshots (IKY)	Icon stage across all 3 columns: min height 340, centred, gap 18, radius 24, 1 px border, background radial-gradient(closest-side, glow, transparent 85%) over surface2. A 132 px icon (radius 28, shadow 0 24px 60px -18px accent2 plus an 8 px ring of accent at 12%), and below it "Screenshots coming soon" (muted .9rem).
Learning card	Column; radius 18; surface; 1 px border; overflow hidden. Hover: lift −5, border accent. Image area 16:10 (cover from the top; zooms to 1.05 over .5s on hover), or a placeholder: gradient 135° surface2 → bgAlt with "Chapter N" (Space Grotesk 700 2rem, accent at 50%). Body padding 18/20/22: the title without its "Chapter N:" prefix (h3), "CHAPTER N" (Space Grotesk 600 .72rem, .1em, uppercase, accent), the description (muted .9rem, mt 8), tags. The whole card links to the live chapter in a new tab. Grid: repeat(auto-fill, minmax(250px,1fr)), gap 20.
Contact card	Centred text; padding clamp(34px,6vw,70px); radius 28; 1 px border; background radial glow (600×220 at the top centre) over surface. h2, a muted paragraph (max 52ch, margins 14/auto/24), the primary email button with an arrow. Small variant (legal and how-to pages): left-aligned, margin-top 56, padding 26, h3 heading.
Stats	Grid of 4 columns (2 on mobile), gap 20, padding 38/0/56. Number in Space Grotesk 700 clamp(2.2rem,4.5vw,3.6rem), −.03em; label muted .86rem.
Marquee	Full-bleed band, margin-top 36, top and bottom border, bg at 60% with blur 6, edges masked (transparent → black at 8% / 92% → transparent). The track repeats every feature title twice and scrolls −50% in 60 s, linearly, forever, and pauses on hover. Each item: padding 16×28, Space Grotesk 600 1.05rem, muted, followed by "✦" in accent with margin-left 56.
Mesh (hero background)	3 absolute circles with blur 90 behind the hero content: (1) 560 px accent2 at left −140 / top −180, opacity .55; (2) 480 px #e46bff at right 8% / top −120, opacity .3, delay −5s; (3) 420 px #3ea8ff at right −120 / bottom 80, opacity .25, delay −9s. All drift translate(60,40) scale(1.12) over 14 s, alternating. Light theme: every opacity is .25.
Breadcrumbs	Flex-wrap, gap 8, .86rem, muted, padding 22/0/6; separators "/"; links turn accent on hover.
Gallery	Horizontal scroll row, gap 16, padding 6/2/22, scroll snap (proximity). Figures are 190 px wide: the image (aspect 9:19, cover from the top, radius 18, 1 px border, zoom-in cursor, scale 1.03 on hover) and a caption (.8rem, muted, centred, mt 8). Keyboard-focusable (role=group, label "Screenshot gallery (scrollable)").
Feature card (app page grid)	Column, gap 6, padding 20, radius 18, surface, 1 px border. Hover: lift −4, border accent, shadow 0 18px 40px -26px accent2. Contents: "01" (Space Grotesk 700 .8rem, accent, .1em), the title (h3 1.08rem), the subtitle (accent .8rem 500), and an excerpt of the first section's plain text cut to 110 characters + "…" (muted .86rem, line height 1.5). Grid repeat(auto-fill, minmax(230px,1fr)), gap 14.
TOC (app and legal)	Sticky, top 88, max height 100vh − 110 (scrolls). Label (Space Grotesk 600 .72rem, .12em, uppercase, muted). Links: .9rem, padding 7×12, 2 px left border in border, muted; on legal pages a tabular "01" number first. Active (scroll spy): accent text, accent left border, background gradient 90° glow → transparent. Mobile: a static horizontal scroller with a bottom border instead of the left one; no label.
Doc block (app feature section)	Padding-bottom 52, margin-bottom 52, bottom border (none on the last one). Eyebrow = subtitle, h2 = title; for each section an h3 (1.12rem) and the markdown body. Inline image strips: horizontal scroll, 360 px tall, radius 16, 1 px border.
Legal block	The same, but each is a card: padding 28×30, radius 18, surface, 1 px border, margin-bottom 36. The eyebrow reads "NN · subtitle".
Callout (legal)	Margin-top 16, padding 18×22, radius 18, border = accent 40% mixed with border, background 90° glow → transparent over surface. A bold title, then text (muted .94rem).
Timeline (how-to)	List, max width 860; a 2 px vertical line at left 27 from top 8 to bottom 8 with gradient accent → border. Item: grid 56px 1fr, gap 22, padding-bottom 34. Number circle: 56 px, Space Grotesk 700 1rem, surface, 2 px accent border, accent text. Body: eyebrow (subtitle), h2 1.5rem, a paragraph (excerpt of 240 characters), an optional "In short" box (padding 14×18, radius 14, surface, border; an ordered list muted .94rem, at most 4 numbered steps taken from the feature's text, skipping any that end in ":"), and a "Full write-up →" link (600 .92rem, 16 px arrow).
Doc text	Body colour = 82% text mixed with muted; max 74ch. Lists indent 22 with accent markers. h4 at 1rem, margins 20/0/8. Inline code: .86em mono, surface2, 1 px border, padding 1×6, radius 6. Links inside running text are underlined (offset 3, thickness 1).
6. Pages
6.1 Home (structure/home.txt, screenshots/home-*)
Hero (padding clamp(56px,8vw,100px) 0 0; mesh behind; grid 1.35fr .65fr, gap 24).
Left column (reveals on scroll):
pill "3 apps · private by design" (the count comes from the data);
h1 on three lines: "Your phone." / "Your data." / "Nobody else." The third line uses the gradient-text fill. Size clamp(3.2rem,9.2vw,8rem), line height .95, −.045em;
lead (clamp(1.1rem,1.7vw,1.35rem), max 52ch, mt 30): "Ni Studio Us builds private, offline-first mobile apps — notes, finance, and family history — with clean architecture and no ads.";
CTA: Explore apps → (primary large, to #apps) and Browse features (ghost large, to #features);
the spotlight card for the featured app (scribble-notes).
Right column: 600 px tall, holding 3 phones with the featured app's first 3 screenshots (positions in tokens.json → layout.phones.home).
Below the grid: the marquee, then the stats: <apps> "apps shipped", <sum of features> "feature areas", <apps×2> "plain-language policies", 0 "ads".
Features (#features, section.alt: bgAlt with top and bottom borders): eyebrow "Features", h2 "Everything each app can do", muted "Jump straight to a feature. Every link opens the detailed write-up.", then one feature row per app.
Apps (#apps): eyebrow "Apps", h2 "Built to be used daily", then the app cards with the featured app first and the rest in data order. Cards alternate their flip (0 normal, 1 flipped, 2 normal).
Learning lab (#learning, alt background): eyebrow "Learning lab", h2 "Web experiments, chapter by chapter", muted "Side projects where new web stacks get stress-tested.", then the learning grid (4 cards; chapter 4 has no image, so it shows the placeholder).
Contact (#contact): the contact card with h2 "Questions, feedback, or data requests?", text "Every policy on this site is written in plain language. If something is unclear, email us.", and the button "ni.studio.us@outlook.com →".
Section padding: clamp(56px,8vw,104px) 0. Every heading block and card fades up once on scroll.
6.2 App overview (/apps/<id>/, screenshots/app-*)
Hero (app-hero, a glow blob at the top right; grid 1.1fr .9fr, gap 48):
breadcrumbs "Home / Apps / <short name>";
an 84 px icon;
h1 = the full app name (clamp(2rem,4vw,3.2rem));
the status badge;
a lead with the full description;
tags;
CTA: one button per links[] entry (the first is primary, the rest ghost; each with an external-link icon and opening in a new tab; /home/... URLs point at the live site), then ghost buttons "[guide icon] How to use", "[shield icon] Privacy" and "[doc icon] Terms" (SVG icons from §10, never emoji).
Right column: 2 phones (210 px, 420 tall area). With no screenshots, the icon stage at min height 380 instead.
Screenshots (only if any exist): h-sm "Screenshots", then the gallery of every screenshot with its caption.
"<n> feature areas" (h-sm), then the feature-card grid.
Doc layout (250px | 1fr, gap 56): the TOC "Features" and one doc block per feature.
Technical details marked hide: true in the data are NOT shown.
Uses the app's accent.
6.3 How-to (/apps/<id>/how-to/, screenshots/how-to-*)
Breadcrumbs "Home / <app> / How to".
Head row (legal-head: flex, gap 22, padding 28/0/10): a 64 px icon, then eyebrow = the app name, h1 "How to use <app>" (page-title), and the muted line "A guided tour, one feature at a time. Each step summarises what the feature does; open the write-up for the detail."
A timeline item per feature.
The small contact card: "Still stuck?" with "Check where your data goes in the Privacy Policy, or write to us." and the email button.
6.4 Legal (/apps/<id>/privacy|terms/, screenshots/legal-*)
Breadcrumbs "Home / <app> / Privacy Policy" (or "Terms & Conditions").
Head row: a 64 px icon; eyebrow = the app name; h1 = the label (clamp(2rem,4vw,3rem)); a muted line "Last updated <Month D, YYYY> · <n> sections · ~<words/220> min read".
On the right (margin-left:auto): a ghost button switching to the other document (doc or shield icon), and a ghost "[print icon] Print" button.
If the document has limitUseDisclosure: a callout "Google API Services disclosure".
Doc layout: the TOC "On this page" (numbered), and the legal block cards.
The small contact card "Contact" with "Questions about this <label lowercased>?" and the email button.
Print stylesheet: hides the chrome, TOC, actions, contact and crumbs; white background; blocks keep together.
6.5 Sitemap and 404
Sitemap:
Header: breadcrumbs, h1 "Sitemap", and the lead "All <n> pages, plus every feature section. Machine-readable version: sitemap.xml."
Then a grid repeat(auto-fit, minmax(250px,1fr)) of surface cards. The first is "Site": Home, Apps, Features, Learning lab, Contact. Then one card per app: Overview, How to use, Privacy Policy, Terms & Conditions, and a FEATURES sub-list with every feature.
404: centred, max 640: eyebrow "404", h1 "That page wandered off." (clamp(2.4rem,6vw,4rem)), the lead "Try the home page, or the sitemap to find what you were after.", and the button "Back home".
7. Behaviour
Theme:
On first visit it follows prefers-color-scheme.
The button toggles and stores the choice (key nsu-theme), and the choice is applied before first paint.
Colour and background cross-fade over .25s.
Reveal: elements marked reveal start at opacity 0 and +22 px. When 8% of one is visible, it animates to its final state over .7s with ease, once. Without JS, when printing, or with reduced motion, they show immediately.
Scroll spy: the active TOC link is the section crossing a band 90 px below the top (bottom margin −65%). The TOC scrolls itself to keep the active link in view, and never scrolls the page.
Mobile nav: the burger toggles a full-width panel under the topbar. A link click or Esc closes it.
Smooth scrolling to anchors, with 84 px scroll padding so headings clear the topbar.
Images:
Screenshots are 480×1013 (9:19) and also serve the lightbox; icons are 192 px; the avatar is 96 px. (With real images: WebP ~480 px for display, ~1000 px for the lightbox.)
Every image has explicit width and height, so nothing shifts while loading. Below-the-fold images lazy-load.
Hero phones load with high priority.
8. Responsive (≤ 900 px)
Every 2-column grid becomes 1 column: hero, app hero, app card, doc layout and feature row. The app card's flip is undone.
Hero: the art becomes 440 px tall with 170 px phones (home); the app hero art is 420 px with 160 px phones.
Stats become 2 columns; the footer becomes 2 columns; app-card shots cap at 380.
Nav: the burger shows. The nav becomes an absolute panel under the topbar (bg, bottom border, padding 10/16/16, stacked). Dropdown panels become static inside it.
The TOC becomes a horizontal scroller with a bottom-border active state.
Legal actions lose margin-left:auto.
The page never scrolls horizontally at 390 px.
9. Content model (data.generic.json)
developer: name (brand), email, avatarUrl (brand image).
apps[]:
Identity:
id (route); name (the full name; the "short name" is the text before the first : or —);
shortDescription, fullDescription, iconUrl, status (badge), tags[];
links[] (type + url), screenshots[] (url + caption).
features[]:
title, subtitle, and sections[] (title, content in markdown, images[] as string or {url, caption}).
technicalDetails[]: the same shape; skip anything with hide: true.
privacyPolicy / termsAndConditions:
lastUpdatedUtc, optional limitUseDisclosure;
features[] holds the legal sections.
learningProjects[]: title ("Chapter N: Name"), description, tags[], path (on the live site), imageUrl.
Markdown subset:
headings (#…, rendered as h4); -/* lists; 1. lists; paragraphs;
**bold**, *italic*, `code`, [text](https://…) (new tab);
bare emails become mailto links;
an existing <a …> is passed through unchanged.
Text in brackets is literal (never treat [Phone Type] as markup).
Featured app: scribble-notes. Its accents are in §3.
Dates: "September 3, 2026" (en-US, UTC).
9.1 Getting the content without the full kit
Download the live content file: https://nistudious.github.io/home/assets/assets/data.json (the same data as data.generic.json, with the real image paths).
Point every image URL at a placeholder (§10.1) under assets/placeholders/:
.../dev-avatar.png → avatar.svg;
.../play_store_banner.png → banner.svg;
.../icon.png → icon.svg;
anything under assets/images/learning/ → learning.svg;
every other image → screenshot.svg.
Remove the square brackets around the legal contact email and address (e.g. [ni.studio.us@outlook.com] → ni.studio.us@outlook.com).
10. Assets
Fonts: Inter variable, Space Grotesk variable, Latin subsets. They are in assets/fonts/ in the full kit; otherwise download both free from Google Fonts (fonts.google.com) and self-host them as WOFF2.
Icons (24×24 viewBox, stroke = currentColor, round caps and joins, no fill; stroke width 2 in buttons, 1.8 in icon buttons):
arrow M5 12h14M13 6l6 6-6 6
ext M7 17 17 7M8 7h9v9
shield M12 3 4 6v6c0 5 3.4 8 8 9 4.6-1 8-4 8-9V6z
doc M6 3h9l4 4v14H6z + M14 3v5h5M9 13h7M9 17h5
print M7 9V3h10v6M7 17H4v-7h16v7h-3M7 14h10v7H7z
menu M4 7h16M4 12h16M4 17h16
guide M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z + M4 21V5M9 8h6
moon M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z
sun = circle r4 at 12,12 + M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4
Favicon: the avatar at 128 px; apple-touch icon at 180 px.
10.1 Generic images (placeholders/)
Slot	Placeholder	Rendered as
App screenshots (hero phones, card shots, gallery, inline strips)	screenshot.svg 480×1013	9:19 phone UI wireframe; object-fit: cover, top-aligned
App icon (52/44/56/84/64/132/26 px)	icon.svg 192×192	accent gradient square; the CSS radius (20 or 22%) clips it
Brand avatar (topbar and footer 30 px, favicon)	avatar.svg 96×96	gradient tile with an "N" mark
Learning card image	learning.svg 800×500	browser-window wireframe, 16:10 cover. Chapter 4 keeps the "Chapter N" text placeholder (§5).
Share card (og:image)	og.svg 1200×630	Rasterise to PNG for social sites
Store banner	banner.svg 1024×500	Not shown on the site
Colours in the placeholders: gradient #b4b0ff → #7c6cff, surfaces #14141c / #1b1b26 / #25253a, bars #3a3a52 / #4a4a66. Placeholders stay the same in both themes, as real screenshots would.
11. Accessibility (all verified with axe: 0 violations, both themes, 390 and 1280 px)
Exactly one h1 per page, and no skipped heading levels (footer headings are not headings).
Text contrast is at least WCAG AA in both themes.
Links in running text are underlined, not colour-only.
Every scrollable strip is keyboard-focusable.
Decorative images have alt="".
The theme button and burger have labels; the burger exposes aria-expanded.
The lightbox is a modal dialog.
12. Building it in Flutter
Be aware first: the original site was Flutter web, and its core problem was canvas rendering: text that can't be selected or found by search engines, and a blank first paint.

For a website: a Flutter rebuild of this design brings those problems back. Keep this HTML version for the public site.
Where Flutter fits: the same design inside an app, or a Flutter web build where SEO doesn't matter.
Packages: google_fonts (or bundle the two variable fonts), go_router (routes in §1), url_launcher, visibility_detector (reveal and scroll spy), flutter_markdown (the §9 subset).

Web construct	Flutter equivalent
CSS variables + light/dark	ThemeData per mode + a NiTokens ThemeExtension (see flutter/design_tokens.dart); per-app accent = Theme(data: base.copyWith(extensions: [tokens.withApp(id)])) around the app's subtree
clamp(min, vw, max)	NiTokens.clampW(context, minPx, vwPercent, maxPx)
.wrap	Center(child: ConstrainedBox(maxWidth: 1160)) with 16 px horizontal padding
Sticky topbar + blur	SliverPersistentHeader(pinned) with ClipRect + BackdropFilter(ImageFilter.blur(14,14)) over bg at 78%
Progress bar	ScrollController listener → FractionallySizedBox(widthFactor) in a Stack at the top
Gradient text	ShaderMask(shaderCallback: LinearGradient(...).createShader, blendMode: srcIn)
Bottom-fade mask (shots), edge fade (marquee)	ShaderMask with a black→transparent gradient, BlendMode.dstIn
Mesh blobs	Stack of Positioned circles + ImageFiltered(ImageFilter.blur(90,90)), AnimationController(14s).repeat(reverse: true)
Floating phones	Transform.rotate + AnimatedBuilder translateY 0 → −12 → 0 (7 s, delays as offsets)
Marquee	the row duplicated twice; Transform.translate(-progress × halfWidth), 60 s linear repeat; MouseRegion pauses
Hover lift / border	MouseRegion + AnimatedContainer/AnimatedSlide (durations in tokens.json → motion)
Reveal on scroll	VisibilityDetector (fraction ≥ .08) → one-shot AnimatedOpacity + AnimatedSlide(Offset(0, 22/height)), 700 ms ease
Grids (auto-fill minmax)	LayoutBuilder → column count = max(1, floor(width / min)); Wrap or GridView with shrinkWrap
≤ 900 px rules	LayoutBuilder / MediaQuery.sizeOf(context).width <= 900
Sticky TOC + scroll spy	a two-column Row; the TOC in a SingleChildScrollView inside Positioned driven by scroll offset (or sliver_tools' SliverPinnedHeader); GlobalKey per section + Scrollable.ensureVisible
Lightbox	showDialog with a barrier colour 0xE005050A, InteractiveViewer + Image
Breakpoints, radii, spacing	constants in NiTokens
Matching the screenshots:

Render at 1440×900 and 390×844 with device pixel ratio 1.
Compare full-page captures with an overlay or diff tool at 50% opacity.
Line positions should land within 1–2 px.
Font metrics differ slightly between Skia and browsers: if lines wrap differently, adjust letterSpacing by ±0.01 em before touching anything else.
13. Acceptance checklist
Every page type in §1 exists, with the section order, copy and counts above.
Both themes match screenshots/*-dark|light; the theme persists and follows the OS on first visit.
Per-app accents apply on app pages, home cards, feature rows and the spotlight.
Featured app first; alternate cards flipped; IKY shows the icon stage.
Hidden technical details are not rendered; bracketed text stays literal.
Motion: reveal, float, drift, marquee (pauses on hover), ping. All off under reduced motion.
Behaviour: theme, menus (one open, Esc, outside click), burger, scroll spy, progress bar, lightbox (mouse and keyboard), legacy hash redirects.
At 390 px: no horizontal scroll, single columns, horizontal TOC, burger nav.
Accessibility as in §11.
A side-by-side overlay with each reference screenshot shows no visible differences beyond font antialiasing.
Prompt: rebuild the NiStudioUs site (paste into any AI assistant)
Attach or give access to the whole design-kit/ folder (it holds everything, including data.generic.json, placeholders/ and assets/fonts/), then paste the following:

You are rebuilding an existing website design exactly. The target is a visual and behavioural replica, not an interpretation.

Inputs (in priority order when they disagree):

screenshots/*.png and layout/*.txt: the look. Full-page captures at desktop 1440 px and mobile 390 px in dark and light theme, and the same pages as measured text (every element's box, font and colour). If the screenshots aren't included, build from layout/*.txt: match each box to within 2 px.
tokens.json: every value (colours per theme and per app, fonts, type scale with clamp() sizes, radii, spacing, shadows, motion, breakpoint).
DESIGN-SPEC.md: pages, section order, exact copy, components, behaviour, responsive rules, content model, assets, accessibility, acceptance checklist.
structure/*.txt: element nesting per page.
data.generic.json (or the live data prepared as in DESIGN-SPEC §9.1) + placeholders/*.svg: all content and generic images. Never invent text or numbers. Use only the placeholder images, at the sizes in DESIGN-SPEC §10.1.
Target stack: <write yours: e.g. Flutter 3 (web/mobile) using flutter/design_tokens.dart; or plain HTML/CSS/JS; or React>.

Rules:

Use the tokens verbatim. No new colours, fonts, radii or spacing values.
Section order, headings and copy exactly as in DESIGN-SPEC §6. Counts come from the data (apps, features, policies).
Featured app = scribble-notes, shown first. App cards alternate their flip. IKY (no screenshots) shows the icon stage.
Per-app accent colours apply inside each app's pages, its home card, its feature row and the spotlight.
Skip technicalDetails items with hide: true. Text in square brackets in the data is literal.
Implement every behaviour in DESIGN-SPEC §7 and the ≤ 900 px rules in §8, including reduced motion.
Accessibility as in §11.
Deliver in this order, stopping after each step so I can compare against the screenshot:

Tokens/theme + global chrome (topbar with both dropdowns, footer, progress bar, theme toggle).
Home page.
App overview page.
Legal page.
How-to page.
Sitemap + 404.
Motion and interactions.
Mobile pass.
After each step, list any place where you could not match the screenshot exactly, and why.

Appendix: layout maps (the screenshots as text)
(Note: Only partial layout maps are present here due to character truncation in the original prompt).
