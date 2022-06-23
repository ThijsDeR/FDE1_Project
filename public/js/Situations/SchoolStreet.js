import Game from "../Game.js";
import ImageProp from "../Props/ImageProp.js";
import TrackProp from "../Props/TrackProp.js";
import Situation from "../Situation.js";
export default class SchoolStreet extends Situation {
    constructor(canvas, userData, playerData, upgrades, skins) {
        super(canvas, userData, playerData, upgrades, skins);
        // Situation background parameters
        this.background = new ImageProp(canvas.width / 3, -canvas.height, 0, 0, canvas.width / 2, canvas.height, './assets/img/objects/KruispuntZebraPad.png', false);
        // Define the left boundary of the playing field
        this.leftBoundary = this.background.getXPos() + (this.background.getWidth() / 3);
        // Define the right boundary of the playing field
        this.rightBoundary = this.background.getXPos() + ((this.background.getWidth() / 3) * 2);
        // Create player
        this.player = this.createPlayer();
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
            this.background.getWidth() / 20, this.background.getHeight() / 10, './assets/img/players/character_maleAdventurer_walk0.png', false);
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
            this.background.getWidth() / 20, this.background.getHeight() / 10, './assets/img/players/character_maleAdventurer_walk0.png', false);
            // Decide which props to create
            switch (Game.randomInteger(0, 1)) {
                case 0:
                    this.props.push(personWalkingLeft);
                case 1:
                    this.props.push(personWalkingRight);
            }
        }
    }
}
