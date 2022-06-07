export default class Scene {
    /**
     * The constuctor of scene
     *
     * @param canvas canvas element
     * @param userData Data about the user
     */
    constructor(canvas, userData) {
        this.canvas = canvas;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext('2d');
        this.userData = userData;
    }
    /**
     * @param ctx CanvasRenderingContext
     * @param text Text to be written on screen
     * @param xPos X position of the text
     * @param yPos Y position of the text
     * @param fontSize Size of the text
     * @param color Color of the text
     * @param textAlign Alignment of the text
     * @param textBaseline Baseline of the text
     * @param maxWidth The max with the text can have
     */
    static writeTextToCanvas(ctx, text, xPos, yPos, fontSize = 20, color = 'white', textAlign = 'center', textBaseline = 'middle', maxWidth = 10000) {
        ctx.font = `${fontSize}px Arial`;
        ctx.fillStyle = color;
        ctx.textAlign = textAlign;
        ctx.textBaseline = textBaseline;
        const words = text.split(' ');
        let line = '';
        const yPositions = [];
        const lines = [];
        for (let i = 0; i < words.length; i++) {
            const tempLine = `${line + words[i]} `;
            const metrics = ctx.measureText(tempLine);
            const tempWidth = metrics.width;
            if (tempWidth > maxWidth && i > 0) {
                lines.push(line);
                // ctx.fillText(line, xPos, yPos);
                line = `${words[i]} `;
                // yPos += fontSize;
            }
            else {
                line = tempLine;
            }
        }
        lines.push(line);
        const amount = lines.length;
        if (amount % 2 === 0) {
            for (let i = amount / 2; i > 0; i--) {
                yPositions.push(yPos - (fontSize * i));
            }
            for (let i = 0; i < (amount / 2); i++) {
                yPositions.push(yPos + (fontSize * i));
            }
        }
        else {
            for (let i = (amount - 1) / 2; i > 0; i--) {
                yPositions.push(yPos - (fontSize * i));
            }
            yPositions.push(yPos);
            for (let i = 0; i < (amount - 1) / 2; i++) {
                yPositions.push(yPos + (fontSize * (i + 1)));
            }
        }
        // eslint-disable-next-line @typescript-eslint/no-shadow
        lines.forEach((line, lineIndex) => {
            ctx.fillText(line, xPos, yPositions[lineIndex]);
        });
    }
}
