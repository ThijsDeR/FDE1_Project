import Game from "../Game.js";
import Prop from "./Prop.js";
export default class ImageProp extends Prop {
    constructor(xPos, yPos, xVel, yVel, width, height, imageUrl, turning = true) {
        super(xPos, yPos, xVel, yVel, width, height);
        this.image = Game.loadNewImage(imageUrl);
        this.turning = turning;
        this.degrees = this.calculateDirection();
    }
    getImage() {
        return this.image;
    }
    draw(ctx, offsetX = 0, offsetY = 0) {
        const degToRad = (deg) => deg * Math.PI / 180;
        ctx.save();
        ctx.translate(this.xPos + (this.width / 2), this.yPos + (this.height / 2));
        if (this.turning)
            ctx.rotate(degToRad(this.degrees));
        ctx.drawImage(this.image, -(this.width / 2), -(this.height / 2), this.width, this.height);
        ctx.restore();
    }
    calculateDirection() {
        const atan2 = Math.atan2(this.yVel, this.xVel);
        if (this.xVel === 0 && this.yVel === 0)
            return 0;
        else {
            const degrees = (atan2 * (180 / Math.PI));
            if (degrees < 0) {
                return this.transformNegativeDegreeToPositive(degrees) + 90;
            }
            return degrees + 90;
        }
    }
    update(elapsed) {
        this.changeDirection(elapsed);
    }
    collidesWithOtherImageProp(prop) {
        let prop1Width = this.width;
        let prop1Height = this.height;
        let prop2Width = prop.getWidth();
        let prop2Height = prop.getHeight();
        if (this.turning) {
            let prop1XPos = this.xPos;
            let prop1YPos = this.yPos;
            let prop2XPos = prop.getXPos();
            let prop2YPos = prop.getYPos();
            if ((this.degrees > 70 && this.degrees < 110)
                || (this.degrees > 250 && this.degrees < 290)) {
                prop1XPos = this.xPos - ((this.height / 2) - (this.width / 2));
                prop1YPos = this.yPos + ((this.height / 2) - (this.width / 2));
                prop1Width = this.height;
                prop1Height = this.width;
            }
            const propDegrees = prop.getDegrees();
            if ((propDegrees > 70 && propDegrees < 110)
                || (propDegrees > 250 && propDegrees < 290)) {
                prop2XPos = prop.getXPos() - ((prop.getHeight() / 2) - (prop.getWidth() / 2));
                prop2YPos = prop.getYPos() + ((prop.getHeight() / 2) - (prop.getWidth() / 2));
                prop2Width = prop.getHeight();
                prop2Height = this.getWidth();
            }
            if (prop1XPos < prop2XPos + prop2Width
                && prop1XPos + prop1Width > prop2XPos
                && prop1YPos < prop2YPos + prop2Height
                && prop1YPos + prop1Height > prop2YPos)
                return true;
            return false;
        }
        else if (this.xPos < prop.getXPos() + prop2Width
            && this.xPos + prop1Width > prop.getXPos()
            && this.yPos < prop.getYPos() + prop2Height
            && this.yPos + prop1Height > prop.getYPos())
            return true;
        return false;
    }
    changeDirection(elapsed) {
        const toDegrees = this.calculateDirection();
        if (toDegrees !== this.degrees) {
            if (this.distanceClockWise(this.degrees, toDegrees) < this.distanceCounterClockWise(this.degrees, toDegrees)) {
                if (toDegrees < this.degrees && toDegrees > this.degrees - elapsed)
                    this.degrees = toDegrees;
                else
                    this.degrees -= elapsed;
                if (this.degrees < 0)
                    this.degrees = 359;
            }
            else {
                if (toDegrees > this.degrees && toDegrees < this.degrees + elapsed)
                    this.degrees = toDegrees;
                else
                    this.degrees += elapsed;
                if (this.degrees >= 360)
                    this.degrees = 0;
            }
        }
    }
    distanceClockWise(fromNumber, toNumber) {
        if (fromNumber - toNumber < 0)
            return fromNumber + (359 - toNumber);
        return fromNumber - toNumber;
    }
    distanceCounterClockWise(fromNumber, toNumber) {
        if (fromNumber - toNumber > 0)
            return (359 - fromNumber) + toNumber;
        return toNumber - fromNumber;
    }
    transformNegativeDegreeToPositive(negativeDegree) {
        return 360 - Math.abs(negativeDegree);
    }
    getDegrees() {
        return this.turning ? this.degrees : 0;
    }
}
