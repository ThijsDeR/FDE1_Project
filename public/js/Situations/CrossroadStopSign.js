import Game from "../Game.js";
import Player from "../Player.js";
import ImageProp from "../Props/ImageProp.js";
import StaminaBooster from "../Props/StaminaBooster.js";
import StopSign from "../Props/StopSign.js";
import Situation from "../Situation.js";
export default class CrossroadStopSign extends Situation {
    constructor(canvas, userData, playerData, upgrades, skins) {
        super(canvas, userData, upgrades, skins);
        // Sound
        this.pickupSound = new Audio('./audio/EatingSound.wav');
        this.pickupSound.volume = 0.5;
        // Create situation background
        this.background = new ImageProp(canvas.width / 3, -canvas.height, 0, 0, canvas.width / 2, canvas.height, './assets/img/objects/Kruispunt_2.png', false);
        // Create situation props
        this.props = [
            // Cyclist
            new ImageProp(0 - (this.background.getWidth() / 10), this.background.getYPos() + (this.background.getHeight() / 2), (Game.randomInteger(1, 15) / 10), 0, this.background.getWidth() / 10, this.background.getHeight() / 5, './assets/img/players/fiets1.png'),
            // Car
            new ImageProp(this.background.getXPos() + this.background.getWidth() / 3, this.background.getYPos(), 0, 0.05, this.background.getWidth() / 16, this.background.getHeight() / 9, './assets/img/objects/car.png'),
            // Stamina booster
            new StaminaBooster(this.background.getXPos() + this.background.getWidth() / 2, this.background.getYPos() + (this.background.getHeight() / 2), 0, 0, this.background.getWidth() / 16, this.background.getHeight() / 9, this.skins.staminaSkin.src, parseInt(this.skins.staminaSkin.baseStamina)),
            // Stop sign
            new StopSign(this.background.getXPos() + this.background.getWidth() / 1.9, this.background.getYPos() + (this.background.getHeight() / 1.1), 0, 0, this.background.getWidth() / 16, this.background.getHeight() / 9, './assets/img/objects/stopbord.png', false)
        ];
        let xPos;
        if (playerData.xPos)
            xPos = playerData.xPos;
        else
            xPos = this.background.getXPos() + ((this.background.getWidth() / 3) * 2) - ((this.background.getWidth() / 8) / 2);
        if (xPos < this.background.getXPos() + this.background.getWidth() / 3)
            xPos = this.background.getXPos() + this.background.getWidth() / 3;
        else if (xPos > this.background.getXPos() + (this.background.getWidth() / 3) * 2)
            xPos = this.background.getXPos() + (this.background.getWidth() / 3) * 2;
        this.player = new Player(xPos, this.background.getHeight() / 1.2, 0, 0, this.background.getWidth() / 20, this.background.getHeight() / 8, playerData.stamina);
    }
    // Handle collisions
    handleCollission(prop, propIndex, elapsed) {
        let gameOver = false;
        if (prop.collidesWithOtherImageProp(this.player)) {
            if (prop instanceof StaminaBooster) {
                this.pickupSound.play();
                this.player.changeStamina(prop.getStaminaBoostAmount() * ((50 + this.upgrades.stamina_gain.level) / 50));
                this.props.splice(propIndex, 1);
            }
            else if (prop instanceof StopSign) {
                if (this.player.isStopped()) {
                    prop.advance(elapsed);
                }
            }
            else {
                this.scoreTick -= 100;
                this.crashSound.play();
                gameOver = true;
            }
        }
        return gameOver;
    }
    // Additional prop processing
    extraPropHandling(prop, propIndex) {
        let gameOver = false;
        if (prop instanceof StopSign) {
            if (prop.isActive()) {
                this.props.splice(propIndex, 1);
            }
            else if (prop.getYPos() > this.player.getYPos() + this.player.getHeight()) {
                this.scoreTick -= 50;
                gameOver = true;
            }
        }
        return gameOver;
    }
    // Set boundaries to the player's movements
    processInput() {
        this.player.processInput(this.canvas, this.background.getXPos() + this.background.getWidth() / 3, this.background.getXPos() + (this.background.getWidth() / 3) * 2);
    }
}
