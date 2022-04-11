import Game from './Game.js';
import KeyListener from './KeyListener.js';
export default class Button {
    constructor(canvas, player, keyListener, counter) {
        // type: string, imgSrc: string, xPos: number, yPos: number
        this.canvas = canvas;
        this.player = player;
        this.keyListener = keyListener;
        this.arrayAlfabet = [
            { letter: 'A', keycode: KeyListener.KEY_A, image: Button.loadNewImage('./assets/img/objects/a_button.png') },
            { letter: 'W', keycode: KeyListener.KEY_W, image: Button.loadNewImage('./assets/img/objects/w_button.png') },
            { letter: 'S', keycode: KeyListener.KEY_S, image: Button.loadNewImage('./assets/img/objects/s_button.png') },
            { letter: 'D', keycode: KeyListener.KEY_D, image: Button.loadNewImage('./assets/img/objects/d_button.png') },
        ];
        this.randomNumber = 0;
        this.checker = false;
        this.timeChecker = false;
        this.counter = counter;
        this.currentButton = null;
        this.timeSinceLastbutton = 0;
        this.xPos = (this.canvas.width / 4) * 3;
        this.width = 100;
        this.yPos = -100;
        this.speed = 0.3;
    }
    /**
     * Moves this object
     *
     * @param elapsed the time elapsed in ms since the previous update
     */
    moveButton(elapsed) {
        if (this.currentButton) {
            this.yPos += this.speed * elapsed;
        }
    }
    removeButton() {
        this.currentButton = null;
        this.yPos = 100;
    }
    collidesWithCanvasBottom() {
        if (this.currentButton && this.yPos + this.currentButton.image.height > this.canvas.height) {
            this.removeButton();
        }
    }
    setButton() {
        console.log('set!');
        this.currentButton = this.arrayAlfabet[Game.randomInteger(0, this.arrayAlfabet.length - 1)];
        console.log(this.currentButton.image);
    }
    createButton(elapsed) {
        if (this.timeSinceLastbutton > 1000 && Game.randomInteger(0, 100) === 0 && !this.currentButton) {
            this.setButton();
            this.timeSinceLastbutton = 0;
            console.log('create!');
            return;
        }
        this.timeSinceLastbutton += elapsed;
    }
    checkButton() {
        if (this.currentButton) {
            let substract = 0;
            const buttonCheck = this.checkClickButton();
            console.log(buttonCheck);
            if (buttonCheck === Button.NO_PRESS)
                return;
            else if (buttonCheck === Button.INCORRECT_PRESS) {
                substract = 20;
                this.player.staminaSubstract(substract);
                console.log("you clicked the wrong button -20!");
            }
            console.log("you lost: " + Math.floor(this.timeSinceLastbutton / 80 + substract));
            this.player.staminaSubstract(Math.floor(this.timeSinceLastbutton / 80));
            this.removeButton();
        }
    }
    checkClickButton() {
        if (this.currentButton) {
            if (this.player.getKeyListener().isKeyDown(this.currentButton.keycode))
                return Button.CORRECT_PRESS;
            let incorrect_press = false;
            this.arrayAlfabet.filter((letter) => letter.letter != this.currentButton.letter).forEach((letter) => {
                if (this.player.getKeyListener().isKeyDown(letter.keycode))
                    incorrect_press = true;
            });
            return incorrect_press ? Button.INCORRECT_PRESS : Button.NO_PRESS;
        }
        return Button.NO_BUTTON;
    }
    /**
     * Renders the button
     *
     * @param ctx the rendering context to draw on
     */
    drawButton(ctx) {
        if (this.currentButton) {
            ctx.drawImage(this.currentButton.image, 
            // Center the image in the lane with the x coordinates
            this.xPos, this.yPos);
            Game.writeTextToCanvas(`Click ${this.currentButton.letter}`, this.canvas.width / 2, 500, this.canvas, 60);
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
    static loadNewImage(source) {
        const img = new Image();
        img.src = source;
        return img;
    }
}
Button.INCORRECT_PRESS = 0;
Button.CORRECT_PRESS = 1;
Button.NO_PRESS = 2;
Button.NO_BUTTON = 3;
