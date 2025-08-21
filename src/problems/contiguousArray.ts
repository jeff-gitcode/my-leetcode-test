/**
 * Contiguous Array - LeetCode Medium
 *
 * Problem: Given a binary array nums, find the maximum length of a contiguous subarray with equal number of 0 and 1.
 * 
 * Approach: Prefix Sum with Hashmap
 * - Convert 0s to -1s so that equal number of 0s and 1s sum to 0
 * - Keep track of running sum and first index where each sum appears
 * - When we encounter a sum we've seen before, it means the subarray between the first occurrence 
 *   and current index has equal 0s and 1s
 * - Track maximum length of such subarrays
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */

/**
 * Finds the maximum length of a contiguous subarray with an equal number of 0 and 1.
 * @param nums - Binary array containing only 0 and 1
 * @returns Maximum length of a contiguous subarray with equal number of 0 and 1
 */
export function findMaxLength(nums: number[]): number {
    // Edge cases
    if (!nums || nums.length < 2) {
        return 0;
    }

    // Use a map to store the first occurrence of each sum
    const map = new Map<number, number>();
    map.set(0, -1); // Initialize with sum 0 at index -1 (base case)

    let result = 0;
    let count = 0;  // Treat 0s as -1 and 1s as 1, so count tracks sum

    for (let i = 0; i < nums.length; i++) {
        // Increment count for 1, decrement for 0
        count += nums[i] === 1 ? 1 : -1;

        // If we've seen this count before, it means the subarray between
        // the first occurrence and current index has equal 0s and 1s
        if (map.has(count)) {
            result = Math.max(result, i - map.get(count)!);
        } else {
            // Store the first index where we see this count
            map.set(count, i);
        }
    }

    return result;
}