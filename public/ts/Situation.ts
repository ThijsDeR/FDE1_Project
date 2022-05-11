import Button from "./Button.js";
import Player from "./Player.js";
import ImageProp from "./Props/ImageProp.js";

export default class Situation extends ImageProp{
    private button: Button;

    private coordsButton: {xPos: number, yPos: number, xVel: number, yVel: number, width: number, height: number};
    
    private buttonsLeft: number;

    private timeSinceLastPress: number;

    public constructor(
        coordsSituation: {xPos: number, yPos: number, xVel: number, yVel: number, width: number, height: number},
        coordsButton: {xPos: number, yPos: number, xVel: number, yVel: number, width: number, height: number},
        amount: number
    ) {
        super(
            coordsSituation.xPos,
            coordsSituation.yPos,
            coordsSituation.xVel,
            coordsSituation.yVel,
            coordsSituation.width,
            coordsSituation.height,
            'assets/img/objects/face_on_cross.png',
        )
        this.coordsButton = coordsButton
        this.newButton()
        this.buttonsLeft = amount - 1
        this.timeSinceLastPress = 0
    }

    private newButton() {
        this.button = new Button(
            this.coordsButton.xPos,
            this.coordsButton.yPos,
            this.coordsButton.xVel,
            this.coordsButton.yVel,
            this.coordsButton.width,
            this.coordsButton.height
        );
    }

    public checkButton(player: Player, canvas: HTMLCanvasElement) {
        if (this.timeSinceLastPress > 200) {
            if (this.button.checkButton(player)) {
                this.buttonsLeft -= 1;
                if (!this.isDone()) this.newButton();
                this.timeSinceLastPress = 0;
            }
        } else if (this.button.collidesWithCanvasBottom(canvas)) {
            player.changeStamina(-10)
            this.buttonsLeft -= 1
            if (!this.isDone()) this.newButton();
        }
    }

    public update(elapsed: number) {
        this.timeSinceLastPress += elapsed;
    }

    public draw(ctx: CanvasRenderingContext2D) {
        super.draw(ctx);
        this.button.draw(ctx);
    }

    public move(elapsed: number): void {
        super.move(elapsed);
        this.button.move(elapsed);
    }

    public scroll(elapsed: number, scrollSpeed: number): void {
        super.scroll(elapsed, scrollSpeed);
        this.button.scroll(elapsed, scrollSpeed);
    }



    public isDone() {
        return this.buttonsLeft < 0;
    }
}