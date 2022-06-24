import Game from "./Game.js";
import Player from "./Player.js";
import ImageProp from "./Props/ImageProp.js";
import Prop from "./Props/Prop.js";
import StaminaBooster from "./Props/StaminaBooster.js";
import TrackProp from "./Props/TrackProp.js";
import Scene from "./Scene.js";
import UserData from "./UserData.js";

export default abstract class Situation extends Scene {
    public static readonly NOT_DONE: number = 0;

    public static readonly GAME_OVER: number = 1;

    public static readonly FINISHED: number = 2;

    public static readonly PAUSED: number = 3;

    protected crashSound: HTMLAudioElement;

    protected player: Player;

    protected leftBoundary: number;

    protected rightBoundary: number;

    protected playerData: PlayerData;

    protected props: ImageProp[];

    protected background: ImageProp;

    protected upgrades: Upgrades;

    protected skins: Skins;

    protected isMist: boolean

    protected currentMist: number;

    protected pickupSound: HTMLAudioElement

    protected scoreTick: number;


    public constructor (canvas: HTMLCanvasElement, userData: UserData, playerData: PlayerData, upgrades: Upgrades, skins: Skins) {

        super(canvas, userData)
        this.upgrades = upgrades;
        this.playerData = playerData;
        this.crashSound = new Audio('./audio/bike_crash.mp3');
        this.crashSound.volume = 0.7;
        Game.randomInteger(0, 10) === 1 ? this.isMist = true : this.isMist = false;
        this.currentMist = 0;
        this.skins = skins;
        this.pickupSound = new Audio('./audio/EatingSound.wav');
        this.pickupSound.volume = 0.5;

        // // Define the width of the player
        // this.playerWidth = this.background.getWidth() / 20

        // // Define the height of the player
        // this.playerHeight = this.background.getHeight() / 8
    }

    public render() {
        this.background.draw(this.ctx);
        this.props.forEach((prop) => {
            prop.draw(this.ctx);
        })
        this.player.draw(this.ctx);

        if (this.isMist) {
            const mistIntensity = Math.max(this.currentMist - (this.upgrades.lamp_power.level / 1000), 0) + 0.05
            this.ctx.fillStyle = `rgba(168, 168, 168, ${mistIntensity})`;
            this.ctx.fillRect(this.background.getXPos(), -this.canvas.height, this.background.getWidth(), this.background.getHeight() * 10)
        }
    }

    public isPaused() {
        if (this.player.isPausing() === true) {
            return Situation.PAUSED;
        }
    }

    public getPlayerYVel() {
        return this.player.getYVel();
    }

    public getPlayerStamina() {
        return this.player.getStamina();
    }

    public getScoreTick() {
        return this.scoreTick;
    }

    public update(elapsed: number): number {
        this.scoreTick = 0
        this.player.move(elapsed);
        this.player.update(elapsed);
        this.background.move(elapsed)
        this.background.scroll(elapsed, this.player.getYVel())
    
        
        let gameOver = this.handleProps(elapsed)
        
        if (this.player.getStamina() >= 0) this.handleStaminaDepletion(elapsed)
        else gameOver = true;
        
        this.scoreTick += (this.player.getYVel() * elapsed) / 10

        if (this.isMist) {
            if (!this.vanishMist()) {
                if (this.currentMist <= 0.85) this.currentMist += Math.min(elapsed / 1000, 0.004)
            } else this.currentMist -= Math.min(elapsed / 400, 0.01)
        }

        if (this.finishedCheck()) {
            return Situation.FINISHED;
        }



        if (this.isPaused()) {
            return Situation.PAUSED;
        }

        return gameOver ? Situation.GAME_OVER : Situation.NOT_DONE;
    }

    protected vanishMist() {
        return this.player.getYPos() < this.background.getYPos() - (this.background.getHeight() / 2)
    }

    protected finishedCheck() {
        return this.player.getYPos() < this.background.getYPos() - this.background.getHeight()
    }

    protected handleProps(elapsed: number) {
        let gameOver = false
        this.props.forEach((prop, propIndex) => {
            if (this.movePropsCheck()) {
                prop.move(elapsed)
                if (prop instanceof TrackProp || prop instanceof ImageProp) {
                    prop.update(elapsed)
                }
            }

            prop.scroll(elapsed, this.player.getYVel())

            let propCollission = this.handleCollission(prop, propIndex, elapsed)
            if (propCollission) gameOver = true;



            let extraPropHandling = this.extraPropHandling(prop, propIndex)
            if (extraPropHandling) gameOver = true
        })

        return gameOver
    }

    protected movePropsCheck() {
        return this.background.getYPos() + (this.background.getHeight() / 2) > 0
    }

    protected handleCollission(prop: ImageProp, propIndex: number, elapsed: number) {
        let gameOver = false;
        if (prop.collidesWithOtherImageProp(this.player)) {
            if (prop instanceof StaminaBooster) {
                this.pickupSound.play()
                this.handleStaminaChange(prop, propIndex)

            } else {
                this.scoreTick -= 200
                this.crashSound.play()
                gameOver = true;
            }
        }

        return gameOver
    }

    protected handleStaminaChange(prop: StaminaBooster, propIndex: number) {
        this.player.changeStamina(prop.getStaminaBoostAmount() * ((50 + this.upgrades.stamina_gain.level) / 50));
        this.props.splice(propIndex, 1);
    }

    protected handleStaminaDepletion(elapsed: number) {
        this.player.changeStamina((-0.025 / ((50 + this.upgrades.stamina_resistance.level) / 50)) * (elapsed / 10));
    }

    protected extraPropHandling(prop: Prop, propIndex: number) {
        return false;
    }

    public getPlayer() {
        return this.player;
    }

    // Set boundaries to the player's movements
    public processInput() {
        this.player.processInput(
            // The canvas upon which the game is rendered
            this.canvas,
            // The left side of the playing field
            this.leftBoundary,
            // The right side of the playing field
            this.rightBoundary
        )
    }

    protected checkPlayerPosition() {
        // Create the xPos variable
        let xPos
        // If previous data exists, use said data
        if (this.playerData.xPos) xPos = this.playerData.xPos
        // If no data exists, use the right boundary minus the player's width
        else xPos = this.rightBoundary - (this.background.getWidth() / 20)
        // If the position is less than the left boundary, reset player to within the boundary
        if (xPos < this.leftBoundary) xPos = this.leftBoundary
        // If the position is more than the right boundary, reset player to within the boundary
        else if (xPos > this.rightBoundary) xPos = this.rightBoundary
        // Return the value to the player
        return xPos
    }

    protected createPlayer(): Player {
        return new Player(
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
            this.playerData.stamina
        );
    }
}
