import Game from "../Game.js";
import KeyListener from "../KeyListener.js";
import ImageProp from "../Props/ImageProp.js";
import StaminaBooster from "../Props/StaminaBooster.js";
import TrackProp from "../Props/TrackProp.js";
import Situation from "../Situation.js";
import UserData from "../UserData.js";

export default class PedestrianCrossingVan extends Situation {
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
        
        this.leftSideDrawBack = false;

        // Situation background parameters
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

        // Add props to the situation
        this.props = [
            // Add car
            new ImageProp(
                this.background.getXPos() + (this.background.getWidth() / 5) * 3,
                this.background.getYPos() + (this.background.getHeight() / 10) * 9,
                0,
                0,
                this.background.getWidth() / 10,
                this.background.getHeight() / 5,
                './assets/img/objects/car.png',
                false
            )
        ]

        Game.randomInteger(0, 2) === 1 ? this.props.push(
            new StaminaBooster(
                this.background.getXPos() + (this.background.getWidth() / 2),
                this.background.getYPos() + (this.background.getHeight()),
                0,
                0,
                this.background.getWidth() / 16,
                this.background.getHeight() / 9,
                this.skins.staminaSkin.src,
                parseInt(this.skins.staminaSkin.baseStamina)
            )
        ) : ''

        // Pedestrian movements
        const personWalking = new TrackProp([
            {
                // Starting location
                xPos1: this.background.getXPos() + (this.background.getWidth() / 3) * 2,
                yPos1: this.background.getYPos() + this.background.getHeight(),
                // Target position
                xPos2: this.background.getXPos() + (this.background.getWidth() / 3) * 2,
                yPos2: this.background.getYPos() + (this.background.getHeight() / 3) * 2,
                // Velocities between start and target position
                xVel: 0,
                yVel: -(Game.randomInteger(10, 30) / 100)
            },
            {
                // Starting location
                xPos1: this.background.getXPos() + (this.background.getWidth() / 3) * 2,
                yPos1: this.background.getYPos() + (this.background.getHeight() / 3) * 2,
                // Target position
                xPos2: this.background.getXPos(),
                yPos2: this.background.getYPos() + (this.background.getHeight() / 3) * 2,
                // Velocities between start and target position
                xVel: -(Game.randomInteger(10, 30) / 100),
                yVel: 0
            },
        ],
            // Pedestrian image parameters
            this.background.getWidth() / 10,
            this.background.getHeight() / 5,
            './assets/img/players/character_maleAdventurer_walk0.png',
            false
        )

        Game.randomInteger(0, 1) === 1
            ? this.props.push(personWalking)
            : ''
    }
}
