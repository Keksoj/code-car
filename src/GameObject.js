import Game from './Game.js';
import Drawable from './Engine/Drawable.js';

/**
 * General behaviour of any game suboject
 * @param {Game}
 */
export default class GameObject extends Drawable {
    /**
     * @type {Game}
     */
    game;

    constructor() {
        super();
        this.game = null;
    }

    /**
     * Please implement this. This is mandatory.
     * Or I will hunt you down
     */
    onInit() {}
}
