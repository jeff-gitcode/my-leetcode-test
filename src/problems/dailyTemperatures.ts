/**
 * Solution for "Daily Temperatures" - LeetCode #739
 * 
 * Problem: Given an array of integers temperatures representing the daily temperatures, 
 * return an array answer such that answer[i] is the number of days you have to wait 
 * after the ith day to get a warmer temperature. If there is no future day for which 
 * this is possible, keep answer[i] == 0.
 * 
 * Approach: Monotonic Stack with Indices
 * - Use a monotonic decreasing stack to store indices of temperatures
 * - When a warmer temperature is found, calculate the distance to previous cooler days
 * - The stack maintains indices in decreasing order of their temperatures
 * 
 * Time Complexity: O(n) - each element is pushed and popped at most once
 * Space Complexity: O(n) - stack can contain at most n elements
 */

/**
 * Finds the number of days to wait for a warmer temperature for each day
 * @param temperatures - Array of daily temperatures
 * @returns Array of days to wait for warmer temperature (0 if none)
 */
export function dailyTemperatures(temperatures: number[]): number[] {
    const n = temperatures.length;
    const result = new Array(n).fill(0);
    const stack: number[] = []; // Stack stores indices

    for (let i = 0; i < n; i++) {
        // While stack is not empty and current temperature is warmer than 
        // temperature at the index stored in stack top
        while (stack.length > 0 && temperatures[i] > temperatures[stack[stack.length - 1]]) {
            const prevIndex = stack.pop()!;
            result[prevIndex] = i - prevIndex; // Calculate the distance
        }

        // Push current index to stack
        stack.push(i);
    }

    return result;
}

/**
 * Alternative implementation using brute force for comparison
 * @param temperatures - Array of daily temperatures
 * @returns Array of days to wait for warmer temperature (0 if none)
 */
export function dailyTemperaturesBruteForce(temperatures: number[]): number[] {
    const n = temperatures.length;
    const result = new Array(n).fill(0);

    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            if (temperatures[j] > temperatures[i]) {
                result[i] = j - i;
                break;
            }
        }
    }

    return result;
}

/**
 * Optimized implementation using array instead of stack (when range is small)
 * @param temperatures - Array of daily temperatures
 * @returns Array of days to wait for warmer temperature (0 if none)
 */
export function dailyTemperaturesOptimized(temperatures: number[]): number[] {
    const n = temperatures.length;
    const result = new Array(n).fill(0);
    let hottest = 0;

    // Process from right to left
    for (let i = n - 1; i >= 0; i--) {
        const currentTemp = temperatures[i];

        if (currentTemp >= hottest) {
            hottest = currentTemp;
            continue;
        }

        // Look for the next warmer day
        let days = 1;
        while (temperatures[i + days] <= currentTemp) {
            days += result[i + days];
        }
        result[i] = days;
    }

    return result;
}

/**
 * Helper function to find next warmer temperatures (similar to next greater element)
 * @param temperatures - Array of temperatures
 * @returns Array of next warmer temperatures (-1 if none)
 */
export function nextWarmerTemperatures(temperatures: number[]): number[] {
    const n = temperatures.length;
    const result = new Array(n).fill(-1);
    const stack: number[] = [];

    for (let i = 0; i < n; i++) {
        while (stack.length > 0 && temperatures[i] > temperatures[stack[stack.length - 1]]) {
            const prevIndex = stack.pop()!;
            result[prevIndex] = temperatures[i];
        }
        stack.push(i);
    }

    return result;
}

/**
 * Function to validate temperature constraints
 * @param temperatures - Array of temperatures to validate
 * @returns true if all temperatures are within valid range
 */
export function validateTemperatures(temperatures: number[]): boolean {
    return temperatures.every(temp => temp >= 30 && temp <= 100);
}
