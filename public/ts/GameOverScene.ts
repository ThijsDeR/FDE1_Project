import CutScene from "./CutScene.js";
import Button from "./Props/Button.js";
import Prop from "./Props/Prop.js";
import Scene from "./Scene.js";
import UserData from "./UserData.js";

export default class GameOverScene extends CutScene {
    
    private props: Button[];

    private completed: boolean;

    public constructor(canvas: HTMLCanvasElement, userData: UserData) {
        super(canvas, userData)

        const buttonWidth = (this.canvas.width / 4);
        const buttonHeight = (this.canvas.height / 6);
        const betweenButtonHeight = (this.canvas.height / 10);

        this.props = [
            new Button((this.canvas.width / 2) - (buttonWidth / 2), (buttonHeight + betweenButtonHeight), buttonWidth, buttonHeight, 'white', 'black', 'lightgray', 'Restart', this.canvas.height / 20, 'fill','restart'),
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
                  if (prop.getId() === 'restart') {
                      this.completed = true;
                  } else if (prop.getId() === 'menu') {
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
            'Game Over!',
            this.canvas.width / 2,
            this.canvas.height / 8,
            30
        )

    }

    public processInput(): void {

    }
    public update = (elapsed: number): boolean => this.completed;
}