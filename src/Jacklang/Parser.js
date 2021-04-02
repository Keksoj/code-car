import ParserError from './ParserError.js';

/**
 * The Jacklang parser
 */
export default class Parser {
    static carCommands = [
        'avance',
        'recule',
        'tourne',
        'gauche',
        'droite',
        'un',
        'deux',
        'trois',
        'quatre',
        'cinq',
        'six',
        'sept',
        'huit',
        'neuf',
        'dix',
    ];

    /**
     *
     * @param {string} str
     */
    static parse(str) {
        var lines = str.split('\n');
        var parsedText = [];

        for (let l = 0; l < lines.length; l++) {
            const words = lines[l].split(' ');
            const parsedLine = [];
            for (let w = 0; w < words.length; w++) {
                if ()
                if (!Parser.carCommands.includes(words[w])) {
                    return new ParserError(l + 1, w + 1, 'Ce mot est inconnu');
                }
                parsedLine.push(words[w]);
            }
            parsedText.push(parsedLine);
        }
        console.log(parsedText);
        for (const line of parsedText) {
        }
    }
}

const frenchCarCommands = ['avance', 'recule', 'tourne', 'à gauche', 'à droite'];
