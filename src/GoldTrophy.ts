import ScoringObject from './ScoringObject.js';

export default class GoldTrophy extends ScoringObject {
  /**
   * Construct a new instance of this class
   *
   * @param canvas the canvas on which the player should exist
   */
  public constructor(canvas: HTMLCanvasElement) {
    super(canvas);
    this.image = ScoringObject.loadNewImage('assets/img/objects/gold_trophy.png');

    this.points = 10;
  }
}
