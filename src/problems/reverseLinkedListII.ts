/**
 * Solution for the "Reverse Linked List II" problem
 * 
 * Problem: Given the head of a singly linked list and two integers left and right 
 * where left <= right, reverse the nodes from position left to position right.
 * 
 * Approach: In-place Reversal with Boundary Tracking
 * - Find the start of reversal section
 * - Reverse the sublist
 * - Connect back to the original list
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

export function reverseBetween(head: ListNode | null, left: number, right: number): ListNode | null {
    if (!head || left === right) return head;

    // Create dummy node to handle edge case where left = 1
    const dummy = new ListNode(0);
    dummy.next = head;
    let prev = dummy;

    // Move to the node before the reversal starts
    for (let i = 1; i < left; i++) {
        prev = prev.next!;
    }

    // Start reversing from the left position
    const current = prev.next!;

    for (let i = 0; i < right - left; i++) {
        const next = current.next!;
        current.next = next.next;
        next.next = prev.next;
        prev.next = next;
    }

    return dummy.next;
}
