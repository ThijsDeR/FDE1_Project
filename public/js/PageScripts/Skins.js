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
const skins = document.querySelectorAll('.skin');
const userdata = new UserData();
const vp = document.querySelector('span#vp');
skins.forEach((skin) => __awaiter(void 0, void 0, void 0, function* () {
    const type = skin.getAttribute('type');
    const buyBtn = skin.querySelector('button.buy');
    skin.querySelector('button').addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
        const skin_data = yield userdata.buySkin(type, skin.id);
        if (skin_data.status === 200) {
            const playerData = yield userdata.getPlayerData();
            vp.innerHTML = playerData.vp;
            // worked
            skin.remove();
        }
        else if (skin_data.status === 400) {
            buyBtn.classList.add('error');
            setTimeout(() => {
                buyBtn.classList.remove('error');
            }, 1000);
        }
    }));
}));
