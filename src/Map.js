import Cell from "./Cell.js";
import Position from "./Position.js";
import Drawable from "./Drawable.js";

/**
 * @typedef Size An object that contains size infos.
 * @property {number} width The width value.
 * @property {number} height The height value.
 */

/**
 * @typedef MapSettings
 * @property {number} obstacleRatio Probability to have obstacles.
 * @property {number} cellSize Size of cells in the map.
 */

export default class Map extends Drawable {
    /**
     * Array that contains all cells in
     * the map.
     * 
     * @type {Cell[][]}
     */
    cells = [];

    /**
     * The cell position where the player
     * start.
     * 
     * @type {Position}
     */
    startPoint;

    /**
     * The cell position where the player
     * need to reach.
     * 
     * @type {Position}
     */
    endPoint;

    /**
     * The amount of cell for each axis.
     * 
     * @type {Position}
     */
    cellAmount;
    

    /**
     * Create new Map
     * @param {HTMLCanvasElement} canvas The canvas where the map must be draw.
     * @param {MapSettings} settings The map settings.
     */
    constructor(canvas, settings) {
        super();

        this.cellAmount = new Position(
            canvas.width  / settings.cellSize,
            canvas.height / settings.cellSize
        );

        this.settings = settings;
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

    /**
     * Generate a random 2D coordinates.
     * 
     * @returns {Position} Random 2D coordinates.
     */
    generateRandomCoordinates() {
        const x = Math.floor(Math.random() * this.cellAmount.x);
        const y = Math.floor(Math.random() * this.cellAmount.y);

        return new Position(x, y);
    }

    /**
     * Generate random walls, start point and end point.
     */
    generateCells() {

        this.cells = [];

        // fill with empty cells and random obstacles
        for (let x = 0; x < this.cellAmount.x; x++) {
            const col = [];

            for (let y = 0; y < this.cellAmount.y; y++) {
                const rand = Math.random();
                col.push(new Cell(x, y, rand < this.settings.obstacleRatio ? 'obstacle' : 'empty'));
            }

            this.cells.push(col);
        }

        const startCoords = this.generateRandomCoordinates();

        this.cells[startCoords.x][startCoords.y].type = 'startpoint';
        this.startPoint = startCoords;

        let endCoords;
        do {
            endCoords = this.generateRandomCoordinates();
        } while (endCoords.x === startCoords.x && endCoords.y === startCoords.y);

        this.cells[endCoords.x][endCoords.y].type = 'endpoint';
    }

    /**
     * checks if a path exists to the end point, returns a bool
     * @returns {boolean}
     */
     checkForDrivablePath() {
        var exploredCells = [];
        var pathIsDrivable = false;

        // the first explored cell is the start cell
        exploredCells.push(this.cells[this.startPoint.x][this.startPoint.y]);
        console.log(exploredCells);

        const totalAmount = this.cellAmount.x * this.cellAmount.y;

        // stop the search after as many tries as there are cells
        for (var i = 0; i < totalAmount; i++) {

            // créer un tableau temporaire
            var drivableNeighbors = [];

            // Pour chaque cellule déjà explorée...
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
            neighbors.push(this.cells[cell.x - 1][cell.y]);
        }

        // check for the right wall and push WEST neighbor
        if (cell.x < this.width - 1) {
            neighbors.push(this.cells[cell.x + 1][cell.y]);
        }

        // check for the top wall and push the NORTH neighbor
        if (cell.y != 0) {
            neighbors.push(this.cells[cell.x][cell.y - 1]);
        }

        // check for the top wall and push the NORTH neighbor
        if (cell.y < this.height - 1) {
            neighbors.push(this.cells[cell.x][cell.y + 1]);
        }
        
        // console.debug('neighbors:', neighbors);
        return neighbors;
    }

    /**
     * 
     * @param {CanvasRenderingContext2D} ctx The context.
     */
    draw(ctx) {
        for(let i = 0; i < this.cells.length; i++)
            for(let j = 0; j < this.cells[i].length; j++)
                this.cells[i][j].draw(ctx, this.settings.cellSize);
    }
}