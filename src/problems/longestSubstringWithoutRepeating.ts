/**
 * Solution for the "Longest Substring Without Repeating Characters" problem
 * 
 * Problem: Given a string s, find the length of the longest substring without repeating characters.
 * 
 * Approach: Sliding Window with Hash Map
 * - Use two pointers to maintain a window
 * - Use a map to track character positions
 * - When duplicate found, move left pointer past the duplicate
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(min(m, n)) where m is character set size
 */

export function lengthOfLongestSubstring(s: string): number {
    if (s.length === 0) return 0;

    const map = new Map<string, number>();
    let left = 0;
    let result = 0;

    for (let i = 0; i < s.length; i++) {
        const current = s[i];

        // If character is already in current window, move left pointer
        if (map.has(current) && map.get(current)! >= left) {
            left = map.get(current)! + 1;
        }

        map.set(current, i);
        result = Math.max(result, i - left + 1);
    }

    return result;
}
