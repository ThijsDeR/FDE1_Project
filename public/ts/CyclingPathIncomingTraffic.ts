import Game from "./Game.js";
import Player from "./Player.js";
import Frikandelbroodje from "./Props/Frikandelbroodje.js";
import ImageProp from "./Props/ImageProp.js";
import StaminaBooster from "./Props/StaminaBooster.js";
import TrackProp from "./Props/TrackProp.js";

export default class CyclingPathIncomingTraffic {
    public static readonly NOT_DONE: number = 0;

    public static readonly GAME_OVER: number = 1;

    public static readonly FINISHED: number = 2;
    private props: ImageProp[];

    private background: ImageProp;

    public constructor(canvas: HTMLCanvasElement) {
        this.background = new ImageProp(canvas.width / 3, -canvas.height, 0, 0, canvas.width / 3, canvas.height, './assets/img/weg_game_2.png');
        this.props = [
            new ImageProp((this.background.getWidth() / 4) + (canvas.width / 3), this.background.getYPos(), 0, 0.1, canvas.width / 20, canvas.height / 8, './assets/img/players/fiets1.png'),
            new TrackProp(
                [
                    {xPos1: (this.background.getWidth() / 2) + (canvas.width / 3), yPos1: this.background.getYPos(), xPos2: (this.background.getWidth() / 2) + (canvas.width / 3), yPos2: this.background.getYPos() + this.background.getHeight() / 3, xVel: 0, yVel: 0.15},
                    {xPos1: (this.background.getWidth() / 2) + (canvas.width / 3), yPos1: this.background.getYPos() + this.background.getHeight() / 3, xPos2: (this.background.getWidth() / 4) + (canvas.width / 3), yPos2: this.background.getYPos() + this.background.getHeight() / 2, xVel: -0.2, yVel: 0.15},
                    {xPos1: (this.background.getWidth() / 4) + (canvas.width / 3), yPos1: this.background.getYPos() + this.background.getHeight() / 2, xPos2: (this.background.getWidth() / 4) + (canvas.width / 3), yPos2: this.background.getYPos() + this.background.getHeight() * 2, xVel: 0, yVel: 0.15},
                ], canvas.width / 20, canvas.height / 8, './assets/img/players/fiets1.png'),
            new Frikandelbroodje((this.background.getWidth() / 2) + (canvas.width / 3), this.background.getYPos() + (this.background.getHeight()), 0, 0, canvas.width / 15,  canvas.height / 8, './assets/img/objects/frikandelbroodje.png', 10)
        ]

    }

    public update(elapsed: number, scrollSpeed: number, player: Player) {
        this.background.move(elapsed)
        this.background.scroll(elapsed, scrollSpeed)

        if (player.getYPos() < this.background.getYPos() - this.background.getHeight()) {
            return CyclingPathIncomingTraffic.FINISHED;
        }

        let gameOver = false;
        this.props.forEach((prop, propIndex) => {
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

            if (prop instanceof TrackProp) {
                prop.update()
            }

            

        })

        return gameOver ? CyclingPathIncomingTraffic.GAME_OVER : CyclingPathIncomingTraffic.NOT_DONE;
    }

    public draw(ctx: CanvasRenderingContext2D) {
        this.background.draw(ctx);
        this.props.forEach((prop) => {
            prop.draw(ctx)
        })
    }
}