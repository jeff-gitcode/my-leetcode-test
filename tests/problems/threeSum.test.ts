import { threeSum } from '@/problems/threeSum';

describe('Three Sum', () => {
    it('should return empty array for arrays with less than 3 elements', () => {
        expect(threeSum([])).toEqual([]);
        expect(threeSum([1])).toEqual([]);
        expect(threeSum([1, 2])).toEqual([]);
    });

    it('should return correct triplets for basic cases', () => {
        // Example 1: [-1, 0, 1, 2, -1, -4]
        // Expected: [[-1, -1, 2], [-1, 0, 1]]
        const result1 = threeSum([-1, 0, 1, 2, -1, -4]);
        expect(result1).toHaveLength(2);
        expect(result1).toContainEqual([-1, -1, 2]);
        expect(result1).toContainEqual([-1, 0, 1]);
    });

    it('should return empty array when no triplets sum to zero', () => {
        expect(threeSum([0, 1, 1])).toEqual([]);
        expect(threeSum([1, 2, 3])).toEqual([]);
        expect(threeSum([1, 1, 1])).toEqual([]);
        expect(threeSum([-1, -2, -3])).toEqual([]);
    });

    it('should handle arrays with all zeros', () => {
        expect(threeSum([0, 0, 0])).toEqual([[0, 0, 0]]);
        expect(threeSum([0, 0, 0, 0])).toEqual([[0, 0, 0]]);
        expect(threeSum([0, 0, 0, 0, 0])).toEqual([[0, 0, 0]]);
    });

    it('should handle single valid triplet', () => {
        expect(threeSum([-1, 0, 1])).toEqual([[-1, 0, 1]]);
        expect(threeSum([1, -1, 0])).toEqual([[-1, 0, 1]]);
        expect(threeSum([-2, 0, 2])).toEqual([[-2, 0, 2]]);
    });

    it('should avoid duplicate triplets', () => {
        // Array with duplicates that could generate duplicate triplets
        const result = threeSum([-1, 0, 1, 2, -1, -4, -1]);
        expect(result).toHaveLength(2);
        expect(result).toContainEqual([-1, -1, 2]);
        expect(result).toContainEqual([-1, 0, 1]);
        
        // Check no duplicate triplets exist
        const uniqueTriplets = new Set(result.map(triplet => JSON.stringify(triplet)));
        expect(uniqueTriplets.size).toBe(result.length);
    });

    it('should handle arrays with only negative numbers', () => {
        expect(threeSum([-1, -2, -3, -4])).toEqual([]);
        expect(threeSum([-5, -10, -15])).toEqual([]);
    });

    it('should handle arrays with only positive numbers', () => {
        expect(threeSum([1, 2, 3, 4])).toEqual([]);
        expect(threeSum([5, 10, 15])).toEqual([]);
    });

    it('should handle mixed positive and negative numbers', () => {
        const result = threeSum([-3, 0, 1, 2, -1, 1, -2]);
        expect(result.length).toBeGreaterThan(0);
        
        // Verify each triplet sums to zero
        result.forEach(triplet => {
            expect(triplet[0] + triplet[1] + triplet[2]).toBe(0);
        });
    });

    it('should handle larger arrays efficiently', () => {
        const nums = [-4, -2, -2, -2, 0, 1, 2, 2, 2, 3, 3, 4, 4, 6, 6];
        const result = threeSum(nums);
        
        // Verify all triplets sum to zero
        result.forEach(triplet => {
            expect(triplet[0] + triplet[1] + triplet[2]).toBe(0);
        });
        
        // Verify no duplicate triplets
        const uniqueTriplets = new Set(result.map(triplet => JSON.stringify(triplet)));
        expect(uniqueTriplets.size).toBe(result.length);
    });

    it('should return triplets in sorted order', () => {
        const result = threeSum([-1, 0, 1, 2, -1, -4]);
        
        result.forEach(triplet => {
            // Each triplet should be in ascending order
            expect(triplet[0]).toBeLessThanOrEqual(triplet[1]);
            expect(triplet[1]).toBeLessThanOrEqual(triplet[2]);
        });
    });

    it('should handle edge case with exactly 3 elements', () => {
        expect(threeSum([0, 0, 0])).toEqual([[0, 0, 0]]);
        expect(threeSum([-1, 0, 1])).toEqual([[-1, 0, 1]]);
        expect(threeSum([1, 2, 3])).toEqual([]);
    });

    it('should handle arrays with many duplicates', () => {
        const nums = [0, 0, 0, 0, 0, 0, 0];
        const result = threeSum(nums);
        expect(result).toEqual([[0, 0, 0]]);
        
        const nums2 = [1, 1, 1, 1, -2, -2];
        const result2 = threeSum(nums2);
        expect(result2).toEqual([[-2, 1, 1]]);
    });

    it('should handle complex case with multiple valid triplets', () => {
        const nums = [-1, 0, 1, 2, -1, -4, -2, -3, 3, 0, 4];
        const result = threeSum(nums);
        
        // Verify all triplets sum to zero
        result.forEach(triplet => {
            expect(triplet[0] + triplet[1] + triplet[2]).toBe(0);
        });
        
        // Verify no duplicate triplets
        const uniqueTriplets = new Set(result.map(triplet => JSON.stringify(triplet)));
        expect(uniqueTriplets.size).toBe(result.length);
        
        // Should contain common triplets
        expect(result).toContainEqual([-1, 0, 1]);
        expect(result).toContainEqual([-1, -1, 2]);
    });
});