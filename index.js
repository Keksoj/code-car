import Game from './src/Game.js';
import Transform from './src/Engine/Transform.js';
import Mat3x3 from './src/Engine/Math/Mat3x3.js';
import Number2 from './src/Engine/Math/Number2.js';
import ParserV2 from './src/Jacklang/Parserv2.js';
import instructionSet from './src/Jacklang/jacklang.js';

var canvas = document.getElementById('canvas');
var cellSize = 10; // pixels

canvas.width = 300;
canvas.height = 300;
canvas.style.border = '1px black solid';

var game = new Game(canvas, onGameStart, onGameUpdate, onGameBeforeRender, onGameAfterRender);

/**
 * Called after the game was initialized.
 * @param {Game} game The game.
 */
function onGameStart(game) {
    var parser = new ParserV2();
    var textInput = document.getElementById('textform');
    textInput.onsubmit = (event) => {
        event.preventDefault();
        const rawInstructions = event.target.instructions.value;
        var executableInstructions = parser.parse(rawInstructions);
        console.log(executableInstructions);
        game.car.setInstructions(executableInstructions);
    };
}

var time_total = 0;
/**
 * Called each frame.
 * @param {Game} game The game.
 */
function onGameUpdate(game) {
    /* do some things... */
    time_total += game.time - game.lastTime;
    if (time_total / 1000 > 1) {
        // console.log(game.time - game.lastTime);
        // console.log(game.car.instructions);
        time_total = 0;
        game.car.executeOneInstruction();
        game.checkWin();
    }
}

/**
 * Called each frame before rendering the game.
 * @param {Game} game The game.
 */
function onGameBeforeRender(game) {
    /* do some things... */
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
 * @param {Game} game The game.
 */
function SaitamaThingsWith(game) {
    const ctx = game.ctx;

    ctx.save();
    ctx.beginPath();

    const t0 = new Transform();
    t0.setRotation(game.time / 1000);

    t0.setScale(new Number2(50));
    const t = Mat3x3.translationMatrix(new Number2(canvas.width / 2, canvas.height / 2));

    const cocos = Math.cos(Math.PI / 4);

    const triangleVertices = [
        new Number2(0, 1),
        new Number2(cocos, -cocos),
        new Number2(-cocos, -cocos),
    ];

    const trs = t0.getTRS();

    const a = Mat3x3.mul(t, Mat3x3.mul(trs, triangleVertices[0]));
    const b = Mat3x3.mul(t, Mat3x3.mul(trs, triangleVertices[1]));
    const c = Mat3x3.mul(t, Mat3x3.mul(trs, triangleVertices[2]));

    // console.log();

    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.lineTo(c.x, c.y);

    ctx.fillStyle = '#00ff00';
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    const dir = Mat3x3.mul(t0.rMatrix, new Number2(0, 1));
    ctx.moveTo(t.values[2], t.values[5]);
    console.log(`${t.values[2]}, ${t.values[5]}`);

    ctx.lineTo(t.values[2] + dir.x * 80, t.values[5] + dir.y * 80);

    ctx.strokeStyle = '#0000ff';
    ctx.stroke();

    ctx.restore();
}
