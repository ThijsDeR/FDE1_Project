import Game from "../Game.js";
import Player from "../Player.js";
import ImageProp from "../Props/ImageProp.js";
import TrackProp from "../Props/TrackProp.js";
import Situation from "../Situation.js";
export default class PedestrianCrossingVan extends Situation {
    constructor(canvas, userData, stamina, upgrades) {
        super(canvas, userData, upgrades);
        this.background = new ImageProp(canvas.width / 3, -canvas.height, 0, 0, canvas.width / 2, canvas.height, './assets/img/objects/KruispuntZebraPad.png', false);
        this.props = [
            new ImageProp(this.background.getXPos() + (this.background.getWidth() / 5) * 3, this.background.getYPos() + (this.background.getHeight() / 10) * 9, 0, 0, this.background.getWidth() / 10, this.background.getHeight() / 5, './assets/img/objects/car.png', false)
        ];
        const personWalking = new TrackProp([
            {
                xPos1: this.background.getXPos() + (this.background.getWidth() / 3) * 2, yPos1: this.background.getYPos() + this.background.getHeight(),
                xPos2: this.background.getXPos() + (this.background.getWidth() / 3) * 2, yPos2: this.background.getYPos() + (this.background.getHeight() / 3) * 2,
                xVel: 0, yVel: -0.1
            },
            {
                xPos1: this.background.getXPos() + (this.background.getWidth() / 3) * 2, yPos1: this.background.getYPos() + (this.background.getHeight() / 3) * 2,
                xPos2: this.background.getXPos(), yPos2: this.background.getYPos() + (this.background.getHeight() / 3) * 2,
                xVel: -0.1, yVel: 0
            },
        ], this.background.getWidth() / 10, this.background.getHeight() / 5, './assets/img/players/character_maleAdventurer_walk0.png', false);
        Game.randomInteger(0, 1) === 1 ? this.props.push(personWalking) : '';
        this.player = new Player(this.background.getXPos() + ((this.background.getWidth() / 3) * 2) - ((this.background.getWidth() / 8) / 2), this.background.getWidth() / 1.2, 0, 0, this.background.getWidth() / 20, this.background.getHeight() / 8, stamina);
    }
    // Set boundaries to the player's movements
    processInput() {
        this.player.processInput(this.canvas, this.background.getXPos() + this.background.getWidth() / 3, this.background.getXPos() + (this.background.getWidth() / 3) * 2);
    }
}