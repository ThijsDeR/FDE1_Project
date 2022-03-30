import ScoringObject from './ScoringObject.js';
export default class GoldTrophy extends ScoringObject {
    constructor(canvas) {
        super(canvas);
        this.image = ScoringObject.loadNewImage('assets/img/objects/gold_trophy.png');
        this.points = 10;
    }
}
//# sourceMappingURL=GoldTrophy.js.map