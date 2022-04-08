export default class Animator {
    constructor(images) {
        this.images = images;
        this.currentImage = 0;
        this.timeSinceLastImage = 0;
    }
    advance(elapsed) {
        this.timeSinceLastImage += elapsed;
        if (this.images[this.currentImage].duration < this.timeSinceLastImage) {
            this.currentImage += 1;
            if ((this.images.length) === this.currentImage)
                this.currentImage = 0;
            this.timeSinceLastImage = 0;
        }
    }
    getImage() {
        return this.images[this.currentImage].image;
    }
}
