export const trainingChatsList = [
  {
    id: 'certa_ai',
    title: 'Certa.ai SDET & Automation Prep',
    tag: 'certa_ai',
    summary: 'Multi-chapter assessment prep featuring combined Q&As, LeetCode-formatted algorithms (Two Sum, Array Rotation, Sliding Window, Top K Elements), and attached deep dives.',
    date: '2026-06-29'
  }
];

export const certaAiTrainingData = {
  id: 'certa_ai',
  title: 'Certa.ai SDET & Automation Interview Prep',
  tag: 'certa_ai',
  summary: 'Comprehensive Certa.ai assessment training structured into sequential Chapters with unified Q&A cards, attached deep-dives, and LeetCode-formatted algorithms.',
  chapters: [
    {
      chapterId: 'chapter-1',
      title: 'Chapter 1: Assessment Set 1 (Core Q&A & Two Sum Warmup)',
      summary: 'Covers foundational Java collections, Playwright auto-waiting, Selenium waits, SQL subqueries, Two Sum optimizations, and First Non-Repeating Character.',
      indexTopics: [
        { id: 'q1-hashmap', title: 'Q1. HashMap Lookup Complexity' },
        { id: 'q2-playwright-wait', title: 'Q2. Playwright Auto-Waiting & Deep Dive' },
        { id: 'q3-http-created', title: 'Q3. HTTP 201 Created Status' },
        { id: 'q4-sql-salary', title: 'Q4. SQL Second-Highest Salary Subquery' },
        { id: 'q5-selenium-waits', title: 'Q5. Selenium Waits & Implicit vs Explicit Deep Dive' },
        { id: 'q6-hashset', title: 'Q6. Java Collections Without Duplicates' },
        { id: 'q7-git-stash', title: 'Q7. Git Stash Uncommitted Changes' },
        { id: 'q8-playwright-locators', title: 'Q8. Resilient Locators & getByRole() Deep Dive' },
        { id: 'q9-java-final', title: 'Q9. Java Final Keyword' },
        { id: 'q10-parentheses', title: 'Q10. Stack for Balanced Parentheses' },
        { id: 'bonus-twosum', title: 'Bonus: Two Sum Algorithm & Method Wrapping Deep Dive' },
        { id: 'coding-challenge-1', title: 'Coding Challenge 1: First Non-Repeating Character' }
      ],
      qaList: [
        {
          id: 'q1-hashmap',
          questionNumber: 'Q1',
          question: 'What is the average time complexity of searching for a key in a `HashMap`?',
          options: ['A. O(n)', 'B. O(log n)', 'C. O(1)', 'D. O(n²)'],
          correctAnswer: 'C. O(1)',
          explanation: 'HashMap lookups operate in **O(1)** average time complexity because the key hash code directly maps to the internal bucket array index.\n\n**Interviewer Follow-up:**\n> What is the worst-case time complexity?\n**Answer:** **O(n)** if all keys collide into the same bucket (or **O(log n)** in modern Java 8+ when heavily collided bucket chains transform into Red-Black balanced trees).'
        },
        {
          id: 'q2-playwright-wait',
          questionNumber: 'Q2',
          question: 'Which Playwright feature automatically waits for an element to become actionable before interacting with it?',
          options: ['A. Thread.sleep()', 'B. Auto-waiting', 'C. Implicit Wait', 'D. Fluent Wait'],
          correctAnswer: 'B. Auto-waiting',
          explanation: 'Playwright’s **Auto-waiting** is one of its biggest architectural advantages over legacy automation frameworks like Selenium.',
          attachedDeepDive: {
            title: 'Deep Dive: Playwright Auto-Waiting Architecture',
            content: `In Playwright, you almost never write hard timeouts like \`page.waitForTimeout(5000)\`.

Instead, when you execute an action:
\`\`\`java
page.getByRole(AriaRole.BUTTON, new Page.GetByRoleOptions().setName("Login")).click();
\`\`\`

#### Architectural Breakdown & Actionability Checks
Before executing the click, Playwright automatically performs safety checks and pauses execution until the target element satisfies all actionable criteria:
1. **Attached to DOM:** Ensures the element actually exists within the page hierarchy.
2. **Visible:** Verifies the element has a non-empty bounding box and no \`visibility: hidden\` or \`opacity: 0\` styling.
3. **Stable Layout:** Confirms the element is not animating or shifting across coordinates.
4. **Enabled State:** Checks that button/input attributes do not contain \`disabled\`.
5. **Receives Events:** Ensures no overlapping spinner, modal, or toast notification obscures the click point.

Only when all 5 conditions pass does Playwright trigger the interaction.`
          }
        },
        {
          id: 'q3-http-created',
          questionNumber: 'Q3',
          question: 'Which HTTP status code indicates that a resource was successfully created?',
          options: ['A. 200 OK', 'B. 201 Created', 'C. 204 No Content', 'D. 302 Found'],
          correctAnswer: 'B. 201 Created',
          explanation: '**201 Created** is the standard HTTP status code returned by REST APIs (typically upon successful \`POST\` requests) indicating that a new database record or resource has been provisioned.'
        },
        {
          id: 'q4-sql-salary',
          questionNumber: 'Q4',
          question: 'Which SQL query correctly returns the second-highest salary from an `Employee(id, name, salary)` table?',
          options: [
            'A. SELECT MAX(salary) FROM Employee;',
            'B. SELECT MAX(salary) FROM Employee WHERE salary < (SELECT MAX(salary) FROM Employee);',
            'C. SELECT MIN(salary) FROM Employee;',
            'D. SELECT salary FROM Employee LIMIT 2;'
          ],
          correctAnswer: 'B. SELECT MAX(salary) FROM Employee WHERE salary < (SELECT MAX(salary) FROM Employee);',
          explanation: 'Suppose salaries are \`90,000\`, \`70,000\`, and \`50,000\`.\n* The inner subquery \`(SELECT MAX(salary) FROM Employee)\` finds the highest salary (\`90,000\`).\n* The outer query filters for salaries less than \`90,000\` (\`70,000\`, \`50,000\`) and takes the \`MAX()\` of that filtered set, accurately returning \`70,000\`.\n\n*(Note: In databases like PostgreSQL/MySQL, \`SELECT DISTINCT salary FROM Employee ORDER BY salary DESC LIMIT 1 OFFSET 1\` is another clean alternative.)*'
        },
        {
          id: 'q5-selenium-waits',
          questionNumber: 'Q5',
          question: 'Which Selenium wait is generally recommended for waiting until a specific condition is met?',
          options: ['A. Implicit Wait', 'B. Explicit Wait', 'C. Thread.sleep()', 'D. No wait'],
          correctAnswer: 'B. Explicit Wait',
          explanation: '**Explicit Wait** is preferred because it pauses execution strictly until a targeted condition occurs, making test suites faster and resilient against flakiness.',
          attachedDeepDive: {
            title: 'Deep Dive: Selenium Implicit vs. Explicit Waits',
            content: `Imagine a dynamic login button that takes **5 seconds** to render after submitting credentials.

#### ❌ Without Wait
\`\`\`java
driver.findElement(By.id("login")).click();
\`\`\`
**Result:** Throws \`NoSuchElementException\` immediately because WebDriver checks the DOM instantly.

#### ⚠️ Implicit Wait (Global Timeout)
\`\`\`java
driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
driver.findElement(By.id("login")).click();
\`\`\`
**Architectural Drawbacks:**
* **Global Scope:** Polling applies across the entire driver instance lifecycle for every single \`findElement()\` call.
* **Slow Negative Tests:** If verifying that an error alert did *not* render, WebDriver pauses for the full 10-second timeout duration before confirming absence, crippling suite execution execution speeds.

#### ✅ Explicit Wait (Recommended Best Practice)
\`\`\`java
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
WebElement button = wait.until(ExpectedConditions.elementToBeClickable(By.id("login")));
button.click();
\`\`\`
**Why Interviewers Prefer Explicit Wait:**
1. **Targeted Precision:** Waits exclusively for targeted expected conditions (\`visibilityOfElementLocated\`, \`elementToBeClickable\`, \`alertIsPresent\`).
2. **Immediate Execution:** Returns the exact millisecond the condition is satisfied without unnecessary overhead.
3. **Zero Contamination:** Does not affect negative assertions elsewhere in the test suite.`
          }
        },
        {
          id: 'q6-hashset',
          questionNumber: 'Q6',
          question: 'Which Java collection does NOT allow duplicate elements?',
          options: ['A. ArrayList', 'B. LinkedList', 'C. HashSet', 'D. Vector'],
          correctAnswer: 'C. HashSet',
          explanation: '\`HashSet\` implements the \`Set\` interface, backed by an internal \`HashMap\`. Attempting to add a duplicate value overwrites the existing entry and returns \`false\`, guaranteeing uniqueness.'
        },
        {
          id: 'q7-git-stash',
          questionNumber: 'Q7',
          question: 'Which Git command temporarily saves your uncommitted working directory changes without committing them?',
          options: ['A. git reset', 'B. git revert', 'C. git stash', 'D. git clean'],
          correctAnswer: 'C. git stash',
          explanation: '\`git stash\` shelves tracked working directory modifications and reverts your working tree to match the HEAD commit. You can re-apply them later using \`git stash pop\`.'
        },
        {
          id: 'q8-playwright-locators',
          questionNumber: 'Q8',
          question: 'Which Playwright locator strategy is generally considered the most resilient and recommended by the core team?',
          options: ['A. page.locator(".btn")', 'B. page.locator("#submit")', 'C. page.getByRole()', 'D. XPath'],
          correctAnswer: 'C. page.getByRole()',
          explanation: 'User-facing accessibility locators like \`getByRole()\`, \`getByLabel()\`, and \`getByPlaceholder()\` reflect how users interact with the page and survive CSS refactors.',
          attachedDeepDive: {
            title: 'Deep Dive: Why getByRole()? & Locator Strategies',
            content: `Consider this standard HTML button:
\`\`\`html
<button class="btn-primary">Login</button>
\`\`\`

#### ❌ Fragile CSS / XPath Locators
\`\`\`java
page.locator(".btn-primary").click(); // CSS
page.locator("//button[text()='Login']").click(); // XPath
\`\`\`
**Problem:** If a frontend developer updates styling from \`btn-primary\` to \`btn-success\`, or re-structures DOM nesting, your automation suite breaks even though the functionality is completely fine.

#### ✅ Recommended Semantic Locator
\`\`\`java
page.getByRole(AriaRole.BUTTON, new Page.GetByRoleOptions().setName("Login")).click();
\`\`\`
**Why it wins:** Playwright inspects accessibility roles and accessible names. Whether classes change or tags evolve, as long as it functions as a button named "Login", your test passes stably.

#### 💡 Interview Follow-up Q&A
1. **Why is \`getByRole()\` preferred over XPath?**
   It uses semantic accessibility trees, is immune to CSS class churn, executes faster, and promotes web accessibility standards.
2. **Should we ever use \`Thread.sleep()\`?**
   Almost never. It forces deterministic wait delays regardless of app speed. Use Playwright auto-waiting or explicit assertions.
3. **When would you use CSS selectors instead of \`getByRole()\`?**
   Only when targeting non-semantic custom DOM elements or specific data attributes (\`[data-testid="..."]\`) where accessible roles are absent.`
          }
        },
        {
          id: 'q9-java-final',
          questionNumber: 'Q9',
          question: 'Which Java keyword prevents a method from being overridden by child subclasses?',
          options: ['A. static', 'B. private', 'C. final', 'D. const'],
          correctAnswer: 'C. final',
          explanation: 'Applying the \`final\` keyword to a method declaration locks its implementation, preventing any subclass from providing an overriding definition.'
        },
        {
          id: 'q10-parentheses',
          questionNumber: 'Q10',
          question: 'Which data structure is best suited for checking whether a string has balanced parentheses?',
          options: ['A. Queue', 'B. Stack', 'C. HashMap', 'D. LinkedList'],
          correctAnswer: 'B. Stack',
          explanation: 'A **Stack** (LIFO) is ideal. When encountering an opening bracket \`(\`, push it onto the stack. When encountering a closing bracket \`)\`, pop the top element. If characters match and the stack is empty at the end, parentheses are balanced.'
        },
        {
          id: 'bonus-twosum',
          questionNumber: 'Bonus',
          question: 'Given array `[2, 7, 11, 15]` and target `9`, what indices should be returned for the classic Two Sum problem?',
          options: ['A. 1, 2', 'B. 0, 2', 'C. 0, 1', 'D. 2, 3'],
          correctAnswer: 'C. 0, 1 (Values: 2 + 7 = 9)',
          explanation: 'Index \`0\` value is \`2\`, index \`1\` value is \`7\`. Their sum is \`9\`.',
          attachedDeepDive: {
            title: 'LeetCode Deep Dive: Two Sum Wrapped in Proper Java Methods',
            content: `In professional coding interviews, wrapping your solution in a complete, well-typed Java method signature with early-return short-circuiting demonstrates production readiness.

#### ❌ Brute Force Approach — O(n²) Time
\`\`\`java
class Solution {
    public int[] twoSumBruteForce(int[] nums, int target) {
        for (int i = 0; i < nums.length; i++) {
            for (int j = i + 1; j < nums.length; j++) {
                // Check if pair matches target
                if (nums[i] + nums[j] == target) {
                    // Immediate return breaks out of both loops instantly
                    return new int[]{i, j};
                }
            }
        }
        // Fallback return statement if no valid pair exists
        return new int[]{-1, -1};
    }
}
\`\`\`
**Architectural Drawbacks:** Nested iteration scales quadratically. Comparing every element against subsequent elements yields billions of operations for large input arrays.

---

#### ✅ LeetCode Optimized HashMap Pass — O(n) Time, O(n) Space
\`\`\`java
import java.util.HashMap;
import java.util.Map;

class Solution {
    public int[] twoSumOptimized(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();

        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];

            // If complement already exists in map, we found the pair!
            if (map.containsKey(complement)) {
                // Immediate return breaks loop and completes execution
                return new int[]{map.get(complement), i};
            }

            // Store current value alongside its array index
            map.put(nums[i], i);
        }

        // Return empty/sentinel indices if no pair is found
        return new int[]{-1, -1};
    }
}
\`\`\`

#### 🔄 Architectural Execution & Loop Breaking Walkthrough
1. **Iteration 0 (nums[0] = 2):**
   * Calculate \`complement = 9 - 2 = 7\`.
   * Check \`map.containsKey(7)\` -> \`false\`.
   * Store current item: \`map.put(2, 0)\`.
2. **Iteration 1 (nums[1] = 7):**
   * Calculate \`complement = 9 - 7 = 2\`.
   * Check \`map.containsKey(2)\` -> **true**!
   * **Loop Break:** Returning directly inside the conditional block short-circuits execution immediately, preventing wasted iterations and guaranteeing O(n) runtime.`
          }
        }
      ],
      codingChallenge: {
        id: 'coding-challenge-1',
        title: 'Coding Challenge 1: First Non-Repeating Character',
        problemStatement: 'Given a string `str`, find and return the **index** of the first character that appears exactly once. If no such character exists, return `-1`.',
        examples: [
          { input: 'str = "leetcode"', output: '0', rationale: 'Character "l" at index 0 appears only once.' },
          { input: 'str = "loveleetcode"', output: '2', rationale: 'Characters "l" and "o" repeat. Character "v" at index 2 is the first unique character.' },
          { input: 'str = "aabb"', output: '-1', rationale: 'All characters repeat.' }
        ],
        requirements: [
          'Wrap solution inside a clean, production-ready Java class and method signature.',
          'Use explicit return statements to illustrate early loop termination.',
          'Analyze exact Time and Space complexity.'
        ],
        solutionCode: `import java.util.HashMap;
import java.util.Map;

class Solution {
    public int firstUniqChar(String str) {
        Map<Character, Integer> frequencyMap = new HashMap<>();

        // Pass 1: Populate character frequency mapping
        for (char c : str.toCharArray()) {
            frequencyMap.put(c, frequencyMap.getOrDefault(c, 0) + 1);
        }

        // Pass 2: Traverse original string order to locate first character with count == 1
        for (int i = 0; i < str.length(); i++) {
            if (frequencyMap.get(str.charAt(i)) == 1) {
                // Immediate return breaks loop and yields earliest index
                return i;
            }
        }

        // Return -1 indicating all characters repeated
        return -1;
    }
}`,
        explanation: `#### 🧠 Architectural Breakdown & Indentation Etiquette
1. **Two-Pass Sequential Strategy:**
   * Instead of nested scanning O(n²), we separate character frequency aggregation from ordering lookup.
2. **Pass 1 (Frequency Aggregation):**
   * We iterate through \`str.toCharArray()\` to populate \`HashMap<Character, Integer>\`.
3. **Pass 2 (Ordered Early-Return Lookup):**
   * We iterate strictly through \`str.length()\` from left to right.
   * The instant \`frequencyMap.get(...) == 1\` evaluates true, our \`return i;\` statement executes, breaking out of the loop and short-circuiting any remaining character evaluations.

#### 📊 Complexity Analysis
* **Time Complexity: O(n)**
  Pass 1 takes O(n) iterations. Pass 2 takes at most O(n) iterations. Total execution steps = 2n, reducing asymptotically to linear O(n) time.
* **Space Complexity: O(1) Auxiliary Space**
  Although we utilize a map, the English alphabet is bounded by 26 lowercase characters (or 256 ASCII symbols). Memory consumption is strictly capped at a constant O(1) upper bound.`
      }
    },
    {
      chapterId: 'chapter-2',
      title: 'Chapter 2: Assessment Set 2 (Advanced Q&A & Array Rotation)',
      summary: 'Evaluates advanced HashMap operations, HTTP idempotency, Git soft resets, LRU Cache system design, and LeetCode In-Place Array Rotation.',
      indexTopics: [
        { id: 'set2-q1-hashmap-dup', title: 'Q1. HashMap Duplicate Keys Behavior' },
        { id: 'set2-q2-hashmap-insert', title: 'Q2. HashMap n Insertions Complexity' },
        { id: 'set2-q6-idempotent', title: 'Q6. HTTP Idempotent Methods Table' },
        { id: 'set2-q8-git-soft', title: 'Q8. Git Reset Soft vs Hard' },
        { id: 'set2-q9-lru-cache', title: 'Q9. LRU Cache System Design Deep Dive' },
        { id: 'set2-q10-xpath', title: 'Q10. Fragility of Absolute XPath Locators' },
        { id: 'set2-coding-challenge', title: 'Coding Challenge 2: Rotate Array Right by k Steps' },
        { id: 'set2-followups', title: 'Interview Follow-ups: ConcurrentHashMap & PUT vs PATCH' }
      ],
      qaList: [
        {
          id: 'set2-q1-hashmap-dup',
          questionNumber: 'Q1',
          question: 'What happens when you insert duplicate keys into a Java `HashMap` (`put("A", 1)`, `put("B", 2)`, `put("A", 3)`)?',
          options: [
            'A. Throws IllegalArgumentException',
            'B. Allows both entries (size becomes 3)',
            'C. Overwrites previous entry value (size becomes 2)',
            'D. Ignores new insertion'
          ],
          correctAnswer: 'C. Overwrites previous entry value (size becomes 2)',
          explanation: '`HashMap` keys must be unique. When inserting `put("A", 3)`, Java computes the hash code for `"A"`, locates the existing entry `"A" -> 1`, and replaces the value `1` with `3`. The total map size remains `2`.'
        },
        {
          id: 'set2-q2-hashmap-insert',
          questionNumber: 'Q2',
          question: 'What is the total time complexity of inserting n elements into an empty `HashMap`?',
          options: ['A. O(1)', 'B. O(n)', 'C. O(n log n)', 'D. O(n²)'],
          correctAnswer: 'B. O(n)',
          explanation: 'A single insertion operates in **O(1)** amortized time. Executing n distinct insertions scales linearly to **O(n)** total time.'
        },
        {
          id: 'set2-q6-idempotent',
          questionNumber: 'Q6',
          question: 'Which of the following HTTP methods is NOT idempotent?',
          options: ['A. GET', 'B. PUT', 'C. DELETE', 'D. POST'],
          correctAnswer: 'D. POST',
          explanation: 'An HTTP method is **idempotent** if executing identical requests multiple times yields the exact same server state as executing it once.\n* **GET / PUT / DELETE:** Idempotent.\n* **POST:** Not idempotent (submitting 5 identical POST requests creates 5 distinct database records).'
        },
        {
          id: 'set2-q8-git-soft',
          questionNumber: 'Q8',
          question: 'Which Git command removes the most recent commit from commit history while preserving your modified files in the staging area?',
          options: [
            'A. git reset --hard HEAD~1',
            'B. git revert HEAD',
            'C. git reset --soft HEAD~1',
            'D. git clean -fd'
          ],
          correctAnswer: 'C. git reset --soft HEAD~1',
          explanation: '`git reset --soft HEAD~1` rolls back HEAD pointer by one commit while leaving your modified code untouched and fully staged in the Git index.'
        },
        {
          id: 'set2-q9-lru-cache',
          questionNumber: 'Q9',
          question: 'Which data structure combination is optimal for implementing an LRU (Least Recently Used) Cache with O(1) lookup and O(1) eviction?',
          options: [
            'A. HashMap + ArrayList',
            'B. Stack + Queue',
            'C. HashMap + Doubly Linked List',
            'D. TreeMap + LinkedList'
          ],
          correctAnswer: 'C. HashMap + Doubly Linked List',
          explanation: 'HashMap provides O(1) key lookup, but cannot track usage ordering. Coupling it with a **Doubly Linked List** allows moving accessed nodes to the front (O(1) pointer reassignment) and removing least recently used items from the tail (O(1)).'
        },
        {
          id: 'set2-q10-xpath',
          questionNumber: 'Q10',
          question: 'Why is an absolute XPath locator like `//div[2]/button[3]` strongly discouraged in UI automation?',
          options: [
            'A. Not supported by Playwright',
            'B. Extremely slow compilation',
            'C. High risk of security injection',
            'D. Extremely fragile to UI layout shifts'
          ],
          correctAnswer: 'D. Extremely fragile to UI layout shifts',
          explanation: 'Absolute XPaths rely on rigid DOM position indices. Any minor layout addition (e.g. inserting a banner or wrapper div) instantly invalidates the locator.'
        }
      ],
      codingChallenge: {
        id: 'set2-coding-challenge',
        title: 'Coding Challenge 2: Rotate Array Right by k Steps (LeetCode 189)',
        problemStatement: 'Given an integer array `nums`, rotate the array to the right by `k` steps, where `k` is non-negative.',
        examples: [
          { input: 'nums = [1,2,3,4,5,6,7], k = 3', output: '[5,6,7,1,2,3,4]', rationale: 'Rotate 1 step: [7,1,2,3,4,5,6]\nRotate 2 steps: [6,7,1,2,3,4,5]\nRotate 3 steps: [5,6,7,1,2,3,4]' },
          { input: 'nums = [-1,-100,3,99], k = 2', output: '[3,99,-1,-100]', rationale: 'Last 2 elements wrap around to the front.' }
        ],
        requirements: [
          'Wrap solution inside a standard LeetCode Java class and method signature.',
          'Demonstrate the O(1) Auxiliary Space In-Place Reversal algorithm.',
          'Contrast with temporary array approaches.'
        ],
        solutionCode: `class Solution {
    public void rotate(int[] nums, int k) {
        int n = nums.length;
        // Handle cases where k > array length
        k = k % n;

        // Step 1: Reverse the entire array
        reverse(nums, 0, n - 1);

        // Step 2: Reverse the first k elements
        reverse(nums, 0, k - 1);

        // Step 3: Reverse the remaining n - k elements
        reverse(nums, k, n - 1);
    }

    // Helper method executing two-pointer in-place reversal
    private void reverse(int[] nums, int start, int end) {
        while (start < end) {
            int temp = nums[start];
            nums[start] = nums[end];
            nums[end] = temp;
            start++;
            end--;
        }
    }
}`,
        explanation: `#### 🧠 Architectural Breakdown & Reversal Logic
1. **Handling Overflow (\`k %= n\`):**
   * Rotating an array of length 7 by 10 steps is identical to rotating by 10 % 7 = 3 steps.
2. **In-Place Reversal Walkthrough (\`[1, 2, 3, 4, 5, 6, 7]\`, k=3):**
   * **Reverse Entire Array:** \`[7, 6, 5, 4, 3, 2, 1]\`
   * **Reverse First k=3 Elements (\`0\` to \`2\`):** \`[5, 6, 7, 4, 3, 2, 1]\`
   * **Reverse Remaining Elements (\`3\` to \`6\`):** \`[5, 6, 7, 1, 2, 3, 4]\` -> **Target Achieved!**

#### 📊 Complexity Comparison Table
| Algorithm Strategy | Time Complexity | Auxiliary Space | Interview Evaluation |
| :--- | :---: | :---: | :--- |
| **Extra Array Copy** | O(n) | O(n) | Good baseline, but consumes memory. |
| **In-Place Reversal** | O(n) | **O(1)** | ⭐ **Interview Favorite:** Zero extra memory allocation. |

---

#### 🎙️ Attached Interview Follow-ups (Set 2 Deep Dives)

<div id="set2-followups"></div>

#### 1. Why is HashMap lookup O(1) on average?
> A \`HashMap\` computes the hash code of the key and maps it directly to an internal bucket array index. Lookup, insertion, and deletion operate in O(1) amortized time.

#### 2. HashMap vs. ConcurrentHashMap
| Feature | \`HashMap\` | \`ConcurrentHashMap\` |
| :--- | :--- | :--- |
| **Thread Safety** | ❌ Not thread-safe | ✅ Thread-safe |
| **Concurrency Mechanism** | Throws \`ConcurrentModificationException\` | Uses bucket-level locking & CAS operations |
| **Null Keys/Values** | Allows 1 null key & multiple null values | Disallows null keys and values |

#### 3. PUT vs. PATCH REST API Methods
* **PUT:** Replaces the *entire* resource payload. Idempotent.
* **PATCH:** Applies partial modifications to specific fields. Usually non-idempotent.`
      }
    },
    {
      chapterId: 'chapter-3',
      title: 'Chapter 3: Assessment Set 3 (Sliding Window & Longest Substring)',
      summary: 'Focuses on optimal sliding window algorithms, dynamic left-pointer shifting, duplicate character boundary checking, and LeetCode 3 deep dives.',
      indexTopics: [
        { id: 'set3-q1-sliding-window', title: 'Q1. Sliding Window vs Brute Force' },
        { id: 'set3-q2-pointer-guard', title: 'Q2. Why Guard Against Backward Shifting?' },
        { id: 'set3-coding-challenge', title: 'Coding Challenge 3: Longest Substring Without Repeating Characters' },
        { id: 'set3-followups', title: 'Deep Dive: Conditional Guard vs Math.max Walkthrough' }
      ],
      qaList: [
        {
          id: 'set3-q1-sliding-window',
          questionNumber: 'Q1',
          question: 'What is the core advantage of using the **Sliding Window** pattern over brute force for substring optimization problems?',
          options: [
            'A. Eliminates auxiliary memory usage completely',
            'B. Reduces time complexity from O(n³) or O(n²) to linear O(n)',
            'C. Avoids sorting arrays',
            'D. Allows multithreaded processing'
          ],
          correctAnswer: 'B. Reduces time complexity from O(n³) or O(n²) to linear O(n)',
          explanation: 'Brute force generates all possible substrings (O(n²)) and validates each (O(n)), yielding O(n³) operations. Sliding window dynamically expands the right boundary and contracts the left boundary in a single linear scan (O(n)).'
        },
        {
          id: 'set3-q2-pointer-guard',
          questionNumber: 'Q2',
          question: 'When tracking character indices in a `HashMap` during sliding window traversal, why must we verify that the old index is `>= left` before updating `left`?',
          options: [
            'A. To prevent NullPointerException',
            'B. To ensure negative numbers are ignored',
            'C. To prevent the left boundary pointer from jumping backward',
            'D. To keep HashMap size fixed'
          ],
          correctAnswer: 'C. To prevent the left boundary pointer from jumping backward',
          explanation: 'Consider string "abba". At index 3 (\'a\'), the map recalls \'a\' at index 0. If we do not verify whether index 0 is within the current window starting at index 2, jumping left to 0 + 1 = 1 erroneously re-introduces repeating characters into our window.'
        }
      ],
      codingChallenge: {
        id: 'set3-coding-challenge',
        title: 'Coding Challenge 3: Longest Substring Without Repeating Characters (LeetCode 3)',
        problemStatement: 'Given a string `s`, find the length of the **longest substring** without repeating characters.',
        examples: [
          { input: 's = "abcaaa"', output: '3', rationale: 'The answer is "abc", with a length of 3.' },
          { input: 's = "abba"', output: '2', rationale: 'The answer is "ab" or "ba". Illustrates why left pointer must not jump backward when encountering old duplicate characters.' },
          { input: 's = "pwwkew"', output: '3', rationale: 'The answer is "wke", with a length of 3. Note that the answer must be a substring, "pwke" is a subsequence and not a substring.' }
        ],
        requirements: [
          'Wrap solution inside a clean, production-ready LeetCode Java class.',
          'Demonstrate the conditional guard `if (map.containsKey(ch) && map.get(ch) >= left)` strategy.',
          'Analyze exact O(n) Time and O(min(n, m)) Space complexity.'
        ],
        solutionCode: `import java.util.HashMap;

public class Solution {
    public int lengthOfLongestSubstring(String s) {
        int left = 0;
        int maxLength = 0;
        HashMap<Character, Integer> map = new HashMap<>();

        for (int right = 0; right < s.length(); right++) {
            char ch = s.charAt(right);

            // Check if character was seen before AND if its previous index is inside our active window
            if (map.containsKey(ch) && map.get(ch) >= left) {
                // Jump left pointer forward just past the duplicate character
                left = map.get(ch) + 1;
            }

            // Store or update the character's most recent index
            map.put(ch, right);

            // Calculate window length (right - left + 1) and update maximum length
            maxLength = Math.max(maxLength, right - left + 1);
        }

        return maxLength;
    }
}`,
        explanation: `#### 🧠 Architectural Breakdown & Strategy Comparison
Many developers doubt the conditional guard approach because LeetCode discussion boards frequently feature a 1-liner alternative using \`Math.max\`. Both strategies are 100% identical under the hood:

| Strategy | Code Implementation | Architectural Behavior |
| :--- | :--- | :--- |
| **Conditional Guard** *(Your Version)* | \`if (map.containsKey(ch) && map.get(ch) >= left) { left = map.get(ch) + 1; }\` | Checks if the duplicate occurred *inside* active window bounds (\`>= left\`). If outside/behind, it safely ignores it! |
| **Math.max One-Liner** *(Textbook)* | \`if (map.containsKey(ch)) { left = Math.max(left, map.get(ch) + 1); }\` | Picks the larger between existing \`left\` and old index + 1, preventing backward jumps. |

---

<div id="set3-followups"></div>

#### 🔄 Step-by-Step Walkthrough: Why "abba" Traps Unprotected Pointers
* **right = 0 ('a'):** Put \`'a' -> 0\`. \`left = 0\`, \`maxLength = 1\`. Window: \`"a"\`.
* **right = 1 ('b'):** Put \`'b' -> 1\`. \`left = 0\`, \`maxLength = 2\`. Window: \`"ab"\`.
* **right = 2 ('b'):** Duplicate hit at index 1! Condition \`1 >= 0\` is **True**. Update \`left = 1 + 1 = 2\`. Put \`'b' -> 2\`. Window: \`"b"\` (Index 2), \`maxLength = 2\`.
* **right = 3 ('a'):** Duplicate hit at index 0!
  * **Here is where your guard shines:** Condition \`map.get('a') >= left\` -> \`0 >= 2\` evaluates to **FALSE!**
  * Because \`'a'\` at index 0 is behind our current window starting at index 2, your code skips updating \`left\`.
  * \`left\` remains securely at \`2\`. Put \`'a' -> 3\`. Window: \`"ba"\` (Indices 2 to 3), final \`maxLength = 2\`. ✅

#### 📊 Complexity Analysis
* **Time Complexity: O(n)**
  We traverse the string exactly once with the \`right\` pointer. HashMap insertions and lookups take O(1) amortized time.
* **Space Complexity: O(min(n, m))**
  Where n is the string length and m is the character alphabet size (e.g., 128 for ASCII or 26 for lowercase English letters).`
      }
    },
    {
      chapterId: 'chapter-4',
      title: 'Chapter 4: Assessment Set 4 (Top K Frequent Elements & Bucket Sort)',
      summary: 'Covers linear-time Bucket Sort optimizations, Min-Heap PriorityQueue mechanics, streaming data frequency capping, and LeetCode 347.',
      indexTopics: [
        { id: 'set4-q1-bucket-sort', title: 'Q1. Why Bucket Sort Achieves O(n) Time' },
        { id: 'set4-q2-min-heap', title: 'Q2. Min-Heap vs Max-Heap for Top K Elements' },
        { id: 'set4-coding-challenge', title: 'Coding Challenge 4: Top K Frequent Elements (LeetCode 347)' },
        { id: 'set4-followups', title: 'Deep Dive: Bucket Sort vs Min-Heap Trade-offs' }
      ],
      qaList: [
        {
          id: 'set4-q1-bucket-sort',
          questionNumber: 'Q1',
          question: 'Why does using **Bucket Sort** for finding the Top K frequent elements achieve O(n) time complexity compared to standard frequency sorting?',
          options: [
            'A. It eliminates hashing overhead',
            'B. Frequency counts are strictly bounded by array length N, allowing array index mapping without comparison sorting',
            'C. It uses quickselect partitioning under the hood',
            'D. It compresses the array into bitmasks'
          ],
          correctAnswer: 'B. Frequency counts are strictly bounded by array length N, allowing array index mapping without comparison sorting',
          explanation: 'Because an element cannot appear more than N times in an array of size N, we can allocate an array of lists of size N+1 where index = frequency. Placing elements into their frequency bucket takes O(N) time without requiring O(N log N) comparison sorting.'
        },
        {
          id: 'set4-q2-min-heap',
          questionNumber: 'Q2',
          question: 'When using a heap to find the Top K elements in a massive stream of N items, why is a **Min-Heap of size K** preferred over a Max-Heap containing all N items?',
          options: [
            'A. Min-Heaps consume zero memory',
            'B. Polling from a Min-Heap of size K drops the lowest frequency in O(log K) time, keeping only the top K champions in memory',
            'C. Max-Heaps do not support custom comparators in Java',
            'D. Min-Heaps sort strings automatically'
          ],
          correctAnswer: 'B. Polling from a Min-Heap of size K drops the lowest frequency in O(log K) time, keeping only the top K champions in memory',
          explanation: 'If we insert all N items into a Max-Heap, memory usage is O(N) and insertions take O(N log N). By maintaining a capped Min-Heap of size K, any insertion exceeding K immediately evicts the root (lowest frequency), capping memory at O(K) and runtime at O(N log K).'
        }
      ],
      codingChallenge: {
        id: 'set4-coding-challenge',
        title: 'Coding Challenge 4: Top K Frequent Elements (LeetCode 347)',
        problemStatement: 'Given an integer array `nums` and an integer `k`, return the `k` most frequent elements. You may return the answer in any order.',
        examples: [
          { input: 'nums = [1,1,1,2,2,2,6], k = 2', output: '[1, 2]', rationale: 'Elements 1 and 2 both appear 3 times, while 6 appears 1 time. Top 2 frequent are 1 and 2.' },
          { input: 'nums = [1], k = 1', output: '[1]', rationale: 'Single element array returns the single element.' }
        ],
        requirements: [
          'Wrap solution inside a clean LeetCode Java class and method signature.',
          'Demonstrate the O(n) Bucket Sort algorithm where array index corresponds to frequency count.',
          'Provide alternative Min-Heap PriorityQueue implementation.'
        ],
        solutionCode: `import java.util.*;

class Solution {
    public int[] topKFrequentBucketSort(int[] nums, int k) {
        // Step 1: Build character frequency counts O(n)
        Map<Integer, Integer> freqMap = new HashMap<>();
        for (int num : nums) {
            freqMap.put(num, freqMap.getOrDefault(num, 0) + 1);
        }

        // Step 2: Create buckets where array index represents frequency O(n)
        List<Integer>[] buckets = new List[nums.length + 1];
        for (int key : freqMap.keySet()) {
            int frequency = freqMap.get(key);
            if (buckets[frequency] == null) {
                buckets[frequency] = new ArrayList<>();
            }
            buckets[frequency].add(key);
        }

        // Step 3: Harvest top k elements from right to left (highest frequencies first) O(n)
        int[] result = new int[k];
        int index = 0;
        for (int i = buckets.length - 1; i >= 0 && index < k; i--) {
            if (buckets[i] != null) {
                for (int num : buckets[i]) {
                    result[index++] = num;
                    if (index == k) break; // Short-circuit upon gathering exactly k items
                }
            }
        }

        return result;
    }
}`,
        explanation: `#### 🧠 Architectural Breakdown: Bucket Sort O(n) vs Min-Heap O(n log k)
In technical interviews, solving Top K Frequent Elements with a PriorityQueue ($O(n \\log k)$) is strong, but transitioning to **Bucket Sort ($O(n)$)** is what secures the senior offer.

<div id="set4-followups"></div>

#### 🔄 Walkthrough of [1, 1, 1, 2, 2, 2, 6] with k = 2
1. **Frequency Mapping:** Map records \`1 -> 3\`, \`2 -> 3\`, \`6 -> 1\`.
2. **Bucket Index Assignment:**
   * \`buckets[1] = [6]\` (Appeared once)
   * \`buckets[3] = [1, 2]\` (Both appeared 3 times)
3. **Right-to-Left Harvest:**
   * Scan backwards from index 7 down to 0.
   * At index 3, we encounter \`[1, 2]\`. We add both to \`result\`.
   * We hit \`k = 2\` items collected, terminating execution immediately!

#### 📊 Complexity Comparison Table
| Strategy | Time Complexity | Auxiliary Space | Interview Evaluation |
| :--- | :---: | :---: | :--- |
| **Sorting Frequencies** | O(n log n) | O(n) | Baseline approach. |
| **Min-Heap (PriorityQueue)** | O(n log k) | O(n + k) | Excellent for continuous streaming data. |
| **Bucket Sort** | **O(n)** | **O(n)** | ⭐ **Interview Favorite:** Absolute linear time execution. |`
      }
    }
  ]
};
