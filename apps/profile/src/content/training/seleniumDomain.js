export const seleniumChapter = {
  chapterId: 'concepts-selenium',
  title: 'Concepts: Selenium Mastery (BiDi, Grid 4, Locators, IFrames & CDP)',
  summary: 'Exhaustive exploration of modern Selenium 4 architecture, W3C standardization, bidirectional (BiDi) APIs, distributed Grid 4 auto-scaling, complex IFrames, and advanced user gestures.',
  indexTopics: [
    { id: 'sel-setup-arch', title: '1. Architecture & Setup: W3C Protocol vs Legacy JSON Wire' },
    { id: 'sel-pom-factory', title: '2. Framework Design: Page Object Model (POM) vs PageFactory (@FindBy)' },
    { id: 'sel-advanced-locators', title: '3. Advanced Locators: XPath Axis, CSS Selectors & Relative Locators' },
    { id: 'sel-shadow-dom', title: '4. Piercing Shadow DOM: SearchContext & getShadowRoot() in Selenium 4' },
    { id: 'sel-waits-actions', title: '5. Synchronization & Actions: Explicit/Fluent Waits & Complex Gestures' },
    { id: 'sel-cdp-reports', title: '6. CDP Interception & Enterprise Reporting (ExtentReports / Allure)' },
    { id: 'sel-iframes-windows', title: '7. Complex Contexts: IFrames, Nested Windows & Alert Dialogs' },
    { id: 'sel-bidi-api', title: '8. Next-Gen BiDi API: Real-time DOM Mutation & Console Log Monitoring' },
    { id: 'sel-grid-4', title: '9. Distributed Execution: Selenium Grid 4 Router, Distributor & Session Map' },
    { id: 'sel-ssl-proxy', title: '10. Network Security: SSL Certificates, Proxy Auth & Download Preferences' }
  ],
  qaList: [
    {
      id: 'sel-setup-arch',
      questionNumber: 'C2.1',
      question: 'What major architectural transformation occurred in Selenium 4 regarding communication protocols?',
      options: [
        'A. Replacement of the legacy JSON Wire Protocol with direct native W3C WebDriver standardization',
        'B. Removal of support for Java in favor of Node.js exclusively',
        'C. Requirement to install browser extensions for local execution',
        'D. Transition from HTTP calls to FTP file sockets'
      ],
      correctAnswer: 'A. Replacement of the legacy JSON Wire Protocol with direct native W3C WebDriver standardization',
      explanation: 'Selenium 4 communicates directly with browser drivers using standardized W3C protocols. This eliminated the need for request encoding/decoding overhead, resulting in significantly faster and more stable execution across browsers.'
    },
    {
      id: 'sel-pom-factory',
      questionNumber: 'C2.2',
      question: 'What is the primary technical drawback of utilizing `PageFactory.initElements()` with `@FindBy` annotations in modern automation suites?',
      options: [
        'A. It generates dynamic proxies that attempt to re-find elements on every method call, causing `StaleElementReferenceException` on dynamic AJAX SPAs',
        'B. It prevents the use of CSS selectors',
        'C. It does not work with Chrome or Firefox drivers',
        'D. It forces elements to be public static variables'
      ],
      correctAnswer: 'A. It generates dynamic proxies that attempt to re-find elements on every method call, causing `StaleElementReferenceException` on dynamic AJAX SPAs',
      explanation: 'While `@FindBy` looks clean, industry best practice has shifted back to encapsulated `By` locator objects paired with explicit waits (`wait.until(ExpectedConditions.visibilityOfElementLocated(by))`) for maximum stability in Single Page Applications.'
    },
    {
      id: 'sel-advanced-locators',
      questionNumber: 'C2.3',
      question: 'How do Selenium 4 Relative Locators (`with(By)...`) simplify element targeting near visual landmarks?',
      options: [
        'A. They allow finding elements using visual spatial relationships such as `.above()`, `.below()`, `.toLeftOf()`, `.toRightOf()`, and `.near()`',
        'B. They automatically generate AI image recognition coordinates',
        'C. They replace XPath completely by querying SQL databases',
        'D. They measure screen pixels using desktop screen rulers'
      ],
      correctAnswer: 'A. They allow finding elements using visual spatial relationships such as `.above()`, `.below()`, `.toLeftOf()`, `.toRightOf()`, and `.near()`',
      explanation: 'Relative Locators analyze the DOM bounding rectangles returned by the browser engine, allowing you to locate dynamic inputs easily (e.g., `driver.findElement(with(By.tagName("input")).below(passwordLabel))`).'
    },
    {
      id: 'sel-shadow-dom',
      questionNumber: 'C2.4',
      question: 'What is the official native method introduced in Selenium 4 to interact with elements inside an open Shadow DOM?',
      options: [
        'A. `WebElement shadowRoot = hostElement.getShadowRoot(); WebElement target = shadowRoot.findElement(By.cssSelector(...));`',
        'B. `driver.switchTo().shadowDom()`',
        'C. Executing raw JavaScript `document.querySelector().shadowRoot` exclusively',
        'D. Shadow DOM cannot be accessed by Selenium under any circumstances'
      ],
      correctAnswer: 'A. `WebElement shadowRoot = hostElement.getShadowRoot(); WebElement target = shadowRoot.findElement(By.cssSelector(...));`',
      explanation: 'Selenium 4 added `getShadowRoot()` which returns a `SearchContext`. Note that XPath cannot cross Shadow DOM boundaries; you MUST use CSS selectors when searching inside a shadow root.',
      attachedDeepDive: {
        title: 'Deep Dive: Selenium 4 Shadow DOM Piercing Code',
        content: [
          "#### 💻 Shadow DOM Interaction Code",
          "```java",
          "// 1. Locate the shadow host element in the standard DOM",
          "WebElement shadowHost = driver.findElement(By.cssSelector(\"#settings-component-host\"));",
          "",
          "// 2. Extract the SearchContext shadow root",
          "SearchContext shadowRoot = shadowHost.getShadowRoot();",
          "",
          "// 3. Query inside the shadow root using CSS Selectors (XPath is unsupported inside shadow trees)",
          "WebElement toggleSwitch = shadowRoot.findElement(By.cssSelector(\".theme-toggle-btn\"));",
          "toggleSwitch.click();",
          "```"
        ].join('\n')
      }
    },
    {
      id: 'sel-waits-actions',
      questionNumber: 'C2.5',
      question: 'What is the exact distinction between `WebDriverWait` (Explicit Wait) and `FluentWait` in Selenium?',
      options: [
        'A. `WebDriverWait` is a subclass of `FluentWait` with default configuration; `FluentWait` allows custom polling frequency and specific exception ignoring',
        'B. `FluentWait` is deprecated in Selenium 4',
        'C. `WebDriverWait` waits globally for all elements; `FluentWait` waits only for page titles',
        'D. There is no technical difference'
      ],
      correctAnswer: 'A. `WebDriverWait` is a subclass of `FluentWait` with default configuration; `FluentWait` allows custom polling frequency and specific exception ignoring',
      explanation: '`FluentWait` gives fine-grained tuning: `new FluentWait<>(driver).withTimeout(Duration.ofSeconds(15)).pollingEvery(Duration.ofMillis(250)).ignoring(NoSuchElementException.class)`. `WebDriverWait` extends this with standard presets.'
    },
    {
      id: 'sel-cdp-reports',
      questionNumber: 'C2.6',
      question: 'How does Selenium 4 utilize Chrome DevTools Protocol (CDP) to intercept network requests during execution?',
      options: [
        'A. By creating a `DevTools` session (`((HasDevTools) driver).getDevTools()`) and adding listeners for `Network.requestWillBeSent` or mocking responses',
        'B. By installing external Wireshark proxy drivers',
        'C. CDP is only supported in Cypress, not Selenium',
        'D. By modifying system hosts files dynamically'
      ],
      correctAnswer: 'A. By creating a `DevTools` session (`((HasDevTools) driver).getDevTools()`) and adding listeners for `Network.requestWillBeSent` or mocking responses',
      explanation: 'Selenium 4 integrated CDP access, allowing QE engineers to simulate network throttling (3G/4G), mock API payloads, capture console HTTP error logs, and override geolocation coordinates dynamically.'
    },
    {
      id: 'sel-iframes-windows',
      questionNumber: 'C2.7',
      question: 'What is the robust architectural pattern for switching between multiple dynamic IFrames and returning to the main document?',
      options: [
        'A. Switch explicitly via `driver.switchTo().frame(webElement)` and return using `driver.switchTo().defaultContent()`',
        'B. Use `driver.navigate().refresh()` to clear frame context',
        'C. IFrames do not require switching in W3C compliant drivers',
        'D. Click the IFrame border using mouse coordinates'
      ],
      correctAnswer: 'A. Switch explicitly via `driver.switchTo().frame(webElement)` and return using `driver.switchTo().defaultContent()`',
      explanation: 'Always locate frame elements explicitly using `WebDriverWait` before calling `switchTo().frame()`. Once inner actions complete, calling `defaultContent()` resets focus back to the top-level window hierarchy.',
      attachedDeepDive: {
        title: 'Deep Dive: Window & IFrame Synchronization',
        content: [
          "Handling dynamic popups and nested frames requires robust handle tracking to avoid `NoSuchWindowException`.",
          "",
          "#### Window Handling Pattern",
          "```java",
          "String parentWindow = driver.getWindowHandle();",
          "driver.findElement(By.id(\"open-popup-btn\")).click();",
          "",
          "// Wait until second window appears",
          "new WebDriverWait(driver, Duration.ofSeconds(10))",
          "    .until(ExpectedConditions.numberOfWindowsToBe(2));",
          "",
          "for (String windowHandle : driver.getWindowHandles()) {",
          "    if (!windowHandle.equals(parentWindow)) {",
          "        driver.switchTo().window(windowHandle);",
          "        break;",
          "    }",
          "}",
          "",
          "// Perform actions inside popup then close and switch back",
          "driver.close();",
          "driver.switchTo().window(parentWindow);",
          "```"
        ].join('\n')
      }
    },
    {
      id: 'sel-bidi-api',
      questionNumber: 'C2.8',
      question: 'How does the WebDriver BiDi (Bidirectional) API in Selenium 4 improve upon traditional Chrome DevTools Protocol (CDP) usage?',
      options: [
        'A. BiDi provides a W3C standardized cross-browser bidirectional event listener working across Firefox, Edge, and Chrome without being tied exclusively to Chromium protocol versions',
        'B. BiDi runs 100 times faster by disabling GUI rendering',
        'C. BiDi is used exclusively for mobile app testing',
        'D. BiDi replaces Java code with GraphQL queries'
      ],
      correctAnswer: 'A. BiDi provides a W3C standardized cross-browser bidirectional event listener working across Firefox, Edge, and Chrome without being tied exclusively to Chromium protocol versions',
      explanation: 'CDP is tightly coupled to Chromium builds and breaks when Chrome updates. WebDriver BiDi standardizes event streams (like listening for JavaScript console exceptions or network mutations) across all major browser vendors.'
    },
    {
      id: 'sel-grid-4',
      questionNumber: 'C2.9',
      question: 'In Selenium Grid 4 distributed architecture, what internal component is responsible for matching incoming test execution requests against available browser capabilities?',
      options: [
        'A. The Distributor component queries the Session Map and assigns nodes based on OS, Browser, and Version tags',
        'B. The Node router runs SQL queries directly against Jira',
        'C. The EventBus converts Java bytecode to Docker images',
        'D. The Session Map shuts down idle VMs'
      ],
      correctAnswer: 'A. The Distributor component queries the Session Map and assigns nodes based on OS, Browser, and Version tags',
      explanation: 'Selenium Grid 4 was completely re-architected into modular microservices: Router (gateway), Distributor (capability matching), Session Map (active session registry), and Nodes (execution workers), enabling seamless Kubernetes auto-scaling.'
    },
    {
      id: 'sel-ssl-proxy',
      questionNumber: 'C2.10',
      question: 'How should an automation engineer configure SSL certificate bypass and automatic file download locations in Selenium 4 `ChromeOptions`?',
      options: [
        'A. Using `options.setAcceptInsecureCerts(true)` and passing a `prefs` HashMap containing `"download.default_directory"`',
        'B. Modifying Windows system registry entries before executing tests',
        'C. Clicking the browser "Advanced -> Proceed to site" warning dynamically via UI locators',
        'D. Disabling network firewalls globally on the host machine'
      ],
      correctAnswer: 'A. Using `options.setAcceptInsecureCerts(true)` and passing a `prefs` HashMap containing `"download.default_directory"`',
      explanation: 'UI clicking SSL warning screens is brittle across environments. Configuring browser profile preferences programmatically inside `ChromeOptions` or `FirefoxOptions` guarantees consistent automated setup.',
      attachedDeepDive: {
        title: 'Deep Dive: Enterprise ChromeOptions Configuration',
        content: [
          "```java",
          "ChromeOptions options = new ChromeOptions();",
          "options.setAcceptInsecureCerts(true);",
          "options.addArguments(\"--headless=new\");",
          "options.addArguments(\"--disable-gpu\");",
          "options.addArguments(\"--window-size=1920,1080\");",
          "",
          "// Configure automated file downloads without OS confirmation dialogs",
          "Map<String, Object> prefs = new HashMap<>();",
          "prefs.put(\"download.default_directory\", \"/workspace/test-downloads\");",
          "prefs.put(\"download.prompt_for_download\", false);",
          "prefs.put(\"plugins.always_open_pdf_externally\", true);",
          "options.setExperimentalOption(\"prefs\", prefs);",
          "",
          "WebDriver driver = new ChromeDriver(options);",
          "```"
        ].join('\n')
      }
    }
  ]
};
