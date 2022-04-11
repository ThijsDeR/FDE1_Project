import Game from './Game.js';
import Player from './Player.js';
import KeyListener from './KeyListener.js';

export default class Button extends ImageProp {
    private static readonly INCORRECT_PRESS = 0;
    private static readonly CORRECT_PRESS = 1;
    private static readonly NO_PRESS = 2;
    private static readonly NO_BUTTON = 3;

    private static readonly ALPHABET_ARRAY: {letter: string, keycode: number, image: HTMLImageElement}[] = [
        {letter: 'A', keycode: KeyListener.KEY_A, image: Game.loadNewImage('./assets/img/objects/a_button.png')},
        {letter: 'W', keycode: KeyListener.KEY_W, image: Game.loadNewImage('./assets/img/objects/w_button.png')},
        {letter: 'S', keycode: KeyListener.KEY_S, image: Game.loadNewImage('./assets/img/objects/s_button.png')},
        {letter: 'D', keycode: KeyListener.KEY_D, image: Game.loadNewImage('./assets/img/objects/d_button.png')},
    ];

    private counter: number;

    private timeChecker: boolean;

    private arrayAlfabet: {letter: string, keycode: number, image: HTMLImageElement}[];

    private checker: boolean;

    private xPos: number;

    private width: number;

    private yPos: number;

    private canvas: HTMLCanvasElement;

    private speed: number;

    private timeSinceLastbutton: number;

    private currentButton: {letter: string, keycode: number, image: HTMLImageElement};

    public constructor(xPos: number, yPos: number, xVel: number, yVel: number, width: number, height: number) {
        const currentButton = this.arrayAlfabet[Game.randomInteger(0, Button.arrayAlfabet.length - 1)];
        // type: string, imgSrc: string, xPos: number, yPos: number
        super(xPos, yPos, xVel, yVel, width, height, currentButton.image);
        this.currentButton = currentButton;
        this.timeSinceLastbutton = 0;
        this.xPos = (this.canvas.width / 4) * 3;
        this.width = 100;
        this.yPos = -100;
        this.speed = 0.3;
    }

    public collidesWithCanvasBottom(canvas: HtmlCanvasElement): void {
        if (this.yPos + this.currentButton.image.height > canvas.height) return true;
        return false;

    }



    public checkButton(player: Player) {
            const buttonCheck = this.checkClickButton(player);
            if (buttonCheck === Button.NO_PRESS) return false;
            if (buttonCheck === Button.INCORRECT_PRESS) {
                this.player.changeStamina(-5)
                return true;
            }
            if (buttonCheck === Button.CORRECT_PRESS) {
                this.player.changeStamina(20)
            }

    }

    private checkClickButton(player: Player): number {
        if (this.player.getKeyListener().isKeyDown(this.currentButton.keycode)) return Button.CORRECT_PRESS
        let incorrect_press = false
        this.arrayAlfabet.filter((letter) => letter.letter != this.currentButton!.letter).forEach((letter) => {
            if (this.player.getKeyListener().isKeyDown(letter.keycode)) incorrect_press = true
        });

        return incorrect_press ? Button.INCORRECT_PRESS : Button.NO_PRESS;
    }
 }

