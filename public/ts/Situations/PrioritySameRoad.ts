import Game from "../Game.js";
import KeyListener from "../KeyListener.js";
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
        skins: Skins,
        keyListener: KeyListener,
        allowedMist: boolean
    ) {

        super(canvas, userData, playerData, upgrades, skins, allowedMist)

        // Create situation background
        this.background = new ImageProp(
            this.canvas.width / 3,
            -this.canvas.height,
            0,
            0,
            this.canvas.width / 2,
            canvas.height,
            './assets/img/objects/Oprit_1.png',
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
            // Create car
            new ImageProp(
                this.background.getXPos() + this.background.getWidth() / 3,
                this.background.getYPos(),
                0,
                0.05,
                this.background.getWidth() / 16,
                this.background.getHeight() / 9,
                './assets/img/objects/car2.png'
            ),
        ]

        const cycleVectors = [
            {
                // Starting position
                xPos1: this.background.getXPos() + this.background.getWidth() / 2,
                yPos1: (this.background.getHeight() * 2) + this.background.getYPos(),
                // Target position
                xPos2: this.background.getXPos() + this.background.getWidth() / 2,
                yPos2: this.background.getHeight() / 2 + this.background.getYPos(),
                // Velocities between start and target position
                xVel: 0,
                yVel: -1
            },
        ]

        Game.randomInteger(0, 1) === 1 ? cycleVectors.push(
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
            }
        ) : ''

        Game.randomInteger(0, 5) === 1 ? '' : this.props.push(
            new TrackProp(
                cycleVectors,
                // Prop image properties
                this.background.getWidth() / 20,
                this.background.getHeight() / 8,
                './assets/img/players/cycles/fiets1normal.png'
            ),
        )

        Game.randomInteger(0, 2) === 1 ? this.props.push(
            new StaminaBooster(
                this.background.getXPos() + ((this.background.getWidth() / 3) * 2) - (this.background.getWidth() / 30),
                this.background.getYPos() + ((this.background.getHeight() / 3) * 2),
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
