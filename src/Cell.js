/**
 * @typedef { 'empty' | 'obstacle' | 'startpoint'| 'endpoint'} CellType Type de cellule
 */

export default class Cell {
    /**
     *
     * @param {Number} x
     * @param {Number} y
     * @param {CellType} type
     */
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.type = type;
    }

    draw(ctx, cellSize) {
        ctx.save();

        switch (this.type) {
            case 'empty':
                ctx.fillStyle = 'grey';
                break;
            case 'obstacle':
                ctx.fillStyle = 'black';
                break;
            case "startpoint":
                ctx.fillStyle = 'pink';
                break;
            case 'endpoint':
                ctx.fillStyle = 'green';
                break;
        }

        ctx.fillRect(this.x * cellSize, this.y * cellSize, cellSize - 1, cellSize - 1);

        ctx.restore();
    }
}
