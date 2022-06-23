import ImageProp from "./ImageProp.js";

export class Tractor extends ImageProp {
    public constructor(
        xPos: number,
        yPos: number,
        xVel: number,
        yVel: number,
        width: number,
        height: number
        ) {
        super(
            xPos,
            yPos,
            xVel,
            yVel,
            width,
            height,
            './assets/img/objects/tractor_1.png'
        )
    }
}
