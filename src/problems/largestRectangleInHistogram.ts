/**
 * Solution for the "Largest Rectangle in Histogram" problem
 * 
 * Problem: Given an array of integers heights representing the histogram's bar heights,
 * find the area of the largest rectangle in the histogram.
 * 
 * Approach: Monotonic Stack
 * - Use stack to maintain increasing heights
 * - When we find a smaller height, calculate area with popped height as the smallest
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */

export function largestRectangleArea(heights: number[]): number {
    const stack: number[] = []; // Store indices
    let maxArea = 0;

    for (let i = 0; i <= heights.length; i++) {
        const currentHeight = i === heights.length ? 0 : heights[i];

        while (stack.length > 0 && currentHeight < heights[stack[stack.length - 1]]) {
            const height = heights[stack.pop()!];
            const width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
            maxArea = Math.max(maxArea, height * width);
        }

        stack.push(i);
    }

    return maxArea;
}
