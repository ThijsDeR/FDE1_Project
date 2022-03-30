import ScoringObject from './ScoringObject.js';
export default class LightningBolt extends ScoringObject {
    /**
     * Construct a new instance of this class
     *
     * @param canvas the canvas on which the player should exist
     */
    constructor(canvas) {
        super(canvas);
        this.image = LightningBolt.loadNewImage('assets/img/objects/titled_yellow_power_icon.png');
        this.points = -10;
    }
}
