import Game from "../Game.js";
import ImageProp from "../Props/ImageProp.js";
import TrackProp from "../Props/TrackProp.js";
import Situation from "../Situation.js";
export default class ParkingSpotCar extends Situation {
    constructor(canvas, userData, playerData, upgrades, skins) {
        super(canvas, userData, playerData, upgrades, skins);
        // Situation background parameters
        this.background = new ImageProp(canvas.width / 3, -canvas.height, 0, 0, canvas.width / 2, canvas.height, './assets/img/objects/Kruispunt.png', false);
        // Define the left boundary of the playing field
        this.leftBoundary = this.background.getXPos() + (this.background.getWidth() / 3);
        // Define the right boundary of the playing field
        this.rightBoundary = this.background.getXPos() + ((this.background.getWidth() / 3) * 2);
        // Create player
        this.player = this.createPlayer();
        this.props = [];
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
        ];
        Game.randomInteger(0, 1) === 1
            ? carVectors.push({
                // Additional movement for the car, if it exists
                // Starting location
                xPos1: this.background.getXPos() + (this.background.getWidth() / 5) * 3.1,
                yPos1: this.background.getYPos() + (this.background.getHeight() / 10) * 8.8,
                // Target position
                xPos2: this.background.getXPos() + (this.background.getWidth() / 5) * 2.5,
                yPos2: this.background.getYPos() + (this.background.getHeight() / 10) * 8.5,
                // Velocities between start and target position
                xVel: -0.04,
                yVel: -0.04
            }, {
                // Starting location
                xPos1: this.background.getXPos() + (this.background.getWidth() / 5) * 2.5,
                yPos1: this.background.getYPos() + (this.background.getHeight() / 10) * 8.5,
                // Target position
                xPos2: this.background.getXPos() + (this.background.getWidth() / 5) * 2.5,
                yPos2: this.background.getYPos() - this.background.getHeight() * 4,
                // Velocities between start and target position
                xVel: 0,
                yVel: -1
            }) : '';
        const car = new TrackProp(carVectors, this.background.getWidth() / 10, this.background.getHeight() / 5, './assets/img/objects/car.png');
        Game.randomInteger(0, 5) === 1
            ? ''
            : this.props.push(car);
    }
}
