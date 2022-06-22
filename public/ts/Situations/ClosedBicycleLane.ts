import Game from "../Game.js";
import Frikandelbroodje from "../Props/Frikandelbroodje.js";
import ImageProp from "../Props/ImageProp.js";
import Situation from "../Situation.js";
import UserData from "../UserData.js";
import BlockedCyclePathSign from "../Props/BlockedCyclePathSign.js";

export default class ClosedBicycleLane extends Situation {

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

        this.background = new ImageProp(
            canvas.width / 3,
            -canvas.height,
            0,
            0,
            canvas.width / 2,
            canvas.height,
            './assets/img/OpritBouwverkeer.png'
        );

        // Define the left boundary of the playing field
        this.leftBoundary = this.background.getWidth() * 1.18

        // Define the right boundary of the playing field
        this.rightBoundary = this.background.getWidth() * 1.35

        // Create player
        this.player = this.createPlayer()

        this.props = [
            new Frikandelbroodje(
                this.background.getXPos() + (this.background.getWidth() / 1.65),
                this.background.getYPos() + (this.background.getHeight() / 1.70),
                0,
                0,
                this.background.getWidth() / 10,
                this.background.getHeight() / 6,
                './assets/img/objects/frikandelbroodje.png',
                10
            ),

            // TODO: Meer obstakels rond werkzaamheden
            new BlockedCyclePathSign(
                this.background.getXPos() + (this.background.getWidth() / 1.65),
                this.background.getYPos() + (this.background.getHeight() / 2.25),
                0,
                0,
                this.background.getWidth() / 8,
                this.background.getHeight() / 5,
                './assets/img/objects/WegAfzetting.png'
            ),
        ]
        Game.randomInteger(0, 1) === 1 
        ? this.props.push(
            // TODO: Auto van voren
            // new ImageProp(
            //     this.background.getXPos() + this.background.getWidth() / 2,
            //     this.background.getYPos() + (this.background.getHeight() * 2),
            //     0,
            //     -0.25,
            //     this.background.getWidth() / 14,
            //     this.background.getHeight() / 9,
            //     './assets/img/objects/car.png'
            // ),
            new ImageProp(
                this.background.getXPos() + (this.background.getWidth() / 2.7),
                this.background.getYPos(),
                0,
                0.10,
                this.background.getWidth() / 14,
                this.background.getHeight() / 9,
                './assets/img/objects/car.png'
            ),
        ) : ''
    }
}
