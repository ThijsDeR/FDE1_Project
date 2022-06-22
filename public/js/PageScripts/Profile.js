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
const skins = document.querySelectorAll('#skins .skin');
const userdata = new UserData();
skins.forEach((skin) => __awaiter(void 0, void 0, void 0, function* () {
    const skinBtns = skin.querySelectorAll('button');
    const skinType = skin.getAttribute('type');
    console.log(skinType);
    const skinImage = skin.querySelector('img');
    skinBtns.forEach((skinBtn) => __awaiter(void 0, void 0, void 0, function* () {
        console.log('sheesh');
        const btnType = skinBtn.getAttribute('type');
        skinBtn.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
            let skinBtn_data;
            if (btnType === 'previous')
                skinBtn_data = yield userdata.changeSkin(skinType, -1);
            else if (btnType === 'next')
                skinBtn_data = yield userdata.changeSkin(skinType, 1);
            console.log(skinBtn_data.status);
            if (skinBtn_data.status === 200) {
                // worked
                const skinData = yield userdata.getSkin(skinType);
                console.log(skinData);
                skinImage.src = skinData.src;
            }
            else if (skinBtn_data.status === 400) {
            }
        }));
    }));
}));
