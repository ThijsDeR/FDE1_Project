var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import UserData from "../UserData.js";
const upgrades = document.querySelectorAll('.upgrade');
const userdata = new UserData();
upgrades.forEach((upgrade) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield userdata.getUpgrade(upgrade.id);
    const level = upgrade.querySelector('span.level');
    const price = upgrade.querySelector('span.price');
    const buyBtn = upgrade.querySelector('button.buy');
    const vp = document.querySelector('span#vp');
    level.innerHTML = data.level;
    price.innerHTML = data.price;
    upgrade.querySelector('button').addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
        const upgrade_data = yield userdata.upgrade(upgrade.id);
        if (upgrade_data.status === 200) {
            // worked
            const playerData = yield userdata.getPlayerData();
            vp.innerHTML = playerData.vp;
            const data = yield userdata.getUpgrade(upgrade.id);
            level.innerHTML = data.level;
            price.innerHTML = data.price;
            buyBtn.classList.add('bought');
            setTimeout(() => {
                buyBtn.classList.remove('bought');
            }, 1000);
        }
        else if (upgrade_data.status === 400) {
            buyBtn.classList.add('error');
            setTimeout(() => {
                buyBtn.classList.remove('error');
            }, 1000);
        }
    }));
}));
