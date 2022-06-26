import Game from "../Game.js";
import ImageProp from "../Props/ImageProp.js";
import StaminaBooster from "../Props/StaminaBooster.js";
import TrackProp from "../Props/TrackProp.js";
import Situation from "../Situation.js";
import UserData from "../UserData.js";
import Player from "../Player.js";
import KeyListener from "../KeyListener.js";

export default class Crossroad extends Situation {

    public constructor(
        canvas: HTMLCanvasElement,
        userData: UserData,
        playerData: PlayerData,
        upgrades: Upgrades,
        skins: Skins,
        keyListener: KeyListener
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
        this.leftBoundary = this.background.getXPos() + (this.background.getWidth() / 3) - (this.background.getWidth() / 20)

        // Define the right boundary of the playing field
        this.rightBoundary = this.background.getXPos() + ((this.background.getWidth() / 3) * 2) + (this.background.getWidth() / 20)

        // Create player
        this.player = this.createPlayer(keyListener)

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
        
        // Cyclist who does not give you the right of way
        const badCycle = new ImageProp(
            this.background.getXPos() - (this.background.getWidth() / 10),
            this.background.getYPos() + (this.background.getHeight() / 2),
            0.3,
            0,
            this.background.getWidth() / 16,
            this.background.getHeight() / 9,
            './assets/img/players/cycles/fiets1normal.png'
        )

        // Cyclist who does give you the right of way
        const goodCycle = new TrackProp([
            {
                // Starting position
                xPos1: this.background.getXPos() - (this.background.getWidth() / 10),
                yPos1: this.background.getYPos() + (this.background.getHeight() / 2),
                // Target position
                xPos2: this.background.getXPos() + this.background.getWidth() / 5,
                yPos2: this.background.getYPos() + (this.background.getHeight() / 2),
                // Velocities between start and target position
                xVel: 0.3,
                yVel: 0
            },
            {
                // Starting position
                xPos1: this.background.getXPos() + this.background.getWidth() / 5,
                yPos1: this.background.getYPos() + (this.background.getHeight() / 2),
                // Target position
                xPos2: this.background.getXPos() + (this.background.getWidth() / 2),
                yPos2: this.background.getYPos() + (this.background.getHeight() / 2),
                // Velocities between start and target position
                xVel: 0.0000000000000000000000001,
                yVel: 0
            },
        ],
            // Bicycle image properties
            this.background.getWidth() / 16,
            this.background.getHeight() / 9,
            './assets/img/players/cycles/fiets1normal.png'
        )

        // Choose between good and bad cyclist
        Game.randomInteger(0, 1) === 1
            ? this.props.push(badCycle)
            : this.props.push(goodCycle)
    }
}
