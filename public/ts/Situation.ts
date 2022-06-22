import Game from "./Game.js";
import Player from "./Player.js";
import ImageProp from "./Props/ImageProp.js";
import Prop from "./Props/Prop.js";
import StaminaBooster from "./Props/StaminaBooster.js";
import TrackProp from "./Props/TrackProp.js";
import Scene from "./Scene.js";
import UserData from "./UserData.js";

export default abstract class Situation extends Scene {
    public static readonly NOT_DONE: number = 0;

    public static readonly GAME_OVER: number = 1;

    public static readonly FINISHED: number = 2;

    public static readonly PAUSED: number = 3;

    protected crashSound: HTMLAudioElement;

    protected player: Player;

    protected props: ImageProp[];

    protected background: ImageProp;

    protected upgrades: Upgrades;

    protected skins: Skins;

    protected isMist: boolean

    protected currentMist: number;

    public constructor (canvas: HTMLCanvasElement, userData: UserData, upgrades: Upgrades, skins: Skins) {

        super(canvas, userData)
        this.upgrades = upgrades;
        this.crashSound = new Audio('./audio/bike_crash.mp3')
        this.crashSound.volume = 0.7
        Game.randomInteger(0, 10) === 1 ? this.isMist = true : this.isMist = false;
        this.currentMist = 0
        this.skins = skins

    }

    public render() {
        this.background.draw(this.ctx);
        this.props.forEach((prop) => {
            prop.draw(this.ctx);
        })
        this.player.draw(this.ctx);

        if (this.isMist) {
            const mistIntensity = Math.max(this.currentMist - (this.upgrades.lamp_power.level / 1000), 0) + 0.05
            this.ctx.fillStyle = `rgba(168, 168, 168, ${mistIntensity})`;
            this.ctx.fillRect(this.background.getXPos(), -this.canvas.height, this.background.getWidth(), this.background.getHeight() * 10)
        }
    }

    public processInput() {
        this.player.processInput(this.canvas, this.background.getXPos(), this.background.getXPos() + this.background.getWidth());
    }

    public isPaused() {
        if (this.player.isPausing() === true) {
            return Situation.PAUSED;
        }
    }

    public getPlayerYVel() {
        return this.player.getYVel();
    }

    public getPlayerStamina() {
        return this.player.getStamina();
    }

    public update(elapsed: number): number {
        this.player.move(elapsed);
        this.player.update(elapsed);
        this.background.move(elapsed)
        this.background.scroll(elapsed, this.player.getYVel())

        if (this.isMist) {
            if (!this.vanishMist()) {
                if (this.currentMist <= 0.85) this.currentMist += Math.min(elapsed / 1000, 0.004)
            } else this.currentMist -= Math.min(elapsed / 400, 0.01)
        }

        if (this.finishedCheck()) {
            return Situation.FINISHED;
        }

        let gameOver = this.handleProps(elapsed)

        if (this.player.getStamina() >= 0) this.handleStaminaDepletion()
        else gameOver = true;

        if (this.isPaused()) {
            return Situation.PAUSED;
        }

        return gameOver ? Situation.GAME_OVER : Situation.NOT_DONE;
    }

    protected vanishMist() {
        return this.player.getYPos() < this.background.getYPos() - (this.background.getHeight() / 2)
    }

    protected finishedCheck() {
        return this.player.getYPos() < this.background.getYPos() - this.background.getHeight()
    }

    protected handleProps(elapsed: number) {
        let gameOver = false
        this.props.forEach((prop, propIndex) => {
            if (this.movePropsCheck()) {
                prop.move(elapsed)
                if (prop instanceof TrackProp || prop instanceof ImageProp) {
                    prop.update(elapsed)
                }
            }

            prop.scroll(elapsed, this.player.getYVel())

            let propCollission = this.handleCollission(prop, propIndex, elapsed)
            if (propCollission) gameOver = true;



            let extraPropHandling = this.extraPropHandling(prop, propIndex)
            if (extraPropHandling) gameOver = true
        })

        return gameOver
    }

    protected movePropsCheck() {
        return this.background.getYPos() + (this.background.getHeight() / 2) > 0
    }

    protected handleCollission(prop: ImageProp, propIndex: number, elapsed: number) {
        let gameOver = false;
        if (prop.collidesWithOtherImageProp(this.player)) {
            if (prop instanceof StaminaBooster) {
                this.handleStaminaChange(prop, propIndex)
            } else {
                this.crashSound.play()
                gameOver = true;
            }
        }

        return gameOver
    }

    protected handleStaminaChange(prop: StaminaBooster, propIndex: number) {
        this.player.changeStamina(prop.getStaminaBoostAmount() * ((50 + this.upgrades.stamina_gain.level) / 50));
        this.props.splice(propIndex, 1);
    }

    protected handleStaminaDepletion() {
        this.player.changeStamina(-0.025 / ((50 + this.upgrades.stamina_resistance.level) / 50));
    }

    protected extraPropHandling(prop: Prop, propIndex: number) {
        return false;
    }

    public getPlayer() {
        return this.player;
    }
}
