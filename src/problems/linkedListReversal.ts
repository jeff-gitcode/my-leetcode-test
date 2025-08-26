/**
 * Linked List Reversal implementations
 * 
 * Pattern: Reverse a linked list or a portion of it by changing the direction of pointers
 * Applications: Reverse entire list, reverse a sublist, swap nodes, reorder list
 * 
 * Example: A reversal of this list:
 *  1 -> 2 -> 3 -> 4 -> 5
 * 
 * Would result in:
 *  5 -> 4 -> 3 -> 2 -> 1
 * 
 * Key techniques:
 * - Maintain previous, current, and next pointers to reverse links
 * - Use dummy nodes for edge cases when reversing portions of a list
 * - Track section boundaries when reversing a sublist
 * - Careful pointer manipulation to avoid losing references
 */

/**
 * Definition for singly-linked list node.
 * This is the base node structure used in all three problems.
 */
export class ListNode {
    val: number;
    next: ListNode | null;

    constructor(val?: number, next?: ListNode | null) {
        this.val = val === undefined ? 0 : val; // Default value to 0 if undefined
        this.next = next === undefined ? null : next; // Default next to null if undefined
    }
}

/**
 * Problem 206: Reverse Linked List (Easy)
 * 
 * Given the head of a singly linked list, reverse the list, and return the reversed list.
 * 
 * Visualization of reversal:
 *   Initially:    null <- 1 -> 2 -> 3 -> 4 -> 5
 *                 prev  curr  next
 *   
 *   First step:   null <- 1    2 -> 3 -> 4 -> 5
 *                        prev  curr  next
 *   
 *   Final:        null <- 1 <- 2 <- 3 <- 4 <- 5
 *                                          prev curr=null
 * 
 * Example:
 * Input: head = [1,2,3,4,5]
 * Output: [5,4,3,2,1]
 * 
 * Time Complexity: O(n) where n is the number of nodes in the linked list
 * Space Complexity: O(1) as we only use a constant amount of extra space
 */
export function reverseList(head: ListNode | null): ListNode | null {
    let prev: ListNode | null = null;                // Initialize prev pointer to null (will become the new tail's next)
    let curr: ListNode | null = head;                // Initialize current pointer to the head of the list

    while (curr !== null) {                          // Iterate through the list until we reach the end
        const next: ListNode | null = curr.next;     // Store next node before changing curr.next pointer
        curr.next = prev;                            // Reverse the pointer: curr now points to prev
        prev = curr;                                 // Move prev to current node for next iteration
        curr = next;                                 // Move current to the next node we saved earlier
    }

    return prev;                                     // Return prev (new head of reversed list)
}

/**
 * Problem 92: Reverse Linked List II (Medium)
 * 
 * Given the head of a singly linked list and two integers left and right where left <= right,
 * reverse the nodes of the list from position left to position right, and return the reversed list.
 * 
 * Visualization for [1,2,3,4,5] with left=2, right=4:
 *   Initially:     1 -> 2 -> 3 -> 4 -> 5
 *                 pL    s    
 *   
 *   After reversal: 1 -> 4 -> 3 -> 2 -> 5
 *                  pL                   curr
 *                       p    
 *                             s
 * Where:
 * - pL = prevLeft
 * - s = start
 * - p = prev
 * 
 * Example:
 * Input: head = [1,2,3,4,5], left = 2, right = 4
 * Output: [1,4,3,2,5]
 * 
 * Time Complexity: O(n) where n is the number of nodes in the linked list
 * Space Complexity: O(1) as we only use a constant amount of extra space
 */
export function reverseBetween(head: ListNode | null, left: number, right: number): ListNode | null {
    if (!head || left === right) return head;        // Return list as is if empty or no reversal needed

    const dummy = new ListNode(0, head);             // Dummy node to handle edge case when left = 1

    let prevLeft: ListNode | null = dummy;           // Pointer to node before reversal section

    for (let i = 1; i < left; i++) {                 // Move prevLeft to node just before left position
        prevLeft = prevLeft.next!;
    }

    const start: ListNode = prevLeft.next!;          // First node that will be reversed (position 'left')

    let curr: ListNode = start;                      // Node we're currently processing
    let prev: ListNode = prevLeft;                   // Tracks node that should come after current in reversed order

    for (let i = left; i <= right; i++) {            // Reverse nodes from left to right position
        const next: ListNode = curr.next!;           // Store next node before changing pointers
        curr.next = prev;                            // Reverse the pointer (actual reversal step)
        prev = curr;                                 // Move prev to current node for next iteration
        curr = next;                                 // Move current to the next node
    }

    prevLeft.next = prev;                            // Connect parts before left position to reversed section
    start.next = curr;                               // Connect end of reversed section to rest of the list

    return dummy.next;                               // Return head of the modified list
}

/**
 * Problem 24: Swap Nodes in Pairs (Medium)
 * 
 * Given a linked list, swap every two adjacent nodes and return its head.
 * You must solve the problem without modifying the values in the list's nodes
 * (i.e., only nodes themselves may be changed.)
 * 
 * Visualization of swapping for [1,2,3,4]:
 *   Initially:    D -> 1 -> 2 -> 3 -> 4
 *                 p    f    s    n
 *   
 *   First swap:   D -> 2 -> 1 -> 3 -> 4
 *                           p    f    s
 *   
 *   Second swap:  D -> 2 -> 1 -> 4 -> 3 -> null
 *                                     p
 * Where:
 * - D = dummy
 * - p = prev
 * - f = first
 * - s = second
 * - n = nextPair
 * 
 * Example:
 * Input: head = [1,2,3,4]
 * Output: [2,1,4,3]
 * 
 * Time Complexity: O(n) where n is the number of nodes in the linked list
 * Space Complexity: O(1) as we only use a constant amount of extra space
 */
export function swapPairs(head: ListNode | null): ListNode | null {
    if (!head || !head.next) return head;            // If fewer than two nodes, no swapping needed

    const dummy = new ListNode(0);                   // Create dummy node to simplify implementation
    dummy.next = head;                               // Connect dummy to the original head

    let prev: ListNode = dummy;                      // Initialize prev pointer to dummy node

    while (prev.next && prev.next.next) {            // Continue while we have at least two nodes to swap
        const first: ListNode = prev.next;           // First node of the pair
        const second: ListNode = first.next!;        // Second node of the pair
        const nextPair: ListNode | null = second.next; // Next node after the pair (start of next pair)

        prev.next = second;                          // Step 1: Connect prev to second node
        second.next = first;                         // Step 2: Connect second node to first node
        first.next = nextPair;                       // Step 3: Connect first node to the next pair

        prev = first;                                // Move prev to first node for the next pair
    }

    return dummy.next;                               // Return the new head after dummy
}

/**
 * Helper function to convert array to linked list for testing
 */
export function arrayToList(arr: number[]): ListNode | null {
    if (arr.length === 0) return null;               // Return null for empty array

    const head = new ListNode(arr[0]);               // Create head node with first element
    let current = head;                              // Set current pointer to head

    for (let i = 1; i < arr.length; i++) {           // Iterate through remaining elements
        current.next = new ListNode(arr[i]);         // Create new node for current element
        current = current.next;                      // Move current pointer to new node
    }

    return head;                                     // Return head of the created list
}

/**
 * Helper function to convert linked list to array for testing
 */
export function listToArray(head: ListNode | null): number[] {
    const result: number[] = [];                     // Initialize empty result array
    let current = head;                              // Set current pointer to head

    while (current) {                                // Traverse the list until end
        result.push(current.val);                    // Add current node's value to result
        current = current.next;                      // Move to next node
    }

    return result;                                   // Return the array representation
}

// Example usage:
// const list1 = arrayToList([1, 2, 3, 4, 5]);                           // Create list from array
// console.log("Original list:", listToArray(list1));                     // [1, 2, 3, 4, 5]
// const reversed = reverseList(list1);                                   // Reverse the entire list
// console.log("Reversed list:", listToArray(reversed));                  // [5, 4, 3, 2, 1]

// const list2 = arrayToList([1, 2, 3, 4, 5]);                           // Create another list
// console.log("Original list:", listToArray(list2));                     // [1, 2, 3, 4, 5]
// const partialReversed = reverseBetween(list2, 2, 4);                   // Reverse positions 2-4
// console.log("Partially reversed list:", listToArray(partialReversed)); // [1, 4, 3, 2, 5]

// const list3 = arrayToList([1, 2, 3, 4]);                              // Create list for swapping
// console.log("Original list:", listToArray(list3));                     // [1, 2, 3, 4]
// const swapped = swapPairs(list3);                                      // Swap adjacent pairs
// console.log("Swapped pairs:", listToArray(swapped));                   // [2, 1, 4, 3]
