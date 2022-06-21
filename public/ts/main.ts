import Game from './Game.js';
import UserData from './UserData.js';

console.log('Javascript is working!, not');
const userData = new UserData()
// Add EventListener to load the game whenever the browser is ready
window.addEventListener('load',
  async () => {
    const stamina_resistance = await userData.getUpgrade('stamina_resistance');
    const stamina_gain = await userData.getUpgrade('stamina_gain');
    const lamp_power = await userData.getUpgrade('lamp_power');
    const bicycleSkin = await userData.getSkin('bicycle');
    const staminaSkin = await userData.getSkin('stamina');
    const upgrades = {stamina_resistance: stamina_resistance, stamina_gain: stamina_gain, lamp_power: lamp_power}
    const skins = {bicycleSkin: bicycleSkin, staminaSkin: staminaSkin};
    console.log(skins)
    new Game(document.getElementById('game-canvas')!, upgrades, skins)
  });
