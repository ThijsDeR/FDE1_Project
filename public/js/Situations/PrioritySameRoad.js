import Player from "../Player.js";
import Frikandelbroodje from "../Props/Frikandelbroodje.js";
import ImageProp from "../Props/ImageProp.js";
import StaminaBooster from "../Props/StaminaBooster.js";
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
    processInput() {
        this.player.processInput(this.canvas, this.background.getXPos() + this.background.getWidth() / 3, this.background.getXPos() + (this.background.getWidth() / 3) * 2);
    }
}
