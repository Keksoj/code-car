/**
 * Represent a 2D Coordinates position.
 */
export default class Position {
    /**
     * Create new Position instance.
     * @param {number} x The coordinate on the horizontal axis.
     * @param {number} y The coordinate on the vertical axis.
     */
    constructor(x, y) {
        // Just perform some check on both axis
        if (isNaN(x)) throw new Error("Can't create Position: x axis is not a number !");
        if (isNaN(y)) throw new Error("Can't create Position: y axis is not a number !");

        this.x = x;
        this.y = y;
    }

    /**
     * Perform an addition with another position or number.
     * @param {Position | number} rhs The position to add from.
     */
    add(rhs) {
        if (rhs instanceof Position) {
            this.x += rhs.x;
            this.y += rhs.y;
        } else {
            this.x += rhs;
            this.y += rhs;
        }
    }

    /**
     * Perform an substraction with another position or number.
     * @param {Position | number} rhs The position to add from.
     */
    sub(rhs) {
        if (rhs instanceof Position) {
            this.x -= rhs.x;
            this.y -= rhs.y;
        } else {
            this.x -= rhs;
            this.y -= rhs;
        }
    }
}
