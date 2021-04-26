// import Game from '../Game.js';

const frenchCarCommands = ['avance', 'recule', 'tourne', 'à gauche', 'à droite'];
const normalCarCommands = ['forward', 'backward', 'turn', 'left', 'right'];

const instructionSet = {
    avance: 'forward',
    recule: 'backward',
    tourne: 'turn',
    'à gauche': 'left',
    'à droite': 'right',
};

export default instructionSet;

// const instructionSet = {
//     /**
//      * args structure:
//      * [direction, number_of_cells]
//      * direction. 0: backward, 1: forward
//      * number of cells
//      */
//     mv: (args) => {
//         game.car.moveForward(args[0], args[1]);
//     },
//     /**
//      * args is an array, as always
//      *  [ direction ]
//      * 0 for left, 1 for right
//      */
//     tn: (args) => {
//         if (args[0] == 0) {
//             game.car.turnLeft();
//         } else {
//             game.car.turnRight();
//         }
//     },
// };
