/**
 * Solution for the "Find K Pairs with Smallest Sums" problem
 * 
 * Problem: Given two integer arrays nums1 and nums2 sorted in ascending order and an integer k,
 * return the k pairs with the smallest sums.
 * 
 * Approach: Min Heap
 * - Use min heap to always get the pair with smallest sum
 * - Start with pairs formed by nums1[i] and nums2[0]
 * - For each popped pair, add the next pair if exists
 * 
 * Time Complexity: O(k log k)
 * Space Complexity: O(k)
 */

class MinHeap {
    private heap: [number, number, number][] = []; // [sum, i, j]

    size(): number {
        return this.heap.length;
    }

    push(item: [number, number, number]): void {
        this.heap.push(item);
        this.heapifyUp(this.heap.length - 1);
    }

    pop(): [number, number, number] {
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

export function kSmallestPairs(nums1: number[], nums2: number[], k: number): number[][] {
    if (nums1.length === 0 || nums2.length === 0 || k === 0) return [];

    const minHeap = new MinHeap();
    const visited = new Set<string>();
    const result: number[][] = [];

    // Start with the first pair
    minHeap.push([nums1[0] + nums2[0], 0, 0]);
    visited.add(`0,0`);

    while (result.length < k && minHeap.size() > 0) {
        const [, i, j] = minHeap.pop();
        result.push([nums1[i], nums2[j]]);

        // Add next pairs
        if (i + 1 < nums1.length && !visited.has(`${i + 1},${j}`)) {
            minHeap.push([nums1[i + 1] + nums2[j], i + 1, j]);
            visited.add(`${i + 1},${j}`);
        }

        if (j + 1 < nums2.length && !visited.has(`${i},${j + 1}`)) {
            minHeap.push([nums1[i] + nums2[j + 1], i, j + 1]);
            visited.add(`${i},${j + 1}`);
        }
    }

    return result;
}
