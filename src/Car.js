// JavaScript source code
// Cr�ation classe Car

import Position from './Position.js';

/**
 * @typedef {'N' | 'E' | 'S' | 'O'} Orientation Represent an orientation (North, East, South, West).
 */

/** @type Orientation[] */
const ORIENTATIONS = ['N', 'E', 'S', 'O'];

export default class Car {
    /** @type Position The car position. */
    position;

    /** @type number The car orientation. */
    orientation;

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

    // m�thodes pour les mouvements de la voiture

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
                    console.log(
                        'Flash info : un accident est survenu sur le périphérique Nord de Canvas-city. Une candidature est morte sur le coup.'
                    );
                }
                break;
            case 1:
                if (this.position.x < TAILLEMAX_X - CANVAS - nbCases) {
                    this.position.x += nbCases;
                } else {
                    console.log(
                        'Flash info : un accident est survenu sur le périphérique Est de Canvas-city. Une candidature est morte sur le coup.'
                    );
                }
                break;
            case 2:
                if (this.position.y < TAILLEMAX_Y - CANVAS - nbCases) {
                    this.position.y += nbCases;
                } else {
                    console.log(
                        'Flash info : un accident est survenu sur le périphérique Sud de Canvas-city. Une candidature est morte sur le coup.'
                    );
                }
                break;
            case 3:
                if (this.position.x > nbCases) {
                    this.position.x -= nbCases;
                } else {
                    console.log(
                        'Flash info : un accident est survenu sur le périphérique Ouest de Canvas-city. Une candidature est morte sur le coup.'
                    );
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

    turnLeft() {
        this.orientation += 4 % 4;
        this.moveForward(1);
    }

    turnRight() {
        this.orientation += 1 % 4;
        this.moveForward(1);
    }
}
