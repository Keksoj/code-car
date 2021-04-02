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
        this.obstacleRatio = obstacleRatio;
        this.startCellX;
        this.startCellY;
        this.carPosition;
        this.generateCheckedMap();
    }

    generateCheckedMap() {
        var counter = 0;
        do {
            this.generateCells();
            console.log(this.checkForDrivablePath());
            counter++;
            console.log(counter);
        } while (!this.checkForDrivablePath());
        console.log('Found drivable map after', counter, 'tries');
    }

    generateCells() {
        this.cells = [];
        // fill with empty cells and random obstacles
        for (var y = 0; y < this.height; y++) {
            var row = [];
            for (var x = 0; x < this.width; x++) {
                if (Math.random() < this.obstacleRatio) {
                    row.push(new Cell(x, y, 'obstacle'));
                } else {
                    row.push(new Cell(x, y, 'empty'));
                }
            }
            this.cells.push(row);
        }

        // Coordonnées de départ
        [this.startCellX, this.startCellY] = this.generateRandomCoordinates();

        // car
        this.carPosition = new Position(this.startCellX, this.startCellY);
        // console.log(this.carPosition);

        // start point
        this.cells[this.startCellY][this.startCellX].type = 'startpoint';

        // end point
        var endPointX, endPointY;
        do {
            [endPointX, endPointY] = this.generateRandomCoordinates();
        } while (endPointX == this.startCellX && endPointY == this.startCellY);
        this.cells[endPointY][endPointX].type = 'endpoint';

        // console.log(this.cells);
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
        var pathIsDrivable = false;

        // the first explored cell is the start cell
        exploredCells.push(this.cells[this.startCellY][this.startCellX]);
        console.log(exploredCells);

        // stop the search after as many tries as there are cells
        for (var i = 0; i < this.width * this.height; i++) {
            // créer un tableau temporaire
            var drivableNeighbors = [];

            // Pour chaque cellule déjà exploré ...
            for (const cell of exploredCells) {
                // console.log('we will find neighbors to:', cell);

                // créer un tableau de cellules voisines
                const neighboringCells = this.findNeighborsToCell(cell);

                // Pour chaque cellule voisine ...
                for (const neighbor of neighboringCells) {
                    // si la cellule est accessible, alors l'ajouter au tableau temporaire
                    if (neighbor.type == 'empty' || neighbor.type == 'endpoint') {
                        drivableNeighbors.push(neighbor);

                        // si la case correspond à la case d'arrivée, la fonction renverra true
                        if (neighbor.type == 'endpoint') {
                            pathIsDrivable = true;
                            console.log('victory!');
                        }
                    }
                }
            }
            // Pour chaque voisin nouvellement exploré ...
            for (const drivableNeighbor of drivableNeighbors) {
                // console.log(drivableNeighbor)
                // Si le voisin n'est pas déjà contenu dans la table exploredCells...
                if (!exploredCells.includes(drivableNeighbor)) {
                    //  ... ajouter la case à la liste des cases explorées
                    exploredCells.push(drivableNeighbor);
                }
            }
            // exploredCells.concat(drivableNeighbors);
            // console.log(exploredCells);
        }

        return pathIsDrivable;
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
