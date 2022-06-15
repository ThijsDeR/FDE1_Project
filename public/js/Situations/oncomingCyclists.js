import Player from "../Player.js";
import ImageProp from "../Props/ImageProp.js";
import TrackProp from "../Props/TrackProp.js";
import Situation from "../Situation.js";
export default class OncomingCyclist extends Situation {
    constructor(canvas, userData, playerData, upgrades) {
        super(canvas, userData, upgrades);
        this.background = new ImageProp(canvas.width / 3, -canvas.height, 0, 0, canvas.width / 2, canvas.height, './assets/img/objects/KruispuntGeenZebrapad.png', false);
        this.props = [
            new ImageProp(this.background.getXPos() + (this.background.getWidth() / 3.5), this.background.getYPos(), 0, 0.32, this.background.getWidth() / 16, this.background.getHeight() / 5, './assets/img/players/fiets1.png'),
            new TrackProp([
                { xPos1: this.background.getXPos() + (this.background.getWidth() / 3.75), yPos1: this.background.getYPos() + (this.background.getHeight() / 4), xPos2: this.background.getXPos() + ((this.background.getWidth() / 4) * 3), yPos2: this.background.getYPos() + (this.background.getHeight() / 1.75), xVel: 0.17, yVel: 0.10 },
                { xPos1: this.background.getXPos() + ((this.background.getWidth() / 4) * 3), yPos1: this.background.getYPos() + (this.background.getHeight() / 1.75), xPos2: this.background.getXPos() + (this.background.getWidth() * 2), yPos2: this.background.getYPos() + (this.background.getHeight() / 1.75), xVel: 0.17, yVel: 0 },
            ], this.background.getWidth() / 16, this.background.getHeight() / 5, './assets/img/players/fiets1.png'),
        ];
        let xPos;
        if (playerData.xPos)
            xPos = playerData.xPos;
        else
            xPos = this.background.getXPos() + ((this.background.getWidth() / 3) * 2) - ((this.background.getWidth() / 8) / 2);
        if (xPos < this.background.getXPos() + this.background.getWidth() / 3)
            xPos = this.background.getXPos() + this.background.getWidth() / 3;
        else if (xPos > this.background.getXPos() + (this.background.getWidth() / 3) * 2)
            xPos = this.background.getXPos() + (this.background.getWidth() / 3) * 2;
        this.player = new Player(xPos, this.background.getHeight() / 1.2, 0, 0, this.background.getWidth() / 20, this.background.getHeight() / 8, playerData.stamina);
    }
    // Set boundaries to the player's movements
    processInput() {
        this.player.processInput(this.canvas, this.background.getXPos() + (this.background.getWidth() / 3), this.background.getXPos() + ((this.background.getWidth() / 3) * 2));
    }
}
