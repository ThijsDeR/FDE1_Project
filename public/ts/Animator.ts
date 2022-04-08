export default class Animator {
    private images: {image: HTMLImageElement, duration: number}[];

    private currentImage: number;

    private timeSinceLastImage: number;

    public constructor(images: {image: HTMLImageElement, duration: number}[]) {
        this.images = images;
        this.currentImage = 0;
        this.timeSinceLastImage = 0;
    }

    public advance(elapsed: number) {
        this.timeSinceLastImage += elapsed;
        
        if (this.images[this.currentImage].duration < this.timeSinceLastImage) {
            this.currentImage += 1;
            if ((this.images.length) === this.currentImage) this.currentImage = 0;
            this.timeSinceLastImage = 0
        }
    }

    public getImage(): HTMLImageElement {
        return this.images[this.currentImage].image;
    }
}