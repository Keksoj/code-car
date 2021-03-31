import Cell from './Cell.js';
import Position from './Position.js';

/** draw the cell on the canvas
 * @property {Number} width
 * @property {Number} height
 * @property {Cell[][]} cells
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
        this.cells = [];
        this.generateCells(obstacleRatio);
    }

    generateCells(obstacleRatio) {
        // fill with empty cells and random obstacles
        for (var y = 0; y < this.height; y++) {
            var row = [];
            for (var x = 0; x < this.width; x++) {
                if (Math.random() < obstacleRatio) {
                    row.push(new Cell(x, y, 'obstacle'));
                } else {
                    row.push(new Cell(x, y, 'empty'));
                }
            }
            this.cells.push(row);
        }

        // start point
        const [startPointX, startPointY] = this.generateRandomCoordinates();
        this.cells[startPointX][startPointY].type = 'startpoint';

        // car
        this.carPosition = new Position(startPointX, startPointY);
        console.log(this.carPosition);

        // end point
        var endPointX, endPointY;
        do {
            [endPointX, endPointY] = this.generateRandomCoordinates();
        } while (endPointX == startPointX && endPointY == startPointY);
        this.cells[endPointY][endPointX].type = 'endpoint';
    }

    generateRandomCoordinates() {
        const x = Math.floor(Math.random() * this.width);
        const y = Math.floor(Math.random() * this.height);
        return [x, y];
    }

    /** draw the cell on the canvas
     * @param {CanvasRenderingContext2D} ctx
     * @param {Number} cellSize
     */
    draw(ctx, cellSize) {
        ctx.save();
        ctx.fillStyle = 'grey';
        console.log(this.cells);
        for (const row of this.cells) {
            for (const cell of row) {
                cell.draw(ctx, cellSize);
            }
            // console.log(cell);
        }
        ctx.restore();
    }
}
