export default class Staminabar {

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

    public draw(ctx: CanvasRenderingContext2D, stamina: number): void{
      // let canvas = document.getElementById('thecanvas');
      // ctx = this.canvas.getContext('2d');

      //   drawEllipse(10, 10, 100, 60);
      //   drawEllipseByCenter(60,40,20,10);
        ctx.beginPath();
        ctx.rect(this.xPos, this.yPos, this.width*(stamina/100), this.height);
        if(stamina > 63){
            ctx.fillStyle="green"
        }else if(stamina > 37){
            ctx.fillStyle="gold"
        }else if(stamina > 13){
          ctx.fillStyle="orange";
        }else{
          ctx.fillStyle="red";
        }
        ctx.closePath();
        ctx.fill();
    };
}
