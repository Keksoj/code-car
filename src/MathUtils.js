import Number2 from "./Number2.js";
import Number3 from "./Number3.js";

/**
 * A dot product.
 * @param {Number2 | Number3} a First component
 * @param {Number2 | Number3} b Second component.
 */
export function Dot(a, b) {
    if(a instanceof Number2)
        return a.x * b.x + a.y * b.y;
    else
        return a.x * b.x + a.y * b.y + a.z * b.z;
}