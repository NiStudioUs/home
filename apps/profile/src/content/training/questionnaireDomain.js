export const questionnaireChapter = {
  chapterId: 'questionnaire',
  title: 'Questionnaire (Core Technical Assessments & Interview Q&A)',
  summary: 'Exhaustive collection of core SDET technical interview Q&As covering Java collections, API HTTP protocols, SQL optimization, Git version control, microservice contract testing, and concurrency.',
  indexTopics: [
    { id: 'q1-hashmap', title: 'Q1. HashMap Lookup Complexity & Collision Handling' },
    { id: 'q2-http-created', title: 'Q2. HTTP 201 Created Status & REST API Protocols' },
    { id: 'q3-sql-salary', title: 'Q3. SQL Second-Highest Salary Subquery' },
    { id: 'q4-hashset', title: 'Q4. Java Collections Without Duplicates' },
    { id: 'q5-git-stash', title: 'Q5. Git Stash Uncommitted Changes' },
    { id: 'q6-java-final', title: 'Q6. Java Final Keyword & Immutability' },
    { id: 'q7-parentheses', title: 'Q7. Stack for Balanced Parentheses Validation' },
    { id: 'q8-hashmap-dup', title: 'Q8. HashMap Duplicate Keys Behavior' },
    { id: 'q9-idempotent', title: 'Q9. HTTP Idempotent Methods Table' },
    { id: 'q10-git-soft', title: 'Q10. Git Reset Soft vs Hard Architecture' },
    { id: 'q11-lru-cache', title: 'Q11. LRU Cache System Design Deep Dive' },
    { id: 'q12-sliding-window', title: 'Q12. Sliding Window vs Brute Force Efficiency' },
    { id: 'q13-db-indexes', title: 'Q13. Database B-Tree vs Hash Index Performance' },
    { id: 'q14-contract-testing', title: 'Q14. Consumer-Driven Contract Testing (Pact)' },
    { id: 'q15-cicd-gates', title: 'Q15. CI/CD Pipeline Quality Gates & Test Tiering' },
    { id: 'q16-api-protocols', title: 'Q16. REST vs gRPC vs GraphQL Automation Strategy' },
    { id: 'q17-sql-joins', title: 'Q17. SQL JOINs Execution & Null Handling' },
    { id: 'q18-git-rebase', title: 'Q18. Git Merge vs Rebase vs Cherry-Pick' },
    { id: 'q19-concurrency', title: 'Q19. Thread Safety & Volatile in Java Frameworks' },
    { id: 'q20-bigo-table', title: 'Q20. Big-O Asymptotic Notation Master Table' }
  ],
  qaList: [
    {
      id: 'q1-hashmap',
      questionNumber: 'Q1',
      question: 'What is the average time complexity of searching for a key in a `HashMap`?',
      options: ['A. O(n)', 'B. O(log n)', 'C. O(1)', 'D. O(n²)'],
      correctAnswer: 'C. O(1)',
      explanation: 'HashMap lookups operate in **O(1)** average time complexity because the key hash code directly maps to the internal bucket array index.\n\n**Interviewer Follow-up:**\n> What is the worst-case time complexity?\n**Answer:** **O(n)** if all keys collide into the same bucket (or **O(log n)** in modern Java 8+ when heavily collided bucket chains transform into Red-Black balanced trees).',
      attachedDeepDive: {
        title: 'Deep Dive: Internal Mechanics of HashMap & Collision Management',
        content: [
          "When a key-value pair is inserted into a `HashMap`, the JVM calculates the hash code of the key object using `key.hashCode()`. This hash is then spread across higher bits using bitwise XOR (`h ^ (h >>> 16)`) to prevent clustering before applying bitwise masking `(n - 1) & hash` to determine the exact bucket index.",
          "",
          "#### Java 8+ Treeification Thresholds",
          "In legacy Java 7, collisions were handled exclusively via singly linked lists. If 10,000 items collided into Bucket 4, searching required traversing all 10,000 pointers ($O(n)$). In Java 8+:",
          "* **TREEIFY_THRESHOLD (8)**: When a bucket's linked list reaches 8 nodes (and overall table capacity is at least 64), the linked list dynamically converts into a **Red-Black Tree**, reducing worst-case lookups to logarithmic $O(\\log n)$ time.",
          "* **UNTREEIFY_THRESHOLD (6)**: If removals shrink the tree back down to 6 nodes, it transforms back into a lightweight linked list to conserve memory allocation overhead."
        ].join('\n')
      }
    },
    {
      id: 'q2-http-created',
      questionNumber: 'Q2',
      question: 'Which HTTP status code indicates that a resource was successfully created?',
      options: ['A. 200 OK', 'B. 201 Created', 'C. 204 No Content', 'D. 302 Found'],
      correctAnswer: 'B. 201 Created',
      explanation: '**201 Created** is the standard HTTP status code returned by REST APIs (typically upon successful `POST` requests) indicating that a new database record or resource has been provisioned.',
      attachedDeepDive: {
        title: 'Deep Dive: REST Protocol Status Code Hierarchy for Automation Engineers',
        content: [
          "Automation frameworks must validate precise HTTP semantics rather than treating all `2xx` responses identically.",
          "",
          "#### Standard REST Status Code Contracts",
          "| Status Code | Semantic Meaning | Automation Assertion Expectation |",
          "| :--- | :--- | :--- |",
          "| **200 OK** | Standard successful retrieval or mutation. | Must return payload body containing requested data or confirmation. |",
          "| **201 Created** | Successful provisioning of a new entity. | Must include a `Location` header pointing to the new resource URI alongside the created object ID. |",
          "| **204 No Content** | Successful deletion or background processing. | Must return an empty response body with length 0. |",
          "| **400 Bad Request** | Schema validation failure or malformed JSON. | Must assert explicit error code and validation field messages. |",
          "| **409 Conflict** | Duplicate record creation attempt. | Verifies idempotency guards when inserting existing primary keys. |"
        ].join('\n')
      }
    },
    {
      id: 'q3-sql-salary',
      questionNumber: 'Q3',
      question: 'Which SQL query correctly returns the second-highest salary from an `Employee(id, name, salary)` table?',
      options: [
        'A. SELECT MAX(salary) FROM Employee;',
        'B. SELECT MAX(salary) FROM Employee WHERE salary < (SELECT MAX(salary) FROM Employee);',
        'C. SELECT MIN(salary) FROM Employee;',
        'D. SELECT salary FROM Employee LIMIT 2;'
      ],
      correctAnswer: 'B. SELECT MAX(salary) FROM Employee WHERE salary < (SELECT MAX(salary) FROM Employee);',
      explanation: 'Suppose salaries are `90,000`, `70,000`, and `50,000`.\n* The inner subquery `(SELECT MAX(salary) FROM Employee)` finds the highest salary (`90,000`).\n* The outer query filters for salaries less than `90,000` (`70,000`, `50,000`) and takes the `MAX()` of that filtered set, accurately returning `70,000`.\n\n*(Note: In databases like PostgreSQL/MySQL, `SELECT DISTINCT salary FROM Employee ORDER BY salary DESC LIMIT 1 OFFSET 1` is another clean alternative.)*'
    },
    {
      id: 'q4-hashset',
      questionNumber: 'Q4',
      question: 'Which Java collection ensures that elements are unique and does not allow duplicate entries?',
      options: ['A. ArrayList', 'B. LinkedList', 'C. HashSet', 'D. PriorityQueue'],
      correctAnswer: 'C. HashSet',
      explanation: '**HashSet** implements the `Set` interface, which strictly prohibits duplicate elements. Internally, it is backed by a `HashMap` where the set elements act as keys.'
    },
    {
      id: 'q5-git-stash',
      questionNumber: 'Q5',
      question: 'Which Git command temporarily sets aside uncommitted local changes so you can switch branches cleanly?',
      options: ['A. git commit --amend', 'B. git stash', 'C. git rebase', 'D. git reset --hard'],
      correctAnswer: 'B. git stash',
      explanation: '`git stash` stores your modified tracked files and staged changes on a stack of unfinished changes, reverting your working directory to match the `HEAD` commit.'
    },
    {
      id: 'q6-java-final',
      questionNumber: 'Q6',
      question: 'What happens when a primitive variable in Java is declared with the `final` keyword?',
      options: [
        'A. It becomes accessible across all packages globally.',
        'B. Its value cannot be reassigned once initialized.',
        'C. It is automatically collected by the garbage collector immediately.',
        'D. It must be initialized inside a static block.'
      ],
      correctAnswer: 'B. Its value cannot be reassigned once initialized.',
      explanation: 'The `final` keyword applied to a primitive variable makes it a constant. Attempting to modify its value after initialization results in a compile-time error.'
    },
    {
      id: 'q7-parentheses',
      questionNumber: 'Q7',
      question: 'Which data structure is most optimal for validating balanced parentheses in a syntax parser?',
      options: ['A. Queue', 'B. Stack', 'C. PriorityQueue', 'D. Doubly LinkedList'],
      correctAnswer: 'B. Stack',
      explanation: 'A **Stack** operates on a Last-In-First-Out (LIFO) basis, making it ideal for matching opening brackets `(`, `{`, `[` with their most recent corresponding closing brackets.'
    },
    {
      id: 'q8-hashmap-dup',
      questionNumber: 'Q8',
      question: 'In Java, what happens when you call `map.put("key", "newValue")` on a `HashMap` that already contains `"key"`?',
      options: [
        'A. It throws a DuplicateKeyException.',
        'B. It appends the new value to create a List of values.',
        'C. It overwrites the existing value and returns the old value.',
        'D. It silently ignores the insertion and retains the old value.'
      ],
      correctAnswer: 'C. It overwrites the existing value and returns the old value.',
      explanation: '`HashMap` keys must be unique. Inserting a duplicate key replaces the entry\'s existing value with the newly provided value and returns the previous value associated with that key.'
    },
    {
      id: 'q9-idempotent',
      questionNumber: 'Q9',
      question: 'Which of the following HTTP methods is NOT considered idempotent according to REST specification standards?',
      options: ['A. GET', 'B. PUT', 'C. POST', 'D. DELETE'],
      correctAnswer: 'C. POST',
      explanation: '**POST** is non-idempotent. Executing the same POST request multiple times creates multiple independent resources on the server. In contrast, GET, PUT, and DELETE yield identical server state regardless of repetition.'
    },
    {
      id: 'q10-git-soft',
      questionNumber: 'Q10',
      question: 'What is the exact architectural difference between `git reset --soft HEAD~1` and `git reset --hard HEAD~1`?',
      options: [
        'A. --soft deletes files from disk; --hard keeps files in the working directory.',
        'B. --soft moves HEAD pointer back but keeps changes staged; --hard discards commits, staging, and working directory modifications.',
        'C. --soft only works on remote branches; --hard only works on local commits.',
        'D. There is no difference; they are aliases for the same git operation.'
      ],
      correctAnswer: 'B. --soft moves HEAD pointer back but keeps changes staged; --hard discards commits, staging, and working directory modifications.',
      explanation: '`--soft` is a safe rollback operation used when you want to squash or amend your recent commit without losing code. `--hard` is destructive and wipes out all uncommitted work.'
    },
    {
      id: 'q11-lru-cache',
      questionNumber: 'Q11',
      question: 'Which combination of data structures is required to implement an LRU (Least Recently Used) Cache with $O(1)$ time complexity for both `get` and `put` operations?',
      options: [
        'A. Array + Binary Search Tree',
        'B. HashMap + Doubly Linked List',
        'C. Stack + Queue',
        'D. Singly Linked List + PriorityQueue'
      ],
      correctAnswer: 'B. HashMap + Doubly Linked List',
      explanation: 'An **LRU Cache** requires $O(1)$ key lookups (provided by `HashMap`) combined with $O(1)$ node insertion and deletion to reorder access priority (provided by a `Doubly Linked List`).',
      attachedDeepDive: {
        title: 'Deep Dive: LRU Cache System Design & Implementation',
        content: [
          "In high-throughput automation platforms, caching API responses or test tokens via an **LRU Cache** prevents rate-limiting and boosts suite speed.",
          "",
          "#### Architectural Interaction",
          "* **HashMap (`Map<Key, Node>`)**: Maps the raw cache key directly to the corresponding memory address of the Doubly Linked List node.",
          "* **Doubly Linked List**: Maintains chronological access order. The **Head** pointer represents the most recently used item, while the **Tail** pointer represents the least recently used item scheduled for eviction.",
          "",
          "When an item is accessed via `get()` or updated via `put()`, pointers are updated in $O(1)$ constant time to detach the node from its current position and splice it immediately after the Head."
        ].join('\n')
      }
    },
    {
      id: 'q12-sliding-window',
      questionNumber: 'Q12',
      question: 'When solving contiguous substring or subarray problems, what primary time complexity optimization does the Sliding Window pattern provide over a nested loop brute force?',
      options: [
        'A. Reduces space complexity from O(n) to O(1)',
        'B. Reduces time complexity from O(n²) to O(n)',
        'C. Allows sorting the array in O(log n) time',
        'D. Eliminates the need for pointers entirely'
      ],
      correctAnswer: 'B. Reduces time complexity from O(n²) to O(n)',
      explanation: 'A brute force approach inspects every possible starting and ending index ($O(n^2)$). A **Sliding Window** maintains two bounding pointers (`left` and `right`) that only traverse the collection once from left to right, achieving linear $O(n)$ time.'
    },
    {
      id: 'q13-db-indexes',
      questionNumber: 'Q13',
      question: 'Why do relational databases predominantly use B-Tree indexes over Hash indexes for range queries (`WHERE age BETWEEN 20 AND 30`)?',
      options: [
        'A. B-Trees maintain sorted order allowing logarithmic range traversal, while Hash indexes only support exact equality checks O(1)',
        'B. Hash indexes consume 100 times more disk storage than B-Trees',
        'C. B-Trees operate in O(1) time for range queries',
        'D. Hash indexes cannot be created on integer columns'
      ],
      correctAnswer: 'A. B-Trees maintain sorted order allowing logarithmic range traversal, while Hash indexes only support exact equality checks O(1)',
      explanation: 'Hash indexes apply a hash function to the key, scattering adjacent keys across random buckets. B-Trees store nodes in sorted hierarchy, enabling efficient sequential scans across range boundaries.',
      attachedDeepDive: {
        title: 'Deep Dive: Database Index Execution Plans',
        content: [
          "When validating backend databases in automation suites, understanding indexing ensures query verification steps do not time out on multi-million row tables.",
          "",
          "#### Execution Plan Analysis",
          "* **Index Scan**: Traversing the B-Tree index to locate specific data blocks. Extremely fast ($O(\\log n)$).",
          "* **Seq Scan (Full Table Scan)**: Inspecting every row from disk when no matching index exists or when filtering predicates retrieve >20% of total rows.",
          "* **Composite Indexes**: Creating an index on `(status, created_at)` satisfies queries filtering by status and ordering by creation date without requiring an in-memory sort pass."
        ].join('\n')
      }
    },
    {
      id: 'q14-contract-testing',
      questionNumber: 'Q14',
      question: 'In distributed microservices architecture, what specific problem does Consumer-Driven Contract Testing (e.g., Pact) solve over traditional E2E integration environments?',
      options: [
        'A. It verifies that provider API responses match consumer expectations independently in isolated CI builds, eliminating flaky staging environment dependencies',
        'B. It replaces unit testing entirely by testing GUI buttons',
        'C. It forces all microservices to share a single relational database',
        'D. It generates automated UI load tests in Selenium'
      ],
      correctAnswer: 'A. It verifies that provider API responses match consumer expectations independently in isolated CI builds, eliminating flaky staging environment dependencies',
      explanation: 'Instead of deploying 50 microservices simultaneously in staging to run API integration tests, Contract Testing records expected request/response JSON schemas (contracts) during consumer unit tests and verifies them against provider build pipelines asynchronously.'
    },
    {
      id: 'q15-cicd-gates',
      questionNumber: 'Q15',
      question: 'How should an SDET architect structure automated test execution tiers across CI/CD quality gates?',
      options: [
        'A. Pull Request: Unit/Smoke (Sub-5 min); Merge to Main: API Integration & Core Regression (15 min); Nightly: Exhaustive Cross-Browser E2E & Performance',
        'B. Run all 5,000 UI E2E tests sequentially on every developer commit',
        'C. Run only manual exploratory tests before production release',
        'D. Execute UI tests first, followed by unit tests'
      ],
      correctAnswer: 'A. Pull Request: Unit/Smoke (Sub-5 min); Merge to Main: API Integration & Core Regression (15 min); Nightly: Exhaustive Cross-Browser E2E & Performance',
      explanation: 'Fast feedback is critical. Running heavy E2E UI tests on every pull request blocks developer productivity. Tiering test suites ensures rapid validation at commit time while preserving thorough coverage before release.'
    },
    {
      id: 'q16-api-protocols',
      questionNumber: 'Q16',
      question: 'When automating backend services, how does testing GraphQL or gRPC differ from standard REST APIs?',
      options: [
        'A. GraphQL requires asserting against a single `/graphql` endpoint using custom query payloads; gRPC requires compiling Protocol Buffers (.proto) into binary client stubs',
        'B. Both gRPC and GraphQL use HTTP GET requests exclusively',
        'C. GraphQL cannot be tested with Postman or RestAssured',
        'D. gRPC returns HTML web pages instead of structured data'
      ],
      correctAnswer: 'A. GraphQL requires asserting against a single `/graphql` endpoint using custom query payloads; gRPC requires compiling Protocol Buffers (.proto) into binary client stubs',
      explanation: 'REST APIs rely on multiple URL paths and HTTP status codes. GraphQL uses one endpoint where HTTP status is almost always 200 OK (errors are embedded inside the JSON response `errors` array). gRPC transmits highly compressed HTTP/2 binary frames via protobuf definitions.'
    },
    {
      id: 'q17-sql-joins',
      questionNumber: 'Q17',
      question: 'What is the exact result set difference between a `LEFT OUTER JOIN` and an `INNER JOIN` between `Orders` and `Customers` tables?',
      options: [
        'A. INNER JOIN returns only matched records; LEFT JOIN returns all Orders even if the Customer ID is NULL or deleted',
        'B. INNER JOIN returns all Customers; LEFT JOIN returns only Orders',
        'C. LEFT JOIN doubles the execution time of INNER JOIN',
        'D. There is no difference if both tables have primary keys'
      ],
      correctAnswer: 'A. INNER JOIN returns only matched records; LEFT JOIN returns all Orders even if the Customer ID is NULL or deleted',
      explanation: 'An `INNER JOIN` filters out non-matching rows from both sides. A `LEFT JOIN` preserves all rows from the left table (`Orders`), populating columns from the right table (`Customers`) with `NULL` where no match exists.'
    },
    {
      id: 'q18-git-rebase',
      questionNumber: 'Q18',
      question: 'Why is `git rebase` strongly recommended against when working on shared feature branches with multiple QE engineers?',
      options: [
        'A. Rebase rewrites commit history SHAs; pushing rewritten history causes severe merge conflicts and diverged local repositories for teammates',
        'B. Rebase deletes files from remote servers permanently',
        'C. Rebase only works on Linux OS environments',
        'D. Rebase prevents running git status afterwards'
      ],
      correctAnswer: 'A. Rebase rewrites commit history SHAs; pushing rewritten history causes severe merge conflicts and diverged local repositories for teammates',
      explanation: 'Golden rule of Git: Never rebase commits that have been pushed to a public shared branch. Use rebase strictly to clean up your local private feature branch before raising a Pull Request.'
    },
    {
      id: 'q19-concurrency',
      questionNumber: 'Q19',
      question: 'In Java automation frameworks, why should you use `AtomicInteger` or `ThreadLocal` instead of a static primitive `int count` when tracking parallel test execution metrics?',
      options: [
        'A. Static primitives suffer from race conditions under concurrent multi-threaded execution; AtomicInteger guarantees lock-free thread-safe atomic operations',
        'B. Static primitives cannot be read by TestNG listeners',
        'C. AtomicInteger consumes 10x less JVM memory',
        'D. ThreadLocal variables cannot be modified once initialized'
      ],
      correctAnswer: 'A. Static primitives suffer from race conditions under concurrent multi-threaded execution; AtomicInteger guarantees lock-free thread-safe atomic operations',
      explanation: 'When 10 parallel test threads increment `count++`, read-modify-write interleaving causes lost updates. `AtomicInteger.incrementAndGet()` utilizes hardware-level Compare-And-Swap (CAS) instructions to ensure precise thread-safe counting.'
    },
    {
      id: 'q20-bigo-table',
      questionNumber: 'Q20',
      question: 'Which of the following data structures achieves $O(1)$ constant time complexity for Search, Insertion, and Deletion average cases?',
      options: [
        'A. HashMap / HashSet',
        'B. Sorted Array',
        'C. Balanced Binary Search Tree (AVL / Red-Black Tree)',
        'D. Singly Linked List'
      ],
      correctAnswer: 'A. HashMap / HashSet',
      explanation: 'Hash tables achieve $O(1)$ average time for all three operations by computing direct bucket indices. BSTs operate in $O(\\log n)$ time. Sorted arrays take $O(\\log n)$ for search (binary search) but $O(n)$ for insertion/deletion due to element shifting.',
      attachedDeepDive: {
        title: 'Deep Dive: Comprehensive Big-O Complexity Reference Table',
        content: [
          "Mastering asymptotic notation is crucial for technical engineering interviews and optimizing test data generation tools.",
          "",
          "#### Data Structure Operations Complexity",
          "| Data Structure | Average Access | Average Search | Average Insertion | Average Deletion | Worst Search |",
          "| :--- | :---: | :---: | :---: | :---: | :---: |",
          "| **Array / ArrayList** | $O(1)$ | $O(n)$ | $O(n)$ | $O(n)$ | $O(n)$ |",
          "| **Stack / Queue** | $O(n)$ | $O(n)$ | $O(1)$ | $O(1)$ | $O(n)$ |",
          "| **Doubly Linked List** | $O(n)$ | $O(n)$ | $O(1)$ | $O(1)$ | $O(n)$ |",
          "| **HashMap / HashSet** | N/A | $O(1)$ | $O(1)$ | $O(1)$ | $O(n)$ |",
          "| **Binary Search Tree** | $O(\\log n)$ | $O(\\log n)$ | $O(\\log n)$ | $O(\\log n)$ | $O(n)$ |",
          "| **Red-Black Tree** | $O(\\log n)$ | $O(\\log n)$ | $O(\\log n)$ | $O(\\log n)$ | $O(\\log n)$ |"
        ].join('\n')
      }
    }
  ]
};
