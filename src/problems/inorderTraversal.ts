/**
 * Solution for "Binary Tree Inorder Traversal" - LeetCode #94
 * 
 * Problem: Given the root of a binary tree, return the inorder traversal of its nodes' values.
 * 
 * Approach: Recursive DFS
 * - Traverse left subtree, visit node, traverse right subtree
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(n) (call stack)
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

export function inorderTraversal(root: TreeNode | null): number[] {
    const result: number[] = [];
    function dfs(node: TreeNode | null) {
        if (!node) return;
        dfs(node.left);
        result.push(node.val);
        dfs(node.right);
    }
    dfs(root);
    return result;
}