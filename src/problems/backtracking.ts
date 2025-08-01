/**
 * Backtracking implementations
 * 
 * Pattern: Build solution incrementally and backtrack when constraints violated
 * Applications: Permutations, combinations, constraint satisfaction problems
 */

/**
 * Generate all permutations of distinct integers
 * @param nums - Array of distinct integers
 * @returns All possible permutations
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
 * Generate all subsets (power set)
 * @param nums - Array of unique integers
 * @returns All possible subsets
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
 * Word Search - Find if word exists in 2D board
 * @param board - 2D board of characters
 * @param word - Word to search for
 * @returns True if word exists, false otherwise
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
