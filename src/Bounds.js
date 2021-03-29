import Position from './Position.js';

/**
 * Represent 2D boundaries.
 */
export default class Bounds {

    /**
     * Create new boundaries.
     * @param {Position} position The bounds center.
     * @param {Position} size The bounds size.
     */
    constructor(position, size) {
        this.position = position;
        this.size = size;

        this.min = new Position(position.x - size.x / 2, position.y - size.y / 2);
        this.max = new Position(position.x + size.x / 2, position.y + size.y / 2);
    }

    /**
     * Check if a position was inside this bound (`true`) otherwise (`false`).
     * @param { Position | Bounds } pos The position or bounds to check.
     */
    isInside(pos) {
        if(pos instanceof Position)
            return (pos.x >= this.min.x) && 
                   (pos.y >= this.min.y) && 
                   (pos.x <= this.max.x) && 
                   (pos.y <= this.max.y);
        else
            return (pos.min.x >= pos.min.x) && 
                   (pos.max.x <= pos.max.x) && 
                   (pos.min.y >= pos.min.y) && 
                   (pos.max.y <= pos.max.y);
    }
}