import Game from "./Game.js";
import ImageProp from "./Props/ImageProp.js";
import StaminaBooster from "./Props/StaminaBooster.js";
import TrackProp from "./Props/TrackProp.js";
import Scene from "./Scene.js";
export default class Situation extends Scene {
    constructor(canvas, userData, upgrades, skins) {
        super(canvas, userData);
        this.upgrades = upgrades;
        this.crashSound = new Audio('./audio/bike_crash.mp3');
        this.crashSound.volume = 0.7;
        Game.randomInteger(0, 1) === 1 ? this.isMist = true : this.isMist = false;
        this.currentMist = 0;
        this.skins = skins;
    }
    render() {
        this.background.draw(this.ctx);
        this.props.forEach((prop) => {
            prop.draw(this.ctx);
        });
        this.player.draw(this.ctx);
        if (this.isMist) {
            const mistIntensity = Math.max(this.currentMist - (this.upgrades.lamp_power.level / 1000), 0) + 0.05;
            this.ctx.fillStyle = `rgba(168, 168, 168, ${mistIntensity})`;
            this.ctx.fillRect(this.background.getXPos(), -this.canvas.height, this.background.getWidth(), this.background.getHeight() * 10);
        }
    }
    processInput() {
        this.player.processInput(this.canvas, this.background.getXPos(), this.background.getXPos() + this.background.getWidth());
    }
    isPaused() {
        if (this.player.isPausing() === true) {
            return Situation.PAUSED;
        }
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
        if (this.isMist) {
            if (!this.vanishMist()) {
                if (this.currentMist <= 0.85)
                    this.currentMist += Math.min(elapsed / 1000, 0.004);
            }
            else
                this.currentMist -= Math.min(elapsed / 400, 0.01);
        }
        if (this.finishedCheck()) {
            return Situation.FINISHED;
        }
        let gameOver = this.handleProps(elapsed);
        if (this.player.getStamina() >= 0)
            this.handleStaminaDepletion();
        else
            gameOver = true;
        if (this.isPaused()) {
            return Situation.PAUSED;
        }
        return gameOver ? Situation.GAME_OVER : Situation.NOT_DONE;
    }
    vanishMist() {
        return this.player.getYPos() < this.background.getYPos() - (this.background.getHeight() / 2);
    }
    finishedCheck() {
        return this.player.getYPos() < this.background.getYPos() - this.background.getHeight();
    }
    handleProps(elapsed) {
        let gameOver = false;
        this.props.forEach((prop, propIndex) => {
            if (this.movePropsCheck()) {
                prop.move(elapsed);
                if (prop instanceof TrackProp || prop instanceof ImageProp) {
                    prop.update(elapsed);
                }
            }
            prop.scroll(elapsed, this.player.getYVel());
            let propCollission = this.handleCollission(prop, propIndex, elapsed);
            if (propCollission)
                gameOver = true;
            let extraPropHandling = this.extraPropHandling(prop, propIndex);
            if (extraPropHandling)
                gameOver = true;
        });
        return gameOver;
    }
    movePropsCheck() {
        return this.background.getYPos() + (this.background.getHeight() / 2) > 0;
    }
    handleCollission(prop, propIndex, elapsed) {
        let gameOver = false;
        if (prop.collidesWithOtherImageProp(this.player)) {
            if (prop instanceof StaminaBooster) {
                this.handleStaminaChange(prop, propIndex);
            }
            else {
                this.crashSound.play();
                gameOver = true;
            }
        }
        return gameOver;
    }
    handleStaminaChange(prop, propIndex) {
        this.player.changeStamina(prop.getStaminaBoostAmount() * ((50 + this.upgrades.stamina_gain.level) / 50));
        this.props.splice(propIndex, 1);
    }
    handleStaminaDepletion() {
        this.player.changeStamina(-0.025 / ((50 + this.upgrades.stamina_resistance.level) / 50));
    }
    extraPropHandling(prop, propIndex) {
        return false;
    }
    getPlayer() {
        return this.player;
    }
}
Situation.NOT_DONE = 0;
Situation.GAME_OVER = 1;
Situation.FINISHED = 2;
Situation.PAUSED = 3;
