/**
 * Problem #54: Spiral Matrix(Medium)
* 
 * Given a matrix, return all elements in spiral order.
 * Approach:
 * - Use four pointers(top, bottom, left, right) to track boundaries.
 * - Traverse the matrix in layers: right, down, left, up.
 * - Move boundaries inward after each layer.
 * 
 * Example:
 * Input: [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
 * Output: [1, 2, 3, 6, 9, 8, 7, 4, 5]
*/
export function spiralOrder(matrix: number[][]): number[] {
    if (!matrix || matrix.length === 0) return [];      // Edge case: empty matrix

    const result: number[] = [];                        // Store spiral order
    let top = 0;                                       // Top boundary
    let bottom = matrix.length - 1;                     // Bottom boundary
    let left = 0;                                      // Left boundary
    let right = matrix[0].length - 1;                   // Right boundary

    // Traverse while boundaries are valid
    // Example: matrix = [[1,2,3],[4,5,6],[7,8,9]]
    while (top <= bottom && left <= right) {
        // Traverse right
        for (let col = left; col <= right; col++) {
            result.push(matrix[top][col]);
            // Example: first row, result = [1,2,3]
        }
        top++; // Move top boundary down

        // Traverse down
        for (let row = top; row <= bottom; row++) {
            result.push(matrix[row][right]);
            // Example: rightmost column, result = [1,2,3,6,9]
        }
        right--; // Move right boundary left

        // Traverse left (if rows remain)
        if (top <= bottom) {
            for (let col = right; col >= left; col--) {
                result.push(matrix[bottom][col]);
                // Example: bottom row, result = [1,2,3,6,9,8,7]
            }
            bottom--; // Move bottom boundary up
        }

        // Traverse up (if columns remain)
        if (left <= right) {
            for (let row = bottom; row >= top; row--) {
                result.push(matrix[row][left]);
                // Example: leftmost column, result = [1,2,3,6,9,8,7,4]
            }
            left++; // Move left boundary right
        }
        // Next layer: only the center remains, e.g. [5]
    }

    return result; // Return spiral order
    // Example output: [1,2,3,6,9,8,7,4,5]
}

/**
 * Problem #48: Rotate Image (Medium)
 * 
 * Given an n x n matrix, rotate it 90 degrees clockwise in-place.
 * Approach:
 * - First transpose the matrix (swap rows and columns).
 * - Then reverse each row.
 * 
 * Example:
 * Input: [[1,2,3],[4,5,6],[7,8,9]]
 * Output: [[7,4,1],[8,5,2],[9,6,3]]
 */
export function rotate(matrix: number[][]): void {
    const n = matrix.length;

    // Step 1: Transpose the matrix
    // Example: matrix = [[1,2,3],[4,5,6],[7,8,9]]
    // After transpose: [[1,4,7],[2,5,8],[3,6,9]]
    for (let i = 0; i < n; i++) {
        for (let j = i; j < n; j++) {
            [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
            // Example: swap (0,1) with (1,0), (0,2) with (2,0), etc.
        }
    }

    // Step 2: Reverse each row
    // Example: after transpose, row [1,4,7] becomes [7,4,1]
    // Final matrix: [[7,4,1],[8,5,2],[9,6,3]]
    for (let i = 0; i < n; i++) {
        matrix[i].reverse();
        // Example: row [1,4,7] becomes [7,4,1]
    }
    // Matrix is now rotated in-place
    // Example output: [[7,4,1],[8,5,2],[9,6,3]]
}

/**
 * Problem #73: Set Matrix Zeroes (Medium)
 * 
 * Given a matrix, if an element is 0, set its entire row and column to 0.
 * Approach:
 * - Use first row and column as markers for zero rows/columns.
 * - Mark zeros in first row/column during traversal.
 * - Set zeros based on markers, then handle first row/column separately.
 * 
 * Example:
 * Input: [[1,1,1],[1,0,1],[1,1,1]]
 * Output: [[1,0,1],[0,0,0],[1,0,1]]
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
    // Example: matrix = [[1,1,1],[1,0,1],[1,1,1]], firstRowZero = false

    // Check if first column has zero
    for (let i = 0; i < rows; i++) {
        if (matrix[i][0] === 0) {
            firstColZero = true;
            break;
        }
    }
    // Example: matrix = [[1,1,1],[1,0,1],[1,1,1]], firstColZero = false

    // Use first row and column as markers
    for (let i = 1; i < rows; i++) {
        for (let j = 1; j < cols; j++) {
            if (matrix[i][j] === 0) {
                matrix[i][0] = 0; // Mark row
                matrix[0][j] = 0; // Mark column
                // Example: matrix[1][1]=0, mark matrix[1][0]=0 and matrix[0][1]=0
            }
        }
    }
    // Example after marking: matrix = [[1,0,1],[0,0,1],[1,1,1]]

    // Set zeros based on markers
    for (let i = 1; i < rows; i++) {
        for (let j = 1; j < cols; j++) {
            if (matrix[i][0] === 0 || matrix[0][j] === 0) {
                matrix[i][j] = 0;
                // Example: row 1 and column 1 are marked, so set matrix[1][1]=0
            }
        }
    }
    // Example after setting: matrix = [[1,0,1],[0,0,0],[1,0,1]]

    // Handle first row
    if (firstRowZero) {
        for (let j = 0; j < cols; j++) {
            matrix[0][j] = 0;
            // Example: set all of first row to 0
        }
    }
    // Example: first row remains unchanged in this case

    // Handle first column
    if (firstColZero) {
        for (let i = 0; i < rows; i++) {
            matrix[i][0] = 0;
            // Example: set all of first column to 0
        }
    }
    // Example: first column remains unchanged in this case

    // Matrix is now modified in-place
    // Example output: [[1,0,1],[0,0,0],[1,0,1]]
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
 * - For each element, choose to include or exclude it recursively.
 * - Add each subset to the result as you build it.
 * 
 * Time Complexity: O(n * 2^n)
 * Space Complexity: O(n * 2^n) (output)
 * 
 * Example:
 * Input: nums = [1,2,3]
 * Output: [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
 * Explanation: All possible subsets of [1,2,3].
 */
export function subsets(nums: number[]): number[][] {
    const result: number[][] = [];

    function backtrack(start: number, path: number[]) {
        // Add current subset to result
        result.push([...path]);
        // Try adding each remaining number
        for (let i = start; i < nums.length; i++) {
            path.push(nums[i]);         // Choose
            backtrack(i + 1, path);     // Explore
            path.pop();                 // Backtrack
        }
    }

    backtrack(0, []);
    return result;
}
