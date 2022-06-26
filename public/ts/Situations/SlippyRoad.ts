import Game from "../Game.js";
import KeyListener from "../KeyListener.js";
import ImageProp from "../Props/ImageProp.js";
import StaminaBooster from "../Props/StaminaBooster.js";
import TrackProp from "../Props/TrackProp.js";
import Situation from "../Situation.js";
import SlippyPlayer from "../SlippyPlayer.js";
import UserData from "../UserData.js";


export default class SlippyRoad extends Situation {

    protected currentIce: number;

    public constructor(
        canvas: HTMLCanvasElement,
        userData: UserData,
        playerData: PlayerData,
        upgrades: Upgrades,
        skins: Skins,
        keyListener: KeyListener
    ) {
        super(canvas, userData, playerData, upgrades, skins)
        // Background properties
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
        this.leftBoundary = this.background.getXPos() + (this.background.getWidth() / 3) - (this.background.getWidth() / 20)

        // Define the right boundary of the playing field
        this.rightBoundary = this.background.getXPos() + ((this.background.getWidth() / 3) * 2) + (this.background.getWidth() / 20)

        // Create player
        this.player = new SlippyPlayer(
            // xPos
            this.checkPlayerPosition(),
            // yPos
            this.background.getHeight() / 1.2,
            // xVel (Handled in player.ts)
            0,
            // yVel (Handled in player.ts)
            0,
            // Width
            this.background.getWidth() / 20,
            // Height
            this.background.getHeight() / 8,
            // Stamina
            this.playerData.stamina,

            this.skins.bicycleSkin,
            
            keyListener
        );

        this.currentIce = 0;

        // Create props in situation
        this.props = [
            // Add car
            new ImageProp(
                this.background.getXPos() + (this.background.getWidth() / 3),
                this.background.getYPos(),
                0,
                0.05,
                this.background.getWidth() / 16,
                this.background.getHeight() / 9,
                './assets/img/objects/car3.png'
            ),
        ] 

        Game.randomInteger(0, 2) === 1 ? this.props.push(
            new StaminaBooster(
                this.background.getXPos() + ((this.background.getWidth() / 3) * 2) - (this.background.getWidth() / 30),
                this.background.getYPos() + (this.background.getHeight() / 2),
                0,
                0,
                this.background.getWidth() / 16,
                this.background.getHeight() / 9,
                this.skins.staminaSkin.src,
                parseInt(this.skins.staminaSkin.baseStamina)
            )
        ) : ''
    }

    public render(): void {
        super.render()
    
        this.ctx.fillStyle = `rgba(118, 160, 227, ${this.currentIce})`;
        this.ctx.fillRect(this.background.getXPos(), -this.canvas.height, this.background.getWidth(), this.background.getHeight() * 10)
    }

    public update(elapsed: number): number {
        if (!this.vanishMist()) {
            if (this.currentIce <= 0.2) this.currentIce += Math.min(elapsed / 1000, 0.004)
        } else this.currentIce -= Math.min(elapsed / 400, 0.01)

        return super.update(elapsed)
    }
}
