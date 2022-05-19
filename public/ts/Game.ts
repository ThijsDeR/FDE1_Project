import GameLoop from './GameLoop.js';
import Staminabar from './Staminabar.js';
import UserData from './UserData.js';
import CyclingPathIncomingTraffic from './CyclingPathIncomingTraffic.js';
import Crossroad from './Crossroad.js';
import Situation from './Situation.js';

/**
 * Main class of this Game.
 */
export default class Game {
  // The canvas
  private canvas: HTMLCanvasElement;

  private userData: UserData;

  private gameloop: GameLoop;

  private situation: Situation;

  // Score
  private totalScore: number;

  private staminabar: Staminabar;

  private imgHeight: number;

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
    this.userData = new UserData()
    // Score is zero at start
    this.totalScore = 0;

    this.staminabar = new Staminabar(this.canvas.width / 6, 300, this.canvas.width / 3, 20);

    // Start the animation
    this.gameloop = new GameLoop(this);
    this.gameloop.start();
    // the initial image height
    this.imgHeight = 0;

    // the scroll speed
    // an important thing to ensure here is that can.height
    // is divisible by scrollSpeed
    this.gameOver = false;

    this.situation = this.newSituation(100)



  }

  private newSituation(stamina: number): Situation {
    switch(Game.randomInteger(0, 1)) {
      case 0:
        return new CyclingPathIncomingTraffic(this.canvas, stamina)
      case 1:
        return new Crossroad(this.canvas, stamina)
      default:
        return new Crossroad(this.canvas, stamina)
      
    }
  }

  /**
   * Handles any user input that has happened since the last call
   */
  public processInput(): void {
    // Move player
    this.situation.processInput(this.canvas)
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
    if (this.gameOver) return false;

    this.totalScore += this.situation.getPlayerYVel()
    // Spawn a new scoring object every 45 frames

    this.scrollBackground(elapsed);

    const result = this.situation.update(elapsed);
    if (result === Situation.GAME_OVER) {
      this.userData.changeHighScore(this.totalScore);
      this.gameOver = true;
    }
    if (result === Situation.FINISHED) this.situation = this.newSituation(this.situation.getPlayerStamina())

    // if (this.situation) {
    //   this.situation.update(elapsed)
    //   this.situation.move(elapsed)
    //   this.situation.scroll(elapsed, this.scrollSpeed)
    //   if (this.situation.isDone()) this.situation = null;
    // }


    // if (this.counter % 2000 === 1) {
    //   this.newSituation();
    // }
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
    ctx.fillStyle = `black`;
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

     // create an image element
     const img = new Image(this.canvas.height, this.canvas.height);

     // specify the image source relative to the html or js file
     // when the image is in the same directory as the file
     // only the file name is required:
     img.src = "./assets/img/weg_game_2.png";
     img.classList.add("backgroundImage");
 
     // draw image 1
     ctx.drawImage(img, this.canvas.width / 3 , this.imgHeight, this.canvas.width / 3, this.canvas.height);
     // draw image 2
     ctx.drawImage(img, this.canvas.width / 3 , this.imgHeight - this.canvas.height, this.canvas.width / 3, this.canvas.height);  

    // if (this.situation) {
    //   this.situation.draw(ctx)
    // }

    this.situation.render(ctx)

    this.drawScore();

    this.staminabar.draw(ctx, this.situation.getPlayerStamina())

    if (this.gameOver) {
      Game.writeTextToCanvas('Game Over!', this.canvas.width / 2, 275, this.canvas.getContext('2d')!, 40);
    }
    
  }

  /**
   * Draw the score on a canvas
   */
  private drawScore(): void {
    Game.writeTextToCanvas(`Score: ${Math.round(this.totalScore)}`, this.canvas.width / 6, 200, this.canvas.getContext('2d')!, 30);
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
    ctx: CanvasRenderingContext2D,
    fontSize: number = 20,
    color: string = 'white',
    alignment: CanvasTextAlign = 'center',
  ): void {
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

  private scrollBackground(elapsed: number){
    this.imgHeight += this.situation.getPlayerYVel() * elapsed;


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
