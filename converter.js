'use strict';

const VALID_ROMAN_NUMERAL_REGEX = '^(?=[MDCLXVI])M{0,3}(C[MD]|D?C{0,3})(X[CL]|L?X{0,3})(I[XV]|V?I{0,3})$';

const ROMAN_VALUES = new Map([
    ['I', 1],
    ['V', 5],
    ['X', 10],
    ['L', 50],
    ['C', 100],
    ['D', 500],
    ['M', 1000]
]);

function RomanNumber(input) {
    if (input === null || input === '') {
        throw new Error('value required')

    } else if (typeof input === 'number') {
        const romanNumeral = toRoman(input);
        this.toInt = () => input;
        this.toString = () => romanNumeral;

    } else if (typeof input === 'string') {
        const arabicNumeral = toArabic(input);
        this.toInt = () => arabicNumeral;
        this.toString = () => input;

    } else {
        throw new Error('invalid value')
    }
}

function toRoman(arabicNumeral) {
    if (arabicNumeral > 3999 || arabicNumeral < 1) {
        throw new Error('invalid range')
    }

    const digits = String(arabicNumeral).split('').map(Number);

    const romanUnits = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"][digits.pop()];
    const romanTens = ["", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"][digits.pop()] || "";
    const romanHundreds = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"][digits.pop()] || "";
    const romanThousands = ["", "M", "MM", "MMM"][digits.pop()] || "";

    return [romanThousands, romanHundreds, romanTens, romanUnits].join("");
}

function toArabic(romanNumeral) {
    if (!romanNumeral.match(VALID_ROMAN_NUMERAL_REGEX)) {
        throw new Error('invalid value')
    }

    return romanNumeral.split("")
        .map(romanCharacter => ROMAN_VALUES.get(romanCharacter))
        .reduceRight(romanValuesReducer);
}

function romanValuesReducer(accumulator, currentRomanValue, index, array) {
    const previousRomanValue = array[index + 1];

    if (currentRomanValue >= previousRomanValue) {
        return accumulator + currentRomanValue;
    } else {
        return accumulator - currentRomanValue;
    }
}

module.exports = RomanNumber;