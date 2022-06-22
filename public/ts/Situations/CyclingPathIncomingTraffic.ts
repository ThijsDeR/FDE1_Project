import Game from "../Game.js";
import Frikandelbroodje from "../Props/Frikandelbroodje.js";
import ImageProp from "../Props/ImageProp.js";
import TrackProp from "../Props/TrackProp.js";
import Situation from "../Situation.js";
import UserData from "../UserData.js";

export default class CyclingPathIncomingTraffic extends Situation {

    public constructor(
        canvas: HTMLCanvasElement,
        userData: UserData,
        playerData:
            {
                xPos: number | null,
                stamina: number
            },
        upgrades: Upgrades
    ) {
        super(canvas, userData, playerData, upgrades)

        // Situation background
        this.background = new ImageProp(
            canvas.width / 3,
            -canvas.height,
            0,
            0, canvas.width / 2,
            canvas.height,
            './assets/img/MainRoadFixed.png',
            false
        )

        // Define the left boundary of the playing field
        this.leftBoundary = (this.background.getWidth() / 3) + this.background.getXPos()

        // Define the right boundary of the playing field
        this.rightBoundary = ((this.background.getWidth() / 3) * 2) + this.background.getXPos()

        // Create player
        this.player = this.createPlayer()

        // Add props to situation
        this.props = [
            // Static cyclist
            new ImageProp(
                (this.background.getWidth() / 4) + (canvas.width / 3),
                this.background.getYPos(),
                0,
                0.1,
                this.background.getWidth() / 20,
                this.background.getHeight() / 8,
                './assets/img/players/fiets1.png'
            ),
            // Stamina booster
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
        // Dynamic overtaking cyclist
        const cycle = new TrackProp(
            [
                {
                    // TODO: Realign bicycles
                    // Starting location
                    xPos1: (this.background.getWidth() / 2) + (canvas.width / 3),
                    yPos1: this.background.getYPos(),
                    // Target location
                    xPos2: (this.background.getWidth() / 2) + (canvas.width / 3),
                    yPos2: this.background.getYPos() + this.background.getHeight() / 3,
                    // Velocities between start and target position
                    xVel: 0,
                    yVel: 0.15
                },
                {
                    // Starting location
                    xPos1: (this.background.getWidth() / 2) + (canvas.width / 3),
                    yPos1: this.background.getYPos() + this.background.getHeight() / 3,
                    // Target location
                    xPos2: (this.background.getWidth() / 4) + (canvas.width / 3),
                    yPos2: this.background.getYPos() + this.background.getHeight() / 2,
                    // Velocities between start and target position
                    xVel: -0.2,
                    yVel: 0.15
                },
                {
                    // Starting location
                    xPos1: (this.background.getWidth() / 4) + (canvas.width / 3),
                    yPos1: this.background.getYPos() + this.background.getHeight() / 2,
                    // Target location
                    xPos2: (this.background.getWidth() / 4) + (canvas.width / 3),
                    yPos2: this.background.getYPos() + this.background.getHeight() * 2,
                    // Velocities between start and target position
                    xVel: 0,
                    yVel: 0.15
                },
            ],
            // Cyclist image properties
            this.background.getWidth() / 20,
            this.background.getHeight() / 8,
            './assets/img/players/fiets1.png'
        )

        // Choose whether to add the overtaking cyclist or not
        Game.randomInteger(0, 1) === 1 
        ? this.props.push(cycle) 
        : '';
    }
}
