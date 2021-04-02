/**
 * Just a group of two numbers.
 * Usefull to represent a 2D vector
 * for exemple.
 */
export default class Number2 {
    /**
     * Create new Number2 !
     * @param {number} x First component.
     * @param {number=} y Second component.
     */
    constructor(x = 0, y) {
        this.x = x;
        this.y = y == null ? x : y;
    }
}