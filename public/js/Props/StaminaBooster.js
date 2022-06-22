import ImageProp from "./ImageProp.js";
export default class StaminaBooster extends ImageProp {
    constructor(xPos, yPos, xVel, yVel, width, height, imageUrl, staminaBoostAmount, turning = false) {
        super(xPos, yPos, xVel, yVel, width, height, imageUrl, turning);
        this.staminaBoostAmount = staminaBoostAmount;
    }
    getStaminaBoostAmount() {
        return this.staminaBoostAmount;
    }
}
