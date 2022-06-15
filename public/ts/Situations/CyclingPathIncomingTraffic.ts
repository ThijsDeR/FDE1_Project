import Player from "../Player.js";
import Frikandelbroodje from "../Props/Frikandelbroodje.js";
import ImageProp from "../Props/ImageProp.js";
import TrackProp from "../Props/TrackProp.js";
import Situation from "../Situation.js";
import UserData from "../UserData.js";

export default class CyclingPathIncomingTraffic extends Situation {

    public constructor(
        canvas: HTMLCanvasElement,
        userData: UserData,
        stamina: number,
        upgrades: {
            stamina_resistance: {
                level: number,
                price: number
            }, stamina_gain: {
                level: number,
                price: number
            }
        }) {

        super(canvas, userData, upgrades)

        // Situation background properties
        this.background = new ImageProp(
            canvas.width / 3,
            -canvas.height,
            0,
            0,
            canvas.width / 2,
            canvas.height,
            './assets/img/MainRoadFixed.png'
        )

        // Create props in situation
        this.props = [
            // Create bicycle
            new ImageProp(
                (this.background.getWidth() / 4) + (canvas.width / 3),
                this.background.getYPos(),
                0,
                0.1,
                canvas.width / 20,
                canvas.height / 8,
                './assets/img/players/fiets1.png'
            ),

            // Create dynamic bicycle
            new TrackProp(
                [
                    {
                        // Starting position
                        xPos1: (this.background.getWidth() / 2) + (canvas.width / 3),
                        yPos1: this.background.getYPos(),
                        // Target position
                        xPos2: (this.background.getWidth() / 2) + (canvas.width / 3),
                        yPos2: this.background.getYPos() + this.background.getHeight() / 3,
                        // Velocities between start and target position
                        xVel: 0,
                        yVel: 0.15
                    },
                    {
                        // Starting position
                        xPos1: (this.background.getWidth() / 2) + (canvas.width / 3),
                        yPos1: this.background.getYPos() + this.background.getHeight() / 3,
                        // Target position
                        xPos2: (this.background.getWidth() / 4) + (canvas.width / 3),
                        yPos2: this.background.getYPos() + this.background.getHeight() / 2,
                        // Velocities between start and target position
                        xVel: -0.2,
                        yVel: 0.15
                    },
                    {
                        // Starting position
                        xPos1: (this.background.getWidth() / 4) + (canvas.width / 3),
                        yPos1: this.background.getYPos() + this.background.getHeight() / 2,
                        // Target position
                        xPos2: (this.background.getWidth() / 4) + (canvas.width / 3),
                        yPos2: this.background.getYPos() + this.background.getHeight() * 2,
                        // Velocities between start and target position
                        xVel: 0,
                        yVel: 0.15
                    },
                ],

                // Image properties
                canvas.width / 20,
                canvas.height / 8,
                './assets/img/players/fiets1.png'
            ),

            // Create stamina booster
            new Frikandelbroodje(
                (this.background.getWidth() / 2) + (canvas.width / 3),
                this.background.getYPos() + (this.background.getHeight()),
                0,
                0,
                canvas.width / 15,
                canvas.height / 8,
                './assets/img/objects/frikandelbroodje.png',
                10
            )
        ]

        // Create player
        this.player = new Player(
            this.background.getXPos() + ((this.background.getWidth() / 3) * 2) - ((this.background.getWidth() / 8) / 2),
            this.background.getHeight() / 1.2,
            0,
            0,
            this.background.getWidth() / 20,
            this.background.getHeight() / 8,
            stamina
        )
    }
    
    // Set boundaries to the player's movements
    public processInput() {
        this.player.processInput(
            this.canvas,
            (this.background.getWidth() / 3) + this.background.getXPos(),
            ((this.background.getWidth() / 3) * 2) + this.background.getXPos()
        )
    }
}
