import Player from "./Player.js";
import ImageProp from "./Props/ImageProp.js";
import StaminaBooster from "./Props/StaminaBooster.js";
export default class LandbouwVoertuig {
    constructor(canvas) {
        this.background = new ImageProp(0, -canvas.height, 0, 0, canvas.width, canvas.height, './assets/img/Polderweg.png');
        this.props = [
            new ImageProp(this.background.getWidth() / 2.7, this.background.getYPos(), 0, 0.05, this.background.getWidth() / 5, this.background.getHeight() / 5, './assets/img/objects/w_button.png'),
        ];
        this.canvas = canvas;
    }
    update(elapsed, scrollSpeed, player) {
        this.background.move(elapsed);
        this.background.scroll(elapsed, scrollSpeed);
        if (player.getYPos() < this.background.getYPos() - this.background.getHeight()) {
            return LandbouwVoertuig.FINISHED;
        }
        let gameOver = false;
        // if (player.getXPos() < this.background.getXPos() - (this.background.getWidth() / 4)) {
        //     gameOver = true;
        // } else if (player.getXPos() > this.background.getXPos() + this.background.getWidth()) {
        //     gameOver = true;
        // } else if (player.getYVel() === Player.MAX_SPEED_X &&
        // player.getYPos() >= (this.background.getYPos() * 3) &&
        // player.getYPos() <= this.background.getYPos() + (this.background.getHeight() / 1.5)) {
        //     console.log(this.background.getYPos());
        //     console.log(player.getYPos());
        //     console.log(this.background.getYPos() + this.background.getHeight());
        //     console.log(this.background.getHeight());
        //     gameOver = true;
        // }
        if (player.getXPos() <= this.background.getXPos() + (this.background.getWidth() / 4)) {
            // console.log('een');
            gameOver = true;
        }
        else if (player.getXPos() >= this.background.getWidth() - (this.background.getWidth() / 3.5)) {
            // console.log('twee');
            gameOver = true;
        }
        else if (player.getYVel() === Player.MAX_SPEED_X &&
            player.getYPos() >= this.props[0].getYPos() - this.props[0].getHeight() &&
            player.getYPos() <= this.props[0].getYPos()) {
            gameOver = true;
        }
        else if (player.getYVel() === 0 &&
            player.getYPos() >= this.props[0].getYPos() - this.props[0].getHeight() &&
            player.getYPos() - player.getHeight() <= this.props[0].getYPos()) {
            player.changeStamina(0.075);
        }
        console.log(this.props[0].getYPos());
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
                else
                    gameOver = true;
            }
        });
        return gameOver ? LandbouwVoertuig.GAME_OVER : LandbouwVoertuig.NOT_DONE;
    }
    draw(ctx) {
        this.background.draw(ctx);
        this.props.forEach((prop) => {
            prop.draw(ctx);
        });
    }
}
LandbouwVoertuig.NOT_DONE = 0;
LandbouwVoertuig.GAME_OVER = 1;
LandbouwVoertuig.FINISHED = 2;
