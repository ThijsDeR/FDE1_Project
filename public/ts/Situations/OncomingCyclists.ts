import ImageProp from "../Props/ImageProp.js";
import TrackProp from "../Props/TrackProp.js";
import Situation from "../Situation.js";
import UserData from "../UserData.js";

export default class OncomingCyclist extends Situation {

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
        this.leftBoundary = this.background.getXPos() + (this.background.getWidth() / 3)

        // Define the right boundary of the playing field
        this.rightBoundary = this.background.getXPos() + ((this.background.getWidth() / 3) * 2)

        // Create player
        this.player = this.createPlayer()

        // TODO: Re-align bicycles
        // Create props in situation
        this.props = [
            // Create bicyclist
            new ImageProp(
                this.background.getXPos() + (this.background.getWidth() / 3.5),
                this.background.getYPos(),
                0,
                0.32,
                this.background.getWidth() / 16,
                this.background.getHeight() / 5,
                './assets/img/players/fiets1.png'
            ),

            // Create dynamic bicyclist
            new TrackProp(
                [
                    {
                        // Starting position
                        xPos1: this.background.getXPos() + (this.background.getWidth() / 3.75),
                        yPos1: this.background.getYPos() + (this.background.getHeight() / 4),
                        // Target position
                        xPos2: this.background.getXPos() + ((this.background.getWidth() / 4) * 3),
                        yPos2: this.background.getYPos() + (this.background.getHeight() / 1.75),
                        // Velocities between start and target position
                        xVel: 0.17,
                        yVel: 0.10
                    },
                    {
                        // Starting position
                        xPos1: this.background.getXPos() + ((this.background.getWidth() / 4) * 3),
                        yPos1: this.background.getYPos() + (this.background.getHeight() / 1.75),
                        // Target position
                        xPos2: this.background.getXPos() + (this.background.getWidth() * 2),
                        yPos2: this.background.getYPos() + (this.background.getHeight() / 1.75),
                        // Velocities between start and target position
                        xVel: 0.17,
                        yVel: 0
                    },
                ],
                // Prop image properties
                this.background.getWidth() / 16,
                this.background.getHeight() / 5,
                './assets/img/players/fiets1.png'
            )
        ]
    }
}
