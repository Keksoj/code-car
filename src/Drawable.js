/**
 * This class is an equivalent of
 * an interface. All classes that
 * need to draw something to a context
 * must extends this class.
 */
export default class Drawable {
    /**
     * Draw into the context.
     * 
     * All childs of this class must implement
     * this method if they want to draw somethings.
     * @param {CanvasRenderingContext2D} ctx The context.
     */
    draw(ctx) { /* ... */ }
}