import Player from "../Player.js";
import Frikandelbroodje from "../Props/Frikandelbroodje.js";
import ImageProp from "../Props/ImageProp.js";
import TrackProp from "../Props/TrackProp.js";
import Situation from "../Situation.js";
export default class CyclingPathIncomingTraffic extends Situation {
    constructor(canvas, userData, stamina, upgrades) {
        super(canvas, userData, upgrades);
        this.background = new ImageProp(canvas.width / 3, -canvas.height, 0, 0, canvas.width / 2, canvas.height, './assets/img/MainRoadFixed.png');
        this.props = [
            new ImageProp((this.background.getWidth() / 4) + (canvas.width / 3), this.background.getYPos(), 0, 0.1, canvas.width / 20, canvas.height / 8, './assets/img/players/fiets1.png'),
            new TrackProp([
                { xPos1: (this.background.getWidth() / 2) + (canvas.width / 3), yPos1: this.background.getYPos(), xPos2: (this.background.getWidth() / 2) + (canvas.width / 3), yPos2: this.background.getYPos() + this.background.getHeight() / 3, xVel: 0, yVel: 0.15 },
                { xPos1: (this.background.getWidth() / 2) + (canvas.width / 3), yPos1: this.background.getYPos() + this.background.getHeight() / 3, xPos2: (this.background.getWidth() / 4) + (canvas.width / 3), yPos2: this.background.getYPos() + this.background.getHeight() / 2, xVel: -0.2, yVel: 0.15 },
                { xPos1: (this.background.getWidth() / 4) + (canvas.width / 3), yPos1: this.background.getYPos() + this.background.getHeight() / 2, xPos2: (this.background.getWidth() / 4) + (canvas.width / 3), yPos2: this.background.getYPos() + this.background.getHeight() * 2, xVel: 0, yVel: 0.15 },
            ], canvas.width / 20, canvas.height / 8, './assets/img/players/fiets1.png'),
            new Frikandelbroodje((this.background.getWidth() / 2) + (canvas.width / 3), this.background.getYPos() + (this.background.getHeight()), 0, 0, canvas.width / 15, canvas.height / 8, './assets/img/objects/frikandelbroodje.png', 10)
        ];
        this.player = new Player((canvas.width / 2) - ((canvas.width / 8) / 2), canvas.height / 1.2, 0, 0, canvas.width / 20, canvas.height / 8, stamina);
    }
    // Set boundaries to the player's movements
    processInput() {
        this.player.processInput(this.canvas, (this.background.getWidth() / 3) + this.background.getXPos(), ((this.background.getWidth() / 3) * 2) + this.background.getXPos());
    }
}
