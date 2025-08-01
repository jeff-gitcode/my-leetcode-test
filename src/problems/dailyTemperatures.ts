/**
 * Solution for the "Daily Temperatures" problem
 * 
 * Problem: Given an array of integers temperatures representing daily temperatures,
 * return an array such that answer[i] is the number of days you have to wait 
 * after the ith day to get a warmer temperature.
 * 
 * Approach: Monotonic Stack
 * - Use stack to store indices of temperatures in decreasing order
 * - When we find a higher temperature, pop from stack and calculate days
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */

export function dailyTemperatures(temperatures: number[]): number[] {
    const result = new Array(temperatures.length).fill(0);
    const stack: number[] = []; // Store indices

    for (let i = 0; i < temperatures.length; i++) {
        while (stack.length > 0 && temperatures[i] > temperatures[stack[stack.length - 1]]) {
            const index = stack.pop()!;
            result[index] = i - index;
        }
        stack.push(i);
    }

    return result;
}
