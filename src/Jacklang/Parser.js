import ParserError from './ParserError.js';

/**
 * The Jacklang parser
 */
export default class Parser {
    static carCommands = ['avance', 'recule', 'tourne', 'gauche', 'droite'];

    /**
     *
     * @param {string} str
     */
    static parse(str) {
        var lines = str.split('\n');
        var parsedWords = [];

        for (let l = 0; l < lines.length; l++) {
            const words = lines[l].split(' ');
            for (let w = 0; w < words.length; w++) {
                if (!Parser.carCommands.includes(words[w])) {
                    return new ParserError(l + 1, w + 1, 'Ce mot est inconnu');
                }
                parsedWords.push(words[w]);
            }
        }
        for (const word of parsedWords) {
        }
    }
}

const frenchCarCommands = ['avance', 'recule', 'tourne', 'à gauche', 'à droite'];
