import Game from "../Game.js";
import Player from "../Player.js";
import Frikandelbroodje from "../Props/Frikandelbroodje.js";
import ImageProp from "../Props/ImageProp.js";
import TrackProp from "../Props/TrackProp.js";
import Situation from "../Situation.js";
import UserData from "../UserData.js";

export default class Crossroad extends Situation {
    public constructor(canvas: HTMLCanvasElement, userData: UserData, playerData: {xPos: number | null, stamina: number}, upgrades: {stamina_resistance: {level: number, price: number}, stamina_gain: {level: number, price: number}}) {
        super(canvas, userData, upgrades)
        this.background = new ImageProp(canvas.width / 3, -canvas.height, 0, 0, canvas.width / 2, canvas.height, './assets/img/objects/KruispuntZebraPad.png', false);
        this.props = [
            new ImageProp(this.background.getXPos() + (this.background.getWidth() / 3), this.background.getYPos(), 0, 0.05, this.background.getWidth() / 16, this.background.getHeight() / 9, './assets/img/objects/car.png'),
            new Frikandelbroodje(this.background.getXPos() + (this.background.getWidth() / 2), this.background.getYPos() + (this.background.getHeight() / 2), 0, 0, this.background.getWidth() / 16, this.background.getHeight() / 9, './assets/img/objects/frikandelbroodje.png', 10)
        ]

        const badCycle = new ImageProp(this.background.getXPos() - (this.background.getWidth() / 10), this.background.getYPos() + (this.background.getHeight() / 2), 0.3, 0, this.background.getWidth() / 16, this.background.getHeight() / 9, './assets/img/players/fiets1.png')
        const goodCycle = new TrackProp([
            {
                xPos1: this.background.getXPos() - (this.background.getWidth() / 10), yPos1: this.background.getYPos() + (this.background.getHeight() / 2),
                xPos2: this.background.getXPos() + this.background.getWidth() / 5, yPos2: this.background.getYPos() + (this.background.getHeight() / 2),
                xVel: 0.3, yVel: 0
            },
            {
                xPos1: this.background.getXPos() + this.background.getWidth() / 5, yPos1: this.background.getYPos() + (this.background.getHeight() / 2),
                xPos2: this.background.getXPos() + (this.background.getWidth() / 2), yPos2: this.background.getYPos() + (this.background.getHeight() / 2),
                xVel: 0.0000000000000000000000001, yVel: 0
            },
        ], this.background.getWidth() / 16, this.background.getHeight() / 9, './assets/img/players/fiets1.png')

        Game.randomInteger(0, 1) === 1 ? this.props.push(badCycle) : this.props.push(goodCycle)

        let xPos
        if (playerData.xPos) xPos = playerData.xPos
        else xPos = this.background.getXPos() + this.background.getWidth() / 2
        if (xPos < this.background.getXPos() + this.background.getWidth() / 3) xPos = this.background.getXPos() + this.background.getWidth() / 3
        else if (xPos > this.background.getXPos() + (this.background.getWidth() / 3) * 2) xPos = this.background.getXPos() + (this.background.getWidth() / 3) * 2
        this.player = new Player(xPos, this.background.getWidth() / 1.2, 0, 0, this.background.getWidth() / 20,this.background.getHeight() / 8, playerData.stamina)

    }

    // Set boundaries to the player's movements
    public processInput() {
        this.player.processInput(this.canvas, this.background.getXPos() + this.background.getWidth() / 3, this.background.getXPos() + (this.background.getWidth() / 3) * 2);
    }
}
