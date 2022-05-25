export default class Situation {
    update(elapsed) {
        return Situation.NOT_DONE;
    }
    render(ctx) {
        this.background.draw(ctx);
        this.props.forEach((prop) => {
            prop.draw(ctx);
        });
        this.player.draw(ctx);
    }
    processInput(canvas) {
        this.player.processInput(canvas, 0, canvas.width);
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
