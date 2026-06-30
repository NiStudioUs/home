export const playwrightChapter = {
  chapterId: 'concepts-playwright',
  title: 'Concepts: Playwright Mastery (API Tracing, Popups, Emulation & Component)',
  summary: 'State-of-the-art Playwright engineering covering custom test fixtures, web-first assertions, getByRole locator resilience, APIRequestContext hybrid testing, mobile emulation, and soft assertions.',
  indexTopics: [
    { id: 'pw-setup-arch', title: '1. Architecture & Setup: WebSocket Bi-directional Protocol & Browser Contexts' },
    { id: 'pw-fixtures-pom', title: '2. Framework Design: Custom Test Fixtures & Modern Page Object Model' },
    { id: 'pw-resilient-locators', title: '3. Resilient Locators: User-Facing getByRole(), getByTestId() & Assertions' },
    { id: 'pw-shadow-piercing', title: '4. Native Shadow DOM Piercing: Automatic CSS/Text Engine Resolution' },
    { id: 'pw-api-tracing', title: '5. Hybrid Testing: APIRequestContext Interception & Trace Viewer Debugging' },
    { id: 'pw-reports-visual', title: '6. Enterprise Reporting & Visual Regression: Allure, HTML Reports & Snapshots' },
    { id: 'pw-multi-tab', title: '7. Multi-Tab & Popups: Handling New Windows via page.waitForEvent("popup")' },
    { id: 'pw-mobile-emulation', title: '8. Device Emulation: iPhone/Android Viewports, Geolocation & Offline Throttling' },
    { id: 'pw-component-testing', title: '9. Component Testing: Testing React/Vue Components Isolated in Playwright CT' },
    { id: 'pw-soft-assertions', title: '10. Resilient Polling: expect.soft() Non-Blocking Failures & expect.poll() Loops' }
  ],
  qaList: [
    {
      id: 'pw-setup-arch',
      questionNumber: 'C4.1',
      question: 'What performance advantage do Playwright Browser Contexts provide over launching new Browser instances per test?',
      options: [
        'A. Browser Contexts act as isolated incognito sessions sharing the same underlying browser process, initializing in milliseconds with zero cookie/storage leakage',
        'B. They allow running tests without installing Chromium or WebKit binaries',
        'C. They turn off JavaScript execution for faster DOM parsing',
        'D. They compress memory usage to under 10MB globally'
      ],
      correctAnswer: 'A. Browser Contexts act as isolated incognito sessions sharing the same underlying browser process, initializing in milliseconds with zero cookie/storage leakage',
      explanation: 'Launching a full browser takes seconds; creating a Browser Context takes ~10ms. This enables massive parallelization across CPU cores while guaranteeing strict test state isolation.'
    },
    {
      id: 'pw-fixtures-pom',
      questionNumber: 'C4.2',
      question: 'Why are Playwright Custom Fixtures (`test.extend()`) considered architecturally superior to traditional `BeforeEach` setup hooks?',
      options: [
        'A. Fixtures provide lazy evaluation, encapsulated teardown mechanisms, and clean dependency injection directly into test function signatures',
        'B. Fixtures do not require async/await keywords',
        'C. BeforeEach hooks are deprecated in Playwright test runner',
        'D. Fixtures run inside database procedures'
      ],
      correctAnswer: 'A. Fixtures provide lazy evaluation, encapsulated teardown mechanisms, and clean dependency injection directly into test function signatures',
      explanation: 'Fixtures initialize only if requested by the specific test block. Moreover, code written after `await use(pageObject)` executes automatically during teardown even if the assertion failed.',
      attachedDeepDive: {
        title: 'Deep Dive: Playwright Custom Fixture Architecture',
        content: [
          "#### 💻 Custom Fixture Implementation",
          "```typescript",
          "// fixtures/baseTest.ts",
          "import { test as base } from '@playwright/test';",
          "import { LoginPage } from '../pages/LoginPage';",
          "import { DashboardPage } from '../pages/DashboardPage';",
          "",
          "type MyFixtures = {",
          "  loginPage: LoginPage;",
          "  authenticatedDashboard: DashboardPage;",
          "};",
          "",
          "export const test = base.extend<MyFixtures>({",
          "  loginPage: async ({ page }, use) => {",
          "    const loginPage = new LoginPage(page);",
          "    await use(loginPage);",
          "  },",
          "  authenticatedDashboard: async ({ page }, use) => {",
          "    const login = new LoginPage(page);",
          "    await login.goto();",
          "    const dashboard = await login.loginAs('admin', 'password');",
          "    await use(dashboard);",
          "    await page.context().clearCookies();",
          "  }",
          "});",
          "```"
        ].join('\n')
      }
    },
    {
      id: 'pw-resilient-locators',
      questionNumber: 'C4.3',
      question: 'Why does W3C and Playwright best practice prioritize `page.getByRole()` over CSS selectors or XPath?',
      options: [
        'A. It locates elements by semantic accessibility contracts (role and accessible name), mirroring exact human user perception and surviving UI styling refactors',
        'B. It runs 10 times faster than ID lookups',
        'C. XPath is not supported in Playwright',
        'D. getByRole automatically clicks elements without needing `.click()`'
      ],
      correctAnswer: 'A. It locates elements by semantic accessibility contracts (role and accessible name), mirroring exact human user perception and surviving UI styling refactors',
      explanation: 'Targeting `page.getByRole("button", { name: "Submit" })` ensures your app is fully accessible to assistive screen readers while remaining completely immune to CSS class refactoring (`.btn-primary-v2`).'
    },
    {
      id: 'pw-shadow-piercing',
      questionNumber: 'C4.4',
      question: 'How does Playwright handle element selection inside nested Shadow DOM trees?',
      options: [
        'A. Playwright CSS and Text selectors pierce open Shadow DOM roots automatically by default without requiring any special query syntax',
        'B. You must use `page.pierceShadowDom()` on every selector line',
        'C. Shadow DOM must be disabled via browser context flags',
        'D. Only XPath can access Shadow DOM in Playwright'
      ],
      correctAnswer: 'A. Playwright CSS and Text selectors pierce open Shadow DOM roots automatically by default without requiring any special query syntax',
      explanation: 'Unlike Selenium where you must extract `getShadowRoot()`, Playwright’s selector engine seamlessly traverses open shadow boundaries out-of-the-box (`page.locator("custom-header >> css=.menu-item")`).'
    },
    {
      id: 'pw-api-tracing',
      questionNumber: 'C4.5',
      question: 'What troubleshooting capability makes Playwright Trace Viewer (`trace: "on-first-retry"`) invaluable for debugging enterprise CI CI/CD failures?',
      options: [
        'A. It captures a complete timeline recording DOM snapshots, console logs, network payloads, and visual screenshots for every individual action microsecond',
        'B. It prints stack traces directly to Slack channels automatically',
        'C. It decompiles backend Java bytecode into readable text',
        'D. It repairs broken locators automatically during pipeline runs'
      ],
      correctAnswer: 'A. It captures a complete timeline recording DOM snapshots, console logs, network payloads, and visual screenshots for every individual action microsecond',
      explanation: 'Opening a saved `trace.zip` file allows QE engineers to time-travel back and inspect the exact DOM layout, network headers, and visual UI state right before an assertion failed.'
    },
    {
      id: 'pw-reports-visual',
      questionNumber: 'C4.6',
      question: 'How does Playwright execute Visual Regression testing across multi-platform rendering engines?',
      options: [
        'A. Using `await expect(page).toHaveScreenshot("landing.png", { maxDiffPixels: 100 })` which compares baseline snapshots across Chromium, WebKit, and Firefox',
        'B. By calling third-party Photoshop APIs',
        'C. Visual comparison is only available in paid Enterprise Playwright tiers',
        'D. By comparing HTML text character counts only'
      ],
      correctAnswer: 'A. Using `await expect(page).toHaveScreenshot("landing.png", { maxDiffPixels: 100 })` which compares baseline snapshots across Chromium, WebKit, and Firefox',
      explanation: 'Playwright built pixel-perfect visual regression directly into its assertion engine, allowing pixel diff thresholds, masking dynamic timestamp elements, and generating side-by-side diff slider reports.'
    },
    {
      id: 'pw-multi-tab',
      questionNumber: 'C4.7',
      question: 'What is the recommended modern asynchronous syntax for catching and interacting with a newly opened browser tab or popup window in Playwright?',
      options: [
        'A. Using `const [popup] = await Promise.all([page.waitForEvent("popup"), page.getByRole("link", { name: "Open Portal" }).click()]);`',
        'B. Using `page.switchTo().window(1)` after clicking',
        'C. Adding a 10-second `page.waitForTimeout(10000)` before searching for new window IDs',
        'D. Playwright automatically combines popups into the primary document DOM'
      ],
      correctAnswer: 'A. Using `const [popup] = await Promise.all([page.waitForEvent("popup"), page.getByRole("link", { name: "Open Portal" }).click()]);`',
      explanation: 'Because popups open asynchronously, wrapping the action that triggers the popup inside `Promise.all` alongside `page.waitForEvent("popup")` avoids race conditions where the popup finishes loading before the listener attaches.',
      attachedDeepDive: {
        title: 'Deep Dive: Multi-Tab & Popup Handling',
        content: [
          "```typescript",
          "test('handle OAuth secondary window cleanly', async ({ page }) => {",
          "  await page.goto('https://bank.allica.com/login');",
          "",
          "  // Catch new popup promise while clicking trigger button",
          "  const [popup] = await Promise.all([",
          "    page.waitForEvent('popup'),",
          "    page.getByRole('button', { name: 'Login with SSO' }).click()",
          "  ]);",
          "",
          "  // Wait for popup DOM load and perform assertions",
          "  await popup.waitForLoadState();",
          "  await expect(popup).toHaveURL(/.*microsoftonline.com/);",
          "  await popup.getByLabel('Enter your email').fill('karthik@allica.com');",
          "  await popup.getByRole('button', { name: 'Next' }).click();",
          "});",
          "```"
        ].join('\n')
      }
    },
    {
      id: 'pw-mobile-emulation',
      questionNumber: 'C4.8',
      question: 'How can an automation architect simulate mobile device viewports, user geolocation, and offline network throttling inside Playwright configuration?',
      options: [
        'A. Importing preset configurations (`...devices["iPhone 13"]`) and setting context properties (`geolocation: { latitude: 51.5074, longitude: -0.1278 }, permissions: ["geolocation"]`) inside `playwright.config.ts`',
        'B. Running tests inside Xcode iOS simulators exclusively',
        'C. Installing physical SIM cards into CI/CD server motherboards',
        'D. Emulation requires third-party paid Appium cloud providers'
      ],
      correctAnswer: 'A. Importing preset configurations (`...devices["iPhone 13"]`) and setting context properties (`geolocation: { latitude: 51.5074, longitude: -0.1278 }, permissions: ["geolocation"]`) inside `playwright.config.ts`',
      explanation: 'Playwright natively simulates mobile device user agents, touch screen gestures, precise GPS coordinates, and network connectivity states directly inside browser emulation without requiring heavyweight simulators.'
    },
    {
      id: 'pw-component-testing',
      questionNumber: 'C4.9',
      question: 'What is the key architectural difference between Playwright E2E testing (`@playwright/test`) and Playwright Component Testing (Experimental CT)?',
      options: [
        'A. Component testing mounts individual UI components (React, Vue, Svelte) directly into a real browser using Vite without standing up backend web servers or navigating URLs',
        'B. Component testing runs inside Node.js JSDOM instead of real Chromium',
        'C. Component testing does not support visual screenshot comparisons',
        'D. Component testing is exclusively for testing CSS stylesheet syntax'
      ],
      correctAnswer: 'A. Component testing mounts individual UI components (React, Vue, Svelte) directly into a real browser using Vite without standing up backend web servers or navigating URLs',
      explanation: 'While E2E tests verify full application user flows, Component Testing (`await mount(<Button label="Submit" />)`) allows frontend developers to test complex state variations and DOM events in real rendering engines in milliseconds.'
    },
    {
      id: 'pw-soft-assertions',
      questionNumber: 'C4.10',
      question: 'When validating complex multi-widget dashboards, how do `expect.soft()` and `expect.poll()` prevent single minor UI glitches from terminating the entire regression test prematurely?',
      options: [
        'A. `expect.soft()` logs failure errors without stopping test execution, allowing all remaining assertions to run; `expect.poll()` retries async custom function returns until they match conditions',
        'B. `expect.soft()` lowers CPU utilization during assertions',
        'C. `expect.poll()` refreshes the entire web page every 5 seconds',
        'D. Soft assertions convert failed tests into passing tests automatically in JUnit reports'
      ],
      correctAnswer: 'A. `expect.soft()` logs failure errors without stopping test execution, allowing all remaining assertions to run; `expect.poll()` retries async custom function returns until they match conditions',
      explanation: 'If a dashboard has 10 data cards, using standard `await expect()` stops the test at card 1 if it fails. Using `await expect.soft(card1).toBeVisible()` marks the test as failed in test logs but continues evaluating cards 2 through 10.'
    }
  ]
};
