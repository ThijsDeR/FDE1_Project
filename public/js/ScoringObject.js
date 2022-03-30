export default class ScoringObject {
    /**
     * Construct a new instance of this class
     *
     * @param canvas the canvas on which the player should exist
     */
    constructor(canvas) {
        this.canvas = canvas;
        this.leftLane = this.canvas.width / 4;
        this.middleLane = this.canvas.width / 2;
        this.rightLane = (this.canvas.width / 4) * 3;
        const random = ScoringObject.randomInteger(1, 3);
        if (random === 1) {
            this.positionX = this.leftLane;
        }
        if (random === 2) {
            this.positionX = this.middleLane;
        }
        if (random === 3) {
            this.positionX = this.rightLane;
        }
        this.positionY = 60;
        this.speed = 1;
    }
    /**
     * Moves this object
     *
     * @param elapsed the time elapsed in ms since the previous update
     */
    move(elapsed) {
        this.positionY += this.speed * elapsed;
    }
    /**
     * Render this object to the canvas
     *
     * @param ctx The CanvasRenderingContext2D of the canvas to draw on
     */
    draw(ctx) {
        ctx.drawImage(this.image, 
        // Center the image in the lane with the x coordinates
        this.positionX - this.image.width / 2, this.positionY);
    }
    /**
     * Collision detection to the bottom of the canvas
     *
     * @returns `true` if this object collides with the bottom of the canvas
     */
    collidesWithCanvasBottom() {
        if (this.positionY + this.image.height > this.canvas.height) {
            return true;
        }
        return false;
    }
    /**
     * @returns the X-position of this object
     */
    getPositionX() {
        return this.positionX;
    }
    /**
     * @returns the Y-posisiotn of this object
     */
    getPositionY() {
        return this.positionY;
    }
    /**
     * @returns the width of the image of this object
     */
    getImageWidth() {
        return this.image.width;
    }
    /**
     * @returns the height of the image of this object
     */
    getImageHeight() {
        return this.image.height;
    }
    /**
     * @returns the score of this object
     */
    getPoints() {
        return this.points;
    }
    /**
     * Loads an image in such a way that the screen doesn't constantly flicker
     *
     *
     * NOTE: this is a 'static' method. This means that this method must be called like
     * `Game.loadNewImage()` instead of `this.loadNewImage()`.
     *
     * @param source The address or URL of the a media resource that is to be loaded
     * @returns an HTMLImageElement with the source as its src attribute
     */
    static loadNewImage(source) {
        const img = new Image();
        img.src = source;
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
    static randomInteger(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }
}
