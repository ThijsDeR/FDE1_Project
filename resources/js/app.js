import Game from "./Game";
require('./bootstrap');
var game = new Game(document.getElementById('game-canvas'));
game.start();
