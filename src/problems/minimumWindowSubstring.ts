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

/**
 * Solution for "Minimum Window Substring" - LeetCode #76
 * 
 * Problem: Given two strings s and t, return the minimum window in s which contains all the characters of t.
 * 
 * Approach: Sliding Window + HashMap
 * - Expand window to include all chars, contract to minimize
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(k)
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