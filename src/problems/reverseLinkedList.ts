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

/**
 * Solution for "Reverse Linked List" - LeetCode #206
 * 
 * Problem: Reverse a singly linked list.
 * 
 * Approach: Iterative
 * - Use three pointers to reverse links
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
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

/**
 * Solution for "Reverse Linked List II" - LeetCode #92
 * 
 * Problem: Reverse a sublist of a linked list from position left to right.
 * 
 * Approach: Iterative
 * - Use dummy node and reverse sublist in-place
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
export function reverseBetween(head: ListNode | null, left: number, right: number): ListNode | null {
    if (!head || left === right) return head;
    const result = new ListNode(0, head);
    let prev = result;
    for (let i = 1; i < left; i++) {
        prev = prev.next!;
    }
    let curr = prev.next;
    for (let i = 0; i < right - left; i++) {
        const temp = curr!.next;
        curr!.next = temp!.next;
        temp!.next = prev.next;
        prev.next = temp;
    }
    return result.next;
}

/**
 * Solution for "Reverse Nodes in k-Group" - LeetCode #25
 * 
 * Problem: Reverse nodes of a linked list k at a time.
 * 
 * Approach: Iterative
 * - Reverse every k nodes, connect groups
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
export function reverseKGroup(head: ListNode | null, k: number): ListNode | null {
    const result = new ListNode(0, head);
    let prev = result;

    while (true) {
        let kth = prev;
        for (let i = 0; i < k && kth; i++) {
            kth = kth.next;
        }
        if (!kth) break;

        let temp = prev.next;
        let curr = temp!.next;
        for (let i = 1; i < k; i++) {
            temp!.next = curr!.next;
            curr!.next = prev.next;
            prev.next = curr;
            curr = temp!.next;
        }
        prev = temp!;
    }
    return result.next;
}