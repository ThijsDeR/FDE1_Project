import Game from "../Game.js";
import Player from "../Player.js";
import Frikandelbroodje from "../Props/Frikandelbroodje.js";
import ImageProp from "../Props/ImageProp.js";
import StaminaBooster from "../Props/StaminaBooster.js";
import StopSign from "../Props/StopSign.js";
import Situation from "../Situation.js";
import UserData from "../UserData.js";

export default class CrossroadStopSign extends Situation {
    public static readonly NOT_DONE: number = 0;

    public static readonly GAME_OVER: number = 1;

    public static readonly FINISHED: number = 2;

    public constructor(canvas: HTMLCanvasElement, userData: UserData, stamina: number, upgrades: {stamina_resistance: {level: number, price: number}, stamina_gain: {level: number, price: number}}) {
        super(canvas, userData, upgrades)
        this.background = new ImageProp(0, -canvas.height, 0, 0, canvas.width, canvas.height, './assets/img/objects/Kruispunt_2.png');
        this.props = [
            new ImageProp(0 - (this.background.getWidth() / 10), this.background.getYPos() + (this.background.getHeight() / 2), (Game.randomInteger(1, 15) / 10), 0, this.background.getWidth() / 10, this.background.getHeight() / 5, './assets/img/players/fiets1.png'),
            new ImageProp(this.background.getWidth() / 3, this.background.getYPos(), 0, 0.05, this.background.getWidth() / 16, this.background.getHeight() / 9, './assets/img/objects/w_button.png'),
            new Frikandelbroodje(this.background.getWidth() / 2, this.background.getYPos() + (this.background.getHeight() / 2), 0, 0, this.background.getWidth() / 16, this.background.getHeight() / 9, './assets/img/objects/frikandelbroodje.png', 10),
            new StopSign(this.background.getWidth() / 1.9, this.background.getYPos() + (this.background.getHeight() / 1.1), 0, 0, this.background.getWidth() / 16, this.background.getHeight() / 9, './assets/img/objects/stopbord.png')
        ]

        this.player = new Player((canvas.width / 2) - ((canvas.width / 8) / 2), canvas.height / 1.2, 0, 0, canvas.width / 20, canvas.height / 8, stamina)
    }


    public update(elapsed: number) {
        this.player.move(elapsed);
        this.player.update(elapsed)
        this.background.move(elapsed)
        this.background.scroll(elapsed, this.player.getYVel())

        if (this.player.getYPos() < this.background.getYPos() - this.background.getHeight()) {
            return CrossroadStopSign.FINISHED;
        }
        const crash = new Audio('./audio/bike_crash.mp3');
        crash.volume = 0.7
        let gameOver = false;
        this.props.forEach((prop, propIndex) => {
            console.log(prop.getXVel())
            if (this.background.getYPos() + (this.background.getHeight() / 2) > 0) {
                prop.move(elapsed)
            }

            prop.scroll(elapsed, this.player.getYVel())

            if (prop.collidesWithOtherProp(this.player)) {
                if (prop instanceof StaminaBooster) {
                    this.player.changeStamina(prop.getStaminaBoostAmount() * ((50 + this.upgrades.stamina_gain.level) / 50));
                    this.props.splice(propIndex, 1);
                } else if (prop instanceof StopSign) {
                    if (this.player.isStopped()) {
                        prop.activate()
                    }
                }

                else {
                    gameOver = true;
                    crash.play();
                }
            }

            if (prop instanceof StopSign) {
                if (prop.getYPos() > this.player.getYPos() + this.player.getHeight()) {
                    if (prop.isActive()) {
                        this.props.splice(propIndex, 1);
                    } else {
                        gameOver = true;
                    }

                }
            }



        })

        if(this.player.getStamina() >= 0) this.player.changeStamina(-0.025 / ((50 + this.upgrades.stamina_resistance.level) / 50));
        else gameOver = true;

        return gameOver ? CrossroadStopSign.GAME_OVER : CrossroadStopSign.NOT_DONE;
    }

    public draw(ctx: CanvasRenderingContext2D) {
        this.background.draw(ctx);
        this.props.forEach((prop) => {
            prop.draw(ctx)
        })
    }
}
