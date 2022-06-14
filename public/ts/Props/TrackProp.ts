import ImageProp from "./ImageProp.js"

export default class TrackProp extends ImageProp {
    private vectors: {xPos1: number, yPos1: number, xPos2: number, yPos2: number, xVel: number, yVel: number}[];

    private currentVector: number;

    public constructor(vectors: {xPos1: number, yPos1: number, xPos2: number, yPos2: number, xVel: number, yVel: number}[], width: number, height: number, imageUrl: string, turning: boolean = true) {
        super(vectors[0].xPos1, vectors[0].yPos1, vectors[0].xVel, vectors[0].yVel, width, height, imageUrl, turning);

        this.vectors = vectors;
        this.currentVector = 0;

    }

    // public move(elapsed: number): void {
    //     const vector = this.vectors[this.currentVector]
    //     if (
    //         (vector.xPos1 < vector.xPos2 && this.xPos < vector.xPos2)
    //         || (vector.xPos1 > vector.xPos2 && this.xPos > vector.xPos2)
    //         ) this.xPos += vector.xVel * elapsed

    //     if (
    //         (vector.yPos1 < vector.yPos2 && this.yPos <= vector.yPos2)
    //         || (vector.yPos1 > vector.yPos2 && this.yPos >= vector.yPos2)
    //         ) this.yPos += vector.yVel * elapsed
    // }

    public update(elapsed: number) {
        super.update(elapsed)
        if (this.isDoneXVel() && this.isDoneYVel()) {
            if (this.vectors.length > this.currentVector + 1) {
                this.currentVector += 1
            }
        }

        const vector = this.vectors[this.currentVector]

        if (this.isDoneXVel()) this.xVel = 0
        else this.xVel = vector.xVel
        if (this.isDoneYVel()) this.yVel = 0
        else this.yVel = vector.yVel
    }


    private isDoneXVel() {
        const vector = this.vectors[this.currentVector]

        return ((vector.xPos1 < vector.xPos2 && this.xPos >= vector.xPos2)
        || (vector.xPos1 > vector.xPos2 && this.xPos <= vector.xPos2)
        || (this.xPos === vector.xPos2))
    }

    private isDoneYVel() {
        const vector = this.vectors[this.currentVector]

        return ((vector.yPos1 < vector.yPos2 && this.yPos >= vector.yPos2)
        || (vector.yPos1 > vector.yPos2 && this.yPos <= vector.yPos2)
        || (this.yPos === vector.yPos2))
    }

    public scroll(elapsed: number, scrollSpeed: number): void {
        this.yPos += (scrollSpeed * elapsed);
        this.vectors.forEach((vector) => {
            vector.yPos1 += (scrollSpeed * elapsed);
            vector.yPos2 += (scrollSpeed * elapsed);
        })
    }



}
