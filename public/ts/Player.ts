import Animator from './Animator.js';
import Game from './Game.js';
import KeyListener from './KeyListener.js';
import AnimatedProp from './Props/AnimatedProp.js';
import ImageProp from './Props/ImageProp.js';

export default class Player extends AnimatedProp {
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
    this.xVel = 5;
    this.yVel = 5;
  }

  public getKeyListener() {
    return this.keyListener;
  }
  public getxVelPlayer() {
      return this.xVel;
  }
  public getyVelPlayer() {
    return this.yVel;
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
   public movePlayer(canvas: HTMLCanvasElement): void {
    // Set the limit values
    const minX = 0;
    const maxX = canvas.width - this.width;
    const minY = 0;
    const maxY = canvas.height - this.height;


    // Moving right
    if (this.keyListener.isKeyDown(KeyListener.KEY_RIGHT) || this.keyListener.isKeyDown(KeyListener.KEY_D) && this.xPos < maxX) {
        console.log('move right');
      this.xPos += this.xVel;
      // Limit to the max value
      if (this.xPos > maxX) {
        this.xPos = maxX;
      }
    }

    // Moving left
    if (this.keyListener.isKeyDown(KeyListener.KEY_LEFT) || this.keyListener.isKeyDown(KeyListener.KEY_A) && this.xPos > minX) {
        console.log('move left');
      this.xPos -= this.xVel;
      // Limit to the max value
      if (this.xPos < minX) {
        this.xPos = minX;
      }
    }

    // Moving up
    if (this.keyListener.isKeyDown(KeyListener.KEY_UP) || this.keyListener.isKeyDown(KeyListener.KEY_W) && this.yPos > minY) {
        console.log('move up');
      this.yPos -= this.yVel;
      if (this.yPos < minY) {
        this.yPos = minY;
      }
    }

    if (this.keyListener.isKeyDown(KeyListener.KEY_DOWN) || this.keyListener.isKeyDown(KeyListener.KEY_S) && this.yPos < maxY) {
        console.log("move down");
        this.yPos += this.yVel;
        if (this.yPos > maxY) {
          this.yPos = maxY;
        }
      }
  }

  public update(elapsed: number) {
    this.advance(elapsed);
  }
}
