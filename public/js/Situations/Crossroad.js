import Game from "../Game.js";
import Player from "../Player.js";
import Frikandelbroodje from "../Props/Frikandelbroodje.js";
import ImageProp from "../Props/ImageProp.js";
import TrackProp from "../Props/TrackProp.js";
import Situation from "../Situation.js";
export default class Crossroad extends Situation {
    constructor(canvas, userData, stamina, upgrades) {
        super(canvas, userData, upgrades);
        this.background = new ImageProp(canvas.width / 3, -canvas.height, 0, 0, canvas.width / 2, canvas.height, './assets/img/objects/KruispuntZebraPad.png', false);
        this.props = [
            new ImageProp(this.background.getXPos() + (this.background.getWidth() / 3), this.background.getYPos(), 0, 0.05, this.background.getWidth() / 16, this.background.getHeight() / 9, './assets/img/objects/car.png'),
            new Frikandelbroodje(this.background.getXPos() + (this.background.getWidth() / 2), this.background.getYPos() + (this.background.getHeight() / 2), 0, 0, this.background.getWidth() / 16, this.background.getHeight() / 9, './assets/img/objects/frikandelbroodje.png', 10)
        ];
        const badCycle = new ImageProp(this.background.getXPos() - (this.background.getWidth() / 10), this.background.getYPos() + (this.background.getHeight() / 2), 0.3, 0, this.background.getWidth() / 16, this.background.getHeight() / 9, './assets/img/players/fiets1.png');
        const goodCycle = new TrackProp([
            {
                xPos1: this.background.getXPos() - (this.background.getWidth() / 10), yPos1: this.background.getYPos() + (this.background.getHeight() / 2),
                xPos2: this.background.getXPos() + this.background.getWidth() / 5, yPos2: this.background.getYPos() + (this.background.getHeight() / 2),
                xVel: 0.3, yVel: 0
            },
            {
                xPos1: this.background.getXPos() + this.background.getWidth() / 5, yPos1: this.background.getYPos() + (this.background.getHeight() / 2),
                xPos2: this.background.getXPos() + (this.background.getWidth() / 2), yPos2: this.background.getYPos() + (this.background.getHeight() / 2),
                xVel: 0.0000000000000000000000001, yVel: 0
            },
        ], this.background.getWidth() / 16, this.background.getHeight() / 9, './assets/img/players/fiets1.png');
        Game.randomInteger(0, 1) === 1 ? this.props.push(badCycle) : this.props.push(goodCycle);
        this.player = new Player(this.background.getXPos() + ((this.background.getWidth() / 3) * 2) - ((this.background.getWidth() / 8) / 2), this.background.getWidth() / 1.2, 0, 0, this.background.getWidth() / 20, this.background.getHeight() / 8, stamina);
        super(canvas, userData, upgrades);
        // Situation background properties
        this.background = new ImageProp(canvas.width / 3, -canvas.height, 0, 0, canvas.width / 2, canvas.height, './assets/img/objects/KruispuntZebraPad.png');
        // Create props in situation
        this.props = [
            // Add bicyclist
            new ImageProp(0 - (this.background.getWidth() / 10), this.background.getYPos() + (this.background.getHeight() / 2), (Game.randomInteger(1, 15) / 10), 0, this.background.getWidth() / 10, this.background.getHeight() / 5, './assets/img/players/fiets1.png'),
            // Add car
            new ImageProp(this.background.getXPos() + (this.background.getWidth() / 3), this.background.getYPos(), 0, 0.05, this.background.getWidth() / 16, this.background.getHeight() / 9, './assets/img/objects/car.png'),
            // Add booster
            new Frikandelbroodje(this.background.getXPos() + (this.background.getWidth() / 2), this.background.getYPos() + (this.background.getHeight() / 2), 0, 0, this.background.getWidth() / 16, this.background.getHeight() / 9, './assets/img/objects/frikandelbroodje.png', 10)
        ];
        // Create player
        this.player = new Player(this.background.getXPos() + ((this.background.getWidth() / 3) * 2) - ((this.background.getWidth() / 8) / 2), this.background.getWidth() / 1.2, 0, 0, this.background.getWidth() / 20, this.background.getHeight() / 8, stamina);
    }
    // Set boundaries to the player's movements
    processInput() {
        this.player.processInput(this.canvas, this.background.getXPos() + this.background.getWidth() / 3, this.background.getXPos() + (this.background.getWidth() / 3) * 2);
    }
}
