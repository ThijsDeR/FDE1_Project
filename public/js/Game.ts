

export default class Game {
  private canvas: HTMLCanvasElement;

  private ctx: CanvasRenderingContext2D;
  /**
   * The constructor of Game
   *
   * @param canvas the playing field
   */
  public constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d')!;
  }

  /**
   * Method that starts the game.
   */
  public start(): void {
    this.ctx.fillStyle = 'red'
    this.ctx.fillRect(0,0,100,100)
  }

  /**
   * Method that returns the canvas
   *
   * @returns The canvas
   */
  public getCanvas(): HTMLCanvasElement {
    return this.canvas;
  }

  /**
   * Method that loads a new image
   *
   * @param src Source of the image
   * @param width Width of the image
   * @param height Height of the image
   * @returns The new image
   */
  public static loadNewImage(
    src: string,
    width: number | undefined = undefined,
    height: number | undefined = undefined,
  ): HTMLImageElement {
    const img = new Image();
    img.src = src;
    if (width) img.width = width;
    if (height) img.height = height;
    return img;
  }

  /**
   * Generates a random integer number between min and max
   *
   * NOTE: this is a 'static' method. This means that this method must be called like
   * `Game.randomInteger()` instead of `this.randomInteger()`.
   *
   * @param min - minimal time
   * @param max - maximal time
   * @returns a random integer number between min and max
   */
  public static randomNumber(min: number, max: number): number {
    return Math.round(Math.random() * (max - min) + min);
  }
}
