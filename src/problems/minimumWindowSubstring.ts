/**
 * Solution for the "Minimum Window Substring" problem
 * 
 * Problem: Given two strings s and t, return the minimum window substring of s 
 * such that every character in t is included in the window.
 * 
 * Approach: Sliding Window with Hash Map
 * - Use frequency map for characters in t
 * - Expand window until all characters are covered
 * - Contract window while maintaining coverage
 * 
 * Time Complexity: O(|s| + |t|)
 * Space Complexity: O(|s| + |t|)
 */

export function minWindow(s: string, t: string): string {
    if (s.length < t.length) return "";

    // Count characters in t
    const tCount = new Map<string, number>();
    for (const char of t) {
        tCount.set(char, (tCount.get(char) || 0) + 1);
    }

    const windowCount = new Map<string, number>();
    let left = 0;
    let minLen = Infinity;
    let minStart = 0;
    let formed = 0; // Number of unique characters in window with desired frequency
    const required = tCount.size;

    for (let right = 0; right < s.length; right++) {
        const char = s[right];
        windowCount.set(char, (windowCount.get(char) || 0) + 1);

        // Check if current character's frequency matches required frequency
        if (tCount.has(char) && windowCount.get(char) === tCount.get(char)) {
            formed++;
        }

        // Contract window while it's valid
        while (left <= right && formed === required) {
            const currentLen = right - left + 1;
            if (currentLen < minLen) {
                minLen = currentLen;
                minStart = left;
            }

            const leftChar = s[left];
            windowCount.set(leftChar, windowCount.get(leftChar)! - 1);

            if (tCount.has(leftChar) && windowCount.get(leftChar)! < tCount.get(leftChar)!) {
                formed--;
            }

            left++;
        }
    }

    return minLen === Infinity ? "" : s.substring(minStart, minStart + minLen);
}
