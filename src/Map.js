import Cell from './Cell.js';
import Position from './Position.js';

/** draw the cell on the canvas
 * @property {Number} width
 * @property {Number} height
 * @property {Number[]} cells
 */
export default class Map {
    /**
     *
     * @param {Number} width
     * @param {Number} height
     * @param {Number} obstacleRatio nombre entre 0 et 1
     */
    constructor(width, height, obstacleRatio) {
        this.width = width;
        this.height = height;
        this.cells = this.generateCells(obstacleRatio);
    }

    generateCells(obstacleRatio) {
        // todo: remplir cells avec des obstacles en proportions à obstacleRatio
        var cells = [];

        for (var x = 0; x < this.width; x++) {
            for (var y = 0; y < this.height; y++) {
                const randomNumber = Math.random();
                if (randomNumber < obstacleRatio) {
                    cells.push(new Cell(x, y, 'obstacle'));
                } else {
                    cells.push(new Cell(x, y, 'empty'));
                }
            }
        }
        const randomIndex = Math.floor(Math.random() * this.width * this.height);
        cells[randomIndex].type = 'startpoint';

        const carX = randomIndex % this.width;
        const carY = Math.floor(randomIndex / this.width);
        this.carPosition = new Position(carX, carY);
        console.log(this.carPosition);

        var randomIndex2;
        do {
            randomIndex2 = Math.floor(Math.random() * this.width * this.height);
        } while (randomIndex2 == randomIndex);

        cells[randomIndex2].type = 'endpoint';

        return cells;
    }

    /** draw the cell on the canvas
     * @param {CanvasRenderingContext2D} ctx
     * @param {Number} cellSize
     */
    draw(ctx, cellSize) {
        ctx.save();
        ctx.fillStyle = 'grey';
        // console.log(this.cells);
        for (const cell of this.cells) {
            // console.log(cell);
            cell.draw(ctx, cellSize);
        }

        ctx.restore();
    }
}
