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

export function merge(nums: number[][]): number[][] {
    if (nums.length <= 1) return nums;

    // Sort intervals by start time
    nums.sort((a, b) => a[0] - b[0]);

    const result: number[][] = [nums[0]];

    for (let i = 1; i < nums.length; i++) {
        const current = nums[i];
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

export function merge2(nums: number[][]): number[][] {
    if (nums.length === 0) return [];

    // 1. 按起点排序
    nums.sort((a, b) => a[0] - b[0]);

    const result: number[][] = [];
    let current = nums[0];

    for (let i = 1; i < nums.length; i++) {
        const [start, end] = nums[i];

        if (start <= current[1]) {
            // 2. 有重叠 → 更新右边界
            current[1] = Math.max(current[1], end);
        } else {
            // 3. 无重叠 → 推入结果，重置当前区间
            result.push(current);
            current = nums[i];
        }
    }

    // 最后一个区间别忘了加进去
    result.push(current);

    return result;
}


/**
 * Solution for "Insert Interval" - LeetCode #57
 * 
 * Problem: Insert a new interval into a list of non-overlapping intervals and merge if necessary.
 * 
 * Approach: Three-step process
 * - Add intervals before, merge overlapping, add after
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
export function insert(nums: number[][], newNums: number[]): number[][] {
    const result: number[][] = [];
    let i = 0;
    // Add intervals before newInterval
    while (i < nums.length && nums[i][1] < newNums[0]) {
        result.push(nums[i]);
        i++;
    }
    // Merge overlapping intervals
    while (i < nums.length && nums[i][0] <= newNums[1]) {
        newNums[0] = Math.min(newNums[0], nums[i][0]);
        newNums[1] = Math.max(newNums[1], nums[i][1]);
        i++;
    }
    result.push(newNums);
    // Add intervals after newInterval
    while (i < nums.length) {
        result.push(nums[i]);
        i++;
    }
    return result;
}

/**
 * Solution for "Meeting Rooms" - LeetCode #252
 * 
 * Problem: Given an array of meeting time intervals, determine if a person could attend all meetings.
 * 
 * Approach: Sort + Check Overlap
 * - Sort intervals by start, check for overlap
 * 
 * Time Complexity: O(n log n)
 * Space Complexity: O(1)
 */
export function canAttendMeetings(nums: number[][]): boolean {
    nums.sort((a, b) => a[0] - b[0]);
    for (let i = 1; i < nums.length; i++) {
        if (nums[i][0] < nums[i - 1][1]) {
            return false;
        }
    }
    return true;
}