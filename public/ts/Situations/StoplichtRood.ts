import Game from "../Game.js";
import Player from "../Player.js";
import Frikandelbroodje from "../Props/Frikandelbroodje.js";
import ImageProp from "../Props/ImageProp.js";
import Prop from "../Props/Prop.js";
import StaminaBooster from "../Props/StaminaBooster.js";
import Situation from "../Situation.js";
import UserData from "../UserData.js";
import Stoplicht from "../Props/Stoplicht.js";

export default class StoplichtRood extends Situation {

    public constructor(
        canvas: HTMLCanvasElement,
        userData: UserData,
        stamina: number,
        upgrades: {
            stamina_resistance: {
                level: number,
                price: number
            }, stamina_gain: {
                level: number,
                price: number
            }
        }) {

        super(canvas, userData, upgrades)

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
                './assets/img/players/fiets1.png'
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

        // Create player
        this.player = new Player(
            this.background.getXPos() + ((this.background.getWidth() / 3) * 2) - ((this.background.getWidth() / 8) / 2),
            this.background.getHeight() / 1.2,
            0,
            0,
            this.background.getWidth() / 20,
            this.background.getHeight() / 8,
            stamina
        )
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

    // Set boundaries to the player's movements
    public processInput() {
        this.player.processInput(this.canvas,
            this.background.getXPos() + this.background.getWidth() / 3,
            this.background.getXPos() + (this.background.getWidth() / 3) * 2
        )
    }
}
