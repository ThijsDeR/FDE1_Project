/**
 * Represents a basic Game Loop based on `requestAnimationFrame()`.
 *
 * The implementation of this class depends on another class: `Game`. This
 * means that, if you use this class, you need to either have a `Game` class
 * that exactly implements the three methods `processInput()`, `update(elapsed)`
 * and `render()` or change the code in the `step()` method of this class so it
 * represents your own game methods.
 *
 * @see https://gameprogrammingpatterns.com/game-loop.html
 * @author BugSlayer
 */
export default class GameLoop {
    /**
     * Construct a new instance of this class.
     *
     * @param game the game to animate
     * @param mode OPTIONAL, the mode of the gameloop. It defaults to
     *   GameLoop.NORMAL_MODE, which is fine for simple games
     */
    constructor(game, mode = GameLoop.NORMAL_MODE) {
        /**
         * This MUST be an arrow method in order to keep the `this` variable working
         * correctly. It will be overwritten by another object otherwise caused by
         * javascript scoping behaviour.
         *
         * @param timestamp a `DOMHighResTimeStamp` similar to the one returned by
         *   `performance.now()`, indicating the point in time when `requestAnimationFrame()`
         *   starts to execute callback functions
         */
        this.step = (timestamp) => {
            // Handle first animation frame
            if (this.isInState(GameLoop.STATE_STARTING)) {
                this.state = GameLoop.STATE_RUNNING;
            }
            this.game.processInput();
            // Let the game update itself
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
            // Let the game render itself
            this.game.render();
            // Check if a next animation frame needs to be requested
            if (!shouldStop || this.isInState(GameLoop.STATE_STOPPING)) {
                requestAnimationFrame(this.step);
            }
            else {
                this.state = GameLoop.STATE_IDLE;
            }
            // Handle time measurement and analysis
            const now = performance.now();
            const stepTime = timestamp - now;
            const frameTime = now - this.frameEnd;
            this.fps = Math.round(1000 / frameTime);
            this.load = stepTime / frameTime;
            this.frameEnd = now;
            this.gameTime = now - this.gameStart;
            this.frameCount += 1;
        };
        this.state = GameLoop.STATE_IDLE;
        this.mode = mode;
        this.game = game;
    }
    /**
     * Start the game loop.
     */
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
    /**
     * Requests to gracefully stop the gameloop.
     */
    stop() {
        this.state = GameLoop.STATE_STOPPING;
    }
    /**
     * Returns `true` if the given state exactly matches the current state of
     * this object
     *
     * @param state the state to check
     * @returns `true` if the given state exactly matches the current state of
     *   this object
     */
    isInState(state) {
        return this.state === state;
    }
}
GameLoop.STATE_IDLE = 0;
GameLoop.STATE_STARTING = 1;
GameLoop.STATE_RUNNING = 2;
GameLoop.STATE_STOPPING = 3;
GameLoop.NORMAL_MODE = 0;
GameLoop.PLAY_CATCH_UP = 1;
