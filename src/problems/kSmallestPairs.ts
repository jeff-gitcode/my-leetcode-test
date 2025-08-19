/**
 * Solution for "Find K Pairs with Smallest Sums" - LeetCode #373
 * 
 * Problem: Given two sorted arrays nums1 and nums2, find the k pairs (u, v) with the smallest sums.
 * 
 * Approach: Min-Heap + Visited Set
 * - Use a min-heap to always extract the next smallest sum pair.
 * - Push initial pairs (nums1[i], nums2[0]) for i in [0, min(k, nums1.length)).
 * - For each extracted pair, push the next pair in nums2 if not visited.
 * 
 * Time Complexity: O(k log k)
 * Space Complexity: O(k)
 */

class MinHeap373 {
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
    const result: number[][] = [];
    if (nums1.length === 0 || nums2.length === 0 || k === 0) return result;

    const minHeap = new MinHeap373();
    const visited = new Set<string>();

    // Push initial pairs (nums1[i], nums2[0])
    for (let i = 0; i < Math.min(k, nums1.length); i++) {
        minHeap.push([nums1[i] + nums2[0], i, 0]);
        visited.add(`${i},0`);
    }

    while (minHeap.size() > 0 && result.length < k) {
        const [, i, j] = minHeap.pop();
        result.push([nums1[i], nums2[j]]);

        // Push next pair in nums2
        if (j + 1 < nums2.length && !visited.has(`${i},${j + 1}`)) {
            minHeap.push([nums1[i] + nums2[j + 1], i, j + 1]);
            visited.add(`${i},${j + 1}`);
        }
    }

    return result;
}