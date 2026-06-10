# KS Foodie E2E Automation Framework

This directory contains the Playwright automation framework for the KS Foodie application. It is built using TypeScript and follows industry-standard patterns like the Page Object Model (POM) and custom fixtures.

## Architecture & Structure

```text
tests/
├── fixtures/            # Custom fixtures and test data JSONs
├── pages/               # Page Object Models encapsulating locators and actions
├── specs/               # Test suites categorized by architectural pattern
│   ├── standalone/      # Independent tests (state resets after each)
│   ├── journeys/        # E2E workflows where state persists across steps
│   ├── data-driven/     # Tests iterating over data sets
│   └── specialties/     # Feature demonstrations (Mocking, Visual Regression, Emulation)
└── utils/               # Helpers, including a custom Reporter wrapper
```

## Key Features

1. **Monorepo Design:** App code lives in `src/`, tests live in `tests/`. Both share the same root `package.json`.
2. **Custom Reporter Utility:** All logging, steps, and attachments are routed through `tests/utils/reporter.ts`. This abstracts the specific reporting library (like Allure) away from the test logic.
3. **Multi-Reporting:** Configured to generate both Playwright's native HTML report and advanced Allure reports.
4. **Custom Test Fixtures:** The `test` object is extended in `fixtures/test-base.ts` to automatically instantiate Page Objects, preventing repetitive setup in your spec files.

## Running Tests

### Base Configuration
By default, tests run sequentially (`fullyParallel: false`) against Chromium. The `baseURL` is set to `http://localhost:5173/apps/learning/apps/chapter-1/src/`. You may need to serve the `src/` folder locally before running tests.

### Commands

**Run all tests in headed mode:**
```bash
npx playwright test --headed
```

**Run a specific test file:**
```bash
npx playwright test tests/specs/journeys/order-flow.spec.ts
```

**View Playwright HTML Report:**
```bash
npm run show-report
```

**Generate and View Allure Report:**
```bash
npm run show-allure-report
```

*Note: You can also still use `npx playwright show-report reports/html` or `npx allure serve ./reports/allure-results` directly.*

## Adding New Tests
1. **Locators & Actions:** Add them to the relevant class in `tests/pages/`. Create a new class if necessary and add it to the fixture in `tests/fixtures/test-base.ts`.
2. **Reporting:** Wrap significant actions inside `await Reporter.step('Description', async () => { ... })`.
3. **Spec:** Import `test` from `tests/fixtures/test-base.ts` (not `@playwright/test`) to gain access to the pre-instantiated POMs.

## Playwright Specialities Demonstration

A dedicated directory `tests/specs/specialties/` has been created to serve as a learning resource and reference for advanced Playwright capabilities. It includes the following feature demonstrations:

### 1. Browser Contexts and Tabs (`browser-contexts-and-tabs.spec.ts`)
Demonstrates how to use `browser.newContext()` to create completely isolated browser sessions (similar to incognito windows) to test multi-user concurrency without sharing cookies or local storage. It also demonstrates how to create and manage multiple tabs within a single context using `context.newPage()`.

### 2. Device Emulation & Locale (`device-emulation.spec.ts`)
Uses `test.use()` to emulate specific hardware characteristics for a test file. We emulate a **Pixel 5** viewport, force the locale to `fr-FR` (French), set the timezone to `Europe/Paris`, and mock the device's geolocation to Paris coordinates, automatically granting the necessary location permissions.

### 3. Network Mocking & Interception (`network-mocking.spec.ts`)
Shows how to use `page.route()` to intercept web traffic. We demonstrated:
- Mocking a JSON API response to load custom data into the UI.
- Forcing a `500 Internal Server Error` to test fallback UI and error handling.
- Aborting requests for specific file types (like images) to drastically speed up execution or test the page without heavy assets.

### 4. Soft Assertions (`soft-assertions.spec.ts`)
By default, an assertion failure halts the entire test instantly. By using `expect.soft()`, we instruct Playwright to log the failure but continue executing the rest of the test steps, aggregating all the failures at the very end.

### 5. Visual Regression Testing (`visual-regression.spec.ts`)
Uses `expect(page).toHaveScreenshot()` to take pixel-perfect visual snapshots of the UI. The very first time it runs, it generates a baseline image. All subsequent runs compare the current UI against this baseline image, throwing an error if pixels deviate beyond a set threshold.

### 6. API Testing (`api-testing.spec.ts`)
Shows that Playwright is not exclusively for UIs. By utilizing the `request` fixture (`APIRequestContext`), we can make lightning-fast direct HTTP calls to REST APIs (GET, POST, etc.) and assert on JSON responses directly, bypassing browser rendering entirely.

### 7. Element Actions (`element-actions.spec.ts`)
A comprehensive showcase of common UI element interactions on a dedicated Playground page:
- **Typing:** `fill()` (instant text injection) vs `pressSequentially()` (keystroke simulation).
- **Mouse Actions:** `hover()` and `dblclick()`.
- **Forms:** `check()`, `uncheck()`, and `selectOption()` for native checkboxes, radios, and dropdowns.
- **Scrolling & Screenshots:** Using `scrollIntoViewIfNeeded()`, taking full-page screenshots (`screenshot({ fullPage: true })`), and capturing individual element screenshots.
