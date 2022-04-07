import GameLoop from './GameLoop.js';
import Player from './Player.js';
import Staminabar from './Staminabar.js';
import KeyListener from './KeyListener.js';

/**
 * Main class of this Game.
 */
export default class Game {
  // The canvas
  private canvas: HTMLCanvasElement;

  private gameloop: GameLoop;

  private keyListener: KeyListener;

  private ctx: CanvasRenderingContext2D;

  // The player on the canvas
  private player: Player;

  // Score
  private totalScore: number;

  private staminabar: Staminabar;

  private counter: number;

  private arrayAlfabet: string[];

  private imgHeight: number;

  private scrollSpeed: number;

  private checker: boolean;

  /**
   * Construct a new Game
   *
   * @param canvas The canvas HTML element to render on
   */
  public constructor(canvas: HTMLElement) {
    this.canvas = <HTMLCanvasElement>canvas;

    // Resize the canvas so it looks more like a Runner game
    this.canvas.width = 1440;
    this.canvas.height = 1440;

    // Set the player at the center
    this.player = new Player(this.canvas);

    // Score is zero at start
    this.totalScore = 0;

    this.keyListener = new KeyListener();

    this.staminabar = new Staminabar(this.canvas, 700, 100, 500, 20);

    // Start the animation
    this.gameloop = new GameLoop(this);
    this.gameloop.start();
    console.log('werkt!!');

    this.arrayAlfabet = ['a','b','c','d','e'];

    this.counter = 0;
    // the initial image height
    this.imgHeight = 0;

    // the scroll speed
    // an important thing to ensure here is that can.height
    // is divisible by scrollSpeed
    this.scrollSpeed = 6;

    this.checker = false;

  }

  /**
   * Handles any user input that has happened since the last call
   */
  public processInput(): void {
    // Move player
    this.player.move();
  }

  /**
   * Advances the game simulation one step. It may run AI and physics (usually
   * in that order)
   *
   * @param elapsed the time in ms that has been elapsed since the previous
   *   call
   * @returns `true` if the game should stop animation
   */
  public update(elapsed: number): boolean {
    // Spawn a new scoring object every 45 frames

    return false;
  }

  /**
   * Draw the game so the player can see what happened
   */
  public render(): void {
    // Render the items on the canvas
    // Get the canvas rendering context
    const ctx = this.canvas.getContext('2d')!;
    // Clear the entire canvas
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.scrollBackground()

    this.writeTextToCanvas('UP arrow = middle | LEFT arrow = left |  arrow = right', this.canvas.width / 2, 300, 60);

    this.drawScore();

    this.player.draw(ctx);

    this.staminabar.draw(ctx, 100);

    this.counter = this.counter + 1;

    // if(this.counter === 1000) {
    //     console.log('10 seconden');
    // }

    // this.writeTextToCanvas(`Click A`, this.canvas.width / 2, 500, 60)

    if(this.counter > 500 && this.counter < 600) {
        console.log('mom');
        this.writeTextToCanvas(`Click A`, this.canvas.width / 2, 500, 60)

        if (this.keyListener.isKeyDown(KeyListener.KEY_A) && this.checker === false) {
            this.checker = true
            console.log('trots joe');
        }
      }
      
      else {
        this.checker = false;
      }
  }

  /**
   * Draw the score on a canvas
   */
  private drawScore(): void {
    this.writeTextToCanvas(`Score: ${this.totalScore}`, this.canvas.width / 2, 400, 60);
  }

  /**
   * Writes text to the canvas
   *
   * @param text - Text to write
   * @param xCoordinate - Horizontal coordinate in pixels
   * @param yCoordinate - Vertical coordinate in pixels
   * @param fontSize - Font size in pixels
   * @param color - The color of the text
   * @param alignment - Where to align the text
   */
  public writeTextToCanvas(
    text: string,
    xCoordinate: number,
    yCoordinate: number,
    fontSize: number = 20,
    color: string = 'white',
    alignment: CanvasTextAlign = 'center',
  ): void {
    const ctx = this.canvas.getContext('2d')!;
    ctx.font = `${fontSize}px sans-serif`;
    ctx.fillStyle = color;
    ctx.textAlign = alignment;
    ctx.fillText(text, xCoordinate, yCoordinate);
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
  public static randomInteger(min: number, max: number): number {
    return Math.round(Math.random() * (max - min) + min);
  }

  private scrollBackground(){
    // create an image element
    const img = new Image();

    // specify the image source relative to the html or js file
    // when the image is in the same directory as the file
    // only the file name is required:
    img.src = "./assets/img/weg_game_2.png";



    // this is the primary animation loop that is called 60 times
    // per second
    const ctx = this.canvas.getContext('2d')!;

    // draw image 1
    ctx.drawImage(img, 0, this.imgHeight);
    // draw image 2
    ctx.drawImage(img, 0, this.imgHeight - this.canvas.height);

    // update image height
    this.imgHeight += this.scrollSpeed;

    // reseting the images when the first image entirely exits the screen
    if (this.imgHeight == this.canvas.height){
      this.imgHeight = 0;
    }
  }
}
