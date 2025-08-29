/**
 * Tree Traversal implementations
 * 
 * Patterns: Inorder, Preorder, Postorder traversals
 * Both recursive and iterative approaches
 */

export class TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;

    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = val ?? 0;
        this.left = left ?? null;
        this.right = right ?? null;
    }
}

/**
 * Inorder Traversal (Left -> Root -> Right)
 * @param root - Root of the binary tree
 * @returns Array of values in inorder
 */
export function inorderTraversal(root: TreeNode | null): number[] {
    const result: number[] = [];

    const traverse = (node: TreeNode | null): void => {
        if (!node) return;

        traverse(node.left);   // Left
        result.push(node.val); // Root
        traverse(node.right);  // Right
    };

    traverse(root);
    return result;
}

/**
 * Inorder Traversal - Iterative approach
 * @param root - Root of the binary tree
 * @returns Array of values in inorder
 */
export function inorderTraversalIterative(root: TreeNode | null): number[] {
    const result: number[] = [];
    const stack: TreeNode[] = [];
    let current = root;

    while (current || stack.length > 0) {
        // Go to the leftmost node
        while (current) {
            stack.push(current);
            current = current.left;
        }

        // Process current node
        current = stack.pop()!;
        result.push(current.val);

        // Move to right subtree
        current = current.right;
    }

    return result;
}

/**
 * Preorder Traversal (Root -> Left -> Right)
 * @param root - Root of the binary tree
 * @returns Array of values in preorder
 */
export function preorderTraversal(root: TreeNode | null): number[] {
    const result: number[] = [];

    const traverse = (node: TreeNode | null): void => {
        if (!node) return;

        result.push(node.val); // Root
        traverse(node.left);   // Left
        traverse(node.right);  // Right
    };

    traverse(root);
    return result;
}

/**
 * Postorder Traversal (Left -> Right -> Root)
 * @param root - Root of the binary tree
 * @returns Array of values in postorder
 */
export function postorderTraversal(root: TreeNode | null): number[] {
    const result: number[] = [];

    const traverse = (node: TreeNode | null): void => {
        if (!node) return;

        traverse(node.left);   // Left
        traverse(node.right);  // Right
        result.push(node.val); // Root
    };

    traverse(root);
    return result;
}

/**
 * Problem #102: Binary Tree Level Order Traversal (Medium)
 * 
 * Given a binary tree, return its level order traversal as a 2D array.
 * Approach:
 * - Use BFS (queue) to traverse the tree level by level.
 * - For each level, collect node values in an array.
 * 
 * Example:
 * Input: [3,9,20,null,null,15,7]
 * Tree:
 *      3
 *     / \
 *    9  20
 *       / \
 *      15  7
 * Output: [[3],[9,20],[15,7]]
 */
export function levelOrder(root: TreeNode | null): number[][] {
    if (!root) return [];                           // Edge case: empty tree returns empty array

    const result: number[][] = [];                  // Store level order traversal
    const queue: TreeNode[] = [root];               // Queue for BFS, start with root
    // Example: queue = [3] for tree [3,9,20,null,null,15,7]

    while (queue.length > 0) {                      // While there are nodes to process
        const levelSize = queue.length;             // Number of nodes at current level
        const currentLevel: number[] = [];          // Store values for this level

        for (let i = 0; i < levelSize; i++) {       // Process all nodes at this level
            const node = queue.shift()!;            // Remove node from queue
            currentLevel.push(node.val);            // Add node value to current level
            // Example: first loop, node=3, currentLevel=[3]

            if (node.left) queue.push(node.left);   // Add left child to queue if exists
            // Example: node.left=9, queue=[9]
            if (node.right) queue.push(node.right); // Add right child to queue if exists
            // Example: node.right=20, queue=[9,20]
        }

        result.push(currentLevel);                  // Add current level to result
        // Example: after first loop, result = [[3]], queue = [9,20]
        // After second loop, result = [[3],[9,20]], queue = [15,7]
        // After third loop, result = [[3],[9,20],[15,7]], queue = []
    }

    return result;                                  // Return level order traversal
    // Example output: [[3],[9,20],[15,7]]
}

/**
 * Binary Tree Paths - Find all root-to-leaf paths
 * @param root - Root of the binary tree
 * @returns Array of all root-to-leaf paths as strings
 */
export function binaryTreePaths(root: TreeNode | null): string[] {
    const result: string[] = [];

    const dfs = (node: TreeNode | null, path: string): void => {
        if (!node) return;

        // Add current node to path
        const currentPath = path ? `${path}->${node.val}` : `${node.val}`;

        // If it's a leaf node, add path to result
        if (!node.left && !node.right) {
            result.push(currentPath);
            return;
        }

        // Continue DFS for children
        dfs(node.left, currentPath);
        dfs(node.right, currentPath);
    };

    dfs(root, '');
    return result;
}

/**
 * Kth Smallest Element in a BST
 * @param root - Root of the BST
 * @param k - Position of element to find (1-indexed)
 * @returns The kth smallest element
 */
export function kthSmallest(root: TreeNode | null, k: number): number {
    let count = 0;
    let result = 0;

    const inorder = (node: TreeNode | null): void => {
        if (!node || count >= k) return;

        inorder(node.left);

        count++;
        if (count === k) {
            result = node.val;
            return;
        }

        inorder(node.right);
    };

    inorder(root);
    return result;
}

/**
 * Binary Tree Maximum Path Sum
 * @param root - Root of the binary tree
 * @returns Maximum path sum between any two nodes
 */
export function maxPathSum(root: TreeNode | null): number {
    let maxSum = -Infinity;

    const maxGain = (node: TreeNode | null): number => {
        if (!node) return 0;

        // Maximum gain from left and right subtrees (ignore negative gains)
        const leftGain = Math.max(maxGain(node.left), 0);
        const rightGain = Math.max(maxGain(node.right), 0);

        // Maximum path sum through current node
        const currentMaxPath = node.val + leftGain + rightGain;

        // Update global maximum
        maxSum = Math.max(maxSum, currentMaxPath);

        // Return maximum gain starting from current node
        return node.val + Math.max(leftGain, rightGain);
    };

    maxGain(root);
    return maxSum;
}

/**
 * Search in a Binary Search Tree (BST)
 * @param root - Root of the BST
 * @param val - Value to search
 * @returns Subtree rooted at the found node, or null if not found
 */
export function searchBST(root: TreeNode | null, val: number): TreeNode | null {
    if (!root) return null;
    if (root.val === val) return root;
    return val < root.val ? searchBST(root.left, val) : searchBST(root.right, val);
}

/**
 * Iterative variant of Search in a BST
 */
export function searchBSTIterative(root: TreeNode | null, val: number): TreeNode | null {
    let curr = root;
    while (curr) {
        if (curr.val === val) return curr;
        curr = val < curr.val ? curr.left : curr.right;
    }
    return null;
}
