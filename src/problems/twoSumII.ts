/**
 * Solution for "Two Sum II - Input Array Is Sorted" - LeetCode #167
 * 
 * Problem: Given a 1-indexed array of integers numbers that is already sorted in non-decreasing order,
 * find two numbers such that they add up to a specific target number.
 * Return the indices of the two numbers, index1 and index2, added by one as an integer array [index1, index2].
 * 
 * Approach: Two Pointers
 * - Use two pointers: one at the beginning, one at the end
 * - Move pointers towards each other based on comparison with target
 * - Return 1-indexed positions when sum equals target
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 * 
 * Example:
 * Input: numbers = [2,7,11,15], target = 9
 * Output: [1,2]
 * Explanation: The sum of 2 and 7 is 9. Therefore, index1 = 1, index2 = 2 (1-indexed).
 */

export function twoSum(numbers: number[], target: number): number[] {
    // Initialize two pointers
    let left = 0;
    let right = numbers.length - 1;

    while (left < right) {
        const sum = numbers[left] + numbers[right];

        if (sum === target) {
            // Return 1-indexed positions (problem requirement)
            return [left + 1, right + 1];
        } else if (sum < target) {
            // Sum is too small, increment left pointer
            left++;
        } else {
            // Sum is too large, decrement right pointer
            right--;
        }
    }

    // Per problem statement, there is always exactly one solution
    return [-1, -1]; // Should never reach here
}
