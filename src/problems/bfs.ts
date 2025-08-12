/**
 * Breadth-First Search (BFS) implementations
 * 
 * Pattern: Explore all neighbors at current depth before moving to next level
 * Applications: Shortest path, level-order traversal, minimum operations
 */

import { TreeNode } from './treeTraversal';

/**
 * Binary Tree Right Side View
 * @param root - Root of the binary tree
 * @returns Array of values visible from right side
 */
export function rightSideView(root: TreeNode | null): number[] {
    if (!root) return [];

    const result: number[] = [];
    const queue: TreeNode[] = [root];

    while (queue.length > 0) {
        const levelSize = queue.length;

        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift()!;

            // Add the rightmost node of each level
            if (i === levelSize - 1) {
                result.push(node.val);
            }

            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
    }

    return result;
}

/**
 * Rotting Oranges - Minimum time for all oranges to rot
 * @param grid - 2D grid where 0=empty, 1=fresh orange, 2=rotten orange
 * @returns Minimum minutes for all oranges to rot, -1 if impossible
 */
export function orangesRotting(grid: number[][]): number {
    if (!grid || grid.length === 0 || grid[0].length === 0) return 0;
    const rows = grid.length;
    const cols = grid[0].length;

    const queue: [number, number][] = [];
    let freshOranges = 0;

    // Find all rotten oranges and count fresh ones
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (grid[row][col] === 2) {
                queue.push([row, col]);
            } else if (grid[row][col] === 1) {
                freshOranges++;
            }
        }
    }

    if (freshOranges === 0) return 0;

    const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
    let minutes = 0;

    while (queue.length > 0 && freshOranges > 0) {
        const levelSize = queue.length;

        for (let i = 0; i < levelSize; i++) {
            const [row, col] = queue.shift()!;

            // Check all 4 directions
            for (const [dr, dc] of directions) {
                const newRow = row + dr;
                const newCol = col + dc;

                if (newRow >= 0 && newRow < rows &&
                    newCol >= 0 && newCol < cols &&
                    grid[newRow][newCol] === 1) {

                    grid[newRow][newCol] = 2; // Make it rotten
                    freshOranges--;
                    queue.push([newRow, newCol]);
                }
            }
        }

        minutes++;
    }

    return freshOranges === 0 ? minutes : -1;
}

/**
 * Word Ladder - Minimum transformations to reach target word
 * @param beginWord - Starting word
 * @param endWord - Target word
 * @param wordList - List of valid words
 * @returns Minimum number of transformations, 0 if impossible
 */
export function ladderLength(beginWord: string, endWord: string, wordList: string[]): number {
    const wordSet = new Set(wordList);
    if (!wordSet.has(endWord)) return 0;

    const queue: [string, number][] = [[beginWord, 1]];
    const visited = new Set<string>();
    visited.add(beginWord);

    while (queue.length > 0) {
        const [word, level] = queue.shift()!;

        if (word === endWord) return level;

        // Try changing each character
        for (let i = 0; i < word.length; i++) {
            for (let c = 0; c < 26; c++) {
                const char = String.fromCharCode(97 + c); // 'a' to 'z'
                const newWord = word.slice(0, i) + char + word.slice(i + 1);

                if (wordSet.has(newWord) && !visited.has(newWord)) {
                    visited.add(newWord);
                    queue.push([newWord, level + 1]);
                }
            }
        }
    }

    return 0;
}

/**
 * Shortest Path in Binary Matrix
 * @param grid - Binary matrix where 0 represents open cell
 * @returns Length of shortest path from top-left to bottom-right, -1 if no path
 */
export function shortestPathBinaryMatrix(grid: number[][]): number {
    const n = grid.length;

    if (grid[0][0] === 1 || grid[n - 1][n - 1] === 1) return -1;
    if (n === 1) return 1;

    const directions = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1], [0, 1],
        [1, -1], [1, 0], [1, 1]
    ];

    const queue: [number, number, number][] = [[0, 0, 1]]; // [row, col, distance]
    const visited = new Set<string>();
    visited.add('0,0');

    while (queue.length > 0) {
        const [row, col, dist] = queue.shift()!;

        if (row === n - 1 && col === n - 1) return dist;

        for (const [dr, dc] of directions) {
            const newRow = row + dr;
            const newCol = col + dc;
            const key = `${newRow},${newCol}`;

            if (newRow >= 0 && newRow < n &&
                newCol >= 0 && newCol < n &&
                grid[newRow][newCol] === 0 &&
                !visited.has(key)) {

                visited.add(key);
                queue.push([newRow, newCol, dist + 1]);
            }
        }
    }

    return -1;
}
