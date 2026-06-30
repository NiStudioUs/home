export const seleniumChapter = {
  chapterId: 'concepts-selenium',
  title: 'Concepts: Selenium Mastery (BiDi, Grid 4, Assertions, Actions, Network & Factory Setup)',
  summary: 'Exhaustive exploration of modern Selenium 4 architecture, W3C standardization, featuring complete reference tables for Explicit/Fluent Assertions, User Actions & File Uploads, CDP/BiDi Network Interception, and Distributed Grid 4 Parallel Factory setup.',
  indexTopics: [
    { id: 'sel-assertions-table', title: '1. Explicit Assertions: WebDriverWait, ExpectedConditions & FluentWait Reference Table' },
    { id: 'sel-actions-upload', title: '2. User Actions & File Uploads: Actions Class Gestures & sendKeys() Table' },
    { id: 'sel-network-cdp', title: '3. Network Mastery: CDP Interception, Mocking & BiDi Network Monitoring Table' },
    { id: 'sel-enterprise-setup', title: '4. Complete Enterprise Setup: Grid 4 Distributed Execution & Parallel Driver Factory' },
    { id: 'sel-setup-arch', title: '5. Architecture & Standardization: Native W3C Protocol vs Legacy JSON Wire' },
    { id: 'sel-pom-factory', title: '6. Framework Design: Page Object Model (POM) vs PageFactory (@FindBy)' },
    { id: 'sel-advanced-locators', title: '7. Advanced Locators: Relative Locators (above, below, near) & XPath Axis' },
    { id: 'sel-shadow-dom', title: '8. Piercing Shadow DOM: SearchContext & getShadowRoot() in Selenium 4' },
    { id: 'sel-waits-actions', title: '9. Synchronization Mechanics: Polling Intervals, Ignored Exceptions & Duration' },
    { id: 'sel-cdp-reports', title: '10. Enterprise Reporting: ExtentReports 5 & Allure Listeners with Screenshots' },
    { id: 'sel-iframes-windows', title: '11. Complex Contexts: IFrames, Nested Window Handles & Alert Dialogs' },
    { id: 'sel-bidi-api', title: '12. Next-Gen BiDi API: Real-Time DOM Mutation & Console Exception Monitoring' },
    { id: 'sel-grid-4', title: '13. Grid 4 Microservices: Router, Distributor, Session Map & Node Autoscaling' },
    { id: 'sel-ssl-proxy', title: '14. Network Security: SSL Certificate Bypass & ChromeOptions Prefs' }
  ],
  qaList: [
    {
      id: 'sel-assertions-table',
      questionNumber: 'SEL1',
      question: 'How do automation engineers structure deterministic assertions in Selenium 4 using `WebDriverWait` paired with `ExpectedConditions` to prevent timing flakiness?',
      options: [
        'A. By wrapping element lookups in explicit waits (`new WebDriverWait(driver, Duration.ofSeconds(10)).until(ExpectedConditions.visibilityOfElementLocated(by))`) before asserting state via TestNG/JUnit',
        'B. By using hardcoded `Thread.sleep(5000)` before every `Assert.assertEquals()` statement',
        'C. Selenium automatically retries all `driver.findElement()` lookups for 60 seconds by default without explicit waits',
        'D. Assertions can only be executed on static non-animating HTML pages'
      ],
      correctAnswer: 'A. By wrapping element lookups in explicit waits (`new WebDriverWait(driver, Duration.ofSeconds(10)).until(ExpectedConditions.visibilityOfElementLocated(by))`) before asserting state via TestNG/JUnit',
      explanation: 'Unlike Playwright or Cypress which auto-retry assertions out-of-the-box, Selenium requires explicitly synchronizing the browser DOM state using `ExpectedConditions` before evaluating assertions with test runners.',
      attachedDeepDive: {
        title: 'Complete Cheat Sheet: Selenium Explicit Wait & Assertion Table',
        content: [
          "#### 💡 Why Explicit Waits Are Mandatory in Selenium",
          "Single Page Applications (SPAs) render elements asynchronously. Using `ExpectedConditions` guarantees elements are visible and clickable before performing actions or assertions.",
          "",
          "#### 📊 Complete Selenium ExpectedConditions Reference Table",
          "| ExpectedCondition Method | Verification Condition / Target State | Example Java Code Syntax |",
          "| :--- | :--- | :--- |",
          "| `visibilityOfElementLocated(by)`| Asserts element is present in DOM and visibly rendered (width/height > 0). | `WebElement el = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id(\"header\")));` |",
          "| `invisibilityOfElementLocated(by)`| Asserts element is either detached from DOM or hidden via CSS (`display: none`). | `wait.until(ExpectedConditions.invisibilityOfElementLocated(By.className(\"spinner\")));` |",
          "| `elementToBeClickable(by)` | Asserts element is visible and enabled so it can receive mouse click events. | `WebElement btn = wait.until(ExpectedConditions.elementToBeClickable(By.id(\"submit\")));` |",
          "| `textToBePresentInElement(el, text)`| Asserts given text substring is present within element text content. | `wait.until(ExpectedConditions.textToBePresentInElementLocated(By.id(\"status\"), \"Approved\"));` |",
          "| `attributeToBe(by, attr, val)`| Asserts element attribute matches specific string value. | `wait.until(ExpectedConditions.attributeToBe(By.id(\"email\"), \"value\", \"sdet@allica.com\"));` |",
          "| `elementSelectionStateToBe(el, true)`| Asserts checkbox or radio option is checked/selected. | `wait.until(ExpectedConditions.elementSelectionStateToBe(agreeCheckbox, true));` |",
          "| `numberOfElementsToBe(by, count)`| Asserts DOM locator resolves to exact integer number of nodes. | `wait.until(ExpectedConditions.numberOfElementsToBe(By.cssSelector(\"tr.row\"), 10));` |",
          "| `urlContains(fraction)` | Asserts browser URL string contains expected substring. | `wait.until(ExpectedConditions.urlContains(\"/checkout/success\"));` |",
          "| `titleIs(exactTitle)` | Asserts document page title matches exact string. | `wait.until(ExpectedConditions.titleIs(\"Allica Bank Enterprise Portal\"));` |"
        ].join('\n'),
        codeTabs: {
          java: [
            "import org.openqa.selenium.*;",
            "import org.openqa.selenium.support.ui.*;",
            "import org.testng.Assert;",
            "import java.time.Duration;",
            "",
            "public class AssertionMasteryTest {",
            "    public void verifyAccountSummary(WebDriver driver) {",
            "        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));",
            "",
            "        // 1. Explicit wait for header visibility then assert text",
            "        WebElement header = wait.until(ExpectedConditions.visibilityOfElementLocated(By.tagName(\"h1\")));",
            "        Assert.assertEquals(header.getText(), \"Enterprise Dashboard\", \"Header mismatch\");",
            "",
            "        // 2. Assert button actionability before interaction",
            "        WebElement payBtn = wait.until(ExpectedConditions.elementToBeClickable(By.id(\"transfer-funds-btn\")));",
            "        Assert.assertTrue(payBtn.isEnabled(), \"Transfer button must be enabled\");",
            "",
            "        // 3. Assert dynamic list count",
            "        wait.until(ExpectedConditions.numberOfElementsToBe(By.cssSelector(\".account-card\"), 4));",
            "    }",
            "}"
          ].join('\n'),
          python: [
            "from selenium.webdriver.common.by import By",
            "from selenium.webdriver.support.ui import WebDriverWait",
            "from selenium.webdriver.support import expected_conditions as EC",
            "",
            "def test_explicit_assertions(driver):",
            "    wait = WebDriverWait(driver, 10)",
            "    ",
            "    # Wait for visibility and assert",
            "    header = wait.until(EC.visibility_of_element_located((By.TAG_NAME, 'h1')))",
            "    assert header.text == 'Enterprise Dashboard'",
            "    ",
            "    # Wait for actionability",
            "    pay_btn = wait.until(EC.element_to_be_clickable((By.ID, 'transfer-funds-btn')))",
            "    assert pay_btn.is_enabled()",
            "    ",
            "    # Assert row count",
            "    wait.until(EC.number_of_elements_to_be((By.CSS_SELECTOR, '.account-card'), 4))"
          ].join('\n')
        }
      }
    },
    {
      id: 'sel-actions-upload',
      questionNumber: 'SEL2',
      question: 'How do automation engineers execute file uploads (`<input type="file">`) and complex mouse/keyboard gestures using the Selenium `Actions` class?',
      options: [
        'A. File uploads are performed by passing absolute disk file paths directly via `element.sendKeys("C:/report.pdf")` without clicking the button; complex drag-and-hover workflows use `new Actions(driver).moveToElement(el).perform()`',
        'B. By calling Windows AutoIt scripting dialog executables on all OS platforms',
        'C. Selenium cannot attach files unless the physical OS mouse moves across the screen',
        'D. By dragging system file icons into the browser using robot APIs strictly'
      ],
      correctAnswer: 'A. File uploads are performed by passing absolute disk file paths directly via `element.sendKeys("C:/report.pdf")` without clicking the button; complex drag-and-hover workflows use `new Actions(driver).moveToElement(el).perform()`',
      explanation: 'When `<input type="file">` exists in the HTML DOM, sending the absolute file path via `.sendKeys()` attaches the file natively in milliseconds, avoiding operating system dialog traps.',
      attachedDeepDive: {
        title: 'Complete Cheat Sheet: User Actions & File Upload Table',
        content: [
          "#### 💡 Why sendKeys is Required for File Inputs",
          "Never click a file upload button with `.click()` in Selenium! Clicking triggers an OS file explorer window that WebDriver cannot control. Directly sending the file path to `<input type='file'>` bypasses the OS dialog completely.",
          "",
          "#### 📊 Complete User Actions & Gestures Reference Table",
          "| Action / Command | Description & Purpose | Example Java Syntax |",
          "| :--- | :--- | :--- |",
          "| `element.sendKeys(filePath)`| Attaches local file directly onto `<input type='file'>` element. | `driver.findElement(By.id(\"upload\")).sendKeys(Paths.get(\"doc.pdf\").toAbsolutePath().toString());` |",
          "| `element.clear()` | Clears existing text value from input boxes before typing. | `WebElement user = driver.findElement(By.id(\"user\")); user.clear(); user.sendKeys(\"admin\");` |",
          "| `new Select(element)` | Wraps HTML `<select>` dropdowns to select items by text/value/index. | `Select dropdown = new Select(el); dropdown.selectByVisibleText(\"Finance\");` |",
          "| `actions.moveToElement(el)` | Triggers mouse hover over target element to reveal tooltips/submenus. | `new Actions(driver).moveToElement(menuItem).perform();` |",
          "| `actions.dragAndDrop(src, dst)`| Simulates physical click-and-drag from source node to target dropzone. | `new Actions(driver).dragAndDrop(card, column).perform();` |",
          "| `actions.doubleClick(el)` | Executes double mouse click gesture on target DOM node. | `new Actions(driver).doubleClick(row).perform();` |",
          "| `actions.contextClick(el)` | Executes right-click context menu gesture on target element. | `new Actions(driver).contextClick(folderIcon).perform();` |",
          "| `actions.keyDown(Keys.SHIFT)`| Simulates holding modifier keyboard keys during interaction sequence.| `new Actions(driver).keyDown(Keys.CONTROL).sendKeys(\"a\").keyUp(Keys.CONTROL).perform();` |"
        ].join('\n'),
        codeTabs: {
          java: [
            "import org.openqa.selenium.*;",
            "import org.openqa.selenium.interactions.Actions;",
            "import org.openqa.selenium.support.ui.Select;",
            "import java.io.File;",
            "",
            "public class ActionsFileUploadTest {",
            "    public void executeFileUploadAndGestures(WebDriver driver) {",
            "        // 1. Absolute file upload on input type=file",
            "        File doc = new File(\"src/test/resources/kyc_passport.pdf\");",
            "        driver.findElement(By.id(\"document-upload\")).sendKeys(doc.getAbsolutePath());",
            "",
            "        // 2. Dropdown selection via Select class",
            "        Select category = new Select(driver.findElement(By.id(\"category-select\")));",
            "        category.selectByVisibleText(\"Corporate Identity\");",
            "",
            "        // 3. Complex hover and drag-and-drop using Actions",
            "        Actions actions = new Actions(driver);",
            "        WebElement avatar = driver.findElement(By.className(\"user-avatar\"));",
            "        actions.moveToElement(avatar).perform();",
            "",
            "        WebElement sourceItem = driver.findElement(By.id(\"item-101\"));",
            "        WebElement targetBucket = driver.findElement(By.id(\"approved-column\"));",
            "        actions.dragAndDrop(sourceItem, targetBucket).perform();",
            "    }",
            "}"
          ].join('\n'),
          python: [
            "from selenium.webdriver.common.by import By",
            "from selenium.webdriver.common.action_chains import ActionChains",
            "from selenium.webdriver.support.ui import Select",
            "import os",
            "",
            "def test_actions_and_upload(driver):",
            "    # 1. File upload",
            "    file_path = os.path.abspath('tests/resources/kyc_passport.pdf')",
            "    driver.find_element(By.ID, 'document-upload').send_keys(file_path)",
            "    ",
            "    # 2. Select dropdown",
            "    select = Select(driver.find_element(By.ID, 'category-select'))",
            "    select.select_by_visible_text('Corporate Identity')",
            "    ",
            "    # 3. ActionChains hover & drag",
            "    actions = ActionChains(driver)",
            "    actions.move_to_element(driver.find_element(By.CLASS_NAME, 'user-avatar')).perform()",
            "    ",
            "    src = driver.find_element(By.ID, 'item-101')",
            "    dst = driver.find_element(By.ID, 'approved-column')",
            "    actions.drag_and_drop(src, dst).perform()"
          ].join('\n')
        }
      }
    },
    {
      id: 'sel-network-cdp',
      questionNumber: 'SEL3',
      question: 'How does modern Selenium 4 intercept HTTP network requests, stub API backend responses, and simulate network throttling using Chrome DevTools Protocol (CDP)?',
      options: [
        'A. By casting WebDriver to `HasDevTools`, creating a DevTools session (`devTools.createSession()`), and enabling `Network.enable()` or utilizing `NetworkInterceptor` to stub headers and bodies',
        'B. Selenium WebDriver cannot interact with network payloads under any circumstances',
        'C. By installing external Wireshark desktop applications',
        'D. By editing system hosts files in Java background threads'
      ],
      correctAnswer: 'A. By casting WebDriver to `HasDevTools`, creating a DevTools session (`devTools.createSession()`), and enabling `Network.enable()` or utilizing `NetworkInterceptor` to stub headers and bodies',
      explanation: 'Selenium 4 integrated direct access to Chrome DevTools Protocol (CDP) and WebDriver BiDi, enabling QA engineers to intercept HTTP traffic, override API JSON responses, and simulate offline connectivity.',
      attachedDeepDive: {
        title: 'Complete Cheat Sheet: Selenium Network Interception Table',
        content: [
          "#### 💡 NetworkInterceptor vs CDP Raw Sessions",
          "`NetworkInterceptor` provides a clean Java abstraction for stubbing HTTP responses. Raw CDP sessions (`devTools.send(Network.emulateNetworkConditions(...))`) allow low-level bandwidth throttling and header injection.",
          "",
          "#### 📊 Complete Selenium Network & CDP Reference Table",
          "| API / Class | Description & Engineering Purpose | Example Java Code Syntax |",
          "| :--- | :--- | :--- |",
          "| `new NetworkInterceptor(driver, route)`| Stubs matching HTTP requests with custom status code, headers, and body payloads. | `try (NetworkInterceptor interceptor = new NetworkInterceptor(driver, Route.matching(req -> req.getUri().contains(\"/api/balance\")).to(() -> req -> new HttpResponse().setStatus(200).setContent(utf8String(\"{\\\"bal\\\": 900}\"))))) { ... }` |",
          "| `((HasDevTools) driver).getDevTools()`| Creates active WebSocket connection to Chrome DevTools Protocol backend engine. | `DevTools devTools = ((HasDevTools) driver).getDevTools(); devTools.createSession();` |",
          "| `devTools.send(Network.enable(...))`| Enables network monitoring events across the browser execution session. | `devTools.send(Network.enable(Optional.empty(), Optional.empty(), Optional.empty()));` |",
          "| `devTools.send(Network.emulateNetworkConditions)`| Throttles network bandwidth to simulate 3G/4G speeds or offline connectivity. | `devTools.send(Network.emulateNetworkConditions(false, 100, 50000, 20000, Optional.of(ConnectionType.CELLULAR3G)));` |",
          "| `devTools.addListener(Network.responseReceived)`| Passive event listener capturing HTTP status codes and response URLs. | `devTools.addListener(Network.responseReceived(), res -> { if(res.getResponse().getStatus() >= 400) System.err.println(\"Failed: \" + res.getResponse().getUrl()); });` |"
        ].join('\n'),
        codeTabs: {
          java: [
            "import org.openqa.selenium.*;",
            "import org.openqa.selenium.devtools.DevTools;",
            "import org.openqa.selenium.devtools.HasDevTools;",
            "import org.openqa.selenium.devtools.v122.network.Network;",
            "import org.openqa.selenium.remote.http.HttpResponse;",
            "import org.openqa.selenium.remote.http.Route;",
            "import static org.openqa.selenium.remote.http.Contents.utf8String;",
            "",
            "public class NetworkInterceptionMastery {",
            "    public void mockBankingApi(WebDriver driver) {",
            "        // Method 1: Clean API Stubbing using NetworkInterceptor",
            "        Route route = Route.matching(req -> req.getUri().contains(\"/api/v1/kyc/status\"))",
            "            .to(() -> req -> new HttpResponse()",
            "                .setStatus(200)",
            "                .addHeader(\"Content-Type\", \"application/json\")",
            "                .setContent(utf8String(\"{\\\"verified\\\": true, \\\"riskScore\\\": \\\"LOW\\\"}\")));",
            "",
            "        try (NetworkInterceptor interceptor = new NetworkInterceptor(driver, route)) {",
            "            driver.get(\"https://portal.allica.com/verify\");",
            "            // UI renders stubbed JSON payload immediately",
            "        }",
            "",
            "        // Method 2: Raw CDP Network Bandwidth Throttling",
            "        DevTools devTools = ((HasDevTools) driver).getDevTools();",
            "        devTools.createSession();",
            "        devTools.send(Network.enable(Optional.empty(), Optional.empty(), Optional.empty()));",
            "        devTools.addListener(Network.responseReceived(), response -> {",
            "            if (response.getResponse().getStatus() == 500) {",
            "                System.err.println(\"Backend 500 Error at: \" + response.getResponse().getUrl());",
            "            }",
            "        });",
            "    }",
            "}"
          ].join('\n')
        }
      }
    },
    {
      id: 'sel-enterprise-setup',
      questionNumber: 'SEL4',
      question: 'How do enterprise automation architects design a scalable, thread-safe Selenium Driver Factory utilizing Selenium Grid 4 and parallel execution engines (`testng.xml` / JUnit 5)?',
      options: [
        'A. By encapsulating `RemoteWebDriver` instances inside a `ThreadLocal<WebDriver>` singleton factory and executing tests concurrently via `<suite parallel="methods" thread-count="4">`',
        'B. By declaring a single global static `public static WebDriver driver;` variable shared across all test threads',
        'C. Selenium cannot run parallel tests on multiple CPU cores',
        'D. By opening multiple manual desktop windows'
      ],
      correctAnswer: 'A. By encapsulating `RemoteWebDriver` instances inside a `ThreadLocal<WebDriver>` singleton factory and executing tests concurrently via `<suite parallel="methods" thread-count="4">`',
      explanation: 'Using `ThreadLocal<WebDriver>` guarantees every concurrent test thread receives its own isolated browser session, preventing race conditions or session collisions across distributed Grid 4 nodes.',
      attachedDeepDive: {
        title: 'Complete Enterprise Setup: Driver Factory Table & Parallel Configuration',
        content: [
          "#### 💡 Why ThreadLocal is Essential for Parallel Execution",
          "If two parallel TestNG threads share a static `WebDriver driver`, thread A navigating to `/checkout` will overwrite thread B executing `/login`. `ThreadLocal` isolates browser state strictly per thread.",
          "",
          "#### 📊 Complete Enterprise Setup Reference Table",
          "| Setup Component | Pattern / Configuration | Enterprise Production Purpose |",
          "| :--- | :--- | :--- |",
          "| `ThreadLocal<WebDriver>`| Singleton Factory Pattern | Guarantees absolute thread safety during parallel TestNG or JUnit 5 execution. |",
          "| `RemoteWebDriver(url, opts)`| Selenium Grid 4 Connection | Connects test execution requests to remote Kubernetes / Docker auto-scaling browser nodes. |",
          "| `ChromeOptions` Arguments | `--headless=new`, `--disable-gpu`, `--no-sandbox`| Optimizes Chromium performance and memory consumption inside headless Linux CI/CD containers. |",
          "| `testng.xml` Parallelism| `<suite parallel='methods' thread-count='4'>` | Distributes independent test methods simultaneously across 4 concurrent worker threads. |",
          "| `takeScreenshot()` Hook | `((TakesScreenshot) driver).getScreenshotAs(OutputType.BYTES)`| Attached inside `@AfterMethod` listener to capture failure screenshots automatically for Allure. |"
        ].join('\n'),
        codeTabs: {
          java: [
            "// 1. ThreadSafe Driver Factory",
            "package com.allica.automation.factory;",
            "",
            "import org.openqa.selenium.WebDriver;",
            "import org.openqa.selenium.chrome.ChromeOptions;",
            "import org.openqa.selenium.remote.RemoteWebDriver;",
            "import java.net.URL;",
            "import java.time.Duration;",
            "",
            "public class DriverFactory {",
            "    private static final ThreadLocal<WebDriver> driverThreadLocal = new ThreadLocal<>();",
            "",
            "    public static synchronized void initDriver(String gridUrl) throws Exception {",
            "        ChromeOptions options = new ChromeOptions();",
            "        options.addArguments(\"--headless=new\", \"--disable-gpu\", \"--no-sandbox\", \"--window-size=1920,1080\");",
            "        options.setAcceptInsecureCerts(true);",
            "",
            "        WebDriver driver = new RemoteWebDriver(new URL(gridUrl), options);",
            "        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(0)); // Disable implicit waits in POM",
            "        driverThreadLocal.set(driver);",
            "    }",
            "",
            "    public static WebDriver getDriver() {",
            "        return driverThreadLocal.get();",
            "    }",
            "",
            "    public static void quitDriver() {",
            "        if (driverThreadLocal.get() != null) {",
            "            driverThreadLocal.get().quit();",
            "            driverThreadLocal.remove();",
            "        }",
            "    }",
            "}",
            "",
            "<!-- 2. testng.xml: Parallel Methods Matrix -->",
            "<!DOCTYPE suite SYSTEM \"https://testng.org/testng-1.0.dtd\">",
            "<suite name=\"EnterpriseRegressionSuite\" parallel=\"methods\" thread-count=\"4\" data-provider-thread-count=\"2\">",
            "    <listeners>",
            "        <listener class-name=\"com.allica.automation.listeners.AllureTestListener\"/>",
            "    </listeners>",
            "    <test name=\"BankingE2E\">",
            "        <classes>",
            "            <class name=\"com.allica.tests.KycVerificationTest\"/>",
            "            <class name=\"com.allica.tests.FundTransferTest\"/>",
            "        </classes>",
            "    </test>",
            "</suite>"
          ].join('\n')
        }
      }
    },
    {
      id: 'sel-setup-arch',
      questionNumber: 'SEL5',
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
      questionNumber: 'SEL6',
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
      questionNumber: 'SEL7',
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
      questionNumber: 'SEL8',
      question: 'What is the official native method introduced in Selenium 4 to interact with elements inside an open Shadow DOM?',
      options: [
        'A. `WebElement shadowRoot = hostElement.getShadowRoot(); WebElement target = shadowRoot.findElement(By.cssSelector(...));`',
        'B. `driver.switchTo().shadowDom()`',
        'C. Executing raw JavaScript `document.querySelector().shadowRoot` exclusively',
        'D. Shadow DOM cannot be accessed by Selenium under any circumstances'
      ],
      correctAnswer: 'A. `WebElement shadowRoot = hostElement.getShadowRoot(); WebElement target = shadowRoot.findElement(By.cssSelector(...));`',
      explanation: 'Selenium 4 added `getShadowRoot()` which returns a `SearchContext`. Note that XPath cannot cross Shadow DOM boundaries; you MUST use CSS selectors when searching inside a shadow root.'
    },
    {
      id: 'sel-waits-actions',
      questionNumber: 'SEL9',
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
      questionNumber: 'SEL10',
      question: 'How does Selenium 4 integrate with ExtentReports or Allure listeners to capture automatic failure screenshots?',
      options: [
        'A. Implementing TestNG `ITestListener` (`onTestFailure`), casting driver to `TakesScreenshot`, extracting byte[] PNG arrays, and attaching them directly to report nodes',
        'B. Taking photos of the computer monitor with physical webcams',
        'C. Screenshots cannot be generated in headless browser runs',
        'D. By emailing log files to CI administrators'
      ],
      correctAnswer: 'A. Implementing TestNG `ITestListener` (`onTestFailure`), casting driver to `TakesScreenshot`, extracting byte[] PNG arrays, and attaching them directly to report nodes',
      explanation: 'When a test method fails in TestNG or JUnit, listeners automatically grab `((TakesScreenshot) DriverFactory.getDriver()).getScreenshotAs(OutputType.BYTES)` and embed high-res evidence directly into HTML report artifacts.'
    },
    {
      id: 'sel-iframes-windows',
      questionNumber: 'SEL11',
      question: 'What is the robust architectural pattern for switching between multiple dynamic IFrames and returning to the main document?',
      options: [
        'A. Switch explicitly via `driver.switchTo().frame(webElement)` and return using `driver.switchTo().defaultContent()`',
        'B. Use `driver.navigate().refresh()` to clear frame context',
        'C. IFrames do not require switching in W3C compliant drivers',
        'D. Click the IFrame border using mouse coordinates'
      ],
      correctAnswer: 'A. Switch explicitly via `driver.switchTo().frame(webElement)` and return using `driver.switchTo().defaultContent()`',
      explanation: 'Always locate frame elements explicitly using `WebDriverWait` before calling `switchTo().frame()`. Once inner actions complete, calling `defaultContent()` resets focus back to the top-level window hierarchy.'
    },
    {
      id: 'sel-bidi-api',
      questionNumber: 'SEL12',
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
      questionNumber: 'SEL13',
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
      questionNumber: 'SEL14',
      question: 'How should an automation engineer configure SSL certificate bypass and automatic file download locations in Selenium 4 `ChromeOptions`?',
      options: [
        'A. Using `options.setAcceptInsecureCerts(true)` and passing a `prefs` HashMap containing `"download.default_directory"`',
        'B. Modifying Windows system registry entries before executing tests',
        'C. Clicking the browser "Advanced -> Proceed to site" warning dynamically via UI locators',
        'D. Disabling network firewalls globally on the host machine'
      ],
      correctAnswer: 'A. Using `options.setAcceptInsecureCerts(true)` and passing a `prefs` HashMap containing `"download.default_directory"`',
      explanation: 'UI clicking SSL warning screens is brittle across environments. Configuring browser profile preferences programmatically inside `ChromeOptions` or `FirefoxOptions` guarantees consistent automated setup.'
    }
  ],
  codingChallenge: {
    id: 'sel-challenge-factory-cdp',
    title: 'Assessment Challenge: ThreadSafe Selenium Factory with NetworkInterceptor & Explicit Waits',
    problemStatement: 'Design an enterprise Java TestNG suite utilizing a thread-safe `DriverFactory` connected to Selenium Grid 4. The suite must intercept and mock backend API traffic via `NetworkInterceptor`, execute a file upload using `.sendKeys()`, and assert UI outcomes using explicit `WebDriverWait` conditions.',
    examples: [
      {
        input: 'Grid URL: http://grid:4444/wd/hub | Stubbed API: **/api/v1/kyc',
        output: 'UI State: Status badge renders "VERIFIED_ELIGIBLE" in under 2 seconds',
        rationale: 'ThreadLocal isolates session capabilities; NetworkInterceptor fulfills API cleanly.'
      }
    ],
    requirements: [
      'Must instantiate ThreadLocal<WebDriver> DriverFactory connecting to RemoteWebDriver.',
      'Must use NetworkInterceptor or CDP to stub GET response to "**/api/v1/kyc" returning JSON 200.',
      'Must upload document using element.sendKeys(file.getAbsolutePath()).',
      'Must synchronize assertions strictly using ExpectedConditions.visibilityOfElementLocated().',
      'Provide production implementations in Java and Python.'
    ],
    explanation: 'This assessment proves complete mastery over distributed Selenium architecture, synchronization resiliency, and CDP network stubbing.',
    solutionCode: {
      java: [
        "import org.openqa.selenium.*;",
        "import org.openqa.selenium.remote.http.HttpResponse;",
        "import org.openqa.selenium.remote.http.Route;",
        "import org.openqa.selenium.support.ui.*;",
        "import org.testng.Assert;",
        "import org.testng.annotations.*;",
        "import java.io.File;",
        "import java.time.Duration;",
        "import static org.openqa.selenium.remote.http.Contents.utf8String;",
        "",
        "public class EnterpriseSeleniumKycTest {",
        "    private WebDriver driver;",
        "    private WebDriverWait wait;",
        "",
        "    @BeforeMethod",
        "    public void setup() throws Exception {",
        "        DriverFactory.initDriver(\"http://localhost:4444/wd/hub\");",
        "        driver = DriverFactory.getDriver();",
        "        wait = new WebDriverWait(driver, Duration.ofSeconds(10));",
        "    }",
        "",
        "    @Test",
        "    public void testKycUploadAndNetworkInterception() {",
        "        // 1. Intercept network service call",
        "        Route route = Route.matching(req -> req.getUri().contains(\"/api/v1/kyc\"))",
        "            .to(() -> req -> new HttpResponse().setStatus(200)",
        "                .addHeader(\"Content-Type\", \"application/json\")",
        "                .setContent(utf8String(\"{\\\"status\\\": \\\"VERIFIED_ELIGIBLE\\\"}\")));",
        "",
        "        try (NetworkInterceptor interceptor = new NetworkInterceptor(driver, route)) {",
        "            driver.get(\"https://portal.allica.com/onboarding\");",
        "",
        "            // 2. Perform File Upload directly via sendKeys",
        "            File doc = new File(\"src/test/resources/passport.pdf\");",
        "            WebElement uploadInput = wait.until(ExpectedConditions.presenceOfElementLocated(By.id(\"file-input\")));",
        "            uploadInput.sendKeys(doc.getAbsolutePath());",
        "",
        "            WebElement submitBtn = wait.until(ExpectedConditions.elementToBeClickable(By.id(\"submit-kyc\")));",
        "            submitBtn.click();",
        "",
        "            // 3. Explicit Wait Assertion on dynamic result badge",
        "            WebElement badge = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id(\"kyc-status\")));",
        "            Assert.assertEquals(badge.getText(), \"VERIFIED_ELIGIBLE\");",
        "        }",
        "    }",
        "",
        "    @AfterMethod",
        "    public void teardown() {",
        "        DriverFactory.quitDriver();",
        "    }",
        "}"
      ].join('\n'),
      python: [
        "import pytest",
        "import os",
        "from selenium import webdriver",
        "from selenium.webdriver.common.by import By",
        "from selenium.webdriver.support.ui import WebDriverWait",
        "from selenium.webdriver.support import expected_conditions as EC",
        "",
        "@pytest.fixture",
        "def grid_driver():",
        "    options = webdriver.ChromeOptions()",
        "    options.add_argument('--headless=new')",
        "    driver = webdriver.Remote(command_executor='http://localhost:4444/wd/hub', options=options)",
        "    yield driver",
        "    driver.quit()",
        "",
        "def test_kyc_workflow(grid_driver):",
        "    wait = WebDriverWait(grid_driver, 10)",
        "    grid_driver.get('https://portal.allica.com/onboarding')",
        "    ",
        "    # File upload via send_keys",
        "    file_path = os.path.abspath('tests/resources/passport.pdf')",
        "    upload_input = wait.until(EC.presence_of_element_located((By.ID, 'file-input')))",
        "    upload_input.send_keys(file_path)",
        "    ",
        "    submit_btn = wait.until(EC.element_to_be_clickable((By.ID, 'submit-kyc')))",
        "    submit_btn.click()",
        "    ",
        "    badge = wait.until(EC.visibility_of_element_located((By.ID, 'kyc-status')))",
        "    assert badge.text == 'VERIFIED_ELIGIBLE'"
      ].join('\n')
    }
  }
};
