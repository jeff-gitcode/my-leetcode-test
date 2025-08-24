/**
 * Solution for the "3Sum" problem - LeetCode #15
 * 
 * Problem: Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] 
 * such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.
 * 
 * Approach: Sort array + Two Pointers
 * - Sort the array first
 * - For each element, use two pointers to find pairs that sum to the negative of current element
 * - Skip duplicates to avoid duplicate triplets
 * 
 * Time Complexity: O(n²)
 * Space Complexity: O(1) excluding output array
 * 
 * Example:
 * Input: nums = [-1,0,1,2,-1,-4]
 * Output: [[-1,-1,2],[-1,0,1]]
 * Explanation: The unique triplets that sum to zero are [-1,-1,2] and [-1,0,1].
 */

export function threeSum(nums: number[]): number[][] {
    if (nums.length < 3) return []; // Not enough elements for a triplet

    nums.sort((a, b) => a - b); // Sort the array for two-pointer approach
    const result: number[][] = [];

    for (let i = 0; i < nums.length - 2; i++) { // ensures that there are always at least two more elements after i in the array. This is important because the threeSum problem requires finding triplets (groups of three numbers) that sum to a target value (usually zero).
        if (i > 0 && nums[i] === nums[i - 1]) continue; // Skip duplicate first elements

        let left = i + 1; // Left pointer after i
        let right = nums.length - 1; // Right pointer at end

        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right]; // Sum of triplet

            if (sum === 0) {
                result.push([nums[i], nums[left], nums[right]]); // Found a valid triplet

                while (left < right && nums[left] === nums[left + 1]) left++; // Skip duplicate left
                while (left < right && nums[right] === nums[right - 1]) right--; // Skip duplicate right

                left++;
                right--;
            } else if (sum < 0) {
                left++; // Need a larger sum, move left pointer right
            } else {
                right--; // Need a smaller sum, move right pointer left
            }
        }
    }

    return result; // Return all unique triplets
}
