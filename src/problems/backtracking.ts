/**
 * Solution for "Permutations" - LeetCode #46
 * 
 * Problem: Given an array of distinct integers, return all possible permutations.
 * 
 * Approach: Backtracking
 * - Build permutations by choosing unused numbers recursively.
 * - Backtrack after each choice to explore all possibilities.
 * 
 * Time Complexity: O(n!)
 * Space Complexity: O(n * n!) (output)
 * 
 * Example:
 * Input: nums = [1,2,3]
 * Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
 */
export function permute(nums: number[]): number[][] {
    const result: number[][] = [];

    const backtrack = (current: number[]): void => {
        // Base case: permutation is complete
        if (current.length === nums.length) {
            result.push([...current]);
            return;
        }

        // Try each unused number
        for (const num of nums) {
            if (!current.includes(num)) {
                current.push(num);      // Choose
                backtrack(current);     // Explore
                current.pop();          // Backtrack
            }
        }
    };

    backtrack([]);
    return result;
}

/**
 * Generate all combinations of k numbers from 1 to n
 * @param n - Upper bound (inclusive)
 * @param k - Length of each combination
 * @returns All possible combinations
 */
export function combine(n: number, k: number): number[][] {
    const result: number[][] = [];

    const backtrack = (start: number, current: number[]): void => {
        // Base case: combination is complete
        if (current.length === k) {
            result.push([...current]);
            return;
        }

        // Try numbers from start to n
        for (let i = start; i <= n; i++) {
            current.push(i);           // Choose
            backtrack(i + 1, current); // Explore (i+1 to avoid duplicates)
            current.pop();             // Backtrack
        }
    };

    backtrack(1, []);
    return result;
}

/**
 * Solution for "Subsets" - LeetCode #78
 * 
 * Problem: Given an array of unique integers, return all possible subsets (the power set).
 * 
 * Approach: Backtracking
 * - For each element, choose to include or exclude it recursively.
 * - Add each subset to the result as you build it.
 * 
 * Time Complexity: O(n * 2^n)
 * Space Complexity: O(n * 2^n) (output)
 * 
 * Example:
 * Input: nums = [1,2,3]
 * Output: [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
 */
export function subsets(nums: number[]): number[][] {
    const result: number[][] = [];

    const backtrack = (start: number, current: number[]): void => {
        // Add current subset to result
        result.push([...current]);

        // Try adding each remaining number
        for (let i = start; i < nums.length; i++) {
            current.push(nums[i]);     // Choose
            backtrack(i + 1, current); // Explore
            current.pop();             // Backtrack
        }
    };

    backtrack(0, []);
    return result;
}

/**
 * Letter Combinations of a Phone Number
 * @param digits - String containing digits 2-9
 * @returns All possible letter combinations
 */
export function letterCombinations(digits: string): string[] {
    if (!digits) return [];

    const digitToLetters: { [key: string]: string } = {
        '2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl',
        '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz'
    };

    const result: string[] = [];

    const backtrack = (index: number, current: string): void => {
        // Base case: processed all digits
        if (index === digits.length) {
            result.push(current);
            return;
        }

        // Try each letter for current digit
        const letters = digitToLetters[digits[index]];
        for (const letter of letters) {
            backtrack(index + 1, current + letter);
        }
    };

    backtrack(0, '');
    return result;
}

/**
 * Solution for "Valid Parentheses" - LeetCode #20
 * 
 * Problem: Given a string containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.
 * A string is valid if:
 * - Open brackets are closed by the same type of brackets.
 * - Open brackets are closed in the correct order.
 * 
 * Approach: Stack
 * - Push opening brackets onto the stack.
 * - For each closing bracket, check if it matches the top of the stack.
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 * 
 * Example:
 * Input: s = "()[]{}"
 * Output: true
 * 
 * Input: s = "(]"
 * Output: false
 */
export function isValid(s: string): boolean {
    const stack: string[] = [];
    const map: Record<string, string> = { ')': '(', '}': '{', ']': '[' };
    for (const c of s) {
        if (c === '(' || c === '{' || c === '[') {
            stack.push(c);
        } else {
            if (stack.pop() !== map[c]) return false;
        }
    }
    return stack.length === 0;
}

/**
 * N-Queens problem - Place n queens on nxn chessboard
 * @param n - Size of chessboard and number of queens
 * @returns All valid arrangements
 */
export function solveNQueens(n: number): string[][] {
    const result: string[][] = [];
    const board: string[][] = Array(n).fill(null).map(() => Array(n).fill('.'));

    const isValid = (row: number, col: number): boolean => {
        // Check column
        for (let i = 0; i < row; i++) {
            if (board[i][col] === 'Q') return false;
        }

        // Check diagonal (top-left to bottom-right)
        for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
            if (board[i][j] === 'Q') return false;
        }

        // Check diagonal (top-right to bottom-left)
        for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
            if (board[i][j] === 'Q') return false;
        }

        return true;
    };

    const backtrack = (row: number): void => {
        // Base case: all queens placed
        if (row === n) {
            result.push(board.map(row => row.join('')));
            return;
        }

        // Try placing queen in each column of current row
        for (let col = 0; col < n; col++) {
            if (isValid(row, col)) {
                board[row][col] = 'Q';  // Choose
                backtrack(row + 1);     // Explore
                board[row][col] = '.';  // Backtrack
            }
        }
    };

    backtrack(0);
    return result;
}

/**
 * Solution for "Word Search" - LeetCode #79
 * 
 * Problem: Given a 2D board and a word, find if the word exists in the grid.
 * The word can be constructed from letters of sequentially adjacent cells, where "adjacent" cells are horizontally or vertically neighboring. The same letter cell may not be used more than once.
 * 
 * Approach: Backtracking
 * - For each cell, start DFS if it matches the first character.
 * - Mark visited cells to avoid revisiting in the same path.
 * - Explore all 4 directions recursively.
 * 
 * Time Complexity: O(m * n * 4^L), where m and n are board dimensions and L is word length.
 * Space Complexity: O(L) (recursion stack)
 * 
 * Example:
 * Input: board = [
 *   ['A','B','C','E'],
 *   ['S','F','C','S'],
 *   ['A','D','E','E']
 * ], word = "ABCCED"
 * Output: true
 * Explanation: The word "ABCCED" can be constructed as A->B->C->C->E->D.
 */
export function exist(board: string[][], word: string): boolean {
    const rows = board.length;
    const cols = board[0].length;

    const backtrack = (row: number, col: number, index: number): boolean => {
        // Base case: found complete word
        if (index === word.length) return true;

        // Check bounds and character match
        if (row < 0 || row >= rows || col < 0 || col >= cols ||
            board[row][col] !== word[index]) {
            return false;
        }

        // Mark current cell as visited
        const temp = board[row][col];
        board[row][col] = '#';

        // Explore all 4 directions
        const found = backtrack(row + 1, col, index + 1) ||
            backtrack(row - 1, col, index + 1) ||
            backtrack(row, col + 1, index + 1) ||
            backtrack(row, col - 1, index + 1);

        // Restore original character (backtrack)
        board[row][col] = temp;

        return found;
    };

    // Try starting from each cell
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (backtrack(row, col, 0)) return true;
        }
    }

    return false;
}

/**
 * Solution for "N-Queens" - LeetCode #51
 * 
 * Problem: Place n queens on an n x n chessboard so that no two queens attack each other. Return all distinct solutions.
 * 
 * Approach: Backtracking
 * - Try placing a queen in each row, check for column/diagonal conflicts
 * - Use sets to track columns and diagonals
 * 
 * Time Complexity: O(n!)
 * Space Complexity: O(n^2) (output)
 */
export function solveNQueens2(n: number): string[][] {
    const result: string[][] = [];
    const board: string[] = Array(n).fill('').map(() => '.'.repeat(n));
    const cols = new Set<number>();
    const diag1 = new Set<number>(); // row - col
    const diag2 = new Set<number>(); // row + col

    function backtrack(row: number) {
        if (row === n) {
            result.push([...board]);
            return;
        }
        for (let col = 0; col < n; col++) {
            if (cols.has(col) || diag1.has(row - col) || diag2.has(row + col)) continue;

            // Place queen
            const rowArr = board[row].split('');
            rowArr[col] = 'Q';
            board[row] = rowArr.join('');
            cols.add(col);
            diag1.add(row - col);
            diag2.add(row + col);

            backtrack(row + 1);

            // Remove queen
            rowArr[col] = '.';
            board[row] = rowArr.join('');
            cols.delete(col);
            diag1.delete(row - col);
            diag2.delete(row + col);
        }
    }

    backtrack(0);
    return result;
}