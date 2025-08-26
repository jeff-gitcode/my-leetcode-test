/**
 * Solution for "Contiguous Array" - LeetCode #525
 * 
 * Problem: Given a binary array nums, find the maximum length of a contiguous subarray
 * with an equal number of 0 and 1.
 * 
 * Approach: Prefix Sum with HashMap
 * - Convert 0s to -1s so equal number of 0s and 1s means sum = 0
 * - Use a map to store the first occurrence of each running sum
 * - When we see the same sum again, we found a subarray with equal 0s and 1s
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 * 
 * Example:
 * Input: nums = [0,1,0,0,1,1,0]
 * Output: 6
 * Explanation: The subarray [0,1,0,0,1,1] has equal number of 0s and 1s (3 each).
 */

export function findMaxLength(nums: number[]): number {
    // Initialize map with running sum 0 at index -1 (before array starts)
    const map = new Map<number, number>();
    map.set(0, -1);

    let maxLength = 0;
    let count = 0; // Running sum (treating 0s as -1s)

    for (let i = 0; i < nums.length; i++) {
        // Increment count by 1 for 1s, decrement by 1 for 0s
        count += nums[i] === 1 ? 1 : -1;

        // If we've seen this count before, we found a subarray with equal 0s and 1s
        if (map.has(count)) {
            maxLength = Math.max(maxLength, i - map.get(count)!);
        } else {
            // Store the first occurrence of this count
            map.set(count, i);
        }
    }

    return maxLength;
}