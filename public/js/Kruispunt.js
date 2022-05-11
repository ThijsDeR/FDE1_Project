import ImageProp from "./Props/ImageProp.js";
export default class Crossroad {
    constructor(canvas) {
        this.background = new ImageProp(canvas.width / 2, -canvas.height, 0, 0, canvas.width, canvas.height, './assets/img/objects/w_button.png');
        this.props = [
            new ImageProp(this.background.getXPos(), this.background.getYPos(), -0.05, 0, this.background.getWidth() / 10, this.background.getHeight() / 5, './assets/img/players/fiets1.png')
        ];
    }
    update(elapsed, scrollSpeed) {
        this.background.move(elapsed, scrollSpeed);
        this.props.forEach((prop) => {
            prop.move(elapsed, scrollSpeed);
        });
    }
    draw(ctx) {
        this.background.draw(ctx);
        this.props.forEach((prop) => {
            prop.draw(ctx);
        });
    }
}