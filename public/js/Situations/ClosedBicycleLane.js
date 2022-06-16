import Game from "../Game.js";
import Player from "../Player.js";
import Frikandelbroodje from "../Props/Frikandelbroodje.js";
import ImageProp from "../Props/ImageProp.js";
import Situation from "../Situation.js";
import BlockedCyclePathSign from "../Props/BlockedCyclePathSign.js";
export default class ClosedBicycleLane extends Situation {
    constructor(canvas, userData, stamina, upgrades) {
        super(canvas, userData, upgrades);
        this.background = new ImageProp(canvas.width / 3, -canvas.height, 0, 0, canvas.width / 2, canvas.height, './assets/img/OpritBouwverkeer.png');
        this.props = [
            new Frikandelbroodje(this.background.getXPos() + (this.background.getWidth() / 1.65), this.background.getYPos() + (this.background.getHeight() / 1.70), 0, 0, this.background.getWidth() / 10, this.background.getHeight() / 6, './assets/img/objects/frikandelbroodje.png', 10),
            new BlockedCyclePathSign(this.background.getXPos() + (this.background.getWidth() / 1.65), this.background.getYPos() + (this.background.getHeight() / 2.25), 0, 0, this.background.getWidth() / 8, this.background.getHeight() / 5, './assets/img/objects/WegAfzetting.png'),
        ];
        this.canvas = canvas;
        this.player = new Player(this.background.getXPos() + ((this.background.getWidth() / 3) * 2) - ((this.background.getWidth() / 8) / 2), this.background.getHeight() / 1.2, 0, 0, this.background.getWidth() / 20, this.background.getHeight() / 8, stamina);
        Game.randomInteger(0, 1) === 1 ? this.props.push(new ImageProp(this.background.getXPos() + this.background.getWidth() / 2, this.background.getYPos() + (this.background.getHeight() * 2), 0, -0.25, this.background.getWidth() / 14, this.background.getHeight() / 9, './assets/img/objects/car.png'), new ImageProp(this.background.getXPos() + (this.background.getWidth() / 2.7), this.background.getYPos(), 0, 0.05, this.background.getWidth() / 14, this.background.getHeight() / 9, './assets/img/objects/car.png')) : '';
    }
    processInput() {
        if (this.player.getYPos() <= this.props[1].getYPos() && this.props[1].getYPos() <= 1000) {
            this.player.processInput(this.canvas, (this.background.getWidth() / 3) + this.background.getXPos(), ((this.background.getWidth() / 3.5) * 2) + this.background.getXPos());
        }
        else {
            this.player.processInput(this.canvas, (this.background.getWidth() / 3) + this.background.getXPos(), ((this.background.getWidth() / 2.9) * 2) + this.background.getXPos());
        }
    }
}
