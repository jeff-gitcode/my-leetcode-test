import { twoSum } from '@/problems/twoSumII';

describe('Two Sum II - Input Array Is Sorted', () => {
    it('should return correct indices for basic cases', () => {
        // Example 1: numbers = [2,7,11,15], target = 9
        // 2 + 7 = 9, return [1,2] (1-indexed)
        expect(twoSum([2, 7, 11, 15], 9)).toEqual([1, 2]);

        // Example 2: numbers = [2,3,4], target = 6
        // 2 + 4 = 6, return [1,3] (1-indexed)
        expect(twoSum([2, 3, 4], 6)).toEqual([1, 3]);

        // Example 3: numbers = [-1,0], target = -1
        // -1 + 0 = -1, return [1,2] (1-indexed)
        expect(twoSum([-1, 0], -1)).toEqual([1, 2]);
    });

    it('should handle negative numbers', () => {
        expect(twoSum([-3, -1, 0, 2, 4], 1)).toEqual([1, 5]); // -3 + 4 = 1
        expect(twoSum([-5, -2, 0, 3, 6], 4)).toEqual([3, 5]); // 0 + 4 doesn't exist, but -2 + 6 = 4
        expect(twoSum([-5, -2, 0, 3, 6], 4)).toEqual([2, 5]); // -2 + 6 = 4
    });

    it('should handle minimum array size', () => {
        // Two elements only
        expect(twoSum([1, 2], 3)).toEqual([1, 2]);
        expect(twoSum([0, 1], 1)).toEqual([1, 2]);
        expect(twoSum([-1, 1], 0)).toEqual([1, 2]);
    });

    it('should handle cases where target is at the ends', () => {
        // First and last elements
        expect(twoSum([1, 2, 3, 4, 5], 6)).toEqual([1, 5]); // 1 + 5 = 6
        expect(twoSum([2, 4, 6, 8, 10], 12)).toEqual([1, 5]); // 2 + 10 = 12
    });

    it('should handle cases where target is in the middle', () => {
        // Middle elements
        expect(twoSum([1, 3, 5, 7, 9], 8)).toEqual([1, 4]); // 1 + 7 = 8
        expect(twoSum([2, 4, 6, 8, 10, 12], 14)).toEqual([1, 6]); // 2 + 12 = 14
    });

    it('should handle duplicate numbers', () => {
        expect(twoSum([1, 2, 2, 3], 4)).toEqual([2, 3]); // 2 + 2 = 4
        expect(twoSum([0, 0, 3, 4], 0)).toEqual([1, 2]); // 0 + 0 = 0
        expect(twoSum([5, 5, 5, 5], 10)).toEqual([1, 2]); // 5 + 5 = 10
    });

    it('should handle larger arrays', () => {
        const numbers = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
        expect(twoSum(numbers, 20)).toEqual([2, 9]); // 3 + 17 = 20
        expect(twoSum(numbers, 8)).toEqual([1, 3]); // 1 + 7 = 8
        expect(twoSum(numbers, 36)).toEqual([9, 10]); // 17 + 19 = 36
    });
});
