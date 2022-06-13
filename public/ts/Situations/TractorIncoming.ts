import Game from "../Game.js";
import Player from "../Player.js";
import Frikandelbroodje from "../Props/Frikandelbroodje.js";
import ImageProp from "../Props/ImageProp.js";
import Prop from "../Props/Prop.js";
import StaminaBooster from "../Props/StaminaBooster.js";
import { Tractor } from "../Props/Tractor.js";
import Situation from "../Situation.js";
import UserData from "../UserData.js";

export default class TractorIncoming extends Situation {


    public constructor(canvas: HTMLCanvasElement, userData: UserData, stamina: number, upgrades: { stamina_resistance: { level: number, price: number }, stamina_gain: { level: number, price: number } }) {
        super(canvas, userData, upgrades)

        this.background = new ImageProp(canvas.width / 3, -canvas.height, 0, 0, canvas.width / 2, canvas.height, './assets/img/Polderweg.png');
        this.props = [
            new Tractor(this.background.getXPos() + (this.background.getWidth() / 2.7), this.background.getYPos(), 0, 0.05, this.background.getWidth() / 5, this.background.getHeight() / 5),
        ]
        this.canvas = canvas;

        this.player = new Player(this.background.getXPos() + ((this.background.getWidth() / 3) * 2) - ((this.background.getWidth() / 8) / 2), this.background.getHeight() / 1.2, 0, 0, this.background.getWidth() / 20, this.background.getHeight() / 8, stamina)


    }

    protected handleCollission(prop: Prop, propIndex: number, elapsed: number): boolean {
        let gameOver = false;
        if (prop.collidesWithOtherProp(this.player)) {
            if (prop instanceof StaminaBooster) {
                this.handleStaminaChange(prop, propIndex)
            } else {
                this.crashSound.play()
                gameOver = true;
            }
        }

        if (prop instanceof Tractor) {
            if (this.player.getYVel() === Player.MAX_SPEED_X &&
            this.player.getYPos() >= prop.getYPos() - prop.getHeight() &&
            this.player.getYPos() <= prop.getYPos()) {
                gameOver = true;
            }
        }

        return gameOver


    }

    public processInput() {
        this.player.processInput(this.canvas, this.background.getXPos() + (this.background.getWidth() / 4), this.background.getXPos() + this.background.getWidth() - (this.background.getWidth() / 3.5));
    }
}
