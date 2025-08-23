/**
 * Solution for "Search in Rotated Sorted Array" - LeetCode #33
 * 
 * Problem: Given a rotated sorted array and a target value, return its index if found, else -1.
 * 
 * Approach: Modified Binary Search
 * - At each step, determine which half is sorted.
 * - If target is in the sorted half, search there; otherwise, search the other half.
 * 
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 * 
 * Example:
 * Input: nums = [4,5,6,7,0,1,2], target = 0
 * Output: 4
 * Explanation: 0 is at index 4.
 */
export function search(nums: number[], target: number): number {
    let left = 0, right = nums.length - 1;
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        // Check if mid is the target
        if (nums[mid] === target) return mid;

        // Determine which half is sorted
        if (nums[left] <= nums[mid]) {
            // Left half is sorted
            if (nums[left] <= target && target < nums[mid]) {
                // Target is in left half
                right = mid - 1;
            } else {
                // Target is in right half
                left = mid + 1;
            }
        } else {
            // Right half is sorted
            if (nums[mid] < target && target <= nums[right]) {
                // Target is in right half
                left = mid + 1;
            } else {
                // Target is in left half
                right = mid - 1;
            }
        }
    }
    // Target not found
    return -1;
}


/**
 * Solution for "Find Minimum in Rotated Sorted Array" - LeetCode #153
 * 
 * Problem: Find the minimum element in a rotated sorted array.
 * 
 * Approach: Modified Binary Search
 * - Compare mid with right to decide which half to search
 * 
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 */
export function findMin(nums: number[]): number {
    let left = 0, right = nums.length - 1;
    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        if (nums[mid] > nums[right]) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    return nums[left];
}


/**
 * Solution for "Find Peak Element" - LeetCode #162
 * 
 * Problem: Given an array of integers nums, find a peak element and return its index. 
 * A peak element is an element that is strictly greater than its neighbors.
 * 
 * Approach: Binary Search
 * - Compare mid with mid+1 to decide which half to search
 * - There is always at least one peak
 * 
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 */
export function findPeakElement(nums: number[]): number {
    let left = 0, right = nums.length - 1;
    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        if (nums[mid] < nums[mid + 1]) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    return left;
}

