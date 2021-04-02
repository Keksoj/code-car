import Map from './src/Clean/_Map.js';
import Game from './src/Clean/_Game.js';

var canvas = document.getElementById('canvas');
var cellSize = 10; // pixels

canvas.width = 300;
canvas.height = 300;
canvas.style.border = '1px black solid';
// var game = new Game(canvas);

// // var ctx = canvas.getContext('2d');
// game.start();
const ctx = canvas.getContext('2d');

const game = new Game(canvas, onGameStart, onGameUpdate);

/**
 * Called after the game was initialized.
 * @param {Game} game The game.
 */
function onGameStart(game) {
    document.onkeydown = (ev) => {
        switch(ev.key) {
            case 'w':
                game.car.moveForward(1);
                break;
            case 's':
                game.car.moveForward(-1);
                break;
        }
    }
}

/**
 * Called each frame.
 * @param {Game} game The game.
 * @param {number} time Time since game start.
 */
function onGameUpdate(game, time) {
    
}