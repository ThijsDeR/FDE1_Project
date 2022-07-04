import Game from "../Game.js";
import ImageProp from "../Props/ImageProp.js";
import Situation from "../Situation.js";
import StaminaBooster from "../Props/StaminaBooster.js";
import TrackProp from "../Props/TrackProp.js";
export default class Obstacles extends Situation {
    constructor(canvas, userData, playerData, upgrades, skins, keyListener, allowedMist) {
        super(canvas, userData, playerData, upgrades, skins, allowedMist);
        this.leftSideDrawBack = false;
        this.background = new ImageProp(canvas.width / 3, -canvas.height, 0, 0, canvas.width / 2, canvas.height, './assets/img/objects/Kruispunt.png');
        this.leftBoundary = this.background.getXPos() + (this.background.getWidth() / 3) - (this.background.getWidth() / 20);
        this.rightBoundary = this.background.getXPos() + ((this.background.getWidth() / 3) * 2) + (this.background.getWidth() / 20);
        this.player = this.createPlayer(keyListener);
        this.props = [];
        const obstacles1 = [
            new ImageProp(this.background.getXPos() + (this.background.getWidth() / 2.4), this.background.getYPos() + (this.background.getHeight() / 2.4), 0, 0, this.background.getWidth() / 8, this.background.getHeight() / 17, './assets/img/objects/bier.png'),
            new ImageProp(this.background.getXPos() + (this.background.getWidth() / 1.7), this.background.getYPos() + (this.background.getHeight() / 2), 0, 0, this.background.getWidth() / 8, this.background.getHeight() / 17, './assets/img/objects/bier.png'),
            new ImageProp(this.background.getXPos() + (this.background.getWidth() / 2), this.background.getYPos() + (this.background.getHeight() / 2), 0, 0, this.background.getWidth() / 8, this.background.getHeight() / 17, './assets/img/objects/Tak2.png'),
            new ImageProp(this.background.getXPos() + (this.background.getWidth() / 3.5), this.background.getYPos(), 0, 0.39, this.background.getWidth() / 16, this.background.getHeight() / 5, './assets/img/players/cycles/fiets1normal.png'),
            // Stamina booster
            new StaminaBooster(this.background.getXPos() + this.background.getWidth() / 2, this.background.getYPos() + (this.background.getHeight() / 6), 0, 0, this.background.getWidth() / 16, this.background.getHeight() / 9, this.skins.staminaSkin.src, parseInt(this.skins.staminaSkin.baseStamina)),
        ];
        const obstacles2 = [
            new ImageProp(this.background.getXPos() + (this.background.getWidth() / 3.4), this.background.getYPos() + (this.background.getHeight() / 1.6), 0, 0, this.background.getWidth() / 8, this.background.getHeight() / 17, './assets/img/objects/Tak.png'),
            new ImageProp(this.background.getXPos() + (this.background.getWidth() / 2.5), this.background.getYPos() - (this.background.getHeight() / 3), 0, 0.105, this.background.getWidth() / 16, this.background.getHeight() / 5, './assets/img/players/cycles/fiets1normal.png'),
            new ImageProp(this.background.getXPos() + (this.background.getWidth() / 1.8), this.background.getYPos() + (this.background.getHeight() / 2.7), 0, 0, this.background.getWidth() / 8, this.background.getHeight() / 17, './assets/img/objects/Tak3.png'),
            new TrackProp([
                {
                    xPos1: this.background.getXPos() + (this.background.getWidth() / 3.5),
                    yPos1: this.background.getYPos(),
                    // Target location
                    xPos2: this.background.getXPos() + (this.background.getWidth() / 2),
                    yPos2: this.background.getYPos() + (this.background.getHeight() / 2),
                    // Velocities between start and target position
                    xVel: 0.15,
                    yVel: 0.15
                },
                {
                    xPos1: this.background.getXPos() + (this.background.getWidth() / 2),
                    yPos1: this.background.getYPos() + this.background.getHeight() / 2,
                    // Target location
                    xPos2: this.background.getXPos() + (this.background.getWidth() / 2),
                    yPos2: this.background.getYPos() + ((this.background.getHeight() / 4) * 3),
                    // Velocities between start and target position
                    xVel: 0,
                    yVel: 0.15
                },
                {
                    xPos1: this.background.getXPos() + (this.background.getWidth() / 2),
                    yPos1: this.background.getYPos() + ((this.background.getHeight() / 4) * 3),
                    // Target location
                    xPos2: this.background.getXPos() + (this.background.getWidth() / 3.5),
                    yPos2: this.background.getYPos() + (this.background.getHeight() * 2),
                    // Velocities between start and target position
                    xVel: -0.15,
                    yVel: 0.15
                }
            ], this.background.getWidth() / 16, this.background.getHeight() / 5, './assets/img/players/cycles/fiets1normal.png'),
            // Stamina booster
            new StaminaBooster(this.background.getXPos() + this.background.getWidth() / 2, this.background.getYPos() + (this.background.getHeight() / 2), 0, 0, this.background.getWidth() / 16, this.background.getHeight() / 9, this.skins.staminaSkin.src, parseInt(this.skins.staminaSkin.baseStamina)),
        ];
        Game.randomInteger(0, 1) === 1
            ? obstacles1.forEach(obstacles1 => {
                this.props.push(obstacles1);
            }) : obstacles2.forEach(obstacles2 => {
            this.props.push(obstacles2);
        });
    }
}
