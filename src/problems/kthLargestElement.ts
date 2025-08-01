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

export function findKthLargest(nums: number[], k: number): number {
    const minHeap = new MinHeap();

    for (const num of nums) {
        minHeap.push(num);
        if (minHeap.size() > k) {
            minHeap.pop();
        }
    }

    return minHeap.peek();
}
