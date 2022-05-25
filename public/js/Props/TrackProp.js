import ImageProp from "./ImageProp.js";
export default class TrackProp extends ImageProp {
    constructor(vectors, width, height, imageUrl) {
        super(vectors[0].xPos1, vectors[0].yPos1, 0, 0, width, height, imageUrl);
        this.vectors = vectors;
        this.currentVector = 0;
    }
    move(elapsed) {
        const vector = this.vectors[this.currentVector];
        if ((vector.xPos1 < vector.xPos2 && this.xPos < vector.xPos2)
            || (vector.xPos1 > vector.xPos2 && this.xPos > vector.xPos2))
            this.xPos += vector.xVel * elapsed;
        if ((vector.yPos1 < vector.yPos2 && this.yPos <= vector.yPos2)
            || (vector.yPos1 > vector.yPos2 && this.yPos >= vector.yPos2))
            this.yPos += vector.yVel * elapsed;
    }
    update() {
        const vector = this.vectors[this.currentVector];
        if (((vector.xPos1 < vector.xPos2 && this.xPos >= vector.xPos2)
            || (vector.xPos1 > vector.xPos2 && this.xPos <= vector.xPos2)
            || (this.xPos === vector.xPos2))
            && ((vector.yPos1 < vector.yPos2 && this.yPos >= vector.yPos2)
                || (vector.yPos1 > vector.yPos2 && this.yPos <= vector.yPos2)
                || (this.yPos === vector.yPos2))) {
            if (this.vectors.length > this.currentVector + 1) {
                this.currentVector += 1;
            }
            console.log(this.currentVector);
        }
    }
    scroll(elapsed, scrollSpeed) {
        this.yPos += (scrollSpeed * elapsed);
        this.vectors.forEach((vector) => {
            vector.yPos1 += (scrollSpeed * elapsed);
            vector.yPos2 += (scrollSpeed * elapsed);
        });
    }
}
