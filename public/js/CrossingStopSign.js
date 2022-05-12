import ImageProp from "./Props/ImageProp.js";
export default class CrossingStopSign {
    constructor(canvas) {
        this.background = new ImageProp(canvas.width / 2, -canvas.height, 0, 0, canvas.width, canvas.height, './assets/img/objects/titled_yellow_power_icon.png');
        this.props = [
            new ImageProp(this.background.getXPos(), this.background.getYPos(), -0.05, 0, this.background.getWidth() / 10, this.background.getHeight() / 5, './assets/img/objects/w_button.png')
        ];
    }
    update(elapsed, scrollSpeed, player) {
        this.background.move(elapsed, scrollSpeed);
        this.props.forEach((prop) => {
            if (player.getYPos() - (this.background.getHeight() / 2) > this.background.getHeight()) {
                prop.move(elapsed, scrollSpeed);
            }
        });
    }
    draw(ctx) {
        this.background.draw(ctx);
        this.props.forEach((prop) => {
            prop.draw(ctx);
        });
    }
}
