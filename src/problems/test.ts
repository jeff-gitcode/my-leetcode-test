export function twoSum(numbers: number[], target: number): number[] {
    let left = 0;
    let right = numbers.length - 1;

    while (left < right) {
        const currentSum = numbers[left] + numbers[right];

        if (currentSum === target) {
            // Return 1-indexed positions
            return [left + 1, right + 1];
        } else if (currentSum < target) {
            // Need larger sum, move left pointer right
            left++;
        } else {
            // Need smaller sum, move right pointer left
            right--;
        }
    }

    // Should never reach here based on problem constraints
    return [];
}