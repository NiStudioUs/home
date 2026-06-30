export const cypressChapter = {
  chapterId: 'concepts-cypress',
  title: 'Concepts: Cypress Mastery (Multi-Domain, Tasks, Sessions & Mocks)',
  summary: 'Comprehensive analysis of Cypress in-browser execution architecture, network routing via cy.intercept(), cross-origin testing via cy.origin(), backend execution via cy.task(), and clock mocking.',
  indexTopics: [
    { id: 'cyp-setup-arch', title: '1. Architecture & Setup: In-Browser Execution vs Out-of-Process Drivers' },
    { id: 'cyp-custom-commands', title: '2. Framework Design: Custom Commands & Programmatic App Actions' },
    { id: 'cyp-intercept-mock', title: '3. Network Control: cy.intercept() for API Stubbing & Dynamic Responses' },
    { id: 'cyp-shadow-dom', title: '4. Piercing Shadow DOM: .shadow() and includeShadowDom Configuration' },
    { id: 'cyp-state-retry', title: '5. Synchronization & State: Automatic Retry-ability, Aliases (@) & Events' },
    { id: 'cyp-reports-grep', title: '6. CI Execution & Reporting: Mochawesome, cypress-grep Spec Filtering' },
    { id: 'cyp-cross-origin', title: '7. Multi-Domain Testing: cy.origin() for OAuth, Stripe & 3rd-Party Auth' },
    { id: 'cyp-node-tasks', title: '8. Backend Execution: cy.task() for DB Seeding, Shell Scripts & PDF Parsing' },
    { id: 'cyp-session-caching', title: '9. Session Persistence: cy.session() Caching Cookies & LocalStorage across Specs' },
    { id: 'cyp-clock-timers', title: '10. Time Travel: cy.clock() and cy.tick() for DatePickers & Expiration Timers' }
  ],
  qaList: [
    {
      id: 'cyp-setup-arch',
      questionNumber: 'C3.1',
      question: 'How does Cypress’s architectural execution model fundamentally differ from Selenium and Playwright?',
      options: [
        'A. Cypress executes directly inside the same browser event loop as your application, rather than issuing remote out-of-process commands over network sockets',
        'B. Cypress runs entirely inside an external Docker container without UI rendering',
        'C. Cypress requires compiling TypeScript to WebAssembly before running',
        'D. Cypress only operates on Safari browser instances'
      ],
      correctAnswer: 'A. Cypress executes directly inside the same browser event loop as your application, rather than issuing remote out-of-process commands over network sockets',
      explanation: 'Running inside the browser event loop gives Cypress native synchronous access to window objects, local storage, Redux stores, and DOM events, eliminating network latency between test scripts and the browser.'
    },
    {
      id: 'cyp-custom-commands',
      questionNumber: 'C3.2',
      question: 'Why do Cypress architects recommend "App Actions" or programmatic login via API over traditional UI Page Object login steps?',
      options: [
        'A. Programmatic API authentication (`cy.request()`) sets session cookies instantly in milliseconds, bypassing repetitive UI login screens across test specs',
        'B. Because Page Object classes are strictly forbidden by Cypress syntax compiler',
        'C. UI clicking degrades browser memory after 3 specs',
        'D. App actions prevent screenshots from being generated'
      ],
      correctAnswer: 'A. Programmatic API authentication (`cy.request()`) sets session cookies instantly in milliseconds, bypassing repetitive UI login screens across test specs',
      explanation: 'Testing UI login thoroughly once is sufficient. For all subsequent regression specs, injecting auth tokens directly into `window.localStorage` or using `cy.session()` speeds up execution times by over 70%.'
    },
    {
      id: 'cyp-intercept-mock',
      questionNumber: 'C3.3',
      question: 'Which `cy.intercept()` syntax correctly stubs an API backend response using a static JSON fixture file?',
      options: [
        'A. `cy.intercept("GET", "/api/v1/user/profile", { fixture: "userProfile.json" }).as("getProfile");`',
        'B. `cy.mockNetwork("/api/v1/user", "userProfile.json");`',
        'C. `cy.server().route("GET", "/api/v1/user", "fixture:userProfile");`',
        'D. `cy.stubApi("/api/v1/user").returnJson("userProfile.json");`'
      ],
      correctAnswer: 'A. `cy.intercept("GET", "/api/v1/user/profile", { fixture: "userProfile.json" }).as("getProfile");`',
      explanation: '`cy.intercept()` is Cypress’s modern routing engine. Aliasing it with `.as("getProfile")` allows deterministic assertion waiting via `cy.wait("@getProfile")` before asserting UI state.'
    },
    {
      id: 'cyp-shadow-dom',
      questionNumber: 'C3.4',
      question: 'How can you configure Cypress globally to pierce Shadow DOM boundaries without chaining `.shadow()` on every command?',
      options: [
        'A. Set `includeShadowDom: true` inside `cypress.config.js` global configuration',
        'B. Add `--shadow-pierce` flag to `npx cypress run` terminal command',
        'C. It is impossible; you must invoke `.shadow()` explicitly on every DOM node',
        'D. Import external shadow plugin in `e2e.js`'
      ],
      correctAnswer: 'A. Set `includeShadowDom: true` inside `cypress.config.js` global configuration',
      explanation: 'Enabling `includeShadowDom: true` instructs `cy.get()` and `cy.find()` to traverse web components and custom shadow root boundaries automatically across the entire test project.'
    },
    {
      id: 'cyp-state-retry',
      questionNumber: 'C3.5',
      question: 'What is the core architectural mechanism behind Cypress’s automatic retry-ability?',
      options: [
        'A. Queries (`cy.get()`) re-run continuously until assertions attached to them (`.should()`) pass or the default command timeout expires',
        'B. The entire `it()` block restarts from line 1 whenever an error occurs',
        'C. Cypress reloads the webpage automatically on assertion failure',
        'D. Commands like `cy.click()` are re-clicked 10 times until success'
      ],
      correctAnswer: 'A. Queries (`cy.get()`) re-run continuously until assertions attached to them (`.should()`) pass or the default command timeout expires',
      explanation: 'Cypress decouples DOM queries from assertions. If `cy.get(".loader").should("not.exist")` fails initially, Cypress re-queries the DOM every few milliseconds until the assertion resolves successfully.'
    },
    {
      id: 'cyp-reports-grep',
      questionNumber: 'C3.6',
      question: 'How does `@cypress/grep` optimize CI/CD pipeline execution runtimes during targeted regression cycles?',
      options: [
        'A. By filtering test execution dynamically via tags (`--env grepTags=@smoke`) directly from the command line without modifying spec code',
        'B. By compressing test videos into smaller MP4 formats',
        'C. By skipping syntax checking during compilation',
        'D. By running tests in headless Chrome instead of Electron'
      ],
      correctAnswer: 'A. By filtering test execution dynamically via tags (`--env grepTags=@smoke`) directly from the command line without modifying spec code',
      explanation: 'Integrating `@cypress/grep` allows developers to run selective test suites (`npx cypress run --env grepTags="@p1"`), cutting pipeline feedback loops from hours down to minutes.'
    },
    {
      id: 'cyp-cross-origin',
      questionNumber: 'C3.7',
      question: 'How does modern Cypress solve cross-origin navigation failures when automating OAuth SSO logins (e.g., Auth0 / Google Sign-In)?',
      options: [
        'A. Wrapping remote interaction commands inside `cy.origin("https://auth0.com", () => { ... })` block',
        'B. Disabling web security permanently in Chrome flags',
        'C. Using Selenium Grid proxy servers',
        'D. Cross-origin testing is unsupported in Cypress'
      ],
      correctAnswer: 'A. Wrapping remote interaction commands inside `cy.origin("https://auth0.com", () => { ... })` block',
      explanation: 'Because Cypress runs inside the browser window, browser same-origin policies prevent interacting with external domains. `cy.origin()` injects secondary execution contexts into the remote origin safely.',
      attachedDeepDive: {
        title: 'Deep Dive: Cross-Origin OAuth Authentication',
        content: [
          "```javascript",
          "it('should login via third-party Auth0 SSO provider', () => {",
          "  cy.visit('/login');",
          "  cy.get('#sso-google-btn').click();",
          "",
          "  // Cypress seamlessly switches context to external Auth domain",
          "  cy.origin('https://auth.auth0.com', () => {",
          "    cy.get('input[name=\"email\"]').type('karthik@sdet.org');",
          "    cy.get('input[name=\"password\"]').type('SecurePass123!');",
          "    cy.get('button[type=\"submit\"]').click();",
          "  });",
          "",
          "  // Execution returns to your application origin automatically",
          "  cy.url().should('include', '/dashboard');",
          "  cy.get('.welcome-banner').should('contain', 'Welcome, Karthik');",
          "});",
          "```"
        ].join('\n')
      }
    },
    {
      id: 'cyp-node-tasks',
      questionNumber: 'C3.8',
      question: 'Why must QE engineers use `cy.task()` instead of standard Node.js libraries (`fs`, `child_process`, `pg`) directly inside test spec files?',
      options: [
        'A. Test specs run inside the browser sandbox where Node.js APIs do not exist; `cy.task()` bridges browser code to the backend Node.js configuration process',
        'B. `cy.task()` executes code faster in WebAssembly',
        'C. Node.js packages cause CSS stylesheets to fail loading',
        'D. `cy.task()` is only used for generating Excel spreadsheets'
      ],
      correctAnswer: 'A. Test specs run inside the browser sandbox where Node.js APIs do not exist; `cy.task()` bridges browser code to the backend Node.js configuration process',
      explanation: 'Whenever you need to query PostgreSQL databases directly to verify record creation, delete downloaded test files from disk, or parse PDF statements, you define handlers inside `setupNodeEvents` and invoke them via `cy.task("queryDb", sql)`.'
    },
    {
      id: 'cyp-session-caching',
      questionNumber: 'C3.9',
      question: 'What optimization does `cy.session()` introduce when structuring test suites with multiple test blocks (`it()`) requiring authentication?',
      options: [
        'A. It caches browser cookies, LocalStorage, and SessionStorage after the initial login pass and restores them instantly across subsequent tests without re-running UI login steps',
        'B. It keeps browser tabs open forever after test completion',
        'C. It encrypts user passwords in test output logs',
        'D. It shares memory variables between Chrome and Firefox instances'
      ],
      correctAnswer: 'A. It caches browser cookies, LocalStorage, and SessionStorage after the initial login pass and restores them instantly across subsequent tests without re-running UI login steps',
      explanation: 'Before `cy.session()`, QE engineers ran login before every single `it()` block or struggled with state leaks. `cy.session(userId, setupFn)` caches authentication snapshots per user identifier cleanly.'
    },
    {
      id: 'cyp-clock-timers',
      questionNumber: 'C3.10',
      question: 'How can an automation engineer deterministically test UI countdown timers or OTP expiration without waiting real physical time?',
      options: [
        'A. Override native system time via `cy.clock(Date.now())` before triggering the timer, then fast-forward execution instantly using `cy.tick(60000)`',
        'B. Use `cy.wait(60000)` to pause the browser script for 1 real minute',
        'C. Modify computer BIOS time settings programmatically',
        'D. Countdowns cannot be tested automatically'
      ],
      correctAnswer: 'A. Override native system time via `cy.clock(Date.now())` before triggering the timer, then fast-forward execution instantly using `cy.tick(60000)`',
      explanation: '`cy.clock()` overrides native `setTimeout` and `setInterval`. Calling `cy.tick(300000)` advances virtual browser time by 5 minutes instantaneously, allowing instant assertion of OTP expiration error modals.'
    }
  ]
};
