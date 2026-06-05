---
name: UI Design System
description: Comprehensive design system skill defining 6 modern design themes (Glassmorphism, Neumorphism, Liquid Glass, Minimalism, Brutalism, Flat 2.0), mandatory visual quality rules, and reusable CSS component patterns for all chapter-n apps.
---

# UI Design System Skill

This skill defines the **visual design standards** for every application built in this learning repository. Every agent working on a `chapter-n` app MUST follow these rules to ensure a premium, modern, production-quality user interface.

---

## 1. Mandatory Design Rules (Non-Negotiable)

Every chapter-n application — whether static HTML or React — **MUST** implement all of the following:

### Typography
- Use **Google Fonts** — never rely on browser default fonts.
- Preferred font stack: `"Inter", "Outfit", "Roboto", system-ui, sans-serif`.
- Import via `<link>` in HTML or `@import` in CSS:
  ```html
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  ```
- Use a clear typographic hierarchy: `h1` > `h2` > `h3` > body > caption.

### Color Palette
- **NEVER** use raw CSS named colors (`red`, `blue`, `green`, `yellow`).
- Always use curated HSL or hex palettes. Example dark palette:
  ```css
  --color-bg-primary: #0F172A;    /* Deep navy */
  --color-bg-secondary: #1E293B;  /* Slate */
  --color-accent-1: #7C3AED;     /* Vivid purple */
  --color-accent-2: #F43F5E;     /* Rose */
  --color-text-primary: #F8FAFC;  /* Near-white */
  --color-text-secondary: #94A3B8; /* Muted slate */
  --color-border: rgba(255, 255, 255, 0.1);
  ```
- Dark mode is the **default**. Light mode is optional but encouraged.

### Responsiveness
- Design **mobile-first** using `min-width` media queries.
- Mandatory breakpoints:
  ```css
  /* Mobile: default styles (< 640px) */
  @media (min-width: 640px)  { /* Tablet */ }
  @media (min-width: 1024px) { /* Desktop */ }
  @media (min-width: 1280px) { /* Wide */ }
  ```
- Use CSS Grid and Flexbox — no float-based layouts.

### Micro-Animations & Transitions
- Every interactive element MUST have a transition:
  ```css
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  ```
- Hover effects on buttons, cards, and links are **mandatory**.
- Use `transform: translateY(-4px)` or `scale(1.02)` for hover uplift.
- Entrance animations for page content (fade-in, slide-up):
  ```css
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .animate-in { animation: fadeInUp 0.6s ease-out forwards; }
  ```

### Custom Scrollbar
```css
::-webkit-scrollbar { width: 8px; }
::-webkit-scrollbar-track { background: var(--color-bg-primary); }
::-webkit-scrollbar-thumb { background: #334155; border-radius: 4px; }
::-webkit-scrollbar-thumb:hover { background: #475569; }
```

### Accessibility Floor
- Minimum contrast ratio: **4.5:1** for body text, **3:1** for large text.
- All interactive elements must be focusable and have `:focus-visible` styles.
- Use `prefers-reduced-motion` to disable animations for users who prefer it:
  ```css
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
  }
  ```

---

## 2. Design Theme Catalog

The following 6 themes are available. **By default, each chapter-n app should use a natural combination of these themes** — pick the best style for each UI element. For example, a chapter might use Glassmorphism for navigation and cards, Neumorphism for buttons and toggles, and Minimalist typography. The goal is a cohesive, premium feel — not rigid adherence to a single theme.

### 2.1 Glassmorphism

**Vibe**: Futuristic, clean, premium. Mimics frosted glass floating over colorful backgrounds.

**When to Use**: Navigation bars, modal overlays, cards, sidebars, floating panels.

**Key CSS Properties**:
```css
.glass-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.glass-nav {
  background: rgba(15, 23, 42, 0.7);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}
```

**Color Palette**:
```css
--glass-bg: rgba(255, 255, 255, 0.05);
--glass-border: rgba(255, 255, 255, 0.08);
--glass-shadow: rgba(0, 0, 0, 0.3);
--glass-blur: 12px;
```

---

### 2.2 Neumorphism (Soft UI)

**Vibe**: Tactile, soft, sculpted. Elements appear pressed into or extruded from the background.

**When to Use**: Buttons, toggle switches, input fields, small interactive elements. Use sparingly — best for isolated components, not full layouts.

**Key CSS Properties**:
```css
.neumorph-raised {
  background: var(--color-bg-primary);
  border-radius: 12px;
  box-shadow:
    6px 6px 12px rgba(0, 0, 0, 0.4),
    -6px -6px 12px rgba(255, 255, 255, 0.05);
}

.neumorph-pressed {
  background: var(--color-bg-primary);
  border-radius: 12px;
  box-shadow:
    inset 4px 4px 8px rgba(0, 0, 0, 0.4),
    inset -4px -4px 8px rgba(255, 255, 255, 0.05);
}

.neumorph-button {
  background: var(--color-bg-primary);
  border: none;
  border-radius: 12px;
  padding: 12px 24px;
  color: var(--color-text-primary);
  font-weight: 600;
  cursor: pointer;
  box-shadow:
    5px 5px 10px rgba(0, 0, 0, 0.4),
    -5px -5px 10px rgba(255, 255, 255, 0.05);
  transition: all 0.2s ease;
}

.neumorph-button:active {
  box-shadow:
    inset 3px 3px 6px rgba(0, 0, 0, 0.4),
    inset -3px -3px 6px rgba(255, 255, 255, 0.05);
}
```

**Important**: Neumorphism requires the element to be the **exact same color** as its background. The 3D effect comes entirely from shadows.

---

### 2.3 Liquid Glass / Aurora UI

**Vibe**: Energetic, luxurious, alive. Fluid animated colors behind glass layers.

**When to Use**: Landing pages, hero sections, splash screens, creative portfolios, background decorations.

**Key CSS Properties**:
```css
/* Animated background blobs */
.aurora-bg {
  position: fixed;
  inset: 0;
  z-index: -1;
  overflow: hidden;
}

.aurora-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.6;
  animation: aurora-float 12s ease-in-out infinite alternate;
}

.aurora-blob-1 {
  width: 400px; height: 400px;
  background: #7C3AED;
  top: -10%; left: 20%;
}

.aurora-blob-2 {
  width: 500px; height: 500px;
  background: #F43F5E;
  bottom: -15%; right: 10%;
  animation-delay: -4s;
}

.aurora-blob-3 {
  width: 350px; height: 350px;
  background: #06B6D4;
  top: 40%; right: 30%;
  animation-delay: -8s;
}

@keyframes aurora-float {
  0%   { transform: translate(0, 0) scale(1); }
  33%  { transform: translate(30px, -30px) scale(1.1); }
  66%  { transform: translate(-20px, 20px) scale(0.9); }
  100% { transform: translate(10px, -10px) scale(1.05); }
}

/* Multi-layer glass over aurora */
.aurora-glass {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(40px);
  -webkit-backdrop-filter: blur(40px);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 24px;
}
```

---

### 2.4 Pure Minimalism

**Vibe**: Sophisticated, expensive, editorial. Typography and whitespace do all the work.

**When to Use**: Content-heavy sections, documentation areas, profile pages, text-focused layouts.

**Key CSS Properties**:
```css
.minimal-container {
  max-width: 720px;
  margin: 0 auto;
  padding: 4rem 2rem;
}

.minimal-heading {
  font-size: 2.5rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.1;
  color: var(--color-text-primary);
}

.minimal-divider {
  border: none;
  border-top: 1px solid var(--color-border);
  margin: 2rem 0;
}

.minimal-card {
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 2rem;
  background: transparent;
  transition: border-color 0.3s ease;
}

.minimal-card:hover {
  border-color: var(--color-accent-1);
}
```

---

### 2.5 Neo-Brutalism

**Vibe**: Bold, energetic, intentionally raw. Hard edges and unapologetic color.

**When to Use**: Call-to-action buttons, badges, alert banners, playful/experimental UI sections.

**Key CSS Properties**:
```css
.brutal-button {
  background: #FACC15; /* Bright yellow */
  color: #000;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 14px 28px;
  border: 3px solid #000;
  border-radius: 4px;
  box-shadow: 4px 4px 0px #000;
  cursor: pointer;
  transition: all 0.15s ease;
}

.brutal-button:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0px #000;
}

.brutal-button:active {
  transform: translate(2px, 2px);
  box-shadow: 0px 0px 0px #000;
}

.brutal-card {
  background: #fff;
  color: #000;
  border: 3px solid #000;
  border-radius: 4px;
  box-shadow: 6px 6px 0px #000;
  padding: 1.5rem;
}

.brutal-badge {
  display: inline-block;
  background: #A3E635; /* Lime */
  color: #000;
  font-weight: 700;
  font-size: 0.75rem;
  padding: 4px 10px;
  border: 2px solid #000;
  border-radius: 2px;
}
```

---

### 2.6 Flat 2.0 / Semi-Flat

**Vibe**: Professional, familiar, Google/Material-like. Clean with just enough depth.

**When to Use**: Dashboards, data tables, form layouts, settings pages, admin panels.

**Key CSS Properties**:
```css
.flat-card {
  background: var(--color-bg-secondary);
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}

.flat-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.flat-button-primary {
  background: var(--color-accent-1);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(124, 58, 237, 0.3);
  transition: all 0.2s ease;
}

.flat-button-primary:hover {
  box-shadow: 0 4px 8px rgba(124, 58, 237, 0.4);
  transform: translateY(-1px);
}

.flat-input {
  background: var(--color-bg-primary);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 12px 16px;
  color: var(--color-text-primary);
  font-size: 0.95rem;
  transition: border-color 0.2s ease;
}

.flat-input:focus {
  outline: none;
  border-color: var(--color-accent-1);
  box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.15);
}
```

---

## 3. Hybrid Theme Strategy (Default Approach)

**By default, every chapter-n app blends themes organically.** Here is the recommended mapping of themes to UI components:

| UI Component | Recommended Theme(s) | Rationale |
|:---|:---|:---|
| **Navigation / Header** | Glassmorphism | Creates visual hierarchy and depth |
| **Hero / Landing Section** | Liquid Glass / Aurora | Captures attention, feels alive |
| **Content Cards** | Glassmorphism or Flat 2.0 | Readable, structured |
| **Buttons (Primary)** | Flat 2.0 or Neumorphism | Familiar, discoverable |
| **Buttons (CTA/Special)** | Neo-Brutalism | Grabs attention |
| **Toggle / Switch** | Neumorphism | Tactile, satisfying |
| **Form Inputs** | Flat 2.0 | Clean, functional |
| **Text Sections** | Minimalism | Lets content breathe |
| **Modals / Overlays** | Glassmorphism | Layered, contextual |
| **Badges / Tags** | Neo-Brutalism or Flat 2.0 | High visibility |
| **Background** | Liquid Glass (blobs) | Adds energy without distracting |

### How to combine themes in one app:

1. Start with a dark base background (`#0F172A` or similar).
2. Add Aurora-style background blobs for visual energy.
3. Build navigation using Glassmorphism.
4. Structure content areas with Flat 2.0 cards.
5. Use Neumorphic patterns for interactive widgets (toggles, sliders).
6. Keep text areas clean with Minimalist typography and spacing.
7. Use Brutalist styling for CTAs or attention-grabbing badges.

---

## 4. Theme Switcher Component (Optional Enhancement)

Each chapter-n app MAY include a floating theme-switcher to let users preview the page in a single dominant theme. This is an optional enhancement, not a requirement.

### Implementation Pattern

```html
<!-- Floating Theme FAB -->
<button class="theme-fab" id="themeFab" aria-label="Switch theme">
  <span class="theme-fab-icon">🎨</span>
</button>

<div class="theme-palette" id="themePalette">
  <button data-theme="hybrid" class="theme-option active">Hybrid</button>
  <button data-theme="glassmorphism" class="theme-option">Glass</button>
  <button data-theme="neumorphism" class="theme-option">Soft</button>
  <button data-theme="liquid-glass" class="theme-option">Aurora</button>
  <button data-theme="minimalism" class="theme-option">Minimal</button>
  <button data-theme="brutalism" class="theme-option">Brutal</button>
  <button data-theme="flat" class="theme-option">Flat</button>
</div>
```

```css
.theme-fab {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: rgba(124, 58, 237, 0.9);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(124, 58, 237, 0.4);
  transition: all 0.3s ease;
  z-index: 9999;
}

.theme-fab:hover {
  transform: scale(1.1) rotate(15deg);
  box-shadow: 0 6px 24px rgba(124, 58, 237, 0.5);
}

.theme-palette {
  position: fixed;
  bottom: 90px;
  right: 24px;
  display: none;
  flex-direction: column;
  gap: 8px;
  z-index: 9998;
}

.theme-palette.open {
  display: flex;
  animation: fadeInUp 0.3s ease-out;
}

.theme-option {
  padding: 8px 16px;
  background: rgba(30, 41, 59, 0.9);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: #F8FAFC;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.theme-option:hover,
.theme-option.active {
  background: rgba(124, 58, 237, 0.3);
  border-color: rgba(124, 58, 237, 0.5);
}
```

```javascript
// Theme switcher logic — persist choice in localStorage
const fab = document.getElementById('themeFab');
const palette = document.getElementById('themePalette');

fab.addEventListener('click', () => palette.classList.toggle('open'));

palette.querySelectorAll('.theme-option').forEach(btn => {
  btn.addEventListener('click', () => {
    const theme = btn.dataset.theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('selected-theme', theme);
    palette.querySelectorAll('.theme-option').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

// Restore on load
const saved = localStorage.getItem('selected-theme');
if (saved) {
  document.documentElement.setAttribute('data-theme', saved);
  const active = palette.querySelector(`[data-theme="${saved}"]`);
  if (active) {
    palette.querySelectorAll('.theme-option').forEach(b => b.classList.remove('active'));
    active.classList.add('active');
  }
}
```

---

## 5. Learned Patterns

*This section is auto-maintained by the Auto-Upskill skill. New patterns discovered during development are appended here.*

<!-- LEARNED_PATTERNS_START -->
<!-- LEARNED_PATTERNS_END -->
