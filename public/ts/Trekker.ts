import AnimatedProp from './Props/AnimatedProp.js';
import Game from './Game.js';

export default class Trekker extends AnimatedProp {


    public constructor(xPos: number, yPos: number, xVel: number, yVel: number, width: number, height: number) {
        super(xPos, yPos, xVel, yVel, width, height, [
            {image: Game.loadNewImage('./assets/img/objects/a_button.png'), duration: 200},
            {image: Game.loadNewImage('./assets/img/objects/w_button.png'), duration: 200},
          ]);
    }

    public move(elapsed: number) {
        this.yPos -= this.yVel * elapsed;
    }

    public update(elapsed: number) {
        this.advance(elapsed);
      }
}
