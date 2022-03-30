import ScoringObject from './ScoringObject.js';
export default class LightningBolt extends ScoringObject {
    constructor(canvas) {
        super(canvas);
        this.image = LightningBolt.loadNewImage('assets/img/objects/titled_yellow_power_icon.png');
        this.points = -10;
    }
}
//# sourceMappingURL=LightningBolt.js.map