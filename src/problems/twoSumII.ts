/**
 * Solution for the "Two Sum II - Input Array Is Sorted" problem
 * 
 * Problem: Given a 1-indexed array of integers numbers that is already sorted in 
 * non-decreasing order, find two numbers such that they add up to a specific target number.
 * Return the indices of the two numbers (1-indexed) as an integer array of length 2.
 * 
 * Approach: Use two pointers technique
 * - Start with left pointer at beginning and right pointer at end
 * - If sum is less than target, move left pointer right
 * - If sum is greater than target, move right pointer left
 * - If sum equals target, return the indices (1-indexed)
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 * 
 * Example:
 * Input: numbers = [2,7,11,15], target = 9
 * Output: [1,2]
 * Explanation: 2 + 7 = 9, indices are 1-based.
 */
/**
 * Finds two numbers in a sorted array that add up to target
 * @param numbers - Sorted array of integers (1-indexed)
 * @param target - Target sum
 * @returns Array containing 1-indexed positions of the two numbers
 */
export function twoSum(numbers: number[], target: number): number[] {
    let left = 0; // Left pointer at start
    let right = numbers.length - 1; // Right pointer at end

    while (left < right) {
        const sum = numbers[left] + numbers[right]; // Sum of two pointers
        if (sum === target) {
            return [left + 1, right + 1]; // Return 1-based indices
        } else if (sum < target) {
            left++; // Move left pointer right if sum is too small
        } else {
            right--; // Move right pointer left if sum is too large
        }
    }

    return []; // No solution found
}
