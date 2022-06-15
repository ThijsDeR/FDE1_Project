import Game from "../Game.js";
import Player from "../Player.js";
import Frikandelbroodje from "../Props/Frikandelbroodje.js";
import ImageProp from "../Props/ImageProp.js";
import Situation from "../Situation.js";
export default class TrainRails extends Situation {
    constructor(canvas, userData, stamina, upgrades) {
        super(canvas, userData, upgrades);
        // Situation background parameters
        this.background = new ImageProp(canvas.width / 3, -canvas.height, 0, 0, canvas.width / 2, canvas.height, './assets/img/TreinSpoor.png');
        // Add props to the situation
        this.props = [
            // Stamina booster
            new Frikandelbroodje(this.background.getXPos() + (this.background.getWidth() / 1.6), this.background.getYPos() + (this.background.getHeight() / 5), 0, 0, this.background.getWidth() / 16, this.background.getHeight() / 9, './assets/img/objects/frikandelbroodje.png', 10)
        ];
        // Train prop variables
        const train = new ImageProp(this.background.getXPos() - (this.background.getWidth() / 10), this.background.getYPos() - (this.background.getHeight() / 1.38), 0.3, 0, this.background.getWidth() / 5, this.background.getHeight() * 2, './assets/img/objects/Trein.png');
        // Decide whether or not the train should spawn
        if (Game.randomInteger(0, 1) === 1) {
            this.props.push(train);
        }
        // Create the player
        this.player = new Player(this.background.getXPos() + ((this.background.getWidth() / 3) * 2) - ((this.background.getWidth() / 8) / 2), this.background.getWidth() / 1.2, 0, 0, this.background.getWidth() / 20, this.background.getHeight() / 8, stamina);
    }
    // Set boundaries to the player's movements
    processInput() {
        this.player.processInput(this.canvas, this.background.getXPos() + this.background.getWidth() / 3, this.background.getXPos() + (this.background.getWidth() / 3) * 2);
    }
}
