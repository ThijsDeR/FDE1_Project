export default class Props {
private yPos: number
private xPos: number
private imageProp: string[];
private xSpeed: number;
private ySpeed: number

public constructor(img:HTMLImageElement, xPos: number, yPos: number) {
    this.imageProp = this.imageProp
    this.xPos = xPos;
    this.yPos = yPos;
    this.ySpeed = 0;
    this.xSpeed = 0
  }

}
