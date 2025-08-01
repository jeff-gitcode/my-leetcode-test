/**
 * Solution for the "Subarray Sum Equals K" problem
 * 
 * Problem: Given an array of integers nums and an integer k, return the total 
 * number of continuous subarrays whose sum equals to k.
 * 
 * Approach: Use prefix sum with hash map
 * - Track cumulative sum and count occurrences of each prefix sum
 * - For each position, check if (currentSum - k) exists in the map
 * - If it exists, add its count to the result (those are valid subarrays ending at current position)
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */

/**
 * Finds the number of continuous subarrays whose sum equals k
 * @param nums - Array of integers
 * @param k - Target sum
 * @returns Number of subarrays with sum equal to k
 */
export function subarraySum(nums: number[], k: number): number {
    // Map to store prefix sum frequencies
    const prefixSumCount = new Map<number, number>();

    // Initialize with sum 0 appearing once (empty subarray)
    prefixSumCount.set(0, 1);

    let currentSum = 0;
    let count = 0;

    for (const num of nums) {
        // Update current prefix sum
        currentSum += num;

        // Check if (currentSum - k) exists in map
        // This means there's a subarray ending at current position with sum k
        const target = currentSum - k;
        if (prefixSumCount.has(target)) {
            count += prefixSumCount.get(target)!;
        }

        // Update frequency of current prefix sum
        prefixSumCount.set(currentSum, (prefixSumCount.get(currentSum) || 0) + 1);
    }

    return count;
}
