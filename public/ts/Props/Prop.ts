export default class Prop {
protected yPos: number;
protected xPos: number;
protected xVel: number;
protected yVel: number;
protected width: number;
protected height:number;



public constructor(xPos: number, yPos: number, xVel: number, yVel: number, width: number, height: number) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.yVel = xVel;
    this.xVel = yVel;
    this.width = width;
    this.height = height;

  }

  public getXPos() {
    return this.xPos
  }

  public getYPos() {
    return this.yPos
  }

  public getYVel() {
    return this.xVel
  }

  public getXVel() {
    return this.yVel
  }

  public getWidth() {
    return this.width
  }

  public getHeight() {
    return this.height
  }

  public move(elapsed: number) {
    this.xPos += this.xVel * elapsed;
    this.yPos += this.yVel * elapsed;
  }
}
