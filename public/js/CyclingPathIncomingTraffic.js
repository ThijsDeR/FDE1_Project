import Player from "./Player.js";
import Frikandelbroodje from "./Props/Frikandelbroodje.js";
import ImageProp from "./Props/ImageProp.js";
import StaminaBooster from "./Props/StaminaBooster.js";
import TrackProp from "./Props/TrackProp.js";
import Situation from "./Situation.js";
export default class CyclingPathIncomingTraffic extends Situation {
    constructor(canvas, stamina, upgrades) {
        super(upgrades);
        this.background = new ImageProp(canvas.width / 3, -canvas.height, 0, 0, canvas.width / 3, canvas.height, './assets/img/weg_game_2.png');
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
    update(elapsed) {
        this.player.move(elapsed);
        this.player.update(elapsed);
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
                    this.player.changeStamina(prop.getStaminaBoostAmount() * ((50 + this.upgrades.stamina_gain.level) / 50));
                    console.log(`stamina gain: ${prop.getStaminaBoostAmount() * ((50 + this.upgrades.stamina_gain.level) / 50)}`);
                    this.props.splice(propIndex, 1);
                }
                else
                    gameOver = true;
            }
            if (prop instanceof TrackProp) {
                prop.update();
            }
        });
        console.log(`stamina resistance: ${-0.025 / ((50 + this.upgrades.stamina_resistance.level) / 50)}`);
        if (this.player.getStamina() >= 0)
            this.player.changeStamina(-0.025 / ((50 + this.upgrades.stamina_resistance.level) / 50));
        else
            gameOver = true;
        return gameOver ? Situation.GAME_OVER : Situation.NOT_DONE;
    }
    processInput(canvas) {
        this.player.processInput(canvas, (this.background.getWidth() / 3) + this.background.getXPos(), ((this.background.getWidth() / 3) * 2) + this.background.getXPos());
    }
}
