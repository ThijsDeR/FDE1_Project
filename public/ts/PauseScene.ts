import CutScene from "./CutScene.js";
import Game from "./Game.js";
import Button from "./Props/Button.js";
import Prop from "./Props/Prop.js";
import Scene from "./Scene.js";
import Situation from "./Situation.js";
import UserData from "./UserData.js";

export default class PauseScene extends CutScene {
    
    private props: Button[];

    private paused: boolean;

    private clickSound: HTMLAudioElement;

    public constructor(canvas: HTMLCanvasElement, userData: UserData) {
        super(canvas, userData)

        const buttonWidth = (this.canvas.width / 4);
        const buttonHeight = (this.canvas.height / 6);
        const betweenButtonHeight = (this.canvas.height / 10);

        this.clickSound = new Audio('./audio/UI_click.wav');
        this.paused = true; 

        this.props = [
            new Button((this.canvas.width / 2) - (buttonWidth / 2), (buttonHeight + betweenButtonHeight), buttonWidth, buttonHeight, 'white', 'black', 'lightgray', 'Doorgaan', this.canvas.height / 20, 'fill','continue'),
            new Button((this.canvas.width / 2) - (buttonWidth / 2), (buttonHeight + betweenButtonHeight) * 2, buttonWidth, buttonHeight, 'white', 'black', 'lightgray', 'Menu', this.canvas.height / 20, 'fill','menu'),
        ];


        const hoverFunction = (event: MouseEvent) => {
            this.props.forEach((prop) => {
              if (prop instanceof Button) {
                prop.doHover({ x: event.x, y: event.y });
              }
            });
          };
      
        const clickFunction = (event: MouseEvent) => {
          const removeFunctions = () => {
            this.canvas.removeEventListener('click', clickFunction);
            this.canvas.removeEventListener('mousemove', hoverFunction);
          }
          
          this.props.forEach((prop) => {
            if (prop instanceof Button) {
              if (prop.isHovered({ x: event.x, y: event.y })) {
                if (prop.getId() === 'continue') {
                    this.clickSound.play();
                    this.paused = false
                    removeFunctions()
                  } else if (prop.getId() === 'menu') {
                    this.clickSound.play();
                    window.location.href = '/'
                  }
                }
              }
            });
        };
      
        this.canvas.addEventListener('click', clickFunction);
        this.canvas.addEventListener('mousemove', hoverFunction);


    }

    public render() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.props.forEach((prop) => {
            prop.draw(this.ctx)
        })

        Scene.writeTextToCanvas(
            this.ctx,
            'De Game is gepauzeerd.',
            this.canvas.width / 2,
            this.canvas.height / 8,
            30
        )

    }

    public processInput() {

    }
    public update = (elapsed: number): boolean => this.paused;
}