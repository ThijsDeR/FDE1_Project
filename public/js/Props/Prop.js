export default class Prop {
    constructor(xPos, yPos, xVel, yVel, width, height) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.xVel = xVel;
        this.yVel = yVel;
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
        this.yPos += (this.yVel * elapsed);
    }
    scroll(elapsed, scrollSpeed) {
        this.yPos += (scrollSpeed * elapsed);
    }
    collidesWithOtherProp(prop) {
        if (this.xPos < prop.getXPos() + prop.getWidth()
            && this.xPos + this.width > prop.getXPos()
            && this.yPos < prop.getYPos() + prop.getHeight()
            && this.yPos + this.height > prop.getYPos()) {
            console.log(this.xPos);
            console.log(this.yPos);
            console.log(this.width);
            console.log(this.height);
            console.log('--------');
            console.log(prop.getXPos());
            console.log(prop.getYPos());
            console.log(prop.getWidth());
            console.log(prop.getHeight());
            return true;
        }
        return false;
    }
}
