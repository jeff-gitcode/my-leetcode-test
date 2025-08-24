import { minWindow } from '../../src/problems/minWindow';

describe('minWindow', () => {
    it('should return the minimum window substring containing all characters of t', () => {
        expect(minWindow('ADOBECODEBANC', 'ABC')).toBe('BANC');
    });

    it('should return empty string if no valid window exists', () => {
        expect(minWindow('a', 'b')).toBe('');
        expect(minWindow('abc', 'd')).toBe('');
    });

    it('should handle case where s and t are the same', () => {
        expect(minWindow('a', 'a')).toBe('a');
        expect(minWindow('abc', 'abc')).toBe('abc');
    });

    it('should handle duplicate characters in t', () => {
        expect(minWindow('AAABBBCCC', 'ABC')).toBe('ABBBC');
        expect(minWindow('AAABBBCCC', 'AABC')).toBe('AABBBCC');
    });

    it('should handle multiple possible windows and pick the smallest', () => {
        expect(minWindow('aaflslflsldkalskaaa', 'aaa')).toBe('aaa');
        expect(minWindow('abdabca', 'abc')).toBe('abc');
    });

    it('should handle empty string inputs', () => {
        expect(minWindow('', 'A')).toBe('');
        expect(minWindow('A', '')).toBe('');
        expect(minWindow('', '')).toBe('');
    });

    it('should handle t longer than s', () => {
        expect(minWindow('A', 'AA')).toBe('');
        expect(minWindow('AB', 'ABC')).toBe('');
    });

    it('should handle repeated minimum windows', () => {
        expect(minWindow('aabdec', 'abc')).toBe('abdec');
        expect(minWindow('aabbcc', 'abc')).toBe('abbc');
    });

    it('should handle all characters required at the end', () => {
        expect(minWindow('xyzabc', 'abc')).toBe('abc');
    });

    it('should handle all characters required at the start', () => {
        expect(minWindow('abcxyz', 'abc')).toBe('abc');
    });
});