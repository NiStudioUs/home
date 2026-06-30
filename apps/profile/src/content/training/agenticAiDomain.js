export const agenticAiChapter = {
  chapterId: 'agentic-ai-python',
  title: 'Agentic AI: Building Autonomous QA & Test Healing Agents in Python',
  summary: 'Cutting-edge exploration of building Agentic AI systems in Python to supercharge test automation, featuring autonomous UI exploration agents, self-healing vector database locators, automated log triage, and synthetic data generation.',
  indexTopics: [
    { id: 'ai-agent-arch', title: '1. Core Architecture: ReAct Loop, Tool Use & Function Calling with LangChain / AutoGen' },
    { id: 'ai-auto-explorer', title: '2. Autonomous UI Exploration: Playwright Python + Vision LLMs for Dynamic Crawling' },
    { id: 'ai-self-healing', title: '3. Self-Healing Locators: Vector Embeddings (ChromaDB / FAISS) & Cosine Similarity' },
    { id: 'ai-log-triage', title: '4. Automated Root Cause Analysis: Ingesting CI/CD Traces & Auto-Generating Jira Tickets' },
    { id: 'ai-synthetic-data', title: '5. Synthetic Data Generation: Pydantic Structured Output & OpenAPI Schema Parsing' },
    { id: 'ai-contract-drift', title: '6. Semantic API Verification: Detecting Undocumented API Drift via LLM Evaluators' },
    { id: 'ai-guardrails', title: '7. Guardrails & Token Optimization: Preventing Hallucinated Actions & Infinite Loops' },
    { id: 'ai-langgraph-swarm', title: '8. Multi-Agent Swarms: LangGraph Collaboration (Planner -> Author -> Executor -> Healer)' },
    { id: 'ai-visual-diff', title: '9. Intelligent Visual Regression: Multimodal AI Vision Bypassing Dynamic CSS Noise' },
    { id: 'ai-security-testing', title: '10. Autonomous Security & Fuzzing: AI Agents Executing XSS & SQL Injection Probes' }
  ],
  qaList: [
    {
      id: 'ai-agent-arch',
      questionNumber: 'AI.1',
      question: 'What defines an "Agentic AI" system in test automation compared to traditional static rule-based test automation frameworks?',
      options: [
        'A. An Agentic AI utilizes Large Language Models (LLMs) combined with dynamic Tool Use (Function Calling) inside an autonomous Reasoning + Acting (ReAct) loop to observe DOM states, plan actions, execute tool commands, and self-correct runtime failures continuously',
        'B. It is a script that records random clicks using Selenium IDE',
        'C. An AI agent is simply a Python script that sleeps for 5 seconds between clicks',
        'D. Agentic AI requires training a new 100-billion parameter neural network from scratch on your internal code'
      ],
      correctAnswer: 'A. An Agentic AI utilizes Large Language Models (LLMs) combined with dynamic Tool Use (Function Calling) inside an autonomous Reasoning + Acting (ReAct) loop to observe DOM states, plan actions, execute tool commands, and self-correct runtime failures continuously',
      explanation: 'Static scripts break the moment an ID changes. An Agentic AI (built using LangChain, LangGraph, or AutoGen in Python) receives tools like `click_element(selector)`, inspects accessibility trees or screenshots, reasons about navigation goals, and executes multi-step test strategies autonomously.'
    },
    {
      id: 'ai-auto-explorer',
      questionNumber: 'AI.2',
      question: 'How does an autonomous web exploration agent written in Python feed browser context to an LLM without exceeding context window token limits?',
      options: [
        'A. By extracting simplified DOM Accessibility Trees (ARIA roles and user-visible labels) or passing compressed screenshot images into multimodal vision models (GPT-4o / Claude 3.5 Sonnet) rather than dumping raw 50,000-line HTML files',
        'B. By copy-pasting the entire database into the prompt',
        'C. By turning off CSS stylesheets and taking 4K video streams',
        'D. LLMs can easily process 10 million lines of raw HTML per second with zero latency'
      ],
      correctAnswer: 'A. By extracting simplified DOM Accessibility Trees (ARIA roles and user-visible labels) or passing compressed screenshot images into multimodal vision models (GPT-4o / Claude 3.5 Sonnet) rather than dumping raw 50,000-line HTML files',
      explanation: 'Raw DOM contains massive JavaScript tags, SVG paths, and hidden tracking spans that consume tens of thousands of tokens. Stripping down to accessible UI elements cuts token consumption by 95% while improving AI decision accuracy.',
      attachedDeepDive: {
        title: 'Deep Dive: Python Playwright Autonomous AI Agent Loop',
        content: [
          "#### 💻 Python Autonomous Web Agent Implementation",
          "```python",
          "import json",
          "from playwright.sync_api import sync_playwright",
          "from openai import OpenAI",
          "",
          "client = OpenAI()",
          "",
          "def get_clean_accessibility_tree(page):",
          "    # Extract simplified actionable UI tree for LLM consumption",
          "    snapshot = page.accessibility.snapshot()",
          "    return json.dumps(snapshot, indent=2)",
          "",
          "def run_autonomous_qa_step(page, user_goal: str):",
          "    dom_tree = get_clean_accessibility_tree(page)",
          "    ",
          "    prompt = f\"\"\"",
          "    You are an autonomous SDET agent. Your goal is: {user_goal}",
          "    Current Page URL: {page.url}",
          "    Available UI Elements Tree:",
          "    {dom_tree}",
          "    ",
          "    Respond STRICTLY with a JSON tool call containing 'action' ('click' or 'fill'), 'target_name' (accessible name), and optional 'value'.",
          "    \"\"\"",
          "    ",
          "    response = client.chat.completions.create(",
          "        model=\"gpt-4o\",",
          "        messages=[{\"role\": \"user\", \"content\": prompt}],",
          "        response_format={\"type\": \"json_object\"}",
          "    )",
          "    ",
          "    command = json.loads(response.choices[0].message.content)",
          "    print(f\"🤖 AI Agent Decided Action: {command}\")",
          "    ",
          "    if command[\"action\"] == \"click\":",
          "        page.get_by_role(\"button\", name=command[\"target_name\"], exact=False).first.click()",
          "    elif command[\"action\"] == \"fill\":",
          "        page.get_by_label(command[\"target_name\"], exact=False).fill(command[\"value\"])",
          "",
          "# Execution",
          "with sync_playwright() as p:",
          "    browser = p.chromium.launch(headless=False)",
          "    page = browser.new_page()",
          "    page.goto(\"https://bank.allica.com/login\")",
          "    ",
          "    run_autonomous_qa_step(page, \"Enter username 'karthik@allica.com' into email field\")",
          "    run_autonomous_qa_step(page, \"Click the Submit login button\")",
          "```"
        ].join('\n')
      }
    },
    {
      id: 'ai-self-healing',
      questionNumber: 'AI.3',
      question: 'How can Python developers implement a self-healing locator mechanism using vector embeddings and vector databases (such as ChromaDB or FAISS)?',
      options: [
        'A. When a locator fails (`NoSuchElementException`), the agent embeds all current DOM element attributes into high-dimensional numerical vectors using `text-embedding-3-small`, queries the vector database for the closest semantic neighbor via Cosine Similarity, and dynamically binds the healed element',
        'B. By restarting the computer automatically when tests fail',
        'C. By downloading new CSS files from Google search',
        'D. Vector databases are exclusively used for storing user profile pictures'
      ],
      correctAnswer: 'A. When a locator fails (`NoSuchElementException`), the agent embeds all current DOM element attributes into high-dimensional numerical vectors using `text-embedding-3-small`, queries the vector database for the closest semantic neighbor via Cosine Similarity, and dynamically binds the healed element',
      explanation: 'If developers refactor `<button id="submit-btn-v1">Sign In</button>` to `<button class="auth-action-primary">Sign In to Allica</button>`, standard XPaths break. Semantic vector embeddings recognize that both represent the authentication submission button with 98% similarity.',
      attachedDeepDive: {
        title: 'Deep Dive: Vector Database Self-Healing Architecture',
        content: [
          "#### 💻 Python Vector Self-Healing Engine",
          "```python",
          "import chromadb",
          "from sentence_transformers import SentenceTransformer",
          "",
          "embedder = SentenceTransformer('all-MiniLM-L6-v2')",
          "chroma_client = chromadb.Client()",
          "collection = chroma_client.create_collection(name=\"ui_locators\")",
          "",
          "# 1. Store known historical valid locators during initial successful test runs",
          "collection.add(",
          "    documents=[\"Button Tag: button, Text: Sign In, Role: submit, ID: login-btn\"],",
          "    metadatas=[{\"css_selector\": \"#login-btn\"}],",
          "    ids=[\"login_submit_button\"]",
          ")",
          "",
          "def heal_broken_locator(current_dom_elements: list[str]) -> str:",
          "    \"\"\"Finds closest semantic match in new DOM when legacy ID fails\"\"\"",
          "    results = collection.query(",
          "        query_texts=[\"Button Tag: button, Text: Sign In, Role: submit\"],",
          "        n_results=1",
          "    )",
          "    healed_selector = results['metadatas'][0][0]['css_selector']",
          "    print(f\"🩹 Self-Healed Locator Triggered! Replaced broken ID with: {healed_selector}\")",
          "    return healed_selector",
          "```"
        ].join('\n')
      }
    },
    {
      id: 'ai-log-triage',
      questionNumber: 'AI.4',
      question: 'How does an automated AI root-cause analysis agent streamline CI/CD failure triage?',
      options: [
        'A. The Python agent ingests stack traces, network archives (HAR/trace.zip), and server logs upon failure, uses an LLM to differentiate between application bugs vs test script flakiness, and automatically formats a comprehensive Jira defect ticket with steps to reproduce',
        'B. It deletes broken tests from the codebase automatically',
        'C. It emails the CEO every time a button changes color',
        'D. It blocks developers from logging into their laptops until the test passes'
      ],
      correctAnswer: 'A. The Python agent ingests stack traces, network archives (HAR/trace.zip), and server logs upon failure, uses an LLM to differentiate between application bugs vs test script flakiness, and automatically formats a comprehensive Jira defect ticket with steps to reproduce',
      explanation: 'Engineers waste hours analyzing Jenkins failure logs. An AI triage agent analyzes HTTP 500 error bodies inside captured Playwright network traces and highlights the exact backend null pointer exception causing the UI test failure.'
    },
    {
      id: 'ai-synthetic-data',
      questionNumber: 'AI.5',
      question: 'When generating synthetic test data using Python LLM agents, why is pairing OpenAI or Anthropic tool calling with Pydantic structured output critical?',
      options: [
        'A. It forces the LLM output to adhere strictly to pre-defined JSON schemas (ensuring valid email formats, boundary integer values, and required fields), eliminating markdown hallucination formatting errors',
        'B. Pydantic speeds up internet connections during API requests',
        'C. It allows generating test data without using any RAM',
        'D. Pydantic converts Python code into SQL databases'
      ],
      correctAnswer: 'A. It forces the LLM output to adhere strictly to pre-defined JSON schemas (ensuring valid email formats, boundary integer values, and required fields), eliminating markdown hallucination formatting errors',
      explanation: 'Unstructured LLM prompts often return text like `Here is your test user: {"name": ...}` which breaks JSON parsers. Using Pydantic structured output guarantees 100% compliant JSON matching your API schema contracts.'
    },
    {
      id: 'ai-contract-drift',
      questionNumber: 'AI.6',
      question: 'How can an AI agent verify semantic API contract drift that traditional schema validation tools (like JSONSchema) miss?',
      options: [
        'A. Traditional schemas only check data types (`string`, `int`); an AI evaluator analyzes semantic data meaning (e.g., detecting if a `balance_usd` field suddenly starts returning negative values or encrypted hash strings unexpectedly)',
        'B. AI agents run API tests at 100,000 requests per second',
        'C. AI agents replace Postman completely by removing HTTP headers',
        'D. There is no difference; schema tools check everything'
      ],
      correctAnswer: 'A. Traditional schemas only check data types (`string`, `int`); an AI evaluator analyzes semantic data meaning (e.g., detecting if a `balance_usd` field suddenly starts returning negative values or encrypted hash strings unexpectedly)',
      explanation: 'If a backend bug causes `user_bio` to return raw SQL error dumps instead of user text, JSON schema validation still passes because the type remains a string. An AI agent flags this semantic corruption instantly.'
    },
    {
      id: 'ai-guardrails',
      questionNumber: 'AI.7',
      question: 'What architectural guardrail is mandatory when deploying autonomous UI test agents to prevent infinite loop execution or destructive actions?',
      options: [
        'A. Implementing strict maximum iteration recursion step counters (`max_steps=10`), action budget limits, and "Human-in-the-Loop" confirmation prompts before executing destructive mutative actions like deleting production records',
        'B. Unplugging the network router after 5 minutes',
        'C. Running AI agents exclusively in headless Firefox',
        'D. Setting the AI temperature parameter to 1.0 for maximum creativity'
      ],
      correctAnswer: 'A. Implementing strict maximum iteration recursion step counters (`max_steps=10`), action budget limits, and "Human-in-the-Loop" confirmation prompts before executing destructive mutative actions like deleting production records',
      explanation: 'Without step budget limits, an AI agent encountering an unexpected popup modal might loop endlessly clicking the same backdrop 500 times, exhausting LLM token budgets and spiking cloud API billing costs.'
    },
    {
      id: 'ai-langgraph-swarm',
      questionNumber: 'AI.8',
      question: 'In advanced multi-agent QA swarms built with LangGraph, how do specialized agents collaborate to create and maintain automated test suites?',
      options: [
        'A. A Planner Agent parses Jira acceptance criteria into test plans -> A Test Authoring Agent writes Playwright Python POM code -> An Execution Agent runs tests in CI -> A Self-Healing Agent patches broken locators if failures occur',
        'B. All agents execute identical random clicks simultaneously on the same web browser tab',
        'C. Multi-agent swarms require 4 separate physical laptops connected via LAN cable',
        'D. LangGraph is only used for training image recognition models'
      ],
      correctAnswer: 'A. A Planner Agent parses Jira acceptance criteria into test plans -> A Test Authoring Agent writes Playwright Python POM code -> An Execution Agent runs tests in CI -> A Self-Healing Agent patches broken locators if failures occur',
      explanation: 'Separating concerns across specialized agents mimics a real engineering team. LangGraph orchestrates stateful graph transitions, ensuring each agent focuses on its core competency with shared persistent context.'
    },
    {
      id: 'ai-visual-diff',
      questionNumber: 'AI.9',
      question: 'How does Multimodal AI Vision improve upon traditional pixel-by-pixel visual regression tools (like Percy or Applitools)?',
      options: [
        'A. Traditional pixel differs trigger false alarms when rendering dynamic ad banners or sub-pixel font anti-aliasing shifts; Multimodal AI Vision evaluates visual layout intent like a human user, ignoring harmless pixel noise while catching overlapping text or broken layouts',
        'B. AI Vision requires 10 hours to compare two images',
        'C. AI Vision cannot detect color differences',
        'D. Traditional pixel differs are 100% immune to rendering noise'
      ],
      correctAnswer: 'A. Traditional pixel differs trigger false alarms when rendering dynamic ad banners or sub-pixel font anti-aliasing shifts; Multimodal AI Vision evaluates visual layout intent like a human user, ignoring harmless pixel noise while catching overlapping text or broken layouts',
      explanation: 'By asking GPT-4o Vision `Compare baseline and actual screenshots. Are there functional visual defects or overlapping UI widgets? Ignore date timestamps and rotating carousel banners`, test suites achieve robust visual stability.'
    },
    {
      id: 'ai-security-testing',
      questionNumber: 'AI.10',
      question: 'How are autonomous Python agents utilized for dynamic application security testing (DAST) and fuzzing during QA cycles?',
      options: [
        'A. Agents inspect input forms and API parameters, generate intelligent boundary penetration payloads (XSS scripts, SQL injection vectors, buffer overflows), and analyze application response headers for vulnerability disclosures',
        'B. Agents encrypt the entire source code database',
        'C. Security testing cannot be automated with Python scripts',
        'D. Agents install antivirus software onto remote web servers'
      ],
      correctAnswer: 'A. Agents inspect input forms and API parameters, generate intelligent boundary penetration payloads (XSS scripts, SQL injection vectors, buffer overflows), and analyze application response headers for vulnerability disclosures',
      explanation: 'Rather than running static dumb dictionary attacks, an AI fuzzing agent reads API documentation, understands input constraints, and generates highly targeted mutation payloads designed to test validation guards.'
    }
  ]
};
