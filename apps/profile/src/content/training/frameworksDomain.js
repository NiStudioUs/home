export const frameworksChapter = {
  chapterId: 'frameworks-architecture',
  title: 'Frameworks: Design Patterns, AutoGen & Python Test Architecture',
  summary: 'Exhaustive engineering exploration of automation framework architectures including Page Object Model (POM), PageFactory, Screenplay pattern, code auto-generation (AutoGen), BDD, and Pytest / Python test design.',
  indexTopics: [
    { id: 'fw-pom-multi', title: '1. Page Object Model (POM): Java vs TypeScript vs Python (Pytest)' },
    { id: 'fw-pagefactory-screenplay', title: '2. Pattern Evolution: PageFactory (@FindBy) vs Screenplay Pattern Architecture' },
    { id: 'fw-autogen-codegen', title: '3. AutoGen & Code Generation: Playwright Codegen, Cypress Studio & AI Locators' },
    { id: 'fw-data-driven', title: '4. Data-Driven Architecture: Apache POI Excel, YAML & Python Pydantic Models' },
    { id: 'fw-bdd-gherkin', title: '5. Behavior-Driven Development (BDD): Cucumber Java vs Pytest-BDD in Python' },
    { id: 'fw-di-conftest', title: '6. Dependency Injection: Spring Boot TestContext vs Pytest conftest.py Fixtures' },
    { id: 'fw-parallel-xdist', title: '7. Parallel Execution Engine: TestNG Multi-Threading vs Pytest-xdist Multi-Process' },
    { id: 'fw-reporting-allure', title: '8. Enterprise Reporting Pipeline: Allure Framework Integration & Attachments' },
    { id: 'fw-config-management', title: '9. Configuration Management: Environment Profiles, Secrets & .env Parsing' },
    { id: 'fw-cicd-docker', title: '10. Containerized Automation: Running Pytest & Selenium inside Docker CI/CD Pipelines' }
  ],
  qaList: [
    {
      id: 'fw-pom-multi',
      questionNumber: 'F1.1',
      question: 'How does the implementation of the Page Object Model (POM) differ fundamentally when designing frameworks in Java versus Python (Pytest)?',
      options: [
        'A. Java enforces explicit class constructor injection and encapsulation of `private final By` locators; Python leverages `conftest.py` fixtures to inject instantiated page classes directly into test functions dynamically',
        'B. Python does not support classes or object-oriented programming for test suites',
        'C. Java requires putting all locators inside XML configuration files',
        'D. Pytest forces all page methods to be static asynchronous procedures'
      ],
      correctAnswer: 'A. Java enforces explicit class constructor injection and encapsulation of `private final By` locators; Python leverages `conftest.py` fixtures to inject instantiated page classes directly into test functions dynamically',
      explanation: 'While the architectural core of POM remains identical—separating structural UI selectors from behavioral test steps—Python’s Pytest framework simplifies dependency management by allowing test signatures to request page fixtures directly (`def test_login(login_page): login_page.login(...)`).',
      attachedDeepDive: {
        title: 'Deep Dive: Multi-Language POM Comparison',
        content: [
          "#### 💻 Python (Pytest + Playwright) POM Implementation",
          "```python",
          "# pages/login_page.py",
          "from playwright.sync_api import Page",
          "",
          "class LoginPage:",
          "    def __init__(self, page: Page):",
          "        self.page = page",
          "        self.username_input = page.get_by_label(\"Username\")",
          "        self.password_input = page.get_by_label(\"Password\")",
          "        self.submit_btn = page.get_by_role(\"button\", name=\"Sign In\")",
          "",
          "    def login(self, username: str, password: str) -> None:",
          "        self.username_input.fill(username)",
          "        self.password_input.fill(password)",
          "        self.submit_btn.click()",
          "",
          "# conftest.py",
          "import pytest",
          "from pages.login_page import LoginPage",
          "",
          "@pytest.fixture",
          "def login_page(page: Page) -> LoginPage:",
          "    return LoginPage(page)",
          "",
          "# tests/test_auth.py",
          "def test_valid_user_login(login_page: LoginPage):",
          "    login_page.page.goto(\"https://app.allica.com/login\")",
          "    login_page.login(\"admin\", \"secret\")",
          "    assert login_page.page.url == \"https://app.allica.com/dashboard\"",
          "```"
        ].join('\n')
      }
    },
    {
      id: 'fw-pagefactory-screenplay',
      questionNumber: 'F1.2',
      question: 'What architectural limitation of traditional Page Object Model (POM) led to the adoption of the Screenplay Pattern in ultra-large enterprise test suites?',
      options: [
        'A. POM classes frequently degrade into monolithic "God Objects" with hundreds of unrelated action methods; Screenplay models tests around Actors performing granular Tasks and Questions adhering strictly to SOLID single-responsibility principles',
        'B. Screenplay runs twice as fast by skipping browser initialization',
        'C. POM cannot handle iframe switching',
        'D. Screenplay replaces all test code with SQL statements'
      ],
      correctAnswer: 'A. POM classes frequently degrade into monolithic "God Objects" with hundreds of unrelated action methods; Screenplay models tests around Actors performing granular Tasks and Questions adhering strictly to SOLID single-responsibility principles',
      explanation: 'In massive applications, a `DashboardPage` class might grow to 2,000 lines of methods. The Screenplay pattern ( popularized by Serenity BDD) decouples state and actions: `Actor.named("Karthik").attemptsTo(Login.withCredentials("user", "pass"))`.'
    },
    {
      id: 'fw-autogen-codegen',
      questionNumber: 'F1.3',
      question: 'How do modern AutoGen code generation tools like `playwright codegen` impact enterprise framework maintainability compared to legacy record-and-playback tools?',
      options: [
        'A. Unlike legacy record tools that output hardcoded brittle absolute XPaths, modern Codegen inspects accessibility trees to generate resilient user-facing `getByRole` selectors and framework-ready page methods',
        'B. Codegen eliminates the need for software engineers entirely',
        'C. Codegen only outputs uncompiled Java bytecode',
        'D. Codegen requires manual pixel coordinate calibration before recording'
      ],
      correctAnswer: 'A. Unlike legacy record tools that output hardcoded brittle absolute XPaths, modern Codegen inspects accessibility trees to generate resilient user-facing `getByRole` selectors and framework-ready page methods',
      explanation: 'Running `npx playwright codegen https://app.allica.com` acts as an AI locator assistant. Instead of recording `/html/body/div[2]/input`, it evaluates ARIA roles and outputs clean selectors like `page.getByRole("textbox", { name: "Email" })` ready for copy-pasting into POM classes.'
    },
    {
      id: 'fw-data-driven',
      questionNumber: 'F1.4',
      question: 'When structuring Data-Driven frameworks in Python, why is integrating Pydantic models superior to passing raw dictionaries loaded from JSON or Excel files?',
      options: [
        'A. Pydantic enforces runtime data type validation, schema verification, and auto-completion, catching malformed test payloads before browser initialization begins',
        'B. Pydantic automatically converts Excel spreadsheets into MySQL tables',
        'C. Pydantic compresses JSON file sizes by 90%',
        'D. Raw dictionaries cannot be iterated over in Pytest loops'
      ],
      correctAnswer: 'A. Pydantic enforces runtime data type validation, schema verification, and auto-completion, catching malformed test payloads before browser initialization begins',
      explanation: 'Loading Excel or JSON data directly into test loops can cause tests to fail mid-run due to missing keys or type mismatches. Defining a `UserModel(BaseModel)` validates schema integrity instantaneously.'
    },
    {
      id: 'fw-bdd-gherkin',
      questionNumber: 'F1.5',
      question: 'What is the architectural difference between executing BDD Gherkin specifications using Cucumber (Java) versus `pytest-bdd` (Python)?',
      options: [
        'A. Cucumber uses reflection to match `@Given` / `@When` annotations globally across step classes; `pytest-bdd` links feature files directly to Pytest fixtures and step definitions within modular test scopes',
        'B. `pytest-bdd` requires converting Gherkin text into XML files',
        'C. Cucumber cannot be run in parallel threads',
        'D. `pytest-bdd` does not support scenario outlines or data tables'
      ],
      correctAnswer: 'A. Cucumber uses reflection to match `@Given` / `@When` annotations globally across step classes; `pytest-bdd` links feature files directly to Pytest fixtures and step definitions within modular test scopes',
      explanation: 'In `pytest-bdd`, step definitions (`@given("user is on login page")`) act as decorated Python functions that seamlessly share context via standard Pytest dependency injection fixtures.'
    },
    {
      id: 'fw-di-conftest',
      questionNumber: 'F1.6',
      question: 'How does Pytest’s `conftest.py` hierarchical scoping (`function`, `class`, `module`, `session`) optimize database seeding and WebDriver lifecycle management?',
      options: [
        'A. By scoping expensive setups like heavy database container initialization to `session` scope (running once per test run) while scoping browser context isolation to `function` scope (running once per test)',
        'B. By running all fixtures simultaneously on thread zero',
        'C. Scoping only applies to variable names, not execution timing',
        'D. `conftest.py` files cannot be nested inside subdirectories'
      ],
      correctAnswer: 'A. By scoping expensive setups like heavy database container initialization to `session` scope (running once per test run) while scoping browser context isolation to `function` scope (running once per test)',
      explanation: 'Pytest allows declaring `@pytest.fixture(scope="session")` inside root `conftest.py` to provision shared mock servers or auth tokens once, drastically reducing test execution bottlenecks across large test suites.'
    },
    {
      id: 'fw-parallel-xdist',
      questionNumber: 'F1.7',
      question: 'Why does Python test parallelization using `pytest-xdist` rely on multi-processing (spawning distinct OS processes) rather than multi-threading like Java TestNG?',
      options: [
        'A. Python’s Global Interpreter Lock (GIL) prevents CPU-bound threads from executing bytecode in parallel; spawning independent worker processes (`pytest -n auto`) achieves true multi-core concurrent execution',
        'B. Java TestNG cannot spawn operating system processes',
        'C. Multi-processing uses zero RAM compared to threading',
        'D. WebDriver only accepts connections from separate process IDs'
      ],
      correctAnswer: 'A. Python’s Global Interpreter Lock (GIL) prevents CPU-bound threads from executing bytecode in parallel; spawning independent worker processes (`pytest -n auto`) achieves true multi-core concurrent execution',
      explanation: 'When executing `pytest -n 8`, `pytest-xdist` spins up 8 isolated Python interpreter worker processes (`gw0` through `gw7`), ensuring clean memory boundaries and zero GIL interference during parallel browser automation.'
    },
    {
      id: 'fw-reporting-allure',
      questionNumber: 'F1.8',
      question: 'How do automation architects integrate automated failure screenshot and DOM snapshot attachments into enterprise Allure reports inside Pytest?',
      options: [
        'A. Using a custom Pytest hook (`pytest_runtest_makereport`) that intercepts test failure statuses and invokes `allure.attach(page.screenshot(), name="screenshot", attachment_type=allure.attachment_type.PNG)`',
        'B. Modifying browser binary source code to auto-save images to desktop',
        'C. Allure reports only support text console output, not images',
        'D. Executing a bash script after test completion to email screenshots'
      ],
      correctAnswer: 'A. Using a custom Pytest hook (`pytest_runtest_makereport`) that intercepts test failure statuses and invokes `allure.attach(page.screenshot(), name="screenshot", attachment_type=allure.attachment_type.PNG)`',
      explanation: 'By implementing the `pytest_runtest_makereport` hook in `conftest.py`, whenever an assertion fails during the `call` phase, the framework automatically extracts the active browser instance and attaches high-resolution PNGs and HTML page dumps directly into the Allure report dashboard.'
    },
    {
      id: 'fw-config-management',
      questionNumber: 'F1.9',
      question: 'What is the industry standard pattern for managing multi-environment test URLs, credentials, and API tokens securely in a Python automation framework?',
      options: [
        'A. Utilizing `pydantic-settings` or `python-dotenv` to load environment-specific `.env` files dynamically (`.env.staging`, `.env.prod`) while injecting secrets via CI/CD pipeline environment variables',
        'B. Hardcoding passwords in cleartext inside `BaseTest.java` constants',
        'C. Committing production AWS API keys into public GitHub repositories',
        'D. Storing configuration settings inside desktop text files'
      ],
      correctAnswer: 'A. Utilizing `pydantic-settings` or `python-dotenv` to load environment-specific `.env` files dynamically (`.env.staging`, `.env.prod`) while injecting secrets via CI/CD pipeline environment variables',
      explanation: 'Never hardcode secrets. Using `BaseSettings` from Pydantic allows defining typed configuration objects where environment variables (`STAGING_DB_PASSWORD`) override default parameter values automatically.'
    },
    {
      id: 'fw-cicd-docker',
      questionNumber: 'F1.10',
      question: 'When executing headless Playwright or Selenium Python test suites inside Linux Docker containers during CI/CD builds, what critical system configuration must be verified to prevent browser crashes?',
      options: [
        'A. Allocating sufficient shared memory \`--shm-size=2gb\` (or mounting \`/dev/shm\`) and installing necessary system shared library dependencies (fonts, libnss3, libatk)',
        'B. Running Docker containers with full root administrator privileges and disabling virtual memory',
        'C. Uninstalling Python package managers before running tests',
        'D. Setting browser window dimensions to 10x10 pixels'
      ],
      correctAnswer: 'A. Allocating sufficient shared memory \`--shm-size=2gb\` (or mounting \`/dev/shm\`) and installing necessary system shared library dependencies (fonts, libnss3, libatk)',
      explanation: 'Modern browsers utilize `/dev/shm` (shared memory) to render frames rapidly. Docker’s default 64MB shared memory allocation causes Chromium tabs to crash under heavy load with `Aw, Snap!` rendering errors unless explicitly boosted via `--shm-size=2gb`.'
    }
  ]
};
