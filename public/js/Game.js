import GameLoop from './GameLoop.js';
import Player from './Player.js';
import Staminabar from './Staminabar.js';
import UserData from './UserData.js';
import Situation from './Situation.js';
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
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        // Set the player at the center
        this.player = new Player(this.canvas.width / 2 + 25, this.canvas.height * (3 / 4), 0, 0, this.canvas.width / 8, this.canvas.height / 4);
        this.userData = new UserData();
        // Score is zero at start
        this.totalScore = 0;
        this.staminabar = new Staminabar(this.canvas, 530, 100, this.canvas.width / 3, 20);
        // Start the animation
        this.gameloop = new GameLoop(this);
        this.gameloop.start();
        console.log('werkt!!');
        this.counter = 0;
        // the initial image height
        this.imgHeight = 0;
        // the scroll speed
        // an important thing to ensure here is that can.height
        // is divisible by scrollSpeed
        this.scrollSpeed = 0.2;
        this.gameOver = false;
        this.buttons = [];
    }
    newSituation() {
        this.situation = new Situation({
            xPos: this.canvas.width / 2,
            yPos: 0,
            xVel: 0,
            yVel: this.scrollSpeed,
            width: 100,
            height: 100,
        }, {
            xPos: (this.canvas.width / 4) * 3,
            yPos: 0,
            xVel: 0,
            yVel: this.scrollSpeed,
            width: 100,
            height: 100,
        }, 5);
    }
    /**
     * Handles any user input that has happened since the last call
     */
    processInput() {
        // Move player
        this.player.move();
        if (this.situation)
            this.situation.checkButton(this.player, this.canvas);
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
        this.player.update(elapsed);
        // Spawn a new scoring object every 45 frames
        this.scrollBackground(elapsed);
        if (this.situation) {
            this.situation.update(elapsed);
            this.situation.move(elapsed);
            if (this.situation.isDone())
                this.situation = null;
        }
        if (this.counter % 2000 === 1) {
            this.newSituation();
        }
        return false;
    }
    /**
     * Draw the game so the player can see what happened
     */
    render() {
        if (this.gameOver)
            return;
        // Render the items on the canvas
        // Get the canvas rendering context
        const ctx = this.canvas.getContext('2d');
        // Clear the entire canvas
        ctx.fillStyle = `black`;
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        // create an image element
        const img = new Image(this.canvas.height, this.canvas.height);
        // specify the image source relative to the html or js file
        // when the image is in the same directory as the file
        // only the file name is required:
        img.src = "./assets/img/weg_game_2.png";
        img.classList.add("backgroundImage");
        // draw image 1
        ctx.drawImage(img, 530, this.imgHeight, this.canvas.width / 3, this.canvas.height);
        // draw image 2
        ctx.drawImage(img, 530, this.imgHeight - this.canvas.height, this.canvas.width / 3, this.canvas.height);
        Game.writeTextToCanvas('Klik op A, S, W of D wanneer ze verschijnen', this.canvas.width / 2, 175, this.canvas, 30);
        if (this.counter % 5 === 1) {
            this.totalScore = this.totalScore + 1;
        }
        this.counter += 1;
        this.drawScore();
        this.player.draw(ctx);
        if (this.situation) {
            this.situation.draw(ctx);
        }
        if (this.player.getStamina() >= 0) {
            this.player.changeStamina(-0.025);
            this.staminabar.draw(ctx, this.player.getStamina());
        }
        else {
            Game.writeTextToCanvas('Game Over!', this.canvas.width / 2, 275, this.canvas, 40);
            this.userData.changeHighScore(this.totalScore);
            this.gameOver = true;
        }
    }
    /**
     * Draw the score on a canvas
     */
    drawScore() {
        Game.writeTextToCanvas(`Score: ${this.totalScore}`, this.canvas.width / 6, 200, this.canvas, 30);
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
    static writeTextToCanvas(text, xCoordinate, yCoordinate, canvas, fontSize = 20, color = 'white', alignment = 'center') {
        const ctx = canvas.getContext('2d');
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
    scrollBackground(elapsed) {
        // update image height
        this.imgHeight += this.scrollSpeed * elapsed;
        // reseting the images when the first image entirely exits the screen
        if (this.imgHeight > this.canvas.height) {
            this.imgHeight = 0;
        }
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
}
;
