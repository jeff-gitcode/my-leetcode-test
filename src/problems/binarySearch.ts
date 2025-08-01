/**
 * Binary Search implementations
 * 
 * Pattern: Divide and conquer approach for searching in sorted arrays
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 */

/**
 * Classic binary search - finds target in sorted array
 * @param nums - Sorted array of numbers
 * @param target - Target value to find
 * @returns Index of target if found, -1 otherwise
 */
export function binarySearch(nums: number[], target: number): number {
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

    return -1;
}

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
