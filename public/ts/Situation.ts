import Player from "./Player.js";
import ImageProp from "./Props/ImageProp.js";

export default abstract class Situation {
    public static readonly NOT_DONE: number = 0;

    public static readonly GAME_OVER: number = 1;

    public static readonly FINISHED: number = 2;

    protected player: Player;
    
    protected props: ImageProp[];

    protected background: ImageProp;

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