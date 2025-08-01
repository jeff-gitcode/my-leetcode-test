/**
 * Solution for the "Happy Number" problem
 * 
 * Problem: A happy number is a number defined by repeatedly replacing it with 
 * the sum of the square of its digits until it equals 1 or loops endlessly in a cycle.
 * 
 * Approach: Fast & Slow Pointers (Floyd's Cycle Detection)
 * - Use two pointers to detect cycle in the sequence of sums
 * - If we reach 1, it's a happy number
 * - If we detect a cycle, it's not a happy number
 * 
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 */

function getNext(n: number): number {
    let sum = 0;
    while (n > 0) {
        const digit = n % 10;
        sum += digit * digit;
        n = Math.floor(n / 10);
    }
    return sum;
}

export function isHappy(n: number): boolean {
    let slow = n;
    let fast = n;

    do {
        slow = getNext(slow);
        fast = getNext(getNext(fast));
    } while (slow !== fast);

    return slow === 1;
}
