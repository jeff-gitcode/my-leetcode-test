/**
 * Matrix Traversal implementations
 * 
 * Patterns: Spiral traversal, diagonal traversal, flood fill
 * Applications: 2D array manipulation, image processing
 */

/**
 * Spiral Matrix - Traverse matrix in spiral order
 * @param matrix - 2D matrix
 * @returns Array of elements in spiral order
 */
export function spiralOrder(matrix: number[][]): number[] {
    if (!matrix || matrix.length === 0) return [];

    const result: number[] = [];
    let top = 0;
    let bottom = matrix.length - 1;
    let left = 0;
    let right = matrix[0].length - 1;

    while (top <= bottom && left <= right) {
        // Traverse right
        for (let col = left; col <= right; col++) {
            result.push(matrix[top][col]);
        }
        top++;

        // Traverse down
        for (let row = top; row <= bottom; row++) {
            result.push(matrix[row][right]);
        }
        right--;

        // Traverse left (if we still have rows)
        if (top <= bottom) {
            for (let col = right; col >= left; col--) {
                result.push(matrix[bottom][col]);
            }
            bottom--;
        }

        // Traverse up (if we still have columns)
        if (left <= right) {
            for (let row = bottom; row >= top; row--) {
                result.push(matrix[row][left]);
            }
            left++;
        }
    }

    return result;
}

/**
 * Rotate Image - Rotate matrix 90 degrees clockwise in-place
 * @param matrix - Square matrix to rotate
 */
export function rotate(matrix: number[][]): void {
    const n = matrix.length;

    // Step 1: Transpose the matrix
    for (let i = 0; i < n; i++) {
        for (let j = i; j < n; j++) {
            [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
        }
    }

    // Step 2: Reverse each row
    for (let i = 0; i < n; i++) {
        matrix[i].reverse();
    }
}

/**
 * Set Matrix Zeroes - Set entire row and column to 0 if element is 0
 * @param matrix - 2D matrix to modify
 */
export function setZeroes(matrix: number[][]): void {
    const rows = matrix.length;
    const cols = matrix[0].length;

    let firstRowZero = false;
    let firstColZero = false;

    // Check if first row has zero
    for (let j = 0; j < cols; j++) {
        if (matrix[0][j] === 0) {
            firstRowZero = true;
            break;
        }
    }

    // Check if first column has zero
    for (let i = 0; i < rows; i++) {
        if (matrix[i][0] === 0) {
            firstColZero = true;
            break;
        }
    }

    // Use first row and column as markers
    for (let i = 1; i < rows; i++) {
        for (let j = 1; j < cols; j++) {
            if (matrix[i][j] === 0) {
                matrix[i][0] = 0; // Mark row
                matrix[0][j] = 0; // Mark column
            }
        }
    }

    // Set zeros based on markers
    for (let i = 1; i < rows; i++) {
        for (let j = 1; j < cols; j++) {
            if (matrix[i][0] === 0 || matrix[0][j] === 0) {
                matrix[i][j] = 0;
            }
        }
    }

    // Handle first row
    if (firstRowZero) {
        for (let j = 0; j < cols; j++) {
            matrix[0][j] = 0;
        }
    }

    // Handle first column
    if (firstColZero) {
        for (let i = 0; i < rows; i++) {
            matrix[i][0] = 0;
        }
    }
}

/**
 * Search a 2D Matrix - Search target in sorted 2D matrix
 * @param matrix - Sorted 2D matrix
 * @param target - Target value to search
 * @returns True if target found, false otherwise
 */
export function searchMatrix(matrix: number[][], target: number): boolean {
    if (!matrix || matrix.length === 0 || matrix[0].length === 0) return false;

    const rows = matrix.length;
    const cols = matrix[0].length;

    // Treat 2D matrix as 1D array and use binary search
    let left = 0;
    let right = rows * cols - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const midValue = matrix[Math.floor(mid / cols)][mid % cols];

        if (midValue === target) {
            return true;
        } else if (midValue < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return false;
}

/**
 * Valid Sudoku - Check if 9x9 Sudoku board is valid
 * @param board - 9x9 sudoku board with digits 1-9 and '.'
 * @returns True if valid, false otherwise
 */
export function isValidSudoku(board: string[][]): boolean {
    // Track seen numbers in rows, columns, and boxes
    const rows = Array(9).fill(null).map(() => new Set<string>());
    const cols = Array(9).fill(null).map(() => new Set<string>());
    const boxes = Array(9).fill(null).map(() => new Set<string>());

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const value = board[i][j];
            if (value === '.') continue;

            const boxIndex = Math.floor(i / 3) * 3 + Math.floor(j / 3);

            // Check if number already exists in row, column, or box
            if (rows[i].has(value) || cols[j].has(value) || boxes[boxIndex].has(value)) {
                return false;
            }

            // Add number to respective sets
            rows[i].add(value);
            cols[j].add(value);
            boxes[boxIndex].add(value);
        }
    }

    return true;
}

/**
 * Flood Fill - Fill connected area with new color
 * @param image - 2D grid representing an image
 * @param sr - Starting row coordinate
 * @param sc - Starting column coordinate
 * @param color - New color to fill with
 * @returns Modified image after flood fill
 */
export function floodFill(image: number[][], sr: number, sc: number, color: number): number[][] {
    const originalColor = image[sr][sc];

    // If new color is same as original, no need to fill
    if (originalColor === color) return image;

    const rows = image.length;
    const cols = image[0].length;

    const dfs = (row: number, col: number): void => {
        // Check bounds and color match
        if (row < 0 || row >= rows || col < 0 || col >= cols ||
            image[row][col] !== originalColor) {
            return;
        }

        // Fill current cell
        image[row][col] = color;

        // Fill all 4 directions
        dfs(row + 1, col); // Down
        dfs(row - 1, col); // Up
        dfs(row, col + 1); // Right
        dfs(row, col - 1); // Left
    };

    dfs(sr, sc);
    return image;
}

/**
 * Surrounded Regions - Capture surrounded 'O' regions
 * @param board - 2D board with 'X' and 'O'
 */
export function solve(board: string[][]): void {
    if (!board || board.length === 0) return;

    const rows = board.length;
    const cols = board[0].length;

    // Mark all 'O's connected to border as safe
    const markSafe = (row: number, col: number): void => {
        if (row < 0 || row >= rows || col < 0 || col >= cols ||
            board[row][col] !== 'O') {
            return;
        }

        board[row][col] = 'S'; // Mark as safe

        // Mark all connected 'O's as safe
        markSafe(row + 1, col);
        markSafe(row - 1, col);
        markSafe(row, col + 1);
        markSafe(row, col - 1);
    };

    // Mark border-connected 'O's as safe
    for (let row = 0; row < rows; row++) {
        markSafe(row, 0);           // Left border
        markSafe(row, cols - 1);    // Right border
    }

    for (let col = 0; col < cols; col++) {
        markSafe(0, col);           // Top border
        markSafe(rows - 1, col);    // Bottom border
    }

    // Convert remaining 'O's to 'X' and restore safe 'O's
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (board[row][col] === 'O') {
                board[row][col] = 'X';  // Capture surrounded region
            } else if (board[row][col] === 'S') {
                board[row][col] = 'O';  // Restore safe region
            }
        }
    }
}


/**
 * Solution for "Subsets" - LeetCode #78
 * 
 * Problem: Given an array of distinct integers, return all possible subsets (the power set).
 * 
 * Approach: Backtracking
 * - For each element, choose to include or exclude it recursively
 * 
 * Time Complexity: O(n * 2^n)
 * Space Complexity: O(n * 2^n) (output)
 */
export function subsets(nums: number[]): number[][] {
    const result: number[][] = [];

    function backtrack(start: number, path: number[]) {
        result.push([...path]);
        for (let i = start; i < nums.length; i++) {
            path.push(nums[i]);
            backtrack(i + 1, path);
            path.pop();
        }
    }

    backtrack(0, []);
    return result;
}
