import CutScene from "./CutScene.js";
import KeyListener from "./KeyListener.js";
import Button from "./Props/Button.js";
import Scene from "./Scene.js";
export default class GameOverScene extends CutScene {
    constructor(canvas, userData) {
        super(canvas, userData);
        this.keyListener = KeyListener;
        this.update = (elapsed) => this.paused;
        const buttonWidth = (this.canvas.width / 4);
        const buttonHeight = (this.canvas.height / 6);
        const betweenButtonHeight = (this.canvas.height / 10);
        this.props = [
            // TODO: Continue button
            new Button((this.canvas.width / 2) - (buttonWidth / 2), (buttonHeight + betweenButtonHeight), buttonWidth, buttonHeight, 'white', 'black', 'lightgray', 'Continue', this.canvas.height / 20, 'fill', 'continue'),
            // Menu button
            new Button((this.canvas.width / 2) - (buttonWidth / 2), (buttonHeight + betweenButtonHeight) * 2, buttonWidth, buttonHeight, 'white', 'black', 'lightgray', 'Menu', this.canvas.height / 20, 'fill', 'menu')
        ];
        const hoverFunction = (event) => {
            this.props.forEach((prop) => {
                if (prop instanceof Button) {
                    prop.doHover({ x: event.x, y: event.y });
                }
            });
        };
        const clickFunction = (event) => {
            const removeFunctions = () => {
                this.canvas.removeEventListener('click', clickFunction);
                this.canvas.removeEventListener('mousemove', hoverFunction);
            };
            this.props.forEach((prop) => {
                if (prop instanceof Button) {
                    if (prop.isHovered({ x: event.x, y: event.y })) {
                        if (prop.getId() === 'continue') {
                            this.paused = false;
                        }
                        else if (prop.getId() === 'menu') {
                            window.location.href = '/';
                        }
                    }
                }
            });
        };
        this.canvas.addEventListener('click', clickFunction);
        this.canvas.addEventListener('mousemove', hoverFunction);
    }
    render() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.props.forEach((prop) => {
            prop.draw(this.ctx);
        });
        Scene.writeTextToCanvas(this.ctx, 'Game Over!', this.canvas.width / 2, this.canvas.height / 8, 30);
    }
    processInput() {
    }
}
