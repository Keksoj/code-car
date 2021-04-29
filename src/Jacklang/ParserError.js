import Error from '../Engine/Error.js';

/**
 * The Jacklang parser error
 */
export default class ParserError extends Error {
    /**
     * Create new `ParserError`.
     * @param {number} lineNumber The line number.
     * @param {number} wordIndex The word index.
     * @param {string} message The error message.
     */
    constructor(lineNumber, wordIndex, message) {
        super('JackLang Parser Error: Erreur ligne ' + lineNumber + ', au mot ' + wordIndex + ': ' + message);
    }
}
