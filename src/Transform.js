import Mat3x3 from "./Mat3x3.js";
import Number2 from "./Number2.js";

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

    constructor() {
        this.tMatrix = Mat3x3.translationMatrix(new Number2());
        this.rMatrix = Mat3x3.rotationMatrix(0);
        this.sMatrix = Mat3x3.scaleMatrix(new Number2(1))
    }

    setRotation(angle) {
        this.rMatrix = Mat3x3.rotationMatrix(angle);
    }

    getTRS() {
        return Mat3x3.mul(this.sMatrix, Mat3x3.mul(this.rMatrix, this.tMatrix));
    }
}