/**
 * Problem #496: Next Greater Element I (Easy)
 * 
 * Given two arrays nums1 and nums2, where nums1 is a subset of nums2,
 * find the next greater element for each element in nums1 in nums2.
 * 
 * Approach:
 * 1. Use a monotonic decreasing stack to process nums2 and find next greater for each element.
 * 2. Store results in a map for O(1) lookup for nums1.
 * 
 * Time Complexity: O(n + m)
 * Space Complexity: O(n)
 * 
 * Example:
 * nums1 = [4,1,2], nums2 = [1,3,4,2]
 * Output: [-1,3,-1]
 * Explanation: For 4, no greater element; for 1, next greater is 3; for 2, none.
 */
export function nextGreaterElement(nums1: number[], nums2: number[]): number[] {
    const stack: number[] = [];                  // Stack to keep elements in decreasing order
    const map = new Map<number, number>();       // Map to store next greater for each element

    for (const num of nums2) {                   // Process each number in nums2
        while (stack.length > 0 && stack[stack.length - 1] < num) {
            // If current num is greater than stack top, it's the next greater for stack top
            map.set(stack.pop()!, num);          // Pop and record next greater
        }
        stack.push(num);                         // Push current num to stack
    }

    // For nums1, lookup next greater in map, default to -1 if not found
    return nums1.map(num => map.get(num) ?? -1);
}

/**
 * Problem #739: Daily Temperatures (Medium)
 * 
 * Given a list of daily temperatures, return a list such that for each day,
 * tells you how many days you would have to wait until a warmer temperature.
 * If there is no future day for which this is possible, put 0 instead.
 * 
 * Approach:
 * 1. Use a monotonic decreasing stack to store indices of unresolved temperatures.
 * 2. For each day, pop from stack until you find a warmer day, and record the distance.
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 * 
 * Example:
 * temperatures = [73,74,75,71,69,72,76,73]
 * Output: [1,1,4,2,1,1,0,0]
 */
export function dailyTemperatures(temperatures: number[]): number[] {
    const n = temperatures.length;
    const result = new Array(n).fill(0);         // Initialize result array with 0s
    const stack: number[] = [];                  // Stack to store indices

    for (let i = 0; i < n; i++) {                // Iterate through temperatures
        while (stack.length > 0 && temperatures[i] > temperatures[stack[stack.length - 1]]) {
            // If current temperature is warmer than stack top
            const prevIndex = stack.pop()!;      // Pop index from stack
            result[prevIndex] = i - prevIndex;   // Calculate days waited
        }
        stack.push(i);                           // Push current index to stack
    }

    return result;                               // Return result array
}

/**
 * Problem #84: Largest Rectangle in Histogram (Hard)
 * 
 * Given an array of heights representing histogram bars, find the area of the largest rectangle.
 * 
 * Approach:
 * 1. Use a monotonic increasing stack to keep indices of bars.
 * 2. When a lower bar is found, pop from stack and calculate area for each popped bar.
 * 3. Add a sentinel bar of height 0 at the end to flush the stack.
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 * 
 * Example:
 * heights = [2,1,5,6,2,3]
 * Output: 10
 * Explanation: Largest rectangle is between heights 5 and 6, area = 5*2=10.
 */
export function largestRectangleArea(heights: number[]): number {
    const stack: number[] = [];                  // Stack to store indices of bars
    let maxArea = 0;                             // Track maximum area found
    heights.push(0);                             // Add sentinel to flush stack at end

    for (let i = 0; i < heights.length; i++) {   // Iterate through all bars
        while (stack.length > 0 && heights[i] < heights[stack[stack.length - 1]]) {
            // If current bar is lower than stack top, calculate area
            const height = heights[stack.pop()!]; // Height of popped bar
            const width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1; // Width of rectangle
            maxArea = Math.max(maxArea, height * width); // Update max area
        }
        stack.push(i);                           // Push current index to stack
    }

    return maxArea;                              // Return the largest area found
}
