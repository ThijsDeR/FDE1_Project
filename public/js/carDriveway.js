import ImageProp from "./Props/ImageProp.js";
import StaminaBooster from "./Props/StaminaBooster.js";
import Situation from "./Situation.js";
import Player from "./Player.js";
import TrackProp from "./Props/TrackProp.js";
import Game from "./Game.js";
export default class carDriveway extends Situation {
    constructor(canvas, userData, stamina, upgrades) {
        super(canvas, userData, upgrades);
        this.background = new ImageProp(canvas.width / 3, -canvas.height, 0, 0, canvas.width / 2, canvas.height, './assets/img/objects/Oprit.png');
        const carVectors = [];
        Game.randomInteger(0, 1) === 0 ? carVectors.push({
            // GOOD DRIVER
            // Starting position
            xPos1: (this.background.getWidth() * 2 / 1.2), yPos1: (this.background.getYPos() + (this.background.getHeight() / 2 - 175)),
            // Target position
            xPos2: (this.background.getWidth() * 2 / 1.4), yPos2: (this.background.getYPos() + (this.background.getHeight() / 2 - 175)),
            // Velocity
            xVel: -0.2, yVel: 0
        }) : carVectors.push({
            // BAD DRIVER
            // Starting position
            xPos1: (this.background.getWidth() * 2 / 1.2), yPos1: (this.background.getYPos() + (this.background.getHeight() / 3.1)),
            // Target position
            xPos2: (this.background.getWidth() / 0.96), yPos2: (this.background.getYPos() + (this.background.getHeight() / 3.1)),
            // Velocity
            xVel: -0.2, yVel: 0
        }, {
            // Current location
            xPos1: (this.background.getWidth() / 0.96), yPos1: (this.background.getYPos() + (this.background.getHeight() / 3.1)),
            // Direction of travel
            xPos2: (this.background.getWidth() / 0.96), yPos2: (this.background.getYPos() + (this.background.getHeight() * 2)),
            // Velocity
            xVel: 0, yVel: 0.4
        });
        this.props = [
            new TrackProp(carVectors, canvas.width / 15, canvas.height / 7, './assets/img/objects/car.png'),
        ];
        this.player = new Player((canvas.width / 1.55), canvas.height / 1.2, 0, 0, canvas.width / 20, canvas.height / 8, stamina);
    }
    update(elapsed) {
        this.player.update(elapsed);
        this.player.move(elapsed);
        this.background.move(elapsed);
        this.background.scroll(elapsed, this.player.getYVel());
        if (this.player.getYPos() < this.background.getYPos() - this.background.getHeight()) {
            return Situation.FINISHED;
        }
        let gameOver = false;
        this.props.forEach((prop, propIndex) => {
            if (this.background.getYPos() + (this.background.getHeight() / 2) > 0) {
                prop.move(elapsed);
            }
            prop.scroll(elapsed, this.player.getYVel());
            if (prop.collidesWithOtherProp(this.player)) {
                if (prop instanceof StaminaBooster) {
                    this.player.changeStamina(prop.getStaminaBoostAmount());
                    this.props.splice(propIndex, 1);
                }
                else
                    gameOver = true;
            }
            if (prop instanceof TrackProp) {
                prop.update();
            }
        });
        if (this.player.getStamina() >= 0)
            this.player.changeStamina(-0.025);
        else
            gameOver = true;
        return gameOver ? Situation.GAME_OVER : Situation.NOT_DONE;
    }
    // Player boundaries
    processInput() {
        this.player.processInput(this.canvas, this.background.getWidth() * 1.18, (this.background.getWidth() * 1.384));
    }
}
