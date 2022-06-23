import ImageProp from "./ImageProp.js";
export default class Stoplicht extends ImageProp {
    constructor(xPos, yPos, xVel, yVel, width, height, imageUrl, turning = false) {
        super(xPos, yPos, xVel, yVel, width, height, imageUrl, turning);
        this.timeStopped = 0;
    }
    isActive() {
        return this.timeStopped > 1000;
    }
    advance(elapsed) {
        this.timeStopped += elapsed;
    }
    changeImageSource(source) {
        this.image.src = source;
    }
}
