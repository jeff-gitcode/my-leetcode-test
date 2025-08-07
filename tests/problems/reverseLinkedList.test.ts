import { ListNode, reverseList } from '../../src/problems/reverseLinkedList';

function arrayToList(arr: number[]): ListNode | null {
    if (arr.length === 0) return null;
    const head = new ListNode(arr[0]);
    let current = head;
    for (let i = 1; i < arr.length; i++) {
        current.next = new ListNode(arr[i]);
        current = current.next;
    }
    return head;
}

function listToArray(head: ListNode | null): number[] {
    const result: number[] = [];
    let current = head;
    while (current) {
        result.push(current.val);
        current = current.next;
    }
    return result;
}

describe('reverseList', () => {
    it('should return null for an empty list', () => {
        expect(reverseList(null)).toBeNull();
    });

    it('should return the same node for a single-element list', () => {
        const head = new ListNode(42);
        const reversed = reverseList(head);
        expect(reversed).not.toBeNull();
        expect(reversed!.val).toBe(42);
        expect(reversed!.next).toBeNull();
    });

    it('should reverse a two-element list', () => {
        const head = arrayToList([1, 2]);
        const reversed = reverseList(head);
        expect(listToArray(reversed)).toEqual([2, 1]);
    });

    it('should reverse a multi-element list', () => {
        const head = arrayToList([1, 2, 3, 4, 5]);
        const reversed = reverseList(head);
        expect(listToArray(reversed)).toEqual([5, 4, 3, 2, 1]);
    });

    it('should handle negative values', () => {
        const head = arrayToList([-1, -2, -3]);
        const reversed = reverseList(head);
        expect(listToArray(reversed)).toEqual([-3, -2, -1]);
    });

    it('should not mutate the original nodes (structure is reversed, not values)', () => {
        const head = arrayToList([1, 2, 3]);
        const originalNodes = [];
        let curr = head;
        while (curr) {
            originalNodes.push(curr);
            curr = curr.next;
        }
        const reversed = reverseList(head);
        const reversedNodes = [];
        let currRev = reversed;
        while (currRev) {
            reversedNodes.push(currRev);
            currRev = currRev.next;
        }
        expect(reversedNodes.reverse()).toEqual(originalNodes);
    });
});