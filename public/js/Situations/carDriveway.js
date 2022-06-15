import ImageProp from "../Props/ImageProp.js";
import Situation from "../Situation.js";
import Player from "../Player.js";
import TrackProp from "../Props/TrackProp.js";
import Game from "../Game.js";
export default class CarDriveway extends Situation {
    constructor(canvas, userData, stamina, upgrades) {
        super(canvas, userData, upgrades);
        // Situation background properties
        this.background = new ImageProp(canvas.width / 3, -canvas.height, 0, 0, canvas.width / 2, canvas.height, './assets/img/objects/Oprit.png');
        // Define possibilities for driver
        const carVectors = [];
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
        }, {
            // Starting position
            xPos1: (this.background.getWidth() * 2 / 1.4),
            yPos1: (this.background.getYPos() + (this.background.getHeight() / 2 - 175)),
            // Target position
            xPos2: (this.background.getWidth() * 2 / 1.5),
            yPos2: (this.background.getYPos() + (this.background.getHeight() / 2 - 175)),
            // Velocities between start and target position
            xVel: -0.000000000000000000001,
            yVel: 0
        }) : carVectors.push(
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
        }, {
            // Starting position
            xPos1: (this.background.getWidth() / 0.96),
            yPos1: (this.background.getYPos() + (this.background.getHeight() / 3.1)),
            // Target position
            xPos2: (this.background.getWidth() / 0.96),
            yPos2: (this.background.getYPos() + (this.background.getHeight() * 2)),
            // Velocities between start and target position
            xVel: 0,
            yVel: 0.4
        });
        // Create props in situation
        this.props = [
            // Create car
            new TrackProp(carVectors, canvas.width / 15, canvas.height / 7, './assets/img/objects/car.png'),
        ];
        // Create the player
        this.player = new Player(canvas.width / 1.55, canvas.height / 1.2, 0, 0, canvas.width / 20, canvas.height / 8, stamina);
    }
    // Set boundaries to the player's movements
    processInput() {
        this.player.processInput(this.canvas, this.background.getWidth() * 1.18, this.background.getWidth() * 1.384);
    }
}
