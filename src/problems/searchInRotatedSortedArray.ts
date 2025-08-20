// ...existing code...
/**
 * Solution for "Search in Rotated Sorted Array" - LeetCode #33
 * 
 * Problem: Given a rotated sorted array and a target value, return its index if found, else -1.
 * 
 * Approach: Modified Binary Search
 * - Find which side is sorted
 * - Decide which half to search next
 * 
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 */
export function search(nums: number[], target: number): number {
    let left = 0, right = nums.length - 1;
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (nums[mid] === target) return mid;
        // Left half is sorted
        if (nums[left] <= nums[mid]) {
            if (nums[left] <= target && target < nums[mid]) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        } else { // Right half is sorted
            if (nums[mid] < target && target <= nums[right]) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }
    return -1;
}
// ...existing code...

// ...existing code...
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
// ...existing code...


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