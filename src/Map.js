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
        this.startCellX;
        this.startCellY;
        this.checkForDrivablePath();
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
        this.cells[startPointY][startPointX].type = 'startpoint';
        this.startCellX = startPointX;
        this.startCellY = startPointY;

        // car
        this.carPosition = new Position(startPointX, startPointY);
        // console.log(this.carPosition);

        // end point
        var endPointX, endPointY;
        do {
            [endPointX, endPointY] = this.generateRandomCoordinates();
        } while (endPointX == startPointX && endPointY == startPointY);
        this.cells[endPointY][endPointX].type = 'endpoint';

        console.log(this.cells);
    }

    generateRandomCoordinates() {
        const x = Math.floor(Math.random() * this.width);
        const y = Math.floor(Math.random() * this.height);
        // console.log('generated random coordinates: x:', x, 'y:', y);
        return [x, y];
    }

    /**
     * checks if a path exists to the end point, returns a bool
     * @returns {boolean}
     */
    checkForDrivablePath() {
        var exploredCells = [];

        // the first explored cell is the start cell
        exploredCells.push(this.cells[this.startCellY][this.startCellX]);
        console.log(exploredCells);

        var drivableNeighbors = [];

        // stop the search after as many tries as there are cells
        var i = 0;
        while (i < this.width * this.height) {
            for (const cell of exploredCells) {
                console.log('we will find neighbors to:', cell);
                const neighboringCells = this.findNeighborsToCell(cell);
                for (const neighbor of neighboringCells) {
                    // console.log('problem neighbor:', neighbor);
                    if (neighbor.type == 'empty') {
                        drivableNeighbors.push(neighbor);
                    }
                    if (neighbor.type == 'endpoint') {
                        return true;
                    }
                }
            }
            // console.log(exploredCells)

            exploredCells.concat(drivableNeighbors);
            i++;
        }
        return false;
    }

    /**
     * for a given cell, find its neighbors without looking beyond the walls
     * @param {Cell} cell
     * @returns {Cell[]} list of neighboring cells
     */
    findNeighborsToCell(cell) {
        // console.log(cell);
        var neighbors = [];
        // check for the left wall and push EAST neighbor
        if (cell.x != 0) {
            neighbors.push(this.cells[cell.y][cell.x - 1]);
        }
        // check for the right wall and push WEST neighbor
        if (cell.x < this.width - 1) {
            neighbors.push(this.cells[cell.y][cell.x + 1]);
        }
        // check for the top wall and push the NORTH neighbor
        if (cell.y != 0) {
            neighbors.push(this.cells[cell.y - 1][cell.x]);
        }
        // check for the top wall and push the NORTH neighbor
        if (cell.y < this.height - 1) {
            neighbors.push(this.cells[cell.y + 1][cell.x]);
        }
        // console.debug('neighbors:', neighbors);
        return neighbors;
    }

    /** draw the cell on the canvas
     * @param {CanvasRenderingContext2D} ctx
     * @param {Number} cellSize
     */
    draw(ctx, cellSize) {
        ctx.save();
        ctx.fillStyle = 'grey';
        // console.log(this.cells);
        for (const row of this.cells) {
            for (const cell of row) {
                cell.draw(ctx, cellSize);
            }
            // console.log(cell);
        }
        ctx.restore();
    }
}
