import GameLoop from './GameLoop.js';
import Player from './Player.js';
import Staminabar from './Staminabar.js';
import KeyListener from './KeyListener.js';
import Button from './Button.js';

/**
 * Main class of this Game.
 */
export default class Game {
  // The canvas
  private canvas: HTMLCanvasElement;

  private gameloop: GameLoop;

  private keyListener: KeyListener;

  private ctx: CanvasRenderingContext2D;

  private button: Button;

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

  private timeChecker: boolean;

  private randomNumber: number;

  /**
   * Construct a new Game
   *
   * @param canvas The canvas HTML element to render on
   */
  public constructor(canvas: HTMLElement) {
    this.canvas = <HTMLCanvasElement>canvas;

    // Resize the canvas so it looks more like a Runner game
    this.canvas.width = window.innerHeight;
    this.canvas.height = window.innerHeight;

    // Set the player at the center
    this.player = new Player(this.canvas);

    // Score is zero at start
    this.totalScore = 0;

    this.keyListener = new KeyListener();

    this.staminabar = new Staminabar(this.canvas, window.innerWidth / 4, 100, 500, 20);

    // Start the animation
    this.gameloop = new GameLoop(this);
    this.gameloop.start();
    console.log('werkt!!');

    this.counter = 0;
    // the initial image height
    this.imgHeight = 0;

    // the scroll speed
    // an important thing to ensure here is that can.height
    // is divisible by scrollSpeed
    this.scrollSpeed = 6;

    this.checker = false;
    this.timeChecker = false;

    this.randomNumber = 0;

    this.button = new Button(this.canvas, this.player, this.keyListener, this.counter)



  }

  /**
   * Handles any user input that has happened since the last call
   */
  public processInput(): void {
    // Move player
    this.player.move();
    this.button.checkButton();
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
    this.button.createButton(elapsed);
    this.player.update(elapsed);
    // Spawn a new scoring object every 45 frames

    this.button.moveButton(elapsed);
    this.button.collidesWithCanvasBottom();

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

    Game.writeTextToCanvas('UP arrow = middle | LEFT arrow = left |  arrow = right', this.canvas.width / 2, 225, this.canvas, 30);

    Game.writeTextToCanvas('Click A, S, W or D when written', this.canvas.width / 2, 175, this.canvas, 30);

    if (this.counter % 5 === 1 && this.player.getStamina() >= 0) {
    this.totalScore = this.totalScore + 1;
    }

    this.counter = this.counter + 1;

    this.drawScore();

    this.player.draw(ctx);

    this.button.drawButton(ctx);

    if(this.player.getStamina() >= 0) {
    this.player.staminaSubstract(0.025);

    this.staminabar.draw(ctx, this.player.getStamina());
    } else {
        Game.writeTextToCanvas('Game Over!', this.canvas.width / 2, 275, this.canvas, 40);
    }

    // this.counter = this.counter + 1;

    // if(this.counter % 100 === 1 && this.timeChecker === true) {
    //     this.timeChecker = false;
    // }

    // if(Game.randomInteger(0,500) === 20 && this.player.getStamina() >= 0) {
    //     this.timeChecker = true;
    // }

    // if(this.timeChecker === true && this.player.getStamina() >= 0) {
    //     Game.writeTextToCanvas(`Click ${this.arrayAlfabet[this.randomNumber]}`, this.canvas.width / 2, 500, 60)

    //     if (this.randomNumber === 0 && this.keyListener.isKeyDown(KeyListener.KEY_A) && this.checker === false) {
    //         this.checker = true
    //         console.log('trots joe A');
    //         if (this.player.getStamina() >= 0) {
    //             this.player.staminaSubstract(-20);
    //         }
    //     } else if (this.randomNumber === 1 && this.keyListener.isKeyDown(KeyListener.KEY_S) && this.checker === false) {
    //         this.checker = true
    //         console.log('trots joe S');
    //         if (this.player.getStamina() >= 0) {
    //             this.player.staminaSubstract(-20);
    //         }
    //     } else if (this.randomNumber === 2 && this.keyListener.isKeyDown(KeyListener.KEY_D) && this.checker === false) {
    //         this.checker = true
    //         console.log('trots joe D');
    //         if (this.player.getStamina() >= 0) {
    //             this.player.staminaSubstract(-20);
    //         }
    //     } else if (this.randomNumber === 3 && this.keyListener.isKeyDown(KeyListener.KEY_W) && this.checker === false) {
    //         this.checker = true
    //         console.log('trots joe W');
    //         if (this.player.getStamina() >= 0) {
    //             this.player.staminaSubstract(-20);
    //         }
    //     }
    // }
    // else {
    //     this.checker = false;
    //     this.randomNumber = Game.randomInteger(0,3);
    //   }
  }

  /**
   * Draw the score on a canvas
   */
  private drawScore(): void {
    Game.writeTextToCanvas(`Score: ${this.totalScore}`, this.canvas.width / 2, 325, this.canvas, 40);
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
  public static writeTextToCanvas(
    text: string,
    xCoordinate: number,
    yCoordinate: number,
    canvas: HTMLCanvasElement,
    fontSize: number = 20,
    color: string = 'white',
    alignment: CanvasTextAlign = 'center',
  ): void {
    const ctx = canvas.getContext('2d')!;
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
    const img = new Image(this.canvas.width, this.canvas.height);

    // specify the image source relative to the html or js file
    // when the image is in the same directory as the file
    // only the file name is required:
    img.src = "./assets/img/weg_game_2.png";
    img.classList.add("backgroundImage");



    // this is the primary animation loop that is called 60 times
    // per second
    const ctx = this.canvas.getContext('2d')!;

   // draw image 1
    ctx.drawImage(img, 0, this.imgHeight, this.canvas.width, this.canvas.height);
    // draw image 2
    ctx.drawImage(img, 0, this.imgHeight - this.canvas.height, this.canvas.width, this.canvas.height);
    // update image height
    this.imgHeight += this.scrollSpeed;

    // reseting the images when the first image entirely exits the screen
    if (this.imgHeight > this.canvas.height){
      this.imgHeight = 0;
    }
  }
}
