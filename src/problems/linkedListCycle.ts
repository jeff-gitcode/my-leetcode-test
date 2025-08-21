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

/**
 * Solution for "Linked List Cycle II" - LeetCode #142
 * 
 * Problem: Given a linked list with a cycle, return the node where the cycle begins. If no cycle, return null.
 * 
 * Approach: Fast & Slow Pointers
 * - First detect cycle, then move one pointer to head and both by 1 until they meet
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
export function detectCycle(head: ListNode | null): ListNode | null {
    let slow = head, fast = head;
    while (fast && fast.next) {
        slow = slow!.next;
        fast = fast.next.next;
        if (slow === fast) {
            // Cycle detected, find entry
            let result = head;
            while (result !== slow) {
                result = result!.next;
                slow = slow!.next;
            }
            return result;
        }
    }
    return null;
}

/**
 * Solution for "Happy Number" - LeetCode #202
 * 
 * Problem: Determine if a number is happy (eventually reaches 1 by replacing with sum of squares of digits).
 * 
 * Approach: Fast & Slow Pointers (cycle detection)
 * - Use a set or Floyd's cycle detection to check for cycles
 * 
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 */
export function isHappy(n: number): boolean {
    function getNext(num: number): number {
        let result = 0;
        while (num > 0) {
            const digit = num % 10;
            result += digit * digit;
            num = Math.floor(num / 10);
        }
        return result;
    }

    let slow = n, fast = getNext(n);
    while (fast !== 1 && slow !== fast) {
        slow = getNext(slow);
        fast = getNext(getNext(fast));
    }
    return fast === 1;
}
