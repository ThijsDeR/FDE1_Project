
import ImageProp from "../Props/ImageProp.js";
import Situation from "../Situation.js"
import UserData from "../UserData.js";

export default class Example extends Situation {
    public constructor(
        canvas: HTMLCanvasElement,
        userData: UserData,
        playerData:
            {
                xPos: number | null,
                stamina: number
            },
        upgrades: Upgrades
    ) {
        super(canvas, userData, playerData, upgrades)

        // Situation background parameters
        this.background = new ImageProp(

        )

        // Define the left boundary of the playing field
        this.leftBoundary =

        // Define the right boundary of the playing field
        this.rightBoundary =

        // Create player
        this.player = this.createPlayer()

        // Add props to situation
        this.props = []
    }
}