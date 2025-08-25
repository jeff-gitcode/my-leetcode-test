import { maxArea } from '../../src/problems/containerWithMostWater';

describe('maxArea (Container With Most Water)', () => {
    it('should return 0 for empty array', () => {
        expect(maxArea([])).toBe(0);
    });

    it('should return 0 for array with one element', () => {
        expect(maxArea([5])).toBe(0);
    });

    it('should return 0 for array with two elements', () => {
        expect(maxArea([1, 2])).toBe(1);
        expect(maxArea([4, 4])).toBe(4);
    });

    it('should return correct area for example input', () => {
        expect(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7])).toBe(49);
    });

    it('should handle all heights being the same', () => {
        expect(maxArea([5, 5, 5, 5, 5])).toBe(20); // (length-1) * height
    });

    it('should handle strictly increasing heights', () => {
        expect(maxArea([1, 2, 3, 4, 5])).toBe(6); // between 1 and 5
    });

    it('should handle strictly decreasing heights', () => {
        expect(maxArea([5, 4, 3, 2, 1])).toBe(6); // between 5 and 1
    });

    it('should handle alternating heights', () => {
        expect(maxArea([1, 3, 2, 5, 25, 24, 5])).toBe(24);
    });

    it('should handle large input', () => {
        const arr = Array(10000).fill(1);
        expect(maxArea(arr)).toBe(9999);
    });

    it('should handle two tall lines at the ends', () => {
        expect(maxArea([10, 1, 1, 1, 10])).toBe(40);
    });
});