import Car from './Car.js';
import Position from './Position.js';
import Map from './Map.js';
import Level from './Level.js';

export default class Game {
    /**
     * @param {HTMLCanvasElement} canvas
     * @param {Level} level
     */
    constructor(canvas, mapLevel = 0) {
        this.timer = timer;
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.cellSize = 0;

        this.score = 0;

        // this.start = false;
        this.end = false;
        this.onPause = false;
    }

    helloWorld() {
        console.log('hello world');
    }

    start() {
        // this.level = level;
        this.level = new Level(this.canvas);
        console.log('hello start');

        this.draw(this.ctx);
        this.timer = 0;
        this.score = 0;

        // if (this.end == false) {
        //     this.currentLevel = new Level();
        //     startLevel(currentLevel);
        // }
    }

    /**
     *
     * @param {HTMLCanvasElement} canvas
     */
    setCanvasSize(canvas) {
        canvas.width = this.level.widthInCells;
        canvas.height = this.level.heightInCells;
    }

    levelUp() {
        this.level.levelUp();
    }

    gameOver() {
        this.end == true;
    }

    draw(ctx) {
        ctx.save();

        this.level.draw(ctx);

        ctx.restore();
    }
}
