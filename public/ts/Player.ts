import Animator from './Animator.js';
import Game from './Game.js';
import KeyListener from './KeyListener.js';
import AnimatedProp from './Props/AnimatedProp.js';
import ImageProp from './Props/ImageProp.js';
import LandbouwVoertuig from './Situations/TractorIncoming.js';

export default class Player extends AnimatedProp {
  public static readonly MAX_SPEED = 0.6;

  public static readonly MAX_SPEED_X = 0.4;

  private keyListener: KeyListener;

  private stamina: number;


  /**
   * Construct a new Player instance
   *
   * @param canvas the canvas on which the player should exist
   */
  public constructor(xPos: number, yPos: number, xVel: number, yVel: number, width: number, height: number, stamina: number) {
    super(xPos, yPos, xVel, yVel, width, height, [
      { image: Game.loadNewImage('./assets/img/players/fiets1.png'), duration: 200 },
      { image: Game.loadNewImage('./assets/img/players/fiets2.png'), duration: 200 },
    ])

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
    } else if ((this.keyListener.isKeyDown(KeyListener.KEY_UP) || this.keyListener.isKeyDown(KeyListener.KEY_W)) && this.yPos > 0) {
      this.yVel = Player.MAX_SPEED_X;
    } else this.yVel = Player.MAX_SPEED / 4;
  }

  public isPausing(): boolean {
    if (this.keyListener.isKeyDown(KeyListener.KEY_ESC)) {
      console.log('pause')
      return true;
    } else {
      return false;
    }
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
}
