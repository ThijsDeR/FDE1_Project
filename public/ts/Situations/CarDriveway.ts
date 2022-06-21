import ImageProp from "../Props/ImageProp.js";
import Situation from "../Situation.js";
import Player from "../Player.js";
import TrackProp from "../Props/TrackProp.js";
import Game from "../Game.js";
import UserData from "../UserData.js";

export default class CarDriveway extends Situation {
    public constructor(
        canvas: HTMLCanvasElement,
        userData: UserData,
        playerData: {xPos: number | null, stamina: number},
        upgrades: Upgrades,
        skins: Skins
    ) {

        super(canvas, userData, upgrades, skins)

        // Situation background properties
        this.background = new ImageProp(
            canvas.width / 3,
            -canvas.height,
            0,
            0,
            canvas.width / 2,
            canvas.height,
            './assets/img/objects/Oprit.png'
        )

        // Define possibilities for driver
        const carVectors: any = []
        Game.randomInteger(0, 1) === 0 ? carVectors.push(

            // GOOD DRIVER
            {
                // Starting position
                xPos1: (this.background.getWidth() * 2 / 1.2),
                yPos1: (this.background.getYPos() + (this.background.getHeight() / 2 - 175)),
                // Target position
                xPos2: (this.background.getWidth() * 2 / 1.4),
                yPos2: (this.background.getYPos() + (this.background.getHeight() / 2 - 175)),
                // Velocities between start and target position
                xVel: -0.2,
                yVel: 0
            },
            {
                // Starting position
                xPos1: (this.background.getWidth() * 2 / 1.4),
                yPos1: (this.background.getYPos() + (this.background.getHeight() / 2 - 175)),
                // Target position
                xPos2: (this.background.getWidth() * 2 / 1.5),
                yPos2: (this.background.getYPos() + (this.background.getHeight() / 2 - 175)),
                // Velocities between start and target position
                xVel: -0.000000000000000000001,
                yVel: 0
            }

        ) : carVectors.push(
            // BAD DRIVER
            {
                // Starting position
                xPos1: (this.background.getWidth() * 2 / 1.2),
                yPos1: (this.background.getYPos() + (this.background.getHeight() / 3.1)),
                // Target position
                xPos2: (this.background.getWidth() / 0.96),
                yPos2: (this.background.getYPos() + (this.background.getHeight() / 3.1)),
                // Velocities between start and target position
                xVel: -0.2,
                yVel: 0
            },
            {
                // Starting position
                xPos1: (this.background.getWidth() / 0.96),
                yPos1: (this.background.getYPos() + (this.background.getHeight() / 3.1)),
                // Target position
                xPos2: (this.background.getWidth() / 0.96),
                yPos2: (this.background.getYPos() + (this.background.getHeight() * 2)),
                // Velocities between start and target position
                xVel: 0,
                yVel: 0.4
            }
        )

        // Create props in situation
        this.props = [
            // Create car
            new TrackProp(
                carVectors,
                canvas.width / 15,
                canvas.height / 7,
                './assets/img/objects/car.png'
            ),
        ]
        let xPos
        if (playerData.xPos) xPos = playerData.xPos
        else xPos = this.background.getXPos() + this.background.getWidth() / 2
        if (xPos < this.background.getWidth() * 1.18) xPos = this.background.getWidth() * 1.18
        else if (xPos > (this.background.getWidth() * 1.384)) xPos = (this.background.getWidth() * 1.384)
        this.player = new Player(xPos, this.background.getHeight() / 1.2, 0, 0, this.background.getWidth() / 20, this.background.getHeight() / 8, playerData.stamina)

    }

    // Set boundaries to the player's movements
    public processInput() {
        this.player.processInput(
            this.canvas,
            this.background.getWidth() * 1.18,
            this.background.getWidth() * 1.384
        )
    }
}
