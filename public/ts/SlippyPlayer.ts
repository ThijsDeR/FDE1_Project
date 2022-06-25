import Player from "./Player.js";
import Game from './Game.js';
import KeyListener from './KeyListener.js';

export default class SlippyPlayer extends Player{
 
  /**
   * Construct a new Player instance
   *
   * @param canvas the canvas on which the player should exist
   */
  public constructor(xPos: number, yPos: number, xVel: number, yVel: number, width: number, height: number, stamina: number, skin: BicycleSkin) {
    super(xPos, yPos, xVel, yVel, width, height, stamina, skin)
  }

  public getKeyListener() {
    return this.keyListener;
  }

  
  /**
   * Moves the player
   */
  public processInput(canvas: HTMLCanvasElement, minX: number, maxX: number): void {
    // Set the limit values
    const maximX = maxX - this.width;
    const spacebarPressed = this.keyListener.isKeyDown(KeyListener.KEY_SPACE)
    if (!spacebarPressed) {
      if ((this.keyListener.isKeyDown(KeyListener.KEY_RIGHT) || this.keyListener.isKeyDown(KeyListener.KEY_D)) && this.xPos < maximX) {
        this.xVel = Player.MAX_SPEED/(Game.randomInteger(1, 8));
      } else if ((this.keyListener.isKeyDown(KeyListener.KEY_LEFT) || this.keyListener.isKeyDown(KeyListener.KEY_A)) && this.xPos > minX) {
        this.xVel = -Player.MAX_SPEED/(Game.randomInteger(1, 8));
      } else this.xVel = Game.randomInteger(-2, 2)/10;
    } else this.xVel = Game.randomInteger(-2, 2)/10;

    if (spacebarPressed) {
      this.yVel = Player.SPEED_STATIC;
      this.xVel = (Game.randomInteger(-2, 1)/10);
    } else if ((this.keyListener.isKeyDown(KeyListener.KEY_UP) || this.keyListener.isKeyDown(KeyListener.KEY_W))) {
      this.yVel = Player.MAX_SPEED_X;
      this.xVel = (Game.randomInteger(-3, 2)/10);
    } else this.yVel = Player.SPEED_STATIC;
  }

  public move(elapsed: number) {
    this.xPos += this.xVel * elapsed;
  }

  public update(elapsed: number) {
    super.update(elapsed)
    this.advance(elapsed);
  }

  public isStopped() {
    return this.keyListener.isKeyDown(KeyListener.KEY_SPACE);
  }

  public isPausing() {
    return this.keyListener.isKeyDown(KeyListener.KEY_ESC);
  }
}