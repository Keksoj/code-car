/** draw the cell on the canvas
 * @property {Number} width
 * @property {Number} height
 */
export default class Map {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }

    /** draw the cell on the canvas
     * @param {CanvasRenderingContext2D} ctx
     * @param {Number} cellSize
     */
    draw(ctx, cellSize) {
        ctx.save();
        ctx.fillStyle = 'grey';
        for (var x = 0; x < this.width; x++) {
            for (var y = 0; y < this.height; y++) {
                ctx.fillRect(
                    x * cellSize - cellSize / 2,
                    y * cellSize - cellSize / 2,
                    cellSize - 1,
                    cellSize - 1
                );
            }
        }

        ctx.restore();
    }
}
