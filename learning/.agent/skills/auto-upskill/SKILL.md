---
name: Auto-Upskill
description: Meta-skill that enables the agent to learn from user conversations and improve existing skills or create new ones based on observed patterns, preferences, and techniques.
---

# Auto-Upskill Skill

This is a **meta-skill** that teaches agents to continuously improve the skill library based on patterns learned during conversations with the user.

---

## 1. When to Trigger

Auto-upskill should be considered in these situations:

| Trigger | What to Look For |
|:---|:---|
| **Task Completion** | After completing a chapter or significant feature |
| **User Teaches a Pattern** | The user demonstrates a CSS technique, architecture pattern, or workflow |
| **New Library/Tool** | The user introduces a new dependency or tool not covered by existing skills |
| **Bug Fix Reveals Gotcha** | A debugging session uncovers a repo-specific pitfall |
| **User Corrects Agent** | The user overrides or corrects a decision the agent made |
| **Design Preference** | The user expresses a preference for a specific visual style or UX pattern |

---

## 2. What to Capture

### Design Patterns
- New CSS techniques or theme variations
- Color palettes the user prefers
- Animation styles or timing preferences
- Component design decisions (e.g., "always use FAB for settings, not a sidebar")

### Architecture Patterns
- State management approaches
- Routing conventions
- Data persistence strategies
- Component composition patterns

### Build & Dev Ops
- New scripts or tools added to the pipeline
- Environment-specific configurations
- Deployment workarounds

### User Preferences
- Coding style preferences (naming, file organization)
- UI/UX opinions (e.g., "prefer dark mode with purple accents")
- Workflow preferences (e.g., "always verify build before asking to commit")

---

## 3. How to Update Skills

### Step 1: Identify the Target Skill

| Pattern Category | Target Skill File |
|:---|:---|
| CSS, animations, colors, themes | `.agent/skills/ui-design-system/SKILL.md` |
| Repo structure, build, config | `.agent/skills/web-development/SKILL.md` |
| New chapter setup procedures | `.agent/skills/chapter-scaffolding/SKILL.md` |
| Entirely new category | Create a new skill under `.agent/skills/<name>/SKILL.md` |

### Step 2: Append to the "Learned Patterns" Section

Every skill file has a `## Learned Patterns` section with sentinel comments:
```markdown
<!-- LEARNED_PATTERNS_START -->
<!-- LEARNED_PATTERNS_END -->
```

Insert new patterns **before** the `LEARNED_PATTERNS_END` comment:

```markdown
<!-- LEARNED_PATTERNS_START -->

### [Pattern Name] — [Date YYYY-MM-DD]
**Source**: Conversation about [topic]
**Pattern**: [Concise description of what was learned]
**Example**:
```css
/* or code block showing the pattern */
```

<!-- LEARNED_PATTERNS_END -->
```

### Step 3: For Major Patterns, Update the Main Skill Body

If a learned pattern is significant enough (e.g., a new mandatory convention), don't just append it — integrate it into the appropriate section of the skill's main content. For example:
- A new mandatory design rule → add to Section 1 of the UI Design System skill
- A new build step → add to Section 4 of the Web Development skill

---

## 4. Creating New Skills

If a learned pattern doesn't fit any existing skill, create a new one:

1. Create the directory: `.agent/skills/<skill-name>/`
2. Create `SKILL.md` with YAML frontmatter:
   ```yaml
   ---
   name: Skill Name
   description: Brief description of what this skill covers.
   ---
   ```
3. Write the skill content following the structure of existing skills
4. Add the `## Learned Patterns` section with sentinel comments

---

## 5. The Upskill Prompt

At the end of each significant development task (completing a chapter, major feature, or extended debugging session), the agent should evaluate whether anything worth capturing was learned.

**Decision Criteria**: Ask yourself:
1. Did I discover something that would save time if I knew it at the start?
2. Did the user demonstrate a technique I hadn't seen before?
3. Did we find a repo-specific gotcha that future agents should know about?
4. Did the user express a preference that should be remembered?

If **any answer is yes**, ask the user:

> *"I noticed some patterns in this session that could improve our development workflow. Would you like me to capture them as reusable skills?"*
>
> Patterns I noticed:
> - [Pattern 1 — brief description]
> - [Pattern 2 — brief description]

If the user agrees:
1. Write each pattern to the appropriate skill file
2. Summarize what was added
3. Confirm the updates

If the user declines, do nothing — respect their decision.

---

## 6. Skill Quality Standards

When writing or updating skills, ensure:

- **Specificity**: Include exact code snippets, file paths, and command lines — never vague instructions
- **Actionability**: Every instruction should be directly executable by an agent
- **Examples**: Always include at least one real-world example
- **Context**: Explain *why* a pattern exists, not just *what* it is
- **Timestamps**: Include dates on learned patterns so stale ones can be identified
- **References**: Link back to the conversation or file where the pattern was discovered

---

## 7. Skill Maintenance

Periodically review skills for:

- **Staleness**: Patterns that no longer apply due to repo evolution
- **Conflicts**: New patterns that contradict older ones (newer should win)
- **Redundancy**: Multiple patterns that could be consolidated
- **Gaps**: Areas of the codebase not covered by any skill

When the user starts a new session involving significant development work, briefly scan the skill files to ensure they're up-to-date with the current repo state.
