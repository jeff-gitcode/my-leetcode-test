/**
 * Solution for the "Find the Duplicate Number" problem - LeetCode #287
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
 * 
 * Input: nums = [3,1,3,4,2]
 * Output: 3
 * Explanation: 3 is the duplicate number.
 */

export function findDuplicate287(nums: number[]): number {
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
