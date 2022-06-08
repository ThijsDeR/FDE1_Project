import Player from "../Player.js";
import ImageProp from "../Props/ImageProp.js";
import StaminaBooster from "../Props/StaminaBooster.js";
import Situation from "../Situation.js";
export default class TractorIncoming extends Situation {
    constructor(canvas, userData, stamina, upgrades) {
        super(canvas, userData, upgrades);
        this.background = new ImageProp(canvas.width / 3, -canvas.height, 0, 0, canvas.width / 2, canvas.height, './assets/img/Polderweg.png');
        this.props = [
            new ImageProp(this.background.getXPos() + (this.background.getWidth() / 2.7), this.background.getYPos(), 0, 0.05, this.background.getWidth() / 5, this.background.getHeight() / 5, './assets/img/objects/car.png'),
        ];
        this.canvas = canvas;
        this.player = new Player(this.background.getXPos() + ((this.background.getWidth() / 3) * 2) - ((this.background.getWidth() / 8) / 2), this.background.getHeight() / 1.2, 0, 0, this.background.getWidth() / 20, this.background.getHeight() / 8, stamina);
    }
    update(elapsed) {
        this.player.move(elapsed);
        this.player.update(elapsed);
        this.background.move(elapsed);
        this.background.scroll(elapsed, this.player.getYVel());
        if (this.player.getYPos() < this.background.getYPos() - this.background.getHeight()) {
            return Situation.FINISHED;
        }
        let gameOver = false;
        if (this.player.getYVel() === Player.MAX_SPEED_X &&
            this.player.getYPos() >= this.props[0].getYPos() - this.props[0].getHeight() &&
            this.player.getYPos() <= this.props[0].getYPos()) {
            gameOver = true;
        }
        console.log(this.props[0].getYPos());
        this.props.forEach((prop, propIndex) => {
            console.log(prop.getXVel());
            if (this.background.getYPos() + (this.background.getHeight() / 2) > 0) {
                prop.move(elapsed);
            }
            prop.scroll(elapsed, this.player.getYVel());
            if (prop.collidesWithOtherProp(this.player)) {
                if (prop instanceof StaminaBooster) {
                    this.player.changeStamina(prop.getStaminaBoostAmount() * ((50 + this.upgrades.stamina_gain.level) / 50));
                    this.props.splice(propIndex, 1);
                }
                else
                    gameOver = true;
            }
        });
        if (this.player.getStamina() >= 0)
            this.player.changeStamina(-0.025 / ((50 + this.upgrades.stamina_resistance.level) / 50));
        else
            gameOver = true;
        return gameOver ? Situation.GAME_OVER : Situation.NOT_DONE;
    }
    processInput() {
        this.player.processInput(this.canvas, this.background.getXPos() + (this.background.getWidth() / 4), this.background.getXPos() + this.background.getWidth() - (this.background.getWidth() / 3.5));
    }
}
