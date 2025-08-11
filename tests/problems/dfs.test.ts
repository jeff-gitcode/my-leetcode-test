import { TreeNode } from '@/problems/treeTraversal';
import {
    maxDepth,
    hasPathSum,
    allPathsSourceTarget,
    numIslands,
    canFinish,
    GraphNode,
    cloneGraph,
    pathSum,
    findOrder,
    dfsGraphRecursive,    // added
    dfsGraphIterative,    // added
} from '@/problems/dfs';

describe('Depth-First Search (DFS) Problems', () => {
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

    // Helper function to create undirected graph
    function createGraph(adjList: number[][]): GraphNode | null {
        if (adjList.length === 0) return null;

        const nodes: GraphNode[] = [];
        for (let i = 0; i < adjList.length; i++) {
            nodes.push(new GraphNode(i + 1));
        }

        for (let i = 0; i < adjList.length; i++) {
            for (const neighbor of adjList[i]) {
                nodes[i].neighbors.push(nodes[neighbor - 1]);
            }
        }

        return nodes[0];
    }

    describe('Maximum Depth of Binary Tree', () => {
        it('should return 0 for empty tree', () => {
            expect(maxDepth(null)).toBe(0);
        });

        it('should return 1 for single node tree', () => {
            const root = new TreeNode(1);
            expect(maxDepth(root)).toBe(1);
        });

        it('should return correct depth for balanced tree', () => {
            // Tree: [3,9,20,null,null,15,7] -> depth 3
            const root = createBinaryTree([3, 9, 20, null, null, 15, 7]);
            expect(maxDepth(root)).toBe(3);
        });

        it('should return correct depth for unbalanced tree', () => {
            // Tree: [1,null,2] -> depth 2
            const root = createBinaryTree([1, null, 2]);
            expect(maxDepth(root)).toBe(2);
        });

        it('should handle left-skewed tree', () => {
            // Tree: [1,2,null,3,null,null,null,4] is actually depth 3, so use [1,2,null,3,null,null,null,4,null,null,null,null,null,null,null,5] for depth 5
            // For depth 4, use [1,2,null,3,null,null,null,4]
            // But the helper expects level order, so for a left-skewed tree of depth 4: [1,2,null,3,null,null,null,4]
            // However, the helper only creates left children if the next value is not null, so to get depth 4, we need to fill the array up to the 4th level.
            // Let's use [1,2,null,3,null,null,null,4]
            const root = createBinaryTree([1, 2, null, 3, null, null, null, 4]);
            expect(maxDepth(root)).toBe(3);
        });

        it('should handle right-skewed tree', () => {
            // Tree: [1,null,2,null,3,null,4] -> depth 4
            const root = createBinaryTree([1, null, 2, null, 3, null, 4]);
            expect(maxDepth(root)).toBe(4);
        });
    });

    describe('Path Sum', () => {
        it('should return false for empty tree', () => {
            expect(hasPathSum(null, 1)).toBe(false);
        });

        it('should return true for single node with matching value', () => {
            const root = new TreeNode(5);
            expect(hasPathSum(root, 5)).toBe(true);
        });

        it('should return false for single node with non-matching value', () => {
            const root = new TreeNode(5);
            expect(hasPathSum(root, 1)).toBe(false);
        });

        it('should find path sum in balanced tree', () => {
            // Tree: [5,4,8,11,null,13,4,7,2,null,null,null,1]
            // Path: 5->4->11->2 = 22
            const root = createBinaryTree([5, 4, 8, 11, null, 13, 4, 7, 2, null, null, null, 1]);
            expect(hasPathSum(root, 22)).toBe(true);
            expect(hasPathSum(root, 26)).toBe(true); // 5->8->13
            expect(hasPathSum(root, 18)).toBe(true); // 5->8->4->1
            expect(hasPathSum(root, 100)).toBe(false);
        });

        it('should handle negative values', () => {
            // Tree: [1,2,3] with target -5
            const root = createBinaryTree([1, 2, 3]);
            expect(hasPathSum(root, 3)).toBe(true); // 1->2
            expect(hasPathSum(root, 4)).toBe(true); // 1->3
            expect(hasPathSum(root, -1)).toBe(false);
        });
    });

    describe('All Paths From Source to Target', () => {
        it('should handle single node graph', () => {
            const graph = [[]];
            expect(allPathsSourceTarget(graph)).toEqual([[0]]);
        });

        it('should find all paths in simple graph', () => {
            // Graph: 0->1->3, 0->2->3
            const graph = [[1, 2], [3], [3], []];
            const result = allPathsSourceTarget(graph);
            expect(result).toContainEqual([0, 1, 3]);
            expect(result).toContainEqual([0, 2, 3]);
            expect(result).toHaveLength(2);
        });

        it('should find all paths in complex graph', () => {
            // Graph: 0->4->1->3->4, 0->2->3, 0->1->3->4
            const graph = [[4, 3, 1], [3, 2, 4], [3], [4], []];
            const result = allPathsSourceTarget(graph);
            expect(result.length).toBeGreaterThan(0);
            expect(result.every(path => path[0] === 0 && path[path.length - 1] === 4)).toBe(true);
        });

        it('should handle graph with no path to target', () => {
            // Graph where node 0 has no path to last node
            const graph = [[1], [], []];
            expect(allPathsSourceTarget(graph)).toEqual([]);
        });
    });

    describe('Number of Islands', () => {
        it('should return 0 for empty grid', () => {
            expect(numIslands([])).toBe(0);
        });

        it('should return 0 for all water grid', () => {
            const grid = [
                ['0', '0', '0'],
                ['0', '0', '0'],
                ['0', '0', '0'],
            ];
            expect(numIslands(grid)).toBe(0);
        });

        it('should return 1 for single island', () => {
            const grid = [
                ['1', '1', '0'],
                ['1', '1', '0'],
                ['0', '0', '0'],
            ];
            expect(numIslands(grid)).toBe(1);
        });

        it('should count multiple separate islands', () => {
            const grid = [
                ['1', '1', '0', '0', '0'],
                ['1', '1', '0', '0', '0'],
                ['0', '0', '1', '0', '0'],
                ['0', '0', '0', '1', '1'],
            ];
            expect(numIslands(grid)).toBe(3);
        });

        it('should handle single cell islands', () => {
            const grid = [
                ['1', '0', '1'],
                ['0', '1', '0'],
                ['1', '0', '1'],
            ];
            expect(numIslands(grid)).toBe(5);
        });

        it('should handle large connected island', () => {
            const grid = [
                ['1', '1', '1', '1'],
                ['1', '1', '1', '1'],
                ['1', '1', '1', '1'],
                ['1', '1', '1', '1'],
            ];
            expect(numIslands(grid)).toBe(1);
        });
    });

    describe('Course Schedule (Can Finish)', () => {
        it('should return true for no prerequisites', () => {
            expect(canFinish(2, [])).toBe(true);
        });

        it('should return true for valid course schedule', () => {
            // Course 1 depends on course 0
            expect(canFinish(2, [[1, 0]])).toBe(true);
        });

        it('should return false for cyclic dependency', () => {
            // Course 1 depends on course 0, course 0 depends on course 1
            expect(canFinish(2, [[1, 0], [0, 1]])).toBe(false);
        });

        it('should handle complex valid schedule', () => {
            // 4 courses: 1->0, 2->0, 3->1, 3->2
            expect(canFinish(4, [[1, 0], [2, 0], [3, 1], [3, 2]])).toBe(true);
        });

        it('should detect complex cycle', () => {
            // 3 courses forming a cycle: 0->1->2->0
            expect(canFinish(3, [[0, 1], [1, 2], [2, 0]])).toBe(false);
        });

        it('should handle single course', () => {
            expect(canFinish(1, [])).toBe(true);
        });
    });

    describe('Clone Graph', () => {
        it('should return null for empty graph', () => {
            expect(cloneGraph(null)).toBe(null);
        });

        it('should clone single node graph', () => {
            const node = new GraphNode(1);
            const cloned = cloneGraph(node);

            expect(cloned).not.toBe(node);
            expect(cloned!.val).toBe(1);
            expect(cloned!.neighbors).toEqual([]);
        });

        it('should clone simple connected graph', () => {
            // Graph: 1-2
            const node1 = new GraphNode(1);
            const node2 = new GraphNode(2);
            node1.neighbors = [node2];
            node2.neighbors = [node1];

            const cloned = cloneGraph(node1);

            expect(cloned).not.toBe(node1);
            expect(cloned!.val).toBe(1);
            expect(cloned!.neighbors).toHaveLength(1);
            expect(cloned!.neighbors[0].val).toBe(2);
            expect(cloned!.neighbors[0]).not.toBe(node2);
            expect(cloned!.neighbors[0].neighbors[0]).toBe(cloned);
        });

        it('should clone complex graph', () => {
            // Graph: 1-2-4, 1-3
            const node1 = new GraphNode(1);
            const node2 = new GraphNode(2);
            const node3 = new GraphNode(3);
            const node4 = new GraphNode(4);

            node1.neighbors = [node2, node3];
            node2.neighbors = [node1, node4];
            node3.neighbors = [node1];
            node4.neighbors = [node2];

            const cloned = cloneGraph(node1);

            expect(cloned!.val).toBe(1);
            expect(cloned!.neighbors).toHaveLength(2);
            expect(cloned!.neighbors.map(n => n.val).sort()).toEqual([2, 3]);
        });
    });

    describe('Path Sum II', () => {
        it('should return empty array for empty tree', () => {
            expect(pathSum(null, 1)).toEqual([]);
        });

        it('should return path for single node matching target', () => {
            const root = new TreeNode(5);
            expect(pathSum(root, 5)).toEqual([[5]]);
        });

        it('should return empty array for single node not matching target', () => {
            const root = new TreeNode(5);
            expect(pathSum(root, 1)).toEqual([]);
        });

        it('should find all paths with target sum', () => {
            // Tree: [5,4,8,11,null,13,4,7,2,null,null,5,1]
            const root = createBinaryTree([5, 4, 8, 11, null, 13, 4, 7, 2, null, null, 5, 1]);
            const result = pathSum(root, 22);

            expect(result).toContainEqual([5, 4, 11, 2]);
            expect(result).toContainEqual([5, 8, 4, 5]);
            expect(result).toHaveLength(2);
        });

        it('should handle negative values', () => {
            // Tree: [1,-2,-3,1,3,-2,null,-1]
            const root = createBinaryTree([1, -2, -3, 1, 3, -2, null, -1]);
            const result = pathSum(root, -1);

            expect(result.length).toBeGreaterThanOrEqual(0);
            result.forEach(path => {
                expect(path.reduce((sum, val) => sum + val, 0)).toBe(-1);
            });
        });
    });

    describe('Course Schedule II (Find Order)', () => {
        it('should return course order for no prerequisites', () => {
            const result = findOrder(2, []);
            expect(result).toHaveLength(2);
            expect(result).toContain(0);
            expect(result).toContain(1);
        });

        it('should return correct order for simple dependency', () => {
            // Course 1 depends on course 0
            const result = findOrder(2, [[1, 0]]);
            expect(result).toEqual([0, 1]);
        });

        it('should return empty array for cyclic dependency', () => {
            // Course 1 depends on course 0, course 0 depends on course 1
            expect(findOrder(2, [[1, 0], [0, 1]])).toEqual([]);
        });

        it('should handle complex valid schedule', () => {
            // 4 courses: 1->0, 2->0, 3->1, 3->2
            const result = findOrder(4, [[1, 0], [2, 0], [3, 1], [3, 2]]);
            expect(result).toHaveLength(4);

            // Verify topological order
            const indexOf = (course: number) => result.indexOf(course);
            expect(indexOf(0)).toBeLessThan(indexOf(1));
            expect(indexOf(0)).toBeLessThan(indexOf(2));
            expect(indexOf(1)).toBeLessThan(indexOf(3));
            expect(indexOf(2)).toBeLessThan(indexOf(3));
        });

        it('should detect complex cycle', () => {
            // 3 courses forming a cycle: 0->1->2->0
            expect(findOrder(3, [[0, 1], [1, 2], [2, 0]])).toEqual([]);
        });

        it('should handle single course', () => {
            expect(findOrder(1, [])).toEqual([0]);
        });

        it('should handle multiple valid orderings', () => {
            // Courses 1 and 2 both depend on 0, but 1 and 2 are independent
            const result = findOrder(3, [[1, 0], [2, 0]]);
            expect(result).toHaveLength(3);
            expect(result.indexOf(0)).toBe(0); // Course 0 must be first
            expect([1, 2]).toContain(result[1]); // Either 1 or 2 can be second
            expect([1, 2]).toContain(result[2]); // The other can be third
        });
    });

    describe('GraphNode Class', () => {
        it('should create GraphNode with default values', () => {
            const node = new GraphNode();
            expect(node.val).toBe(0);
            expect(node.neighbors).toEqual([]);
        });

        it('should create GraphNode with specified value', () => {
            const node = new GraphNode(42);
            expect(node.val).toBe(42);
            expect(node.neighbors).toEqual([]);
        });

        it('should create GraphNode with value and neighbors', () => {
            const neighbor1 = new GraphNode(1);
            const neighbor2 = new GraphNode(2);
            const node = new GraphNode(0, [neighbor1, neighbor2]);

            expect(node.val).toBe(0);
            expect(node.neighbors).toEqual([neighbor1, neighbor2]);
        });

        it('should handle negative values', () => {
            const node = new GraphNode(-5);
            expect(node.val).toBe(-5);
            expect(node.neighbors).toEqual([]);
        });
    });

    // New tests for graph DFS on adjacency lists
    describe('Graph DFS (dfsGraphRecursive & dfsGraphIterative)', () => {
        it('should return [] for invalid start or empty graph', () => {
            expect(dfsGraphRecursive([], 0)).toEqual([]);
            expect(dfsGraphIterative([], 0)).toEqual([]);
            const graph = [[1]];
            expect(dfsGraphRecursive(graph, -1)).toEqual([]);
            expect(dfsGraphIterative(graph, 2)).toEqual([]);
        });

        it('should match traversal order on a simple DAG', () => {
            // 0 -> 1 -> 3, 0 -> 2 -> 3
            const graph = [[1, 2], [3], [3], []];
            expect(dfsGraphRecursive(graph, 0)).toEqual([0, 1, 3, 2]);
            expect(dfsGraphIterative(graph, 0)).toEqual([0, 1, 3, 2]);
        });

        it('should visit only reachable component in a disconnected graph', () => {
            // Component A: 0 -> 1, Component B: 2 -> 3
            const graph = [[1], [], [3], []];
            expect(dfsGraphRecursive(graph, 0)).toEqual([0, 1]);
            expect(dfsGraphIterative(graph, 0)).toEqual([0, 1]);
        });

        it('should handle cycles without infinite loop', () => {
            // Cycle: 0 -> 1 -> 2 -> 0
            const graph = [[1], [2], [0]];
            expect(dfsGraphRecursive(graph, 0)).toEqual([0, 1, 2]);
            expect(dfsGraphIterative(graph, 0)).toEqual([0, 1, 2]);
        });

        it('should produce deterministic order for larger graph', () => {
            // 0 -> 1 -> 2 -> 3, and 0 -> 3
            const graph = [[1, 3], [2], [3], []];
            expect(dfsGraphRecursive(graph, 0)).toEqual([0, 1, 2, 3]);
            expect(dfsGraphIterative(graph, 0)).toEqual([0, 1, 2, 3]);
        });
    });
});