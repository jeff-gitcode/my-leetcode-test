/**
 * Solution for the "Top K Frequent Elements" problem
 * 
 * Problem: Given an integer array nums and an integer k, return the k most frequent elements.
 * 
 * Approach: Hash Map + Min Heap
 * - Count frequency of each element
 * - Use min heap to keep track of top k frequent elements
 * 
 * Time Complexity: O(n log k)
 * Space Complexity: O(n + k)
 */

class MinHeap {
    private heap: [number, number][] = []; // [frequency, value]

    size(): number {
        return this.heap.length;
    }

    peek(): [number, number] {
        return this.heap[0];
    }

    push(item: [number, number]): void {
        this.heap.push(item);
        this.heapifyUp(this.heap.length - 1);
    }

    pop(): [number, number] {
        if (this.heap.length === 1) return this.heap.pop()!;

        const result = this.heap[0];
        this.heap[0] = this.heap.pop()!;
        this.heapifyDown(0);
        return result;
    }

    private heapifyUp(index: number): void {
        const parent = Math.floor((index - 1) / 2);
        if (parent >= 0 && this.heap[parent][0] > this.heap[index][0]) {
            [this.heap[parent], this.heap[index]] = [this.heap[index], this.heap[parent]];
            this.heapifyUp(parent);
        }
    }

    private heapifyDown(index: number): void {
        const left = 2 * index + 1;
        const right = 2 * index + 2;
        let smallest = index;

        if (left < this.heap.length && this.heap[left][0] < this.heap[smallest][0]) {
            smallest = left;
        }

        if (right < this.heap.length && this.heap[right][0] < this.heap[smallest][0]) {
            smallest = right;
        }

        if (smallest !== index) {
            [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
            this.heapifyDown(smallest);
        }
    }
}

export function topKFrequent(nums: number[], k: number): number[] {
    // Count frequencies
    const freqMap = new Map<number, number>();
    for (const num of nums) {
        freqMap.set(num, (freqMap.get(num) || 0) + 1);
    }

    // Use min heap to keep top k frequent elements
    const minHeap = new MinHeap();

    for (const [num, freq] of freqMap) {
        minHeap.push([freq, num]);
        if (minHeap.size() > k) {
            minHeap.pop();
        }
    }

    // Extract results
    const result: number[] = [];
    while (minHeap.size() > 0) {
        result.unshift(minHeap.pop()[1]);
    }

    return result;
}

export function findKthLargest(nums: number[], k: number): number {
    const heap = new MinHeap();

    for (const num of nums) {
        heap.push([num, num]);
        if (heap.size() > k) {
            heap.pop();
        }
    }

    // The root of the heap is the kth largest element
    return heap.peek()[1];
}

