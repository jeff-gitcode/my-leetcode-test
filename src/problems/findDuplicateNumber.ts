/**
 * Solution for the "Find the Duplicate Number" problem
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
 */

export function findDuplicate(nums: number[]): number {
    // Phase 1: Find intersection point in the cycle
    let slow = nums[0];
    let fast = nums[0];

    do {
        slow = nums[slow];
        fast = nums[nums[fast]];
    } while (slow !== fast);

    // Phase 2: Find entrance to the cycle
    slow = nums[0];
    while (slow !== fast) {
        slow = nums[slow];
        fast = nums[fast];
    }

    return slow;
}
