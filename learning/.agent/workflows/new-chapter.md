---
description: Create a new chapter-n project in the learning repository
---

# New Chapter Workflow

// turbo-all

1. **Read the skills** before doing anything:
   ```
   Read `.agent/skills/chapter-scaffolding/SKILL.md`
   Read `.agent/skills/web-development/SKILL.md`
   Read `.agent/skills/ui-design-system/SKILL.md`
   ```

2. **Ask the user** for project details:
   - What is the project about? (title and description)
   - Static HTML or React SPA?
   - Any specific design preferences or themes to emphasize?

3. **Determine the next chapter number** by checking existing chapters:
   ```bash
   ls -d apps/chapter-* 2>/dev/null | sort -V | tail -1
   ```

4. **Follow the Chapter Scaffolding skill** step by step:
   - Scaffold the project directory and files
   - Apply the design system (hybrid theme by default)
   - Register in the Hub (`src/App.jsx`)
   - Update the root build script (`package.json`)
   - Create `README.md`

5. **Verify the build**:
   ```bash
   npm run build
   ```

6. **Run the dev server** and confirm everything works:
   ```bash
   npm run dev
   ```

7. **Run the Auto-Upskill check** — evaluate if any new patterns were learned during this scaffolding.
