import Game from './Game.js';
import KeyListener from './KeyListener.js';
export default class Button extends ImageProp {
    constructor(xPos, yPos, xVel, yVel, width, height) {
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
    collidesWithCanvasBottom(canvas) {
        if (this.yPos + this.currentButton.image.height > canvas.height)
            return true;
        return false;
    }
    checkButton(player) {
        const buttonCheck = this.checkClickButton(player);
        if (buttonCheck === Button.NO_PRESS)
            return false;
        if (buttonCheck === Button.INCORRECT_PRESS) {
            this.player.changeStamina(-5);
            return true;
        }
        if (buttonCheck === Button.CORRECT_PRESS) {
            this.player.changeStamina(20);
        }
    }
    checkClickButton(player) {
        if (this.player.getKeyListener().isKeyDown(this.currentButton.keycode))
            return Button.CORRECT_PRESS;
        let incorrect_press = false;
        this.arrayAlfabet.filter((letter) => letter.letter != this.currentButton.letter).forEach((letter) => {
            if (this.player.getKeyListener().isKeyDown(letter.keycode))
                incorrect_press = true;
        });
        return incorrect_press ? Button.INCORRECT_PRESS : Button.NO_PRESS;
    }
}
Button.INCORRECT_PRESS = 0;
Button.CORRECT_PRESS = 1;
Button.NO_PRESS = 2;
Button.NO_BUTTON = 3;
Button.ALPHABET_ARRAY = [
    { letter: 'A', keycode: KeyListener.KEY_A, image: Game.loadNewImage('./assets/img/objects/a_button.png') },
    { letter: 'W', keycode: KeyListener.KEY_W, image: Game.loadNewImage('./assets/img/objects/w_button.png') },
    { letter: 'S', keycode: KeyListener.KEY_S, image: Game.loadNewImage('./assets/img/objects/s_button.png') },
    { letter: 'D', keycode: KeyListener.KEY_D, image: Game.loadNewImage('./assets/img/objects/d_button.png') },
];
