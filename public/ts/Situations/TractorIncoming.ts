import Player from "../Player.js";
import ImageProp from "../Props/ImageProp.js";
import StaminaBooster from "../Props/StaminaBooster.js";
import { Tractor } from "../Props/Tractor.js";
import Situation from "../Situation.js";
import UserData from "../UserData.js";

export default class TractorIncoming extends Situation {

    public constructor(
        canvas: HTMLCanvasElement,
        userData: UserData,
        playerData:
            {
                xPos: number | null,
                stamina: number
            },
        upgrades: Upgrades
    ) {

        super(canvas, userData, playerData, upgrades)

        // Create situation background
        this.background = new ImageProp(
            canvas.width / 3,
            -canvas.height,
            0,
            0,
            canvas.width / 2,
            canvas.height,
            './assets/img/Polderweg.png',
            false
        )

        // Define the left boundary of the playing field
        this.leftBoundary = this.background.getXPos() + (this.background.getWidth() / 3)

        // Define the right boundary of the playing field
        this.rightBoundary = this.background.getXPos() + ((this.background.getWidth() / 3) * 2)

        // Create player
        this.player = this.createPlayer()

        // Create props in situation
        this.props = [
            // Create tractor
            new Tractor(
                this.background.getXPos() + (this.background.getWidth() / 2.7),
                this.background.getYPos(),
                0,
                0.05,
                this.background.getWidth() / 5,
                this.background.getHeight() / 5),
        ]
    }

    // Additional collission handling
    protected handleCollission(prop: ImageProp, propIndex: number): boolean {
        let gameOver = false;
        if (prop.collidesWithOtherImageProp(this.player)) {
            if (prop instanceof StaminaBooster) {
                this.handleStaminaChange(prop, propIndex)
            } else {
                this.crashSound.play()
                gameOver = true;
            }
        }

        // Fail player if speeding past tractor
        if (prop instanceof Tractor) {
            if (this.player.getYVel() === Player.MAX_SPEED_X &&
                this.player.getYPos() >= prop.getYPos() - prop.getHeight() &&
                this.player.getYPos() <= prop.getYPos()) {
                gameOver = true;
            }
        }
        return gameOver
    }
}
