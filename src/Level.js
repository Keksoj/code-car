import Map from './Map.js';

export default class Level {
    /**
     *
     * @param {HTMLCanvasElement} canvas
     */
    constructor(canvas) {
        this.difficulty = 0;
        this.timer = timer;

        this.widthInCells = 10;
        this.heightInCells = 10;
        this.cellSize = canvas.width / this.widthInCells;
        this.obstacleRatio = 0.1;
        this.map = new Map(this.widthInCells, this.heightInCells, this.obstacleRatio);
        
    }

    levelUp() {
        this.difficulty += 1;
        this.obstacleRatio += 0.05;
        this.widthInCells += 1;
        this.heightInCells += 1;
    }

    startLevel() {
        var leftTime = this.timer;
        while (leftTime != 0) {
            setTimeout(function () {
                leftTime -= 1;
            }, 1000);
        }
    }

    levelOver() {
        gameOver();
    }

    draw(ctx) {
        ctx.save();
        this.map.draw(ctx, this.cellSize);
        ctx.restore();
    }
}
