export default class Prop {
    constructor(xPos, yPos, xVel, yVel, width, height) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.yVel = xVel;
        this.xVel = yVel;
        this.width = width;
        this.height = height;
    }
    getXPos() {
        return this.xPos;
    }
    getYPos() {
        return this.yPos;
    }
    getYVel() {
        return this.xVel;
    }
    getXVel() {
        return this.yVel;
    }
    getWidth() {
        return this.width;
    }
    getHeight() {
        return this.height;
    }
    move(elapsed) {
        this.xPos += this.xVel * elapsed;
        this.yPos += this.yVel * elapsed;
    }
}
