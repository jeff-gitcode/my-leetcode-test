import { NumArray } from '@/problems/rangeSumQuery';

describe('Range Sum Query - Immutable', () => {
    it('should return correct sum for various ranges', () => {
        // Example from LeetCode: [-2, 0, 3, -5, 2, -1]
        const numArray = new NumArray([-2, 0, 3, -5, 2, -1]);

        // Test case 1: sumRange(0, 2) -> -2 + 0 + 3 = 1
        expect(numArray.sumRange(0, 2)).toBe(1);

        // Test case 2: sumRange(2, 5) -> 3 + (-5) + 2 + (-1) = -1
        expect(numArray.sumRange(2, 5)).toBe(-1);

        // Test case 3: sumRange(0, 5) -> Sum of all elements = -3
        expect(numArray.sumRange(0, 5)).toBe(-3);
    });

    it('should handle single element arrays', () => {
        const numArray = new NumArray([5]);

        expect(numArray.sumRange(0, 0)).toBe(5);
    });

    it('should handle edge cases', () => {
        const numArray = new NumArray([1, 2, 3, 4, 5]);

        // First element
        expect(numArray.sumRange(0, 0)).toBe(1);

        // Last element
        expect(numArray.sumRange(4, 4)).toBe(5);

        // Full range
        expect(numArray.sumRange(0, 4)).toBe(15);

        // Middle section
        expect(numArray.sumRange(1, 3)).toBe(9);
    });
});