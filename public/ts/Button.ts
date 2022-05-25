import Game from './Game.js';
import Player from './Player.js';
import KeyListener from './KeyListener.js';
import ImageProp from './Props/ImageProp.js';

export default class Button extends ImageProp {
    private static readonly INCORRECT_PRESS = 0;
    private static readonly CORRECT_PRESS = 1;
    private static readonly NO_PRESS = 2;

    private static readonly ALPHABET_ARRAY: {letter: string, keycode: number, imageUrl: string}[] = [
        {letter: 'A', keycode: KeyListener.KEY_A, imageUrl: './assets/img/objects/a_button.png'},
        {letter: 'W', keycode: KeyListener.KEY_W, imageUrl: './assets/img/objects/w_button.png'},
        {letter: 'S', keycode: KeyListener.KEY_S, imageUrl: './assets/img/objects/s_button.png'},
        {letter: 'D', keycode: KeyListener.KEY_D, imageUrl: './assets/img/objects/d_button.png'},
    ];


    private canvas: HTMLCanvasElement;

    private currentButton: {letter: string, keycode: number, imageUrl: string};

    public constructor(xPos: number, yPos: number, xVel: number, yVel: number, width: number, height: number) {
        const currentButton = Button.ALPHABET_ARRAY[Game.randomInteger(0, Button.ALPHABET_ARRAY.length - 1)];
        // type: string, imgSrc: string, xPos: number, yPos: number
        super(xPos, yPos, xVel, yVel, width, height, currentButton.imageUrl);
        this.currentButton = currentButton;
    }

    public collidesWithCanvasBottom(canvas: HTMLCanvasElement): boolean {
        if (this.yPos + this.image.height > canvas.height) return true;
        return false;
    }



    public checkButton(player: Player) {
            const buttonCheck = this.checkClickButton(player);
            if (buttonCheck === Button.NO_PRESS) return false;
            if (buttonCheck === Button.INCORRECT_PRESS) {
                player.changeStamina(-5)
                return true;
            }
            if (buttonCheck === Button.CORRECT_PRESS) {
                player.changeStamina(20)
                return true;
            }

    }

    private checkClickButton(player: Player): number {
        let incorrect_press = false
        Button.ALPHABET_ARRAY.filter((letter) => letter.letter != this.currentButton!.letter).forEach((letter) => {
            if (player.getKeyListener().isKeyDown(letter.keycode)) incorrect_press = true
        });
        if (incorrect_press) return Button.INCORRECT_PRESS;
        if (player.getKeyListener().isKeyDown(this.currentButton.keycode)) return Button.CORRECT_PRESS;
        return Button.NO_PRESS;

    }
 }

