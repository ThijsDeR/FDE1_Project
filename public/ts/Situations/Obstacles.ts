import Game from "../Game.js";
import Player from "../Player.js";
import ImageProp from "../Props/ImageProp.js";
import TrackProp from "../Props/TrackProp.js";
import Situation from "../Situation.js";
import UserData from "../UserData.js";
import Frikandelbroodje from "../Props/Frikandelbroodje.js";


export default class Obstacles extends Situation {

    public constructor(canvas: HTMLCanvasElement,
        userData: UserData,
        playerData: {xPos: number | null, stamina: number},
        upgrades: Upgrades,
        skins: Skins
    ) {
        super(canvas, userData, upgrades, skins)
        this.background = new ImageProp(canvas.width / 3, -canvas.height, 0, 0, canvas.width / 2, canvas.height, './assets/img/objects/KruispuntGeenZebrapad.png');


        this.props = [
           new ImageProp(this.background.getXPos() + (this.background.getWidth() / 3.5), this.background.getYPos(), 0, 0.39, this.background.getWidth() / 16, this.background.getHeight() / 5, './assets/img/players/fiets1.png'),
        //    new ImageProp(this.background.getXPos() + (this.background.getWidth() / 2.4), this.background.getYPos() + (this.background.getHeight() / 2), 0, 0, this.background.getWidth() / 16, this.background.getHeight() / 9, './assets/img/objects/frikandelbroodje.png'),
        //    new ImageProp(this.background.getXPos() + (this.background.getWidth() / 1.7), this.background.getYPos() + (this.background.getHeight() / 2), 0, 0, this.background.getWidth() / 16, this.background.getHeight() / 9, './assets/img/objects/frikandelbroodje.png'),
        ]
        const obstacle1 =[
            new ImageProp(this.background.getXPos() + (this.background.getWidth() / 2.4), this.background.getYPos() + (this.background.getHeight() / 2.4), 0, 0, this.background.getWidth() / 8, this.background.getHeight() / 17, './assets/img/objects/bier.png'),
            new ImageProp(this.background.getXPos() + (this.background.getWidth() / 1.7), this.background.getYPos() + (this.background.getHeight() / 2), 0, 0, this.background.getWidth() / 8, this.background.getHeight() / 17, './assets/img/objects/bier.png'),
            new ImageProp(this.background.getXPos() + (this.background.getWidth() / 2), this.background.getYPos() + (this.background.getHeight() / 2), 0, 0, this.background.getWidth() / 8, this.background.getHeight() / 17, './assets/img/objects/tak2.png')
        ]
        const obstacle2 =[
            new ImageProp(this.background.getXPos() + (this.background.getWidth() / 3.4), this.background.getYPos() + (this.background.getHeight() / 1.6), 0, 0, this.background.getWidth() / 8, this.background.getHeight() / 17, './assets/img/objects/tak.png'),
            new ImageProp(this.background.getXPos() + (this.background.getWidth() / 2.5), this.background.getYPos(), 0, 0.295, this.background.getWidth() / 16, this.background.getHeight() / 5, './assets/img/objects/car.png'),
            new ImageProp(this.background.getXPos() + (this.background.getWidth() / 2), this.background.getYPos() + (this.background.getHeight() /2.5), 0, 0, this.background.getWidth() / 8, this.background.getHeight() / 17, './assets/img/objects/tak3.png')
        ]

         Game.randomInteger(0, 1) === 1 ? obstacle1.forEach(obstacle1 => {
            this.props.push(obstacle1)
        }) : obstacle2.forEach(obstacle2 => {
            this.props.push(obstacle2)
        });



        this.player = new Player(this.background.getXPos() + ((this.background.getWidth() / 3) * 2) - ((this.background.getWidth() / 8) / 2), this.background.getHeight() / 1.2, 0, 0, this.background.getWidth() / 20, this.background.getHeight() / 8, playerData.stamina)
    }
    // Set boundaries to the player's movements
    public processInput() {
        this.player.processInput(this.canvas, this.background.getXPos() + (this.background.getWidth() / 3) , this.background.getXPos() + ((this.background.getWidth() / 3) * 2));
    }
}
