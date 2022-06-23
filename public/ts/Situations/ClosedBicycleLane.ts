import ImageProp from "../Props/ImageProp.js";
import Situation from "../Situation.js";
import UserData from "../UserData.js";
import BlockedCyclePathSign from "../Props/BlockedCyclePathSign.js";
import StaminaBooster from "../Props/StaminaBooster.js";

export default class ClosedBicycleLane extends Situation {

    public constructor(
        canvas: HTMLCanvasElement,
        userData: UserData,
        playerData: PlayerData,
        upgrades: Upgrades,
        skins: Skins
    ) {
        super(canvas, userData, playerData, upgrades, skins)

        this.background = new ImageProp(
            canvas.width / 3,
            -canvas.height,
            0,
            0,
            canvas.width / 2,
            canvas.height,
            './assets/img/OpritBouwverkeer.png'
        );

        // Define the left boundary of the playing field
        this.leftBoundary = this.background.getWidth() * 1.18

        // Define the right boundary of the playing field
        this.rightBoundary = this.background.getWidth() * 1.35

        // Create player
        this.player = this.createPlayer()

        this.props = [
            new StaminaBooster(
                this.background.getXPos() + (this.background.getWidth() / 1.65),
                this.background.getYPos() + (this.background.getHeight() / 1.70),
                0,
                0,
                this.background.getWidth() / 10,
                this.background.getHeight() / 6,
                this.skins.staminaSkin.src,
                parseInt(this.skins.staminaSkin.baseStamina)
            ),

            new BlockedCyclePathSign(
                this.background.getXPos() + (this.background.getWidth() / 1.65),
                this.background.getYPos() + (this.background.getHeight() / 2.25),
                0,
                0,
                this.background.getWidth() / 8,
                this.background.getHeight() / 5,
                './assets/img/objects/WegAfzetting.png'
            ),
        ]
    }
}
