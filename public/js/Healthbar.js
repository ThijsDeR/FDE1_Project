export default class Healthbar {
    constructor(canvas) {
        this.canvas = canvas;
        console.log("het werkt 1");
    }
    radians(degrees) {
        return degrees * Math.PI / 180;
    }
    ;
    healthbar(ctx) {
        console.log('werkt 2');
        // let canvas = document.getElementById('thecanvas');
        // ctx = this.canvas.getContext('2d');
        //   drawEllipse(10, 10, 100, 60);
        //   drawEllipseByCenter(60,40,20,10);
        let x = 50;
        let y = 50;
        function draw_healthbar(x, y, per, width, thickness) {
            ctx.beginPath();
            ctx.rect(x - width / 2, y, width * (per / 100), thickness);
            if (per > 63) {
                ctx.fillStyle = "green";
            }
            else if (per > 37) {
                ctx.fillStyle = "gold";
            }
            else if (per > 13) {
                ctx.fillStyle = "orange";
            }
            else {
                ctx.fillStyle = "red";
            }
            ctx.closePath();
            ctx.fill();
        }
        let t = 100;
        setInterval(function () {
            ctx.clearRect(0, 0, 400, 400);
            draw_healthbar(200, 200, t--, 100, 10);
        }, 150);
    }
    ;
}
