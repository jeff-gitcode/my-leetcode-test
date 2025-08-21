/**
 * Solution for the "Next Greater Element I" problem
 * 
 * Problem: Given two arrays nums1 and nums2 where nums1 is a subset of nums2,
 * find the next greater element for each element in nums1.
 * 
 * Approach: Monotonic Stack + Hash Map
 * - Use monotonic decreasing stack to find next greater elements in nums2
 * - Store results in hash map for O(1) lookup
 * 
 * Time Complexity: O(n + m)
 * Space Complexity: O(n)
 */

export function nextGreaterElement(nums1: number[], nums2: number[]): number[] {
    const stack: number[] = [];
    const map = new Map<number, number>();

    // Build next greater element map for nums2
    for (const num of nums2) {
        while (stack.length > 0 && stack[stack.length - 1] < num) {
            map.set(stack.pop()!, num);
        }
        stack.push(num);
    }

    // Build result for nums1
    return nums1.map(num => map.get(num) || -1);
}

/**
 * Solution for "Daily Temperatures" - LeetCode #739
 * 
 * Problem: For each day, find how many days you have to wait until a warmer temperature.
 * 
 * Approach: Monotonic Stack
 * - Stack stores indices of unresolved temperatures
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
export function dailyTemperatures(nums: number[]): number[] {
    const result = Array(nums.length).fill(0);
    const stack: number[] = [];

    for (let i = 0; i < nums.length; i++) {
        while (stack.length && nums[i] > nums[stack[stack.length - 1]]) {
            const prevIdx = stack.pop()!;
            result[prevIdx] = i - prevIdx;
        }
        stack.push(i);
    }

    return result;
}

/**
 * Solution for "Largest Rectangle in Histogram" - LeetCode #84
 * 
 * Problem: Given heights of bars in a histogram, find the area of the largest rectangle.
 * 
 * Approach: Monotonic Stack
 * - For each bar, calculate area with stack of indices
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
export function largestRectangleArea(nums: number[]): number {
    const stack: number[] = [];
    let result = 0;
    nums.push(0); // Sentinel to flush stack

    for (let i = 0; i < nums.length; i++) {
        while (stack.length && nums[i] < nums[stack[stack.length - 1]]) {
            const h = nums[stack.pop()!];
            const w = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
            result = Math.max(result, h * w);
        }
        stack.push(i);
    }

    return result;
}
