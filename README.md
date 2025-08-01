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
   ```
   git clone <repository-url>
   cd my-leetcode-test
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Compile TypeScript:**
   ```
   npm run build
   ```

4. **Run tests:**
   ```
   npm test
   ```

## Usage

- To start the application, run:
  ```
  npm start
  ```

- The application can be extended by adding more pattern solutions in `src/problems/` and corresponding tests in `tests/problems/`.

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