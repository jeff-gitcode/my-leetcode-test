/**
 * Solution for "Subarray Sum Equals K" - LeetCode #560
 * 
 * Problem: Given an array of integers nums and an integer k, return the total number of continuous
 * subarrays whose sum equals to k.
 * 
 * Approach: Prefix Sum with HashMap
 * - Use a map to store prefix sums and their frequencies
 * - For each position, check if (currentSum - k) exists in the map
 * - If it exists, add its frequency to the result
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 * 
 * Example:
 * Input: nums = [1,1,1], k = 2
 * Output: 2
 * Explanation: There are two subarrays with sum 2: [1,1] at positions 0-1 and 1-2.
 * 
 * Input: nums = [1,2,3], k = 3
 * Output: 2
 * Explanation: Subarrays [1,2] at positions 0-1 and [3] at position 2.
 */

export function subarraySum(nums: number[], k: number): number {
    // Initialize map with running sum 0 having frequency 1 (empty subarray)
    const map = new Map<number, number>();
    map.set(0, 1);
    // Example: nums = [1,2,3], k = 3
    // map = {0:1} at start

    let count = 0;      // Result: number of valid subarrays
    let prefixSum = 0;  // Running sum up to current position

    for (let i = 0; i < nums.length; i++) {
        // Update running sum
        prefixSum += nums[i];
        // Example: i=0, prefixSum=1; i=1, prefixSum=3; i=2, prefixSum=6

        // Check if we have seen (prefixSum - k) before
        // If so, there are 'map.get(prefixSum - k)' subarrays ending at i with sum k
        if (map.has(prefixSum - k)) {
            count += map.get(prefixSum - k)!;
            // Example: i=1, prefixSum=3, prefixSum-k=0, map has 0, count=1
            // Example: i=2, prefixSum=6, prefixSum-k=3, map has 3, count=2
        }

        // Update prefix sum frequency in map
        map.set(prefixSum, (map.get(prefixSum) || 0) + 1);
        // Example: after i=0, map={0:1,1:1}; after i=1, map={0:1,1:1,3:1}; after i=2, map={0:1,1:1,3:1,6:1}
    }

    return count;
    // Example output: 2 (subarrays [1,2] and [3] for k=3)
}
