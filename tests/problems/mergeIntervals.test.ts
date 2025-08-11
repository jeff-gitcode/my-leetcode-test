import { merge } from '../../src/problems/mergeIntervals';

function assertSortedAndNonOverlapping(intervals: number[][]) {
    for (let i = 1; i < intervals.length; i++) {
        const prev = intervals[i - 1];
        const curr = intervals[i];
        expect(prev[0]).toBeLessThanOrEqual(curr[0]);
        // Non-overlapping implies prev[1] < curr[0]
        expect(prev[1]).toBeLessThan(curr[0]);
    }
}

describe('mergeIntervals.merge', () => {
    it('should return empty array for empty input', () => {
        expect(merge([])).toEqual([]);
    });

    it('should return the same single interval for length 1', () => {
        expect(merge([[1, 3]])).toEqual([[1, 3]]);
    });

    it('should keep non-overlapping intervals (already sorted)', () => {
        const input = [[1, 2], [3, 4], [6, 8]];
        const result = merge(input);
        expect(result).toEqual([[1, 2], [3, 4], [6, 8]]);
        assertSortedAndNonOverlapping(result);
    });

    it('should sort and keep non-overlapping intervals (unsorted input)', () => {
        const input = [[6, 8], [1, 2], [3, 4]];
        const result = merge(input);
        expect(result).toEqual([[1, 2], [3, 4], [6, 8]]);
        assertSortedAndNonOverlapping(result);
    });

    it('should merge overlapping intervals (LeetCode example)', () => {
        const input = [[1, 3], [2, 6], [8, 10], [15, 18]];
        const result = merge(input);
        expect(result).toEqual([[1, 6], [8, 10], [15, 18]]);
        assertSortedAndNonOverlapping(result);
    });

    it('should merge nested intervals into the outer interval', () => {
        const input = [[1, 10], [2, 3], [4, 5], [6, 7], [8, 9]];
        const result = merge(input);
        expect(result).toEqual([[1, 10]]);
        assertSortedAndNonOverlapping(result);
    });

    it('should merge touching intervals where end == start', () => {
        const input = [[1, 4], [4, 5], [5, 7], [10, 12], [12, 12]];
        const result = merge(input);
        expect(result).toEqual([[1, 7], [10, 12]]);
        assertSortedAndNonOverlapping(result);
    });

    it('should handle chain merges across multiple intervals', () => {
        const input = [[1, 2], [2, 3], [3, 4], [4, 6], [7, 8], [8, 10]];
        const result = merge(input);
        expect(result).toEqual([[1, 6], [7, 10]]);
        assertSortedAndNonOverlapping(result);
    });

    it('should handle duplicate intervals', () => {
        const input = [[1, 4], [1, 4], [1, 4]];
        const result = merge(input);
        expect(result).toEqual([[1, 4]]);
        assertSortedAndNonOverlapping(result);
    });

    it('should handle negative and mixed ranges', () => {
        const input = [[-3, -1], [-2, 2], [3, 4], [-10, -5], [-6, -4]];
        const result = merge(input);
        expect(result).toEqual([[-10, -4], [-3, 2], [3, 4]]);
        assertSortedAndNonOverlapping(result);
    });

    it('should handle intervals contained with same boundaries', () => {
        const input = [[2, 2], [2, 2], [1, 3]];
        const result = merge(input);
        expect(result).toEqual([[1, 3]]);
        assertSortedAndNonOverlapping(result);
    });

    it('should handle large input efficiently', () => {
        // Build 1000 intervals: [1,2], [2,3], ..., [1000,1001] -> merges to [1, 1001]
        const input: number[][] = [];
        for (let i = 1; i <= 1000; i++) {
            input.push([i, i + 1]);
        }
        const result = merge(input);
        expect(result).toEqual([[1, 1001]]);
        assertSortedAndNonOverlapping(result);
    });
});