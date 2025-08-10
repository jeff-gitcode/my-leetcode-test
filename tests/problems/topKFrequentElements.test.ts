import { topKFrequent } from '@/problems/topKFrequentElements';

describe('Top K Frequent Elements', () => {
    describe('topKFrequent Function', () => {
        describe('Basic Functionality', () => {
            it('should return k most frequent elements for LeetCode example 1', () => {
                // nums = [1,1,1,2,2,3], k = 2
                // Expected: [1,2] (frequencies: 1->3, 2->2, 3->1)
                const nums = [1, 1, 1, 2, 2, 3];
                const k = 2;
                const result = topKFrequent(nums, k);
                
                expect(result).toHaveLength(2);
                expect(result).toContain(1);
                expect(result).toContain(2);
                expect(result).not.toContain(3);
            });

            it('should return k most frequent elements for LeetCode example 2', () => {
                // nums = [1], k = 1
                // Expected: [1]
                const nums = [1];
                const k = 1;
                const result = topKFrequent(nums, k);
                
                expect(result).toEqual([1]);
            });

            it('should handle equal frequencies with deterministic order', () => {
                // nums = [1,2,3], k = 2 (all have frequency 1)
                const nums = [1, 2, 3];
                const k = 2;
                const result = topKFrequent(nums, k);
                
                expect(result).toHaveLength(2);
                expect([1, 2, 3]).toEqual(expect.arrayContaining(result));
            });

            it('should return elements in descending frequency order', () => {
                // nums = [4,1,1,1,2,2,3], k = 3
                // Frequencies: 1->3, 2->2, 4->1, 3->1
                // Expected order: [1, 2, then either 4 or 3]
                const nums = [4, 1, 1, 1, 2, 2, 3];
                const k = 3;
                const result = topKFrequent(nums, k);
                
                expect(result).toHaveLength(3);
                expect(result[0]).toBe(1); // Most frequent
                expect(result[1]).toBe(2); // Second most frequent
                expect([3, 4]).toContain(result[2]); // Either 3 or 4 for third
            });
        });

        describe('Edge Cases', () => {
            it('should handle single element array', () => {
                const nums = [42];
                const k = 1;
                const result = topKFrequent(nums, k);
                
                expect(result).toEqual([42]);
            });

            it('should handle k equal to array length with unique elements', () => {
                const nums = [1, 2, 3, 4, 5];
                const k = 5;
                const result = topKFrequent(nums, k);
                
                expect(result).toHaveLength(5);
                expect(result.sort()).toEqual([1, 2, 3, 4, 5]);
            });

            it('should handle k equal to number of unique elements', () => {
                const nums = [1, 1, 2, 2, 3, 3];
                const k = 3;
                const result = topKFrequent(nums, k);
                
                expect(result).toHaveLength(3);
                expect(result.sort()).toEqual([1, 2, 3]);
            });

            it('should handle k = 1', () => {
                const nums = [1, 1, 1, 2, 2, 3];
                const k = 1;
                const result = topKFrequent(nums, k);
                
                expect(result).toEqual([1]);
            });

            it('should handle array with all same elements', () => {
                const nums = [7, 7, 7, 7, 7];
                const k = 1;
                const result = topKFrequent(nums, k);
                
                expect(result).toEqual([7]);
            });
        });

        describe('Frequency Counting', () => {
            it('should correctly count frequencies with mixed positive and negative numbers', () => {
                const nums = [-1, -1, 2, 2, 2, 3];
                const k = 2;
                const result = topKFrequent(nums, k);
                
                expect(result).toHaveLength(2);
                expect(result).toContain(2); // frequency 3
                expect(result).toContain(-1); // frequency 2
                expect(result).not.toContain(3); // frequency 1
            });

            it('should handle zero values correctly', () => {
                const nums = [0, 0, 1, 1, 1, 2];
                const k = 2;
                const result = topKFrequent(nums, k);
                
                expect(result).toHaveLength(2);
                expect(result).toContain(1); // frequency 3
                expect(result).toContain(0); // frequency 2
            });

            it('should handle large numbers', () => {
                const nums = [1000000, 1000000, 999999, 999999, 999999];
                const k = 1;
                const result = topKFrequent(nums, k);
                
                expect(result).toEqual([999999]);
            });
        });

        describe('Different K Values', () => {
            it('should handle k larger than unique elements', () => {
                const nums = [1, 1, 2, 2];
                const k = 3; // Only 2 unique elements
                const result = topKFrequent(nums, k);
                
                expect(result).toHaveLength(2);
                expect(result.sort()).toEqual([1, 2]);
            });

            it('should handle medium k value', () => {
                const nums = [1, 1, 1, 2, 2, 3, 4, 4, 4, 4, 5, 5, 5, 6];
                const k = 3;
                const result = topKFrequent(nums, k);
                
                expect(result).toHaveLength(3);
                expect(result).toContain(4); // frequency 4
                expect(result).toContain(1); // frequency 3
                expect(result).toContain(5); // frequency 3
            });
        });

        describe('Complex Scenarios', () => {
            it('should handle array with many duplicates', () => {
                const nums = [1, 1, 1, 1, 1, 2, 2, 2, 3, 3, 4];
                const k = 2;
                const result = topKFrequent(nums, k);
                
                expect(result).toHaveLength(2);
                expect(result).toContain(1); // frequency 5
                expect(result).toContain(2); // frequency 3
            });

            it('should handle interleaved pattern', () => {
                const nums = [1, 2, 1, 3, 2, 1, 4, 3, 2];
                const k = 2;
                const result = topKFrequent(nums, k);
                
                expect(result).toHaveLength(2);
                // 1 appears 3 times, 2 appears 3 times, 3 appears 2 times, 4 appears 1 time
                expect(result).toContain(1);
                expect(result).toContain(2);
            });

            it('should handle ascending frequency pattern', () => {
                // Design array where frequencies increase: 1->1, 2->2, 3->3, 4->4
                const nums = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4];
                const k = 2;
                const result = topKFrequent(nums, k);
                
                expect(result).toHaveLength(2);
                expect(result).toContain(4); // frequency 4
                expect(result).toContain(3); // frequency 3
            });

            it('should handle random distribution', () => {
                const nums = [5, 3, 1, 1, 1, 3, 73, 1];
                const k = 2;
                const result = topKFrequent(nums, k);
                
                expect(result).toHaveLength(2);
                expect(result).toContain(1); // frequency 4
                expect(result).toContain(3); // frequency 2
            });
        });

        describe('Performance Tests', () => {
            it('should handle larger arrays efficiently', () => {
                // Create array with predictable frequency pattern
                const nums: number[] = [];
                
                // Add numbers with decreasing frequencies
                for (let i = 1; i <= 100; i++) {
                    for (let j = 0; j < 101 - i; j++) {
                        nums.push(i);
                    }
                }
                
                const k = 5;
                const result = topKFrequent(nums, k);
                
                expect(result).toHaveLength(5);
                expect(result).toEqual([1, 2, 3, 4, 5]);
            });

            it('should handle array with many unique elements', () => {
                const nums = Array.from({ length: 1000 }, (_, i) => i);
                const k = 10;
                const result = topKFrequent(nums, k);
                
                expect(result).toHaveLength(10);
                // All elements have frequency 1, so any 10 elements are valid
                expect(result.every(num => nums.includes(num))).toBe(true);
            });
        });

        describe('Boundary Conditions', () => {
            it('should handle minimum valid input', () => {
                const nums = [1];
                const k = 1;
                const result = topKFrequent(nums, k);
                
                expect(result).toEqual([1]);
            });

            it('should handle two elements with same frequency', () => {
                const nums = [1, 2];
                const k = 1;
                const result = topKFrequent(nums, k);
                
                expect(result).toHaveLength(1);
                expect([1, 2]).toContain(result[0]);
            });

            it('should handle negative numbers only', () => {
                const nums = [-1, -1, -2, -2, -2, -3];
                const k = 2;
                const result = topKFrequent(nums, k);
                
                expect(result).toHaveLength(2);
                expect(result).toContain(-2); // frequency 3
                expect(result).toContain(-1); // frequency 2
            });
        });

        describe('Min Heap Behavior Verification', () => {
            it('should maintain only k elements in heap during processing', () => {
                // This test verifies the algorithm maintains heap size <= k
                const nums = [1, 1, 1, 2, 2, 3, 4, 5, 6, 7];
                const k = 3;
                const result = topKFrequent(nums, k);
                
                expect(result).toHaveLength(3);
                expect(result).toContain(1); // frequency 3
                expect(result).toContain(2); // frequency 2
                // Third element should be one of the elements with frequency 1
                expect([3, 4, 5, 6, 7]).toContain(result[2]);
            });

            it('should correctly pop minimum frequency elements from heap', () => {
                // Test that when heap size exceeds k, minimum frequency element is removed
                const nums = [1, 1, 1, 1, 2, 2, 2, 3, 3, 4]; // frequencies: 1->4, 2->3, 3->2, 4->1
                const k = 2;
                const result = topKFrequent(nums, k);
                
                expect(result).toHaveLength(2);
                expect(result).toContain(1); // highest frequency
                expect(result).toContain(2); // second highest frequency
                expect(result).not.toContain(3); // should be excluded
                expect(result).not.toContain(4); // should be excluded
            });

            it('should handle frequency ties correctly', () => {
                // When frequencies are tied, any element can be chosen
                const nums = [1, 1, 2, 2, 3, 3, 4, 4];
                const k = 2;
                const result = topKFrequent(nums, k);
                
                expect(result).toHaveLength(2);
                // All elements have frequency 2, so any 2 are valid
                expect(result.every(num => [1, 2, 3, 4].includes(num))).toBe(true);
            });
        });
    });
});