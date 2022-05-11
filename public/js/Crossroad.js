import ImageProp from "./Props/ImageProp.js";
export default class Crossroad {
    constructor(canvas) {
        this.background = new ImageProp(0, -canvas.height, 0, 0, canvas.width, canvas.height, './assets/img/objects/w_button.png');
        this.props = [
            new ImageProp(this.background.getWidth(), this.background.getYPos() + (this.background.getHeight() / 2), -0.1, 0, this.background.getWidth() / 10, this.background.getHeight() / 5, './assets/img/players/fiets1.png')
        ];
    }
    update(elapsed, scrollSpeed, player) {
        this.background.move(elapsed);
        this.background.scroll(elapsed, scrollSpeed);
        if (player.getYPos() < this.background.getYPos()) {
            return Crossroad.FINISHED;
        }
        let gameOver = false;
        this.props.forEach((prop) => {
            if (this.background.getYPos() + (this.background.getHeight() / 2) > 0) {
                prop.move(elapsed);
            }
            prop.scroll(elapsed, scrollSpeed);
            if (prop.collidesWithOtherProp(player)) {
                gameOver = true;
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
