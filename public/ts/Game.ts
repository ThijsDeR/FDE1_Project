import GameLoop from './GameLoop.js';
import Player from './Player.js';
import Staminabar from './Staminabar.js';
import KeyListener from './KeyListener.js';
import Button from './Button.js';
import UserData from './UserData.js';

/**
 * Main class of this Game.
 */
export default class Game {
  // The canvas
  private canvas: HTMLCanvasElement;

  private userData: UserData;

  private gameloop: GameLoop;

  private buttons: Button[];

  // The player on the canvas
  private player: Player;

  // Score
  private totalScore: number;

  private staminabar: Staminabar;

  private counter: number;

  private imgHeight: number;

  private scrollSpeed: number;

  private gameOver: boolean;

  /**
   * Construct a new Game
   *
   * @param canvas The canvas HTML element to render on
   */
  public constructor(canvas: HTMLElement) {
    this.canvas = <HTMLCanvasElement>canvas;

    // Resize the canvas so it looks more like a Runner game
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    // Set the player at the center
    this.player = new Player(this.canvas.width / 2 + 25, this.canvas.height * (3/4), 0, 0, this.canvas.width / 8, this.canvas.height / 4);

    this.userData = new UserData()
    // Score is zero at start
    this.totalScore = 0;

    this.staminabar = new Staminabar(this.canvas, 530, 100, this.canvas.width / 3, 20);

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

    this.gameOver = false;

    this.buttons = []



  }

  /**
   * Handles any user input that has happened since the last call
   */
  public processInput(): void {
    // Move player
    this.player.movePlayer(this.canvas);
    this.buttons.forEach((button, buttonIndex) => {
      if(button.checkButton(this.player)) {
        this.buttons.splice(buttonIndex, 1)
      }
    });
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
    this.player.update(elapsed);
    // Spawn a new scoring object every 45 frames

    this.buttons.forEach((button, buttonIndex) => {
      button.move(elapsed)
      if (button.collidesWithCanvasBottom(this.canvas)) {
        this.buttons.splice(buttonIndex, 1)
        this.player.changeStamina(-10)
      }
    });

    if (this.counter % 500 === 1) {
      this.buttons.push(new Button(
        (this.canvas.width / 4 ) * 3,
        0,
        0,
        0.5,
        100,
        100,
      ))
    }
    return false;
  }

  /**
   * Draw the game so the player can see what happened
   */
  public render(): void {
    if (this.gameOver) return;
    // Render the items on the canvas
    // Get the canvas rendering context
    const ctx = this.canvas.getContext('2d')!;
    // Clear the entire canvas
    ctx.fillStyle = `black`;
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.scrollBackground()


    Game.writeTextToCanvas('Klik op A, S, W of D wanneer ze verschijnen', this.canvas.width / 2, 175, this.canvas, 30);

    if (this.counter % 5 === 1) {
      this.totalScore = this.totalScore + 1;
    }

    this.counter += 1;

    this.drawScore();

    this.player.draw(ctx);

    this.buttons.forEach((button) => {
      button.draw(ctx)
    });

    if(this.player.getStamina() >= 0) {
      this.player.changeStamina(-0.025);
      this.staminabar.draw(ctx, this.player.getStamina());
    } else {
        Game.writeTextToCanvas('Game Over!', this.canvas.width / 2, 275, this.canvas, 40);
        this.userData.changeHighScore(this.totalScore);
        this.gameOver = true
    }
  }

  /**
   * Draw the score on a canvas
   */
  private drawScore(): void {
    Game.writeTextToCanvas(`Score: ${this.totalScore}`, this.canvas.width / 6, 200, this.canvas, 30);
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
    const img = new Image(this.canvas.height, this.canvas.height);

    // specify the image source relative to the html or js file
    // when the image is in the same directory as the file
    // only the file name is required:
    img.src = "./assets/img/weg_game_2.png";
    img.classList.add("backgroundImage");



    // this is the primary animation loop that is called 60 times
    // per second
    const ctx = this.canvas.getContext('2d')!;

   // draw image 1
    ctx.drawImage(img, 530 , this.imgHeight, this.canvas.width / 3, this.canvas.height);
    // draw image 2
    ctx.drawImage(img, 530 , this.imgHeight - this.canvas.height, this.canvas.width / 3, this.canvas.height);
    // update image height
    this.imgHeight += this.scrollSpeed;

    // reseting the images when the first image entirely exits the screen
    if (this.imgHeight > this.canvas.height){
      this.imgHeight = 0;
    }
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
   public static loadNewImage(source: string): HTMLImageElement {
    const img = new Image();
    img.src = source;
    return img;
  }
}
;
