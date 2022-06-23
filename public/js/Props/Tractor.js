import ImageProp from "./ImageProp.js";
export class Tractor extends ImageProp {
    constructor(xPos, yPos, xVel, yVel, width, height) {
        super(xPos, yPos, xVel, yVel, width, height, './assets/img/objects/tractor_1.png');
    }
}
