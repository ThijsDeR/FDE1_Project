import StaminaBooster from "./StaminaBooster.js";

export default class Frikandelbroodje extends StaminaBooster {
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
        super(
            xPos,
            yPos,
            xVel,
            yVel,
            width,
            height,
            imageUrl,
            staminaBoostAmount
        )
    }
}