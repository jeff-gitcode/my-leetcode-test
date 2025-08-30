/**
 * Problem #136: Single Number (Easy)
 * 
 * Given a non-empty array of integers, every element appears twice except for one. Find that single one.
 * Approach:
 * - Use XOR: a ^ a = 0, a ^ 0 = a, so XOR all numbers to cancel out pairs.
 * 
 * Example:
 * Input: [2,2,1]
 * Output: 1
 */
export function singleNumber(nums: number[]): number {
    let result = 0;                          // Initialize result to 0
    for (const num of nums) {                // Iterate through all numbers
        result ^= num;                       // XOR with current number
        // Example: result = 0 ^ 2 = 2, result = 2 ^ 2 = 0, result = 0 ^ 1 = 1
    }
    return result;                           // Return the single number
    // Example output: 1
}

/**
 * Problem #338: Counting Bits (Easy)
 * 
 * Given a non-negative integer num, return an array with the number of 1's in the binary representation of every number in the range [0, num].
 * Approach:
 * - For each i, bits[i] = bits[i >> 1] + (i & 1)
 * - This uses the result for i/2 and adds 1 if i is odd.
 * 
 * Example:
 * Input: 5
 * Output: [0,1,1,2,1,2]
 * Explanation: 
 * 0: 0b0 → 0
 * 1: 0b1 → 1
 * 2: 0b10 → 1
 * 3: 0b11 → 2
 * 4: 0b100 → 1
 * 5: 0b101 → 2
 */
export function countBits(num: number): number[] {
    const bits = new Array(num + 1).fill(0); // Initialize result array
    for (let i = 1; i <= num; i++) {         // For each number from 1 to num
        bits[i] = bits[i >> 1] + (i & 1);    // Use previously computed value
        // Example: i=5, bits[5 >> 1]=bits[2]=1, (5 & 1)=1, so bits[5]=2
    }
    return bits;                             // Return array of bit counts
    // Example output: [0,1,1,2,1,2]
}

/**
 * Problem #201: Bitwise AND of Numbers Range (Medium)
 * 
 * Given two integers left and right, return the bitwise AND of all numbers in the range [left, right].
 * Approach:
 * - The result is the common prefix of left and right in binary.
 * - Shift both left and right rightwards until they are equal, count shifts, then shift left back.
 * 
 * Example:
 * Input: left = 5, right = 7
 * Output: 4
 * Explanation: 5=0b101, 6=0b110, 7=0b111; 101 & 110 & 111 = 100 (4)
 */
export function rangeBitwiseAnd(left: number, right: number): number {
    let shift = 0;                           // Count how many bits we shift
    while (left < right) {                   // While left and right differ
        left >>= 1;                          // Shift left rightwards
        right >>= 1;                         // Shift right rightwards
        shift++;                             // Increment shift count
        // Example: left=5, right=7 → left=2, right=3, shift=1
        // Next: left=1, right=1, shift=2
    }
    return left << shift;                    // Shift left back to original position
    // Example output: 1 << 2 = 4
}