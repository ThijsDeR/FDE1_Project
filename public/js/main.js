var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Game from './Game.js';
import UserData from './UserData.js';
console.log('Javascript is working!, not');
const userData = new UserData();
// Add EventListener to load the game whenever the browser is ready
window.addEventListener('load', () => __awaiter(void 0, void 0, void 0, function* () {
    const stamina_resistance = yield userData.getUpgrade('stamina_resistance');
    const stamina_gain = yield userData.getUpgrade('stamina_gain');
    const lamp_power = yield userData.getUpgrade('lamp_power');
    const upgrades = { stamina_resistance: stamina_resistance, stamina_gain: stamina_gain, lamp_power: lamp_power };
    new Game(document.getElementById('game-canvas'), upgrades);
}));
