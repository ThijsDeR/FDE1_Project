import ImageProp from "./ImageProp.js"

export default class TrackProp extends ImageProp {
    // public constructor(xPos: number, yPos: number, xVel: number, yVel: number, width: number, height: number, imageUrl: string) {
    //     super(xPos, yPos, xVel, yVel, width, height, imageUrl);
    private vectors: {xPos1: number, yPos1: number, xPos2: number, yPos2: number, xVel: number, yVel: number}[];

    private currentVector: number;

    public constructor(vectors: {xPos1: number, yPos1: number, xPos2: number, yPos2: number, xVel: number, yVel: number}[], width: number, height: number, imageUrl: string) {
        super(vectors[0].xPos1, vectors[0].yPos1, 0, 0, width, height, imageUrl);

        this.vectors = vectors;
        this.currentVector = 0;

    }

    public move(elapsed: number): void {
        const vector = this.vectors[this.currentVector]
        if (
            (vector.xPos1 < vector.xPos2 && this.xPos < vector.xPos2)
            || (vector.xPos1 > vector.xPos2 && this.xPos > vector.xPos2)
            ) this.xPos += vector.xVel * elapsed

        if (
            (vector.yPos1 < vector.yPos2 && this.yPos <= vector.yPos2)
            || (vector.yPos1 > vector.yPos2 && this.yPos >= vector.yPos2)
            ) this.yPos += vector.yVel * elapsed
    }

    public update() {
        const vector = this.vectors[this.currentVector]

        if (
            ((vector.xPos1 < vector.xPos2 && this.xPos >= vector.xPos2)
            || (vector.xPos1 > vector.xPos2 && this.xPos <= vector.xPos2)
            || (this.xPos === vector.xPos2))

            && ((vector.yPos1 < vector.yPos2 && this.yPos >= vector.yPos2)
            || (vector.yPos1 > vector.yPos2 && this.yPos <= vector.yPos2)
            || (this.yPos === vector.yPos2))
        ) {
            if (this.vectors.length > this.currentVector + 1) {
                this.currentVector += 1
            }
            console.log(this.currentVector)
        }


    }

    public scroll(elapsed: number, scrollSpeed: number): void {
        this.yPos += (scrollSpeed * elapsed);
        this.vectors.forEach((vector) => {
            vector.yPos1 += (scrollSpeed * elapsed);
            vector.yPos2 += (scrollSpeed * elapsed);
        })
    }
}
