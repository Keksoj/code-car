import Cell from './Cell.js';

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
        // this.cells[15].type = 'obstacle';
    }

    generateCells(obstacleRatio) {
        // todo: remplir cells avec des obstacles en proportions à obstacleRatio
        var cells = [];

        for (var x = 0; x < this.width; x++) {
            for (var y = 0; y < this.height; y++) {
                const randomNumber = Math.random();
                console.log(randomNumber);
                if (randomNumber < obstacleRatio) {
                    cells.push(new Cell(x, y, 'obstacle'));
                } else {
                    cells.push(new Cell(x, y, 'empty'));
                }
            }
        }
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
            console.log(cell);
            cell.draw(ctx, cellSize);
        }

        ctx.restore();
    }
}
// (200) [empty × 100, Cell, Cell, Cell, Cell, Cell, Cell, C
