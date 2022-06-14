import Animator from "../Animator.js";
import ImageProp from "./ImageProp.js";

export default class AnimatedProp extends ImageProp {
    protected animator: Animator;
  


    public constructor(
        xPos: number,
        yPos: number,
        xVel: number,
        yVel: number,
        width: number,
        height: number,
        images: {image: HTMLImageElement, duration: number}[],
        turning: boolean = true
    ){
        super(xPos, yPos, xVel, yVel, width, height, images[0].image.src, turning);
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
