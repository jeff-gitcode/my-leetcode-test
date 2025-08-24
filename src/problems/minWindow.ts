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
 * Example:
 * Input: s = "ADOBECODEBANC", t = "ABC"
 * Output: "BANC"
 * Explanation: The minimum window substring is "BANC".
 */
export function minWindow(s: string, t: string): string {
    // Edge case: if s or t is empty, or s is shorter than t, return empty string
    if (s.length === 0 || t.length === 0 || s.length < t.length) {
        return '';
    }

    // Frequency map for characters in t
    const need = new Map<string, number>();
    for (const char of t) {
        need.set(char, (need.get(char) || 0) + 1);
    }

    const required = need.size; // Number of unique characters in t that need to be matched
    let formed = 0; // Number of unique characters in current window with desired frequency

    // Sliding window frequency map
    const window = new Map<string, number>();

    // Answer tuple: (window length, left, right)
    let minLen = Infinity;
    let minLeft = 0;
    let minRight = 0;

    let left = 0;

    // Expand the window by moving right pointer
    for (let right = 0; right < s.length; right++) {
        // Add character from the right to the window
        const char = s[right];
        window.set(char, (window.get(char) || 0) + 1);

        // If the frequency of the current character added equals to the
        // desired count in t then increment the formed count by 1
        if (need.has(char) && window.get(char) === need.get(char)) {
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
            window.set(leftChar, window.get(leftChar)! - 1);

            // If the frequency of the left character falls below the required count, decrement formed
            if (need.has(leftChar) && window.get(leftChar)! < need.get(leftChar)!) {
                formed--;
            }

            // Move the left pointer ahead for the next iteration
            left++;
        }
    }

    // Return the minimum window substring, or empty string if not found
    return minLen === Infinity ? '' : s.substring(minLeft, minRight + 1);
}