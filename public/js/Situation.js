import Button from "./Button.js";
import ImageProp from "./Props/ImageProp.js";
export default class Situation extends ImageProp {
    constructor(coordsSituation, coordsButton, amount) {
        super(coordsSituation.xPos, coordsSituation.yPos, coordsSituation.xVel, coordsSituation.yVel, coordsSituation.width, coordsSituation.height, 'assets/img/objects/face_on_cross.png');
        this.coordsButton = coordsButton;
        this.newButton();
        this.buttonsLeft = amount - 1;
        this.timeSinceLastPress = 0;
    }
    newButton() {
        this.button = new Button(this.coordsButton.xPos, this.coordsButton.yPos, this.coordsButton.xVel, this.coordsButton.yVel, this.coordsButton.width, this.coordsButton.height);
    }
    checkButton(player, canvas) {
        if (this.timeSinceLastPress > 200) {
            if (this.button.checkButton(player)) {
                this.buttonsLeft -= 1;
                if (!this.isDone())
                    this.newButton();
                this.timeSinceLastPress = 0;
            }
        }
        else if (this.button.collidesWithCanvasBottom(canvas)) {
            player.changeStamina(-10);
            this.buttonsLeft -= 1;
            if (!this.isDone())
                this.newButton();
        }
    }
    update(elapsed) {
        this.timeSinceLastPress += elapsed;
    }
    draw(ctx) {
        super.draw(ctx);
        this.button.draw(ctx);
    }
    move(elapsed) {
        super.move(elapsed);
        this.button.move(elapsed);
    }
    isDone() {
        return this.buttonsLeft < 0;
    }
}
