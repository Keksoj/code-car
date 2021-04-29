import Car from '../Car.js';
import instructionSet from './jacklang.js';
import ParserError from './ParserError.js';
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
        
        const words = str.split(' ');
        const instructions = [];
        const separator = " ";
        
        let buffer = "";
        let separators = [' ', '\n'];
        
        let index_of_char = 0;
        let index_of_line = 0;

        for(let i = 0; i <= str.length; i++) {

            if(str[i] === 'à') {
                let separator_cout = 0;

                // Move to the next separator
                for(; i < str.length && separator_cout < 2; i++, index_of_char++) {
                    if(separators.indexOf(str[i]) > -1) separator_cout++;
                    buffer += str[i];
                }
            }

            if(separators.indexOf(str[i]) > -1 || i === str.length) {

                if(str[i] === '\n') index_of_line++;

                // If the buffer is empty we
                // pass to the next character...
                if(buffer === '') continue;

                // Show the buffer content...
                // console.log(`buffer: ${buffer}`);
                
                // Reset the buffer...
                buffer = "";

                // Go to the next character...
                continue;
            }

            buffer += str[i];
            index_of_char++;
        }

        for(let i = 0; i < words.length; i++) {
            if(this.instructionSet[words[i]]) {
                instructions.push(words[i]);
            }

            if(words[i] === 'à') {
                const concatenated_inst = words[i] + ' ' + words[i + 1];
                if(this.instructionSet[concatenated_inst]) {
                    instructions.push(concatenated_inst);
                } else {
                    throw new ParserError(0, i, `Le mot qui suit "${words[i + 1]}" n'est pas reconnu!`).message;
                }
                i++;
            }
        }

        const english_instructions = [];

        for(const inst of instructions) {
            english_instructions.push(this.instructionSet[inst])
        }

        // console.log(instructions);
        // console.log(english_instructions);

        return english_instructions;
        // const cursor = new Cursor(str);

        // const instructions = [];
        // do {
        //     let instruction = cursor.cmpFromNextSeparator(this.instructionSet);
        //     if (instruction) {
        //         instructions.push(instruction);
        //     }

        //     // Do some things with the instruction...
        // } while (cursor.moveToNextWord().getValueFromNextSeparator() !== '');
        // return instructions;
    }
}
