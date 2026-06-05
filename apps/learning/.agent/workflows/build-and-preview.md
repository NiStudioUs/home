---
description: Build and preview the learning repository locally
---

# Build and Preview Workflow

// turbo-all

1. **Install dependencies** (if needed):
   ```bash
   npm install
   ```

2. **Run the production build**:
   ```bash
   npm run build
   ```

3. **Check for errors** in the build output. If there are TypeScript or compilation errors:
   - Fix the errors
   - Re-run `npm run build`
   - Repeat until clean

4. **Preview the production build**:
   ```bash
   npm run preview
   ```
   > **Note**: Testing the integrated Hub + nested React Chapter apps requires `npm run preview`. The root `npm run dev` server will only serve nested chapter `index.html` files as static assets, resulting in a blank page.

5. **Verify in the browser** that:
   - The Hub page loads and shows all chapter cards
   - Each chapter link navigates correctly
   - Styling and animations render properly
