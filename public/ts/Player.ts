import Animator from './Animator.js';
import Game from './Game.js';
import KeyListener from './KeyListener.js';
import AnimatedProp from './Props/AnimatedProp.js';
import ImageProp from './Props/ImageProp.js';
import Trekker from './Trekker.js';

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

    const spacebarPressed = this.keyListener.isKeyDown(KeyListener.KEY_SPACE)
    if (!spacebarPressed) {
      if ((this.keyListener.isKeyDown(KeyListener.KEY_RIGHT) || this.keyListener.isKeyDown(KeyListener.KEY_D)) && this.xPos < maxX) {
        this.xVel = Player.MAX_SPEED;
      } else if ((this.keyListener.isKeyDown(KeyListener.KEY_LEFT) || this.keyListener.isKeyDown(KeyListener.KEY_A)) && this.xPos > 0) {
        this.xVel = -Player.MAX_SPEED;
      } else this.xVel = 0;
    } else this.xVel = 0;


    if ((this.keyListener.isKeyDown(KeyListener.KEY_UP) || this.keyListener.isKeyDown(KeyListener.KEY_W)) && this.yPos > 0) {
      this.yVel = Player.MAX_SPEED_X;
    } else if (spacebarPressed) {
      this.yVel = 0
    }
    else this.yVel = Player.MAX_SPEED / 4;
  }


  public move(elapsed: number) {
    this.xPos += this.xVel * elapsed;
  }

  public collidesWith(yPos: number, xPos: number) {
    if(this.yPos === yPos) {
        return true;
    } else if(this.xPos === xPos) {
        return true;
    } else {
        return false;
    }

  }

  public update(elapsed: number) {
    this.advance(elapsed);
  }
}
