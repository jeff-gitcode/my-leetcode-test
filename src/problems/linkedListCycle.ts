/**
 * Solution for the "Linked List Cycle" problem
 * 
 * Problem: Given head of a linked list, determine if the linked list has a cycle.
 * 
 * Approach: Fast & Slow Pointers (Floyd's Cycle Detection)
 * - Use two pointers moving at different speeds
 * - If there's a cycle, fast pointer will eventually meet slow pointer
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

export function hasCycle(head: ListNode | null): boolean {
    if (!head || !head.next) return false;

    let slow: ListNode | null = head;
    let fast: ListNode | null = head;

    while (fast && fast.next) {
        slow = slow!.next;
        fast = fast.next.next;

        if (slow === fast) {
            return true;
        }
    }

    return false;
}
