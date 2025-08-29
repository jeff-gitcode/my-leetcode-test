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
 * Problem #435: Non-overlapping Intervals (Medium)
 * 
 * Given an array of intervals, find the minimum number to remove to make the rest non-overlapping.
 * Approach:
 * 1. Sort intervals by end time.
 * 2. Greedily select non-overlapping intervals.
 * 3. Count how many intervals need to be removed.
 * 
 * Example:
 * Input: [[1,2],[2,3],[3,4],[1,3]]
 * Output: 1
 * Explanation: Remove [1,3] to make the rest non-overlapping.
 */
export function eraseOverlapIntervals(intervals: number[][]): number {
    if (intervals.length <= 1) return 0;                   // Edge case: 0 or 1 interval, nothing to remove
    // Example: intervals = [[1,2]] → return 0

    intervals.sort((a, b) => a[1] - b[1]);                 // Sort intervals by end time
    // Example: [[1,2],[2,3],[3,4],[1,3]] → [[1,2],[1,3],[2,3],[3,4]]

    let count = 0;                                         // Number of intervals to remove
    let lastEnd = intervals[0][1];                         // End time of last non-overlapping interval
    // Example: lastEnd = 2 (from [1,2])

    for (let i = 1; i < intervals.length; i++) {           // Iterate through intervals
        // Example: i=1, intervals[1]=[1,3], intervals[1][0]=1 < lastEnd=2 → overlap
        if (intervals[i][0] < lastEnd) {                   // Overlap detected
            count++;                                       // Remove this interval
            // Example: count = 1 (remove [1,3])
        } else {
            lastEnd = intervals[i][1];                     // Update lastEnd for next comparison
            // Example: i=2, intervals[2]=[2,3], intervals[2][0]=2 == lastEnd=2 → no overlap, update lastEnd=3
        }
    }

    return count;                                          // Return number of intervals removed
    // Example: eraseOverlapIntervals([[1,2],[2,3],[3,4],[1,3]]) → 1
}