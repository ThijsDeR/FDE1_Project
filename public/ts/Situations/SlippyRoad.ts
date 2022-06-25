import Game from "../Game.js";
import ImageProp from "../Props/ImageProp.js";
import StaminaBooster from "../Props/StaminaBooster.js";
import TrackProp from "../Props/TrackProp.js";
import Situation from "../Situation.js";
import SlippyPlayer from "../SlippyPlayer.js";
import UserData from "../UserData.js";


export default class SlippyRoad extends Situation {

    public constructor(
        canvas: HTMLCanvasElement,
        userData: UserData,
        playerData: PlayerData,
        upgrades: Upgrades,
        skins: Skins
    ) {
        super(canvas, userData, playerData, upgrades, skins)
        // Background properties
        this.background = new ImageProp(
            canvas.width / 3,
            -canvas.height,
            0,
            0,
            canvas.width / 2,
            canvas.height,
            './assets/img/objects/Kruispunt.png',
            false
        )
       
        // Define the left boundary of the playing field
        this.leftBoundary = this.background.getXPos() + this.background.getWidth() / 3

        // Define the right boundary of the playing field
        this.rightBoundary = this.background.getXPos() + (this.background.getWidth() / 3) * 2

        // Create player
        this.player = new SlippyPlayer(
            // xPos
            this.checkPlayerPosition(),
            // yPos
            this.background.getHeight() / 1.2,
            // xVel (Handled in player.ts)
            0,
            // yVel (Handled in player.ts)
            0,
            // Width
            this.background.getWidth() / 20,
            // Height
            this.background.getHeight() / 8,
            // Stamina
            this.playerData.stamina,

            this.skins.bicycleSkin
        );

        // Create props in situation
        this.props = [
            // Add car
            new ImageProp(
                this.background.getXPos() + (this.background.getWidth() / 3),
                this.background.getYPos(),
                0,
                0.05,
                this.background.getWidth() / 16,
                this.background.getHeight() / 9,
                './assets/img/objects/car3.png'
            ),

            // Add stamina booster
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
        ] 
    }
}
