import Game from './Game.js';
import KeyListener from './KeyListener.js';
import ImageProp from './Props/ImageProp.js';
export default class SituationButton extends ImageProp {
    constructor(xPos, yPos, xVel, yVel, width, height) {
        const currentButton = SituationButton.ALPHABET_ARRAY[Game.randomInteger(0, SituationButton.ALPHABET_ARRAY.length - 1)];
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
        if (buttonCheck === SituationButton.NO_PRESS)
            return false;
        if (buttonCheck === SituationButton.INCORRECT_PRESS) {
            player.changeStamina(-5);
            return true;
        }
        if (buttonCheck === SituationButton.CORRECT_PRESS) {
            player.changeStamina(20);
            return true;
        }
    }
    checkClickButton(player) {
        let incorrect_press = false;
        SituationButton.ALPHABET_ARRAY.filter((letter) => letter.letter != this.currentButton.letter).forEach((letter) => {
            if (player.getKeyListener().isKeyDown(letter.keycode))
                incorrect_press = true;
        });
        if (incorrect_press)
            return SituationButton.INCORRECT_PRESS;
        if (player.getKeyListener().isKeyDown(this.currentButton.keycode))
            return SituationButton.CORRECT_PRESS;
        return SituationButton.NO_PRESS;
    }
}
SituationButton.INCORRECT_PRESS = 0;
SituationButton.CORRECT_PRESS = 1;
SituationButton.NO_PRESS = 2;
SituationButton.ALPHABET_ARRAY = [
    { letter: 'A', keycode: KeyListener.KEY_A, imageUrl: './assets/img/objects/a_button.png' },
    { letter: 'W', keycode: KeyListener.KEY_W, imageUrl: './assets/img/objects/w_button.png' },
    { letter: 'S', keycode: KeyListener.KEY_S, imageUrl: './assets/img/objects/s_button.png' },
    { letter: 'D', keycode: KeyListener.KEY_D, imageUrl: './assets/img/objects/d_button.png' },
];
