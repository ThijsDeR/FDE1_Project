import ImageProp from "../Props/ImageProp.js";
import TrackProp from "../Props/TrackProp.js";
import Situation from "../Situation.js";
import UserData from "../UserData.js";
import Game from "../Game.js";
import StaminaBooster from "../Props/StaminaBooster.js";

export default class OncomingCyclist extends Situation {

    public constructor(
        canvas: HTMLCanvasElement,
        userData: UserData,
        playerData: PlayerData,
        upgrades: Upgrades,
        skins: Skins
    ) {

        super(canvas, userData, playerData, upgrades, skins)

        // Create situation background
        this.background = new ImageProp(
            canvas.width / 3,
            -canvas.height,
            0,
            0,
            canvas.width / 2,
            canvas.height,
            './assets/img/objects/Kruispunt.png',
            false
        )

        // Define the left boundary of the playing field
        this.leftBoundary = this.background.getXPos() + (this.background.getWidth() / 3)

        // Define the right boundary of the playing field
        this.rightBoundary = this.background.getXPos() + ((this.background.getWidth() / 3) * 2)

        // Create player
        this.player = this.createPlayer()

        // TODO: Re-align bicycles
        // Create props in situation
        this.props = [
        ]
        const goodCyclist = [
            //position of obstacle
            new ImageProp(this.background.getXPos() + (this.background.getWidth() / 3.5), this.background.getYPos(),
                //velocity
                0, 0.32,
                //position of player
                this.background.getWidth() / 16, this.background.getHeight() / 5, './assets/img/players/cycles/fiets1normal.png')
            //position of obstacle
            , new ImageProp(this.background.getXPos() + (this.background.getWidth() / 3), this.background.getYPos(),
                //velocity
                0, 0.32,
                //position of player
                this.background.getWidth() / 16, this.background.getHeight() / 5, './assets/img/players/cycles/fiets1normal.png'),
            // Stamina booster
            new StaminaBooster(
                this.background.getXPos() + this.background.getWidth() / 2,
                this.background.getYPos() + (this.background.getHeight() / 2),
                0,
                0,
                this.background.getWidth() / 16,
                this.background.getHeight() / 9,
                this.skins.staminaSkin.src,
                parseInt(this.skins.staminaSkin.baseStamina)
            ),
        ]
        const badCyclist = [
            new TrackProp(
                [
                    {
                        //starting position
                        xPos1: this.background.getXPos() + (this.background.getWidth() / 3.75),
                        yPos1: this.background.getYPos() + (this.background.getHeight() / 4),
                        //target postion
                        xPos2: this.background.getXPos() + ((this.background.getWidth() / 4) * 3),
                        yPos2: this.background.getYPos() + (this.background.getHeight() / 1.75),
                        //velocity
                        xVel: 0.17,
                        yVel: 0.10
                    },
                    {
                        //starting position
                        xPos1: this.background.getXPos() + ((this.background.getWidth() / 4) * 3),
                        yPos1: this.background.getYPos() + (this.background.getHeight() / 1.75),
                        //target position
                        xPos2: this.background.getXPos() + (this.background.getWidth() * 2),
                        yPos2: this.background.getYPos() + (this.background.getHeight() / 1.75),
                        //velocity
                        xVel: 0.17,
                        yVel: 0
                    },


                ],

                //creates player
                this.background.getWidth() / 16, this.background.getHeight() / 5, './assets/img/players/cycles/fiets1normal.png'),
            // cycles that goes straight ahead
            new ImageProp(this.background.getXPos() + (this.background.getWidth() / 3.5), this.background.getYPos(), 0, 0.32, this.background.getWidth() / 16, this.background.getHeight() / 5, './assets/img/players/cycles/fiets1normal.png'),
            // Stamina booster
            new StaminaBooster(
                this.background.getXPos() + this.background.getWidth() / 2,
                this.background.getYPos() + (this.background.getHeight() / 2),
                0,
                0,
                this.background.getWidth() / 16,
                this.background.getHeight() / 9,
                this.skins.staminaSkin.src,
                parseInt(this.skins.staminaSkin.baseStamina)
            ),
        ]
        //pushes of of the two situations to the props
        Game.randomInteger(0, 1) === 1 ? goodCyclist.forEach(goodCyclist => {
            this.props.push(goodCyclist)
        }) : badCyclist.forEach(badCyclist => {
            this.props.push(badCyclist)
        })
    }
}
