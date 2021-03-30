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
        this.cellSize = 30;
        this.score = 0;
        this.level = new Level(this.canvas);
        this.car = new Car(this.level.map.carPosition, "E");
        // this.start = false;
        this.isOver = false;
        this.onPause = false;
    }

    helloWorld() {
        console.log('hello world');
    }

    start() {
        console.log(this.car.orientation);

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
        this.car.draw(ctx, this.cellSize);

        ctx.restore();
    }
}
