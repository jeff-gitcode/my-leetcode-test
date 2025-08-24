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
 * 
 * Example:
 * Input: height = [1,8,6,2,5,4,8,3,7]
 * Output: 49
 * Explanation: Max area is between lines at index 1 and 8.
 */
export function maxArea(height: number[]): number {
    let left = 0; // Left pointer at start
    let right = height.length - 1; // Right pointer at end
    let maxArea = 0; // Track maximum area

    while (left < right) {
        const h = Math.min(height[left], height[right]); // Height is min of two lines
        const w = right - left; // Width is distance between pointers
        const area = h * w; // Calculate area
        maxArea = Math.max(maxArea, area); // Update max area if needed

        if (height[left] < height[right]) {
            left++; // Move left pointer inward if left line is shorter
        } else {
            right--; // Move right pointer inward if right line is shorter
        }
    }

    return maxArea; // Return the maximum area found
}
