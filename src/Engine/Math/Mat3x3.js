import { Dot } from "./MathUtils.js";
import Number2 from "./Number2.js";
import Number3 from "./Number3.js";

/**
 *  NOTE: All matrix operations was
 *  not optimized so be carefull when
 *  you heavly use them...
 * 
 *  
 *  const a = new Number2(0, 1);
 *  const rm = Mat3x3.rotationMatrix(Math.PI / 2.0);
 *  console.log(Mat3x3.mul(rm, a));
 */

/**
 * A 3x3 matrix.
 */
export default class Mat3x3 {

    /**
     * Create new 3x3 matrix.
     * @param {number[]} values Matrix values.
     */
    constructor(values) {
        this.values = values;
    }

    /**
     * Get matrix row.
     * @param {number} index The row index.
     * @returns The matrix row.
     */
    GetRow(index) {
        const startIndex = index * 3;

        return new Number3(
            this.values[startIndex    ], 
            this.values[startIndex + 1], 
            this.values[startIndex + 2]
        );
    }

    /**
     * Get matrix column.
     * @param {number} index The column index.
     * @returns The matrix column.
     */
    GetColumn(index) {
        return new Number3(
            this.values[index    ], 
            this.values[index + 3], 
            this.values[index + 6]
        );
    }

    /**
     * Get the identity matrix.
     * @returns The identity matrix.
     */
    static identity() {
        return new Mat3x3([
            1, 0, 0,
            0, 1, 0,
            0, 0, 1,
        ]);
    }

    /**
     * Create a translation matrix.
     * @param {Number2} p The position.
     * @returns The translation matrix.
     */
    static translationMatrix(p) {
        return new Mat3x3([
            1, 0, p.x,
            0, 1, p.y,
            0, 0, 1  ,
        ]);
    }

    /**
     * Create a scale matrix.
     * @param {Number2} s The scale.
     * @returns The scale matrix.
     */
    static scaleMatrix(s) {
        return new Mat3x3([
            s.x, 0  , 0,
            0  , s.y, 0,
            0  , 0  , 1,
        ]);
    }

    /**
     * Create a rotation matrix.
     * @param {number} a The rotation angle (in radians).
     * @returns The rotation matrix.
     */
     static rotationMatrix(a) {
        return new Mat3x3([
             Math.cos(a), Math.sin(a), 0,
            -Math.sin(a), Math.cos(a), 0,
            0           , 0          , 1,
        ]);
    }

    /**
     * Matrix multiplication.
     * @param {Mat3x3} a First matrix.
     * @param {Mat3x3 | Number2} b Second matrix.
     */
    static mul(a, b) {
        if(b instanceof Mat3x3)
            return new Mat3x3([
                Dot(a.GetRow(0), b.GetColumn(0)), Dot(a.GetRow(0), b.GetColumn(1)), Dot(a.GetRow(0), b.GetColumn(2)),
                Dot(a.GetRow(1), b.GetColumn(0)), Dot(a.GetRow(1), b.GetColumn(1)), Dot(a.GetRow(1), b.GetColumn(2)),
                Dot(a.GetRow(2), b.GetColumn(0)), Dot(a.GetRow(2), b.GetColumn(1)), Dot(a.GetRow(2), b.GetColumn(2)),
            ]);
        else {
            const n3 = new Number3(b, 1);
            return new Number2(
                Dot(a.GetRow(0), n3),
                Dot(a.GetRow(1), n3)
            );
        }
    }
}