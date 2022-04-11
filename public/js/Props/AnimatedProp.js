import Animator from "../Animator.js";
import Prop from "./Prop.js";
export default class AnimatedProp extends Prop {
    constructor(xPos, yPos, xVel, yVel, width, height, images) {
        super(xPos, yPos, xVel, yVel, width, height);
        this.animator = new Animator(images);
    }
    getImage() {
        return this.animator.getImage();
    }
    advance(elapsed) {
        this.animator.advance(elapsed);
    }
    draw(ctx) {
        ctx.drawImage(this.animator.getImage(), this.xPos - (this.width / 2), this.yPos - (this.height / 2), this.width, this.height);
    }
}
