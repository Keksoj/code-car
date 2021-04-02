import Game from './src/Game.js';
import Transform from './src/Engine/Transform.js';
import Parser from './src/Jacklang/Parser.js';
import Mat3x3 from './src/Engine/Math/Mat3x3.js';
import Number2 from './src/Engine/Math/Number2.js';

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

// test the parser
const str = `avance assumenda qui eligendi. Iusto quis ratione dolorem consequatur 
veniam reprehenderit. Ut sit sed laboriosam. 
Aut et dolores omnis consequatur eaque.`;
console.log(str);

console.log(Parser.parse(str));


/**
 * Called after the game was initialized.
 * @param {Game} game The game.
 */
function onGameStart(game) {
    document.onkeydown = (ev) => {
        switch (ev.key) {
            case 'w':
                game.car.moveForward(1);
                break;
            case 's':
                game.car.moveForward(-1);
                break;
        }
    };
}

/**
 * Called each frame.
 * @param {Game} game The game.
 */
function onGameUpdate(game) {
    /* do some things... */
}

/**
 * Called each frame before rendering the game.
 * @param {Game} game The game.
 */
function onGameBeforeRender(game) {
    /** do some things... */
}

/**
 * Called each frame after rendering the game.
 * @param {Game} game The game.
 */
function onGameAfterRender(game) {
    // SaitamaThingsWith(game);
}

/**
 * Show a big big UFO Triangle ! OMG!!!
 */
function SaitamaThingsWith(game) {
    const ctx = game.ctx;

    ctx.save();
    ctx.beginPath();

    const t0 = new Transform();
    t0.setRotation(game.time / 1000);

    t0.setScale(new Number2(5 + Math.cos(game.time / 1000)));
    const t = Mat3x3.translationMatrix(new Number2(canvas.width / 2, canvas.height / 2));

    const a = Mat3x3.mul(t, Mat3x3.mul(t0.getTRS(), new Number2(0, 10)));
    const b = Mat3x3.mul(t, Mat3x3.mul(t0.getTRS(), new Number2(-10, -10)));
    const c = Mat3x3.mul(t, Mat3x3.mul(t0.getTRS(), new Number2(10, -10)));

    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.lineTo(c.x, c.y);

    ctx.fill();
    ctx.closePath();
    ctx.restore();
}
