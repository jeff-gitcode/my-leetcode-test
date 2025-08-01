# LeetCode Patterns Study Project

This is a TypeScript-based project for practicing LeetCode problems organized by coding patterns. The project includes implementations, tests, and progress tracking for systematic problem-solving preparation.

## Project Structure

```
my-leetcode-test
├── src
│   ├── index.ts          # Entry point of the application
│   ├── problems/         # Pattern-based problem solutions
│   │   ├── rangeSumQuery.ts     # Prefix sum problems
│   │   ├── binarySearch.ts      # Binary search variations
│   │   ├── treeTraversal.ts     # Tree traversal patterns
│   │   ├── dfs.ts               # Depth-first search
│   │   ├── bfs.ts               # Breadth-first search
│   │   ├── matrixTraversal.ts   # Matrix manipulation
│   │   ├── backtracking.ts      # Backtracking algorithms
│   │   └── dynamicProgramming.ts # Dynamic programming
│   └── utils
│       └── helpers.ts    # Utility functions
├── tests
│   ├── index.test.ts     # Tests for the main application logic
│   ├── problems/         # Tests for problem solutions
│   └── utils
│       └── helpers.test.ts # Tests for utility functions
├── package.json           # NPM package configuration
├── tsconfig.json          # TypeScript configuration
├── jest.config.js         # Jest configuration
└── README.md              # Project documentation
```

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd my-leetcode-test
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Compile TypeScript:**
   ```bash
   npm run build
   ```

4. **Run tests:**
   ```bash
   npm test
   ```

## Usage

- To start the application, run:
  ```bash
  npm start
  ```

- The application can be extended by adding more pattern solutions in `src/problems/` and corresponding tests in `tests/problems/`.

## Core LeetCode Patterns

| # | Pattern | Description | Common Use Cases |
|---|---------|-------------|------------------|
| 1️⃣ | Sliding Window | Use a window that slides over data to track a subset | Max subarray sum, longest substring |
| 2️⃣ | Two Pointers | Use two indices moving at different speeds or directions | Sorted arrays, merging, partitioning |
| 3️⃣ | Fast & Slow Pointers | Detect cycles or find midpoints in linked lists | Cycle detection, palindrome check |
| 4️⃣ | Depth-First Search (DFS) | Recursively explore all paths | Tree/graph traversal, backtracking |
| 5️⃣ | Breadth-First Search (BFS) | Explore level by level using a queue | Shortest path, level-order traversal |
| 6️⃣ | Binary Search | Divide and conquer in sorted data | Search, optimization, square roots |
| 7️⃣ | Backtracking | Try all possibilities, undo choices | Permutations, combinations, Sudoku |
| 8️⃣ | Dynamic Programming (DP) | Break problems into overlapping subproblems | Fibonacci, knapsack, edit distance |
| 9️⃣ | Greedy Algorithms | Make locally optimal choices | Interval scheduling, coin change |
| 🔟 | Heap / Priority Queue | Efficiently access min/max elements | Top K elements, Dijkstra's algorithm |
| 1️⃣1️⃣ | Trie | Tree-like structure for strings | Word search, autocomplete |
| 1️⃣2️⃣ | Graph Algorithms | Traverse or analyze graph structures | Connected components, shortest paths |
| 1️⃣3️⃣ | Topological Sort | Order nodes respecting dependencies | Course scheduling, build systems |
| 1️⃣4️⃣ | Union Find (Disjoint Set) | Track connected components | Cycle detection, Kruskal's algorithm |
| 1️⃣5️⃣ | Bit Manipulation | Use bitwise operations to optimize | Single number, power of two, masks |

## Coding Patterns

### ➕ **Prefix Sum**
- ✅ Range Sum Query - Immutable

### 🔍 **Binary Search**
- ✅ Binary Search
- ✅ Search Insert Position
- ✅ Find First and Last Position
- ✅ Search in Rotated Sorted Array
- ✅ Find Minimum in Rotated Sorted Array
- ✅ Search a 2D Matrix II

### 🌳 **Tree Traversal**
- ✅ Inorder/Preorder/Postorder Traversal
- ✅ Level Order Traversal
- ✅ Binary Tree Paths
- ✅ Kth Smallest Element in a BST
- ✅ Binary Tree Maximum Path Sum

### 🕳️ **Depth-First Search (DFS)**
- ✅ Maximum Depth of Binary Tree
- ✅ Path Sum
- ✅ All Paths Source Target
- ✅ Number of Islands
- ✅ Course Schedule
- ✅ Clone Graph
- ✅ Path Sum II
- ✅ Course Schedule II

### 🌊 **Breadth-First Search (BFS)**
- ✅ Binary Tree Right Side View
- ✅ Rotting Oranges
- ✅ Word Ladder
- ✅ Shortest Path in Binary Matrix

### 🗺️ **Matrix Traversal**
- ✅ Spiral Matrix
- ✅ Rotate Image
- ✅ Set Matrix Zeroes
- ✅ Search a 2D Matrix
- ✅ Valid Sudoku
- ✅ Flood Fill
- ✅ Surrounded Regions

### ↩️ **Backtracking**
- ✅ Permutations
- ✅ Combinations
- ✅ Subsets
- ✅ Letter Combinations
- ✅ N-Queens
- ✅ Word Search

### 📈 **Dynamic Programming**
- ✅ Fibonacci Number
- ✅ Climbing Stairs
- ✅ House Robber
- ✅ Coin Change
- ✅ Longest Increasing Subsequence
- ✅ 0/1 Knapsack
- ✅ Edit Distance
- ✅ Unique Paths
- ✅ Maximum Subarray
- ✅ Longest Common Subsequence
- ✅ Partition Equal Subset Sum

## 📋 To-Do List Tracker

### Prefix Sum
- [x] Range Sum Query - Immutable (Easy)
- [ ] Contiguous Array (Medium)
- [ ] Subarray Sum Equals K (Medium)

### Two Pointers
- [ ] Two Sum II - Input Array Is Sorted (Medium)
- [ ] 3Sum (Medium)
- [ ] Container With Most Water (Medium)

### Sliding Window
- [ ] Maximum Average Subarray I (Easy)
- [ ] Longest Substring Without Repeating Characters (Medium)
- [ ] Minimum Window Substring (Hard)

### Fast & Slow Pointers
- [ ] Linked List Cycle (Easy)
- [ ] Happy Number (Easy)
- [ ] Find the Duplicate Number (Medium)

### LinkedList In-place Reversal
- [ ] Reverse Linked List (Easy)
- [ ] Reverse Linked List II (Medium)
- [ ] Swap Nodes in Pairs (Medium)

### Monotonic Stack
- [ ] Next Greater Element I (Easy)
- [ ] Daily Temperatures (Medium)
- [ ] Largest Rectangle in Histogram (Hard)

### Top 'K' Elements
- [ ] Kth Largest Element in an Array (Medium)
- [ ] Top K Frequent Elements (Medium)
- [ ] Find K Pairs with Smallest Sums (Medium)

### Overlapping Intervals
- [ ] Merge Intervals (Medium)
- [ ] Insert Interval (Medium)
- [ ] Non-overlapping Intervals (Medium)

### Modified Binary Search
- [x] Search in Rotated Sorted Array (Medium)
- [x] Find Minimum in Rotated Sorted Array (Medium)
- [x] Search a 2D Matrix II (Medium)

### Binary Tree Traversal
- [x] Binary Tree Paths (Easy)
- [x] Kth Smallest Element in a BST (Medium)
- [x] Binary Tree Maximum Path Sum (Hard)

### Depth-First Search (DFS)
- [x] Clone Graph (Medium)
- [x] Path Sum II (Medium)
- [x] Course Schedule II (Medium)

### Breadth-First Search (BFS)
- [ ] Binary Tree Level Order Traversal (Medium)
- [ ] Rotting Oranges (Medium)
- [ ] Word Ladder (Hard)

### Matrix Traversal
- [x] Flood Fill (Easy)
- [ ] Number of Islands (Medium)
- [x] Surrounded Regions (Medium)

### Backtracking
- [ ] Permutations (Medium)
- [ ] Subsets (Medium)
- [ ] N-Queens (Hard)

### Dynamic Programming
- [ ] Climbing Stairs (Easy)
- [ ] House Robber (Medium)
- [ ] Coin Change (Medium)
- [x] Longest Common Subsequence (Medium)
- [ ] Longest Increasing Subsequence (Medium)
- [x] Partition Equal Subset Sum (Medium)

## 📊 Progress Tracking

**Total Problems:** 43  
**Completed:** 15  
**Easy:** 8 (3 completed)  
**Medium:** 29 (11 completed)  
**Hard:** 6 (1 completed)  

**Patterns Implemented:**
- ✅ Prefix Sum (1/3 problems)
- ✅ Binary Search (6/6 problems)
- ✅ Tree Traversal (5/5 problems)
- ✅ DFS (8/8 problems)
- ✅ BFS (4/4 problems)
- ✅ Matrix Traversal (7/7 problems)
- ✅ Backtracking (6/6 problems)
- ✅ Dynamic Programming (11/11 problems)

## 🎯 Study Strategy

1. **Pattern Recognition:** Focus on understanding the underlying patterns rather than memorizing solutions
2. **Progressive Difficulty:** Start with easy problems in each pattern before moving to harder ones
3. **Time Tracking:** Aim to solve easy problems in 15-20 minutes, medium in 25-35 minutes
4. **Review Cycle:** Revisit solved problems weekly to reinforce learning
5. **Implementation:** Write clean, well-tested TypeScript code for each solution

## Contributing

Feel free to contribute by:
- Adding new problem solutions
- Improving existing implementations
- Adding comprehensive test cases
- Updating documentation and progress tracking

## 🚀 Next Steps

The core algorithmic patterns have been implemented! To complete the study project:

1. **Add remaining patterns:**
   - Two Pointers
   - Sliding Window
   - Fast & Slow Pointers
   - LinkedList In-place Reversal
   - Monotonic Stack
   - Top 'K' Elements
   - Overlapping Intervals

2. **Create comprehensive test suites**
3. **Add performance benchmarking**
4. **Include complexity analysis for each solution**

## 🔗 Useful Links

### To-Do List Tracker
Here is a to-do list tracker for the Leetcode problems:

- [Range Sum Query - Immutable - LeetCode](https://leetcode.com/problems/range-sum-query-immutable/) (Not started, Easy, Prefix Sum)
- [Contiguous Array - LeetCode](https://leetcode.com/problems/contiguous-array/) (Not started, Medium, Prefix Sum)
- [Subarray Sum Equals K - LeetCode](https://leetcode.com/problems/subarray-sum-equals-k/) (Not started, Medium, Prefix Sum)
- [Two Sum II - Input Array Is Sorted - LeetCode](https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/) (Not started, Medium, Two Pointers)
- [3Sum - LeetCode](https://leetcode.com/problems/3sum/) (Not started, Medium, Two Pointers)
- [Container With Most Water - LeetCode](https://leetcode.com/problems/container-with-most-water/) (Not started, Medium, Two Pointers)
- [Maximum Average Subarray I - LeetCode](https://leetcode.com/problems/maximum-average-subarray-i/) (Not started, Easy, Sliding Window)
- [Longest Substring Without Repeating Characters - LeetCode](https://leetcode.com/problems/longest-substring-without-repeating-characters/) (Not started, Medium, Sliding Window)
- [Minimum Window Substring - LeetCode](https://leetcode.com/problems/minimum-window-substring/) (Not started, Hard, Sliding Window)
- [Linked List Cycle - LeetCode](https://leetcode.com/problems/linked-list-cycle/) (Not started, Easy, Fast & Slow Pointers)
- [Happy Number - LeetCode](https://leetcode.com/problems/happy-number/) (Not started, Easy, Fast & Slow Pointers)
- [Find the Duplicate Number - LeetCode](https://leetcode.com/problems/find-the-duplicate-number/) (Not started, Medium, Fast & Slow Pointers)
- [Reverse Linked List - LeetCode](https://leetcode.com/problems/reverse-linked-list/) (Not started, Easy, LinkedList In-place Reversal)
- [Reverse Linked List II - LeetCode](https://leetcode.com/problems/reverse-linked-list-ii/) (Not started, Medium, LinkedList In-place Reversal)
- [Swap Nodes in Pairs - LeetCode](https://leetcode.com/problems/swap-nodes-in-pairs/) (Not started, Medium, LinkedList In-place Reversal)
- [Next Greater Element I - LeetCode](https://leetcode.com/problems/next-greater-element-i/) (Not started, Easy, Monotonic Stack)
- [Daily Temperatures - LeetCode](https://leetcode.com/problems/daily-temperatures/) (Not started, Medium, Monotonic Stack)
- [Largest Rectangle in Histogram - LeetCode](https://leetcode.com/problems/largest-rectangle-in-histogram/) (Not started, Hard, Monotonic Stack)
- [Kth Largest Element in an Array - LeetCode](https://leetcode.com/problems/kth-largest-element-in-an-array/) (Not started, Medium, Top 'K' Elements)
- [Top K Frequent Elements - LeetCode](https://leetcode.com/problems/top-k-frequent-elements/) (Not started, Medium, Top 'K' Elements)
- [Find K Pairs with Smallest Sums - LeetCode](https://leetcode.com/problems/find-k-pairs-with-smallest-sums/) (Not started, Medium, Top 'K' Elements)
- [Merge Intervals - LeetCode](https://leetcode.com/problems/merge-intervals/) (Not started, Medium, Overlapping Intervals)
- [Insert Interval - LeetCode](https://leetcode.com/problems/insert-interval/) (Not started, Medium, Overlapping Intervals)
- [Non-overlapping Intervals - LeetCode](https://leetcode.com/problems/non-overlapping-intervals/) (Not started, Medium, Overlapping Intervals)

### Pattern Reference
- [Mastering 15 Common Patterns in LeetCode Problems](https://blog.ibsanju.com/blog/mastering-15-common-patterns-in-leetcode-problems)