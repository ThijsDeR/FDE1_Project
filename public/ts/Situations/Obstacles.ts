import Game from "../Game.js";
import ImageProp from "../Props/ImageProp.js";
import Situation from "../Situation.js";
import UserData from "../UserData.js";
import StaminaBooster from "../Props/StaminaBooster.js";

export default class Obstacles extends Situation {

    public constructor(
        canvas: HTMLCanvasElement,
        userData: UserData,
        playerData: PlayerData,
        upgrades: Upgrades,
        skins: Skins
    ) {
        super(canvas, userData, playerData, upgrades, skins)

        this.background = new ImageProp(
            canvas.width / 3,
            -canvas.height,
            0,
            0,
            canvas.width / 2,
            canvas.height,
            './assets/img/objects/Kruispunt.png'
        );

        this.leftBoundary = this.background.getXPos() + (this.background.getWidth() / 3)

        this.rightBoundary = this.background.getXPos() + ((this.background.getWidth() / 3) * 2)

        this.player = this.createPlayer()

        this.props = [
            new ImageProp(
                this.background.getXPos() + (this.background.getWidth() / 3.5),
                this.background.getYPos(),
                0,
                0.39,
                this.background.getWidth() / 16,
                this.background.getHeight() / 5,
                './assets/img/players/cycles/fiets1normal.png'
            ),
            //    new ImageProp(this.background.getXPos() + (this.background.getWidth() / 2.4), this.background.getYPos() + (this.background.getHeight() / 2), 0, 0, this.background.getWidth() / 16, this.background.getHeight() / 9, './assets/img/objects/frikandelbroodje.png'),
            //    new ImageProp(this.background.getXPos() + (this.background.getWidth() / 1.7), this.background.getYPos() + (this.background.getHeight() / 2), 0, 0, this.background.getWidth() / 16, this.background.getHeight() / 9, './assets/img/objects/frikandelbroodje.png'),
        ]
        const obstacles1 = [
            new ImageProp(
                this.background.getXPos() + (this.background.getWidth() / 2.4),
                this.background.getYPos() + (this.background.getHeight() / 2.4),
                0,
                0,
                this.background.getWidth() / 8,
                this.background.getHeight() / 17,
                './assets/img/objects/bier.png'
            ),
            new ImageProp(
                this.background.getXPos() + (this.background.getWidth() / 1.7),
                this.background.getYPos() + (this.background.getHeight() / 2),
                0,
                0, this.background.getWidth() / 8,
                this.background.getHeight() / 17,
                './assets/img/objects/bier.png'
            ),
            new ImageProp(
                this.background.getXPos() + (this.background.getWidth() / 2),
                this.background.getYPos() + (this.background.getHeight() / 2),
                0,
                0, this.background.getWidth() / 8,
                this.background.getHeight() / 17,
                './assets/img/objects/Tak2.png'
            ),
              // Stamina booster
              new StaminaBooster(
                this.background.getXPos() + this.background.getWidth() / 2,
                this.background.getYPos() + (this.background.getHeight() / 6),
                0,
                0,
                this.background.getWidth() / 16,
                this.background.getHeight() / 9,
                this.skins.staminaSkin.src,
                parseInt(this.skins.staminaSkin.baseStamina)
            ),
        ]

        const obstacles2 = [
            new ImageProp(
                this.background.getXPos() + (this.background.getWidth() / 3.4),
                this.background.getYPos() + (this.background.getHeight() / 1.6),
                0,
                0,
                this.background.getWidth() / 8,
                this.background.getHeight() / 17,
                './assets/img/objects/Tak.png'
            ),
            new ImageProp(
                this.background.getXPos() + (this.background.getWidth() / 2.5),
                this.background.getYPos(),
                0,
                0.105,
                this.background.getWidth() / 16,
                this.background.getHeight() / 5,
                './assets/img/players/fiets1.png'
            ),
            new ImageProp(
                this.background.getXPos() + (this.background.getWidth() / 2),
                this.background.getYPos() + (this.background.getHeight() / 2.7),
                0,
                0,
                this.background.getWidth() / 8,
                this.background.getHeight() / 17,
                './assets/img/objects/Tak3.png'
            ),

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

        Game.randomInteger(0, 1) === 1
            ? obstacles1.forEach(obstacles1 => {
                this.props.push(obstacles1)
            }) : obstacles2.forEach(obstacles2 => {
                this.props.push(obstacles2)
            });
    }
}
