import Game from './Game.js';
import KeyListener from './KeyListener.js';
import ImageProp from './Props/ImageProp.js';
export default class Button extends ImageProp {
    constructor(xPos, yPos, xVel, yVel, width, height) {
        const currentButton = Button.ALPHABET_ARRAY[Game.randomInteger(0, Button.ALPHABET_ARRAY.length - 1)];
        // type: string, imgSrc: string, xPos: number, yPos: number
        super(xPos, yPos, xVel, yVel, width, height, currentButton.imageUrl);
        this.currentButton = currentButton;
    }
    collidesWithCanvasBottom(canvas) {
        if (this.yPos + this.image.height > canvas.height)
            return true;
        return false;
    }
    checkButton(player) {
        const buttonCheck = this.checkClickButton(player);
        if (buttonCheck === Button.NO_PRESS)
            return false;
        if (buttonCheck === Button.INCORRECT_PRESS) {
            player.changeStamina(-5);
            return true;
        }
        if (buttonCheck === Button.CORRECT_PRESS) {
            player.changeStamina(20);
            return true;
        }
    }
    checkClickButton(player) {
        let incorrect_press = false;
        Button.ALPHABET_ARRAY.filter((letter) => letter.letter != this.currentButton.letter).forEach((letter) => {
            if (player.getKeyListener().isKeyDown(letter.keycode))
                incorrect_press = true;
        });
        if (incorrect_press)
            return Button.INCORRECT_PRESS;
        if (player.getKeyListener().isKeyDown(this.currentButton.keycode))
            return Button.CORRECT_PRESS;
        return Button.NO_PRESS;
    }
}
Button.INCORRECT_PRESS = 0;
Button.CORRECT_PRESS = 1;
Button.NO_PRESS = 2;
Button.ALPHABET_ARRAY = [
    { letter: 'A', keycode: KeyListener.KEY_A, imageUrl: './assets/img/objects/a_button.png' },
    { letter: 'W', keycode: KeyListener.KEY_W, imageUrl: './assets/img/objects/w_button.png' },
    { letter: 'S', keycode: KeyListener.KEY_S, imageUrl: './assets/img/objects/s_button.png' },
    { letter: 'D', keycode: KeyListener.KEY_D, imageUrl: './assets/img/objects/d_button.png' },
];
