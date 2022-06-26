import ImageProp from "../Props/ImageProp.js";
import Situation from "../Situation.js";
import TrackProp from "../Props/TrackProp.js";
import Game from "../Game.js";
import UserData from "../UserData.js";
import KeyListener from "../KeyListener.js";
import StaminaBooster from "../Props/StaminaBooster.js";

export default class CarDriveway extends Situation {
    public constructor(
        canvas: HTMLCanvasElement,
        userData: UserData,
        playerData: PlayerData,
        upgrades: Upgrades,
        skins: Skins,
        keyListener: KeyListener
    ) {

        super(canvas, userData, playerData, upgrades, skins)

        // Situation background properties
        this.background = new ImageProp(
            canvas.width / 3,
            -canvas.height,
            0,
            0,
            canvas.width / 2,
            canvas.height,
            './assets/img/objects/Oprit_1.png'
        )

        // Define the left boundary of the playing field
        this.leftBoundary = this.background.getXPos() + (this.background.getWidth() / 3) - (this.background.getWidth() / 20)

        // Define the right boundary of the playing field
        this.rightBoundary = this.background.getXPos() + ((this.background.getWidth() / 3) * 2) + (this.background.getWidth() / 20)

        // Create player
        this.player = this.createPlayer(keyListener)

        // Define possibilities for driver
        const carVectors: any = []
        Game.randomInteger(0, 1) === 0
            ? carVectors.push(

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

        Game.randomInteger(0, 2) === 1 ? this.props.push(
            new StaminaBooster(
                this.background.getXPos() + ((this.background.getWidth() / 3) * 2) - (this.background.getWidth() / 30),
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
