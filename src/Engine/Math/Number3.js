import Number2 from "./Number2.js";

/**
 * Just a group of two numbers.
 * Usefull to represent a 3D vector
 * for exemple.
 */
 export default class Number3 {
    /**
     * Create new Number3 !
     * @param {(number | Number2)=} x First component.
     * @param {number=} y Second component.
     * @param {number=} z Third component.
     */
    constructor(x = 0, y = 0, z = 0) {
        if(x instanceof Number2) {
            this.x = x.x;
            this.y = x.y;
            this.z = y;
        } else {
            this.x = x;
            this.y = y;
            this.z = z;
        }
    }
}