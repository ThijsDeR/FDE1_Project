import Player from "./Player.js";
import ImageProp from "./Props/ImageProp.js";
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
        this.player.processInput(this.canvas, 0, this.canvas.width);
    }

    public getPlayerYVel() {
        return this.player.getYVel();
    }

    public getPlayerStamina() {
        return this.player.getStamina();
    }
}