import Game from "../Game.js";
import Prop from "./Prop.js";
export default class Button extends Prop {
    /**
     * Initialize Button
     *
     * @param xPos xpos
     * @param yPos ypos
     * @param width width
     * @param height height
     * @param color color of button rectangle
     * @param textColor textcolor
     * @param hoverColor color of button rectangle when hovered
     * @param text text
     * @param fontSize fontsize
     * @param id button id
     */
    constructor(xPos, yPos, width, height, color, textColor, hoverColor, text, fontSize, style, id) {
        super(xPos, yPos, 0, 0, width, height);
        this.color = color;
        this.originalColor = color;
        this.text = text;
        this.fontSize = fontSize;
        this.id = id;
        this.hoverColor = hoverColor;
        this.textColor = textColor;
        this.style = style;
    }
    /**
     * draw the button to the canvas
     *
     * @param ctx the canvas rendering context
     */
    draw(ctx) {
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.width / 200 + this.height / 200;
        ctx.fillStyle = this.color;
        ctx.rect(this.xPos, this.yPos, this.width, this.height);
        if (this.style === 'fill')
            ctx.fill();
        else if (this.style === 'stroke')
            ctx.stroke();
        Game.writeTextToCanvas(ctx, this.text, this.xPos + (this.width / 2), this.yPos + (this.height / 2), this.fontSize, this.textColor, 'center', 'middle', this.width);
    }
    /**
     * Check if button is hovered
     *
     * @param mouseCoords object of x and y coordinates
     * @param mouseCoords.x the x coordinate
     * @param mouseCoords.y the y coordinate
     * @returns boolean
     */
    isHovered(mouseCoords) {
        if (mouseCoords.x > this.getXPos()
            && mouseCoords.x < this.getXPos() + this.getWidth()
            && mouseCoords.y > this.getYPos()
            && mouseCoords.y < this.getYPos() + this.getHeight())
            return true;
        return false;
    }
    /**
     * Getter for the button id
     *
     * @returns id
     */
    getId() {
        return this.id;
    }
    /**
     * Change button color if hovered
     *
     * @param mouseCoords object of x and y coordinates
     * @param mouseCoords.x the x coordinate
     * @param mouseCoords.y the y coordinate
     */
    doHover(mouseCoords) {
        if (this.isHovered(mouseCoords)) {
            this.color = this.hoverColor;
        }
        else
            this.color = this.originalColor;
    }
}
