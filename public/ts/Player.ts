import Animator from './Animator.js';
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
      {image: Player.loadNewImage('./assets/img/players/character_robot_walk0.png'), duration: 1000},
      {image: Player.loadNewImage('./assets/img/players/character_maleAdventurer_walk0.png'), duration: 1000},
    ])
    this.positionX = this.canvas.width / 2;
    this.stamina = 100;

    this.width = 100;
    this.height = 100;
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
  public staminaSubstract(stamina: number): void{
      this.stamina = this.stamina - stamina;
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
      this.canvas.height - 150,
    );
  }

  public update(elapsed: number) {
    this.animator.advance(elapsed);
  }

  /**
   * Loads an image in such a way that the screen doesn't constantly flicker
   *
   *
   * NOTE: this is a 'static' method. This means that this method must be called like
   * `Game.loadNewImage()` instead of `this.loadNewImage()`.
   *
   * @param source The address or URL of the a media resource that is to be loaded
   * @returns an HTMLImageElement with the source as its src attribute
   */
  private static loadNewImage(source: string): HTMLImageElement {
    const img = new Image();
    img.src = source;
    return img;
  }
}
