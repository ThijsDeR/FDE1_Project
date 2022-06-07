import ImageProp from "./ImageProp.js";

export default class StopSign extends ImageProp {
    protected activated: boolean

    public constructor(
        xPos: number,
        yPos: number,
        xVel: number,
        yVel: number,
        width: number,
        height: number,
        imageUrl: string,
    ) {
        super(xPos, yPos, xVel, yVel, width, height, imageUrl);
    }

    public activate() {
        this.activated = true
    }

    public isActive() {
        return this.activated;
    }
}
