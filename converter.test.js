const RomanNumber = require('./converter.js');

const convertToRoman = arabicNumber => new RomanNumber(arabicNumber).toString();
const convertToArabic = romanNumber => new RomanNumber(romanNumber).toInt();

describe('Happy path Arabic to Roman', () => {
    it('converts 1', () => expect(convertToRoman(1)).toBe('I'));
    it('converts 3', () => expect(convertToRoman(3)).toBe('III'));
    it('converts 4', () => expect(convertToRoman(4)).toBe('IV'));
    it('converts 5', () => expect(convertToRoman(5)).toBe('V'));
    it('converts 1968', () => expect(convertToRoman(1968)).toBe('MCMLXVIII'));
    it('converts 2999', () => expect(convertToRoman(2999)).toBe('MMCMXCIX'));
    it('converts 3000', () => expect(convertToRoman(3000)).toBe('MMM'));
});

describe('Happy path Roman to Arabic', () => {
    it('converts I', () => expect(convertToArabic('I')).toBe(1));
    it('converts III', () => expect(convertToArabic('III')).toBe(3));
    it('converts IV', () => expect(convertToArabic('IV')).toBe(4));
    it('converts V', () => expect(convertToArabic('V')).toBe(5));
    it('converts CDXXIX', () => expect(convertToArabic('CDXXIX')).toBe(429));
    it('converts MCDLXXXII', () => expect(convertToArabic('MCDLXXXII')).toBe(1482));
    it('converts MCMLXXX', () => expect(convertToArabic('MCMLXXX')).toBe(1980));
});

describe('Unhappy path', () => {
    it('fails for null input', () => expect(() => new RomanNumber(null)).toThrowError('value required'));
    it('fails for empty input', () => expect(() => new RomanNumber('')).toThrowError('value required'));

    it('fails for input 0', () => expect(() => new RomanNumber(0)).toThrowError('invalid range'));
    it('fails for input 10000', () => expect(() => new RomanNumber(10000)).toThrowError('invalid range'));

    it('fails for input MMMMCMXCIX', () => expect(() => new RomanNumber('MMMMCMXCIX')).toThrowError('invalid value'));
    it('fails for input MMMMDMXCIX', () => expect(() => new RomanNumber('MMMMDMXCIX')).toThrowError('invalid value'));
    it('fails for input IIII', () => expect(() => new RomanNumber('IIII')).toThrowError('invalid value'));
    it('fails for input string 1473', () => expect(() => new RomanNumber('1473')).toThrowError('invalid value'));
    it('fails for input CD1X', () => expect(() => new RomanNumber('CD1X')).toThrowError('invalid value'));
    it('fails for input error', () => expect(() => new RomanNumber('error')).toThrowError('invalid value'));
});
