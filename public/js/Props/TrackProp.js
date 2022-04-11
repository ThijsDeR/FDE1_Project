import ImageProp from "./ImageProp.js";
export default class TrackProp extends ImageProp {
    constructor(xPos, yPos, xVel, yVel, width, height, image) {
        super(xPos, yPos, xVel, yVel, width, height, image);
    }
}
