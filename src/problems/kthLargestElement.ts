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
 * Approach: Min Heap or Quickselect (here: Min Heap)
 * 
 * Time Complexity: O(n log k)
 * Space Complexity: O(k)
 */
export function findKthLargest(nums: number[], k: number): number {
    const heap: number[] = [];
    for (const num of nums) {
        heap.push(num);
        heap.sort((a, b) => a - b);
        if (heap.length > k) heap.shift();
    }
    return heap[0];
}

/**
 * Solution for "Top K Frequent Elements" - LeetCode #347
 * 
 * Problem: Given an array of integers, return the k most frequent elements.
 * 
 * Approach: HashMap + Min Heap
 * 
 * Time Complexity: O(n log k)
 * Space Complexity: O(n)
 */
export function topKFrequent(nums: number[], k: number): number[] {
    const freq = new Map<number, number>();
    for (const num of nums) {
        freq.set(num, (freq.get(num) || 0) + 1);
    }
    const heap: [number, number][] = [];
    for (const [num, count] of freq.entries()) {
        heap.push([count, num]);
        heap.sort((a, b) => a[0] - b[0]);
        if (heap.length > k) heap.shift();
    }
    return heap.map(item => item[1]);
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
