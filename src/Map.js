export default class Map {
    constructor(ctx, width, height) {
        this.ctx = ctx;
        this.width = width;
        this.height = height;
    }

    /** draw the cell on the canvas
     * @param {CanvasRenderingContext2D} ctx
     * @param {Number} cellSize
     */
    draw(cellSize) {
        this.ctx.save();
        this.ctx.fillStyle = 'grey';
        for (x = 0; x < this.width; x++) {
            for (y = 0; y < this.height; y++) {
                this.ctx.fillRect(
                    x * cellSize - cellSize / 2,
                    y * cellSize - cellSize / 2,
                    cellSize,
                    cellSize
                );
            }
        }

        this.ctx.restore();
    }
}
