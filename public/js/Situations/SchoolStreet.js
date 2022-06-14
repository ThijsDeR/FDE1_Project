import Game from "../Game.js";
import Player from "../Player.js";
import ImageProp from "../Props/ImageProp.js";
import TrackProp from "../Props/TrackProp.js";
import Situation from "../Situation.js";
export default class SchoolStreet extends Situation {
    constructor(canvas, userData, stamina, upgrades) {
        super(canvas, userData, upgrades);
        this.background = new ImageProp(canvas.width / 3, -canvas.height, 0, 0, canvas.width / 2, canvas.height, './assets/img/objects/KruispuntZebraPad.png', false);
        this.props = [];
        for (let i = 0; i < 20; i++) {
            let yPos = this.background.getYPos() + (this.background.getHeight() / 20) * i;
            const personWalkingLeft = new TrackProp([
                {
                    xPos1: this.background.getXPos() + (this.background.getWidth() / 3) * 2, yPos1: yPos,
                    xPos2: this.background.getXPos(), yPos2: yPos,
                    xVel: -Game.randomInteger(0, 50) / 100, yVel: 0
                },
            ], this.background.getWidth() / 10, this.background.getHeight() / 5, './assets/img/players/character_maleAdventurer_walk0.png', false);
            const personWalkingRight = new TrackProp([
                {
                    xPos1: this.background.getXPos(), yPos1: yPos,
                    xPos2: this.background.getXPos() + (this.background.getWidth() / 3) * 2, yPos2: yPos,
                    xVel: Game.randomInteger(0, 50) / 100, yVel: 0
                },
            ], this.background.getWidth() / 10, this.background.getHeight() / 5, './assets/img/players/character_maleAdventurer_walk0.png', false);
            switch (Game.randomInteger(0, 2)) {
                case 0:
                    this.props.push(personWalkingLeft);
                    break;
                case 1:
                    this.props.push(personWalkingRight);
            }
        }
        this.player = new Player(this.background.getXPos() + ((this.background.getWidth() / 3) * 2) - ((this.background.getWidth() / 8) / 2), this.background.getWidth() / 1.2, 0, 0, this.background.getWidth() / 20, this.background.getHeight() / 8, stamina);
    }
    // Set boundaries to the player's movements
    processInput() {
        this.player.processInput(this.canvas, this.background.getXPos() + this.background.getWidth() / 3, this.background.getXPos() + (this.background.getWidth() / 3) * 2);
    }
}
