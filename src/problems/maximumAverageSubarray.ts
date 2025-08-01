/**
 * Solution for the "Maximum Average Subarray I" problem
 * 
 * Problem: Given an array consisting of n integers, find the contiguous subarray 
 * of given length k that has the maximum average value.
 * 
 * Approach: Sliding Window
 * - Calculate sum of first k elements
 * - Slide the window by removing leftmost and adding rightmost element
 * - Track maximum sum and convert to average
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */

export function findMaxAverage(nums: number[], k: number): number {
    // Calculate sum of first k elements
    let currentSum = 0;
    for (let i = 0; i < k; i++) {
        currentSum += nums[i];
    }

    let maxSum = currentSum;

    // Slide the window
    for (let i = k; i < nums.length; i++) {
        currentSum = currentSum - nums[i - k] + nums[i];
        maxSum = Math.max(maxSum, currentSum);
    }

    return maxSum / k;
}
