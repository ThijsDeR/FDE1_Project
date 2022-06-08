import ImageProp from "./ImageProp.js";
export default class StopSign extends ImageProp {
    constructor(xPos, yPos, xVel, yVel, width, height, imageUrl) {
        super(xPos, yPos, xVel, yVel, width, height, imageUrl);
        this.timeStopped = 0;
    }
    isActive() {
        return this.timeStopped > 1000;
    }
    advance(elapsed) {
        this.timeStopped += elapsed;
    }
}
