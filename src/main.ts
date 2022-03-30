import Game from './Game.js';

console.log('Javascript is working!');

// Add EventListener to load the game whenever the browser is ready
window.addEventListener('load',
  () => new Game(document.getElementById('canvas')));
