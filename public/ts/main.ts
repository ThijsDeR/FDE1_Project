import Game from './Game.js';

console.log('Javascript is working!, not');

// Add EventListener to load the game whenever the browser is ready
window.addEventListener('load',
  () => new Game(document.getElementById('game-canvas')!));
