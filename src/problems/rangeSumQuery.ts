/**
 * NumArray class for the "Range Sum Query - Immutable" problem
 * 
 * Problem: Given an integer array nums, implement a NumArray class that supports
 * querying the sum of elements in a given range [left, right] (inclusive).
 * 
 * Approach: Use prefix sum technique for O(1) time complexity per query
 * - Store prefix sums during initialization
 * - For each query, return prefixSum[right] - prefixSum[left - 1]
 */
export class NumArray {
    private prefixSums: number[];

    /**
     * Initializes the object with the integer array nums.
     * @param nums - The input array
     */
    constructor(nums: number[]) {
        // Calculate prefix sums during initialization
        this.prefixSums = new Array(nums.length + 1);
        this.prefixSums[0] = 0;

        for (let i = 0; i < nums.length; i++) {
            this.prefixSums[i + 1] = this.prefixSums[i] + nums[i];
        }
    }

    /**
     * Returns the sum of the elements of nums between indices left and right inclusive.
     * @param left - The left index (0-indexed)
     * @param right - The right index (0-indexed)
     * @returns The sum of elements between indices left and right inclusive
     */
    sumRange(left: number, right: number): number {
        // Prefix sum allows O(1) time complexity for range sum queries
        return this.prefixSums[right + 1] - this.prefixSums[left];
    }
}