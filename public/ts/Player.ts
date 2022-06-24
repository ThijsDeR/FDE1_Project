import Game from './Game.js';
import KeyListener from './KeyListener.js';
import AnimatedProp from './Props/AnimatedProp.js';

export default class Player extends AnimatedProp {
  public static readonly MAX_SPEED = 0.6;

  public static readonly MAX_SPEED_X = 0.4;

  public static readonly SPEED_STATIC = 0.15;

  private keyListener: KeyListener;

  private stamina: number;


  /**
   * Construct a new Player instance
   *
   * @param canvas the canvas on which the player should exist
   */
  public constructor(xPos: number, yPos: number, xVel: number, yVel: number, width: number, height: number, stamina: number, skin: BicycleSkin) {
    super(xPos, yPos, xVel, yVel, width, height, [
      { image: Game.loadNewImage(skin.src), duration: 200 },
      { image: Game.loadNewImage(skin.src.replace('1', '2')), duration: 200 },
    ], false)

    this.keyListener = new KeyListener();

    this.stamina = stamina;
  }

  public getKeyListener() {
    return this.keyListener;
  }

  /**
   * Stamina getter
   *
   * @returns stamina
   */
  public getStamina(): number {
    return this.stamina;
  }

  /**
   * Add stamina
   *
   * @param stamina stamina number input
   */


  public changeStamina(stamina: number) {
    if (this.stamina + stamina > 100) {
      this.stamina = 100
    } else {
      this.stamina += stamina;
    }
  }

  /**
   * Sets stamina
   *
   * @param stamina stamina number input
   */
  public setStamina(stamina: number): void {
    this.stamina = stamina;
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
        this.xVel = Player.MAX_SPEED;
      } else if ((this.keyListener.isKeyDown(KeyListener.KEY_LEFT) || this.keyListener.isKeyDown(KeyListener.KEY_A)) && this.xPos > minX) {
        this.xVel = -Player.MAX_SPEED;
      } else this.xVel = 0;
    } else this.xVel = 0;

    if (spacebarPressed) {
      this.yVel = 0
    } else if ((this.keyListener.isKeyDown(KeyListener.KEY_UP) || this.keyListener.isKeyDown(KeyListener.KEY_W))) {
      this.yVel = Player.MAX_SPEED_X;
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
