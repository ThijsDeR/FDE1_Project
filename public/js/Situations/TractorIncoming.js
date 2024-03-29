import Game from "../Game.js";
import Player from "../Player.js";
import ImageProp from "../Props/ImageProp.js";
import StaminaBooster from "../Props/StaminaBooster.js";
import { Tractor } from "../Props/Tractor.js";
import Situation from "../Situation.js";
export default class TractorIncoming extends Situation {
    constructor(canvas, userData, playerData, upgrades, skins, keyListener, allowedMist) {
        super(canvas, userData, playerData, upgrades, skins, allowedMist);
        // Create situation background
        this.background = new ImageProp(canvas.width / 3, -canvas.height, 0, 0, canvas.width / 2, canvas.height, './assets/img/Polderweg.png', false);
        // Define the left boundary of the playing field
        this.leftBoundary = this.background.getXPos() + (this.background.getWidth() / 3) - (this.background.getWidth() / 20);
        // Define the right boundary of the playing field
        this.rightBoundary = this.background.getXPos() + ((this.background.getWidth() / 3) * 2) + (this.background.getWidth() / 20);
        // Create player
        this.player = this.createPlayer(keyListener);
        // Create props in situation
        this.props = [
            // Create tractor
            new Tractor(this.background.getXPos() + (this.background.getWidth() / 2.7), this.background.getYPos(), 0, 0.05, this.background.getWidth() / 5, this.background.getHeight() / 5),
        ];
        Game.randomInteger(0, 2) === 1 ? this.props.push(new StaminaBooster(this.background.getXPos() + ((this.background.getWidth() / 3) * 2) - (this.background.getWidth() / 30), this.background.getYPos() + (this.background.getHeight() / 2), 0, 0, this.background.getWidth() / 16, this.background.getHeight() / 9, this.skins.staminaSkin.src, parseInt(this.skins.staminaSkin.baseStamina))) : '';
    }
    // Additional collission handling
    handleCollission(prop, propIndex) {
        let gameOver = false;
        if (prop.collidesWithOtherImageProp(this.player)) {
            if (prop instanceof StaminaBooster) {
                this.handleStaminaChange(prop, propIndex);
            }
            else {
                this.scoreTick -= 100;
                this.crashSound.play();
                gameOver = true;
            }
        }
        // Fail player if speeding past tractor
        if (prop instanceof Tractor) {
            if (this.player.getYPos() >= prop.getYPos() - prop.getHeight() &&
                this.player.getYPos() <= prop.getYPos()) {
                if (this.player.getYVel() === Player.MAX_SPEED_X) {
                    gameOver = true;
                }
                else if (this.player.getYVel() === Player.SPEED_STATIC) {
                    this.scoreTick -= 1;
                }
            }
        }
        return gameOver;
    }
}
