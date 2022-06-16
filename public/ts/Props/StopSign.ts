import ImageProp from "./ImageProp.js";

export default class StopSign extends ImageProp {
    private timeStopped: number;

    public constructor(
        xPos: number,
        yPos: number,
        xVel: number,
        yVel: number,
        width: number,
        height: number,
        imageUrl: string,
        turning: boolean = false
    ) {
        super(
            xPos,
            yPos,
            xVel,
            yVel,
            width,
            height,
            imageUrl,
            turning
        )
        this.timeStopped = 0;
    }

    public isActive() {
        return this.timeStopped > 1000;
    }

    public advance(elapsed: number) {
        this.timeStopped += elapsed
    }
}
