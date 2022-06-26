import Game from './Game.js';
import KeyListener from './KeyListener.js';
import AnimatedProp from './Props/AnimatedProp.js';
export default class Player extends AnimatedProp {
    /**
     * Construct a new Player instance
     *
     * @param canvas the canvas on which the player should exist
     */
    constructor(xPos, yPos, xVel, yVel, width, height, stamina, skin, keyListener) {
        super(xPos, yPos, xVel, yVel, width, height, [
            { image: Game.loadNewImage(skin.src), duration: 200 },
            { image: Game.loadNewImage(skin.src.replace('1', '2')), duration: 200 },
        ], false);
        this.keyListener = keyListener;
        this.stamina = stamina;
    }
    getKeyListener() {
        return this.keyListener;
    }
    /**
     * Stamina getter
     *
     * @returns stamina
     */
    getStamina() {
        return this.stamina;
    }
    /**
     * Add stamina
     *
     * @param stamina stamina number input
     */
    changeStamina(stamina) {
        if (this.stamina + stamina > 100) {
            this.stamina = 100;
        }
        else {
            this.stamina += stamina;
        }
    }
    /**
     * Sets stamina
     *
     * @param stamina stamina number input
     */
    setStamina(stamina) {
        this.stamina = stamina;
    }
    /**
     * Moves the player
     */
    processInput(canvas, minX, maxX) {
        // Set the limit values
        const maximX = maxX - this.width;
        const spacebarPressed = this.keyListener.isKeyDown(KeyListener.KEY_SPACE);
        if (!spacebarPressed) {
            if ((this.keyListener.isKeyDown(KeyListener.KEY_RIGHT) || this.keyListener.isKeyDown(KeyListener.KEY_D)) && this.xPos < maximX) {
                this.xVel = Player.MAX_SPEED;
            }
            else if ((this.keyListener.isKeyDown(KeyListener.KEY_LEFT) || this.keyListener.isKeyDown(KeyListener.KEY_A)) && this.xPos > minX) {
                this.xVel = -Player.MAX_SPEED;
            }
            else
                this.xVel = 0;
        }
        else
            this.xVel = 0;
        if (spacebarPressed) {
            this.yVel = 0;
        }
        else if ((this.keyListener.isKeyDown(KeyListener.KEY_UP) || this.keyListener.isKeyDown(KeyListener.KEY_W))) {
            this.yVel = Player.MAX_SPEED_X;
        }
        else
            this.yVel = Player.SPEED_STATIC;
    }
    move(elapsed) {
        this.xPos += this.xVel * elapsed;
    }
    update(elapsed) {
        super.update(elapsed);
        this.advance(elapsed);
    }
    isStopped() {
        return this.keyListener.isKeyDown(KeyListener.KEY_SPACE);
    }
    isMaxSpeed() {
        return this.keyListener.isKeyDown(KeyListener.KEY_UP) || this.keyListener.isKeyDown(KeyListener.KEY_W);
    }
    isPausing() {
        return this.keyListener.isKeyDown(KeyListener.KEY_ESC);
    }
}
Player.MAX_SPEED = 0.6;
Player.MAX_SPEED_X = 0.4;
Player.SPEED_STATIC = 0.15;
