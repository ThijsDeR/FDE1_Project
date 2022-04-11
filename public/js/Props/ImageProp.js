import Prop from "./Prop.js";
export default class ImageProp extends Prop {
    constructor(xPos, yPos, xVel, yVel, width, height, image) {
        super(xPos, yPos, xVel, yVel, width, height);
        this.image = image;
    }
    getImage() {
        return this.image;
    }
    draw(ctx) {
        ctx.drawImage(this.image, 
        // Center the image in the lane with the x coordinates
        this.xPos, this.yPos);
    }
}
