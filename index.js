import Map from './src/Map.js';
import Game from './src/Game.js';
import Mat3x3 from './src/Mat3x3.js';
import Number3 from './src/Number3.js';
import Number2 from './src/Number2.js';
import Transform from './src/Transform.js';

var canvas = document.getElementById('canvas');
var cellSize = 10; // pixels

canvas.width = 300;
canvas.height = 300;
canvas.style.border = '1px black solid';
// var game = new Game(canvas);

// // var ctx = canvas.getContext('2d');
// game.start();
/**
 * @type {CanvasRenderingContext2D}
 */
const ctx = canvas.getContext('2d');

const game = new Game(canvas, onGameStart, onGameUpdate, onGameBeforeRender, onGameAfterRender);

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
 */
function onGameUpdate(game) { /* do some things... */ }

/**
 * Called each frame before rendering the game.
 * @param {Game} game The game.
 */
function onGameBeforeRender(game) { /** do some things... */ }

/**
 * Called each frame after rendering the game.
 * @param {Game} game The game.
 */
function onGameAfterRender(game) {
    const ctx = game.ctx;

    ctx.save();
    ctx.beginPath();

    const t0 = new Transform();
    t0.setRotation(game.time / 1000);

    const a = Mat3x3.mul(t0.getTRS(), new Number2(0  , 0  ));
    const b = Mat3x3.mul(t0.getTRS(), new Number2(0  , 100));
    const c = Mat3x3.mul(t0.getTRS(), new Number2(100, 0  ));
    
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.lineTo(c.x, c.y);

    ctx.fill();
    ctx.closePath();
    ctx.restore();

}
