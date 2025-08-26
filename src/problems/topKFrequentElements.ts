/**
 * Solution for "Top K Frequent Elements" - LeetCode #347
 * 
 * Problem: Given an integer array nums and an integer k, return the k most frequent elements.
 * You may return the answer in any order.
 * 
 * Approach: HashMap + Bucket Sort
 * - Count frequencies using a map
 * - Use bucket sort for O(n) time complexity
 * - Each bucket contains numbers with the same frequency
 * 
 * Time Complexity: O(n) where n is the length of nums
 * Space Complexity: O(n) for the frequency map and buckets
 * 
 * Example:
 * Input: nums = [1,1,1,2,2,3], k = 2
 * Output: [1,2]
 * Explanation: The elements 1 and 2 appear most frequently with frequencies 3 and 2 respectively.
 */

export function topKFrequent(nums: number[], k: number): number[] {
    // Edge case: if k equals array length, return all elements
    if (k === nums.length) return nums;

    // Count frequencies of each element
    const frequencyMap = new Map<number, number>();
    for (const num of nums) {
        frequencyMap.set(num, (frequencyMap.get(num) || 0) + 1);
    }

    // Create buckets where bucket[i] contains elements that appear i times
    const buckets: number[][] = Array(nums.length + 1).fill(null).map(() => []);

    // Place elements in their frequency buckets
    for (const [num, freq] of frequencyMap) {
        buckets[freq].push(num);
    }

    // Extract top k elements from highest frequency buckets
    const result: number[] = [];

    // Start from highest frequency and work downward
    for (let i = buckets.length - 1; i >= 0 && result.length < k; i--) {
        if (buckets[i].length > 0) {
            result.push(...buckets[i]);
            // Ensure we only take k elements total
            if (result.length > k) {
                result.splice(k);
            }
        }
    }

    return result;
}

/**
 * Alternative solution using sort (less optimal)
 * 
 * Time Complexity: O(n log n) due to sorting
 * Space Complexity: O(n)
 */
export function topKFrequentUsingSort(nums: number[], k: number): number[] {
    // Count frequencies
    const frequencyMap = new Map<number, number>();
    for (const num of nums) {
        frequencyMap.set(num, (frequencyMap.get(num) || 0) + 1);
    }

    // Create array of unique numbers
    const unique = Array.from(frequencyMap.keys());

    // Sort by frequency (descending)
    unique.sort((a, b) => frequencyMap.get(b)! - frequencyMap.get(a)!);

    // Return top k elements
    return unique.slice(0, k);
}

