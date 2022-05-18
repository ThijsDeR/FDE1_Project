import Game from "./Game.js";
import Frikandelbroodje from "./Props/Frikandelbroodje.js";
import ImageProp from "./Props/ImageProp.js";
import StaminaBooster from "./Props/StaminaBooster.js";
import StopSign from "./Props/StopSign.js";
export default class Crossroad {
    constructor(canvas) {
        this.background = new ImageProp(0, -canvas.height, 0, 0, canvas.width, canvas.height, './assets/img/objects/Kruispunt_2.png');
        this.props = [
            new ImageProp(0 - (this.background.getWidth() / 10), this.background.getYPos() + (this.background.getHeight() / 2), (Game.randomInteger(1, 15) / 10), 0, this.background.getWidth() / 10, this.background.getHeight() / 5, './assets/img/players/fiets1.png'),
            new ImageProp(this.background.getWidth() / 3, this.background.getYPos(), 0, 0.05, this.background.getWidth() / 16, this.background.getHeight() / 9, './assets/img/objects/w_button.png'),
            new Frikandelbroodje(this.background.getWidth() / 2, this.background.getYPos() + (this.background.getHeight() / 2), 0, 0, this.background.getWidth() / 16, this.background.getHeight() / 9, './assets/img/objects/frikandelbroodje.png', 10),
            new StopSign(this.background.getWidth() / 1.9, this.background.getYPos() + (this.background.getHeight() / 1.1), 0, 0, this.background.getWidth() / 16, this.background.getHeight() / 9, './assets/img/objects/bronze_trophy.png')
        ];
    }
    update(elapsed, scrollSpeed, player) {
        this.background.move(elapsed);
        this.background.scroll(elapsed, scrollSpeed);
        if (player.getYPos() < this.background.getYPos() - this.background.getHeight()) {
            return Crossroad.FINISHED;
        }
        const crash = new Audio('./audio/bike_crash.mp3');
        crash.volume = 0.7;
        let gameOver = false;
        this.props.forEach((prop, propIndex) => {
            console.log(prop.getXVel());
            if (this.background.getYPos() + (this.background.getHeight() / 2) > 0) {
                prop.move(elapsed);
            }
            prop.scroll(elapsed, scrollSpeed);
            if (prop.collidesWithOtherProp(player)) {
                if (prop instanceof StaminaBooster) {
                    player.changeStamina(prop.getStaminaBoostAmount());
                    this.props.splice(propIndex, 1);
                }
                else if (prop instanceof StopSign) {
                    if (player.isStopped()) {
                        prop.activate();
                    }
                }
                else {
                    gameOver = true;
                    crash.play();
                }
            }
            if (prop instanceof StopSign) {
                if (prop.getYPos() > player.getYPos() + player.getHeight()) {
                    if (prop.isActive()) {
                        this.props.splice(propIndex, 1);
                    }
                    else {
                        gameOver = true;
                    }
                }
            }
        });
        return gameOver ? Crossroad.GAME_OVER : Crossroad.NOT_DONE;
    }
    draw(ctx) {
        this.background.draw(ctx);
        this.props.forEach((prop) => {
            prop.draw(ctx);
        });
    }
}
Crossroad.NOT_DONE = 0;
Crossroad.GAME_OVER = 1;
Crossroad.FINISHED = 2;
