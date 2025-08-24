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
 * 
 * Example:
 * Input: s = "ADOBECODEBANC", t = "ABC"
 * Output: "BANC"
 * Explanation: The minimum window substring is "BANC".
 */

export function minWindow(s: string, t: string): string {
    // If s is shorter than t, it's impossible to find a valid window
    if (s.length < t.length) return "";

    // Create a map to count each character's frequency in t
    const need = new Map<string, number>();
    for (const char of t) {
        // Increment the count for each character in t
        need.set(char, (need.get(char) || 0) + 1);
    }

    // Map to keep track of character counts in the current window of s
    const window = new Map<string, number>();
    let left = 0; // Left pointer for the window
    let minLen = Infinity; // Track the minimum window length found
    let minStart = 0; // Track the starting index of the minimum window
    let formed = 0; // Number of unique characters in window with required frequency
    const required = need.size; // Total unique characters needed

    // Expand the window by moving the right pointer
    for (let right = 0; right < s.length; right++) {
        const char = s[right]; // Current character at right pointer
        // Add current character to window count
        window.set(char, (window.get(char) || 0) + 1);

        // If character's count matches what's required in t, increment formed
        if (need.has(char) && window.get(char) === need.get(char)) {
            formed++;
        }

        // Try to contract the window from the left while it's valid
        while (left <= right && formed === required) {
            const currentLen = right - left + 1; // Current window length
            // Update minimum window if current is smaller
            if (currentLen < minLen) {
                minLen = currentLen;
                minStart = left;
            }

            const leftChar = s[left]; // Character at left pointer
            // Remove leftChar from window count as window contracts
            window.set(leftChar, window.get(leftChar)! - 1);

            // If removing leftChar makes window invalid, decrement formed
            if (need.has(leftChar) && window.get(leftChar)! < need.get(leftChar)!) {
                formed--;
            }

            left++; // Move left pointer to contract window
        }
    }

    // If no valid window found, return ""; otherwise, return substring
    return minLen === Infinity ? "" : s.substring(minStart, minStart + minLen);
}

/**
 * Solution for "Minimum Window Substring" - LeetCode #76
 * 
 * Problem: Given two strings s and t, return the minimum window in s which contains all the characters of t.
 * 
 * Approach: Sliding Window + Hash Map
 * - Use two pointers to expand and contract the window.
 * - Track required characters and their counts.
 * - Move right pointer to expand, left pointer to contract when all requirements are met.
 * 
 * Time Complexity: O(|s| + |t|)
 * Space Complexity: O(|t|)
 * 
 * Example:
 * Input: s = "ADOBECODEBANC", t = "ABC"
 * Output: "BANC"
 * Explanation: The minimum window substring is "BANC".
 */
export function minWindow2(s: string, t: string): string {
    if (t.length === 0) return "";
    const need = new Map<string, number>();
    for (const c of t) need.set(c, (need.get(c) || 0) + 1);

    let left = 0, right = 0, matches = 0, minLen = Infinity, minStart = 0;
    const map = new Map<string, number>();

    while (right < s.length) {
        const c = s[right];
        map.set(c, (map.get(c) || 0) + 1);
        if (need.has(c) && map.get(c) === need.get(c)) matches++;

        while (matches === need.size) {
            if (right - left + 1 < minLen) {
                minLen = right - left + 1;
                minStart = left;
            }
            const leftChar = s[left];
            map.set(leftChar, map.get(leftChar)! - 1);
            if (need.has(leftChar) && map.get(leftChar)! < need.get(leftChar)!) matches--;
            left++;
        }
        right++;
    }
    return minLen === Infinity ? "" : s.slice(minStart, minStart + minLen);
}

/**
 * Solution for "Find All Anagrams in a String" - LeetCode #438
 * 
 * Problem: Given a string s and a non-empty string p, find all the start indices of p's anagrams in s.
 * 
 * Approach: Sliding Window + HashMap
 * - Use a window of size p.length, compare character counts
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(k)
 */
export function findAnagrams(s: string, p: string): number[] {
    const result: number[] = [];
    if (s.length < p.length) return result;

    const need = new Map<string, number>();
    for (const c of p) need.set(c, (need.get(c) || 0) + 1);

    const map = new Map<string, number>();
    let matches = 0;
    for (let i = 0; i < s.length; i++) {
        const c = s[i];
        map.set(c, (map.get(c) || 0) + 1);
        if (need.has(c) && map.get(c) === need.get(c)) matches++;

        if (i >= p.length) {
            const leftChar = s[i - p.length];
            if (need.has(leftChar) && map.get(leftChar) === need.get(leftChar)) matches--;
            map.set(leftChar, map.get(leftChar)! - 1);
        }

        if (matches === need.size) result.push(i - p.length + 1);
    }
    return result;
}