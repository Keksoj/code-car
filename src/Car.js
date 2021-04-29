// JavaScript source code
// Creation classe Car

// TODO: Use matrix instead raw orientation etc...?

import Map from './Map.js';

import Drawable from './Engine/Drawable.js';
import Number2 from './Engine/Math/Number2.js';
import instructionSet from './Jacklang/jacklang.js';

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
        this.instructions = [];
    }

    /**
     *
     * @param {[String]} instructions a list of english commands
     */
    setInstructions(instructions) {
        this.instructions = instructions.reverse();
    }

    /**
     * Execute the instruction queue
     */
    executeOneInstruction() {
        if (this.instructions.length > 0) {
            console.log(this.instructions[0]);
            switch (this.instructions.pop()) {
                case 'forward':
                    this.moveForward(1);
                    break;
                case 'backward':
                    this.moveForward(-1);
                    break;
                case 'left':
                    this.turnLeft();
                    break;
                case 'right':
                    this.turnRight();
                    break;
            }
        }
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
     * @param {number} driveDistance The amount of cell to move
     */
    moveForward(driveDistance) {
        const futurePosition = this.computeFuturePosition(driveDistance);
        console.log(this.position, futurePosition);
        if (this.collisionOccurs(futurePosition)) {
            console.log('woops collision');
        } else {
            this.position = futurePosition;
        }
    }

    /**
     * Move forward.
     * @param {number} driveDistance The amount of cell to move
     * @returns {Number2} futurePosition
     */
    computeFuturePosition(driveDistance) {
        var futurePosition = this.position;
        switch (this.orientation) {
            case 0:
                futurePosition.y = this.position.y - driveDistance;
                break;
            case 1:
                futurePosition.x = this.position.x + driveDistance;
                break;
            case 2:
                futurePosition.y = this.position.y + driveDistance;
                break;
            case 3:
                futurePosition.x = this.position.x - driveDistance;
                break;
        }
        return futurePosition;
    }

    /**
     * detect collisions
     * @param {Number2} the future position to check collisions for
     * @returns {boolean}
     */
    collisionOccurs(futurePosition) {
        if (
            futurePosition.x > this.map.cellAmount.x ||
            futurePosition.x < 0 ||
            futurePosition.y > this.map.cellAmount.y ||
            futurePosition.y < 0
        ) {
            console.log(
                'Flash info : un accident est survenu sur le périphérique Nord de Canvas-city. Une candidature est morte sur le coup.'
            );
            return true;
        }
        const goalCell = this.map.cells[futurePosition.x][futurePosition.y];
        if (goalCell.type == 'obstacle') {
            console.log('You hit a block dumbass');
            return true;
        }
        return false;
    }
    /**
     * Move the car to its left.
     */
    turnLeft() {
        this.setOrientation((this.orientation + 3) % 4);
    }

    /**
     * Move the car to its right.
     */
    turnRight() {
        this.setOrientation((this.orientation + 1) % 4);
    }

    /**
     * @param {CanvasRenderingContext2D} ctx The context.
     */
    draw(ctx) {
        var triangleWidth = this.map.settings.cellSize / 2;
        var triangleHeight = this.map.settings.cellSize / 1.2;

        var originY = triangleHeight / 2;
        var originX = triangleWidth / 2;

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
