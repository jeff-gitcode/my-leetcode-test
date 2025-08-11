import {
    binarySearch,
    searchInsert,
    searchRange,
    search,
    findMin,
    searchMatrixII
} from '../../src/problems/binarySearch';

describe('binarySearch.ts', () => {
    describe('binarySearch', () => {
        it('finds target in the middle', () => {
            expect(binarySearch([1, 3, 5, 7, 9], 5)).toBe(2);
        });

        it('finds target at edges', () => {
            expect(binarySearch([2, 4, 6, 8], 2)).toBe(0);
            expect(binarySearch([2, 4, 6, 8], 8)).toBe(3);
        });

        it('returns -1 when not found', () => {
            expect(binarySearch([1, 2, 3, 4], 5)).toBe(-1);
        });

        it('returns -1 for empty array', () => {
            expect(binarySearch([], 1)).toBe(-1);
        });

        it('handles negative numbers', () => {
            expect(binarySearch([-10, -3, 0, 5, 9], -3)).toBe(1);
            expect(binarySearch([-10, -3, 0, 5, 9], -2)).toBe(-1);
        });

        it('handles duplicates by returning any valid index', () => {
            const nums = [1, 2, 2, 2, 3];
            const idx = binarySearch(nums, 2);
            expect(idx).toBeGreaterThanOrEqual(1);
            expect(idx).toBeLessThanOrEqual(3);
            expect(nums[idx]).toBe(2);
        });
    });

    describe('searchInsert', () => {
        it('returns index when target exists', () => {
            expect(searchInsert([1, 3, 5, 6], 5)).toBe(2);
            expect(searchInsert([1, 3, 5, 6], 1)).toBe(0);
            expect(searchInsert([1, 3, 5, 6], 6)).toBe(3);
        });

        it('returns correct insertion position', () => {
            expect(searchInsert([1, 3, 5, 6], 2)).toBe(1);
            expect(searchInsert([1, 3, 5, 6], 7)).toBe(4);
            expect(searchInsert([1, 3, 5, 6], 0)).toBe(0);
        });

        it('handles empty array', () => {
            expect(searchInsert([], 42)).toBe(0);
        });
    });

    describe('searchRange', () => {
        it('returns [-1, -1] when not found', () => {
            expect(searchRange([5, 7, 7, 8, 8, 10], 6)).toEqual([-1, -1]);
            expect(searchRange([], 1)).toEqual([-1, -1]);
        });

        it('returns single occurrence range', () => {
            expect(searchRange([1, 2, 3, 4, 5], 3)).toEqual([2, 2]);
        });

        it('returns first and last positions for duplicates (middle)', () => {
            expect(searchRange([1, 2, 2, 2, 3, 4], 2)).toEqual([1, 3]);
        });

        it('handles target at array edges', () => {
            expect(searchRange([2, 2, 2, 3, 4], 2)).toEqual([0, 2]);
            expect(searchRange([1, 2, 3, 4, 4, 4], 4)).toEqual([3, 5]);
        });

        it('handles all-elements-equal target', () => {
            expect(searchRange([7, 7, 7, 7], 7)).toEqual([0, 3]);
        });
    });

    describe('search (rotated sorted array)', () => {
        const rotate = (arr: number[], k: number) => {
            const n = arr.length;
            const r = ((k % n) + n) % n;
            return arr.slice(n - r).concat(arr.slice(0, n - r));
        };

        it('finds targets in a typical rotated array', () => {
            const nums = [4, 5, 6, 7, 0, 1, 2];
            expect(search(nums, 0)).toBe(4);
            expect(search(nums, 4)).toBe(0);
            expect(search(nums, 2)).toBe(6);
        });

        it('returns -1 when not found', () => {
            expect(search([4, 5, 6, 7, 0, 1, 2], 3)).toBe(-1);
        });

        it('handles no rotation (already sorted)', () => {
            const nums = [1, 2, 3, 4, 5];
            expect(search(nums, 1)).toBe(0);
            expect(search(nums, 5)).toBe(4);
            expect(search(nums, 6)).toBe(-1);
        });

        it('handles single element', () => {
            expect(search([1], 1)).toBe(0);
            expect(search([1], 0)).toBe(-1);
        });

        it('handles two elements (rotated and non-rotated)', () => {
            expect(search([1, 3], 3)).toBe(1);
            expect(search([3, 1], 1)).toBe(1);
            expect(search([3, 1], 2)).toBe(-1);
        });

        it('works for various rotations', () => {
            const base = [0, 1, 2, 3, 4, 5, 6];
            for (let k = 0; k < base.length; k++) {
                const nums = rotate(base, k);
                for (const t of base) {
                    const idx = search(nums, t);
                    expect(idx).toBe(nums.indexOf(t));
                }
            }
        });
    });

    describe('findMin (rotated sorted array)', () => {
        it('finds min in rotated arrays', () => {
            expect(findMin([3, 4, 5, 1, 2])).toBe(1);
            expect(findMin([4, 5, 6, 7, 0, 1, 2])).toBe(0);
            expect(findMin([2, 3, 4, 5, 1])).toBe(1);
        });

        it('handles already sorted (no rotation)', () => {
            expect(findMin([1, 2, 3, 4, 5])).toBe(1);
        });

        it('handles single element', () => {
            expect(findMin([10])).toBe(10);
        });
    });

    describe('searchMatrixII', () => {
        const matrix: number[][] = [
            [1, 4, 7, 11, 15],
            [2, 5, 8, 12, 19],
            [3, 6, 9, 16, 22],
            [10, 13, 14, 17, 24],
            [18, 21, 23, 26, 30],
        ];

        it('finds existing targets', () => {
            expect(searchMatrixII(matrix, 5)).toBe(true);
            expect(searchMatrixII(matrix, 14)).toBe(true);
            expect(searchMatrixII(matrix, 30)).toBe(true);
            expect(searchMatrixII(matrix, 1)).toBe(true);
        });

        it('returns false for non-existing targets', () => {
            expect(searchMatrixII(matrix, 20)).toBe(false);
            expect(searchMatrixII(matrix, -1)).toBe(false);
            expect(searchMatrixII(matrix, 31)).toBe(false);
        });

        it('handles empty matrix and empty row', () => {
            expect(searchMatrixII([], 1)).toBe(false);
            expect(searchMatrixII([[]], 1)).toBe(false);
        });

        it('checks edges (top-right and bottom-left)', () => {
            expect(searchMatrixII(matrix, 15)).toBe(true); // top-right boundary value in first row
            expect(searchMatrixII(matrix, 18)).toBe(true); // bottom-left boundary value in last rows
        });
    });
});