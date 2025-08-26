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
 * Solution for "Rotting Oranges" - LeetCode #994
 * 
 * Problem: Given a grid where each cell is one of three values:
 * 0: empty cell, 1: fresh orange, 2: rotten orange
 * Every minute, any fresh orange adjacent to a rotten orange becomes rotten.
 * Return the minimum number of minutes until no cell has a fresh orange.
 * If impossible, return -1.
 * 
 * Approach: BFS
 * - Start BFS from all initially rotten oranges
 * - Each level of BFS represents one minute
 * - Count fresh oranges initially and decrement when they rot
 * - If any fresh oranges remain at the end, return -1
 * 
 * Time Complexity: O(m * n)
 * Space Complexity: O(m * n)
 * 
 * Example:
 * Input: [[2,1,1],[1,1,0],[0,1,1]]
 * Output: 4
 */
export function orangesRotting(grid: number[][]): number {
    if (grid.length === 0 || grid[0].length === 0) return 0;

    const rows = grid.length;
    const cols = grid[0].length;
    const queue: [number, number, number][] = [];  // [row, col, minute]
    let freshCount = 0;    // Count of fresh oranges

    // Find all rotten oranges and count fresh oranges
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (grid[r][c] === 2) {
                queue.push([r, c, 0]);  // Start BFS from each rotten orange
            } else if (grid[r][c] === 1) {
                freshCount++;
            }
        }
    }

    let maxMinutes = 0;
    const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];  // Right, Down, Left, Up

    // BFS to rot oranges
    while (queue.length > 0) {
        const [row, col, minute] = queue.shift()!;
        maxMinutes = Math.max(maxMinutes, minute);

        // Check all 4 directions
        for (const [dr, dc] of directions) {
            const newRow = row + dr;
            const newCol = col + dc;

            // Check bounds and if orange is fresh
            if (
                newRow >= 0 && newRow < rows &&
                newCol >= 0 && newCol < cols &&
                grid[newRow][newCol] === 1
            ) {
                grid[newRow][newCol] = 2;  // Mark as rotten
                freshCount--;
                queue.push([newRow, newCol, minute + 1]);
            }
        }
    }

    // If any fresh oranges remain, it's impossible to rot all oranges
    return freshCount > 0 ? -1 : maxMinutes;
}

/**
 * Solution for "Word Ladder" - LeetCode #127
 * 
 * Problem: Given two words beginWord and endWord, and a dictionary wordList,
 * find the length of shortest transformation sequence from beginWord to endWord.
 * 
 * Approach: BFS
 * - For each word, try changing each character to find valid transformations
 * - Use BFS to ensure shortest path
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
    // If endWord is not in wordList, no transformation is possible
    if (!wordList.includes(endWord)) return 0;

    // Convert wordList to a Set for O(1) lookups
    const wordSet = new Set(wordList);

    // BFS queue with [word, level]
    const queue: [string, number][] = [[beginWord, 1]];
    const visited = new Set<string>([beginWord]);

    while (queue.length > 0) {
        const [word, level] = queue.shift()!;

        // Try changing each character of the word
        for (let i = 0; i < word.length; i++) {
            // Try each letter from a to z
            for (let c = 97; c <= 122; c++) {  // ASCII 'a' to 'z'
                const newChar = String.fromCharCode(c);
                const newWord = word.slice(0, i) + newChar + word.slice(i + 1);

                // If we found the endWord, return the level + 1
                if (newWord === endWord) return level + 1;

                // If this is a valid word and we haven't visited it, add to queue
                if (wordSet.has(newWord) && !visited.has(newWord)) {
                    visited.add(newWord);
                    queue.push([newWord, level + 1]);
                }
            }
        }
    }

    return 0;  // No transformation sequence found
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
