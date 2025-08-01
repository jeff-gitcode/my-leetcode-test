/**
 * Solution for the "Swap Nodes in Pairs" problem
 * 
 * Problem: Given a linked list, swap every two adjacent nodes and return its head.
 * 
 * Approach: Iterative In-place Reversal
 * - Use dummy node to simplify edge cases
 * - Swap pairs iteratively
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */

export class ListNode {
    val: number;
    next: ListNode | null;
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val === undefined ? 0 : val);
        this.next = (next === undefined ? null : next);
    }
}

export function swapPairs(head: ListNode | null): ListNode | null {
    const dummy = new ListNode(0);
    dummy.next = head;
    let prev = dummy;

    while (prev.next && prev.next.next) {
        // Nodes to be swapped
        const first = prev.next;
        const second = prev.next.next;

        // Swapping
        prev.next = second;
        first.next = second.next;
        second.next = first;

        // Move prev to the end of swapped pair
        prev = first;
    }

    return dummy.next;
}
