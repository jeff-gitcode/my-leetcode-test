/**
 * Problem #46: Permutations (Medium)
 * 
 * Given an array of distinct integers, return all possible permutations.
 * 
 * Approach:
 * 1. Use backtracking to explore all possible orderings of elements
 * 2. For each position, try each unused number recursively
 * 3. Track which elements have been used in the current permutation
 * 
 * Time Complexity: O(n!) - we generate n! permutations
 * Space Complexity: O(n * n!) - storing all permutations
 * 
 * Example:
 * Input: nums = [1,2,3]
 * Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
 */
export function permute(nums: number[]): number[][] {
    const result: number[][] = [];                // Store all permutations

    const backtrack = (current: number[]): void => {
        if (current.length === nums.length) {     // Base case: permutation is complete
            result.push([...current]);            // Make a copy and add to results
            return;
        }

        for (const num of nums) {                 // Try each number as the next element
            if (current.includes(num)) continue;  // Skip if number is already used

            current.push(num);                    // Choose: add number to current permutation
            backtrack(current);                   // Explore: recursively build the rest
            current.pop();                        // Backtrack: remove number to try alternatives
        }
    };

    backtrack([]);                                // Start with empty permutation
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
 * Problem #78: Subsets (Medium)
 * 
 * Given an array of distinct integers, return all possible subsets (power set).
 * 
 * Approach:
 * 1. Use backtracking to include/exclude each element
 * 2. At each step, decide whether to include the next element
 * 3. Add each valid subset to the result
 * 
 * Time Complexity: O(n * 2^n) - there are 2^n subsets
 * Space Complexity: O(n * 2^n) - storing all subsets
 * 
 * Example:
 * Input: nums = [1,2,3]
 * Output: [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
 */
export function subsets(nums: number[]): number[][] {
    const result: number[][] = [];                // Store all subsets

    const backtrack = (start: number, current: number[]): void => {
        result.push([...current]);                // Add the current subset to results

        for (let i = start; i < nums.length; i++) {  // Try adding each remaining number
            current.push(nums[i]);                // Choose: include this element
            backtrack(i + 1, current);            // Explore: only consider elements after i
            current.pop();                        // Backtrack: remove element to try alternatives
        }
    };

    backtrack(0, []);                             // Start with empty subset and index 0
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
 * Problem #51: N-Queens (Hard)
 * 
 * Place n queens on an n×n chessboard so that no two queens attack each other.
 * 
 * Approach:
 * 1. Place queens row by row using backtracking
 * 2. For each row, try placing a queen in each column
 * 3. Check if the placement is valid (no attacks)
 * 4. Track columns and diagonals that are under attack
 * 
 * Time Complexity: O(n!) - approximately n! valid configurations
 * Space Complexity: O(n^2) - storing the board state
 * 
 * Example:
 * Input: n = 4
 * Output: [
 *  [".Q..","...Q","Q...","..Q."],
 *  ["..Q.","Q...","...Q",".Q.."]
 * ]
 */
export function solveNQueens(n: number): string[][] {
    const result: string[][] = [];                // Store all valid board configurations

    // Sets to track attacked columns and diagonals
    const cols = new Set<number>();               // Track occupied columns
    const posDiag = new Set<number>();            // Track occupied positive diagonals (r+c)
    const negDiag = new Set<number>();            // Track occupied negative diagonals (r-c)

    // Create empty board with '.' in all cells
    const board: string[] = Array(n).fill(0).map(() => '.'.repeat(n));

    const backtrack = (row: number): void => {
        if (row === n) {                          // Base case: all queens have been placed
            result.push([...board]);              // Add the current board configuration
            return;
        }

        for (let col = 0; col < n; col++) {       // Try placing queen in each column
            // Check if position is under attack
            if (cols.has(col) ||
                posDiag.has(row + col) ||
                negDiag.has(row - col)) {
                continue;                         // Skip if position is under attack
            }

            // Place queen at (row, col)
            const newRow = board[row].substring(0, col) + 'Q' + board[row].substring(col + 1);
            board[row] = newRow;                  // Update board with queen

            // Mark column and diagonals as under attack
            cols.add(col);                        // Column is now occupied
            posDiag.add(row + col);               // Positive diagonal (r+c) is occupied
            negDiag.add(row - col);               // Negative diagonal (r-c) is occupied

            backtrack(row + 1);                   // Explore: try placing queen in next row

            // Remove queen and clear attack markers (backtrack)
            board[row] = '.'.repeat(n);           // Remove queen from board
            cols.delete(col);                     // Free up column
            posDiag.delete(row + col);            // Free up positive diagonal
            negDiag.delete(row - col);            // Free up negative diagonal
        }
    };

    backtrack(0);                                 // Start with first row (row 0)
    return result;
}