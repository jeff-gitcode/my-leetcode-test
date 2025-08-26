/**
 * Solution for "Container With Most Water" - LeetCode #11
 * 
 * Problem: Given n non-negative integers a1, a2, ..., an , where each represents a point at coordinate (i, ai).
 * n vertical lines are drawn such that the two endpoints of the line i is at (i, ai) and (i, 0).
 * Find two lines, which, together with the x-axis, forms a container that contains the most water.
 * 
 * Approach: Two Pointers
 * - Start with pointers at both ends of the array
 * - Calculate area as min(height[left], height[right]) * (right - left)
 * - Move the pointer pointing to the smaller height inward
 * - Track the maximum area seen so far
 * 
 * Time Complexity: O(n) - single pass through the array
 * Space Complexity: O(1) - constant extra space
 * 
 * Example:
 * Input: height = [1,8,6,2,5,4,8,3,7]
 * Output: 49
 * Explanation: The max area is between heights 8 and 7 with width 7, resulting in area = 7 * 7 = 49
 */

export function maxArea(height: number[]): number {
    let maxWater = 0;
    let left = 0;
    let right = height.length - 1;

    while (left < right) {
        // Calculate water area based on the shorter height and width between pointers
        const h = Math.min(height[left], height[right]);
        const w = right - left;
        maxWater = Math.max(maxWater, h * w);

        // Move the pointer at the shorter line inward
        // This is optimal because moving the taller line would only potentially decrease the area
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }

    return maxWater;
}
