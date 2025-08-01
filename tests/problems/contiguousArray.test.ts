import { findMaxLength } from '@/problems/contiguousArray';

describe('Contiguous Array', () => {
    it('should find maximum length of contiguous subarray with equal 0s and 1s', () => {
        // Example 1: [0, 1] - The subarray [0, 1] has equal number of 0s and 1s
        expect(findMaxLength([0, 1])).toBe(2);

        // Example 2: [0, 1, 0] - The subarray [0, 1] has equal number of 0s and 1s
        expect(findMaxLength([0, 1, 0])).toBe(2);

        // Example from LeetCode: [0, 1, 0, 0, 1, 1, 0]
        // The subarray [0, 1, 0, 0, 1, 1] has equal number of 0s and 1s
        expect(findMaxLength([0, 1, 0, 0, 1, 1, 0])).toBe(6);
    });

    it('should handle empty or single-element arrays', () => {
        expect(findMaxLength([])).toBe(0);
        expect(findMaxLength([0])).toBe(0);
        expect(findMaxLength([1])).toBe(0);
    });

    it('should handle arrays with no valid subarrays', () => {
        expect(findMaxLength([0, 0, 0])).toBe(0);
        expect(findMaxLength([1, 1, 1])).toBe(0);
    });

    it('should handle complex cases', () => {
        // [0, 0, 1, 0, 0, 0, 1, 1] -> [1, 0, 0, 0, 1, 1] at indices 2-7 (length 6)
        expect(findMaxLength([0, 0, 1, 0, 0, 0, 1, 1])).toBe(6);

        // [0, 1, 1, 0, 1, 1, 1, 0] -> [0, 1, 1, 0] at indices 0-3
        expect(findMaxLength([0, 1, 1, 0, 1, 1, 1, 0])).toBe(4);

        // Longer sequence with multiple valid subarrays
        expect(findMaxLength([0, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1, 1, 0])).toBe(12);
    });
});