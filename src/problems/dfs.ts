/**
 * Depth-First Search (DFS) implementations
 * 
 * Pattern: Explore as far as possible before backtracking
 * Applications: Tree/graph traversal, path finding, cycle detection
 * 
 * Example: A DFS traversal of this tree:
 *      1
 *     / \
 *    2   3
 *   / \   \
 *  4   5   6
 * 
 * Would visit nodes in order: 1, 2, 4, 5, 3, 6
 */

/**
 * Definition for a binary tree node
 */
export class TreeNode {
    val: number;    // Value stored in the node
    left: TreeNode | null;    // Reference to left child node
    right: TreeNode | null;   // Reference to right child node
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = (val === undefined ? 0 : val);    // Initialize node value, default to 0
        this.left = (left === undefined ? null : left);    // Initialize left child, default to null
        this.right = (right === undefined ? null : right);   // Initialize right child, default to null
    }
}

/**
 * Problem #104: Maximum Depth of Binary Tree (Easy)
 * 
 * Given a binary tree, find its maximum depth.
 * Approach:
 * - Use recursion to compute the depth of left and right subtrees.
 * - The depth of the tree is max(leftDepth, rightDepth) + 1.
 * 
 * Example:
 * Input: [3,9,20,null,null,15,7]
 * Tree:
 *      3
 *     / \
 *    9  20
 *       / \
 *      15  7
 * Output: 3
 */
export function maxDepth(root: TreeNode | null): number {
    if (!root) return 0;                        // Base case: empty tree has depth 0
    const leftDepth = maxDepth(root.left);      // Recursively get depth of left subtree
    const rightDepth = maxDepth(root.right);    // Recursively get depth of right subtree
    return Math.max(leftDepth, rightDepth) + 1; // Depth is max of left/right + 1 for current node
    // Example: leftDepth=1 (for 9), rightDepth=2 (for 20 subtree), so return 3
}


/**
 * Problem #112: Path Sum (Easy)
 * 
 * Given a binary tree and a sum, check if the tree has a root-to-leaf path with that sum.
 * Approach:
 * - Recursively subtract node values from target sum.
 * - If at a leaf node and remaining sum equals node value, return true.
 * 
 * Example:
 * Input: root = [5,4,8,11,null,13,4,7,2,null,null,null,1], sum = 22
 * Path: 5->4->11->2 = 22
 * Output: true
 */
export function hasPathSum(root: TreeNode | null, targetSum: number): boolean {
    if (!root) return false;                    // Base case: empty tree has no path
    if (!root.left && !root.right) {            // Leaf node
        return root.val === targetSum;          // Check if leaf value matches remaining sum
        // Example: at node 2, targetSum=2, return true
    }
    const remainingSum = targetSum - root.val;  // Subtract current node value from sum
    // Example: at node 5, targetSum=22, remainingSum=17
    return hasPathSum(root.left, remainingSum) || hasPathSum(root.right, remainingSum);
    // Recursively check left and right subtrees
}

/**
 * All Paths From Source to Target (Graph DFS)
 * @param graph - Adjacency list representation of directed acyclic graph
 * @returns All paths from node 0 to node n-1
 * 
 * Example:
 * Input: graph = [[1,2],[3],[3],[]]
 * Output: [[0,1,3],[0,2,3]]
 * Explanation: There are two paths from vertex 0 to vertex 3:
 * 0 -> 1 -> 3
 * 0 -> 2 -> 3
 */
export function allPathsSourceTarget(graph: number[][]): number[][] {
    const result: number[][] = [];    // Array to store all valid paths
    const target = graph.length - 1;    // Target node is the last node (n-1)

    const dfs = (node: number, path: number[]): void => {    // DFS helper function
        if (node === target) {    // Base case: reached target node
            result.push([...path]);    // Add a copy of current path to results
            return;    // Stop exploring this path
        }

        for (const neighbor of graph[node]) {    // Iterate through neighbors of current node
            path.push(neighbor);    // Add neighbor to current path
            dfs(neighbor, path);    // Recursively explore from this neighbor
            path.pop();    // Backtrack: remove neighbor from path after exploration
        }
    };

    dfs(0, [0]);    // Start DFS from node 0 with initial path containing just node 0
    return result;    // Return all valid paths found
}

/**
 * Solution for "Number of Islands" - LeetCode #200
 * 
 * Problem: Given a 2D grid of '1's (land) and '0's (water), count the number of islands.
 * An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.
 * 
 * Approach: Depth-First Search (DFS)
 * - Iterate through each cell in the grid
 * - When we find a land cell ('1'), increment island count and use DFS to mark all connected land as visited
 * - Mark visited cells by changing '1' to '0' to avoid counting the same island multiple times
 * 
 * Time Complexity: O(m * n) where m is number of rows and n is number of columns
 * Space Complexity: O(m * n) in worst case for the recursion stack
 * 
 * Example:
 * Input: grid = [
 *   ["1","1","0","0","0"],
 *   ["1","1","0","0","0"],
 *   ["0","0","1","0","0"],
 *   ["0","0","0","1","1"]
 * ]
 * Output: 3
 */
export function numIslands(grid: string[][]): number {
    if (!grid || grid.length === 0) return 0;        // Edge case: empty grid

    const rows = grid.length;                        // Number of rows in the grid
    const cols = grid[0].length;                     // Number of columns in the grid
    let count = 0;                                   // Counter for number of islands

    // Helper function to perform DFS from a land cell
    const dfs = (r: number, c: number): void => {
        // Base case: out of bounds or not land
        if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] === '0') {
            return;
        }

        grid[r][c] = '0';                            // Mark current cell as visited

        // Explore all 4 directions (up, right, down, left)
        dfs(r - 1, c);                               // Up
        dfs(r, c + 1);                               // Right
        dfs(r + 1, c);                               // Down
        dfs(r, c - 1);                               // Left
    };

    // Iterate through each cell in the grid
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (grid[r][c] === '1') {                // Found an unvisited land cell
                count++;                             // Found a new island
                dfs(r, c);                           // Mark the entire island as visited
            }
        }
    }

    return count;                                    // Return the total number of islands
}

/**
 * Solution for "Course Schedule" - LeetCode #207
 * 
 * Problem: Given the number of courses and a list of prerequisite pairs, determine if you can finish all courses.
 * 
 * Approach: DFS Cycle Detection
 * - Build a directed graph from prerequisites.
 * - Use DFS to detect cycles (if a cycle exists, it's impossible to finish all courses).
 * - Mark nodes as unvisited (0), visiting (1), or visited (2).
 * 
 * Time Complexity: O(V + E)
 * Space Complexity: O(V)
 * 
 * Example:
 * Input: numCourses = 2, prerequisites = [[1,0]]
 * Output: true
 * Explanation: Take course 0 first, then course 1.
 * 
 * Input: numCourses = 2, prerequisites = [[1,0],[0,1]]
 * Output: false
 * Explanation: Cycle exists, cannot finish all courses.
 */
export function canFinish(numCourses: number, prerequisites: number[][]): boolean {
    // Build adjacency list
    const graph: number[][] = Array(numCourses).fill(null).map(() => []);
    for (const [course, prereq] of prerequisites) {
        graph[prereq].push(course);
    }

    // 0: unvisited, 1: visiting, 2: visited
    const state: number[] = Array(numCourses).fill(0);

    const hasCycle = (node: number): boolean => {
        if (state[node] === 1) return true;  // Cycle detected
        if (state[node] === 2) return false; // Already processed

        state[node] = 1; // Mark as visiting

        for (const neighbor of graph[node]) {
            if (hasCycle(neighbor)) return true;
        }

        state[node] = 2; // Mark as visited
        return false;
    };

    for (let i = 0; i < numCourses; i++) {
        if (state[i] === 0 && hasCycle(i)) {
            return false;
        }
    }

    return true;
}

/**
 * Node class for graph representation
 */
export class Node {
    val: number;
    neighbors: Node[];
    constructor(val?: number, neighbors?: Node[]) {
        this.val = (val === undefined ? 0 : val);
        this.neighbors = (neighbors === undefined ? [] : neighbors);
    }
}

/**
 * Solution for "Clone Graph" - LeetCode #133
 * 
 * Problem: Given a reference of a node in a connected undirected graph, 
 * return a deep copy (clone) of the graph.
 * 
 * Approach: Depth-First Search (DFS) with HashMap
 * - Use a map to keep track of nodes we've already cloned
 * - For each node, create a clone and recursively clone its neighbors
 * 
 * Time Complexity: O(n + e) where n is number of nodes and e is number of edges
 * Space Complexity: O(n) for the visited map and recursion stack
 * 
 * Example:
 * Input: adjList = [[2,4],[1,3],[2,4],[1,3]]
 * Output: [[2,4],[1,3],[2,4],[1,3]]
 * Explanation: The graph has 4 nodes where node 1's neighbors are nodes 2 and 4,
 * node 2's neighbors are nodes 1 and 3, and so on.
 */
export function cloneGraph(node: Node | null): Node | null {
    if (!node) return null;                          // Edge case: empty graph returns null

    const visited = new Map<number, Node>();         // Map to track already cloned nodes

    // Helper function to perform DFS and clone nodes
    const dfs = (originalNode: Node): Node => {
        if (visited.has(originalNode.val)) {         // If already cloned, return the clone
            return visited.get(originalNode.val)!;
        }
        const cloneNode = new Node(originalNode.val);    // Create a new node with same value
        visited.set(originalNode.val, cloneNode);    // Add mapping from original to clone

        for (const neighbor of originalNode.neighbors) { // Clone all neighbors recursively
            cloneNode.neighbors.push(dfs(neighbor)); // Add cloned neighbor to neighbors list
        }
        return cloneNode;                           // Return the fully cloned node
    };

    return dfs(node);                               // Start DFS from the input node
    // Example: Input node 1, returns a new node 1 with cloned neighbors [2,4], etc.
}

/**
 * Solution for "Path Sum II" - LeetCode #113
 * 
 * Problem: Given the root of a binary tree and an integer targetSum, 
 * return all root-to-leaf paths where the sum of the node values equals targetSum.
 * 
 * Approach: Depth-First Search (DFS) with Backtracking
 * - Use DFS to explore all paths from root to leaf
 * - Keep track of current path and sum
 * - When reaching a leaf node, check if sum matches target
 * 
 * Time Complexity: O(n^2) where n is number of nodes (worst case for a skewed tree with all paths matching)
 * Space Complexity: O(h) where h is the height of the tree
 * 
 * Example:
 * Input: root = [5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum = 22
 * Output: [[5,4,11,2],[5,8,4,5]]
 */
export function pathSum(root: TreeNode | null, targetSum: number): number[][] {
    const result: number[][] = [];                  // Store all valid paths

    // Helper function to perform DFS
    const dfs = (node: TreeNode | null, remaining: number, path: number[]): void => {
        if (!node) return;                          // Base case: null node

        path.push(node.val);                        // Add current node to path

        // Check if it's a leaf node and sum matches target
        if (!node.left && !node.right && remaining === node.val) {
            result.push([...path]);                 // Add a copy of the path to result
        }

        // Continue DFS on left and right subtrees
        const newRemaining = remaining - node.val;  // Subtract current value from remaining sum
        dfs(node.left, newRemaining, path);         // Explore left subtree
        dfs(node.right, newRemaining, path);        // Explore right subtree

        path.pop();                                 // Backtrack: remove current node from path
    };

    dfs(root, targetSum, []);                       // Start DFS from the root
    return result;                                  // Return all valid paths
}

/**
 * Course Schedule II - Return course order or empty array if impossible
 * @param numCourses - Number of courses
 * @param prerequisites - Array of prerequisite pairs [course, prerequisite]
 * @returns Course order array, or empty array if impossible
 */
export function findOrder(numCourses: number, prerequisites: number[][]): number[] {
    // Build adjacency list
    const graph: number[][] = Array(numCourses).fill(null).map(() => []);
    for (const [course, prereq] of prerequisites) {
        graph[prereq].push(course);
    }

    // 0: unvisited, 1: visiting, 2: visited
    const state: number[] = Array(numCourses).fill(0);
    const result: number[] = [];

    const dfs = (course: number): boolean => {
        if (state[course] === 1) return false; // Cycle detected
        if (state[course] === 2) return true;  // Already processed

        state[course] = 1; // Mark as visiting

        // Visit all dependent courses
        for (const nextCourse of graph[course]) {
            if (!dfs(nextCourse)) return false;
        }

        state[course] = 2; // Mark as visited
        result.push(course); // Add to result in reverse topological order
        return true;
    };

    // Try to process all courses
    for (let i = 0; i < numCourses; i++) {
        if (state[i] === 0 && !dfs(i)) {
            return []; // Cycle detected
        }
    }

    return result.reverse(); // Reverse to get correct topological order
}

/**
 * Depth-First Search (DFS) on a directed/undirected graph (adjacency list)
 * Recursive implementation
 * @param graph - Adjacency list where graph[u] is neighbors of u
 * @param start - Start node index
 * @returns Visit order of nodes
 */
export function dfsGraphRecursive(graph: number[][], start: number): number[] {
    const n = graph.length;
    if (start < 0 || start >= n) return [];

    const visited: boolean[] = Array(n).fill(false);
    const order: number[] = [];

    const dfs = (u: number): void => {
        visited[u] = true;
        order.push(u);
        for (const v of graph[u]) {
            if (!visited[v]) dfs(v);
        }
    };

    dfs(start);
    return order;
}

/**
 * Depth-First Search (DFS) on a directed/undirected graph (adjacency list)
 * Iterative implementation using a stack
 * @param graph - Adjacency list where graph[u] is neighbors of u
 * @param start - Start node index
 * @returns Visit order of nodes
 */
export function dfsGraphIterative(graph: number[][], start: number): number[] {
    const n = graph.length;
    if (start < 0 || start >= n) return [];

    const visited: boolean[] = Array(n).fill(false);
    const order: number[] = [];
    const stack: number[] = [start];

    while (stack.length) {
        const u = stack.pop()!;
        if (visited[u]) continue;
        visited[u] = true;
        order.push(u);

        // Push neighbors in reverse to approximate recursive order
        const neighbors = graph[u];
        for (let i = neighbors.length - 1; i >= 0; i--) {
            const v = neighbors[i];
            if (!visited[v]) stack.push(v);
        }
    }

    return order;
}

/**
 * Solution for "Surrounded Regions" - LeetCode #130
 * 
 * Problem: Given a 2D board containing 'X' and 'O', capture all regions surrounded by 'X'.
 * A region is captured by flipping all 'O's into 'X's in that surrounded region.
 * 
 * Approach: DFS from border 'O's
 * - Mark all 'O's connected to border as safe ('S')
 * - Flip all remaining 'O's to 'X', then revert 'S' to 'O'
 * 
 * Time Complexity: O(m * n)
 * Space Complexity: O(m * n)
 */
export function solve(board: string[][]): void {
    if (!board || board.length === 0 || board[0].length === 0) return;

    const rows = board.length;
    const cols = board[0].length;

    // DFS to mark safe 'O's
    const dfs = (r: number, c: number): void => {
        if (r < 0 || r >= rows || c < 0 || c >= cols || board[r][c] !== 'O') return;
        board[r][c] = 'S'; // Mark as safe
        dfs(r + 1, c);
        dfs(r - 1, c);
        dfs(r, c + 1);
        dfs(r, c - 1);
    };

    // Mark border-connected 'O's
    for (let r = 0; r < rows; r++) {
        dfs(r, 0);
        dfs(r, cols - 1);
    }
    for (let c = 0; c < cols; c++) {
        dfs(0, c);
        dfs(rows - 1, c);
    }

    // Flip surrounded 'O's to 'X', revert 'S' to 'O'
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (board[r][c] === 'O') {
                board[r][c] = 'X';
            } else if (board[r][c] === 'S') {
                board[r][c] = 'O';
            }
        }
    }
}

/**
 * Solution for "Word Search" - LeetCode #79
 * 
 * Problem: Given a 2D board and a word, return true if the word exists in the grid.
 * The word can be constructed from letters of sequentially adjacent cells, where "adjacent" cells are horizontally or vertically neighboring. The same letter cell may not be used more than once.
 * 
 * Approach: DFS + Backtracking
 * - For each cell, start DFS if it matches the first character
 * - Mark visited cells temporarily
 * - Backtrack if path does not lead to solution
 * 
 * Time Complexity: O(m * n * 4^L) where L is the length of the word
 * Space Complexity: O(L) (call stack)
 */
export function exist(board: string[][], word: string): boolean {
    const rows = board.length;
    const cols = board[0].length;

    const dfs = (r: number, c: number, idx: number): boolean => {
        if (idx === word.length) return true;
        if (
            r < 0 || r >= rows ||
            c < 0 || c >= cols ||
            board[r][c] !== word[idx]
        ) {
            return false;
        }

        // Mark as visited
        const temp = board[r][c];
        board[r][c] = '#';

        // Explore all 4 directions
        const found = dfs(r + 1, c, idx + 1) ||
            dfs(r - 1, c, idx + 1) ||
            dfs(r, c + 1, idx + 1) ||
            dfs(r, c - 1, idx + 1);

        board[r][c] = temp; // Backtrack

        return found;
    };

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (dfs(r, c, 0)) return true;
        }
    }

    return false;
}

/**
 * Solution for "Number of Islands" - LeetCode #200
 * 
 * Problem: Given a 2D grid of '1's (land) and '0's (water), count the number of islands.
 * An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.
 * 
 * Approach: DFS
 * - For each cell, start DFS if it's land ('1'), marking all connected land as visited ('0').
 * - Count each DFS call as a separate island.
 * 
 * Time Complexity: O(m * n)
 * Space Complexity: O(m * n) (call stack)
 * 
 * Example:
 * Input:
 * [
 *   ['1','1','0','0','0'],
 *   ['1','1','0','0','0'],
 *   ['0','0','1','0','0'],
 *   ['0','0','0','1','1']
 * ]
 * Output: 3
 */
export function numIslands2(grid: string[][]): number {
    if (!grid || grid.length === 0) return 0;

    const rows = grid.length;
    const cols = grid[0].length;
    let result = 0;

    // DFS to mark all connected land as visited
    const dfs = (row: number, col: number): void => {
        // Base case: out of bounds or water
        if (row < 0 || row >= rows || col < 0 || col >= cols || grid[row][col] === '0') {
            return;
        }

        // Mark current cell as visited
        grid[row][col] = '0';

        // Explore all 4 directions
        dfs(row + 1, col); // Down
        dfs(row - 1, col); // Up
        dfs(row, col + 1); // Right
        dfs(row, col - 1); // Left
    };

    // Iterate through grid, start DFS for each unvisited land cell
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (grid[row][col] === '1') {
                result++;
                dfs(row, col); // Mark entire island as visited
            }
        }
    }

    return result;
}