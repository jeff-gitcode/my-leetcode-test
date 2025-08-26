/**
 * Solution for "Linked List Cycle" - LeetCode #141
 * 
 * Problem: Given head, the head of a linked list, determine if the linked list has a cycle in it.
 * Return true if there is a cycle, or false otherwise.
 * 
 * Approach: Fast & Slow Pointers (Floyd's Cycle-Finding Algorithm)
 * - Use two pointers moving at different speeds
 * - If they meet, there is a cycle
 * - If the fast pointer reaches the end, there is no cycle
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(1) - constant extra space
 * 
 * Example:
 * Input: head = [3,2,0,-4], pos = 1 (cycle links to position 1)
 * Output: true
 * Explanation: There is a cycle in the linked list, where the tail connects to the 1st node (0-indexed).
 */

// Definition for singly-linked list with a potential cycle
export class ListNode {
    val: number;
    next: ListNode | null;
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val === undefined ? 0 : val);
        this.next = (next === undefined ? null : next);
    }
}

export function hasCycle(head: ListNode | null): boolean {
    // Edge case: empty list or single node
    if (!head || !head.next) return false;

    // Initialize slow and fast pointers at the head
    let slow: ListNode | null = head;
    let fast: ListNode | null = head;

    // Move slow by 1 step and fast by 2 steps
    while (fast && fast.next) {
        slow = slow!.next;          // Move slow pointer by 1
        fast = fast.next.next;      // Move fast pointer by 2

        // If they meet, there's a cycle
        if (slow === fast) return true;
    }

    // If fast reaches the end, there's no cycle
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
 * 
 * Example:
 * Input: head = [3,2,0,-4], pos = 1 (pos indicates where tail connects)
 * Output: Return the node with value 2 (at position 1)
 * Explanation: There is a cycle in the linked list where the tail connects to the second node.
 */
export function detectCycle(head: ListNode | null): ListNode | null {
    let slow = head, fast = head;             // Initialize both pointers at the head

    while (fast && fast.next) {               // Continue until fast reaches the end (null)
        slow = slow!.next;                    // Move slow pointer one step
        fast = fast.next.next;                // Move fast pointer two steps

        if (slow === fast) {                  // If pointers meet, a cycle exists
            // Phase 2: Find the entrance of the cycle
            let result = head;                // Reset a pointer to the head

            while (result !== slow) {         // Move both pointers one step at a time
                result = result!.next;        // Until they meet at the cycle entrance
                slow = slow!.next;
            }

            return result;                    // Return the node where the cycle begins
        }
    }

    return null;                              // No cycle detected, return null
}

/**
 * Solution for "Happy Number" - LeetCode #202
 * 
 * Problem: Determine if a number is happy (eventually reaches 1 by replacing with sum of squares of digits).
 * 
 * Approach: Fast & Slow Pointers (cycle detection)
 * - Apply the transformation and use two pointers moving at different speeds
 * - If we reach 1, return true
 * - If we detect a cycle (meaning it will never reach 1), return false
 * 
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 * 
 * Example:
 * Input: n = 19
 * Output: true
 * Explanation: 1² + 9² = 82, 8² + 2² = 68, 6² + 8² = 100, 1² + 0² + 0² = 1
 */
export function isHappy(n: number): boolean {
    // Helper function to calculate sum of squares of digits
    function getNext(num: number): number {
        let sum = 0;                          // Initialize sum
        while (num > 0) {                     // Process each digit
            const digit = num % 10;           // Get rightmost digit
            sum += digit * digit;             // Add square of digit to sum
            num = Math.floor(num / 10);       // Remove rightmost digit
        }
        return sum;                           // Return the sum of squared digits
    }

    let slow = n;                             // Slow pointer starts at n
    let fast = getNext(n);                    // Fast pointer starts one step ahead

    while (fast !== 1 && slow !== fast) {     // Continue until we find 1 or detect a cycle
        slow = getNext(slow);                 // Move slow pointer one transformation
        fast = getNext(getNext(fast));        // Move fast pointer two transformations
    }

    return fast === 1;                        // Return true if we reached 1, false if cycle detected
}


/**
 * Solution for "Find the Duplicate Number" - LeetCode #287
 * 
 * Problem: Given an array of integers nums containing n + 1 integers where each 
 * integer is in the range [1, n] inclusive, find the duplicate number.
 * 
 * Approach: Fast & Slow Pointers (Floyd's Cycle Detection)
 * - Treat array as a linked list where nums[i] points to nums[nums[i]]
 * - Use cycle detection to find the entrance of the cycle (duplicate number)
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 * 
 * Example:
 * Input: nums = [1,3,4,2,2]
 * Output: 2
 * Explanation: 2 is the duplicate number.
 */
export function findDuplicate(nums: number[]): number {
    // Phase 1: Find intersection point in the cycle
    let slow = nums[0];                       // Slow pointer starts at first element
    let fast = nums[0];                       // Fast pointer starts at first element

    do {
        slow = nums[slow];                    // Move slow pointer one step
        fast = nums[nums[fast]];              // Move fast pointer two steps
    } while (slow !== fast);                  // Continue until pointers meet

    // Phase 2: Find entrance to the cycle
    slow = nums[0];                           // Reset slow pointer to start
    while (slow !== fast) {                   // Move both pointers at same speed
        slow = nums[slow];                    // Move slow pointer one step
        fast = nums[fast];                    // Move fast pointer one step
    }

    return slow;                              // Return the entrance to cycle (duplicate number)
}