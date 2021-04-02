import Car from './_Car.js';
import Map from './_Map.js';
import Level from '../Level.js';
import Drawable from './_Drawable.js';

export default class Game extends Drawable {
    /**
     * Create new Game instance !
     * @param {HTMLCanvasElement} canvas The canvas where the game need to be draw.
     * @param {Level} level
     * @param {((game: Game, time: number) => void)=} onGameUpdate Callback called once per frame.
     */
    constructor(canvas, onGameStart, onGameUpdate) {
        super();

        this.canvas     = canvas;
        this.ctx        = canvas.getContext('2d');
        this.cellSize   = 30;
        this.map        = new Map(canvas, { obstacleRatio: 0.2, cellSize: this.cellSize });
        this.car        = new Car(this.map.startPoint, 'N', this.map);
        this.lastTime   = 0;

        this.onGameStartCallback = onGameStart ? onGameStart : (game) => { /* ... */ }
        this.onGameUpdateCallback = onGameUpdate ? onGameUpdate : (game, time) => { /* ... */ }

        this.onGameStartCallback(this);
        this.gameLoop(0);
    }

    gameLoop(time) {
        this.onGameUpdateCallback(this, time);
        this.draw(this.ctx);
        this.lastTime = time;
        requestAnimationFrame((time) => this.gameLoop(time));
    }

    /**
     *
     * @param {HTMLCanvasElement} canvas
     */
    setCanvasSize(canvas) {
        canvas.width = this.level.widthInCells;
        canvas.height = this.level.heightInCells;
    }

    draw(ctx) {
        ctx.save();
        
        this.map.draw(ctx);
        this.car.draw(ctx);

        ctx.restore();
    }
}
