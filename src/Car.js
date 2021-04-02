// JavaScript source code
// Cr�ation classe Car

// TODO: Use matrix instead raw orientation etc...?

import Map from './Map.js';

import Drawable from './Engine/Drawable.js';
import Number2  from './Engine/Math/Number2.js';

/**
 * @typedef {'N' | 'E' | 'S' | 'O'} Orientation Represent an orientation (North, East, South, West).
 */

/** @type Orientation[] */
const ORIENTATIONS = ['N', 'E', 'S', 'O'];

export default class Car extends Drawable {
    /** @type {Number2} - The car position. */
    position;

    /** @type {number} - The car orientation. */
    orientation;

    /** 
     * The map where the car is.
     * 
     * @type {Map} 
     */
    map;

    /**
     * Create new Car instance.
     * @param {Number2} position The car position.
     * @param {Orientation} orientation The car orientation.
     * @param {Map} map The map where the car is.
     */
    constructor(position, orientation, map) {
        super();

        this.position = position;
        this.orientation = ORIENTATIONS.indexOf(orientation);
        this.map = map;
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
                if (this.position.y - nbCases >= 0)
                    this.position.y -= nbCases;
                else
                    this.onCarIsOutside();
                break;
            case 1:
                if (this.position.x + nbCases < this.map.cellAmount.x)
                    this.position.x += nbCases;
                else
                    this.onCarIsOutside();
                break;
            case 2:
                if (this.position.y + nbCases < this.map.cellAmount.y)
                    this.position.y += nbCases;
                else
                    this.onCarIsOutside();
                break;
            case 3:
                if (this.position.x - nbCases >= 0)
                    this.position.x -= nbCases;
                else
                    this.onCarIsOutside();
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
     * @param {CanvasRenderingContext2D} ctx The context.
     */
    draw(ctx) {
        
        var triangleWidth  = this.map.settings.cellSize / 2;
        var triangleHeight = this.map.settings.cellSize / 1.2;

        var originY = triangleHeight / 2;
        var originX = triangleWidth  / 2;

        ctx.save();

        ctx.fillStyle = 'rgb(0, 0, 0)';

        ctx.translate(
            this.position.x * this.map.settings.cellSize + this.map.settings.cellSize / 2,
            this.position.y * this.map.settings.cellSize + this.map.settings.cellSize / 2
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
