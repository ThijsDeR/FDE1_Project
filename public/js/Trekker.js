import AnimatedProp from './Props/AnimatedProp.js';
import Game from './Game.js';
export default class Trekker extends AnimatedProp {
    constructor(xPos, yPos, xVel, yVel, width, height) {
        super(xPos, yPos, xVel, yVel, width, height, [
            { image: Game.loadNewImage('./assets/img/objects/a_button.png'), duration: 200 },
            { image: Game.loadNewImage('./assets/img/objects/w_button.png'), duration: 200 },
        ]);
    }
    move(elapsed) {
        this.yPos -= this.yVel * elapsed;
    }
    update(elapsed) {
        this.advance(elapsed);
    }
}
