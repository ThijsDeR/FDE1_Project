import Animator from "../Animator.js";
import Game from "../Game.js";
import Prop from "./Prop.js";

export default class AnimatedProp extends Prop {
    protected animator: Animator;
  


    public constructor(xPos: number, yPos: number, xVel: number, yVel: number, width: number, height: number, images: {image: HTMLImageElement, duration: number}[]){
        super(xPos, yPos, xVel, yVel, width, height);
        this.animator = new Animator(images);


    }


    public getImage() {
        return this.animator.getImage();
    }

    public advance(elapsed: number) {
        this.animator.advance(elapsed);
    }

    public draw(ctx: CanvasRenderingContext2D) {
        ctx.drawImage(
            this.animator.getImage(),
            this.xPos,
            this.yPos,
            this.width,
            this.height
        );
    }
}
