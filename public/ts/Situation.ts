import Player from "./Player.js";
import ImageProp from "./Props/ImageProp.js";
import StaminaBooster from "./Props/StaminaBooster.js";
import TrackProp from "./Props/TrackProp.js";
import Scene from "./Scene.js";
import UserData from "./UserData.js";

export default abstract class Situation extends Scene {
    public static readonly NOT_DONE: number = 0;

    public static readonly GAME_OVER: number = 1;

    public static readonly FINISHED: number = 2;

    protected player: Player;
    
    protected props: ImageProp[];

    protected background: ImageProp;

    protected upgrades: {stamina_resistance: {level: number, price: number}, stamina_gain: {level: number, price: number}};

    public constructor (canvas: HTMLCanvasElement, userData: UserData, upgrades: {stamina_resistance: {level: number, price: number}, stamina_gain: {level: number, price: number}}) {
        super(canvas, userData)
        this.upgrades = upgrades;
    }

    public render() {
        this.background.draw(this.ctx);
        this.props.forEach((prop) => {
            prop.draw(this.ctx);
        })
        this.player.draw(this.ctx);
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

        if (this.player.getYPos() < this.background.getYPos() - this.background.getHeight()) {
            return Situation.FINISHED;
        }

        let gameOver = false;
        this.props.forEach((prop, propIndex) => {
            if (this.background.getYPos() + (this.background.getHeight() / 2) > 0) {
                prop.move(elapsed)
            }

            prop.scroll(elapsed, this.player.getYVel())

            if (prop.collidesWithOtherProp(this.player)) {
                if (prop instanceof StaminaBooster) {
                    this.player.changeStamina(prop.getStaminaBoostAmount() * ((50 + this.upgrades.stamina_gain.level) / 50));
                    this.props.splice(propIndex, 1);
                } else gameOver = true;
            }

            if (prop instanceof TrackProp) {
                prop.update()
            }
        })

        if(this.player.getStamina() >= 0) this.player.changeStamina(-0.025 / ((50 + this.upgrades.stamina_resistance.level) / 50));        
        else gameOver = true;

        return gameOver ? Situation.GAME_OVER : Situation.NOT_DONE;
    }
}
