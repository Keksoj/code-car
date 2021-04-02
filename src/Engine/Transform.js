import Mat3x3  from "./Math/Mat3x3.js";
import Number2 from "./Math/Number2.js";

export default class Transform {
    /**
     *  The translation matrix.
     *  @type {Mat3x3}
     */
    tMatrix;

    /**
     *  The rotation matrix.
     *  @type {Mat3x3}
     */
    rMatrix;

    /**
     *  The scale matrix.
     *  @type {Mat3x3}
     */
    sMatrix;

    /**
     * Create new transform !
     */
    constructor() {
        this.tMatrix = Mat3x3.translationMatrix(new Number2());
        this.rMatrix = Mat3x3.rotationMatrix(0);
        this.sMatrix = Mat3x3.scaleMatrix(new Number2(1))
    }

    /**
     * Set the transform rotation.
     * @param {number} angle The rotation angle (in radian) on the z axis.
     */
    setRotation(angle) {
        this.rMatrix = Mat3x3.rotationMatrix(angle);
    }

    /**
     * Set the transform scale.
     * @param {Number2} scale The new scale.
     */
    setScale(scale) {
        this.sMatrix = Mat3x3.scaleMatrix(scale)
    }

    /**
     * Get the transformation matrix.
     * @returns The transform matrix.
     */
    getTRS() {
        return Mat3x3.mul(this.sMatrix, Mat3x3.mul(this.rMatrix, this.tMatrix));
    }
}