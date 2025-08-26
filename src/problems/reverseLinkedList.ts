/**
 * Solution for "Reverse Linked List" - LeetCode #206
 * 
 * Problem: Given the head of a singly linked list, reverse the list and return the reversed list.
 * 
 * Approach: In-place Iterative Reversal
 * - Track previous, current, and next nodes
 * - Reverse each pointer as we traverse the list
 * 
 * Time Complexity: O(n) where n is the length of the list
 * Space Complexity: O(1) - constant extra space
 * 
 * Example:
 * Input: head = [1,2,3,4,5]
 * Output: [5,4,3,2,1]
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

export function reverseList(head: ListNode | null): ListNode | null {
    // Edge case: empty list or single node
    if (!head || !head.next) return head;

    let prev: ListNode | null = null;
    let current: ListNode | null = head;

    // Iterate through the list
    while (current) {
        // Store next node before we change the pointer
        const next: ListNode | null = current.next;

        // Reverse the pointer
        current.next = prev;

        // Move forward in the list
        prev = current;
        current = next;
    }

    // The new head is the previous tail (now prev)
    return prev;
}

/**
 * Alternative recursive solution
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(n) due to the call stack
 */
export function reverseListRecursive(head: ListNode | null): ListNode | null {
    // Base case: empty list or last node
    if (!head || !head.next) return head;

    // Recursively reverse the rest of the list after head
    const reversedList = reverseListRecursive(head.next);

    // Make the next node point back to the current node
    head.next.next = head;

    // Break the original forward pointer to avoid cycles
    head.next = null;

    // Return the new head (which was the original tail)
    return reversedList;
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