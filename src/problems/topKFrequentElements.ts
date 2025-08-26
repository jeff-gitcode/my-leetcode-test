/**
 * Solution for "Top K Frequent Elements" - LeetCode #347
 * 
 * Problem: Given an integer array nums and an integer k, return the k most frequent elements.
 * You may return the answer in any order.
 * 
 * Approach: HashMap + Heap (Min Heap)
 * - Count frequencies using a map
 * - Use a min heap of size k to keep track of top k elements
 * - For each element, add to heap and remove minimum if heap size exceeds k
 * 
 * Time Complexity: O(n log k) where n is the length of nums
 * Space Complexity: O(n) for the frequency map
 * 
 * Example:
 * Input: nums = [1,1,1,2,2,3], k = 2
 * Output: [1,2]
 * Explanation: The elements 1 and 2 appear most frequently with frequencies 3 and 2 respectively.
 */

export function topKFrequent(nums: number[], k: number): number[] {
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

    /* 
    // Alternative approach using min heap (though JavaScript doesn't have built-in heap)
    // For languages with heap support:
    const heap = new MinHeap();
    for (const [num, freq] of frequencyMap.entries()) {
        heap.push([num, freq]);
        if (heap.size() > k) {
            heap.pop();
        }
    }
    return heap.values().map(pair => pair[0]);
    */
}

