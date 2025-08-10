import { nextGreaterElement } from '@/problems/nextGreaterElement';

describe('Next Greater Element I', () => {
    describe('Basic Functionality', () => {
        it('should find next greater elements for LeetCode example 1', () => {
            // nums1 = [4,1,2], nums2 = [1,3,4,2]
            // Expected: [-1,3,-1]
            // 4: no greater element -> -1
            // 1: next greater is 3
            // 2: no greater element -> -1
            const nums1 = [4, 1, 2];
            const nums2 = [1, 3, 4, 2];
            const expected = [-1, 3, -1];
            
            expect(nextGreaterElement(nums1, nums2)).toEqual(expected);
        });

        it('should find next greater elements for LeetCode example 2', () => {
            // nums1 = [2,4], nums2 = [1,2,3,4]
            // Expected: [3,-1]
            // 2: next greater is 3
            // 4: no greater element -> -1
            const nums1 = [2, 4];
            const nums2 = [1, 2, 3, 4];
            const expected = [3, -1];
            
            expect(nextGreaterElement(nums1, nums2)).toEqual(expected);
        });

        it('should handle all elements having next greater elements', () => {
            const nums1 = [1, 2, 3];
            const nums2 = [1, 2, 3, 4, 5];
            const expected = [2, 3, 4];
            
            expect(nextGreaterElement(nums1, nums2)).toEqual(expected);
        });

        it('should handle mixed scenarios', () => {
            const nums1 = [5, 2, 8, 1];
            const nums2 = [1, 2, 3, 5, 8, 9];
            const expected = [8, 3, 9, 2];
            
            expect(nextGreaterElement(nums1, nums2)).toEqual(expected);
        });
    });

    describe('Edge Cases', () => {
        it('should handle empty nums1', () => {
            const nums1: number[] = [];
            const nums2 = [1, 2, 3];
            const expected: number[] = [];
            
            expect(nextGreaterElement(nums1, nums2)).toEqual(expected);
        });

        it('should handle single element arrays', () => {
            const nums1 = [1];
            const nums2 = [1];
            const expected = [-1];
            
            expect(nextGreaterElement(nums1, nums2)).toEqual(expected);
        });

        it('should handle single element with greater element', () => {
            const nums1 = [1];
            const nums2 = [1, 2];
            const expected = [2];
            
            expect(nextGreaterElement(nums1, nums2)).toEqual(expected);
        });

        it('should handle all elements having no next greater element', () => {
            const nums1 = [5, 4, 3, 2, 1];
            const nums2 = [5, 4, 3, 2, 1];
            const expected = [-1, -1, -1, -1, -1];
            
            expect(nextGreaterElement(nums1, nums2)).toEqual(expected);
        });

        it('should handle nums1 with single element that is the largest', () => {
            const nums1 = [5];
            const nums2 = [1, 2, 3, 4, 5];
            const expected = [-1];
            
            expect(nextGreaterElement(nums1, nums2)).toEqual(expected);
        });
    });

    describe('Array Configurations', () => {
        it('should handle ascending sorted nums2', () => {
            const nums1 = [1, 3, 5];
            const nums2 = [1, 2, 3, 4, 5, 6];
            const expected = [2, 4, 6];
            
            expect(nextGreaterElement(nums1, nums2)).toEqual(expected);
        });

        it('should handle descending sorted nums2', () => {
            const nums1 = [3, 2, 1];
            const nums2 = [5, 4, 3, 2, 1];
            const expected = [-1, -1, -1];
            
            expect(nextGreaterElement(nums1, nums2)).toEqual(expected);
        });

        it('should handle mountain-shaped array', () => {
            const nums1 = [1, 3, 2];
            const nums2 = [1, 2, 3, 2, 1];
            const expected = [2, -1, 3];
            
            expect(nextGreaterElement(nums1, nums2)).toEqual(expected);
        });

        it('should handle valley-shaped array', () => {
            const nums1 = [3, 1, 2];
            const nums2 = [3, 2, 1, 2, 3];
            const expected = [-1, 2, 3];
            
            expect(nextGreaterElement(nums1, nums2)).toEqual(expected);
        });
    });

    describe('Duplicate Elements', () => {
        it('should handle duplicate elements in nums2', () => {
            const nums1 = [2, 4];
            const nums2 = [2, 2, 4, 4, 5];
            const expected = [4, 5];
            
            expect(nextGreaterElement(nums1, nums2)).toEqual(expected);
        });

        it('should handle duplicate elements with no next greater', () => {
            const nums1 = [3, 3];
            const nums2 = [1, 3, 3, 2];
            const expected = [-1, -1];
            
            expect(nextGreaterElement(nums1, nums2)).toEqual(expected);
        });

        it('should handle multiple duplicates', () => {
            const nums1 = [1, 2, 2];
            const nums2 = [1, 1, 2, 2, 3, 3];
            const expected = [2, 3, 3];
            
            expect(nextGreaterElement(nums1, nums2)).toEqual(expected);
        });
    });

    describe('Complex Scenarios', () => {
        it('should handle interleaved pattern', () => {
            const nums1 = [1, 5, 3, 7];
            const nums2 = [1, 3, 5, 7, 9];
            const expected = [3, 7, 5, 9];
            
            expect(nextGreaterElement(nums1, nums2)).toEqual(expected);
        });

        it('should handle non-sequential order in nums1', () => {
            const nums1 = [5, 1, 3, 2];
            const nums2 = [1, 2, 3, 4, 5, 6];
            const expected = [6, 2, 4, 3];
            
            expect(nextGreaterElement(nums1, nums2)).toEqual(expected);
        });

        it('should handle large gap between elements', () => {
            const nums1 = [1, 100];
            const nums2 = [1, 50, 100, 200];
            const expected = [50, 200];
            
            expect(nextGreaterElement(nums1, nums2)).toEqual(expected);
        });

        it('should handle negative numbers', () => {
            const nums1 = [-1, 0, 1];
            const nums2 = [-2, -1, 0, 1, 2];
            const expected = [-1, 1, 2];
            
            expect(nextGreaterElement(nums1, nums2)).toEqual(expected);
        });

        it('should handle mixed positive and negative numbers', () => {
            const nums1 = [-5, 2, -1];
            const nums2 = [-5, -1, 0, 2, 5];
            const expected = [-1, 5, -1];
            
            expect(nextGreaterElement(nums1, nums2)).toEqual(expected);
        });
    });

    describe('Performance and Edge Cases', () => {
        it('should handle larger arrays efficiently', () => {
            const nums2 = Array.from({ length: 1000 }, (_, i) => i);
            const nums1 = [0, 100, 500, 999];
            const expected = [1, 101, 501, -1];
            
            expect(nextGreaterElement(nums1, nums2)).toEqual(expected);
        });

        it('should handle nums1 as complete subset of nums2', () => {
            const nums2 = [1, 2, 3, 4, 5];
            const nums1 = [5, 4, 3, 2, 1]; // All elements in reverse order
            const expected = [-1, 5, 4, 3, 2];
            
            expect(nextGreaterElement(nums1, nums2)).toEqual(expected);
        });

        it('should handle alternating high-low pattern', () => {
            const nums1 = [2, 6, 4];
            const nums2 = [2, 6, 4, 8, 1, 9];
            const expected = [6, 8, 8];
            
            expect(nextGreaterElement(nums1, nums2)).toEqual(expected);
        });
    });

    describe('Monotonic Stack Behavior Verification', () => {
        it('should correctly process stack-popping scenarios', () => {
            // This tests the while loop in the algorithm where multiple elements are popped
            const nums1 = [1, 2, 3];
            const nums2 = [3, 2, 1, 4]; // 4 is greater than all previous elements
            const expected = [4, 4, 4];
            
            expect(nextGreaterElement(nums1, nums2)).toEqual(expected);
        });

        it('should handle immediate next greater element', () => {
            const nums1 = [1, 3, 5];
            const nums2 = [1, 2, 3, 4, 5, 6];
            const expected = [2, 4, 6];
            
            expect(nextGreaterElement(nums1, nums2)).toEqual(expected);
        });

        it('should handle distant next greater element', () => {
            const nums1 = [1];
            const nums2 = [1, 0, 0, 0, 2];
            const expected = [2];
            
            expect(nextGreaterElement(nums1, nums2)).toEqual(expected);
        });
    });

    describe('Input Validation Edge Cases', () => {
        it('should handle minimum valid input', () => {
            const nums1 = [1];
            const nums2 = [1, 2];
            const expected = [2];
            
            expect(nextGreaterElement(nums1, nums2)).toEqual(expected);
        });

        it('should handle nums1 with all elements at end of nums2', () => {
            const nums1 = [4, 5];
            const nums2 = [1, 2, 3, 4, 5];
            const expected = [5, -1];
            
            expect(nextGreaterElement(nums1, nums2)).toEqual(expected);
        });

        it('should handle nums1 with all elements at beginning of nums2', () => {
            const nums1 = [1, 2];
            const nums2 = [1, 2, 3, 4, 5];
            const expected = [2, 3];
            
            expect(nextGreaterElement(nums1, nums2)).toEqual(expected);
        });
    });
});