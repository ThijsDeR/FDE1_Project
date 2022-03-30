import GameLoop from './GameLoop.js';
import Player from './Player.js';
import GoldTrophy from './GoldTrophy.js';
import LightningBolt from './LightningBolt.js';
import RedCross from './RedCross.js';
import SilverTrophy from './SilverTrophy.js';
export default class Game {
    canvas;
    gameloop;
    player;
    scoringObjects;
    silverTrophy;
    redCross;
    lightningBolt;
    totalScore;
    constructor(canvas) {
        this.canvas = canvas;
        this.canvas.width = window.innerWidth / 3;
        this.canvas.height = window.innerHeight;
        this.scoringObjects = [];
        this.createRandomScoringObject();
        this.player = new Player(this.canvas);
        this.totalScore = 0;
        console.log('start animation');
        this.gameloop = new GameLoop(this);
        this.gameloop.start();
    }
    processInput() {
        this.player.move();
    }
    update(elapsed) {
        if (this.gameloop.frameCount % 45 === 0) {
            this.createRandomScoringObject();
        }
        this.scoringObjects.forEach((scoringObject) => {
            scoringObject.move(elapsed);
            if (this.player.collidesWith(scoringObject)) {
                this.totalScore += scoringObject.getPoints();
                this.removeItemFromScoringObjects(scoringObject);
            }
            else if (scoringObject.collidesWithCanvasBottom()) {
                this.removeItemFromScoringObjects(scoringObject);
            }
        });
        return false;
    }
    render() {
        const ctx = this.canvas.getContext('2d');
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.writeTextToCanvas('UP arrow = middle | LEFT arrow = left | RIGHT arrow = right', this.canvas.width / 2, 40, 14);
        this.drawScore();
        this.player.draw(ctx);
        this.scoringObjects.forEach((scoringObject) => {
            scoringObject.draw(ctx);
        });
    }
    drawScore() {
        this.writeTextToCanvas(`Score: ${this.totalScore}`, this.canvas.width / 2, 80, 16);
    }
    createRandomScoringObject() {
        const random = Game.randomInteger(1, 4);
        if (random === 1) {
            this.scoringObjects.push(new GoldTrophy(this.canvas));
        }
        if (random === 2) {
            this.scoringObjects.push(new SilverTrophy(this.canvas));
        }
        if (random === 3) {
            this.scoringObjects.push(new RedCross(this.canvas));
        }
        if (random === 4) {
            this.scoringObjects.push(new LightningBolt(this.canvas));
        }
    }
    removeItemFromScoringObjects(item) {
        const index = this.scoringObjects.indexOf(item);
        this.scoringObjects.splice(index, 1);
    }
    writeTextToCanvas(text, xCoordinate, yCoordinate, fontSize = 20, color = 'red', alignment = 'center') {
        const ctx = this.canvas.getContext('2d');
        ctx.font = `${fontSize}px sans-serif`;
        ctx.fillStyle = color;
        ctx.textAlign = alignment;
        ctx.fillText(text, xCoordinate, yCoordinate);
    }
    static randomInteger(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }
}
//# sourceMappingURL=Game.js.map