import Drawable from './Engine/Drawable.js';
import Number2 from './Engine/Math/Number2.js'

/**
 * @typedef { 'empty' | 'obstacle' | 'startpoint'| 'endpoint'} CellType Type de cellule
 */

export default class Cell extends Drawable {
    /**
     * Create new cell !
     * @param {Number2} pos The cell position.
     * @param {number} size The size of the cell.
     * @param {CellType} type The type of cell.
     */
    constructor(pos, size, type) {
        super();

        this.pos  = pos;
        this.type = type;
        this.size = size;
    }

    /**
     * @param {CanvasRenderingContext2D} ctx The context.
     */
    draw(ctx) {
        ctx.save();

        switch (this.type) {
            case 'empty':
                ctx.fillStyle = 'grey';
                break;
            case 'obstacle':
                ctx.fillStyle = 'black';
                break;
            case 'startpoint':
                ctx.fillStyle = 'pink';
                break;
            case 'endpoint':
                ctx.fillStyle = 'green';
                break;
        }

        ctx.fillRect(this.pos.x * this.size, this.pos.y * this.size, this.size - 1, this.size - 1);
        ctx.restore();
    }
}
