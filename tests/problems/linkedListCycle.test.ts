import { ListNode, hasCycle } from '@/problems/linkedListCycle';

describe('Linked List Cycle Detection', () => {
    // Helper function to create a linked list from array
    function createLinkedList(values: number[]): ListNode | null {
        if (values.length === 0) return null;
        
        const head = new ListNode(values[0]);
        let current = head;
        
        for (let i = 1; i < values.length; i++) {
            current.next = new ListNode(values[i]);
            current = current.next;
        }
        
        return head;
    }
    
    // Helper function to create a linked list with cycle
    function createLinkedListWithCycle(values: number[], cycleStart: number): ListNode | null {
        if (values.length === 0 || cycleStart >= values.length) return null;
        
        const nodes: ListNode[] = [];
        
        // Create all nodes
        for (let i = 0; i < values.length; i++) {
            nodes.push(new ListNode(values[i]));
        }
        
        // Link nodes together
        for (let i = 0; i < values.length - 1; i++) {
            nodes[i].next = nodes[i + 1];
        }
        
        // Create cycle by pointing last node to cycleStart node
        nodes[values.length - 1].next = nodes[cycleStart];
        
        return nodes[0];
    }

    describe('No Cycle Cases', () => {
        it('should return false for empty list', () => {
            expect(hasCycle(null)).toBe(false);
        });

        it('should return false for single node without cycle', () => {
            const head = new ListNode(1);
            expect(hasCycle(head)).toBe(false);
        });

        it('should return false for two nodes without cycle', () => {
            const head = createLinkedList([1, 2]);
            expect(hasCycle(head)).toBe(false);
        });

        it('should return false for multiple nodes without cycle', () => {
            const head = createLinkedList([1, 2, 3, 4, 5]);
            expect(hasCycle(head)).toBe(false);
        });

        it('should return false for long list without cycle', () => {
            const values = Array.from({ length: 100 }, (_, i) => i + 1);
            const head = createLinkedList(values);
            expect(hasCycle(head)).toBe(false);
        });
    });

    describe('Cycle Cases', () => {
        it('should return true for single node pointing to itself', () => {
            const head = new ListNode(1);
            head.next = head; // Points to itself
            expect(hasCycle(head)).toBe(true);
        });

        it('should return true for two nodes forming a cycle', () => {
            const node1 = new ListNode(1);
            const node2 = new ListNode(2);
            node1.next = node2;
            node2.next = node1; // Creates cycle
            expect(hasCycle(node1)).toBe(true);
        });

        it('should return true for cycle at the beginning', () => {
            // List: 1 -> 2 -> 3 -> 1 (cycle back to head)
            const head = createLinkedListWithCycle([1, 2, 3], 0);
            expect(hasCycle(head)).toBe(true);
        });

        it('should return true for cycle in the middle', () => {
            // List: 1 -> 2 -> 3 -> 4 -> 2 (cycle back to second node)
            const head = createLinkedListWithCycle([1, 2, 3, 4], 1);
            expect(hasCycle(head)).toBe(true);
        });

        it('should return true for cycle at the end', () => {
            // List: 1 -> 2 -> 3 -> 4 -> 3 (cycle back to third node)
            const head = createLinkedListWithCycle([1, 2, 3, 4], 2);
            expect(hasCycle(head)).toBe(true);
        });

        it('should return true for large cycle', () => {
            // Create a list with 50 nodes and cycle back to node 10
            const values = Array.from({ length: 50 }, (_, i) => i + 1);
            const head = createLinkedListWithCycle(values, 10);
            expect(hasCycle(head)).toBe(true);
        });
    });

    describe('LeetCode Examples', () => {
        it('should handle LeetCode Example 1: [3,2,0,-4] with cycle at pos 1', () => {
            // Create: 3 -> 2 -> 0 -> -4 -> 2 (cycle)
            const head = createLinkedListWithCycle([3, 2, 0, -4], 1);
            expect(hasCycle(head)).toBe(true);
        });

        it('should handle LeetCode Example 2: [1,2] with cycle at pos 0', () => {
            // Create: 1 -> 2 -> 1 (cycle)
            const head = createLinkedListWithCycle([1, 2], 0);
            expect(hasCycle(head)).toBe(true);
        });

        it('should handle LeetCode Example 3: [1] with no cycle', () => {
            const head = createLinkedList([1]);
            expect(hasCycle(head)).toBe(false);
        });
    });

    describe('Edge Cases and Special Scenarios', () => {
        it('should handle cycle with duplicate values', () => {
            // List: 1 -> 1 -> 1 -> 1 (cycle back to first)
            const head = createLinkedListWithCycle([1, 1, 1], 0);
            expect(hasCycle(head)).toBe(true);
        });

        it('should handle cycle with negative values', () => {
            // List: -1 -> -2 -> -3 -> -1 (cycle)
            const head = createLinkedListWithCycle([-1, -2, -3], 0);
            expect(hasCycle(head)).toBe(true);
        });

        it('should handle cycle with zero values', () => {
            // List: 0 -> 0 -> 1 -> 0 (cycle to first)
            const head = createLinkedListWithCycle([0, 0, 1], 0);
            expect(hasCycle(head)).toBe(true);
        });

        it('should handle very long cycle', () => {
            // Create a list with 1000 nodes where last points to first
            const values = Array.from({ length: 1000 }, (_, i) => i);
            const head = createLinkedListWithCycle(values, 0);
            expect(hasCycle(head)).toBe(true);
        });

        it('should handle very long list without cycle', () => {
            // Create a list with 1000 nodes without cycle
            const values = Array.from({ length: 1000 }, (_, i) => i);
            const head = createLinkedList(values);
            expect(hasCycle(head)).toBe(false);
        });
    });

    describe('ListNode Class Tests', () => {
        it('should create ListNode with default values', () => {
            const node = new ListNode();
            expect(node.val).toBe(0);
            expect(node.next).toBe(null);
        });

        it('should create ListNode with specified value', () => {
            const node = new ListNode(42);
            expect(node.val).toBe(42);
            expect(node.next).toBe(null);
        });

        it('should create ListNode with value and next pointer', () => {
            const nextNode = new ListNode(2);
            const node = new ListNode(1, nextNode);
            expect(node.val).toBe(1);
            expect(node.next).toBe(nextNode);
        });

        it('should handle negative values in ListNode', () => {
            const node = new ListNode(-5);
            expect(node.val).toBe(-5);
            expect(node.next).toBe(null);
        });

        it('should handle zero value in ListNode', () => {
            const node = new ListNode(0);
            expect(node.val).toBe(0);
            expect(node.next).toBe(null);
        });
    });
});