import StaminaBooster from "./Props/StaminaBooster.js";
import TrackProp from "./Props/TrackProp.js";
import Scene from "./Scene.js";
export default class Situation extends Scene {
    constructor(canvas, userData, upgrades) {
        super(canvas, userData);
        this.upgrades = upgrades;
    }
    render() {
        this.background.draw(this.ctx);
        this.props.forEach((prop) => {
            prop.draw(this.ctx);
        });
        this.player.draw(this.ctx);
    }
    processInput() {
        this.player.processInput(this.canvas, 0, this.canvas.width);
    }
    getPlayerYVel() {
        return this.player.getYVel();
    }
    getPlayerStamina() {
        return this.player.getStamina();
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
        this.props.forEach((prop, propIndex) => {
            if (this.background.getYPos() + (this.background.getHeight() / 2) > 0) {
                prop.move(elapsed);
            }
            prop.scroll(elapsed, this.player.getYVel());
            if (prop.collidesWithOtherProp(this.player)) {
                if (prop instanceof StaminaBooster) {
                    this.player.changeStamina(prop.getStaminaBoostAmount() * ((50 + this.upgrades.stamina_gain.level) / 50));
                    console.log(`stamina gain: ${prop.getStaminaBoostAmount() * ((50 + this.upgrades.stamina_gain.level) / 50)}`);
                    this.props.splice(propIndex, 1);
                }
                else
                    gameOver = true;
            }
            if (prop instanceof TrackProp) {
                prop.update();
            }
        });
        console.log(`stamina resistance: ${-0.025 / ((50 + this.upgrades.stamina_resistance.level) / 50)}`);
        if (this.player.getStamina() >= 0)
            this.player.changeStamina(-0.025 / ((50 + this.upgrades.stamina_resistance.level) / 50));
        else
            gameOver = true;
        return gameOver ? Situation.GAME_OVER : Situation.NOT_DONE;
    }
}
Situation.NOT_DONE = 0;
Situation.GAME_OVER = 1;
Situation.FINISHED = 2;
