import Car from './Car.js';
import Map from './Map.js';
import Level from './Level.js';
import Drawable from './Engine/Drawable.js';

export default class Game extends Drawable {
    /**
     * Create new Game instance !
     * @param {HTMLCanvasElement} canvas The canvas where the game need to be draw.
     * @param {Level} level
     * @param {((game: Game) => void)=} onGameStart Callback called after the game initialization.
     * @param {((game: Game) => void)=} onGameUpdate Callback called once per frame.
     * @param {((game: Game) => void)=} onGameBeforeRender Callaback called once per frame before the render step.
     * @param {((game: Game) => void)=} onGameAfterRender Callback called once per frame after the render step.
     */
    constructor(canvas, onGameStart, onGameUpdate, onGameBeforeRender, onGameAfterRender) {
        super();

        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.cellSize = 30;
        this.map = new Map(canvas, { obstacleRatio: 0.3, cellSize: this.cellSize });
        this.car = new Car(this.map.startPoint, 'N', this.map);
        this.lastTime = 0;
        this.time = 0;
        this.isWon = false;

        const defaultCallback = (_) => {
            /* ... */
        };

        this.onGameStartCallback = onGameStart ? onGameStart : defaultCallback;
        this.onGameUpdateCallback = onGameUpdate ? onGameUpdate : defaultCallback;
        this.onGameBeforeRenderCallback = onGameBeforeRender ? onGameBeforeRender : defaultCallback;
        this.onGameAfterRenderCallback = onGameAfterRender ? onGameAfterRender : defaultCallback;

        this.onGameStartCallback(this);
        this.gameLoop(0);
    }

    gameLoop(time) {
        this.time = time;

        this.onGameUpdateCallback(this);
        this.draw(this.ctx);

        this.lastTime = time;
        requestAnimationFrame((time) => this.gameLoop(time));
    }

    /**
     * Checks for a win
     */
    checkWin() {
        const cell = this.map.cells[this.car.position.x][this.car.position.y];
        // console.log(cell);
        if (cell.type === 'endpoint') {
            console.log('congrats');
            this.isWon = true;
        }
    }

    gameOver() {
        
    }

    /**
     *
     * @param {HTMLCanvasElement} canvas
     */
    setCanvasSize(canvas) {
        canvas.width = this.level.widthInCells;
        canvas.height = this.level.heightInCells;
    }

    /**
     *
     * @param {CanvasRenderingContext2D} ctx The context.
     */
    draw(ctx) {
        ctx.save();
        this.onGameBeforeRenderCallback(this);

        ctx.rect(0, 0, this.canvas.width, this.canvas.height);
        ctx.fill();
        ctx.fillStyle = '#ffffff';

        this.map.draw(ctx);
        this.car.draw(ctx);

        if (this.isWon) {
            this.ctx.fillStyle = '#00ff00';
            this.ctx.fillRect(
                2 * this.cellSize,
                2 * this.cellSize,
                (this.map.cellAmount.x - 4) * this.cellSize,
                (this.map.cellAmount.y - 4) * this.cellSize
            );
            this.ctx.fill();
            this.ctx.font = '30px monospace';
            this.ctx.textAlign = 'center';
            this.ctx.fillStyle = 'white';
            this.ctx.fillText('Congratulations', this.canvas.width / 2, this.canvas.height / 2 - 40);
            this.ctx.font = '15px monospace';
            this.ctx.fillText('You won', this.canvas.width / 2, this.canvas.height / 2);
            this.ctx.fill();
        }

        this.onGameAfterRenderCallback(this);
        ctx.restore();
    }
}
