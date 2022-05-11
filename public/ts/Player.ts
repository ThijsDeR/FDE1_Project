import Animator from './Animator.js';
import Game from './Game.js';
import KeyListener from './KeyListener.js';
import AnimatedProp from './Props/AnimatedProp.js';
import ImageProp from './Props/ImageProp.js';

export default class Player extends AnimatedProp {
  public static readonly MAX_SPEED = 2;

  private keyListener: KeyListener;

  private stamina: number;


  /**
   * Construct a new Player instance
   *
   * @param canvas the canvas on which the player should exist
   */
  public constructor(xPos: number, yPos: number, xVel: number, yVel: number, width: number, height: number) {
    super(xPos, yPos, xVel, yVel, width, height, [
      {image: Game.loadNewImage('./assets/img/players/fiets1.png'), duration: 200},
      {image: Game.loadNewImage('./assets/img/players/fiets2.png'), duration: 200},
    ])

    this.keyListener = new KeyListener();

    this.stamina = 100;
  }

  public getKeyListener() {
    return this.keyListener;
  }

  /**
   * Stamina getter
   *
   * @returns stamina
   */
  public getStamina(): number{
    return this.stamina;
  }

  /**
   * Stamina substracter
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
  public setStamina(stamina: number): void{
      this.stamina = stamina;
  }

  /**
   * Moves the player
   */
   public processInput(canvas: HTMLCanvasElement): void {
    // Set the limit values
    const maxX = canvas.width - this.width;
    const maxY = canvas.height - this.height;



    if ((this.keyListener.isKeyDown(KeyListener.KEY_RIGHT) || this.keyListener.isKeyDown(KeyListener.KEY_D)) && this.xPos < maxX) {
      this.xVel = Player.MAX_SPEED;
    } else if ((this.keyListener.isKeyDown(KeyListener.KEY_LEFT) || this.keyListener.isKeyDown(KeyListener.KEY_A)) && this.xPos > 0) {
      this.xVel = -Player.MAX_SPEED;
    } else this.xVel = 0;


    if ((this.keyListener.isKeyDown(KeyListener.KEY_UP) || this.keyListener.isKeyDown(KeyListener.KEY_W)) && this.yPos > 0) {
      this.yVel = Player.MAX_SPEED;
    } else if ((this.keyListener.isKeyDown(KeyListener.KEY_DOWN) || this.keyListener.isKeyDown(KeyListener.KEY_S)) && this.yPos < maxY) {
      this.yVel = -Player.MAX_SPEED;
    } else this.yVel = 0;
  }

  public move(elapsed: number) {
    this.xPos += this.xVel * elapsed;
  }

  public update(elapsed: number) {
    this.advance(elapsed);
  }
}
