export default class Mat3x3 {

    constructor(rows) {
        this.rows = rows;
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
     * Multiply two matrices.
     * @param {Mat3x3} a First matrix.
     * @param {Mat3x3} b Second matrix.
     */
    static mul(a, b) {
        
    }
}