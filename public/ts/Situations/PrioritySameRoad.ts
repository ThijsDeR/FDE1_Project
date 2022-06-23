import ImageProp from "../Props/ImageProp.js";
import StaminaBooster from "../Props/StaminaBooster.js";
import TrackProp from "../Props/TrackProp.js";
import Situation from "../Situation.js";
import UserData from "../UserData.js";

export default class PrioritySameRoad extends Situation {
    public constructor(
        canvas: HTMLCanvasElement,
        userData: UserData,
        playerData: PlayerData,
        upgrades: Upgrades,
        skins: Skins
    ) {

        super(canvas, userData, playerData, upgrades, skins)

        // Create situation background
        this.background = new ImageProp(
            this.canvas.width / 3,
            -this.canvas.height,
            0,
            0,
            this.canvas.width / 2,
            canvas.height,
            './assets/img/Oprit.png',
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
            // Create car
            new ImageProp(
                this.background.getXPos() + this.background.getWidth() / 3,
                this.background.getYPos(),
                0,
                0.05,
                this.background.getWidth() / 16,
                this.background.getHeight() / 9,
                './assets/img/objects/car.png'
            ),
            // Create dynamic bicycle
            new TrackProp(
                [
                    {
                        // Starting position
                        xPos1: this.background.getXPos() + this.background.getWidth() / 2,
                        yPos1: (this.background.getHeight() * 2) + this.background.getYPos(),
                        // Target position
                        xPos2: this.background.getXPos() + this.background.getWidth() / 2,
                        yPos2: this.background.getHeight() / 2 + this.background.getYPos(),
                        // Velocities between start and target position
                        xVel: 0,
                        yVel: -0.5
                    },
                    {
                        // Starting position
                        xPos1: this.background.getXPos() + this.background.getWidth() / 2,
                        yPos1: this.background.getHeight() / 2 + this.background.getYPos(),
                        // Target position
                        xPos2: this.background.getXPos() + this.background.getWidth(),
                        yPos2: this.background.getHeight() / 2 + this.background.getYPos(),
                        // Velocities between start and target position
                        xVel: 0.20,
                        yVel: 0
                    },
                ],
                // Prop image properties
                this.background.getWidth() / 20,
                this.background.getHeight() / 8,
                './assets/img/players/fiets1.png'
            ),

            // Create stamina booster
            new StaminaBooster(
                this.background.getXPos() + this.background.getWidth() / 2,
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
