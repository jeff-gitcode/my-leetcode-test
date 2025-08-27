/**
 * Dynamic Programming implementations
 * 
 * Pattern: Break down problems into overlapping subproblems
 * Optimize using memoization or tabulation
 * Applications: Optimization, counting, decision problems
 */

/**
 * Fibonacci Number - Classic DP example
 * @param n - Position in fibonacci sequence
 * @returns The nth fibonacci number
 */
export function fib(n: number): number {
    if (n <= 1) return n;

    // Bottom-up approach (tabulation)
    const dp: number[] = [0, 1];

    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }

    return dp[n];
}

/**
 * Problem #70: Climbing Stairs (Easy)
 * 
 * You are climbing a staircase. It takes n steps to reach the top.
 * Each time you can either climb 1 or 2 steps. 
 * How many distinct ways can you climb to the top?
 * 
 * Approach:
 * 1. Use dynamic programming with bottom-up approach
 * 2. The number of ways to reach step n is the sum of ways to reach steps n-1 and n-2
 * 3. This forms a Fibonacci-like sequence
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(1) - we only store two previous values
 * 
 * Example Walkthrough for n=5:
 * - Base cases: 
 *   - n=1: 1 way (just one 1-step)
 *   - n=2: 2 ways (two 1-steps or one 2-step)
 * - n=3: ways(2) + ways(1) = 2 + 1 = 3 ways
 * - n=4: ways(3) + ways(2) = 3 + 2 = 5 ways
 * - n=5: ways(4) + ways(3) = 5 + 3 = 8 ways
 */
export function climbStairs(n: number): number {
    if (n <= 2) return n;                    // Base cases: 1 way for n=1, 2 ways for n=2

    let prev2 = 1;                           // Number of ways to reach step 1
    let prev1 = 2;                           // Number of ways to reach step 2

    for (let i = 3; i <= n; i++) {           // Start from step 3 and build up to n
        const current = prev1 + prev2;       // Ways to reach step i = ways to reach i-1 + ways to reach i-2
        prev2 = prev1;                       // Move prev1 to prev2 for next iteration
        prev1 = current;                     // Update prev1 to current for next iteration
    }

    return prev1;                            // After loop completes, prev1 contains the answer for step n
}

/**
 * House Robber - Maximum money without robbing adjacent houses
 * @param nums - Array representing money in each house
 * @returns Maximum amount that can be robbed
 */
export function rob(nums: number[]): number {
    if (nums.length === 0) return 0;
    if (nums.length === 1) return nums[0];

    let prev2 = nums[0];           // dp[i-2]
    let prev1 = Math.max(nums[0], nums[1]); // dp[i-1]

    for (let i = 2; i < nums.length; i++) {
        const current = Math.max(prev1, prev2 + nums[i]);
        prev2 = prev1;
        prev1 = current;
    }

    return prev1;
}

/**
 * Problem #322: Coin Change (Medium)
 * 
 * Given an array of coin denominations and a target amount, find the minimum number 
 * of coins needed to make up that amount. If it's not possible, return -1.
 * 
 * Approach:
 * 1. Use dynamic programming with bottom-up approach
 * 2. For each amount from 0 to target, calculate minimum coins needed
 * 3. For each coin denomination, try using it if it doesn't exceed current amount
 * 
 * Time Complexity: O(amount * coins.length)
 * Space Complexity: O(amount)
 * 
 * Example Walkthrough for coins=[1,2,5], amount=11:
 * - Initialize dp[0]=0 (need 0 coins for amount 0)
 * - Initialize dp[1...11]=Infinity (unknown minimum yet)
 * - For amount=1:
 *   - Try coin=1: dp[1] = min(Infinity, dp[0]+1) = 1
 *   - Other coins are too large
 * - For amount=2:
 *   - Try coin=1: dp[2] = min(Infinity, dp[1]+1) = 2
 *   - Try coin=2: dp[2] = min(2, dp[0]+1) = 1
 * - For amount=3:
 *   - Try coin=1: dp[3] = min(Infinity, dp[2]+1) = 2
 *   - Try coin=2: dp[3] = min(2, dp[1]+1) = 2
 * - ... and so on
 * - For amount=11:
 *   - Try all coins: dp[11] = 3 (using coins 5+5+1)
 */
export function coinChange(coins: number[], amount: number): number {
    // dp[i] represents the minimum coins needed to make amount i
    const dp: number[] = Array(amount + 1).fill(Infinity);
    // Fill with Infinity to represent "not possible yet"

    dp[0] = 0;                               // Base case: 0 coins needed to make amount 0
    // This is our starting point for building solutions

    // Process each amount from 1 to the target amount
    for (let i = 1; i <= amount; i++) {
        // Try each coin denomination
        for (const coin of coins) {
            if (coin <= i) {                 // Only use the coin if it doesn't exceed current amount
                // Either keep current minimum or use this coin + minimum for remaining amount
                dp[i] = Math.min(dp[i], dp[i - coin] + 1);
                // The +1 represents using one of this coin
            }
        }
    }

    // If dp[amount] is still Infinity, it means we couldn't make the amount with given coins
    return dp[amount] === Infinity ? -1 : dp[amount];
    // Return -1 if impossible, otherwise the minimum count
}

/**
 * Problem #300: Longest Increasing Subsequence (Medium)
 * 
 * Given an integer array nums, return the length of the longest strictly increasing subsequence.
 * A subsequence is a sequence that can be derived from an array by deleting some or no elements
 * without changing the order of the remaining elements.
 * 
 * Approach:
 * 1. Use dynamic programming with dp[i] representing LIS ending at index i
 * 2. For each element, check all previous elements to find valid extensions
 * 3. Track the maximum LIS length throughout the array
 * 
 * Time Complexity: O(n²) where n is the length of the array
 * Space Complexity: O(n) for the dp array
 * 
 * Example:
 * Input: nums = [10,9,2,5,3,7,101,18]
 * Output: 4
 * Explanation: The longest increasing subsequence is [2,3,7,101], length 4.
 */
export function lengthOfLIS(nums: number[]): number {
    if (nums.length === 0) return 0;         // Handle empty array case

    const n = nums.length;
    const dp: number[] = Array(n).fill(1);   // Initialize dp array with 1 (min LIS length is 1)
    let maxLength = 1;                       // Track the maximum LIS found

    for (let i = 1; i < n; i++) {            // Start from second element
        for (let j = 0; j < i; j++) {        // Check all previous elements
            if (nums[i] > nums[j]) {         // If current element can extend the subsequence
                dp[i] = Math.max(dp[i], dp[j] + 1);  // Update LIS at position i
            }
        }
        maxLength = Math.max(maxLength, dp[i]);  // Update the global maximum
    }

    return maxLength;                        // Return the maximum LIS length found
}

/**
 * 0/1 Knapsack Problem
 * @param weights - Array of item weights
 * @param values - Array of item values
 * @param capacity - Knapsack capacity
 * @returns Maximum value that can be obtained
 */
export function knapsack(weights: number[], values: number[], capacity: number): number {
    const n = weights.length;
    // dp[i][w] = maximum value using first i items with weight limit w
    const dp: number[][] = Array(n + 1).fill(null).map(() => Array(capacity + 1).fill(0));

    for (let i = 1; i <= n; i++) {
        for (let w = 0; w <= capacity; w++) {
            // Don't take current item
            dp[i][w] = dp[i - 1][w];

            // Take current item if it fits
            if (weights[i - 1] <= w) {
                dp[i][w] = Math.max(dp[i][w], dp[i - 1][w - weights[i - 1]] + values[i - 1]);
            }
        }
    }

    return dp[n][capacity];
}

/**
 * Edit Distance (Levenshtein Distance)
 * @param word1 - First string
 * @param word2 - Second string
 * @returns Minimum operations to convert word1 to word2
 */
export function minDistance(word1: string, word2: string): number {
    const m = word1.length;
    const n = word2.length;

    // dp[i][j] = min operations to convert word1[0..i-1] to word2[0..j-1]
    const dp: number[][] = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));

    // Initialize base cases
    for (let i = 0; i <= m; i++) dp[i][0] = i; // Delete all characters
    for (let j = 0; j <= n; j++) dp[0][j] = j; // Insert all characters

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (word1[i - 1] === word2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1]; // No operation needed
            } else {
                dp[i][j] = Math.min(
                    dp[i - 1][j] + 1,     // Delete
                    dp[i][j - 1] + 1,     // Insert
                    dp[i - 1][j - 1] + 1  // Replace
                );
            }
        }
    }

    return dp[m][n];
}

/**
 * Unique Paths - Count paths in grid from top-left to bottom-right
 * @param m - Number of rows
 * @param n - Number of columns
 * @returns Number of unique paths
 */
export function uniquePaths(m: number, n: number): number {
    // dp[i][j] = number of paths to reach cell (i, j)
    const dp: number[][] = Array(m).fill(null).map(() => Array(n).fill(1));

    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
        }
    }

    return dp[m - 1][n - 1];
}

/**
 * Maximum Subarray (Kadane's Algorithm)
 * @param nums - Array of integers
 * @returns Maximum sum of contiguous subarray
 */
export function maxSubArray(nums: number[]): number {
    let maxSum = nums[0];
    let currentSum = nums[0];

    for (let i = 1; i < nums.length; i++) {
        // Either extend current subarray or start new one
        currentSum = Math.max(nums[i], currentSum + nums[i]);
        maxSum = Math.max(maxSum, currentSum);
    }

    return maxSum;
}

/**
 * Longest Common Subsequence
 * @param text1 - First string
 * @param text2 - Second string
 * @returns Length of longest common subsequence
 */
export function longestCommonSubsequence(text1: string, text2: string): number {
    const m = text1.length;
    const n = text2.length;

    // dp[i][j] = LCS length for text1[0..i-1] and text2[0..j-1]
    const dp: number[][] = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (text1[i - 1] === text2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }

    return dp[m][n];
}

/**
 * Partition Equal Subset Sum
 * @param nums - Array of positive integers
 * @returns True if array can be partitioned into two equal sum subsets
 */
export function canPartition(nums: number[]): boolean {
    const totalSum = nums.reduce((sum, num) => sum + num, 0);

    // If total sum is odd, can't partition equally
    if (totalSum % 2 !== 0) return false;

    const target = totalSum / 2;
    const n = nums.length;

    // dp[i][j] = can achieve sum j using first i numbers
    const dp: boolean[][] = Array(n + 1).fill(null).map(() => Array(target + 1).fill(false));

    // Base case: sum 0 is always achievable with empty subset
    for (let i = 0; i <= n; i++) {
        dp[i][0] = true;
    }

    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= target; j++) {
            // Don't include current number
            dp[i][j] = dp[i - 1][j];

            // Include current number if it doesn't exceed target
            if (nums[i - 1] <= j) {
                dp[i][j] = dp[i][j] || dp[i - 1][j - nums[i - 1]];
            }
        }
    }

    return dp[n][target];
}

/**
 * Partition Equal Subset Sum - Space Optimized Version
 * @param nums - Array of positive integers
 * @returns True if array can be partitioned into two equal sum subsets
 */
export function canPartitionOptimized(nums: number[]): boolean {
    const totalSum = nums.reduce((sum, num) => sum + num, 0);

    if (totalSum % 2 !== 0) return false;

    const target = totalSum / 2;
    const dp: boolean[] = Array(target + 1).fill(false);
    dp[0] = true;

    for (const num of nums) {
        // Traverse backwards to avoid using updated values
        for (let j = target; j >= num; j--) {
            dp[j] = dp[j] || dp[j - num];
        }
    }

    return dp[target];
}
