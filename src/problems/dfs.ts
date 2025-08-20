/**
 * Depth-First Search (DFS) implementations
 * 
 * Pattern: Explore as far as possible before backtracking
 * Applications: Tree/graph traversal, path finding, cycle detection
 */

import { TreeNode } from './treeTraversal';

/**
 * Maximum Depth of Binary Tree
 * @param root - Root of the binary tree
 * @returns Maximum depth of the tree
 */
export function maxDepth(root: TreeNode | null): number {
    if (!root) return 0;

    const leftDepth = maxDepth(root.left);
    const rightDepth = maxDepth(root.right);

    return Math.max(leftDepth, rightDepth) + 1;
}

/**
 * Path Sum - Check if there's a path from root to leaf with given sum
 * @param root - Root of the binary tree
 * @param targetSum - Target sum to find
 * @returns True if path exists, false otherwise
 */
export function hasPathSum(root: TreeNode | null, targetSum: number): boolean {
    if (!root) return false;

    // If it's a leaf node, check if the value equals remaining sum
    if (!root.left && !root.right) {
        return root.val === targetSum;
    }

    // Recursively check left and right subtrees with updated sum
    const remainingSum = targetSum - root.val;
    return hasPathSum(root.left, remainingSum) || hasPathSum(root.right, remainingSum);
}

/**
 * All Paths From Source to Target (Graph DFS)
 * @param graph - Adjacency list representation of directed acyclic graph
 * @returns All paths from node 0 to node n-1
 */
export function allPathsSourceTarget(graph: number[][]): number[][] {
    const result: number[][] = [];
    const target = graph.length - 1;

    const dfs = (node: number, path: number[]): void => {
        if (node === target) {
            result.push([...path]);
            return;
        }

        for (const neighbor of graph[node]) {
            path.push(neighbor);
            dfs(neighbor, path);
            path.pop(); // Backtrack
        }
    };

    dfs(0, [0]);
    return result;
}

/**
 * Number of Islands (2D Grid DFS)
 * @param grid - 2D grid of '1's (land) and '0's (water)
 * @returns Number of islands
 */
export function numIslands(grid: string[][]): number {
    if (!grid || grid.length === 0) return 0;

    const rows = grid.length;
    const cols = grid[0].length;
    let islands = 0;

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

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (grid[row][col] === '1') {
                islands++;
                dfs(row, col); // Mark entire island as visited
            }
        }
    }

    return islands;
}

/**
 * Course Schedule (Cycle Detection in Directed Graph)
 * @param numCourses - Number of courses
 * @param prerequisites - Array of prerequisite pairs [course, prerequisite]
 * @returns True if all courses can be finished, false otherwise
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
 * Node class for undirected graph
 */
export class GraphNode {
    val: number;
    neighbors: GraphNode[];

    constructor(val?: number, neighbors?: GraphNode[]) {
        this.val = val === undefined ? 0 : val;
        this.neighbors = neighbors === undefined ? [] : neighbors;
    }
}

/**
 * Clone Graph - Deep clone an undirected graph
 * @param node - Starting node of the graph
 * @returns Deep copy of the graph starting from given node
 */
export function cloneGraph(node: GraphNode | null): GraphNode | null {
    if (!node) return null;

    const visited = new Map<GraphNode, GraphNode>();

    const dfs = (originalNode: GraphNode): GraphNode => {
        // If already cloned, return the clone
        if (visited.has(originalNode)) {
            return visited.get(originalNode)!;
        }

        // Create clone of current node
        const cloneNode = new GraphNode(originalNode.val);
        visited.set(originalNode, cloneNode);

        // Clone all neighbors
        for (const neighbor of originalNode.neighbors) {
            cloneNode.neighbors.push(dfs(neighbor));
        }

        return cloneNode;
    };

    return dfs(node);
}

/**
 * Path Sum II - Find all root-to-leaf paths with given sum
 * @param root - Root of the binary tree
 * @param targetSum - Target sum to find
 * @returns All root-to-leaf paths that sum to targetSum
 */
export function pathSum(root: TreeNode | null, targetSum: number): number[][] {
    const result: number[][] = [];

    const dfs = (node: TreeNode | null, remainingSum: number, path: number[]): void => {
        if (!node) return;

        // Add current node to path
        path.push(node.val);

        // Check if it's a leaf and sum matches
        if (!node.left && !node.right && remainingSum === node.val) {
            result.push([...path]); // Add copy of current path
        }

        // Continue DFS with updated sum
        const newRemainingSum = remainingSum - node.val;
        dfs(node.left, newRemainingSum, path);
        dfs(node.right, newRemainingSum, path);

        // Backtrack
        path.pop();
    };

    dfs(root, targetSum, []);
    return result;
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