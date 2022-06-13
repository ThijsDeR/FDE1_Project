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

    protected crashSound: HTMLAudioElement;

    protected player: Player;
    
    protected props: ImageProp[];

    protected background: ImageProp;

    protected upgrades: {stamina_resistance: {level: number, price: number}, stamina_gain: {level: number, price: number}};

    protected mist: boolean

    public constructor (canvas: HTMLCanvasElement, userData: UserData, upgrades: {stamina_resistance: {level: number, price: number}, stamina_gain: {level: number, price: number}}) {
        super(canvas, userData)
        this.upgrades = upgrades;
        this.crashSound = new Audio('./audio/bike_crash.mp3')
        this.crashSound.volume = 0.7
        Game.randomInteger(0, 10) === 1 ? this.mist = true : this.mist = false;
    }

    public render() {
        this.background.draw(this.ctx);
        this.props.forEach((prop) => {
            prop.draw(this.ctx);
        })
        this.player.draw(this.ctx);

        if (this.mist) {
            this.ctx.fillStyle = 'rgba(168, 168, 168, 0.9)';
            this.ctx.fillRect(this.background.getXPos(), this.background.getYPos(), this.background.getWidth(), this.background.getHeight())
        }
    }

    public processInput() {
        this.player.processInput(this.canvas, this.background.getXPos(), this.background.getXPos() + this.background.getWidth());
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

        if (this.finishedCheck()) {
            return Situation.FINISHED;
        }

        let gameOver = this.handleProps(elapsed)

        if(this.player.getStamina() >= 0) this.handleStaminaDepletion()
        else gameOver = true;

        return gameOver ? Situation.GAME_OVER : Situation.NOT_DONE;
    }

    protected finishedCheck() {
        return this.player.getYPos() < this.background.getYPos() - this.background.getHeight()
    }

    protected handleProps(elapsed: number) {
        let gameOver = false
        this.props.forEach((prop, propIndex) => {
            if (this.movePropsCheck()) {
                prop.move(elapsed)
                if (prop instanceof TrackProp) {
                    prop.update()
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

    protected handleCollission(prop: Prop, propIndex: number, elapsed: number) {
        let gameOver = false;
        if (prop.collidesWithOtherProp(this.player)) {
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
}
