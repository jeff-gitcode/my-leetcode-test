"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const subarraySumEqualsK_1 = require("@/problems/subarraySumEqualsK");
describe('Subarray Sum Equals K', () => {
    it('should return correct count for basic cases', () => {
        // Example 1: nums = [1,1,1], k = 2
        // Subarrays: [1,1] at positions (0,1) and (1,2)
        expect((0, subarraySumEqualsK_1.subarraySum)([1, 1, 1], 2)).toBe(2);
        // Example 2: nums = [1,2,3], k = 3
        // Subarrays: [3] at position (2) and [1,2] at positions (0,1)
        expect((0, subarraySumEqualsK_1.subarraySum)([1, 2, 3], 3)).toBe(2);
    });
    it('should handle negative numbers', () => {
        // nums = [1,-1,0], k = 0
        // Subarrays: [1,-1], [0], [1,-1,0]
        expect((0, subarraySumEqualsK_1.subarraySum)([1, -1, 0], 0)).toBe(3);
        // nums = [-1,-1,1], k = 0
        // Subarrays: [-1,-1,1], [1] (considering the sum before it)
        expect((0, subarraySumEqualsK_1.subarraySum)([-1, -1, 1], 0)).toBe(1);
    });
    it('should handle single element arrays', () => {
        expect((0, subarraySumEqualsK_1.subarraySum)([1], 1)).toBe(1);
        expect((0, subarraySumEqualsK_1.subarraySum)([1], 0)).toBe(0);
        expect((0, subarraySumEqualsK_1.subarraySum)([0], 0)).toBe(1);
    });
    it('should handle no valid subarrays', () => {
        expect((0, subarraySumEqualsK_1.subarraySum)([1, 2, 3], 7)).toBe(0);
        expect((0, subarraySumEqualsK_1.subarraySum)([1, 1, 1], 5)).toBe(0);
    });
    it('should handle edge cases', () => {
        // All elements sum to k
        expect((0, subarraySumEqualsK_1.subarraySum)([1, 2, 3], 6)).toBe(1);
        // Multiple overlapping subarrays
        expect((0, subarraySumEqualsK_1.subarraySum)([1, 0, 1, 0, 1], 1)).toBe(8);
        // Zero sum subarrays
        expect((0, subarraySumEqualsK_1.subarraySum)([0, 0, 0], 0)).toBe(6); // All possible subarrays
    });
    it('should handle larger arrays', () => {
        const nums = [1, 2, 1, 2, 1];
        const k = 3;
        // Subarrays with sum 3: [1,2], [2,1], [1,2] (different positions)
        expect((0, subarraySumEqualsK_1.subarraySum)(nums, k)).toBe(4);
    });
});
