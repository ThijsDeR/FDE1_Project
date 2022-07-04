import Game from "../Game.js";
import ImageProp from "../Props/ImageProp.js";
import StaminaBooster from "../Props/StaminaBooster.js";
import TrackProp from "../Props/TrackProp.js";
import Situation from "../Situation.js";
export default class CyclingPathIncomingTraffic extends Situation {
    constructor(canvas, userData, playerData, upgrades, skins, keyListener, allowedMist) {
        super(canvas, userData, playerData, upgrades, skins, allowedMist);
        // Situation background
        this.background = new ImageProp(canvas.width / 3, -canvas.height, 0, 0, canvas.width / 2, canvas.height, './assets/img/MainRoadFixed_2.png', false);
        // Define the left boundary of the playing field
        this.leftBoundary = this.background.getXPos() + (this.background.getWidth() / 3) - (this.background.getWidth() / 20);
        // Define the right boundary of the playing field
        this.rightBoundary = this.background.getXPos() + ((this.background.getWidth() / 3) * 2) + (this.background.getWidth() / 20);
        // Create player
        this.player = this.createPlayer(keyListener);
        // Add props to situation
        this.props = [
            // Static cyclist
            new ImageProp((this.background.getWidth() / 4) + (canvas.width / 3), this.background.getYPos(), 0, 0.1, this.background.getWidth() / 20, this.background.getHeight() / 8, './assets/img/players/cycles/fiets1normal.png'),
        ];
        Game.randomInteger(0, 2) === 1 ? this.props.push(new StaminaBooster(this.background.getXPos() + ((this.background.getWidth() / 3) * 2) - (this.background.getWidth() / 30), this.background.getYPos() + (this.background.getHeight() / 2), 0, 0, this.background.getWidth() / 16, this.background.getHeight() / 9, this.skins.staminaSkin.src, parseInt(this.skins.staminaSkin.baseStamina))) : '';
        // Dynamic overtaking car
        const car = new TrackProp([
            {
                // Starting location
                xPos1: (this.background.getWidth() / 2) + (canvas.width / 3),
                yPos1: this.background.getYPos(),
                // Target location
                xPos2: (this.background.getWidth() / 2) + (canvas.width / 3),
                yPos2: this.background.getYPos() + this.background.getHeight() / 3,
                // Velocities between start and target position
                xVel: 0,
                yVel: 0.15
            },
            {
                // Starting location
                xPos1: (this.background.getWidth() / 2) + (canvas.width / 3),
                yPos1: this.background.getYPos() + this.background.getHeight() / 3,
                // Target location
                xPos2: (this.background.getWidth() / 4) + (canvas.width / 3),
                yPos2: this.background.getYPos() + this.background.getHeight() / 2,
                // Velocities between start and target position
                xVel: -0.2,
                yVel: 0.15
            },
            {
                // Starting location
                xPos1: (this.background.getWidth() / 4) + (canvas.width / 3),
                yPos1: this.background.getYPos() + this.background.getHeight() / 2,
                // Target location
                xPos2: (this.background.getWidth() / 4) + (canvas.width / 3),
                yPos2: this.background.getYPos() + this.background.getHeight() * 2,
                // Velocities between start and target position
                xVel: 0,
                yVel: 0.15
            },
        ], 
        // Cyclist image properties
        this.background.getWidth() / 5, this.background.getHeight() / 5, './assets/img/objects/car.png');
        // Choose whether to add the overtaking cyclist or not
        Game.randomInteger(0, 1) === 1
            ? this.props.push(car)
            : '';
    }
}
