import Game from './Game.js';
import KeyListener from './KeyListener.js';
import AnimatedProp from './Props/AnimatedProp.js';
export default class Player extends AnimatedProp {
    /**
     * Construct a new Player instance
     *
     * @param canvas the canvas on which the player should exist
     */
    constructor(xPos, yPos, xVel, yVel, width, height) {
        super(xPos, yPos, xVel, yVel, width, height, [
            { image: Game.loadNewImage('./assets/img/players/fiets1.png'), duration: 200 },
            { image: Game.loadNewImage('./assets/img/players/fiets2.png'), duration: 200 },
        ]);
        this.keyListener = new KeyListener();
        this.stamina = 100;
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
     * Stamina substracter
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
    move() {
    }
    stopKey() {
        if (this.keyListener.isKeyDown(KeyListener.KEY_SPACE) === true) {
            return true;
        }
        else {
            return false;
        }
    }
    update(elapsed) {
        this.advance(elapsed);
    }
}
