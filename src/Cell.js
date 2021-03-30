export default class Cell {
    /**
     *
     * @param {Number} x
     * @param {Number} y
     * @param {String} type
     */
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.type = type;
    }

    draw(ctx, cellSize) {
        ctx.save();
        if (this.type == 'empty') {
            ctx.fillStyle = 'grey';
        } else {
            ctx.fillStyle = 'black';
        }

        ctx.fillRect(this.x * cellSize, this.y * cellSize, cellSize - 1, cellSize - 1);

        ctx.restore();
    }
}
