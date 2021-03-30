// JavaScript source code
// Cr�ation classe Car

// TODO: Use matrix instead raw orientation etc...?

import Position from './Position.js';
import Bounds from './Bounds.js';

/**
 * @typedef {'N' | 'E' | 'S' | 'O'} Orientation Represent an orientation (North, East, South, West).
 */

/** @type Orientation[] */
const ORIENTATIONS = ['N', 'E', 'S', 'O'];

export default class Car {
    /** @type Position - The car position. */
    position;

    /** @type number - The car orientation. */
    orientation;

    /** @type Bounds - The car bounds. */
    bounds;

    /** @type Bounds - The map bounds */
    mapBounds;

    /**
     * Create new Car instance.
     * @param {Position} position The car position.
     * @param {Orientation} orientation The car orientation.
     */
    constructor(position, orientation) {
        this.position = position;
        this.orientation = ORIENTATIONS.indexOf(orientation);
    }

    /**
     * Return the current car orientation.
     */
    getOrientation() {
        return ORIENTATIONS[ORIENTATIONS.indexOf(this.orientation)];
    }

    /**
     * Set the car orientation.
     * @param {Orientation | number} orientation The new car orientation.
     */
    setOrientation(orientation) {
        this.orientation =
            typeof orientation === 'number' ? orientation : ORIENTATIONS.indexOf(orientation);
    }

    /**
     * Called when the car is outside of the map.
     */
    onCarIsOutside() {
        console.log(
            'Flash info : un accident est survenu sur le périphérique Nord de Canvas-city. Une candidature est morte sur le coup.'
        );
    }

    /**
     * Move forward.
     * @param {number} nbCases The amount of cell to move
     */
    moveForward(nbCases) {
        switch (this.orientation) {
            case 0:
                if (this.position.y > nbCases) {
                    this.position.y -= nbCases;
                } else {
                    this.onCarIsOutside();
                }
                break;
            case 1:
                if (this.position.x < TAILLEMAX_X - CANVAS - nbCases) {
                    this.position.x += nbCases;
                } else {
                    this.onCarIsOutside();
                }
                break;
            case 2:
                if (this.position.y < TAILLEMAX_Y - CANVAS - nbCases) {
                    this.position.y += nbCases;
                } else {
                    this.onCarIsOutside();
                }
                break;
            case 3:
                if (this.position.x > nbCases) {
                    this.position.x -= nbCases;
                } else {
                    this.onCarIsOutside();
                }
                break;
        }
    }

    /**
     * Move backward
     * @param {number} nbCases The amount of cell to move
     */
    moveBack(nbCases) {
        switch (this.orientation) {
            case 0:
                this.position.y += nbCases;
                break;
            case 1:
                if (this.position.x > nbCases) {
                    this.position.x -= nbCases;
                }
                break;
            case 2:
                if (this.position.y > nbCases) {
                    this.position.y -= nbCases;
                }
                break;
            case 3:
                this.position.x += nbCases;
                break;
        }
    }

    /**
     * Move the car to his left.
     */
    turnLeft() {
        this.setOrientation((this.orientation + 4) % 4);
        this.moveForward(1);
    }

    /**
     * Move the car to his right.
     */
    turnRight() {
        this.setOrientation((this.orientation + 1) % 4);
        this.moveForward(1);
    }

    /**
     * draw the car on the grid
     * @param {CanvasRenderingctx2D} ctx
     */
    draw(ctx, cellSize) {
        var triangleWidth = cellSize / 2;
        var triangleHeight = cellSize / 1.2;
        var originY = triangleHeight / 2;
        var originX = triangleWidth / 2;

        ctx.save();

        ctx.fillStyle = 'rgb(0, 0, 0)';

        // ctx.translate(100, 200);
        ctx.translate(
            this.position.y * cellSize + cellSize / 2,
            this.position.x * cellSize + cellSize / 2
        );
        ctx.rotate(this.orientation * (Math.PI / 2));

        ctx.beginPath();
        ctx.fillRect(
            (triangleWidth / 2) * 0.8 + triangleWidth / 2 - originX - 2,
            triangleHeight * 0.8 - originY - 5,
            4,
            10
        );
        ctx.fillRect(
            (triangleWidth / 2) * 0.2 - originX - 2,
            triangleHeight * 0.8 - originY - 5,
            4,
            10
        );
        ctx.fillRect(
            (triangleWidth / 2) * 0.4 + triangleWidth / 2 - originX - 2,
            triangleHeight * 0.4 - originY - 5,
            4,
            10
        );
        ctx.fillRect(
            (triangleWidth / 2) * 0.6 - originX - 2,
            triangleHeight * 0.4 - originY - 5,
            4,
            10
        );
        ctx.fillStyle = 'rgb(255, 0, 0)';
        ctx.moveTo(triangleWidth / 2 - originX, 0 - originY);
        ctx.lineTo(triangleWidth - originX, triangleHeight - originY);
        ctx.lineTo(0 - originX, triangleHeight - originY);
        ctx.lineTo(triangleWidth / 2 - originX, 0 - originY);
        ctx.fill();
        ctx.closePath();
        ctx.restore();
    }
}
