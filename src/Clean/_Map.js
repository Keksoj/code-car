import Cell from "../Cell.js";
import Position from "../Position.js";
import Drawable from "./_Drawable.js";

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

        this.generateCells();
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
     * 
     * @param {CanvasRenderingContext2D} ctx The context.
     */
    draw(ctx) {
        for(let i = 0; i < this.cells.length; i++)
            for(let j = 0; j < this.cells[i].length; j++)
                this.cells[i][j].draw(ctx, this.settings.cellSize);
    }
}