import Game from './Game.js';
import KeyListener from './KeyListener.js';
import AnimatedProp from './Props/AnimatedProp.js';
export default class Player extends AnimatedProp {
    /**
     * Construct a new Player instance
     *
     * @param canvas the canvas on which the player should exist
     */
    constructor(xPos, yPos, xVel, yVel, width, height, stamina) {
        super(xPos, yPos, xVel, yVel, width, height, [
            { image: Game.loadNewImage('./assets/img/players/fiets1.png'), duration: 200 },
            { image: Game.loadNewImage('./assets/img/players/fiets2.png'), duration: 200 },
        ]);
        this.keyListener = new KeyListener();
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
        if ((this.keyListener.isKeyDown(KeyListener.KEY_UP) || this.keyListener.isKeyDown(KeyListener.KEY_W)) && this.yPos > 0) {
            this.yVel = Player.MAX_SPEED_X;
        }
        else if (spacebarPressed) {
            this.yVel = 0;
        }
        else
            this.yVel = Player.MAX_SPEED / 4;
    }
    move(elapsed) {
        this.xPos += this.xVel * elapsed;
    }
    update(elapsed) {
        this.advance(elapsed);
    }
    isStopped() {
        return this.keyListener.isKeyDown(KeyListener.KEY_SPACE);
    }
}
Player.MAX_SPEED = 0.6;
Player.MAX_SPEED_X = 0.4;
