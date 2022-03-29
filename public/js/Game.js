export default class Game {
    /**
     * The constructor of Game
     *
     * @param canvas the playing field
     */
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
    }
    /**
     * Method that starts the game.
     */
    start() {
        this.ctx.fillStyle = 'red';
        this.ctx.fillRect(0, 0, 100, 100);
    }
    /**
     * Method that returns the canvas
     *
     * @returns The canvas
     */
    getCanvas() {
        return this.canvas;
    }
    /**
     * Method that loads a new image
     *
     * @param src Source of the image
     * @param width Width of the image
     * @param height Height of the image
     * @returns The new image
     */
    static loadNewImage(src, width = undefined, height = undefined) {
        const img = new Image();
        img.src = src;
        if (width)
            img.width = width;
        if (height)
            img.height = height;
        return img;
    }
    /**
     * Generates a random integer number between min and max
     *
     * NOTE: this is a 'static' method. This means that this method must be called like
     * `Game.randomInteger()` instead of `this.randomInteger()`.
     *
     * @param min - minimal time
     * @param max - maximal time
     * @returns a random integer number between min and max
     */
    static randomNumber(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }
}
