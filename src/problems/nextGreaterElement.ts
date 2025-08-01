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
    const nextGreaterMap = new Map<number, number>();

    // Build next greater element map for nums2
    for (const num of nums2) {
        while (stack.length > 0 && stack[stack.length - 1] < num) {
            nextGreaterMap.set(stack.pop()!, num);
        }
        stack.push(num);
    }

    // Build result for nums1
    return nums1.map(num => nextGreaterMap.get(num) || -1);
}
