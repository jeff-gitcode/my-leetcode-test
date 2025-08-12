import { TreeNode } from '@/problems/treeTraversal';
import {
    rightSideView,
    orangesRotting,
    ladderLength,
    shortestPathBinaryMatrix,
} from '@/problems/bfs';

describe('Breadth-First Search (BFS) Problems', () => {
    // Helper function to create binary trees from arrays (level-order)
    function createBinaryTree(values: (number | null)[]): TreeNode | null {
        if (values.length === 0 || values[0] === null) return null;

        const root = new TreeNode(values[0]);
        const queue: TreeNode[] = [root];
        let i = 1;

        while (queue.length > 0 && i < values.length) {
            const current = queue.shift()!;

            if (i < values.length && values[i] !== null) {
                current.left = new TreeNode(values[i]!);
                queue.push(current.left);
            }
            i++;

            if (i < values.length && values[i] !== null) {
                current.right = new TreeNode(values[i]!);
                queue.push(current.right);
            }
            i++;
        }

        return root;
    }

    describe('Binary Tree Right Side View', () => {
        it('should return empty array for empty tree', () => {
            expect(rightSideView(null)).toEqual([]);
        });

        it('should return single value for single node tree', () => {
            const root = new TreeNode(1);
            expect(rightSideView(root)).toEqual([1]);
        });

        it('should return rightmost nodes for balanced tree', () => {
            // Tree: [1,2,3,null,5,null,4]
            //       1
            //      / \
            //     2   3
            //      \   \
            //       5   4
            const root = createBinaryTree([1, 2, 3, null, 5, null, 4]);
            expect(rightSideView(root)).toEqual([1, 3, 4]);
        });

        it('should handle left-skewed tree', () => {
            // Tree: [1,2,null,3]
            //       1
            //      /
            //     2
            //    /
            //   3
            const root = createBinaryTree([1, 2, null, 3]);
            expect(rightSideView(root)).toEqual([1, 2, 3]);
        });

        it('should handle right-skewed tree', () => {
            // Tree: [1,null,2,null,3]
            //   1
            //    \
            //     2
            //      \
            //       3
            const root = createBinaryTree([1, null, 2, null, 3]);
            expect(rightSideView(root)).toEqual([1, 2, 3]);
        });

        it('should handle complex tree structure', () => {
            // Tree: [1,2,3,4,5,6,7]
            //       1
            //      / \
            //     2   3
            //    / \ / \
            //   4  5 6  7
            const root = createBinaryTree([1, 2, 3, 4, 5, 6, 7]);
            expect(rightSideView(root)).toEqual([1, 3, 7]);
        });

        it('should handle tree with missing right nodes', () => {
            // Tree: [1,2,3,4,null,null,null,5]
            const root = createBinaryTree([1, 2, 3, 4, null, null, null, 5]);
            expect(rightSideView(root)).toEqual([1, 3, 4, 5]);
        });
    });

    describe('Rotting Oranges', () => {
        it('should return 0 for empty grid', () => {
            expect(orangesRotting([])).toBe(0);
        });

        it('should return 0 when no fresh oranges', () => {
            const grid = [
                [2, 2, 0],
                [0, 2, 0],
                [0, 0, 2]
            ];
            expect(orangesRotting(grid)).toBe(0);
        });

        it('should return -1 when fresh oranges cannot be reached', () => {
            const grid = [
                [2, 1, 1],
                [1, 1, 0],
                [0, 1, 1]
            ];
            expect(orangesRotting(grid)).toBe(-1);
        });

        it('should return correct time for simple case', () => {
            const grid = [
                [2, 1, 1],
                [1, 1, 0],
                [0, 1, 1]
            ];
            // This case should return 4 because all oranges can be rotted in 4 minutes
            expect(orangesRotting(grid)).toBe(4);
        });

        it('should return correct time for reachable oranges', () => {
            const grid = [
                [2, 1, 1],
                [0, 1, 1],
                [1, 0, 1]
            ];
            expect(orangesRotting(grid)).toBe(-1); // Bottom-left orange cannot be reached
        });

        it('should handle single rotten orange spreading', () => {
            const grid = [
                [0, 1],
                [1, 2]
            ];
            expect(orangesRotting(grid)).toBe(2);
        });

        it('should handle multiple rotten oranges', () => {
            const grid = [
                [2, 1, 0, 2, 1],
                [1, 0, 1, 2, 1],
                [1, 0, 0, 2, 1]
            ];
            expect(orangesRotting(grid)).toBe(2);
        });

        it('should handle all rotten oranges', () => {
            const grid = [
                [2, 2, 2],
                [2, 2, 2],
                [2, 2, 2]
            ];
            expect(orangesRotting(grid)).toBe(0);
        });

        it('should handle single fresh orange unreachable', () => {
            const grid = [
                [1]
            ];
            expect(orangesRotting(grid)).toBe(-1);
        });

        it('should handle large grid efficiently', () => {
            // Create a 10x10 grid with rotten orange at center
            const grid = Array(10).fill(null).map(() => Array(10).fill(1));
            grid[5][5] = 2; // Rotten orange at center
            expect(orangesRotting(grid)).toBe(10); // Maximum distance from center to corner
        });
    });

    describe('Word Ladder', () => {
        it('should return 0 when endWord not in wordList', () => {
            expect(ladderLength('hit', 'cog', ['hot', 'dot', 'dog'])).toBe(0);
        });

        it('should return 0 when no transformation possible', () => {
            expect(ladderLength('hit', 'cog', ['hot', 'dot', 'dog', 'lot', 'log', 'cat'])).toBe(0);
        });

        it('should return correct length for valid transformation', () => {
            const wordList = ['hot', 'dot', 'dog', 'lot', 'log', 'cog'];
            expect(ladderLength('hit', 'cog', wordList)).toBe(4);
            // Transformation: hit -> hot -> dot -> dog -> cog
        });

        it('should handle single character difference', () => {
            expect(ladderLength('a', 'c', ['a', 'b', 'c'])).toBe(2);
            // Transformation: a -> c (but need intermediate)
        });

        it('should handle direct transformation', () => {
            expect(ladderLength('hot', 'dog', ['hot', 'dog'])).toBe(0);
            // No intermediate word possible with single character change
        });

        it('should handle same begin and end word', () => {
            expect(ladderLength('hot', 'hot', ['hot'])).toBe(1);
        });

        it('should handle complex transformation chain', () => {
            const wordList = ['ted', 'tex', 'red', 'tax', 'tad', 'den', 'rex', 'pee'];
            expect(ladderLength('red', 'tax', wordList)).toBe(4);
            // Possible transformation: red -> ted -> tex -> tax
        });

        it('should handle empty wordList', () => {
            expect(ladderLength('hit', 'cog', [])).toBe(0);
        });

        it('should handle case where beginWord equals endWord', () => {
            expect(ladderLength('abc', 'abc', ['abc'])).toBe(1);
        });

        it('should find shortest transformation', () => {
            const wordList = ['hot', 'dot', 'dog', 'lot', 'log', 'cog', 'hog'];
            expect(ladderLength('hit', 'cog', wordList)).toBe(5);
        });
    });

    describe('Shortest Path in Binary Matrix', () => {
        it('should return -1 for blocked start or end', () => {
            expect(shortestPathBinaryMatrix([[1, 0], [0, 0]])).toBe(-1);
            expect(shortestPathBinaryMatrix([[0, 0], [0, 1]])).toBe(-1);
            expect(shortestPathBinaryMatrix([[1]])).toBe(-1);
        });

        it('should return 1 for single cell matrix', () => {
            expect(shortestPathBinaryMatrix([[0]])).toBe(1);
        });

        it('should return correct path length for simple case', () => {
            const grid = [
                [0, 1],
                [1, 0]
            ];
            expect(shortestPathBinaryMatrix(grid)).toBe(-1); // No path possible
        });

        it('should find shortest path in clear matrix', () => {
            const grid = [
                [0, 0, 0],
                [1, 1, 0],
                [1, 1, 0]
            ];
            expect(shortestPathBinaryMatrix(grid)).toBe(4);
        });

        it('should handle diagonal movement', () => {
            const grid = [
                [0, 1, 1, 0, 0, 0],
                [0, 1, 0, 1, 1, 0],
                [0, 1, 1, 0, 1, 0],
                [0, 0, 0, 1, 1, 0],
                [1, 1, 1, 1, 1, 0],
                [1, 1, 1, 1, 1, 0]
            ];
            expect(shortestPathBinaryMatrix(grid)).toBe(14);
        });

        it('should return -1 when no path exists', () => {
            const grid = [
                [0, 0, 0],
                [1, 1, 1],
                [0, 0, 0]
            ];
            expect(shortestPathBinaryMatrix(grid)).toBe(-1);
        });

        it('should handle straight path', () => {
            const grid = [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0]
            ];
            expect(shortestPathBinaryMatrix(grid)).toBe(3); // Diagonal path
        });

        it('should handle maze-like structure', () => {
            const grid = [
                [0, 1, 0, 0, 0, 1, 0, 0],
                [0, 1, 0, 1, 0, 1, 0, 1],
                [0, 0, 0, 1, 0, 0, 1, 0],
                [1, 0, 1, 0, 0, 1, 0, 1],
                [0, 0, 1, 0, 0, 0, 0, 0],
                [0, 1, 0, 0, 1, 0, 0, 1],
                [0, 1, 0, 1, 0, 1, 0, 0],
                [1, 0, 1, 0, 1, 0, 1, 0]
            ];
            const result = shortestPathBinaryMatrix(grid);
            expect(result).toBeGreaterThan(0); // Should find some path
        });

        it('should handle large grid efficiently', () => {
            // Create a 20x20 grid with clear path along edges
            const grid = Array(20).fill(null).map(() => Array(20).fill(1));
            // Clear path along top and right edges
            for (let i = 0; i < 20; i++) {
                grid[0][i] = 0; // Top row
                grid[i][19] = 0; // Right column
            }
            grid[0][0] = 0; // Start
            grid[19][19] = 0; // End

            const result = shortestPathBinaryMatrix(grid);
            expect(result).toBe(20); // Direct diagonal would be impossible, so path along edges
        });
    });

    // Test BFS characteristics
    describe('BFS Algorithm Properties', () => {
        it('should explore nodes level by level in tree traversal', () => {
            const root = createBinaryTree([1, 2, 3, 4, 5, 6, 7]);
            const rightView = rightSideView(root);
            // Right view should show rightmost node at each level
            expect(rightView).toEqual([1, 3, 7]);
        });

        it('should find shortest path in unweighted graphs', () => {
            // BFS guarantees shortest path in unweighted graphs
            const grid = [
                [0, 0, 0, 0],
                [1, 1, 0, 1],
                [0, 0, 0, 0],
                [0, 1, 1, 0]
            ];
            const result = shortestPathBinaryMatrix(grid);
            expect(result).toBeLessThanOrEqual(6); // Should find reasonably short path
        });

        it('should process all nodes at current level before moving to next', () => {
            // This is tested implicitly in orangesRotting where all rotten oranges
            // at time t affect fresh oranges simultaneously at time t+1
            const grid = [
                [2, 1, 1],
                [1, 1, 1],
                [1, 1, 1]
            ];
            expect(orangesRotting(grid)).toBe(2); // Should take exactly 2 minutes
        });
    });
});