import Game from "../Game.js";
import Player from "../Player.js";
import ImageProp from "../Props/ImageProp.js";
import TrackProp from "../Props/TrackProp.js";
import Situation from "../Situation.js";
import UserData from "../UserData.js";


export default class OncomingCyclist extends Situation {

    public constructor(canvas: HTMLCanvasElement, userData: UserData, stamina: number, upgrades: { stamina_resistance: { level: number, price: number }, stamina_gain: { level: number, price: number } }) {
        super(canvas, userData, upgrades)
        this.background = new ImageProp(canvas.width / 3, -canvas.height, 0, 0, canvas.width / 2, canvas.height, './assets/img/objects/KruispuntGeenZebrapad.png');
        this.props = [
           new ImageProp(this.background.getXPos() + (this.background.getWidth() / 3.5), this.background.getYPos(), 0, 0.32, this.background.getWidth() / 16, this.background.getHeight() / 5, './assets/img/players/fiets1Down.png'),
            new TrackProp(
                [
                    { xPos1: this.background.getXPos() + (this.background.getWidth() / 3.75), yPos1: this.background.getYPos() + (this.background.getHeight() / 4), xPos2: this.background.getXPos() + (this.background.getWidth() / 4), yPos2: this.background.getYPos() + (this.background.getHeight() / 2), xVel: 0.17, yVel: (Game.randomInteger(1.5, 1.6) / 10) },
                ], this.background.getWidth() / 16, this.background.getHeight() / 5, './assets/img/players/fiets1Down.png'),
        ]
        this.player = new Player((canvas.width / 2) - ((canvas.width / 8) / 2), canvas.height / 1.2, 0, 0, canvas.width / 20, canvas.height / 8, stamina)
    }
    // Set boundaries to the player's movements
    public processInput() {
        this.player.processInput(this.canvas, this.background.getXPos() + (this.background.getWidth() / 3) , this.background.getXPos() + ((this.background.getWidth() / 3) * 2));
    }
}
