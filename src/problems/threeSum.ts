/**
 * Solution for "3Sum" - LeetCode #15
 * 
 * Problem: Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]]
 * such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.
 * Notice that the solution set must not contain duplicate triplets.
 * 
 * Approach: Sorting + Two Pointers
 * - Sort the array to handle duplicates easily
 * - For each element as first number, use two pointers to find pairs that sum to its negation
 * - Skip duplicates to avoid duplicate triplets
 * 
 * Time Complexity: O(n²) - sorting takes O(n log n) and the two-pointer search takes O(n²)
 * Space Complexity: O(n) for the output array (not counting the sorting algorithm's space)
 * 
 * Example:
 * Input: nums = [-1,0,1,2,-1,-4]
 * Output: [[-1,-1,2],[-1,0,1]]
 * Explanation: 
 * nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0
 * nums[0] + nums[2] + nums[4] = (-1) + 1 + (-1) = -1 (not included)
 * nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0 (duplicate of [-1,-1,2], not included)
 * nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0 (included as [-1,0,1])
 */

export function threeSum(nums: number[]): number[][] {
    // Edge case: need at least 3 numbers to form triplets
    if (nums.length < 3) return [];

    // Sort the array to handle duplicates and use two-pointer technique
    nums.sort((a, b) => a - b);

    const result: number[][] = [];

    // Fix the first element and use two pointers for the other two elements
    for (let i = 0; i < nums.length - 2; i++) {
        // Skip duplicate first elements
        if (i > 0 && nums[i] === nums[i - 1]) continue;

        // Set two pointers: left after i, right at end of array
        let left = i + 1;
        let right = nums.length - 1;

        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right];

            if (sum < 0) {
                // If sum is too small, move left pointer right
                left++;
            } else if (sum > 0) {
                // If sum is too large, move right pointer left
                right--;
            } else {
                // Found a valid triplet
                result.push([nums[i], nums[left], nums[right]]);

                // Skip duplicates for second element
                while (left < right && nums[left] === nums[left + 1]) left++;

                // Skip duplicates for third element
                while (left < right && nums[right] === nums[right - 1]) right--;

                // Move both pointers inward
                left++;
                right--;
            }
        }
    }

    return result;
}
