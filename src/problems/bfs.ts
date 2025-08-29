/**
 * Breadth-First Search (BFS) implementations
 * 
 * Pattern: Explore level by level using a queue
 * Applications: Shortest path, level order traversal, connected components
 * 
 * Example: A BFS traversal of this tree:
 *      1
 *     / \
 *    2   3
 *   / \   \
 *  4   5   6
 * 
 * Would visit nodes in order: 1, 2, 3, 4, 5, 6
 */

import { TreeNode } from './treeTraversal';

/**
 * Binary Tree Right Side View - Return rightmost nodes at each level
 * @param root - Root of the binary tree
 * @returns Array of rightmost values at each level
 * 
 * Example:
 *    1
 *   / \
 *  2   3
 *   \   \
 *    5   4
 * 
 * Output: [1, 3, 4] (rightmost nodes at each level)
 */
export function rightSideView(root: TreeNode | null): number[] {
    if (!root) return [];    // Handle empty tree case

    const result: number[] = [];       // Store rightmost node values
    const queue: TreeNode[] = [root];  // Initialize queue with root node

    while (queue.length > 0) {    // Continue until queue is empty
        const levelSize = queue.length;    // Number of nodes at current level

        // Process all nodes at current level
        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift()!;   // Remove node from front of queue

            // If this is the rightmost node at this level, add to result
            if (i === levelSize - 1) {
                result.push(node.val);
            }

            // Add children to queue for next level (left to right)
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
    }

    return result;    // Return array of rightmost values
}

/**
 * Problem #994: Rotting Oranges (Medium)
 * 
 * Given a grid of oranges, each cell is 0 (empty), 1 (fresh), or 2 (rotten).
 * Each minute, fresh oranges adjacent to rotten ones become rotten.
 * Return the minimum minutes until all oranges are rotten, or -1 if impossible.
 * 
 * Approach:
 * - Use BFS from all initially rotten oranges.
 * - Track minutes and count fresh oranges.
 * - If any fresh oranges remain at the end, return -1.
 * 
 * Example:
 * Input: [[2,1,1],[1,1,0],[0,1,1]]
 * Output: 4
 * Explanation: All oranges rot in 4 minutes.
 */
export function orangesRotting(grid: number[][]): number {
    if (grid.length === 0 || grid[0].length === 0) return 0; // Edge case: empty grid

    const rows = grid.length;
    const cols = grid[0].length;
    const queue: [number, number, number][] = [];            // [row, col, minute]
    let freshCount = 0;                                      // Count of fresh oranges

    // Find all rotten oranges and count fresh oranges
    // Example: grid = [[2,1,1],[1,1,0],[0,1,1]]
    // queue after loop: [[0,0,0]] (rotten at (0,0)), freshCount = 5
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (grid[r][c] === 2) {
                queue.push([r, c, 0]);                       // Start BFS from rotten orange
            } else if (grid[r][c] === 1) {
                freshCount++;                                // Count fresh oranges
            }
        }
    }

    let maxMinutes = 0;
    const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];   // Right, Down, Left, Up

    // BFS to rot oranges
    // Example: minute 0, rotten at (0,0); minute 1, rot (0,1) and (1,0); minute 2, rot (0,2), (1,1); etc.
    while (queue.length > 0) {
        const [row, col, minute] = queue.shift()!;
        maxMinutes = Math.max(maxMinutes, minute);           // Track max minutes

        for (const [dr, dc] of directions) {                 // Check all 4 directions
            const newRow = row + dr;
            const newCol = col + dc;

            // If in bounds and fresh orange found
            if (
                newRow >= 0 && newRow < rows &&
                newCol >= 0 && newCol < cols &&
                grid[newRow][newCol] === 1
            ) {
                grid[newRow][newCol] = 2;                    // Rot the orange
                freshCount--;                                // Decrement fresh count
                queue.push([newRow, newCol, minute + 1]);    // Add to queue for next minute
                // Example: minute 1, rot (0,1); minute 2, rot (0,2), etc.
            }
        }
    }

    // If any fresh oranges remain, return -1 (not all can rot)
    // Example: returns 4 if all rot, -1 if some remain
    return freshCount > 0 ? -1 : maxMinutes;
    // For grid [[2,1,1],[1,1,0],[0,1,1]], returns 4
}

/**
 * Solution for "Word Ladder" - LeetCode #127  (Hard)
 * 
 * Problem: Given two words beginWord and endWord, and a dictionary wordList,
 * find the length of shortest transformation sequence from beginWord to endWord.
 * 
 * Approach:
 * - Use BFS to find shortest path from beginWord to endWord.
 * - For each word, try changing each character to all possible letters.
 * - Track visited words to avoid cycles.
 * 
 * Time Complexity: O(N * M^2) where N is dictionary size, M is word length
 * Space Complexity: O(N * M)
 * 
 * Example:
 * Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]
 * Output: 5
 * Explanation: The transformation sequence is "hit" -> "hot" -> "dot" -> "dog" -> "cog"
 */
export function ladderLength(beginWord: string, endWord: string, wordList: string[]): number {
    if (!wordList.includes(endWord)) return 0;               // If endWord not in wordList, no solution

    const wordSet = new Set(wordList);                       // Set for O(1) lookups
    const queue: [string, number][] = [[beginWord, 1]];      // BFS queue: [word, level]
    const visited = new Set<string>([beginWord]);            // Track visited words

    while (queue.length > 0) {
        const [word, level] = queue.shift()!;                // Get current word and transformation level

        for (let i = 0; i < word.length; i++) {              // Try changing each character
            for (let c = 97; c <= 122; c++) {                // ASCII 'a' to 'z'
                const newChar = String.fromCharCode(c);
                const newWord = word.slice(0, i) + newChar + word.slice(i + 1);

                if (newWord === endWord) return level + 1;   // Found endWord, return transformation length

                if (wordSet.has(newWord) && !visited.has(newWord)) {
                    visited.add(newWord);                    // Mark as visited
                    queue.push([newWord, level + 1]);        // Add to queue for next level
                }
            }
        }
    }

    return 0;                                                // No transformation sequence found
    // Example: returns 5 for "hit" -> "hot" -> "dot" -> "dog" -> "cog"
}

/**
 * Solution for "Shortest Path in Binary Matrix" - LeetCode #1091
 * 
 * Problem: Given an n x n binary matrix grid, return the length of the shortest clear path from top-left to bottom-right.
 * A clear path is a path that only goes through 0 cells (not 1).
 * You can move in 8 directions: horizontally, vertically, or diagonally.
 * 
 * Approach: BFS
 * - Use BFS to find shortest path
 * - Check all 8 directions for each cell
 * - Mark visited cells to avoid cycles
 * 
 * Time Complexity: O(n^2)
 * Space Complexity: O(n^2)
 * 
 * Example:
 * Input: grid = [[0,1],[1,0]]
 * Output: 2
 * Explanation: Path: (0,0) -> (1,1)
 */
export function shortestPathBinaryMatrix(grid: number[][]): number {
    const n = grid.length;

    // If start or end is blocked, no path exists
    if (grid[0][0] === 1 || grid[n - 1][n - 1] === 1) return -1;

    // BFS queue with [row, col, distance]
    const queue: [number, number, number][] = [[0, 0, 1]];

    // Mark start cell as visited
    grid[0][0] = 1;

    // All 8 directions: right, right-down, down, left-down, left, left-up, up, right-up
    const directions = [
        [0, 1], [1, 1], [1, 0], [1, -1],
        [0, -1], [-1, -1], [-1, 0], [-1, 1]
    ];

    while (queue.length > 0) {
        const [row, col, distance] = queue.shift()!;

        // If we reached the bottom-right, return the distance
        if (row === n - 1 && col === n - 1) return distance;

        // Try all 8 directions
        for (const [dr, dc] of directions) {
            const newRow = row + dr;
            const newCol = col + dc;

            // Check bounds and if cell is clear
            if (
                newRow >= 0 && newRow < n &&
                newCol >= 0 && newCol < n &&
                grid[newRow][newCol] === 0
            ) {
                grid[newRow][newCol] = 1;  // Mark as visited
                queue.push([newRow, newCol, distance + 1]);
            }
        }
    }

    return -1;  // No path found
}
        }
    }

return -1;
}
