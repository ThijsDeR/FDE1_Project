import ImageProp from "./ImageProp.js";

export default abstract class StaminaBooster extends ImageProp {
    protected staminaBoostAmount: number;

    public constructor(
        xPos: number,
        yPos: number,
        xVel: number,
        yVel: number,
        width: number,
        height: number,
        imageUrl: string,
        staminaBoostAmount: number
    ) {
        super(xPos, yPos, xVel, yVel, width, height, imageUrl);
        this.staminaBoostAmount = staminaBoostAmount;
    }

    public getStaminaBoostAmount(): number {
        return this.staminaBoostAmount;
    }
}