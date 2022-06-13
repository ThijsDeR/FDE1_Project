export default class Prop {
  protected yPos: number;
  protected xPos: number;
  protected xVel: number;
  protected yVel: number;
  protected width: number;
  protected height: number;



  public constructor(xPos: number, yPos: number, xVel: number, yVel: number, width: number, height: number) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.xVel = xVel;
    this.yVel = yVel;
    this.width = width;
    this.height = height;

  }

  public getXPos() {
    return this.xPos
  }

  public getYPos() {
    return this.yPos
  }

  public getXVel() {
    return this.xVel
  }

  public getYVel() {
    return this.yVel
  }

  public getWidth() {
    return this.width
  }

  public getHeight() {
    return this.height
  }



  public move(elapsed: number, xVel: number | null = null, yVel: number | null = null) {
    xVel ? this.xPos += xVel * elapsed : this.xPos += this.xVel * elapsed;
    yVel ? this.yPos += yVel * elapsed : this.yPos += this.yVel * elapsed;
  }

  public scroll(elapsed: number, scrollSpeed: number) {
    this.yPos += (scrollSpeed * elapsed);
  }

  public collidesWithOtherProp(prop: Prop) {
    if (
      this.xPos < prop.getXPos() + prop.getWidth()
      && this.xPos + this.width > prop.getXPos()
      && this.yPos < prop.getYPos() + prop.getHeight()
      && this.yPos + this.height > prop.getYPos()
    ) {
      return true;
    } return false;
  }
}
