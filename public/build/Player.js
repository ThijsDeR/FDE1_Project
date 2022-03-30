import KeyListener from './KeyListener.js';
export default class Player {
    canvas;
    leftLane;
    middleLane;
    rightLane;
    keyListener;
    image;
    positionX;
    constructor(canvas) {
        this.canvas = canvas;
        this.leftLane = this.canvas.width / 4;
        this.middleLane = this.canvas.width / 2;
        this.rightLane = (this.canvas.width / 4) * 3;
        this.keyListener = new KeyListener();
        this.image = Player.loadNewImage('./assets/img/players/character_robot_walk0.png');
        this.positionX = this.canvas.width / 2;
    }
    move() {
        if (this.keyListener.isKeyDown(KeyListener.KEY_LEFT) && this.positionX !== this.leftLane) {
            this.positionX = this.leftLane;
        }
        if (this.keyListener.isKeyDown(KeyListener.KEY_UP) && this.positionX !== this.middleLane) {
            this.positionX = this.middleLane;
        }
        if (this.keyListener.isKeyDown(KeyListener.KEY_RIGHT) && this.positionX !== this.rightLane) {
            this.positionX = this.rightLane;
        }
    }
    draw(ctx) {
        ctx.drawImage(this.image, this.positionX - this.image.width / 2, this.canvas.height - 150);
    }
    collidesWith(scoringObject) {
        if (this.positionX < scoringObject.getPositionX() + scoringObject.getImageWidth()
            && this.positionX + this.image.width > scoringObject.getPositionX()
            && this.canvas.height - 150 < scoringObject.getPositionY()
                + scoringObject.getImageHeight()
            && this.canvas.height - 150 + this.image.height > scoringObject.getPositionY()) {
            return true;
        }
        return false;
    }
    static loadNewImage(source) {
        const img = new Image();
        img.src = source;
        return img;
    }
}
//# sourceMappingURL=Player.js.map