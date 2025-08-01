/**
 * Solution for the "Merge Intervals" problem
 * 
 * Problem: Given an array of intervals where intervals[i] = [starti, endi],
 * merge all overlapping intervals.
 * 
 * Approach: Sort + Merge
 * - Sort intervals by start time
 * - Merge overlapping intervals
 * 
 * Time Complexity: O(n log n)
 * Space Complexity: O(1) excluding output
 */

export function merge(intervals: number[][]): number[][] {
    if (intervals.length <= 1) return intervals;

    // Sort intervals by start time
    intervals.sort((a, b) => a[0] - b[0]);

    const result: number[][] = [intervals[0]];

    for (let i = 1; i < intervals.length; i++) {
        const current = intervals[i];
        const lastMerged = result[result.length - 1];

        if (current[0] <= lastMerged[1]) {
            // Overlapping intervals, merge them
            lastMerged[1] = Math.max(lastMerged[1], current[1]);
        } else {
            // Non-overlapping interval, add to result
            result.push(current);
        }
    }

    return result;
}
