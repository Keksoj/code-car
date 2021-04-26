import Car from '../Car.js';
import instructionSet from './jacklang.js';

export class Cursor {
    /** @type {string} */
    mStr;

    /**
     * Create new `Cursor`.
     * @param {string} str The string to operate on.
     */
    constructor(str) {
        this.mStr = str;
    }

    /** The current index of the cursor */
    mIndex = 0;

    /**
     * Retrieve the cursor index.
     */
    get index() {
        return this.mIndex;
    }

    /**
     * Set the cursor index.
     */
    set index(value) {
        this.mIndex = value;
    }

    /**
     * Move the cursor
     * @param {number} i The index to move to
     */
    moveTo(i) {
        this.index = i;
        return this;
    }

    /**
     *
     * @param {string} separator The separator zeubi
     */
    moveToNextWord(separator = ' ') {
        let endIndex = this.index;
        for (; this.mStr[endIndex] != separator && endIndex < this.mStr.length; endIndex++);
        this.index = endIndex + 1;
        // It works ? yes!
        return this;
    }

    /**
     *
     * @param {string} separator The separator
     */
    getValueFromNextSeparator(separator = ' ') {
        let endIndex = this.index;
        for (; this.mStr[endIndex] != separator && endIndex < this.mStr.length; endIndex++);
        return endIndex > this.mStr.length ? '' : this.mStr.slice(this.index, endIndex);
    }

    /**
     *
     */
    getValueFrom() {
        return this.mStr[this.index];
    }

    /**
     *
     * @param {number} size The range size.
     * @returns
     */
    getValuesFrom(size) {
        return this.mStr.slice(this.index, this.index + size);
    }

    /**
     *
     * @param {{[key: string]: () => void}} instructionSet The values to check
     * @returns {(car: Car) => void}
     */
    cmpFromNextSeparator(instructionSet, separator = ' ') {
        const value = this.getValueFromNextSeparator(separator);
        for (const key in instructionSet) {
            if (key === value) return instructionSet[key];
        }
    }
}

export default class ParserV2 {
    constructor() {
        this.instructionSet = instructionSet;

        // this.parse = this.parse(stringToParse);
    }

    /**
     * Just parse a text into `JLLI` (**J**_acklang_ **L**_ow_ **L**_evel_ **I**_nstruction_).
     * @param {string} str Text to parse.
     * @param {}
     * @return {[string]} normal english instructions
     */
    parse(str) {
        const cursor = new Cursor(str);

        const instructions = [];
        do {
            let instruction = cursor.cmpFromNextSeparator(this.instructionSet);
            if (instruction) {
                instructions.push(instruction);
            }

            // Do some things with the instruction...
        } while (cursor.moveToNextWord().getValueFromNextSeparator() !== '');
        return instructions;
    }
}
