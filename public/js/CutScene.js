import KeyboardListener from './KeyListener.js';
export default class CutScene {
    /**
     * Constructor of CutScene
     *
     * @param canvas The game canvas
     * @param userData The data of the user
     */
    constructor(canvas, userData) {
        this.canvas = canvas;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext('2d');
        this.userData = userData;
        this.keyboardListener = new KeyboardListener();
    }
}
