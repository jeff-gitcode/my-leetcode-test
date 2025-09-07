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
    let maxWater = 0;                            // Initialize maximum water area found so far
    let left = 0;                                // Left pointer starts at beginning of array
    let right = height.length - 1;               // Right pointer starts at end of array
    // Example: height = [1,8,6,2,5,4,8,3,7], left = 0, right = 8

    while (left < right) {                       // Continue until pointers meet
        // Calculate water area based on the shorter height and width between pointers
        const h = Math.min(height[left], height[right]); // Height is limited by shorter line
        // Example: h = min(height[0], height[8]) = min(1, 7) = 1
        const w = right - left;                  // Width is distance between pointers
        // Example: w = 8 - 0 = 8
        maxWater = Math.max(maxWater, h * w);    // Update maximum if current area is larger
        // Example: maxWater = max(0, 1 * 8) = 8

        // Move the pointer at the shorter line inward
        // This is optimal because moving the taller line would only potentially decrease the area
        if (height[left] < height[right]) {
            left++;                              // Move left pointer right if left height is smaller
            // Example: height[0] = 1 < height[8] = 7, so left = 1
        } else {
            right--;                             // Move right pointer left if right height is smaller or equal
            // Example: if height[left] >= height[right], right--
        }
    }

    return maxWater;                             // Return the maximum water area found
    // Example: returns 49 for height = [1,8,6,2,5,4,8,3,7]
}
