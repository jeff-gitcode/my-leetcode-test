/**
 * Solution for "Longest Substring Without Repeating Characters" - LeetCode #3
 * 
 * Problem: Given a string s, find the length of the longest substring without repeating characters.
 * 
 * Approach: Sliding Window with Hash Map
 * - Use two pointers to maintain a window.
 * - Use a map to track the last seen index of each character.
 * - When a duplicate is found, move the left pointer past the previous occurrence.
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(min(m, n)) where m is character set size
 * 
 * Example:
 * Input: s = "abcabcbb"
 * Output: 3
 * Explanation: The answer is "abc", with length 3.
 * 
 * Input: s = "bbbbb"
 * Output: 1
 * Explanation: The answer is "b", with length 1.
 */

export function lengthOfLongestSubstring(s: string): number {
    // If the input string is empty, return 0 (no substring exists)
    if (s.length === 0) return 0;
    // Example: s = "", returns 0

    // Map to store the last seen index of each character
    const map = new Map<string, number>();
    // Example: for s = "abcabcbb", map will track indices of 'a', 'b', 'c'

    // Left pointer for the sliding window
    let left = 0;
    // Example: left = 0 at start

    // Variable to store the maximum length found
    let result = 0;
    // Example: result = 0 at start

    // Iterate through each character in the string
    for (let i = 0; i < s.length; i++) {
        // Current character at index i
        const current = s[i];
        // Example: i=0, current='a'; i=1, current='b'; i=2, current='c'

        // If character is already in the current window, move left pointer
        // past the previous occurrence of the character
        if (map.has(current) && map.get(current)! >= left) {
            left = map.get(current)! + 1;
            // Example: s="abcabcbb", i=3, current='a', map.get('a')=0, left=1
            // This moves left to exclude the previous 'a'
        }

        // Update the map with the current character's latest index
        map.set(current, i);
        // Example: after i=2, map={'a':0,'b':1,'c':2}; after i=3, map={'a':3,'b':1,'c':2}

        // Update the result with the maximum window size found so far
        result = Math.max(result, i - left + 1);
        // Example: i=2, left=0, result=3 ("abc"); i=3, left=1, result=3 ("bca")
    }

    // Return the maximum length of substring without repeating characters
    return result;
    // Example: s="abcabcbb" returns 3 ("abc"), s="bbbbb" returns 1 ("b")
}


/**
 * Solution for "LRU Cache" - LeetCode #146
 * 
 * Problem: Design a data structure that follows the Least Recently Used (LRU) cache eviction policy.
 * - Implement get and put methods.
 * - When the cache exceeds capacity, evict the least recently used item.
 * 
 * Approach: Use a Map to maintain insertion order.
 * - On get, move accessed key to the end (most recently used).
 * - On put, insert/update key and evict oldest if over capacity.
 * 
 * Time Complexity: O(1) for get and put (amortized, using Map)
 * Space Complexity: O(capacity)
 * 
 * Example:
 * Input:
 *   LRUCache cache = new LRUCache(2);
 *   cache.put(1, 1); // cache = {1=1}
 *   cache.put(2, 2); // cache = {1=1, 2=2}
 *   cache.get(1);    // returns 1, cache = {2=2, 1=1}
 *   cache.put(3, 3); // evicts key 2, cache = {1=1, 3=3}
 *   cache.get(2);    // returns -1 (not found)
 *   cache.put(4, 4); // evicts key 1, cache = {3=3, 4=4}
 *   cache.get(1);    // returns -1 (not found)
 *   cache.get(3);    // returns 3
 *   cache.get(4);    // returns 4
 */
export class LRUCache {
    private cache: Map<number, number>;
    private capacity: number;

    constructor(capacity: number) {
        this.cache = new Map();
        this.capacity = capacity;
    }

    get(key: number): number {
        if (!this.cache.has(key)) return -1;
        const value = this.cache.get(key)!;
        this.cache.delete(key);
        this.cache.set(key, value);
        return value;
    }

    put(key: number, value: number): void {
        if (this.cache.has(key)) this.cache.delete(key);
        this.cache.set(key, value);
        if (this.cache.size > this.capacity) {
            const oldest = this.cache.keys().next().value;
            this.cache.delete(oldest);
        }
    }
}


/**
 * Solution for "Implement Trie (Prefix Tree)" - LeetCode #208
 * 
 * Problem: Design a Trie with insert and search methods for strings.
 * 
 * Approach: Tree-like structure where each node represents a character.
 * - Each node has a map of children and a flag for end of word.
 * - Insert: Traverse or create nodes for each character.
 * - Search: Traverse nodes for each character, return true if end of word is reached.
 * 
 * Time Complexity: O(L) for insert and search, where L is the length of the word.
 * Space Complexity: O(N * L), where N is number of words and L is average length.
 * 
 * Example:
 * const trie = new Trie();
 * trie.insert("apple");
 * trie.search("apple");   // returns true
 * trie.search("app");     // returns false
 * trie.insert("app");
 * trie.search("app");     // returns true
 */
class TrieNode {
    children: Map<string, TrieNode> = new Map();
    isEnd: boolean = false;
}
export class Trie {
    private root = new TrieNode();
    insert(word: string): void {
        let node = this.root;
        for (const c of word) {
            if (!node.children.has(c)) node.children.set(c, new TrieNode());
            node = node.children.get(c)!;
        }
        node.isEnd = true;
    }
    search(word: string): boolean {
        let node = this.root;
        for (const c of word) {
            if (!node.children.has(c)) return false;
            node = node.children.get(c)!;
        }
        return node.isEnd;
    }
}

/**
 * Solution for "Design Circular Queue" - LeetCode #622
 * 
 * Problem: Design a circular queue supporting enQueue, deQueue, Front, Rear, isEmpty, and isFull operations.
 * 
 * Approach: Use a fixed-size array with head and tail pointers.
 * - enQueue: Add element to tail if not full.
 * - deQueue: Remove element from head if not empty.
 * - Front/Rear: Return front/rear element.
 * - isEmpty/isFull: Check queue status.
 * 
 * Time Complexity: O(1) for all operations
 * Space Complexity: O(k)
 * 
 * Example:
 * const queue = new MyCircularQueue(3);
 * queue.enQueue(1); // returns true
 * queue.enQueue(2); // returns true
 * queue.enQueue(3); // returns true
 * queue.enQueue(4); // returns false (full)
 * queue.Rear();     // returns 3
 * queue.isFull();   // returns true
 * queue.deQueue();  // returns true
 * queue.enQueue(4); // returns true
 * queue.Rear();     // returns 4
 */
export class MyCircularQueue {
    private queue: number[];
    private head: number;
    private tail: number;
    private size: number;
    constructor(k: number) {
        this.queue = Array(k);
        this.head = -1;
        this.tail = -1;
        this.size = k;
    }
    enQueue(value: number): boolean {
        if (this.isFull()) return false;
        if (this.isEmpty()) this.head = 0;
        this.tail = (this.tail + 1) % this.size;
        this.queue[this.tail] = value;
        return true;
    }
    deQueue(): boolean {
        if (this.isEmpty()) return false;
        if (this.head === this.tail) {
            this.head = -1;
            this.tail = -1;
        } else {
            this.head = (this.head + 1) % this.size;
        }
        return true;
    }
    Front(): number {
        return this.isEmpty() ? -1 : this.queue[this.head];
    }
    Rear(): number {
        return this.isEmpty() ? -1 : this.queue[this.tail];
    }
    isEmpty(): boolean {
        return this.head === -1;
    }
    isFull(): boolean {
        return ((this.tail + 1) % this.size) === this.head;
    }
}


/**
 * Solution for "Sliding Window Maximum" - LeetCode #239
 * 
 * Problem: Given an array nums and a window size k, return the maximum value in each sliding window of size k.
 * 
 * Approach: Monotonic Deque
 * - Use a deque to store indices of useful elements for the current window.
 * - Remove indices that are out of the window or whose values are less than the current value.
 * - The front of the deque is always the index of the maximum value for the current window.
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(k)
 * 
 * Example:
 * Input: nums = [1,3,-1,-3,5,3,6,7], k = 3
 * Output: [3,3,5,5,6,7]
 * Explanation: 
 * Window positions: [1 3 -1], [-1 -3 5], [5 3 6], [6 7]
 * Maximums:         [3],      [3],      [5],     [5], [6], [7]
 */
export function maxSlidingWindow(nums: number[], k: number): number[] {
    const result: number[] = [];
    const deque: number[] = [];
    for (let i = 0; i < nums.length; i++) {
        // Remove indices out of the current window
        while (deque.length && deque[0] <= i - k) deque.shift();
        // Remove indices whose corresponding values are less than nums[i]
        while (deque.length && nums[deque[deque.length - 1]] < nums[i]) deque.pop();
        // Add current index
        deque.push(i);
        // The front of the deque is the max for the window
        if (i >= k - 1) result.push(nums[deque[0]]);
    }
    return result;
}

/**
 * Solution for "Decode String" - LeetCode #394
 * 
 * Problem: Given an encoded string, return its decoded string.
 * The encoding rule is: k[encoded_string], where the encoded_string inside the square brackets is repeated k times.
 * 
 * Approach: Stack
 * - Use a stack to keep track of previous strings and repeat counts.
 * - When a number is found, build the repeat count.
 * - When '[' is found, push current string and count to stack.
 * - When ']' is found, pop from stack and repeat the current string.
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 * 
 * Example:
 * Input: s = "3[a]2[bc]"
 * Output: "aaabcbc"
 * 
 * Input: s = "3[a2[c]]"
 * Output: "accaccacc"
 */
export function decodeString(s: string): string {
    const stack: [string, number][] = [];
    let curr = '', num = 0;
    for (const c of s) {
        if (/\d/.test(c)) num = num * 10 + Number(c);
        else if (c === '[') {
            stack.push([curr, num]);
            curr = '';
            num = 0;
        } else if (c === ']') {
            const [prev, repeat] = stack.pop()!;
            curr = prev + curr.repeat(repeat);
        } else {
            curr += c;
        }
    }
    return curr;
}


import { TreeNode } from './treeTraversal';
/**
 * Solution for "Serialize and Deserialize Binary Tree" - LeetCode #297
 * 
 * Problem: Serialize a binary tree to a string and deserialize it back to the original tree structure.
 * 
 * Approach: Preorder Traversal
 * - Serialize: Traverse the tree in preorder, use '#' for null nodes.
 * - Deserialize: Split the string and rebuild the tree recursively.
 * 
 * Time Complexity: O(n) for both serialize and deserialize, where n is the number of nodes.
 * Space Complexity: O(n)
 * 
 * Example:
 * Input: root = [1,2,3,null,null,4,5]
 * Output: "1,2,#,#,3,4,#,#,5,#,#"
 * Explanation: The tree is serialized as a comma-separated string.
 */
export function serialize(root: TreeNode | null): string {
    const result: string[] = [];
    const dfs = (node: TreeNode | null) => {
        if (!node) {
            result.push('#');
            return;
        }
        result.push(String(node.val));
        dfs(node.left);
        dfs(node.right);
    };
    dfs(root);
    return result.join(',');
}

/**
 * Deserialize a string back to a binary tree.
 * 
 * Problem: Given a serialized string of a binary tree (preorder with '#' for nulls), reconstruct the original tree structure.
 * 
 * Approach: Preorder Traversal
 * - Split the string by commas.
 * - Recursively build the tree, using '#' for null nodes.
 * 
 * Time Complexity: O(n), where n is the number of nodes.
 * Space Complexity: O(n)
 * 
 * Example:
 * Input: "1,2,#,#,3,4,#,#,5,#,#"
 * Output: Tree with root 1, left child 2, right subtree 3->4, 3->5
 * Explanation: The tree is reconstructed from the serialized string.
 */
export function deserialize(data: string): TreeNode | null {
    const values = data.split(',');
    let i = 0;
    function build(): TreeNode | null {
        if (values[i] === '#') {
            i++;
            return null;
        }
        const node = new TreeNode(Number(values[i++]));
        node.left = build();
        node.right = build();
        return node;
    }
    return build();
}

/**
 * Solution for "Find Median from Data Stream" - LeetCode #295
 * 
 * Problem: Design a data structure that supports adding numbers and finding the median efficiently.
 * 
 * Approach: Maintain a sorted array.
 * - addNum: Insert number in sorted order.
 * - findMedian: Return middle value (or average of two middle values).
 * 
 * Time Complexity: O(n) for addNum (due to insertion), O(1) for findMedian
 * Space Complexity: O(n)
 * 
 * Example:
 * const mf = new MedianFinder();
 * mf.addNum(1);
 * mf.addNum(2);
 * mf.findMedian(); // returns 1.5
 * mf.addNum(3);
 * mf.findMedian(); // returns 2
 */
export class MedianFinder {
    private nums: number[] = [];
    addNum(num: number): void {
        const idx = this.nums.findIndex(x => x > num);
        if (idx === -1) this.nums.push(num);
        else this.nums.splice(idx, 0, num);
    }
    findMedian(): number {
        const n = this.nums.length;
        if (n % 2 === 1) return this.nums[Math.floor(n / 2)];
        return (this.nums[n / 2 - 1] + this.nums[n / 2]) / 2;
    }
}

/**
 * Solution for "Palindrome Partitioning" - LeetCode #131
 * 
 * Problem: Given a string s, partition s such that every substring of the partition is a palindrome. Return all possible palindrome partitioning of s.
 * 
 * Approach: Backtracking
 * - For each position, try all possible substrings.
 * - If the substring is a palindrome, add it to the current path and recurse.
 * - Backtrack after each recursive call.
 * 
 * Time Complexity: O(n * 2^n)
 * Space Complexity: O(n) (recursion stack)
 * 
 * Example:
 * Input: s = "aab"
 * Output: [["a","a","b"],["aa","b"]]
 * Explanation: "aab" can be partitioned as ["a","a","b"] and ["aa","b"], both are palindrome partitions.
 */
export function partition(s: string): string[][] {
    const result: string[][] = [];
    function backtrack(start: number, path: string[]) {
        // If reached end of string, add current partition to result
        if (start === s.length) {
            result.push([...path]);
            return;
        }
        // Try all possible substrings starting at 'start'
        for (let end = start + 1; end <= s.length; end++) {
            const substr = s.slice(start, end);
            if (isPalindrome(substr)) {
                path.push(substr);         // Choose
                backtrack(end, path);      // Explore
                path.pop();                // Backtrack
            }
        }
    }
    function isPalindrome(str: string): boolean {
        let l = 0, r = str.length - 1;
        while (l < r) if (str[l++] !== str[r--]) return false;
        return true;
    }
    backtrack(0, []);
    return result;
}


/**
 * Solution for "Rank Teams by Votes" - LeetCode #1366
 * 
 * Problem: Given an array of votes, each vote is a string representing the ranking of teams. Rank teams based on the votes.
 * - Teams are ranked by the number of first-place votes, then second-place votes, etc.
 * - If teams are tied, rank them alphabetically.
 * 
 * Approach: Count votes for each position and sort teams by their vote counts.
 * - For each team, maintain an array of counts for each position.
 * - Sort teams by their counts (higher counts first), breaking ties alphabetically.
 * 
 * Time Complexity: O(n * m + m log m), where n is number of votes and m is number of teams.
 * Space Complexity: O(m^2)
 * 
 * Example:
 * Input: votes = ["ABC","ACB","ABC","ACB","ACB"]
 * Output: "ACB"
 * Explanation: Team A has the most first-place votes, C has more second-place votes than B.
 */
export function rankTeams(votes: string[]): string {
    const n = votes[0].length;
    const rank: Record<string, number[]> = {};
    // Initialize rank counts for each team
    for (const v of votes[0]) rank[v] = Array(n).fill(0);
    // Count votes for each position
    for (const vote of votes) {
        for (let i = 0; i < n; i++) rank[vote[i]][i]++;
    }
    // Sort teams by rank counts, breaking ties alphabetically
    return votes[0].split('').sort((a, b) => {
        for (let i = 0; i < n; i++) {
            if (rank[a][i] !== rank[b][i]) return rank[b][i] - rank[a][i];
        }
        return a.localeCompare(b);
    }).join('');
}


/**
 * Solution for "Evaluate Reverse Polish Notation" - LeetCode #150
 * 
 * Problem: Given an array of tokens representing an arithmetic expression in Reverse Polish Notation, evaluate the expression.
 * 
 * Approach: Stack
 * - Iterate through tokens, push numbers onto the stack.
 * - When an operator is found, pop two numbers, apply the operator, and push the result back.
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 * 
 * Example:
 * Input: tokens = ["2","1","+","3","*"]
 * Output: 9
 * Explanation: ((2 + 1) * 3) = 9
 * 
 * Input: tokens = ["4","13","5","/","+"]
 * Output: 6
 * Explanation: (4 + (13 / 5)) = 6
 */
export function evalRPN(tokens: string[]): number {
    const stack: number[] = [];
    for (const token of tokens) {
        if (['+', '-', '*', '/'].includes(token)) {
            const b = stack.pop()!;
            const a = stack.pop()!;
            if (token === '+') stack.push(a + b);
            else if (token === '-') stack.push(a - b);
            else if (token === '*') stack.push(a * b);
            else stack.push(Math.trunc(a / b));
        } else {
            stack.push(Number(token));
        }
    }
    return stack[0];
}

/**
 * Solution for "Design Autocomplete System" - LeetCode #642
 * 
 * Problem: Implement an autocomplete system that suggests the top 3 historical hot sentences as the user types.
 * - Each input character updates the current prefix.
 * - When '#' is input, the current prefix is added as a new sentence.
 * - Suggestions are sorted by frequency, then lexicographically.
 * 
 * Approach: Trie with frequency map
 * - Each TrieNode stores children and a map of sentences to their frequencies.
 * - On input, traverse the Trie to the current prefix and collect top 3 sentences.
 * 
 * Time Complexity: O(L + N log N) per input, where L is prefix length and N is number of matching sentences.
 * Space Complexity: O(N * L), where N is number of sentences and L is average sentence length.
 * 
 * Example:
 * const ac = new AutocompleteSystem(["i love you", "island", "ironman", "i love leetcode"], [5, 3, 2, 2]);
 * ac.input('i'); // returns ["i love you", "island", "i love leetcode"]
 * ac.input(' '); // returns ["i love you", "i love leetcode"]
 * ac.input('a'); // returns []
 * ac.input('#'); // adds "i a" to history
 */

class TrieNode {
    children: Map<string, TrieNode> = new Map();
    sentences: Map<string, number> = new Map();
    isEnd: boolean = false;
}
export class AutocompleteSystem {
    private root = new TrieNode();
    private inputStr = '';
    constructor(sentences: string[], times: number[]) {
        for (let i = 0; i < sentences.length; i++) {
            this.addSentence(sentences[i], times[i]);
        }
    }
    private addSentence(sentence: string, time: number) {
        let node = this.root;
        for (const c of sentence) {
            if (!node.children.has(c)) node.children.set(c, new TrieNode());
            node = node.children.get(c)!;
            node.sentences.set(sentence, (node.sentences.get(sentence) || 0) + time);
        }
        node.isEnd = true;
    }
    input(c: string): string[] {
        if (c === '#') {
            this.addSentence(this.inputStr, 1);
            this.inputStr = '';
            return [];
        }
        this.inputStr += c;
        let node = this.root;
        for (const ch of this.inputStr) {
            if (!node.children.has(ch)) return [];
            node = node.children.get(ch)!;
        }
        return Array.from(node.sentences.entries())
            .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
            .slice(0, 3)
            .map(x => x[0]);
    }
}

/**
 * Solution for "Min Stack" - LeetCode #155
 * 
 * Problem: Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.
 * 
 * Approach: Use two stacks
 * - Main stack stores all values.
 * - Min stack stores the minimum value at each state.
 * - On push, add to min stack if value is <= current min.
 * - On pop, remove from min stack if value is the current min.
 * 
 * Time Complexity: O(1) for all operations
 * Space Complexity: O(n)
 * 
 * Example:
 * const minStack = new MinStack();
 * minStack.push(-2);
 * minStack.push(0);
 * minStack.push(-3);
 * minStack.getMin(); // returns -3
 * minStack.pop();
 * minStack.top();    // returns 0
 * minStack.getMin(); // returns -2
 */
export class MinStack {
    private stack: number[] = [];
    private minStack: number[] = [];
    push(val: number): void {
        this.stack.push(val);
        if (this.minStack.length === 0 || val <= this.getMin()) this.minStack.push(val);
    }
    pop(): void {
        if (this.stack.pop() === this.getMin()) this.minStack.pop();
    }
    top(): number {
        return this.stack[this.stack.length - 1];
    }
    getMin(): number {
        return this.minStack[this.minStack.length - 1];
    }
}