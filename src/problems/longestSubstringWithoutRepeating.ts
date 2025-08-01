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

    const charMap = new Map<string, number>();
    let left = 0;
    let maxLength = 0;

    for (let right = 0; right < s.length; right++) {
        const char = s[right];

        // If character is already in current window, move left pointer
        if (charMap.has(char) && charMap.get(char)! >= left) {
            left = charMap.get(char)! + 1;
        }

        charMap.set(char, right);
        maxLength = Math.max(maxLength, right - left + 1);
    }

    return maxLength;
}
