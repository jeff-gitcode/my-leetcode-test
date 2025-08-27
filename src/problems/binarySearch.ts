/**
 * Binary Search Implementations: 
 * Problems #704, #33, #153 with detailed explanations
 */

/**
 * Problem #704: Binary Search (Easy)
 * 
 * Given a sorted array of integers, search for a target value.
 * Return the index if found, otherwise return -1.
 * 
 * Approach:
 * 1. Use classic binary search algorithm
 * 2. Compare middle element with target and narrow search space
 * 3. Continue until element is found or search space is empty
 * 
 * Time Complexity: O(log n) - we divide the search space in half each time
 * Space Complexity: O(1) - we use constant extra space
 * 
 * Example:
 * Input: nums = [-1,0,3,5,9,12], target = 9
 * Output: 4
 * Explanation: 9 exists in nums and its index is 4
 */
export function binarySearch(nums: number[], target: number): number {
    let left = 0;                              // Initialize left pointer at first element
    let right = nums.length - 1;               // Initialize right pointer at last element

    while (left <= right) {                    // Continue while we have a valid search space
        const mid = Math.floor((left + right) / 2);  // Calculate middle index to avoid overflow

        if (nums[mid] === target) {            // If target found at middle position
            return mid;                        // Return the index immediately
        } else if (nums[mid] < target) {       // If middle value is smaller than target
            left = mid + 1;                    // Target must be in right half, adjust left boundary
        } else {                               // If middle value is larger than target
            right = mid - 1;                   // Target must be in left half, adjust right boundary
        }
    }

    return -1;                                 // Target not found in array
}

/**
 * Problem #33: Search in Rotated Sorted Array (Medium)
 * 
 * Given a rotated sorted array of unique elements, search for target value.
 * Return the index if found, otherwise return -1.
 * A rotated array is an array that was sorted, then rotated at some pivot.
 * 
 * Approach:
 * 1. Use modified binary search algorithm
 * 2. First identify which half of the array is sorted (there's always one sorted half)
 * 3. Check if target is in the sorted half, if yes, search there; otherwise, search the other half
 * 4. Continue narrowing search space until element is found or search space is empty
 * 
 * Time Complexity: O(log n) - we divide the search space in half each time
 * Space Complexity: O(1) - we use constant extra space
 * 
 * Example:
 * Input: nums = [4,5,6,7,0,1,2], target = 0
 * Output: 4
 * Explanation: 0 exists in nums and its index is 4
 */
export function searchInRotatedArray(nums: number[], target: number): number {
    let left = 0;                              // Initialize left pointer at first element
    let right = nums.length - 1;               // Initialize right pointer at last element

    while (left <= right) {                    // Continue while we have a valid search space
        const mid = Math.floor((left + right) / 2);  // Calculate middle index

        if (nums[mid] === target) {            // If target found at middle position
            return mid;                        // Return the index immediately
        }

        // Check if left half is sorted (no rotation in this half)
        if (nums[left] <= nums[mid]) {
            // Left half is sorted, now check if target is within this sorted range
            if (nums[left] <= target && target < nums[mid]) {
                right = mid - 1;               // Target is in left sorted half
            } else {
                left = mid + 1;                // Target is in right half (may be unsorted)
            }
        } else {
            // Right half is sorted (no rotation in this half)
            // Check if target is within this sorted range
            if (nums[mid] < target && target <= nums[right]) {
                left = mid + 1;                // Target is in right sorted half
            } else {
                right = mid - 1;               // Target is in left half (may be unsorted)
            }
        }
    }

    return -1;                                 // Target not found in array
}

/**
 * Problem #153: Find Minimum in Rotated Sorted Array (Medium)
 * 
 * Given a rotated sorted array of unique elements, find the minimum element.
 * A rotated array is an array that was sorted, then rotated at some pivot.
 * 
 * Approach:
 * 1. Use modified binary search algorithm
 * 2. Compare middle element with rightmost element to determine which half has the minimum
 * 3. If middle > right, minimum is in right half; otherwise, minimum is in left half
 * 4. Continue narrowing search space until we find the minimum
 * 
 * Time Complexity: O(log n) - we divide the search space in half each time
 * Space Complexity: O(1) - we use constant extra space
 * 
 * Example:
 * Input: nums = [3,4,5,1,2]
 * Output: 1
 * Explanation: The original array was [1,2,3,4,5] rotated 3 times, min is 1
 */
export function findMinInRotatedArray(nums: number[]): number {
    let left = 0;                              // Initialize left pointer at first element
    let right = nums.length - 1;               // Initialize right pointer at last element

    while (left < right) {                     // Continue until we've narrowed to a single element
        const mid = Math.floor((left + right) / 2);  // Calculate middle index

        // If middle value is greater than rightmost value,
        // minimum element must be in the right half
        if (nums[mid] > nums[right]) {
            left = mid + 1;                    // Minimum is in right half, adjust left boundary
        } else {
            // If middle value is less than or equal to rightmost value,
            // minimum element must be in the left half (including mid)
            right = mid;                       // Minimum is in left half, adjust right boundary
        }
    }

    return nums[left];                         // At this point, left and right converge to minimum
}

/**
 * Additional Examples:
 * 
 * Binary Search (Problem #704):
 * - Input: nums = [1,2,3,4,5], target = 3
 *   Step 1: left=0, right=4, mid=2, nums[mid]=3 ✓ 
 *   Output: 2
 * 
 * Search in Rotated Array (Problem #33):
 * - Input: nums = [4,5,6,7,0,1,2], target = 0
 *   Step 1: left=0, right=6, mid=3, nums[mid]=7 (≠ target)
 *   Step 2: left half [4,5,6,7] is sorted, but target=0 is not in this range
 *   Step 3: search right half, left=4, right=6, mid=5, nums[mid]=1 (≠ target) 
 *   Step 4: right half [0,1] is sorted, target=0 is in this range
 *   Step 5: search left half, left=4, right=4, mid=4, nums[mid]=0 ✓
 *   Output: 4
 * 
 * Find Minimum in Rotated Array (Problem #153):
 * - Input: nums = [4,5,6,7,0,1,2]
 *   Step 1: left=0, right=6, mid=3, nums[mid]=7, nums[right]=2 (7>2)
 *   Step 2: minimum is in right half, left=4, right=6, mid=5, nums[mid]=1, nums[right]=2 (1<2)
 *   Step 3: minimum is in left half, left=4, right=5, mid=4, nums[mid]=0, nums[right]=1 (0<1)
 *   Step 4: minimum is in left half, left=4, right=4, nums[left]=0 ✓
 *   Output: 0
 */


/**
 * Search Insert Position - finds index where target should be inserted
 * @param nums - Sorted array of numbers
 * @param target - Target value to insert
 * @returns Index where target should be inserted
 */
export function searchInsert(nums: number[], target: number): number {
    let left = 0;
    let right = nums.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        if (nums[mid] === target) {
            return mid;
        } else if (nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return left;
}

/**
 * Find First and Last Position of Element in Sorted Array
 * @param nums - Sorted array with possible duplicates
 * @param target - Target value to find range for
 * @returns Array with [start, end] indices, or [-1, -1] if not found
 */
export function searchRange(nums: number[], target: number): number[] {
    const findFirst = (): number => {
        let left = 0;
        let right = nums.length - 1;
        let result = -1;

        while (left <= right) {
            const mid = Math.floor((left + right) / 2);

            if (nums[mid] === target) {
                result = mid;
                right = mid - 1; // Continue searching left
            } else if (nums[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }

        return result;
    };

    const findLast = (): number => {
        let left = 0;
        let right = nums.length - 1;
        let result = -1;

        while (left <= right) {
            const mid = Math.floor((left + right) / 2);

            if (nums[mid] === target) {
                result = mid;
                left = mid + 1; // Continue searching right
            } else if (nums[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }

        return result;
    };

    const first = findFirst();
    if (first === -1) return [-1, -1];

    const last = findLast();
    return [first, last];
}

/**
 * Search in Rotated Sorted Array
 * @param nums - Rotated sorted array
 * @param target - Target value to find
 * @returns Index of target if found, -1 otherwise
 */
export function search(nums: number[], target: number): number {
    let left = 0;
    let right = nums.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        if (nums[mid] === target) return mid;

        // Check if left half is sorted
        if (nums[left] <= nums[mid]) {
            // Target is in left sorted half
            if (nums[left] <= target && target < nums[mid]) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        } else {
            // Right half is sorted
            // Target is in right sorted half
            if (nums[mid] < target && target <= nums[right]) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }

    return -1;
}

/**
 * Find Minimum in Rotated Sorted Array
 * @param nums - Rotated sorted array with unique elements
 * @returns Minimum element in the array
 */
export function findMin(nums: number[]): number {
    let left = 0;
    let right = nums.length - 1;

    while (left < right) {
        const mid = Math.floor((left + right) / 2);

        // If mid element is greater than rightmost element,
        // minimum is in right half
        if (nums[mid] > nums[right]) {
            left = mid + 1;
        } else {
            // Minimum is in left half (including mid)
            right = mid;
        }
    }

    return nums[left];
}

/**
 * Search a 2D Matrix II - Search in row and column sorted matrix
 * @param matrix - Matrix sorted row-wise and column-wise
 * @param target - Target value to search
 * @returns True if target found, false otherwise
 */
export function searchMatrixII(matrix: number[][], target: number): boolean {
    if (!matrix || matrix.length === 0 || matrix[0].length === 0) return false;

    const rows = matrix.length;
    const cols = matrix[0].length;

    // Start from top-right corner
    let row = 0;
    let col = cols - 1;

    while (row < rows && col >= 0) {
        if (matrix[row][col] === target) {
            return true;
        } else if (matrix[row][col] > target) {
            // Current element is too large, move left
            col--;
        } else {
            // Current element is too small, move down
            row++;
        }
    }

    return false;
}
