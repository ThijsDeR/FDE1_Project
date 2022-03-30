import GameLoop from './GameLoop.js';
import Player from './Player.js';
import GoldTrophy from './GoldTrophy.js';
import LightningBolt from './LightningBolt.js';
import RedCross from './RedCross.js';
import SilverTrophy from './SilverTrophy.js';
import Healthbar from './Healthbar.js';
/**
 * Main class of this Game.
 */
export default class Game {
    /**
     * Construct a new Game
     *
     * @param canvas The canvas HTML element to render on
     */
    constructor(canvas) {
        this.canvas = canvas;
        // Resize the canvas so it looks more like a Runner game
        this.canvas.width = window.innerWidth / 3;
        this.canvas.height = window.innerHeight;
        this.scoringObjects = [];
        this.createRandomScoringObject();
        // Set the player at the center
        this.player = new Player(this.canvas);
        // Score is zero at start
        this.totalScore = 0;
        this.healthbar = new Healthbar(this.canvas);
        // Start the animation
        console.log('start animation');
        this.gameloop = new GameLoop(this);
        this.gameloop.start();
    }
    /**
     * Handles any user input that has happened since the last call
     */
    processInput() {
        // Move player
        this.player.move();
    }
    /**
     * Advances the game simulation one step. It may run AI and physics (usually
     * in that order)
     *
     * @param elapsed the time in ms that has been elapsed since the previous
     *   call
     * @returns `true` if the game should stop animation
     */
    update(elapsed) {
        // Spawn a new scoring object every 45 frames
        if (this.gameloop.frameCount % 45 === 0) {
            this.createRandomScoringObject();
        }
        // Move objects
        // Could also be a regular for loop
        this.scoringObjects.forEach((scoringObject) => {
            scoringObject.move(elapsed);
            if (this.player.collidesWith(scoringObject)) {
                this.totalScore += scoringObject.getPoints();
                this.removeItemFromScoringObjects(scoringObject);
            }
            else if (scoringObject.collidesWithCanvasBottom()) {
                this.removeItemFromScoringObjects(scoringObject);
            }
        });
        return false;
    }
    /**
     * Draw the game so the player can see what happened
     */
    render() {
        // Render the items on the canvas
        // Get the canvas rendering context
        const ctx = this.canvas.getContext('2d');
        // Clear the entire canvas
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.writeTextToCanvas('UP arrow = middle | LEFT arrow = left |  arrow = right', this.canvas.width / 2, 40, 14);
        this.drawScore();
        this.player.draw(ctx);
        this.healthbar.healthbar(ctx);
        // Could also be a regular for loop
        this.scoringObjects.forEach((scoringObject) => {
            scoringObject.draw(ctx);
        });
    }
    /**
     * Draw the score on a canvas
     */
    drawScore() {
        this.writeTextToCanvas(`Score: ${this.totalScore}`, this.canvas.width / 2, 80, 16);
    }
    /**
     * Create a random scoring object and clear the other scoring objects by setting them to `null`.
     */
    createRandomScoringObject() {
        const random = Game.randomInteger(1, 4);
        if (random === 1) {
            this.scoringObjects.push(new GoldTrophy(this.canvas));
        }
        if (random === 2) {
            this.scoringObjects.push(new SilverTrophy(this.canvas));
        }
        if (random === 3) {
            this.scoringObjects.push(new RedCross(this.canvas));
        }
        if (random === 4) {
            this.scoringObjects.push(new LightningBolt(this.canvas));
        }
    }
    /**
     * Removes an item from the this.scoringObjects array.
     * Could also be written using a filter
     *
     * @param item To be removed
     */
    removeItemFromScoringObjects(item) {
        const index = this.scoringObjects.indexOf(item);
        this.scoringObjects.splice(index, 1);
    }
    /**
     * Writes text to the canvas
     *
     * @param text - Text to write
     * @param xCoordinate - Horizontal coordinate in pixels
     * @param yCoordinate - Vertical coordinate in pixels
     * @param fontSize - Font size in pixels
     * @param color - The color of the text
     * @param alignment - Where to align the text
     */
    writeTextToCanvas(text, xCoordinate, yCoordinate, fontSize = 20, color = 'red', alignment = 'center') {
        const ctx = this.canvas.getContext('2d');
        ctx.font = `${fontSize}px sans-serif`;
        ctx.fillStyle = color;
        ctx.textAlign = alignment;
        ctx.fillText(text, xCoordinate, yCoordinate);
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
