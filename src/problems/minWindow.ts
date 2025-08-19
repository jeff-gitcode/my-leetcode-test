/**
 * Solution for "Minimum Window Substring" - LeetCode #76
 * 
 * Problem: Given two strings s and t of lengths m and n respectively, return the minimum window 
 * substring of s such that every character in t (including duplicates) is included in the window.
 * 
 * Approach: Variable-size Sliding Window with HashMap
 * - Use frequency map to track required characters from t
 * - Expand window by moving right pointer until all characters are covered
 * - Contract window by moving left pointer while maintaining validity
 * - Track minimum valid window found
 * 
 * Time Complexity: O(|s| + |t|)
 * Space Complexity: O(|s| + |t|)
 */

export function minWindow(s: string, t: string): string {
    if (s.length === 0 || t.length === 0 || s.length < t.length) {
        return '';
    }

    // Frequency map for characters in t
    const tFreq = new Map<string, number>();
    for (const char of t) {
        tFreq.set(char, (tFreq.get(char) || 0) + 1);
    }

    const required = tFreq.size; // Number of unique characters in t that need to be matched
    let formed = 0; // Number of unique characters in current window with desired frequency

    // Sliding window frequency map
    const windowCounts = new Map<string, number>();

    // Answer tuple: (window length, left, right)
    let minLen = Infinity;
    let minLeft = 0;
    let minRight = 0;

    let left = 0;

    for (let right = 0; right < s.length; right++) {
        // Add character from the right to the window
        const char = s[right];
        windowCounts.set(char, (windowCounts.get(char) || 0) + 1);

        // If the frequency of the current character added equals to the
        // desired count in t then increment the formed count by 1
        if (tFreq.has(char) && windowCounts.get(char) === tFreq.get(char)) {
            formed++;
        }

        // Try to contract the window until it ceases to be 'desirable'
        while (left <= right && formed === required) {
            // Save the smallest window
            if (right - left + 1 < minLen) {
                minLen = right - left + 1;
                minLeft = left;
                minRight = right;
            }

            // The character at the position pointed by the `left` pointer is no longer a part of the window
            const leftChar = s[left];
            windowCounts.set(leftChar, windowCounts.get(leftChar)! - 1);

            if (tFreq.has(leftChar) && windowCounts.get(leftChar)! < tFreq.get(leftChar)!) {
                formed--;
            }

            // Move the left pointer ahead for the next iteration
            left++;
        }
    }

    return minLen === Infinity ? '' : s.substring(minLeft, minRight + 1);
}