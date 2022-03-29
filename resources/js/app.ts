import Game from "./Game";

require('./bootstrap');

const game = new Game(document.getElementById('game-canvas')! as HTMLCanvasElement);
game.start()