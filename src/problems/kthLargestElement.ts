/**
 * Solution for the "Kth Largest Element in an Array" problem
 * 
 * Problem: Given an integer array nums and an integer k, return the kth largest element in the array.
 * 
 * Approach: Min Heap (Priority Queue)
 * - Maintain a min heap of size k
 * - The root of the heap will be the kth largest element
 * 
 * Time Complexity: O(n log k)
 * Space Complexity: O(k)
 */

class MinHeap {
    private heap: number[] = [];

    size(): number {
        return this.heap.length;
    }

    peek(): number {
        return this.heap[0];
    }

    push(val: number): void {
        this.heap.push(val);
        this.heapifyUp(this.heap.length - 1);
    }

    pop(): number {
        if (this.heap.length === 1) return this.heap.pop()!;

        const result = this.heap[0];
        this.heap[0] = this.heap.pop()!;
        this.heapifyDown(0);
        return result;
    }

    private heapifyUp(index: number): void {
        const parent = Math.floor((index - 1) / 2);
        if (parent >= 0 && this.heap[parent] > this.heap[index]) {
            [this.heap[parent], this.heap[index]] = [this.heap[index], this.heap[parent]];
            this.heapifyUp(parent);
        }
    }

    private heapifyDown(index: number): void {
        const left = 2 * index + 1;
        const right = 2 * index + 2;
        let smallest = index;

        if (left < this.heap.length && this.heap[left] < this.heap[smallest]) {
            smallest = left;
        }

        if (right < this.heap.length && this.heap[right] < this.heap[smallest]) {
            smallest = right;
        }

        if (smallest !== index) {
            [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
            this.heapifyDown(smallest);
        }
    }
}

/**
 * Solution for "Kth Largest Element in an Array" - LeetCode #215
 * 
 * Problem: Find the kth largest element in an unsorted array.
 * 
 * Approach: Min Heap
 * - Maintain a min heap of size k.
 * - Iterate through the array, keeping only the k largest elements in the heap.
 * - The root of the heap is the kth largest element.
 * 
 * Time Complexity: O(n log k)
 * Space Complexity: O(k)
 * 
 * Example:
 * Input: nums = [3,2,1,5,6,4], k = 2
 * Output: 5
 * Explanation: The 2nd largest element is 5.
 */
export function findKthLargest(nums: number[], k: number): number {
    const heap: number[] = [];                        // Min-heap to store k largest elements

    for (const num of nums) {                         // Iterate through all numbers
        heap.push(num);                               // Add current number to heap
        heap.sort((a, b) => a - b);                   // Sort heap to maintain min-heap property
        if (heap.length > k) heap.shift();            // Remove smallest if heap size exceeds k
    }

    return heap[0];                                   // The root of the heap is the kth largest
}

/**
 * Problem #347: Top K Frequent Elements (Medium)
 * 
 * Given an array of integers, return the k most frequent elements.
 * 
 * Approach:
 * 1. Count the frequency of each element using a map.
 * 2. Use bucket sort: create buckets for each frequency.
 * 3. Collect elements from highest frequency buckets until k elements are found.
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 * 
 * Example:
 * Input: nums = [1,1,1,2,2,3], k = 2
 * Output: [1,2]
 * Explanation: 1 appears 3 times, 2 appears 2 times.
 */
export function topKFrequent(nums: number[], k: number): number[] {
    const frequencyMap = new Map<number, number>();   // Map to count frequencies
    for (const num of nums) {                         // Count each number's frequency
        frequencyMap.set(num, (frequencyMap.get(num) || 0) + 1);
    }

    const buckets: number[][] = Array(nums.length + 1).fill(null).map(() => []); // Buckets for each frequency

    for (const [num, freq] of frequencyMap) {         // Place numbers in their frequency bucket
        buckets[freq].push(num);
    }

    const result: number[] = [];                      // Store top k frequent elements
    for (let i = buckets.length - 1; i >= 0 && result.length < k; i--) { // Start from highest frequency
        if (buckets[i].length > 0) {
            result.push(...buckets[i]);               // Add all numbers with current frequency
            if (result.length > k) result.splice(k);  // Only keep k elements
        }
    }

    return result;                                    // Return top k frequent elements
}

/**
 * Solution for "Kth Largest Element in a Stream" - LeetCode #703
 * 
 * Problem: Design a class to find the kth largest element in a stream.
 * 
 * Approach: Min Heap
 * 
 * Time Complexity: O(log k) per add
 * Space Complexity: O(k)
 */
export class KthLargest {
    private heap: number[];
    private k: number;

    constructor(k: number, nums: number[]) {
        this.k = k;
        this.heap = [];
        for (const num of nums) {
            this.add(num);
        }
    }

    add(val: number): number {
        this.heap.push(val);
        this.heap.sort((a, b) => a - b);
        if (this.heap.length > this.k) this.heap.shift();
        return this.heap[0];
    }
}

/**
 * Problem #373: Find K Pairs with Smallest Sums (Medium)
 * 
 * Given two sorted arrays nums1 and nums2, find the k pairs (u, v) with the smallest sums.
 * Approach:
 * 1. Use a min-heap to always extract the next smallest sum pair.
 * 2. Push initial pairs (nums1[i], nums2[0]) for i in [0, min(k, nums1.length)).
 * 3. For each extracted pair, push the next pair in nums2 if not visited.
 * 
 * Example:
 * Input: nums1 = [1,7,11], nums2 = [2,4,6], k = 3
 * Output: [[1,2],[1,4],[1,6]]
 * Explanation: The pairs with the smallest sums are [1,2], [1,4], [1,6].
 */

// MinHeap373 is a helper class for maintaining a min-heap of [sum, i, j] tuples
class MinHeap373 {
    private heap: [number, number, number][] = []; // Array to store heap elements as [sum, i, j]

    size(): number {
        return this.heap.length;                   // Return current heap size
    }

    push(item: [number, number, number]): void {
        this.heap.push(item);                      // Add new item to heap
        this.heapifyUp(this.heap.length - 1);      // Restore heap property upwards
    }

    pop(): [number, number, number] {
        if (this.heap.length === 1) return this.heap.pop()!; // If only one element, pop and return
        const result = this.heap[0];               // Store root element to return
        this.heap[0] = this.heap.pop()!;           // Move last element to root
        this.heapifyDown(0);                       // Restore heap property downwards
        return result;                             // Return the smallest sum pair
    }

    private heapifyUp(index: number): void {
        const parent = Math.floor((index - 1) / 2); // Find parent index
        if (parent >= 0 && this.heap[parent][0] > this.heap[index][0]) { // If parent is greater than child
            [this.heap[parent], this.heap[index]] = [this.heap[index], this.heap[parent]]; // Swap
            this.heapifyUp(parent);                 // Recursively heapify up
        }
    }

    private heapifyDown(index: number): void {
        const left = 2 * index + 1;                // Left child index
        const right = 2 * index + 2;               // Right child index
        let smallest = index;                      // Assume current index is smallest

        if (left < this.heap.length && this.heap[left][0] < this.heap[smallest][0]) {
            smallest = left;                       // Update smallest if left child is smaller
        }
        if (right < this.heap.length && this.heap[right][0] < this.heap[smallest][0]) {
            smallest = right;                      // Update smallest if right child is smaller
        }
        if (smallest !== index) {
            [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]]; // Swap
            this.heapifyDown(smallest);            // Recursively heapify down
        }
    }
}

export function kSmallestPairs(nums1: number[], nums2: number[], k: number): number[][] {
    const result: number[][] = [];                 // Store the k pairs with smallest sums
    if (nums1.length === 0 || nums2.length === 0 || k === 0) return result; // Edge case: empty input

    const minHeap = new MinHeap373();              // Create a min-heap for pairs
    const visited = new Set<string>();             // Track visited (i, j) pairs to avoid duplicates

    // Push initial pairs (nums1[i], nums2[0]) for i in [0, min(k, nums1.length))
    for (let i = 0; i < Math.min(k, nums1.length); i++) {
        minHeap.push([nums1[i] + nums2[0], i, 0]); // Push sum and indices to heap
        visited.add(`${i},0`);                     // Mark (i, 0) as visited
    }

    // Extract k pairs with smallest sums
    while (minHeap.size() > 0 && result.length < k) {
        const [, i, j] = minHeap.pop();            // Pop smallest sum pair from heap
        result.push([nums1[i], nums2[j]]);         // Add the pair to result

        // Push next pair in nums2 for the same i, if not visited
        if (j + 1 < nums2.length && !visited.has(`${i},${j + 1}`)) {
            minHeap.push([nums1[i] + nums2[j + 1], i, j + 1]); // Push new pair to heap
            visited.add(`${i},${j + 1}`);                      // Mark as visited
        }
    }

    return result;                                 // Return the k pairs with smallest sums
}

/*
Example usage:
kSmallestPairs([1,7,11], [2,4,6], 3) // [[1,2],[1,4],[1,6]]
*/