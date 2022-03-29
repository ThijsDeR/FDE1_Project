import Game from "public/js/Game.js";
require('./bootstrap');
const game = new Game(document.getElementById('game-canvas'));
game.start();
