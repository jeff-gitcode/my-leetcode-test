/**
 * Solution for "Insert Interval" - LeetCode #57
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
 * 
 * Example:
 * Input: intervals = [[1,3],[6,9]], newInterval = [2,5]
 * Output: [[1,5],[6,9]]
 * Explanation: Merge [1,3] and [2,5] to [1,5], then add [6,9].
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

/**
 * Solution for "Group Anagrams" - LeetCode #49
 * 
 * Problem: Given an array of strings, group anagrams together.
 * 
 * Approach: Hash Map
 * - For each string, sort its characters to form a key.
 * - Group strings with the same sorted key.
 * 
 * Time Complexity: O(n * k log k), where n is the number of strings and k is the maximum string length.
 * Space Complexity: O(n * k)
 * 
 * Example:
 * Input: strs = ["eat","tea","tan","ate","nat","bat"]
 * Output: [["eat","tea","ate"],["tan","nat"],["bat"]]
 */
export function groupAnagrams(strs: string[]): string[][] {
    const map = new Map<string, string[]>();
    for (const str of strs) {
        // Sort characters to form the key
        const key = str.split('').sort().join('');
        if (!map.has(key)) map.set(key, []);
        map.get(key)!.push(str);
    }
    // Return grouped anagrams
    return Array.from(map.values());
}


/**
 * Solution for "Non-overlapping Intervals" - LeetCode #435
 * 
 * Problem: Given a collection of intervals, find the minimum number of intervals you need to remove to make the rest of the intervals non-overlapping.
 * 
 * Approach: Greedy (Sort by end time)
 * - Sort intervals by end time
 * - Iterate and count overlaps, remove intervals that overlap
 * 
 * Time Complexity: O(n log n) (due to sorting)
 * Space Complexity: O(1) (excluding output)
 */

export function eraseOverlapIntervals(intervals: number[][]): number {
    if (intervals.length === 0) return 0;

    // Sort intervals by end time
    intervals.sort((a, b) => a[1] - b[1]);

    let count = 0;
    let prevEnd = intervals[0][1];

    for (let i = 1; i < intervals.length; i++) {
        const [start, end] = intervals[i];
        if (start < prevEnd) {
            // Overlap, need to remove this interval
            count++;
        } else {
            // No overlap, update prevEnd
            prevEnd = end;
        }
    }

    return count;
}