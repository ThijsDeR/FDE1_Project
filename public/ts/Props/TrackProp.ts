import ImageProp from "./ImageProp.js"

export default class TrackProp extends ImageProp {
    public constructor(xPos: number, yPos: number, xVel: number, yVel: number, width: number, height: number, imageUrl: string) {
        super(xPos, yPos, xVel, yVel, width, height, imageUrl);
    }
}
