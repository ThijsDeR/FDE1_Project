import ImageProp from "./ImageProp.js";
export default class StopSign extends ImageProp {
    constructor(xPos, yPos, xVel, yVel, width, height, imageUrl) {
        super(xPos, yPos, xVel, yVel, width, height, imageUrl);
    }
    activate() {
        this.activated = true;
    }
    isActive() {
        return this.activated;
    }
}
