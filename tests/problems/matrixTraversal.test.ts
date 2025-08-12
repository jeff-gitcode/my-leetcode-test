import {
    spiralOrder,
    rotate,
    setZeroes,
    searchMatrix,
    isValidSudoku,
    floodFill,
    solve,
} from '@/problems/matrixTraversal';

describe('Matrix Traversal Problems', () => {
    describe('Spiral Order Traversal', () => {
        it('should return empty array for empty matrix', () => {
            expect(spiralOrder([])).toEqual([]);
            expect(spiralOrder([[]])).toEqual([]);
        });

        it('should handle single element matrix', () => {
            expect(spiralOrder([[1]])).toEqual([1]);
        });

        it('should handle single row matrix', () => {
            expect(spiralOrder([[1, 2, 3, 4]])).toEqual([1, 2, 3, 4]);
        });

        it('should handle single column matrix', () => {
            const matrix = [[1], [2], [3], [4]];
            expect(spiralOrder(matrix)).toEqual([1, 2, 3, 4]);
        });

        it('should traverse 3x3 matrix in spiral order', () => {
            const matrix = [
                [1, 2, 3],
                [4, 5, 6],
                [7, 8, 9]
            ];
            expect(spiralOrder(matrix)).toEqual([1, 2, 3, 6, 9, 8, 7, 4, 5]);
        });

        it('should handle rectangular matrix (more rows than columns)', () => {
            const matrix = [
                [1, 2, 3],
                [4, 5, 6],
                [7, 8, 9],
                [10, 11, 12]
            ];
            expect(spiralOrder(matrix)).toEqual([1, 2, 3, 6, 9, 12, 11, 10, 7, 4, 5, 8]);
        });

        it('should handle rectangular matrix (more columns than rows)', () => {
            const matrix = [
                [1, 2, 3, 4],
                [5, 6, 7, 8],
                [9, 10, 11, 12]
            ];
            expect(spiralOrder(matrix)).toEqual([1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7]);
        });

        it('should handle large matrix efficiently', () => {
            // Create a 10x10 matrix with sequential numbers
            const matrix = Array(10).fill(null).map((_, i) =>
                Array(10).fill(null).map((_, j) => i * 10 + j + 1)
            );
            const result = spiralOrder(matrix);
            expect(result).toHaveLength(100);
            expect(result[0]).toBe(1); // Top-left
            expect(result[9]).toBe(10); // Top-right
            expect(result[result.length - 1]).toBe(91); // Center area
        });
    });

    describe('Rotate Image', () => {
        it('should rotate 1x1 matrix (no change)', () => {
            const matrix = [[1]];
            rotate(matrix);
            expect(matrix).toEqual([[1]]);
        });

        it('should rotate 2x2 matrix 90 degrees clockwise', () => {
            const matrix = [[1, 2], [3, 4]];
            rotate(matrix);
            expect(matrix).toEqual([[3, 1], [4, 2]]);
        });

        it('should rotate 3x3 matrix 90 degrees clockwise', () => {
            const matrix = [
                [1, 2, 3],
                [4, 5, 6],
                [7, 8, 9]
            ];
            rotate(matrix);
            expect(matrix).toEqual([
                [7, 4, 1],
                [8, 5, 2],
                [9, 6, 3]
            ]);
        });

        it('should rotate 4x4 matrix correctly', () => {
            const matrix = [
                [5, 1, 9, 11],
                [2, 4, 8, 10],
                [13, 3, 6, 7],
                [15, 14, 12, 16]
            ];
            rotate(matrix);
            expect(matrix).toEqual([
                [15, 13, 2, 5],
                [14, 3, 4, 1],
                [12, 6, 8, 9],
                [16, 7, 10, 11]
            ]);
        });

        it('should work with negative numbers', () => {
            const matrix = [[-1, -2], [-3, -4]];
            rotate(matrix);
            expect(matrix).toEqual([[-3, -1], [-4, -2]]);
        });

        it('should handle large matrix efficiently', () => {
            // Create a 20x20 matrix and verify rotation preserves all elements
            const n = 20;
            const original = Array(n).fill(null).map((_, i) =>
                Array(n).fill(null).map((_, j) => i * n + j)
            );
            const matrix = original.map(row => [...row]); // Deep copy
            
            rotate(matrix);
            
            // Verify all original elements are present
            const originalFlat = original.flat().sort((a, b) => a - b);
            const rotatedFlat = matrix.flat().sort((a, b) => a - b);
            expect(rotatedFlat).toEqual(originalFlat);
            
            // Verify specific corner transformations
            expect(matrix[0][0]).toBe(original[n-1][0]); // Top-left = bottom-left of original
            expect(matrix[0][n-1]).toBe(original[0][0]); // Top-right = top-left of original
        });
    });

    describe('Set Matrix Zeroes', () => {
        it('should handle matrix with no zeros', () => {
            const matrix = [[1, 2], [3, 4]];
            setZeroes(matrix);
            expect(matrix).toEqual([[1, 2], [3, 4]]);
        });

        it('should set row and column to zero for single zero', () => {
            const matrix = [[1, 1, 1], [1, 0, 1], [1, 1, 1]];
            setZeroes(matrix);
            expect(matrix).toEqual([[1, 0, 1], [0, 0, 0], [1, 0, 1]]);
        });

        it('should handle multiple zeros', () => {
            const matrix = [
                [0, 1, 2, 0],
                [3, 4, 5, 2],
                [1, 3, 1, 5]
            ];
            setZeroes(matrix);
            expect(matrix).toEqual([
                [0, 0, 0, 0],
                [0, 4, 5, 0],
                [0, 3, 1, 0]
            ]);
        });

        it('should handle zeros in first row', () => {
            const matrix = [
                [0, 1, 2],
                [3, 4, 5],
                [1, 3, 1]
            ];
            setZeroes(matrix);
            expect(matrix).toEqual([
                [0, 0, 0],
                [0, 4, 5],
                [0, 3, 1]
            ]);
        });

        it('should handle zeros in first column', () => {
            const matrix = [
                [1, 1, 2],
                [0, 4, 5],
                [1, 3, 1]
            ];
            setZeroes(matrix);
            expect(matrix).toEqual([
                [0, 1, 2],
                [0, 0, 0],
                [0, 3, 1]
            ]);
        });

        it('should handle single element zero matrix', () => {
            const matrix = [[0]];
            setZeroes(matrix);
            expect(matrix).toEqual([[0]]);
        });

        it('should handle large matrix with scattered zeros', () => {
            const matrix = Array(10).fill(null).map((_, i) =>
                Array(10).fill(null).map((_, j) => i + j)
            );
            // Add some zeros
            matrix[2][5] = 0;
            matrix[7][1] = 0;
            
            setZeroes(matrix);
            
            // Check that row 2 and column 5 are all zeros
            for (let j = 0; j < 10; j++) {
                expect(matrix[2][j]).toBe(0);
            }
            for (let i = 0; i < 10; i++) {
                expect(matrix[i][5]).toBe(0);
            }
            
            // Check that row 7 and column 1 are all zeros
            for (let j = 0; j < 10; j++) {
                expect(matrix[7][j]).toBe(0);
            }
            for (let i = 0; i < 10; i++) {
                expect(matrix[i][1]).toBe(0);
            }
        });
    });

    describe('Search 2D Matrix', () => {
        const matrix = [
            [1, 4, 7, 11],
            [2, 5, 8, 12],
            [3, 6, 9, 16],
            [10, 13, 14, 17]
        ];

        it('should find existing elements', () => {
            expect(searchMatrix(matrix, 5)).toBe(true);
            expect(searchMatrix(matrix, 11)).toBe(true);
            expect(searchMatrix(matrix, 17)).toBe(true);
            expect(searchMatrix(matrix, 1)).toBe(true);
        });

        it('should return false for non-existing elements', () => {
            expect(searchMatrix(matrix, 13)).toBe(true); // 13 exists
            expect(searchMatrix(matrix, 20)).toBe(false);
            expect(searchMatrix(matrix, 0)).toBe(false);
            expect(searchMatrix(matrix, 15)).toBe(false);
        });

        it('should handle empty matrix', () => {
            expect(searchMatrix([], 1)).toBe(false);
            expect(searchMatrix([[]], 1)).toBe(false);
        });

        it('should handle single element matrix', () => {
            expect(searchMatrix([[5]], 5)).toBe(true);
            expect(searchMatrix([[5]], 3)).toBe(false);
        });

        it('should handle single row matrix', () => {
            expect(searchMatrix([[1, 3, 5, 7]], 3)).toBe(true);
            expect(searchMatrix([[1, 3, 5, 7]], 4)).toBe(false);
        });

        it('should handle single column matrix', () => {
            expect(searchMatrix([[1], [3], [5], [7]], 5)).toBe(true);
            expect(searchMatrix([[1], [3], [5], [7]], 4)).toBe(false);
        });
    });

    describe('Valid Sudoku', () => {
        it('should validate correct sudoku board', () => {
            const board = [
                ["5","3",".",".","7",".",".",".","."],
                ["6",".",".","1","9","5",".",".","."],
                [".","9","8",".",".",".",".","6","."],
                ["8",".",".",".","6",".",".",".","3"],
                ["4",".",".","8",".","3",".",".","1"],
                ["7",".",".",".","2",".",".",".","6"],
                [".","6",".",".",".",".","2","8","."],
                [".",".",".","4","1","9",".",".","5"],
                [".",".",".",".","8",".",".","7","9"]
            ];
            expect(isValidSudoku(board)).toBe(true);
        });

        it('should detect invalid row', () => {
            const board = [
                ["8","3",".",".","7",".",".",".","."],
                ["6",".",".","1","9","5",".",".","."],
                [".","9","8",".",".",".",".","6","."],
                ["8",".",".",".","6",".",".",".","3"],
                ["4",".",".","8",".","3",".",".","1"],
                ["7",".",".",".","2",".",".",".","6"],
                [".","6",".",".",".",".","2","8","."],
                [".",".",".","4","1","9",".",".","5"],
                [".",".",".",".","8",".",".","7","9"]
            ];
            expect(isValidSudoku(board)).toBe(false); // Two 8s in first column
        });

        it('should detect invalid column', () => {
            const board = [
                ["5","3",".",".","7",".",".",".","."],
                ["6",".",".","1","9","5",".",".","."],
                [".","9","8",".",".",".",".","6","."],
                ["8",".",".",".","6",".",".",".","3"],
                ["4",".",".","8",".","3",".",".","1"],
                ["7",".",".",".","2",".",".",".","6"],
                [".","6",".",".",".",".","2","8","."],
                [".",".",".","4","1","9",".",".","5"],
                ["5",".",".",".","8",".",".","7","9"]
            ];
            expect(isValidSudoku(board)).toBe(false); // Two 5s in first column
        });

        it('should detect invalid 3x3 box', () => {
            const board = [
                ["5","3",".",".","7",".",".",".","."],
                ["6",".",".","1","9","5",".",".","."],
                [".","9","5",".",".",".",".","6","."], // 5 conflicts in top-left box
                ["8",".",".",".","6",".",".",".","3"],
                ["4",".",".","8",".","3",".",".","1"],
                ["7",".",".",".","2",".",".",".","6"],
                [".","6",".",".",".",".","2","8","."],
                [".",".",".","4","1","9",".",".","5"],
                [".",".",".",".","8",".",".","7","9"]
            ];
            expect(isValidSudoku(board)).toBe(false);
        });

        it('should handle empty board', () => {
            const board = Array(9).fill(null).map(() => Array(9).fill('.'));
            expect(isValidSudoku(board)).toBe(true);
        });

        it('should validate partially filled board', () => {
            const board = [
                ["5","3",".",".","7",".",".",".","."],
                ["6",".",".","1","9","5",".",".","."],
                [".","9","8",".",".",".",".","6","."],
                [".",".",".",".","6",".",".",".","3"],
                [".",".",".",".",".",".",".",".","1"],
                [".",".",".",".","2",".",".",".","6"],
                [".","6",".",".",".",".","2","8","."],
                [".",".",".","4","1","9",".",".","5"],
                [".",".",".",".","8",".",".","7","9"]
            ];
            expect(isValidSudoku(board)).toBe(true);
        });
    });

    describe('Flood Fill', () => {
        it('should fill connected region with new color', () => {
            const image = [
                [1, 1, 1],
                [1, 1, 0],
                [1, 0, 1]
            ];
            const result = floodFill(image, 1, 1, 2);
            expect(result).toEqual([
                [2, 2, 2],
                [2, 2, 0],
                [2, 0, 1]
            ]);
        });

        it('should handle same color fill (no change)', () => {
            const image = [[2, 2, 2], [2, 2, 0], [2, 0, 1]];
            const result = floodFill(image, 0, 0, 2);
            expect(result).toEqual([[2, 2, 2], [2, 2, 0], [2, 0, 1]]);
        });

        it('should handle single pixel', () => {
            const image = [[1]];
            const result = floodFill(image, 0, 0, 2);
            expect(result).toEqual([[2]]);
        });

        it('should fill only connected pixels', () => {
            const image = [
                [0, 0, 0],
                [0, 1, 1],
                [0, 1, 2]
            ];
            const result = floodFill(image, 1, 1, 3);
            expect(result).toEqual([
                [0, 0, 0],
                [0, 3, 3],
                [0, 3, 2]
            ]);
        });

        it('should handle edge starting position', () => {
            const image = [
                [1, 1, 1],
                [1, 1, 0],
                [1, 0, 1]
            ];
            const result = floodFill(image, 0, 0, 9);
            expect(result).toEqual([
                [9, 9, 9],
                [9, 9, 0],
                [9, 0, 1]
            ]);
        });

        it('should handle complex disconnected regions', () => {
            const image = [
                [1, 2, 1, 1],
                [2, 2, 2, 1],
                [1, 2, 1, 1],
                [1, 1, 1, 2]
            ];
            const result = floodFill(image, 1, 1, 9);
            expect(result).toEqual([
                [1, 9, 1, 1],
                [9, 9, 9, 1],
                [1, 9, 1, 1],
                [1, 1, 1, 2]
            ]);
        });

        it('should handle large image efficiently', () => {
            // Create a 50x50 image with alternating patterns
            const size = 50;
            const image = Array(size).fill(null).map((_, i) =>
                Array(size).fill(null).map((_, j) => (i + j) % 2)
            );
            
            const result = floodFill(image, 0, 0, 9);
            
            // Should fill all connected 0s starting from (0,0)
            expect(result[0][0]).toBe(9);
            expect(result[0][2]).toBe(9); // Same pattern as (0,0)
            expect(result[0][1]).toBe(1); // Different pattern, unchanged
        });
    });

    describe('Surrounded Regions', () => {
        it('should capture surrounded regions', () => {
            const board = [
                ['X', 'X', 'X', 'X'],
                ['X', 'O', 'O', 'X'],
                ['X', 'X', 'O', 'X'],
                ['X', 'O', 'X', 'X']
            ];
            solve(board);
            expect(board).toEqual([
                ['X', 'X', 'X', 'X'],
                ['X', 'X', 'X', 'X'],
                ['X', 'X', 'X', 'X'],
                ['X', 'O', 'X', 'X']
            ]);
        });

        it('should preserve border-connected regions', () => {
            const board = [
                ['O', 'O', 'O'],
                ['O', 'O', 'O'],
                ['O', 'O', 'O']
            ];
            solve(board);
            expect(board).toEqual([
                ['O', 'O', 'O'],
                ['O', 'O', 'O'],
                ['O', 'O', 'O']
            ]);
        });

        it('should handle empty board', () => {
            const board: string[][] = [];
            solve(board);
            expect(board).toEqual([]);
        });

        it('should handle single cell board', () => {
            const board = [['O']];
            solve(board);
            expect(board).toEqual([['O']]);
        });

        it('should handle board with no O regions', () => {
            const board = [
                ['X', 'X', 'X'],
                ['X', 'X', 'X'],
                ['X', 'X', 'X']
            ];
            solve(board);
            expect(board).toEqual([
                ['X', 'X', 'X'],
                ['X', 'X', 'X'],
                ['X', 'X', 'X']
            ]);
        });

        it('should handle complex mixed regions', () => {
            const board = [
                ['O', 'X', 'X', 'O', 'X'],
                ['X', 'O', 'O', 'X', 'O'],
                ['X', 'O', 'X', 'O', 'X'],
                ['O', 'X', 'O', 'O', 'O'],
                ['X', 'X', 'O', 'X', 'O']
            ];
            solve(board);
            
            // Border O's and their connections should remain
            expect(board[0][0]).toBe('O'); // Border
            expect(board[0][3]).toBe('O'); // Border
            expect(board[4][4]).toBe('O'); // Border
            
            // Interior surrounded regions should be captured
            expect(board[1][1]).toBe('X'); // Was surrounded
            expect(board[1][2]).toBe('X'); // Was surrounded
        });

        it('should handle large board efficiently', () => {
            // Create a 20x20 board with a surrounded region in the center
            const size = 20;
            const board = Array(size).fill(null).map(() => Array(size).fill('X'));
            
            // Create a surrounded O region in the center
            for (let i = 8; i <= 12; i++) {
                for (let j = 8; j <= 12; j++) {
                    board[i][j] = 'O';
                }
            }
            
            // Add some border O's that should be preserved
            board[0][0] = 'O';
            board[0][1] = 'O';
            board[size-1][size-1] = 'O';
            
            solve(board);
            
            // Border O's should remain
            expect(board[0][0]).toBe('O');
            expect(board[0][1]).toBe('O');
            expect(board[size-1][size-1]).toBe('O');
            
            // Surrounded center region should be captured
            expect(board[10][10]).toBe('X');
        });
    });

    // Test matrix traversal algorithm properties
    describe('Algorithm Properties', () => {
        it('should preserve matrix dimensions in spiral traversal', () => {
            const matrix = Array(5).fill(null).map((_, i) =>
                Array(7).fill(null).map((_, j) => i * 7 + j)
            );
            const spiral = spiralOrder(matrix);
            expect(spiral).toHaveLength(35); // 5 * 7
        });

        it('should preserve all elements in rotation', () => {
            const matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
            const originalElements = matrix.flat().sort();
            rotate(matrix);
            const rotatedElements = matrix.flat().sort();
            expect(rotatedElements).toEqual(originalElements);
        });

        it('should maintain connectivity in flood fill', () => {
            // Test that flood fill only affects 4-connected pixels
            const image = [
                [1, 0, 1],
                [0, 1, 0],
                [1, 0, 1]
            ];
            const result = floodFill(image, 1, 1, 9);
            expect(result).toEqual([
                [1, 0, 1],
                [0, 9, 0],
                [1, 0, 1]
            ]);
        });

        it('should respect matrix boundaries in all algorithms', () => {
            const matrix = [[1]];
            
            // Test spiral order
            expect(spiralOrder(matrix)).toEqual([1]);
            
            // Test rotation
            const rotMatrix = [[1]];
            rotate(rotMatrix);
            expect(rotMatrix).toEqual([[1]]);
            
            // Test flood fill
            const floodMatrix = [[1]];
            const floodResult = floodFill(floodMatrix, 0, 0, 2);
            expect(floodResult).toEqual([[2]]);
        });
    });
});