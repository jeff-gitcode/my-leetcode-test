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

/**
 * Problem #56: Merge Intervals (Medium)
 * 
 * Given an array of intervals, merge all overlapping intervals.
 * Approach:
 * 1. Sort intervals by start time.
 * 2. Iterate and merge overlapping intervals.
 * 3. Add non-overlapping intervals to result.
 * 
 * Example:
 * Input: [[1,3],[2,6],[8,10],[15,18]]
 * Output: [[1,6],[8,10],[15,18]]
 */
export function merge(intervals: number[][]): number[][] {
    if (intervals.length <= 1) return intervals;           // Edge case: 0 or 1 interval, nothing to merge

    intervals.sort((a, b) => a[0] - b[0]);                 // Sort intervals by start time
    // Example: [[1,3],[2,6],[8,10],[15,18]] becomes [[1,3],[2,6],[8,10],[15,18]]

    const result: number[][] = [intervals[0]];             // Initialize result with first interval
    // Example: result = [[1,3]]

    for (let i = 1; i < intervals.length; i++) {           // Iterate through intervals starting from second
        const current = intervals[i];                      // Current interval, e.g. [2,6]
        const lastMerged = result[result.length - 1];      // Last interval in result, e.g. [1,3]

        if (current[0] <= lastMerged[1]) {                 // Overlap detected: current starts before lastMerged ends
            // Example: [2,6][1,3] overlap since 2 <= 3
            lastMerged[1] = Math.max(lastMerged[1], current[1]); // Merge by updating end time
            // Example: lastMerged becomes [1,6]
        } else {
            result.push(current);                          // No overlap, add current interval to result
            // Example: result = [[1,6],[8,10]] after processing [8,10]
        }
    }

    return result;                                         // Return merged intervals
}

/**
 * Problem #57: Insert Interval (Medium)
 * 
 * Given a set of non-overlapping intervals and a new interval,
 * insert the new interval and merge if necessary.
 * Approach:
 * 1. Add intervals before newInterval.
 * 2. Merge overlapping intervals with newInterval.
 * 3. Add intervals after newInterval.
 * 
 * Example:
 * Input: intervals = [[1,3],[6,9]], newInterval = [2,5]
 * Output: [[1,5],[6,9]]
 */
export function insert(intervals: number[][], newInterval: number[]): number[][] {
    const result: number[][] = [];                         // Store merged intervals
    let i = 0;

    // Add intervals before newInterval
    // Example: intervals = [[1,3],[6,9]], newInterval = [2,5]
    // First interval [1,3] ends at 3, which is not less than newInterval[0]=2, so skip this loop
    while (i < intervals.length && intervals[i][1] < newInterval[0]) {
        result.push(intervals[i]);                         // Add intervals before newInterval
        i++;
    }

    // Merge overlapping intervals with newInterval
    // Example: [1,3] overlaps with [2,5] since 1 <= 5
    // Merge start: min(2,1)=1, Merge end: max(5,3)=5, newInterval becomes [1,5]
    while (i < intervals.length && intervals[i][0] <= newInterval[1]) {
        newInterval[0] = Math.min(newInterval[0], intervals[i][0]); // Merge start
        newInterval[1] = Math.max(newInterval[1], intervals[i][1]); // Merge end
        i++;
    }
    result.push(newInterval);                              // Add merged newInterval
    // Example: result = [[1,5]]

    // Add intervals after newInterval
    // Example: next interval [6,9] starts after newInterval[1]=5, so add it
    while (i < intervals.length) {
        result.push(intervals[i]);                         // Add intervals after newInterval
        i++;
    }
    // Example: result = [[1,5],[6,9]]

    return result;                                         // Return result
    // Example output: [[1,5],[6,9]]
}

/**
 * Solution for "Meeting Rooms" - LeetCode #252
 * 
 * Problem: Given an array of meeting time intervals, determine if a person could attend all meetings.
 * 
 * Approach: Sort + Check Overlap
 * - Sort intervals by start time.
 * - Check if any meeting overlaps with the previous one.
 * - If any overlap exists, return false; otherwise, return true.
 * 
 * Time Complexity: O(n log n) (due to sorting)
 * Space Complexity: O(1)
 * 
 * Example:
 * Input: [[0,30],[5,10],[15,20]]
 * Output: false
 * Explanation: The first meeting [0,30] overlaps with [5,10] and [15,20].
 * 
 * Input: [[7,10],[2,4]]
 * Output: true
 * Explanation: No meetings overlap.
 */
export function canAttendMeetings(nums: number[][]): boolean {
    nums.sort((a, b) => a[0] - b[0]);
    for (let i = 1; i < nums.length; i++) {
        if (nums[i][0] < nums[i - 1][1]) {
            // Overlap detected, cannot attend all meetings
            return false;
        }
    }

    // No overlaps, can attend all meetings
    return true;
}