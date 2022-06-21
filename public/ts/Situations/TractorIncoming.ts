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
        playerData: {xPos: number | null, stamina: number},
        upgrades: Upgrades,
        skins: Skins
    ) {

        super(canvas, userData, upgrades, skins)

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
        this.canvas = canvas;

        let xPos
        if (playerData.xPos) xPos = playerData.xPos
        else xPos = this.background.getXPos() + ((this.background.getWidth() / 3) * 2) - ((this.background.getWidth() / 8) / 2)
        if (xPos < this.background.getXPos() + (this.background.getWidth() / 4)) xPos = this.background.getXPos() + (this.background.getWidth() / 4)
        else if (xPos > this.background.getXPos() + this.background.getWidth() - (this.background.getWidth() / 3.5)) xPos = this.background.getXPos() + this.background.getWidth() - (this.background.getWidth() / 3.5)
        this.player = new Player(xPos, this.background.getHeight() / 1.2, 0, 0, this.background.getWidth() / 20, this.background.getHeight() / 8, playerData.stamina)


    }

    // 
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

    // Set boundaries to the player's movements
    public processInput() {
        this.player.processInput(
            this.canvas,
            this.background.getXPos() + (this.background.getWidth() / 4),
            this.background.getXPos() + this.background.getWidth() - (this.background.getWidth() / 3.5)
        )
    }
}
