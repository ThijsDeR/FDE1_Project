import Game from "../Game.js";
import Prop from "./Prop.js";

export default class ImageProp extends Prop {
    protected image: HTMLImageElement;

    protected direction: string;

    protected type: 'normal' | 'turning';

    public constructor(xPos: number, yPos: number, xVel: number, yVel: number, width: number, height: number, imageUrl: string){
        super(xPos, yPos, xVel, yVel, width, height);
        this.image = Game.loadNewImage(imageUrl);
    }


    public getImage() {
        return this.image;
    }


    public draw(ctx: CanvasRenderingContext2D, offsetX: number = 0, offsetY: number = 0) {
        // ctx.drawImage(
        //     this.image,
        //     this.xPos,
        //     this.yPos,
        //     this.width,
        //     this.height
        //   );

        const degToRad = (deg: number) => deg * Math.PI / 180;

        ctx.save();
        ctx.translate(this.xPos + offsetX + (this.width / 2), this.yPos + offsetY + (this.height / 2));
        ctx.rotate(degToRad(this.calculateDirection()))
        ctx.drawImage(
            this.image,
            -(this.width / 2),
            -(this.height / 2),
            this.width,
            this.height
        );
        ctx.restore();

    }

    private calculateDirection() {
        const degrees = Math.atan2(this.yVel, this.xVel)
        if (this.xVel === 0 && this.yVel === 0) return 0;
        else return (degrees * (180 / Math.PI)) + 90
    }
}
