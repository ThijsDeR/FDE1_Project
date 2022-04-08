import Game from './Game.js';
import Player from './Player.js';
import KeyListener from './KeyListener.js';

export default class Button {
    private static readonly INCORRECT_PRESS = 0;
    private static readonly CORRECT_PRESS = 1;
    private static readonly NO_PRESS = 2;
    private static readonly NO_BUTTON = 3;

    private counter: number;

    private timeChecker: boolean;

    private arrayAlfabet: {letter: string, keycode: number}[];

    private checker: boolean;

    private randomNumber: number;

    private keyListener: KeyListener;

    private player: Player;

    private canvas: HTMLCanvasElement;



    private timeSinceLastbutton: number;

    private currentButton: {letter: string, keycode: number} | null;

    public constructor(canvas: HTMLCanvasElement, player: Player, keyListener: KeyListener, counter: number) {
        // type: string, imgSrc: string, xPos: number, yPos: number
        this.canvas = canvas;
        this.player = player;
        this.keyListener = keyListener;
        this.arrayAlfabet = [
            {letter: 'A', keycode: KeyListener.KEY_A},
            {letter: 'W', keycode: KeyListener.KEY_W},
            {letter: 'S', keycode: KeyListener.KEY_S},
            {letter: 'D', keycode: KeyListener.KEY_D},
        ]
        this.randomNumber = 0;
        this.checker = false;
        this.timeChecker = false;
        this.counter = counter;
        this.currentButton = null
        this.timeSinceLastbutton = 0;
    }

    // if(this.type = 'click A') {

    // }

    private setButton() {
        this.currentButton = this.arrayAlfabet[Game.randomInteger(0, this.arrayAlfabet.length - 1)];
    }

    public createButton(elapsed: number): void {
        if (this.timeSinceLastbutton > 1000 && Game.randomInteger(0, 100) === 0 && !this.currentButton) {
            this.setButton()
            this.timeSinceLastbutton = 0
            return;
        }
        this.timeSinceLastbutton += elapsed;
    }

    public checkButton() {
        if (this.currentButton) {

            const buttonCheck = this.checkClickButton();
            console.log(buttonCheck);
            if (buttonCheck === Button.NO_PRESS) return;
            else if (buttonCheck === Button.INCORRECT_PRESS) {
                this.player.staminaSubstract(20)
                console.log("you clicked the wrong button")
            }
            console.log("you lost: " + Math.floor(this.timeSinceLastbutton / 50))
            this.player.staminaSubstract(Math.floor(this.timeSinceLastbutton / 50))
            this.currentButton = null
        }
    }

    private checkClickButton(): number {
        if (this.currentButton) {
            if (this.player.getKeyListener().isKeyDown(this.currentButton.keycode)) return Button.CORRECT_PRESS
            let incorrect_press = false
            this.arrayAlfabet.filter((letter) => letter.letter != this.currentButton!.letter).forEach((letter) => {
                if (this.player.getKeyListener().isKeyDown(letter.keycode)) incorrect_press = true
            });

            return incorrect_press ? Button.INCORRECT_PRESS : Button.NO_PRESS;
        }

        return Button.NO_BUTTON;
    }

    public drawButton() {
        if (this.currentButton) {
            Game.writeTextToCanvas(`Click ${this.currentButton.letter}`, this.canvas.width / 2, 500, this.canvas, 60)
        }
    }
 }

