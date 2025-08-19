/**
 * Solution for "Happy Number" - LeetCode #202
 * 
 * Problem: Write an algorithm to determine if a number n is happy.
 * A happy number is defined by the following process:
 * - Starting with any positive integer, replace the number by the sum of the squares of its digits.
 * - Repeat the process until the number equals 1 (where it will stay), or it loops endlessly in a cycle which does not include 1.
 * - Those numbers for which this process ends in 1 are happy.
 * 
 * Approach: Fast & Slow Pointers (Floyd's Cycle Detection)
 * - Use two pointers moving at different speeds through the transformation sequence
 * - If there's a cycle that doesn't include 1, slow and fast will eventually meet
 * - If the sequence reaches 1, the number is happy
 * 
 * Time Complexity: O(log n) - each iteration reduces the number of digits
 * Space Complexity: O(1) - only using two pointers
 */

/**
 * Helper function to calculate the sum of squares of digits
 * @param n - The number to process
 * @returns Sum of squares of all digits
 */
function getSumOfSquares(n: number): number {
    let sum = 0;
    while (n > 0) {
        const digit = n % 10;
        sum += digit * digit;
        n = Math.floor(n / 10);
    }
    return sum;
}

/**
 * Determines if a number is happy using Floyd's cycle detection algorithm
 * @param n - The number to check
 * @returns true if the number is happy, false otherwise
 */
export function isHappy(n: number): boolean {
    let slow = n;
    let fast = n;

    do {
        // Move slow pointer one step
        slow = getSumOfSquares(slow);

        // Move fast pointer two steps
        fast = getSumOfSquares(getSumOfSquares(fast));

        // If we reach 1, the number is happy
        if (slow === 1 || fast === 1) {
            return true;
        }
    } while (slow !== fast);

    // If slow and fast meet and neither is 1, we have a cycle
    return false;
}

// Alternative implementation using HashSet for comparison
export function isHappyHashSet(n: number): boolean {
    const seen = new Set<number>();

    while (n !== 1 && !seen.has(n)) {
        seen.add(n);
        n = getSumOfSquares(n);
    }

    return n === 1;
}