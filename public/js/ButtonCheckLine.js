export default class ButtonCheckLine {
    constructor(canvas, xPos, yPos, width, height) {
        this.canvas = canvas;
        this.xPos = xPos;
        this.yPos = yPos;
        this.width = width;
        this.height = height;
    }
    getYPos() {
        return this.yPos;
    }
    draw(ctx) {
        // let canvas = document.getElementById('thecanvas');
        // ctx = this.canvas.getContext('2d');
        //   drawEllipse(10, 10, 100, 60);
        //   drawEllipseByCenter(60,40,20,10);
        ctx.beginPath();
        ctx.rect(this.xPos, this.yPos + 100, this.width, this.height);
        ctx.fillStyle = "white";
        ctx.closePath();
        ctx.fill();
    }
    ;
}
