import Game from "../Game.js";
import Prop from "./Prop.js";
export default class ImageProp extends Prop {
    constructor(xPos, yPos, xVel, yVel, width, height, imageUrl, turning = true) {
        super(xPos, yPos, xVel, yVel, width, height);
        this.image = Game.loadNewImage(imageUrl);
        this.turning = turning;
    }
    getImage() {
        return this.image;
    }
    draw(ctx, offsetX = 0, offsetY = 0) {
        // ctx.drawImage(
        //     this.image,
        //     this.xPos,
        //     this.yPos,
        //     this.width,
        //     this.height
        //   );
        const degToRad = (deg) => deg * Math.PI / 180;
        ctx.save();
        ctx.translate(this.xPos + (this.width / 2), this.yPos + (this.height / 2));
        if (this.turning)
            ctx.rotate(degToRad(this.calculateDirection()));

        ctx.drawImage(this.image, -(this.width / 2), -(this.height / 2), this.width, this.height);
        ctx.restore();
    }
    calculateDirection() {
        const degrees = Math.atan2(this.yVel, this.xVel);
        if (this.xVel === 0 && this.yVel === 0)
            return 0;
        else
            return (degrees * (180 / Math.PI)) + 90;
    }
}
