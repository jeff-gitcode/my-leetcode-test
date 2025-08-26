import {
    ListNode,
    reverseList,
    reverseBetween,
    swapPairs,
    arrayToList,
    listToArray
} from '../../src/problems/linkedListReversal';

describe('Linked List Reversal Problems', () => {

    describe('Problem 206: Reverse Linked List', () => {
        test('should reverse an empty list', () => {
            expect(reverseList(null)).toBeNull();
        });

        test('should reverse a single node list', () => {
            const list = new ListNode(1);
            const result = reverseList(list);
            expect(result?.val).toBe(1);
            expect(result?.next).toBeNull();
        });

        test('should reverse a multi-node list', () => {
            const list = arrayToList([1, 2, 3, 4, 5]);
            const result = reverseList(list);
            expect(listToArray(result)).toEqual([5, 4, 3, 2, 1]);
        });
    });

    describe('Problem 92: Reverse Linked List II', () => {
        test('should handle an empty list', () => {
            expect(reverseBetween(null, 1, 2)).toBeNull();
        });

        test('should not change list when left equals right', () => {
            const list = arrayToList([1, 2, 3, 4, 5]);
            const result = reverseBetween(list, 2, 2);
            expect(listToArray(result)).toEqual([1, 2, 3, 4, 5]);
        });

        test('should reverse nodes from position left to right', () => {
            const list = arrayToList([1, 2, 3, 4, 5]);
            const result = reverseBetween(list, 2, 4);
            expect(listToArray(result)).toEqual([1, 4, 3, 2, 5]);
        });

        test('should reverse entire list when left=1 and right=length', () => {
            const list = arrayToList([1, 2, 3, 4, 5]);
            const result = reverseBetween(list, 1, 5);
            expect(listToArray(result)).toEqual([5, 4, 3, 2, 1]);
        });

        test('should handle reversing at the beginning', () => {
            const list = arrayToList([1, 2, 3, 4, 5]);
            const result = reverseBetween(list, 1, 3);
            expect(listToArray(result)).toEqual([3, 2, 1, 4, 5]);
        });

        test('should handle reversing at the end', () => {
            const list = arrayToList([1, 2, 3, 4, 5]);
            const result = reverseBetween(list, 3, 5);
            expect(listToArray(result)).toEqual([1, 2, 5, 4, 3]);
        });
    });

    describe('Problem 24: Swap Nodes in Pairs', () => {
        test('should handle empty list', () => {
            expect(swapPairs(null)).toBeNull();
        });

        test('should handle single node list', () => {
            const list = new ListNode(1);
            const result = swapPairs(list);
            expect(listToArray(result)).toEqual([1]);
        });

        test('should swap adjacent nodes in even length list', () => {
            const list = arrayToList([1, 2, 3, 4]);
            const result = swapPairs(list);
            expect(listToArray(result)).toEqual([2, 1, 4, 3]);
        });

        test('should swap adjacent nodes in odd length list', () => {
            const list = arrayToList([1, 2, 3, 4, 5]);
            const result = swapPairs(list);
            expect(listToArray(result)).toEqual([2, 1, 4, 3, 5]);
        });
    });
});
