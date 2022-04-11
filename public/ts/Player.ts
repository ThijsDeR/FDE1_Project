import Animator from './Animator.js';
import Game from './Game.js';
import KeyListener from './KeyListener.js';

export default class Player {
  private canvas: HTMLCanvasElement;

  private leftLane: number;

  private middleLane: number;

  private rightLane: number;

  private keyListener: KeyListener;

  private positionX: number;

  private value: number;

  private stamina: number;

  private animator: Animator;

  private width: number;

  private height: number;

  /**
   * Construct a new Player instance
   *
   * @param canvas the canvas on which the player should exist
   */
  public constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;

    this.leftLane = this.canvas.width / 4;
    this.middleLane = this.canvas.width / 2;
    this.rightLane = (this.canvas.width / 4) * 3;

    this.keyListener = new KeyListener();

    this.animator = new Animator([
      {image: Game.loadNewImage('./assets/img/players/fiets1.png'), duration: 200},
      {image: Game.loadNewImage('./assets/img/players/fiets2.png'), duration: 200},
    ])
    this.positionX = this.canvas.height / 2;
    this.stamina = 100;

    this.width = 100;
    this.height = 100;
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
    this.stamina += stamina;
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
  public move(): void {
    if (this.keyListener.isKeyDown(KeyListener.KEY_LEFT) && this.positionX !== this.leftLane) {
      this.positionX = this.leftLane;
    }
    if (this.keyListener.isKeyDown(KeyListener.KEY_UP) && this.positionX !== this.middleLane) {
      this.positionX = this.middleLane;
    }
    if (this.keyListener.isKeyDown(KeyListener.KEY_RIGHT) && this.positionX !== this.rightLane) {
      this.positionX = this.rightLane;
    }
  }

  /**
   * Renders the player
   *
   * @param ctx the rendering context to draw on
   */
  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.drawImage(
      this.animator.getImage(),
      // Center the image in the lane with the x coordinates
      this.positionX - this.animator.getImage().width / 2,
      this.canvas.height - 300,
    );
  }

  public update(elapsed: number) {
    this.animator.advance(elapsed);
  }
}
