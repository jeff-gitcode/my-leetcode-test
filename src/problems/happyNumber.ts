/**
 * Solution for "Happy Number" - LeetCode #202
 * 
 * Problem: A happy number is a number defined by the following process:
 * - Starting with any positive integer, replace the number by the sum of the squares of its digits.
 * - Repeat the process until the number equals 1 (where it will stay), or it loops endlessly in a cycle.
 * - Those numbers for which this process ends in 1 are happy numbers.
 * 
 * Approach: Fast & Slow Pointers (Floyd's Cycle-Finding Algorithm)
 * - Use two pointers (slow and fast) to detect a cycle
 * - If there's a cycle, the number is not happy
 * - If we reach 1, the number is happy
 * 
 * Time Complexity: O(log n) - each iteration reduces the number
 * Space Complexity: O(1) - constant extra space
 * 
 * Example:
 * Input: n = 19
 * Output: true
 * Explanation:
 * 1² + 9² = 1 + 81 = 82
 * 8² + 2² = 64 + 4 = 68
 * 6² + 8² = 36 + 64 = 100
 * 1² + 0² + 0² = 1 + 0 + 0 = 1
 * Since we reach 1, 19 is a happy number.
 */

export function isHappy(n: number): boolean {
    // Helper function to get sum of squares of digits
    function getNext(num: number): number {
        let sum = 0;

        // Calculate sum of squares of each digit
        while (num > 0) {
            const digit = num % 10;
            sum += digit * digit;
            num = Math.floor(num / 10);
        }

        return sum;
    }

    // Use Floyd's Cycle-Finding Algorithm (fast & slow pointers)
    let slow = n;
    let fast = getNext(n);

    while (fast !== 1 && slow !== fast) {
        // Slow pointer moves one step
        slow = getNext(slow);

        // Fast pointer moves two steps
        fast = getNext(getNext(fast));
    }

    // If we reach 1, it's a happy number
    return fast === 1;
}
