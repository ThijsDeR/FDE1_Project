import Player from "../Player.js";
import Frikandelbroodje from "../Props/Frikandelbroodje.js";
import ImageProp from "../Props/ImageProp.js";
import TrackProp from "../Props/TrackProp.js";
import Situation from "../Situation.js";
export default class PrioritySameRoad extends Situation {
    constructor(canvas, userData, stamina, upgrades) {
        super(canvas, userData, upgrades);
        this.background = new ImageProp(this.canvas.width / 3, -this.canvas.height, 0, 0, this.canvas.width / 2, canvas.height, './assets/img/Oprit.png');
        this.props = [
            new ImageProp(this.background.getXPos() + this.background.getWidth() / 3, this.background.getYPos(), 0, 0.05, this.background.getWidth() / 16, this.background.getHeight() / 9, './assets/img/objects/car.png'),
            new TrackProp([
                { xPos1: this.background.getXPos() + this.background.getWidth() / 2, yPos1: (this.background.getHeight() * 2) + this.background.getYPos(), xPos2: this.background.getXPos() + this.background.getWidth() / 2, yPos2: this.background.getHeight() / 2 + this.background.getYPos(), xVel: 0, yVel: -0.5 },
                { xPos1: this.background.getXPos() + this.background.getWidth() / 2, yPos1: this.background.getHeight() / 2 + this.background.getYPos(), xPos2: this.background.getXPos() + this.background.getWidth(), yPos2: this.background.getHeight() / 2 + this.background.getYPos(), xVel: 0.20, yVel: 0 },
            ], this.background.getWidth() / 20, this.background.getHeight() / 8, './assets/img/players/fiets1.png'),
            new Frikandelbroodje(this.background.getXPos() + this.background.getWidth() / 2, this.background.getYPos() + (this.background.getHeight() / 2), 0, 0, this.background.getWidth() / 16, this.background.getHeight() / 9, './assets/img/objects/frikandelbroodje.png', 10)
        ];
        this.player = new Player(this.background.getXPos() + ((this.background.getWidth() / 3) * 2) - ((this.background.getWidth() / 8) / 2), this.background.getHeight() / 1.2, 0, 0, this.background.getWidth() / 20, this.background.getHeight() / 8, stamina);
    }
    processInput() {
        this.player.processInput(this.canvas, this.background.getXPos() + this.background.getWidth() / 3, this.background.getXPos() + (this.background.getWidth() / 3) * 2);
    }
}
