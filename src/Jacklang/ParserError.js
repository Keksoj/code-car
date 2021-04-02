import Error from '../Engine/Error.js';

/**
 * The Jacklang parser error
 */
export default class ParserError extends Error {
    constructor(lineNumber, wordIndex, message) {
        super('Erreur ligne ' + lineNumber + ', au mot ' + wordIndex + ': ' + message);
    }
}