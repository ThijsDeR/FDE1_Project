export default class GameLoop {
    static STATE_IDLE = 0;
    static STATE_STARTING = 1;
    static STATE_RUNNING = 2;
    static STATE_STOPPING = 3;
    static NORMAL_MODE = 0;
    static PLAY_CATCH_UP = 1;
    mode;
    state;
    game;
    previousElapsed;
    gameStart;
    frameEnd;
    gameTime;
    frameCount;
    fps;
    load;
    constructor(game, mode = GameLoop.NORMAL_MODE) {
        this.state = GameLoop.STATE_IDLE;
        this.mode = mode;
        this.game = game;
    }
    start() {
        if (this.state === GameLoop.STATE_IDLE) {
            this.state = GameLoop.STATE_STARTING;
            this.gameStart = performance.now();
            this.frameEnd = this.gameStart;
            this.previousElapsed = this.gameStart;
            this.gameTime = 0;
            this.frameCount = 0;
            requestAnimationFrame(this.step);
        }
    }
    stop() {
        this.state = GameLoop.STATE_STOPPING;
    }
    isInState(state) {
        return this.state === state;
    }
    step = (timestamp) => {
        if (this.isInState(GameLoop.STATE_STARTING)) {
            this.state = GameLoop.STATE_RUNNING;
        }
        this.game.processInput();
        let shouldStop = false;
        if (this.mode === GameLoop.PLAY_CATCH_UP) {
            const step = 1;
            while (this.previousElapsed < timestamp && !shouldStop) {
                shouldStop = this.game.update(step);
                this.previousElapsed += step;
            }
        }
        else {
            const elapsed = timestamp - this.previousElapsed;
            shouldStop = this.game.update(elapsed);
            this.previousElapsed = timestamp;
        }
        this.game.render();
        if (!shouldStop || this.isInState(GameLoop.STATE_STOPPING)) {
            requestAnimationFrame(this.step);
        }
        else {
            this.state = GameLoop.STATE_IDLE;
        }
        const now = performance.now();
        const stepTime = timestamp - now;
        const frameTime = now - this.frameEnd;
        this.fps = Math.round(1000 / frameTime);
        this.load = stepTime / frameTime;
        this.frameEnd = now;
        this.gameTime = now - this.gameStart;
        this.frameCount += 1;
    };
}
//# sourceMappingURL=GameLoop.js.map