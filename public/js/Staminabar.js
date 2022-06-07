import Game from "./Game.js";
export default class Staminabar {
    constructor(xPos, yPos, width, height) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.width = width;
        this.height = height;
    }
    draw(ctx, stamina) {
        // let canvas = document.getElementById('thecanvas');
        // ctx = this.canvas.getContext('2d');
        //   drawEllipse(10, 10, 100, 60);
        //   drawEllipseByCenter(60,40,20,10);
        ctx.beginPath();
        ctx.rect(this.xPos - (this.width * (stamina / 100) / 2), this.yPos, this.width * (stamina / 100), this.height);
        if (stamina > 63) {
            ctx.fillStyle = "green";
        }
        else if (stamina > 37) {
            ctx.fillStyle = "gold";
        }
        else if (stamina > 13) {
            ctx.fillStyle = "orange";
        }
        else {
            ctx.fillStyle = "red";
        }
        ctx.closePath();
        ctx.fill();
        Game.writeTextToCanvas(ctx, 'Stamina:', this.xPos, this.yPos, 30, undefined, undefined, 'bottom');
    }
    ;
}
