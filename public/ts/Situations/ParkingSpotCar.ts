import Game from "../Game.js";
import KeyListener from "../KeyListener.js";
import ImageProp from "../Props/ImageProp.js";
import StaminaBooster from "../Props/StaminaBooster.js";
import TrackProp from "../Props/TrackProp.js";
import Situation from "../Situation.js";
import UserData from "../UserData.js";

export default class ParkingSpotCar extends Situation {
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

        // Situation background parameters
        this.background = new ImageProp(
            canvas.width / 3, -canvas.height,
            0,
            0,
            canvas.width / 2,
            canvas.height, './assets/img/objects/Kruispunt.png',
            false
        )

        // Define the left boundary of the playing field
        this.leftBoundary = this.background.getXPos() + (this.background.getWidth() / 3) - (this.background.getWidth() / 20)

        // Define the right boundary of the playing field
        this.rightBoundary = this.background.getXPos() + ((this.background.getWidth() / 3) * 2) + (this.background.getWidth() / 20)

        // Create player
        this.player = this.createPlayer(keyListener)

        this.props = []

        const carVectors = [
            {
                // Base car movement
                // Starting location
                xPos1: this.background.getXPos() + (this.background.getWidth() / 5) * 3.2,
                yPos1: this.background.getYPos() + (this.background.getHeight() / 10) * 9.5,
                // Target position
                xPos2: this.background.getXPos() + (this.background.getWidth() / 5) * 3.2,
                yPos2: this.background.getYPos() + (this.background.getHeight() / 10) * 9.5,
                // Velocities between start and target position
                xVel: 0,
                yVel: 0
            },
            {
                // Starting location
                xPos1: this.background.getXPos() + (this.background.getWidth() / 5) * 3.2,
                yPos1: this.background.getYPos() + (this.background.getHeight() / 10) * 9.5,
                // Target position
                xPos2: this.background.getXPos() + (this.background.getWidth() / 5) * 3.1,
                yPos2: this.background.getYPos() + (this.background.getHeight() / 10) * 8.8,
                // Velocities between start and target position
                xVel: -0.04,
                yVel: -0.04
            }
        ]

        if (Game.randomInteger(0, 1) === 1) {
            carVectors.push(
                {
                    // Additional movement for the car, if it exists
                    // Starting location
                    xPos1: this.background.getXPos() + (this.background.getWidth() / 5) * 3.1,
                    yPos1: this.background.getYPos() + (this.background.getHeight() / 10) * 8.8,
                    // Target position
                    xPos2: this.background.getXPos() + (this.background.getWidth() / 5) * 2.5,
                    yPos2: this.background.getYPos() + (this.background.getHeight() / 10) * 7.5,
                    // Velocities between start and target position
                    xVel: -0.04,
                    yVel: -0.04
                },
                {
                    // Starting location
                    xPos1: this.background.getXPos() + (this.background.getWidth() / 5) * 2.5,
                    yPos1: this.background.getYPos() + (this.background.getHeight() / 10) * 7.5,
                    // Target position
                    xPos2: this.background.getXPos() + (this.background.getWidth() / 5) * 2.5,
                    yPos2: this.background.getYPos() - this.background.getHeight() * 4,
                    // Velocities between start and target position
                    xVel: 0,
                    yVel: -1
                },
            )

            Game.randomInteger(0, 2) === 1 ? this.props.push(
                new StaminaBooster(
                    this.background.getXPos() + ((this.background.getWidth() / 3) * 2) - (this.background.getWidth() / 30),
                    this.background.getYPos() + (this.background.getHeight() * 1.2),
                    0,
                    0,
                    this.background.getWidth() / 16,
                    this.background.getHeight() / 9,
                    this.skins.staminaSkin.src,
                    parseInt(this.skins.staminaSkin.baseStamina)
                )
            ) : ''
        } else {
            this.leftSideDrawBack = false;
            Game.randomInteger(0, 2) === 1 ? this.props.push(
                new StaminaBooster(
                    this.background.getXPos() + (this.background.getWidth() / 2),
                    this.background.getYPos() + (this.background.getHeight()) ,
                    0,
                    0,
                    this.background.getWidth() / 16,
                    this.background.getHeight() / 9,
                    this.skins.staminaSkin.src,
                    parseInt(this.skins.staminaSkin.baseStamina)
                )
            ) : ''
        }


        const car = new TrackProp(
            carVectors,
            this.background.getWidth() / 10,
            this.background.getHeight() / 5,
            './assets/img/objects/car.png'
        )

        Game.randomInteger(0, 5) === 1
            ? ''
            : this.props.push(car)
    }
}
