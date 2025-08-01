/**
 * Solution for the "Insert Interval" problem
 * 
 * Problem: Given a set of non-overlapping intervals and a new interval,
 * insert the new interval and merge overlapping intervals if necessary.
 * 
 * Approach: Three-step process
 * - Add all intervals that end before the new interval starts
 * - Merge all overlapping intervals with the new interval
 * - Add all intervals that start after the new interval ends
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(1) excluding output
 */

export function insert(intervals: number[][], newInterval: number[]): number[][] {
    const result: number[][] = [];
    let i = 0;

    // Add all intervals that end before newInterval starts
    while (i < intervals.length && intervals[i][1] < newInterval[0]) {
        result.push(intervals[i]);
        i++;
    }

    // Merge overlapping intervals
    while (i < intervals.length && intervals[i][0] <= newInterval[1]) {
        newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
        newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
        i++;
    }
    result.push(newInterval);

    // Add remaining intervals
    while (i < intervals.length) {
        result.push(intervals[i]);
        i++;
    }

    return result;
}
