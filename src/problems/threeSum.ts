/**
 * Solution for the "3Sum" problem
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
 */

export function threeSum(nums: number[]): number[][] {
    if (nums.length < 3) return [];

    nums.sort((a, b) => a - b);
    const result: number[][] = [];

    for (let i = 0; i < nums.length - 2; i++) {
        // Skip duplicates for the first element
        if (i > 0 && nums[i] === nums[i - 1]) continue;

        let left = i + 1;
        let right = nums.length - 1;

        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right];

            if (sum === 0) {
                result.push([nums[i], nums[left], nums[right]]);

                // Skip duplicates for left and right pointers
                while (left < right && nums[left] === nums[left + 1]) left++;
                while (left < right && nums[right] === nums[right - 1]) right--;

                left++;
                right--;
            } else if (sum < 0) {
                left++;
            } else {
                right--;
            }
        }
    }

    return result;
}
