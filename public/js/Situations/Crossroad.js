import Game from "../Game.js";
import Player from "../Player.js";
import Frikandelbroodje from "../Props/Frikandelbroodje.js";
import ImageProp from "../Props/ImageProp.js";
import TrackProp from "../Props/TrackProp.js";
import Situation from "../Situation.js";
export default class Crossroad extends Situation {
    constructor(canvas, userData, stamina, upgrades) {
        super(canvas, userData, upgrades);
        // Background properties
        this.background = new ImageProp(canvas.width / 3, -canvas.height, 0, 0, canvas.width / 2, canvas.height, './assets/img/objects/KruispuntZebraPad.png', false);
        // Create new props
        this.props = [
            // Add car
            new ImageProp(this.background.getXPos() + (this.background.getWidth() / 3), this.background.getYPos(), 0, 0.05, this.background.getWidth() / 16, this.background.getHeight() / 9, './assets/img/objects/car.png'),
            // Add stamina booster
            new Frikandelbroodje(this.background.getXPos() + (this.background.getWidth() / 2), this.background.getYPos() + (this.background.getHeight() / 2), 0, 0, this.background.getWidth() / 16, this.background.getHeight() / 9, './assets/img/objects/frikandelbroodje.png', 10)
        ];
        // Create props in situation
        this.props = [
            // Add car
            new ImageProp(this.background.getXPos() + (this.background.getWidth() / 3), this.background.getYPos(), 0, 0.05, this.background.getWidth() / 16, this.background.getHeight() / 9, './assets/img/objects/car.png'),
            // Add booster
            new Frikandelbroodje(this.background.getXPos() + (this.background.getWidth() / 2), this.background.getYPos() + (this.background.getHeight() / 2), 0, 0, this.background.getWidth() / 16, this.background.getHeight() / 9, './assets/img/objects/frikandelbroodje.png', 10)
        ];
        // Cyclist who does not give you the right of way
        const badCycle = new ImageProp(this.background.getXPos() - (this.background.getWidth() / 10), this.background.getYPos() + (this.background.getHeight() / 2), 0.3, 0, this.background.getWidth() / 16, this.background.getHeight() / 9, './assets/img/players/fiets1.png');
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
        this.background.getWidth() / 16, this.background.getHeight() / 9, './assets/img/players/fiets1.png');
        // Choose between good and bad cyclist
        Game.randomInteger(0, 1) === 1
            ? this.props.push(badCycle)
            : this.props.push(goodCycle);
        // Create player
        this.player = new Player(this.background.getXPos() + ((this.background.getWidth() / 3) * 2) - ((this.background.getWidth() / 8) / 2), this.background.getWidth() / 1.2, 0, 0, this.background.getWidth() / 20, this.background.getHeight() / 8, stamina);
        // Situation background properties
        this.background = new ImageProp(canvas.width / 3, -canvas.height, 0, 0, canvas.width / 2, canvas.height, './assets/img/objects/KruispuntZebraPad.png');
        // Create player
        this.player = new Player(this.background.getXPos() + ((this.background.getWidth() / 3) * 2) - ((this.background.getWidth() / 8) / 2), this.background.getWidth() / 1.2, 0, 0, this.background.getWidth() / 20, this.background.getHeight() / 8, stamina);
    }
    // Set boundaries to the player's movements
    processInput() {
        this.player.processInput(this.canvas, this.background.getXPos() + this.background.getWidth() / 3, this.background.getXPos() + (this.background.getWidth() / 3) * 2);
    }
}
