import Game from "../Game.js";
import Player from "../Player.js";
import ImageProp from "../Props/ImageProp.js";
import TrackProp from "../Props/TrackProp.js";
import Situation from "../Situation.js";
export default class SchoolStreet extends Situation {
    constructor(canvas, userData, playerData, upgrades) {
        super(canvas, userData, upgrades);
        // Situation background parameters
        this.background = new ImageProp(canvas.width / 3, -canvas.height, 0, 0, canvas.width / 2, canvas.height, './assets/img/objects/KruispuntZebraPad.png', false);
        // Add props to situation
        this.props = [];
        // Create multiple identical props
        for (let i = 0; i < 20; i++) {
            let yPos = this.background.getYPos() + (this.background.getHeight() / 20) * i;
            // Pedestrian walking towards the left
            const personWalkingLeft = new TrackProp([
                {
                    xPos1: this.background.getXPos() + (this.background.getWidth() / 3) * 2,
                    yPos1: yPos,
                    xPos2: this.background.getXPos(),
                    yPos2: yPos,
                    xVel: -Game.randomInteger(0, 50) / 100,
                    yVel: 0
                },
            ], 
            // Properties of personWalkingLeft image
            this.background.getWidth() / 10, this.background.getHeight() / 5, './assets/img/players/character_maleAdventurer_walk0.png', false);
            // Pedestrian walking towards the right
            const personWalkingRight = new TrackProp([
                {
                    xPos1: this.background.getXPos(),
                    yPos1: yPos,
                    xPos2: this.background.getXPos() + (this.background.getWidth() / 3) * 2,
                    yPos2: yPos,
                    xVel: Game.randomInteger(0, 50) / 100,
                    yVel: 0
                },
            ], 
            // Properties of personWalkingLeft image
            this.background.getWidth() / 10, this.background.getHeight() / 5, './assets/img/players/character_maleAdventurer_walk0.png', false);
            // Decide which props to create
            switch (Game.randomInteger(0, 1)) {
                case 0:
                    this.props.push(personWalkingLeft);
                case 1:
                    this.props.push(personWalkingRight);
            }
        }

        let xPos;
        if (playerData.xPos)
            xPos = playerData.xPos;
        else
            xPos = this.background.getXPos() + ((this.background.getWidth() / 3) * 2) - ((this.background.getWidth() / 8) / 2);
        if (xPos < this.background.getXPos() + this.background.getWidth() / 3)
            xPos = this.background.getXPos() + this.background.getWidth() / 3;
        else if (xPos > this.background.getXPos() + (this.background.getWidth() / 3) * 2)
            xPos = this.background.getXPos() + (this.background.getWidth() / 3) * 2;
        this.player = new Player(xPos, this.background.getWidth() / 1.2, 0, 0, this.background.getWidth() / 20, this.background.getHeight() / 8, playerData.stamina);
    }
    // Set boundaries to the player's movements
    processInput() {
        this.player.processInput(this.canvas, this.background.getXPos() + this.background.getWidth() / 3, this.background.getXPos() + (this.background.getWidth() / 3) * 2);
    }
}
