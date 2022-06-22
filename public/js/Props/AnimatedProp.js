import Animator from "../Animator.js";
import ImageProp from "./ImageProp.js";
export default class AnimatedProp extends ImageProp {
    constructor(xPos, yPos, xVel, yVel, width, height, images, turning = true) {
        super(xPos, yPos, xVel, yVel, width, height, images[0].image.src, turning);
        this.animator = new Animator(images);
    }
    getImage() {
        return this.animator.getImage();
    }
    advance(elapsed) {
        this.animator.advance(elapsed);
    }
    draw(ctx) {
        ctx.drawImage(this.animator.getImage(), this.xPos, this.yPos, this.width, this.height);
    }
}
