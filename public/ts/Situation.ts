import Player from "./Player.js";
import ImageProp from "./Props/ImageProp.js";
import UserData from "./UserData.js";

export default abstract class Situation {
    public static readonly NOT_DONE: number = 0;

    public static readonly GAME_OVER: number = 1;

    public static readonly FINISHED: number = 2;

    protected player: Player;
    
    protected props: ImageProp[];

    protected background: ImageProp;

    protected upgrades: {stamina_resistance: {level: number, price: number}, stamina_gain: {level: number, price: number}};

    public constructor (upgrades: {stamina_resistance: {level: number, price: number}, stamina_gain: {level: number, price: number}}) {
        this.upgrades = upgrades;
    }

    public update(elapsed: number): number {
        return Situation.NOT_DONE;
    }

    public render(ctx: CanvasRenderingContext2D) {
        this.background.draw(ctx);
        this.props.forEach((prop) => {
            prop.draw(ctx);
        })
        this.player.draw(ctx);
    }

    public processInput(canvas: HTMLCanvasElement) {
        this.player.processInput(canvas, 0, canvas.width);
    }

    public getPlayerYVel() {
        return this.player.getYVel();
    }

    public getPlayerStamina() {
        return this.player.getStamina();
    }
}