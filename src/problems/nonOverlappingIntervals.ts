/**
 * Solution for the "Non-overlapping Intervals" problem
 * 
 * Problem: Given an array of intervals, find the minimum number of intervals 
 * you need to remove to make the rest of the intervals non-overlapping.
 * 
 * Approach: Greedy Algorithm
 * - Sort intervals by end time
 * - Greedily select intervals that don't overlap
 * - Count how many we need to remove
 * 
 * Time Complexity: O(n log n)
 * Space Complexity: O(1)
 */

export function eraseOverlapIntervals(intervals: number[][]): number {
    if (intervals.length <= 1) return 0;

    // Sort by end time
    intervals.sort((a, b) => a[1] - b[1]);

    let count = 0;
    let lastEnd = intervals[0][1];

    for (let i = 1; i < intervals.length; i++) {
        if (intervals[i][0] < lastEnd) {
            // Overlapping interval, remove it
            count++;
        } else {
            // Non-overlapping, update lastEnd
            lastEnd = intervals[i][1];
        }
    }

    return count;
}
