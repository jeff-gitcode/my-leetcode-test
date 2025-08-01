/**
 * Solution for the "Reverse Linked List" problem
 * 
 * Problem: Given the head of a singly linked list, reverse the list and return the reversed list.
 * 
 * Approach: Iterative In-place Reversal
 * - Use three pointers: prev, current, next
 * - Reverse links one by one
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

export function reverseList(head: ListNode | null): ListNode | null {
    let prev: ListNode | null = null;
    let current: ListNode | null = head;

    while (current !== null) {
        const next = current.next;
        current.next = prev;
        prev = current;
        current = next;
    }

    return prev;
}
