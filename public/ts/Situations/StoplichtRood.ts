import Game from "../Game.js";
import Frikandelbroodje from "../Props/Frikandelbroodje.js";
import ImageProp from "../Props/ImageProp.js";
import Prop from "../Props/Prop.js";
import StaminaBooster from "../Props/StaminaBooster.js";
import Situation from "../Situation.js";
import UserData from "../UserData.js";
import Stoplicht from "../Props/Stoplicht.js";

export default class StoplichtRood extends Situation {
    protected pickupSound: HTMLAudioElement
    public constructor(
        canvas: HTMLCanvasElement,
        userData: UserData,
        playerData: PlayerData,
        upgrades: Upgrades,
        skins: Skins
    ) {

        super(canvas, userData, playerData, upgrades, skins)

        // Sound
        this.pickupSound = new Audio('./audio/EatingSound.wav');
        this.pickupSound.volume = 0.5;

        // Create situation background
        this.background = new ImageProp(
            canvas.width / 3,
            -canvas.height,
            0,
            0,
            canvas.width / 2,
            canvas.height,
            './assets/img/KruispuntGeenZebrapad_1.png',
            false
        )

        this.leftBoundary = this.background.getXPos() + this.background.getWidth() / 3

        this.rightBoundary = this.background.getXPos() + (this.background.getWidth() / 3) * 2

        this.player = this.createPlayer()

        // Create situation props
        this.props = [
            // Cyclist
            new ImageProp(
                0 - (this.background.getWidth() / 10),
                this.background.getYPos() + (this.background.getHeight() / 2),
                (Game.randomInteger(1, 15) / 10),
                0,
                this.background.getWidth() / 10,
                this.background.getHeight() / 5,
                './assets/img/players/cycles/fiets1normal.png'
            ),
            // Car
            new ImageProp(
                this.background.getXPos() + this.background.getWidth() / 3,
                this.background.getYPos(),
                0,
                0.05,
                this.background.getWidth() / 16,
                this.background.getHeight() / 9,
                './assets/img/objects/car.png'
            ),
            // Stamina booster
            new Frikandelbroodje(
                this.background.getXPos() + this.background.getWidth() / 2,
                this.background.getYPos() + (this.background.getHeight() / 2),
                0,
                0,
                this.background.getWidth() / 16,
                this.background.getHeight() / 9,
                './assets/img/objects/frikandelbroodje.png',
                10
            ),

            //Stoplicht
            new Stoplicht(
                this.background.getXPos() + this.background.getWidth() / 1.4,
                this.background.getYPos() + (this.background.getHeight() / 1.1),
                0,
                0,
                this.background.getWidth() / 16,
                this.background.getHeight() / 9,
                './assets/img/StoplichtRood.png',
                false
            )
        ]
    }

    // Handle collisions
    protected handleCollission(
        prop: ImageProp,
        propIndex: number,
        elapsed: number
    ): boolean {
        let gameOver = false;
        if (prop.collidesWithOtherImageProp(this.player)) {
            if (prop instanceof StaminaBooster) {
                this.pickupSound.play();
                this.player.changeStamina(prop.getStaminaBoostAmount() * ((50 + this.upgrades.stamina_gain.level) / 50));
                this.props.splice(propIndex, 1);
            } else {
                gameOver = true;
            }
        }
        if (prop instanceof Stoplicht) {
            if (
                prop.getYPos() < this.player.getYPos() + this.player.getHeight()
                && prop.getYPos() + prop.getHeight() > this.player.getYPos()
            ) {
                if (this.player.isStopped()) {
                    prop.advance(elapsed)
                }
            }
        }
        return gameOver
    }


    // Additional prop processing
    protected extraPropHandling(prop: Prop, propIndex: number): boolean {
        let gameOver = false
        if (prop instanceof Stoplicht) {
            if (prop.isActive()) {
                prop.changeImageSource('./assets/img/StoplichtGroen.png')
            }
            else if (prop.getYPos() > this.player.getYPos() + this.player.getHeight()) {
                gameOver = true;
            }
        }
        return gameOver
    }
}
