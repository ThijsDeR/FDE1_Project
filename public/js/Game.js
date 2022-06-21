import GameLoop from './GameLoop.js';
import Staminabar from './Staminabar.js';
import UserData from './UserData.js';
import Situation from './Situation.js';
import GameOverScene from './GameOverScene.js';
// Import situations
import CyclingPathIncomingTraffic from './Situations/CyclingPathIncomingTraffic.js';
import Crossroad from './Situations/Crossroad.js';
import OncomingCyclist from './Situations/OncomingCyclists.js';
import CrossroadStopSign from './Situations/CrossroadStopSign.js';
import TractorIncoming from './Situations/TractorIncoming.js';
import CarDriveway from './Situations/CarDriveway.js';
import PrioritySameRoad from './Situations/PrioritySameRoad.js';
import PedestrianCrossingVan from './Situations/PedestrianCrossingVan.js';
import ParkingSpotCar from './Situations/ParkingSpotCar.js';
import SchoolStreet from './Situations/SchoolStreet.js';
import TrainRails from './Situations/TrainRails.js';
/**
 * Main class of this Game.
 */
export default class Game {
    /**
     * Construct a new Game
     *
     * @param canvas The canvas HTML element to render on
     */
    constructor(canvas, upgrades) {
        this.canvas = canvas;
        // Resize the canvas so it looks more like a Runner game
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.userData = new UserData();
        // Score is zero at start
        this.totalScore = 0;
        this.staminabar = new Staminabar(this.canvas.width / 6, 300, this.canvas.width / 3, 20);
        // Start the animation
        this.gameloop = new GameLoop(this);
        this.gameloop.start();
        // the initial image height
        this.imgHeight = 0;
        // the scroll speed
        // an important thing to ensure here is that can.height
        // is divisible by scrollSpeed
        this.gameOver = false;
        this.upgrades = upgrades;
        // this.situation = new TrainRails(this.canvas, this.userData, 100, this.upgrades)
        this.situation = this.newSituation(100);
        this.cutScene = null;
    }
    restart() {
        // Resize the canvas so it looks more like a Runner game
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        // Set the player at the center
        this.userData = new UserData();
        // Score is zero at start
        this.totalScore = 0;
        this.staminabar = new Staminabar(this.canvas.width / 6, 300, this.canvas.width / 3, 20);
        // the initial image height
        this.imgHeight = 0;
        // the scroll speed
        // an important thing to ensure here is that can.height
        // is divisible by scrollSpeed
        this.gameOver = false;
        this.situation = this.newSituation(100);
        this.cutScene = null;
    }
    newSituation(stamina) {
        const playerXpos = this.situation ? this.situation.getPlayer().getXPos() : null;
        const data = [this.canvas, this.userData, { xPos: playerXpos, stamina: stamina }, this.upgrades];
        switch (Game.randomInteger(0, 10)) {
            case 0:
                return new CyclingPathIncomingTraffic(...data);
            case 1:
                return new Crossroad(...data);
            case 2:
                return new CarDriveway(...data);
            case 3:
                return new CrossroadStopSign(...data);
            case 4:
                return new TractorIncoming(...data);
            case 5:
                return new PrioritySameRoad(...data);
            case 6:
                return new ParkingSpotCar(...data);
            case 7:
                return new PedestrianCrossingVan(...data);
            case 8:
                return new SchoolStreet(...data);
            case 9:
                return new TrainRails(...data);
            default:
                return new OncomingCyclist(...data);
        }
    }
    /**
     * Handles any user input that has happened since the last call
     */
    processInput() {
        // Move player
        this.situation.processInput();
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
        if (this.gameOver) {
            if (this.cutScene) {
                const completed = this.cutScene.update(elapsed);
                if (completed)
                    this.restart();
            }
            return false;
        }
        this.totalScore += this.situation.getPlayerYVel();
        // Spawn a new scoring object every 45 frames
        this.scrollBackground(elapsed);
        const result = this.situation.update(elapsed);
        if (result === Situation.GAME_OVER) {
            this.userData.changeHighScore(this.totalScore);
            this.userData.addVP(this.totalScore);
            this.cutScene = new GameOverScene(this.canvas, this.userData);
            this.gameOver = true;
        }
        if (result === Situation.FINISHED)
            this.situation = this.newSituation(this.situation.getPlayerStamina());
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
        ctx.fillStyle = `black`;
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        // create an image element
        const img = new Image(this.canvas.height, this.canvas.height);
        // specify the image source relative to the html or js file
        // when the image is in the same directory as the file
        // only the file name is required:
        img.src = "./assets/img/objects/MainRoadFixed.png";
        img.classList.add("backgroundImage");
        // draw image 1
        ctx.drawImage(img, this.canvas.width / 3, this.imgHeight, this.canvas.width / 2, this.canvas.height);
        // draw image 2
        ctx.drawImage(img, this.canvas.width / 3, this.imgHeight - this.canvas.height, this.canvas.width / 2, this.canvas.height);
        // if (this.situation) {
        //   this.situation.draw(ctx)
        // }
        this.situation.render();
        if (this.gameOver) {
            if (this.cutScene)
                this.cutScene.render();
            return;
        }
        else {
            this.drawScore();
            this.staminabar.draw(ctx, this.situation.getPlayerStamina());
        }
        if (this.cutScene)
            this.cutScene.render();
    }
    /**
     * Draw the score on a canvas
     */
    drawScore() {
        Game.writeTextToCanvas(this.canvas.getContext('2d'), `Score: ${Math.round(this.totalScore)}`, this.canvas.width / 6, 200, 30);
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
    static writeTextToCanvas(ctx, text, xPos, yPos, fontSize = 20, color = 'white', textAlign = 'center', textBaseline = 'middle', maxWidth = 10000) {
        ctx.font = `${fontSize}px Arial`;
        ctx.fillStyle = color;
        ctx.textAlign = textAlign;
        ctx.textBaseline = textBaseline;
        const words = text.split(' ');
        let line = '';
        const yPositions = [];
        const lines = [];
        for (let i = 0; i < words.length; i++) {
            const tempLine = `${line + words[i]} `;
            const metrics = ctx.measureText(tempLine);
            const tempWidth = metrics.width;
            if (tempWidth > maxWidth && i > 0) {
                lines.push(line);
                // ctx.fillText(line, xPos, yPos);
                line = `${words[i]} `;
                // yPos += fontSize;
            }
            else {
                line = tempLine;
            }
        }
        lines.push(line);
        const amount = lines.length;
        if (amount % 2 === 0) {
            for (let i = amount / 2; i > 0; i--) {
                yPositions.push(yPos - (fontSize * i));
            }
            for (let i = 0; i < (amount / 2); i++) {
                yPositions.push(yPos + (fontSize * i));
            }
        }
        else {
            for (let i = (amount - 1) / 2; i > 0; i--) {
                yPositions.push(yPos - (fontSize * i));
            }
            yPositions.push(yPos);
            for (let i = 0; i < (amount - 1) / 2; i++) {
                yPositions.push(yPos + (fontSize * (i + 1)));
            }
        }
        // eslint-disable-next-line @typescript-eslint/no-shadow
        lines.forEach((line, lineIndex) => {
            ctx.fillText(line, xPos, yPositions[lineIndex]);
        });
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
        this.imgHeight += this.situation.getPlayerYVel() * elapsed;
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
