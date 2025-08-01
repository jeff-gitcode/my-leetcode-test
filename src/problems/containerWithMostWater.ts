/**
 * Solution for the "Container With Most Water" problem
 * 
 * Problem: Given n non-negative integers representing heights, find two lines 
 * that together with the x-axis form a container that can hold the most water.
 * 
 * Approach: Two Pointers
 * - Start with two pointers at both ends
 * - Calculate area and update maximum
 * - Move the pointer with smaller height (to potentially find larger area)
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */

export function maxArea(height: number[]): number {
    let left = 0;
    let right = height.length - 1;
    let maxWater = 0;

    while (left < right) {
        // Calculate current area
        const width = right - left;
        const currentHeight = Math.min(height[left], height[right]);
        const currentArea = width * currentHeight;

        maxWater = Math.max(maxWater, currentArea);

        // Move the pointer with smaller height
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }

    return maxWater;
}
