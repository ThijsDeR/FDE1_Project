export default class ButtonCheckLine {

    private canvas: HTMLCanvasElement;

    private xPos: number;

    private yPos: number;

    private width: number;

    private height: number;

    public constructor(canvas: HTMLCanvasElement, xPos: number, yPos: number, width: number, height: number) {
        this.canvas = canvas;
        this.xPos = xPos;
        this.yPos = yPos;
        this.width = width;
        this.height = height;
    }

    public getYPos(): number{
        return this.yPos;
    }

    public draw(ctx: CanvasRenderingContext2D): void{
      // let canvas = document.getElementById('thecanvas');
      // ctx = this.canvas.getContext('2d');

      //   drawEllipse(10, 10, 100, 60);
      //   drawEllipseByCenter(60,40,20,10);
        ctx.beginPath();
        ctx.rect(this.xPos, this.yPos + 100, this.width, this.height);
        ctx.fillStyle="white";
        ctx.closePath();
        ctx.fill();
    };
}
