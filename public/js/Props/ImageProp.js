import Game from "../Game.js";
import Prop from "./Prop.js";
export default class ImageProp extends Prop {
    constructor(xPos, yPos, xVel, yVel, width, height, imageUrl) {
        super(xPos, yPos, xVel, yVel, width, height);
        this.image = Game.loadNewImage(imageUrl);
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
