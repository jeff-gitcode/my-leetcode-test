/**
 * Solution for "Maximum Average Subarray I" - LeetCode #643
 * 
 * Problem: Given an array nums and an integer k, find the maximum average value of any contiguous subarray of length k.
 * 
 * Approach: Sliding Window
 * - Calculate sum of first k elements.
 * - Slide window, updating sum and tracking maximum.
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 * 
 * Example:
 * Input: nums = [1,12,-5,-6,50,3], k = 4
 * Output: 12.75
 * Explanation: Maximum average is (12 + -5 + -6 + 50) / 4 = 12.75
 */

export function findMaxAverage(nums: number[], k: number): number { // Defines a function that finds the maximum average of any subarray of length k in nums.
    // Calculate sum of first k elements
    let currentSum = 0; // Initializes a variable to store the sum of the current window of k elements.
    for (let i = 0; i < k; i++) { // Loops through the first k elements of nums.
        currentSum += nums[i]; // Adds each of the first k elements to currentSum.
    }

    let maxSum = currentSum; // Sets maxSum to the sum of the first window as the initial maximum.

    // Slide the window
    for (let i = k; i < nums.length; i++) { // Loops from the k-th element to the end of nums.
        currentSum = currentSum - nums[i - k] + nums[i]; // Updates currentSum by removing the element that is sliding out and adding the new element.
        maxSum = Math.max(maxSum, currentSum); // Updates maxSum if the new currentSum is greater.
    }

    return maxSum / k; // Returns the maximum average by dividing maxSum by k.
}
