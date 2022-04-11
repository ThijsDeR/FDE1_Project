import ImageProp from "./ImageProp.js";
export default class TrackProp extends ImageProp {
    constructor(xPos, yPos, xVel, yVel, width, height, imageUrl) {
        super(xPos, yPos, xVel, yVel, width, height, imageUrl);
    }
}
