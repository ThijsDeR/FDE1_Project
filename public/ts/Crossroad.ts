import Game from "./Game.js";
import Player from "./Player.js";
import Frikandelbroodje from "./Props/Frikandelbroodje.js";
import ImageProp from "./Props/ImageProp.js";
import StaminaBooster from "./Props/StaminaBooster.js";

export default class Crossroad {
    public static readonly NOT_DONE: number = 0;

    public static readonly GAME_OVER: number = 1;

    public static readonly FINISHED: number = 2;
    private props: ImageProp[];

    private background: ImageProp;

    public constructor(canvas: HTMLCanvasElement) {
        this.background = new ImageProp(0, -canvas.height, 0, 0, canvas.width, canvas.height, './assets/img/objects/Kruispunt_2.png');
        this.props = [
            new ImageProp(0 - (this.background.getWidth() / 10), this.background.getYPos() + (this.background.getHeight() / 2), (Game.randomInteger(1, 15) / 10), 0, this.background.getWidth() / 10, this.background.getHeight() / 5, './assets/img/players/fiets1.png'),
            new ImageProp(this.background.getWidth() / 3, this.background.getYPos(), 0, 0.05, this.background.getWidth() / 16, this.background.getHeight() / 9, './assets/img/objects/w_button.png'),
            new Frikandelbroodje(this.background.getWidth() / 2, this.background.getYPos() + (this.background.getHeight() / 2), 0, 0, this.background.getWidth() / 16, this.background.getHeight() / 9, './assets/img/objects/frikandelbroodje.png', 10)
        ]

    }

    public update(elapsed: number, scrollSpeed: number, player: Player) {
        this.background.move(elapsed)
        this.background.scroll(elapsed, scrollSpeed)

        if (player.getYPos() < this.background.getYPos() - this.background.getHeight()) {
            return Crossroad.FINISHED;
        }

        let gameOver = false;
        this.props.forEach((prop, propIndex) => {
            console.log(prop.getXVel())
            if (this.background.getYPos() + (this.background.getHeight() / 2) > 0) {
                prop.move(elapsed)
            }

            prop.scroll(elapsed, scrollSpeed)

            if (prop.collidesWithOtherProp(player)) {
                if (prop instanceof StaminaBooster) {
                    player.changeStamina(prop.getStaminaBoostAmount());
                    this.props.splice(propIndex, 1);
                } else gameOver = true;
            }

            

        })

        return gameOver ? Crossroad.GAME_OVER : Crossroad.NOT_DONE;
    }

    public draw(ctx: CanvasRenderingContext2D) {
        this.background.draw(ctx);
        this.props.forEach((prop) => {
            prop.draw(ctx)
        })
    }
}