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
 * Modified Binary Search Patterns
 * 
 * 1. Search in Rotated Sorted Array (#33)
 * 2. Find Minimum in Rotated Sorted Array (#153)
 * 3. Search a 2D Matrix II (#240)
 */

/**
 * Problem #33: Search in Rotated Sorted Array (Medium)
 * 
 * Given a rotated sorted array and a target value, return its index if found, else -1.
 * Approach:
 * - At each step, determine which half is sorted.
 * - If target is in the sorted half, search there; otherwise, search the other half.
 * 
 * Example:
 * Input: nums = [4,5,6,7,0,1,2], target = 0
 * Output: 4
 */
export function searchInRotatedArray(nums: number[], target: number): number {
    let left = 0;                              // Start pointer
    let right = nums.length - 1;               // End pointer

    while (left <= right) {                    // While search space is valid
        const mid = Math.floor((left + right) / 2); // Middle index

        if (nums[mid] === target) return mid;  // Found target, return index

        // Check if left half is sorted
        if (nums[left] <= nums[mid]) {
            // Left half is sorted
            // Example: nums = [4,5,6,7,0,1,2], left=0, mid=3, nums[left]=4, nums[mid]=7
            if (nums[left] <= target && target < nums[mid]) {
                right = mid - 1;               // Target is in left half
            } else {
                left = mid + 1;                // Target is in right half
            }
        } else {
            // Right half is sorted
            // Example: nums = [4,5,6,7,0,1,2], left=0, mid=5, nums[mid]=1, right=6, nums[right]=2
            if (nums[mid] < target && target <= nums[right]) {
                left = mid + 1;                // Target is in right half
            } else {
                right = mid - 1;               // Target is in left half
            }
        }
    }

    return -1;                                 // Target not found
    // Example: returns 4 for target=0 in [4,5,6,7,0,1,2]
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
    let left = 0;                              // Start pointer
    let right = nums.length - 1;               // End pointer

    while (left < right) {                     // While search space is valid
        const mid = Math.floor((left + right) / 2); // Middle index

        // If middle value is greater than rightmost value,
        // minimum element must be in the right half
        if (nums[mid] > nums[right]) {
            left = mid + 1;                    // Minimum is in right half
            // Example: nums = [4,5,6,7,0,1,2], mid=3, nums[mid]=7, nums[right]=2
        } else {
            right = mid;                       // Minimum is in left half (including mid)
            // Example: nums = [3,4,5,1,2], mid=2, nums[mid]=5, nums[right]=2
        }
    }

    return nums[left];                         // At this point, left and right converge to minimum
    // Example: returns 1 for [3,4,5,1,2]
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
 * Problem #240: Search a 2D Matrix II (Medium)
 * 
 * Given a matrix sorted row-wise and column-wise, search for a target value.
 * Approach:
 * - Start from top-right corner, move left if too large, move down if too small.
 * 
 * Example:
 * Input: matrix = [
 *   [1, 4, 7, 11, 15],
 *   [2, 5, 8, 12, 19],
 *   [3, 6, 9, 16, 22],
 *   [10,13,14,17,24],
 *   [18,21,23,26,30]
 * ], target = 5
 * Output: true
 */
export function searchMatrixII(matrix: number[][], target: number): boolean {
    if (!matrix || matrix.length === 0 || matrix[0].length === 0) return false; // Edge case

    const rows = matrix.length;
    const cols = matrix[0].length;

    // Start from top-right corner
    let row = 0;
    let col = cols - 1;

    while (row < rows && col >= 0) {
        if (matrix[row][col] === target) {
            return true;                      // Found target
        } else if (matrix[row][col] > target) {
            col--;                            // Current element is too large, move left
            // Example: matrix[0][4]=15 > 5, move to col=3
        } else {
            row++;                            // Current element is too small, move down
            // Example: matrix[0][1]=4 < 5, move to row=1
        }
    }

    return false;                             // Target not found
    // Example: returns true for target=5 in matrix above
}