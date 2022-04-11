import Game from "../Game.js";
import Prop from "./Prop.js";

export default class ImageProp extends Prop {
    protected image: HTMLImageElement;

    public constructor(xPos: number, yPos: number, xVel: number, yVel: number, width: number, height: number, imageUrl: string){
        super(xPos, yPos, xVel, yVel, width, height);
        this.image = Game.loadNewImage(imageUrl);
    }


    public getImage() {
        return this.image;
    }

    public draw(ctx: CanvasRenderingContext2D) {
        ctx.drawImage(
            this.image,
            // Center the image in the lane with the x coordinates
            this.xPos,
            this.yPos,
          );
    }
}
