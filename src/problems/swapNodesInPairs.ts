/**
 * Solution for "Swap Nodes in Pairs" - LeetCode #24
 * 
 * Problem: Given a linked list, swap every two adjacent nodes and return its head.
 * You must solve the problem without modifying the values in the list's nodes
 * (i.e., only nodes themselves may be changed.)
 * 
 * Approach: In-place Iterative Swapping with Dummy Node
 * - Use a dummy node to handle edge cases
 * - Swap pairs by adjusting pointers
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 * 
 * Example:
 * Input: head = [1,2,3,4]
 * Output: [2,1,4,3]
 * 
 * Input: head = [1]
 * Output: [1]
 */

// Definition for singly-linked list
export class ListNode {
    val: number;
    next: ListNode | null;
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val === undefined ? 0 : val);
        this.next = (next === undefined ? null : next);
    }
}

export function swapPairs(head: ListNode | null): ListNode | null {
    // Edge case: empty list or single node
    if (!head || !head.next) return head;

    // Create dummy node to handle edge cases
    const dummy = new ListNode(0);
    dummy.next = head;

    // Prev will point to the node before each pair
    let prev = dummy;

    while (prev.next && prev.next.next) {
        // Identify the two nodes to be swapped
        const first = prev.next;
        const second = prev.next.next;

        // Perform the swap:
        // prev -> first -> second -> rest becomes
        // prev -> second -> first -> rest

        first.next = second.next;  // first points to the node after second
        second.next = first;       // second points to first
        prev.next = second;        // prev points to second (now the first of the pair)

        // Move prev to the first node (now the second of the pair)
        prev = first;
    }

    // Return the new head
    return dummy.next;
}

/**
 * Alternative recursive solution
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(n/2) due to the call stack (approximately n/2 recursive calls)
 */
export function swapPairsRecursive(head: ListNode | null): ListNode | null {
    // Base case: empty list or single node
    if (!head || !head.next) return head;

    // Identify the two nodes to be swapped
    const first = head;
    const second = head.next;

    // Recursively swap the rest of the list
    const remaining = swapPairsRecursive(second.next);

    // Perform the swap
    second.next = first;
    first.next = remaining;

    // Return the new head (second)
    return second;
}
