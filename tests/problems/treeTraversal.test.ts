import {
    TreeNode,
    inorderTraversal,
    inorderTraversalIterative,
    preorderTraversal,
    postorderTraversal,
    levelOrder,
    binaryTreePaths,
    kthSmallest,
    maxPathSum,
    searchBST,
    searchBSTIterative,
} from '../../src/problems/treeTraversal';

// Helper: build binary tree from level-order array with null placeholders
function createBinaryTree(values: Array<number | null>): TreeNode | null {
    if (!values.length || values[0] === null) return null;
    const root = new TreeNode(values[0]!);
    const queue: TreeNode[] = [root];
    let i = 1;

    while (queue.length > 0 && i < values.length) {
        const node = queue.shift()!;
        if (i < values.length && values[i] !== null) {
            node.left = new TreeNode(values[i]!);
            queue.push(node.left);
        }
        i++;
        if (i < values.length && values[i] !== null) {
            node.right = new TreeNode(values[i]!);
            queue.push(node.right);
        }
        i++;
    }
    return root;
}

// Helpers: build a BST from an array of numbers
function insertBST(root: TreeNode | null, val: number): TreeNode {
    if (!root) return new TreeNode(val);
    if (val < root.val) root.left = insertBST(root.left, val);
    else root.right = insertBST(root.right, val);
    return root;
}
function buildBST(arr: number[]): TreeNode | null {
    let root: TreeNode | null = null;
    for (const v of arr) root = insertBST(root, v);
    return root;
}

describe('treeTraversal.ts', () => {
    describe('TreeNode', () => {
        it('constructs with default values', () => {
            const n = new TreeNode();
            expect(n.val).toBe(0);
            expect(n.left).toBeNull();
            expect(n.right).toBeNull();
        });

        it('constructs with provided values', () => {
            const left = new TreeNode(1);
            const right = new TreeNode(3);
            const root = new TreeNode(2, left, right);
            expect(root.val).toBe(2);
            expect(root.left).toBe(left);
            expect(root.right).toBe(right);
        });
    });

    describe('Traversals', () => {
        it('inorderTraversal returns empty array for null root', () => {
            expect(inorderTraversal(null)).toEqual([]);
            expect(inorderTraversalIterative(null)).toEqual([]);
            expect(preorderTraversal(null)).toEqual([]);
            expect(postorderTraversal(null)).toEqual([]);
        });

        it('handles LeetCode example [1,null,2,3] for inorder', () => {
            // Tree:
            //   1
            //    \
            //     2
            //    /
            //   3
            const root = createBinaryTree([1, null, 2, 3]);
            expect(inorderTraversal(root)).toEqual([1, 3, 2]);
            expect(inorderTraversalIterative(root)).toEqual([1, 3, 2]);
        });

        it('preorder and postorder for [3,9,20,null,null,15,7]', () => {
            const root = createBinaryTree([3, 9, 20, null, null, 15, 7]);
            expect(preorderTraversal(root)).toEqual([3, 9, 20, 15, 7]);
            expect(postorderTraversal(root)).toEqual([9, 15, 7, 20, 3]);
            expect(inorderTraversal(root)).toEqual([9, 3, 15, 20, 7]);
            expect(inorderTraversalIterative(root)).toEqual([9, 3, 15, 20, 7]);
        });

        it('inorder recursive equals iterative for a random tree', () => {
            const root = createBinaryTree([5, 3, 8, 1, 4, 7, 10, null, 2, null, null, 6, 9]);
            const rec = inorderTraversal(root);
            const iter = inorderTraversalIterative(root);
            expect(iter).toEqual(rec);
        });
    });

    describe('levelOrder', () => {
        it('returns [] for empty tree', () => {
            expect(levelOrder(null)).toEqual([]);
        });

        it('returns [[val]] for single node', () => {
            const root = new TreeNode(42);
            expect(levelOrder(root)).toEqual([[42]]);
        });

        it('handles typical example [3,9,20,null,null,15,7]', () => {
            const root = createBinaryTree([3, 9, 20, null, null, 15, 7]);
            expect(levelOrder(root)).toEqual([[3], [9, 20], [15, 7]]);
        });
    });

    describe('binaryTreePaths', () => {
        it('returns [] for empty tree', () => {
            expect(binaryTreePaths(null)).toEqual([]);
        });

        it('returns single path for single node', () => {
            expect(binaryTreePaths(new TreeNode(1))).toEqual(['1']);
        });

        it('handles [1,2,3,null,5]', () => {
            // Paths: 1->2->5 and 1->3
            const root = createBinaryTree([1, 2, 3, null, 5]);
            const result = binaryTreePaths(root);
            expect(result.sort()).toEqual(['1->2->5', '1->3'].sort());
        });
    });

    describe('kthSmallest (BST)', () => {
        it('returns correct kth values in a BST', () => {
            // Build BST from [5,3,6,2,4,1] -> inorder: [1,2,3,4,5,6]
            const root = buildBST([5, 3, 6, 2, 4, 1])!;
            expect(kthSmallest(root, 1)).toBe(1);
            expect(kthSmallest(root, 2)).toBe(2);
            expect(kthSmallest(root, 3)).toBe(3);
            expect(kthSmallest(root, 4)).toBe(4);
            expect(kthSmallest(root, 5)).toBe(5);
            expect(kthSmallest(root, 6)).toBe(6);
        });

        it('handles skewed BST', () => {
            // Right-skewed: 1->2->3->4
            const root = buildBST([1, 2, 3, 4])!;
            expect(kthSmallest(root, 3)).toBe(3);
        });
    });

    describe('maxPathSum', () => {
        it('handles positive values [1,2,3] => 6', () => {
            const root = createBinaryTree([1, 2, 3]);
            expect(maxPathSum(root)).toBe(6);
        });

        it('handles mixed values [-10,9,20,null,null,15,7] => 42', () => {
            const root = createBinaryTree([-10, 9, 20, null, null, 15, 7]);
            expect(maxPathSum(root)).toBe(42);
        });

        it('handles single negative node', () => {
            const root = new TreeNode(-3);
            expect(maxPathSum(root)).toBe(-3);
        });

        it('handles mixed negatives, choose best path', () => {
            const root = createBinaryTree([2, -1]);
            expect(maxPathSum(root)).toBe(2);
        });
    });

    describe('searchBST and searchBSTIterative', () => {
        it('finds existing nodes and returns subtree (recursive)', () => {
            // BST: [4,2,7,1,3]
            const root = createBinaryTree([4, 2, 7, 1, 3]);
            const node2 = searchBST(root, 2);
            expect(node2?.val).toBe(2);
            // Subtree rooted at 2 should have inorder [1,2,3]
            expect(inorderTraversal(node2)).toEqual([1, 2, 3]);

            const node7 = searchBST(root, 7);
            expect(node7?.val).toBe(7);
            expect(inorderTraversal(node7)).toEqual([7]);
        });

        it('returns null when value not found (recursive)', () => {
            const root = createBinaryTree([4, 2, 7, 1, 3]);
            expect(searchBST(root, 5)).toBeNull();
        });

        it('iterative variant matches recursive behavior', () => {
            const root = buildBST([5, 3, 6, 2, 4, 1])!;
            for (const val of [1, 2, 3, 4, 5, 6]) {
                const r = searchBST(root, val);
                const i = searchBSTIterative(root, val);
                expect(i?.val).toBe(r?.val);
            }
            expect(searchBSTIterative(root, 999)).toBeNull();
        });
    });
});