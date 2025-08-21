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
 * Solution for "Climbing Stairs" - LeetCode #70
 * 
 * Problem: Given n steps, each time you can climb 1 or 2 steps. How many distinct ways can you climb to the top?
 * 
 * Approach: Dynamic Programming
 * - dp[i] = dp[i-1] + dp[i-2]
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
export function climbStairs(n: number): number {
    if (n <= 2) return n;

    let prev2 = 1; // dp[i-2]
    let prev1 = 2; // dp[i-1]

    for (let i = 3; i <= n; i++) {
        const current = prev1 + prev2;
        prev2 = prev1;
        prev1 = current;
    }

    return prev1;
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
 * Coin Change - Minimum coins to make amount
 * @param coins - Array of coin denominations
 * @param amount - Target amount
 * @returns Minimum number of coins, -1 if impossible
 */
export function coinChange(coins: number[], amount: number): number {
    // dp[i] = minimum coins needed to make amount i
    const dp: number[] = Array(amount + 1).fill(Infinity);
    dp[0] = 0;

    for (let i = 1; i <= amount; i++) {
        for (const coin of coins) {
            if (coin <= i) {
                dp[i] = Math.min(dp[i], dp[i - coin] + 1);
            }
        }
    }

    return dp[amount] === Infinity ? -1 : dp[amount];
}

/**
 * Longest Increasing Subsequence
 * @param nums - Array of integers
 * @returns Length of longest strictly increasing subsequence
 */
export function lengthOfLIS(nums: number[]): number {
    if (nums.length === 0) return 0;

    // dp[i] = length of LIS ending at index i
    const dp: number[] = Array(nums.length).fill(1);

    for (let i = 1; i < nums.length; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[j] < nums[i]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
    }

    return Math.max(...dp);
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
