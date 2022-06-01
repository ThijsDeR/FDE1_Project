import Scene from "./Scene.js";
export default class Situation extends Scene {
    constructor(canvas, userData, upgrades) {
        super(canvas, userData);
        this.upgrades = upgrades;
    }
    render() {
        this.background.draw(this.ctx);
        this.props.forEach((prop) => {
            prop.draw(this.ctx);
        });
        this.player.draw(this.ctx);
    }
    processInput() {
        this.player.processInput(this.canvas, 0, this.canvas.width);
    }
    getPlayerYVel() {
        return this.player.getYVel();
    }
    getPlayerStamina() {
        return this.player.getStamina();
    }
}
Situation.NOT_DONE = 0;
Situation.GAME_OVER = 1;
Situation.FINISHED = 2;
