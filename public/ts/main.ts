import Game from './Game.js';
import UserData from './UserData.js';

console.log('Javascript is working!, not');
const userData = new UserData()
// Add EventListener to load the game whenever the browser is ready
window.addEventListener('load',
  async () => {
    const stamina_resistance = await userData.getUpgrade('stamina_resistance');
    const stamina_gain = await userData.getUpgrade('stamina_gain');
    const upgrades = {stamina_resistance: stamina_resistance, stamina_gain: stamina_gain}
    new Game(document.getElementById('game-canvas')!, upgrades)
  });
