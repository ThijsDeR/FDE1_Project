import ImageProp from "../Props/ImageProp.js";
import Situation from "../Situation.js";
import UserData from "../UserData.js";
import BlockedCyclePathSign from "../Props/BlockedCyclePathSign.js";
import StaminaBooster from "../Props/StaminaBooster.js";
import KeyListener from "../KeyListener.js";
import Game from "../Game.js";

export default class ClosedBicycleLane extends Situation {

    public constructor(
        canvas: HTMLCanvasElement,
        userData: UserData,
        playerData: PlayerData,
        upgrades: Upgrades,
        skins: Skins,
        keyListener: KeyListener
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
        this.leftBoundary = this.background.getXPos() + (this.background.getWidth() / 3) - (this.background.getWidth() / 20)

        // Define the right boundary of the playing field
        this.rightBoundary = this.background.getXPos() + ((this.background.getWidth() / 3) * 2) + (this.background.getWidth() / 20)

        // Create player
        this.player = this.createPlayer(keyListener)

        this.props = [

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

        Game.randomInteger(0, 2) === 1 ? this.props.push(
            new StaminaBooster(
                this.background.getXPos() + (this.background.getWidth() / 2),
                this.background.getYPos() + (this.background.getHeight() / 2),
                0,
                0,
                this.background.getWidth() / 16,
                this.background.getHeight() / 9,
                this.skins.staminaSkin.src,
                parseInt(this.skins.staminaSkin.baseStamina)
            )
        ) : ''
    }
}
