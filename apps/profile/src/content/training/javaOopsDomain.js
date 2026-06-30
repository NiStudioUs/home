export const javaOopsChapter = {
  chapterId: 'concepts-java-oops',
  title: 'Concepts: Java OOPS & Advanced Architecture (Reflection, Generics & Streams)',
  summary: 'Exhaustive exploration of Object-Oriented Programming and advanced Java engineering concepts tailored for SDETs, covering the 4 OOP pillars, Reflection, Custom Annotations, Generics, Lambdas/Streams, Enums, and JVM memory management.',
  indexTopics: [
    { id: 'oops-4pillars', title: '1. The 4 Pillars of OOPS in Test Automation Architecture' },
    { id: 'oops-encapsulation', title: '2. Encapsulation: Securing Page Object Locators & Test Data' },
    { id: 'oops-inheritance', title: '3. Inheritance: Designing Reusable BaseTest & BasePage Classes' },
    { id: 'oops-polymorphism', title: '4. Polymorphism: Method Overloading vs Overriding in Driver Factories' },
    { id: 'oops-abstraction', title: '5. Abstraction: Interfaces vs Abstract Classes in WebDriver Abstraction' },
    { id: 'oops-jvm-memory', title: '6. JVM Memory Management: Heap vs Stack & Garbage Collection in QE' },
    { id: 'oops-reflection', title: '7. Java Reflection & Custom Annotations: Runtime Test Listeners & @RetryCount' },
    { id: 'oops-generics', title: '8. Generics & Bounded Types: Fluent Method Chaining BasePage<T extends BasePage<T>>' },
    { id: 'oops-streams', title: '9. Functional Java: Lambdas, Streams & Predicates for Web Element Filtering' },
    { id: 'oops-enums', title: '10. Enums & State Machines: Thread-Safe Singleton Driver Initialization' },
    { id: 'oops-exceptions', title: '11. Exception Handling: Custom Framework Exceptions & StaleElement Retry Handlers' },
    { id: 'oops-gc-leaks', title: '12. Garbage Collection: Preventing Static Memory Leaks & ThreadLocal Cleanup' }
  ],
  qaList: [
    {
      id: 'oops-4pillars',
      questionNumber: 'C1.1',
      question: 'How do the 4 pillars of Object-Oriented Programming map directly to an enterprise automation framework design?',
      options: [
        'A. Encapsulation (Locators), Inheritance (BaseTest), Polymorphism (Cross-browser Drivers), Abstraction (Interfaces)',
        'B. They only apply to backend Spring Boot microservices, not test suites',
        'C. Encapsulation is avoided to make all locators public static strings',
        'D. Abstraction means avoiding the use of Page Objects entirely'
      ],
      correctAnswer: 'A. Encapsulation (Locators), Inheritance (BaseTest), Polymorphism (Cross-browser Drivers), Abstraction (Interfaces)',
      explanation: 'Every enterprise SDET framework relies heavily on OOP: Encapsulation hides raw locators inside POM classes; Inheritance shares setup/teardown logic in `BaseTest`; Polymorphism allows seamless switching between ChromeDriver/FirefoxDriver; and Abstraction enforces standard API contracts across different page workflows.'
    },
    {
      id: 'oops-encapsulation',
      questionNumber: 'C1.2',
      question: 'Why is Encapsulation critical when designing Page Object Model (POM) classes in Java?',
      options: [
        'A. To prevent test scripts from manipulating raw web locators directly and enforcing interaction via clean public methods',
        'B. To increase compiled jar size by adding extra getter methods',
        'C. To allow thread-unsafe concurrent modifications of web elements',
        'D. Because private locators run faster in the browser engine'
      ],
      correctAnswer: 'A. To prevent test scripts from manipulating raw web locators directly and enforcing interaction via clean public methods',
      explanation: 'Declaring web locators (`By` objects or `@FindBy` annotations) as `private` ensures that structural UI changes only require updates inside the Page class itself, keeping test step definitions completely decoupled from DOM implementation details.',
      attachedDeepDive: {
        title: 'Deep Dive: Encapsulated Page Object Model Example',
        content: [
          "#### 💻 Production Java POM Code",
          "```java",
          "public class LoginPage {",
          "    private final WebDriver driver;",
          "    ",
          "    // Private locators encapsulated away from test assertions",
          "    private final By usernameInput = By.id(\"user-name\");",
          "    private final By passwordInput = By.id(\"password\");",
          "    private final By loginButton = By.cssSelector(\"input[type='submit']\");",
          "    private final By errorMessage = By.xpath(\"//h3[@data-test='error']\");",
          "",
          "    public LoginPage(WebDriver driver) {",
          "        this.driver = driver;",
          "    }",
          "",
          "    // Public behavioral action method exposing strictly clean functionality",
          "    public DashboardPage loginAs(String username, String password) {",
          "        driver.findElement(usernameInput).sendKeys(username);",
          "        driver.findElement(passwordInput).sendKeys(password);",
          "        driver.findElement(loginButton).click();",
          "        return new DashboardPage(driver);",
          "    }",
          "",
          "    public String getErrorText() {",
          "        return driver.findElement(errorMessage).getText();",
          "    }",
          "}",
          "```"
        ].join('\n')
      }
    },
    {
      id: 'oops-inheritance',
      questionNumber: 'C1.3',
      question: 'What is the architectural purpose of creating a `BaseTest` parent class using Java Inheritance?',
      options: [
        'A. To eliminate redundant driver initialization, configuration loading, and teardown logic across hundreds of test classes',
        'B. To force all tests to execute sequentially on a single thread',
        'C. To prevent test classes from inheriting helper methods',
        'D. To bypass TestNG/JUnit annotation listeners'
      ],
      correctAnswer: 'A. To eliminate redundant driver initialization, configuration loading, and teardown logic across hundreds of test classes',
      explanation: 'By having test suites extend `BaseTest`, lifecycle annotations (`@BeforeMethod`, `@AfterMethod`) automatically handle WebDriver lifecycle, screenshot capture on failure, and logger setup without duplicating boilerplate code.',
      attachedDeepDive: {
        title: 'Deep Dive: Reusable BaseTest Architecture',
        content: [
          "#### 💻 BaseTest Inheritance Structure",
          "```java",
          "public abstract class BaseTest {",
          "    // ThreadLocal ensures parallel execution safety across concurrent threads",
          "    protected static ThreadLocal<WebDriver> driver = new ThreadLocal<>();",
          "",
          "    @BeforeMethod",
          "    @Parameters({\"browser\"})",
          "    public void setup(@Optional(\"chrome\") String browser) {",
          "        WebDriver localDriver = DriverFactory.createInstance(browser);",
          "        localDriver.manage().window().maximize();",
          "        localDriver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));",
          "        driver.set(localDriver);",
          "    }",
          "",
          "    public WebDriver getDriver() {",
          "        return driver.get();",
          "    }",
          "",
          "    @AfterMethod",
          "    public void teardown(ITestResult result) {",
          "        if (result.getStatus() == ITestResult.FAILURE) {",
          "            ScreenshotUtil.capture(getDriver(), result.getName());",
          "        }",
          "        if (getDriver() != null) {",
          "            getDriver().quit();",
          "            driver.remove(); // Prevent memory leaks in ThreadLocal",
          "        }",
          "    }",
          "}",
          "```"
        ].join('\n')
      }
    },
    {
      id: 'oops-polymorphism',
      questionNumber: 'C1.4',
      question: 'What is the exact distinction between Runtime Polymorphism (Overriding) and Compile-Time Polymorphism (Overloading) in a Driver Factory?',
      options: [
        'A. Overloading involves identical method names with different parameter signatures; Overriding involves child classes redefining abstract parent methods',
        'B. Overriding happens at compile time; Overloading happens during JVM execution',
        'C. Overloading is used for interfaces; Overriding is used for constructors',
        'D. There is no distinction; both terms refer to static variable casting'
      ],
      correctAnswer: 'A. Overloading involves identical method names with different parameter signatures; Overriding involves child classes redefining abstract parent methods',
      explanation: 'In our frameworks, Overloading allows `getDriver("chrome")` vs `getDriver("chrome", true)` (headless). Overriding occurs when `ChromeDriver` and `FirefoxDriver` override the abstract `get()` and `findElement()` methods of the `WebDriver` interface.'
    },
    {
      id: 'oops-abstraction',
      questionNumber: 'C1.5',
      question: 'When should an SDET architect use a Java Interface versus an Abstract Class when building automation utilities?',
      options: [
        'A. Use Interfaces to define a pure API contract across disparate implementations (e.g., IReportListener); use Abstract Classes to share state and common implementations (e.g., BasePage)',
        'B. Use Interfaces only when connecting to databases; Abstract classes for UI',
        'C. Interfaces cannot have default methods in Java 8+, so Abstract classes are always preferred',
        'D. Abstract classes cannot have constructors, making Interfaces safer'
      ],
      correctAnswer: 'A. Use Interfaces to define a pure API contract across disparate implementations (e.g., IReportListener); use Abstract Classes to share state and common implementations (e.g., BasePage)',
      explanation: 'Abstract classes allow constructors, instance variables, and standard shared methods alongside abstract definitions. Interfaces define stateless contracts that any class can implement regardless of hierarchy position.'
    },
    {
      id: 'oops-jvm-memory',
      questionNumber: 'C1.6',
      question: 'How does the JVM allocate memory between Heap and Stack during a long-running Playwright or Selenium regression run?',
      options: [
        'A. Objects (Page instances, Data models) live on the Heap and are garbage collected; primitive variables and method call frames live on thread-local Stacks',
        'B. Everything is stored on the Stack for performance',
        'C. WebDriver objects are stored in persistent disk cache directly',
        'D. Garbage Collection only clears static final variables'
      ],
      correctAnswer: 'A. Objects (Page instances, Data models) live on the Heap and are garbage collected; primitive variables and method call frames live on thread-local Stacks',
      explanation: 'Understanding JVM allocation prevents `OutOfMemoryError` during massive parallel runs. Ensuring `ThreadLocal<WebDriver>` instances are explicitly removed (`driver.remove()`) allows Garbage Collection to reclaim orphaned session memory.'
    },
    {
      id: 'oops-reflection',
      questionNumber: 'C1.7',
      question: 'How do Principal SDETs leverage Java Reflection and Custom Annotations to build dynamic runtime retry analyzers (`@RetryCount(3)`) inside TestNG or JUnit?',
      options: [
        'A. By defining `@Retention(RetentionPolicy.RUNTIME)` annotations and inspecting test method metadata at runtime (`method.getAnnotation(RetryCount.class)`) inside custom listener intercepts (`IAnnotationTransformer`)',
        'B. By hardcoding retry loops inside every single test method',
        'C. Reflection cannot be used inside test frameworks',
        'D. Annotations are only checked during compilation by javac'
      ],
      correctAnswer: 'A. By defining `@Retention(RetentionPolicy.RUNTIME)` annotations and inspecting test method metadata at runtime (`method.getAnnotation(RetryCount.class)`) inside custom listener intercepts (`IAnnotationTransformer`)',
      explanation: 'Java Reflection inspects class/method bytecode during execution. When TestNG starts a test, an `IAnnotationTransformer` uses reflection to check if `@RetryCount` is attached, dynamically assigning retry retry logic without modifying test code.',
      attachedDeepDive: {
        title: 'Deep Dive: Custom Runtime Annotation & Reflection Listener',
        content: [
          "```java",
          "@Retention(RetentionPolicy.RUNTIME)",
          "@Target(ElementType.METHOD)",
          "public @interface RetryCount {",
          "    int value() default 1;",
          "}",
          "",
          "// Runtime Annotation Transformer using Java Reflection",
          "public class AnnotationTransformer implements IAnnotationTransformer {",
          "    @Override",
          "    public void transform(ITestAnnotation annotation, Class testClass, Constructor testConstructor, Method testMethod) {",
          "        if (testMethod != null && testMethod.isAnnotationPresent(RetryCount.class)) {",
          "            RetryCount retry = testMethod.getAnnotation(RetryCount.class);",
          "            System.out.println(\"🔍 Reflected custom retry count: \" + retry.value() + \" for method \" + testMethod.getName());",
          "            annotation.setRetryAnalyzer(RetryAnalyzer.class);",
          "        }",
          "    }",
          "}",
          "```"
        ].join('\n')
      }
    },
    {
      id: 'oops-generics',
      questionNumber: 'C1.8',
      question: 'Why do advanced automation architects use Bounded Generic Type Parameters (`public abstract class BasePage<T extends BasePage<T>>`) when implementing fluent Page Object chaining?',
      options: [
        'A. Using Curiously Recurring Template Pattern (CRTP) with generics ensures that helper methods inherited from `BasePage` (like `waitForPageLoad()`) return exact child class types (`T`), allowing seamless method chaining (`new LoginPage(driver).waitForPageLoad().loginAs(...)`) without casting errors',
        'B. Generics make Java bytecode run 5x faster',
        'C. Generics prevent creating new object instances',
        'D. It allows storing WebDriver and String objects inside the same ArrayList'
      ],
      correctAnswer: 'A. Using Curiously Recurring Template Pattern (CRTP) with generics ensures that helper methods inherited from `BasePage` (like `waitForPageLoad()`) return exact child class types (`T`), allowing seamless method chaining (`new LoginPage(driver).waitForPageLoad().loginAs(...)`) without casting errors',
      explanation: 'If `BasePage.waitForPageLoad()` simply returned `BasePage`, calling `.loginAs()` right after would cause a compile error because `BasePage` does not have `loginAs()`. Bounded generics guarantee compile-time type safety for fluent chains.'
    },
    {
      id: 'oops-streams',
      questionNumber: 'C1.9',
      question: 'How do Java 8+ Functional Interfaces (`Predicate<T>`, `Consumer<T>`) and Streams optimize filtering and extracting data from dynamic lists of WebElements?',
      options: [
        'A. Streams replace imperative nested loops with declarative functional pipelines (`driver.findElements(by).stream().filter(e -> e.isDisplayed()).map(WebElement::getText).collect(Collectors.toList())`)',
        'B. Streams convert UI tables directly into SQL queries',
        'C. Functional interfaces bypass WebDriver waits',
        'D. Streams run on background GPU threads'
      ],
      correctAnswer: 'A. Streams replace imperative nested loops with declarative functional pipelines (`driver.findElements(by).stream().filter(e -> e.isDisplayed()).map(WebElement::getText).collect(Collectors.toList())`)',
      explanation: 'Instead of writing 15 lines of `for` loops with `if` checks to gather visible table cell text, functional streams evaluate collection transformations lazily and concisely.'
    },
    {
      id: 'oops-enums',
      questionNumber: 'C1.10',
      question: 'Why is Java `enum` considered the cleanest and most thread-safe implementation pattern for managing browser capability profiles (`DriverType.CHROME`, `DriverType.FIREFOX`)?',
      options: [
        'A. Enums in Java are inherently Singleton by JVM specification, thread-safe during class loading, and can encapsulate abstract factory initialization methods directly within each enum constant',
        'B. Enums consume 0 bytes of heap storage',
        'C. Enums cannot be passed into constructors',
        'D. Enums automatically download driver executables'
      ],
      correctAnswer: 'A. Enums in Java are inherently Singleton by JVM specification, thread-safe during class loading, and can encapsulate abstract factory initialization methods directly within each enum constant',
      explanation: 'Rather than using fragile `if (browser.equals("chrome"))` string matching, enums attach behavior directly: `CHROME { public WebDriver getDriver() { return new ChromeDriver(); } }`.'
    },
    {
      id: 'oops-exceptions',
      questionNumber: 'C1.11',
      question: 'How should an SDET architect design custom checked vs unchecked exceptions when encapsulating framework failure states?',
      options: [
        'A. Unrecoverable infrastructure errors (like missing config files) should throw unchecked `RuntimeException` subclasses (`FrameworkConfigException`), while recoverable synchronization errors should trigger self-healing retry loops',
        'B. All exceptions should be caught silently and ignored with empty catch blocks',
        'C. Checked exceptions must be thrown from every single test assertion',
        'D. Exception handling slows down automation runs by 50%'
      ],
      correctAnswer: 'A. Unrecoverable infrastructure errors (like missing config files) should throw unchecked `RuntimeException` subclasses (`FrameworkConfigException`), while recoverable synchronization errors should trigger self-healing retry loops',
      explanation: 'Swallowing exceptions obscures root causes. Clean framework architecture wraps low-level driver exceptions into descriptive custom exceptions (`ElementNotInteractableException` -> `UIActionFailedException("Failed clicking submit button", cause)`).'
    },
    {
      id: 'oops-gc-leaks',
      questionNumber: 'C1.12',
      question: 'What causes severe JVM Memory Leaks in multi-threaded TestNG suites, and how does `driver.remove()` solve `ThreadLocal` retention?',
      options: [
        'A. `ThreadLocal` variables store values inside thread map tables keyed by thread instances; in thread pools where threads are reused, omitting `driver.remove()` retains orphaned WebDriver sessions in memory forever, eventually causing `OutOfMemoryError: Java heap space`',
        'B. Memory leaks only occur when using double quotes instead of single quotes',
        'C. Garbage Collection runs every 1 millisecond and prevents all leaks automatically',
        'D. Calling `driver.quit()` automatically deletes all variables from JVM heap'
      ],
      correctAnswer: 'A. `ThreadLocal` variables store values inside thread map tables keyed by thread instances; in thread pools where threads are reused, omitting `driver.remove()` retains orphaned WebDriver sessions in memory forever, eventually causing `OutOfMemoryError: Java heap space`',
      explanation: '`driver.quit()` closes the browser application, but the Java `WebDriver` object reference still exists inside the `ThreadLocalMap`. Calling `driver.remove()` breaks the strong reference, allowing the GC to free the heap.'
    }
  ]
};
