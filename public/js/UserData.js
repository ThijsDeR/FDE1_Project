var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export default class UserData {
    /**
     *
     */
    constructor() {
        if (localStorage.getItem(UserData.TOKEN_OBJECT_NAME)) {
            this.token = localStorage.getItem(UserData.TOKEN_OBJECT_NAME);
        }
        else {
            window.location.href = '/logout';
            this.token = null;
        }
    }
    isValidPlayer() {
        return this.token ? true : false;
    }
    setToken(token) {
        this.token = token;
        localStorage.setItem(UserData.TOKEN_OBJECT_NAME, `${this.token}`);
    }
    getToken() {
        return this.token;
    }
    getPlayerData() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const rawResponse = yield fetch('/players/' + this.token, {
                headers: {
                    'X-CSRF-TOKEN': (_a = document.querySelector('meta[name="csrf-token"]')) === null || _a === void 0 ? void 0 : _a.getAttribute('content')
                }
            });
            const response = rawResponse.json();
            return response;
        });
    }
    setHighscore(data) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch('/players/' + this.token, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': (_a = document.querySelector('meta[name="csrf-token"]')) === null || _a === void 0 ? void 0 : _a.getAttribute('content')
                },
                body: JSON.stringify(data)
            });
            return response;
        });
    }
    addVP(vp) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch('/players/addVP/' + this.token, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': (_a = document.querySelector('meta[name="csrf-token"]')) === null || _a === void 0 ? void 0 : _a.getAttribute('content')
                },
                body: JSON.stringify({ vp: vp })
            });
            return response;
        });
    }
    changeHighScore(highscore) {
        this.getPlayerData().then((data) => {
            if (highscore > data.highscore) {
                this.setHighscore({ highscore: highscore }).then((data) => {
                });
            }
            else {
            }
        });
    }
    buySkin(skin_type, skin_id) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`/profile/skins/${this.token}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': (_a = document.querySelector('meta[name="csrf-token"]')) === null || _a === void 0 ? void 0 : _a.getAttribute('content')
                },
                body: JSON.stringify({ skin_type: skin_type, skin_id: skin_id })
            });
            return response;
        });
    }
    getSkin(skin_type) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`/profile/getSkin/${skin_type}/${this.token}`);
            const rawResponse = yield fetch(`/profile/getSkin/${skin_type}/${this.token}`, {
                headers: {
                    'X-CSRF-TOKEN': (_a = document.querySelector('meta[name="csrf-token"]')) === null || _a === void 0 ? void 0 : _a.getAttribute('content')
                }
            });
            console.log(rawResponse);
            const response = yield rawResponse.json();
            return response;
        });
    }
    changeSkin(skin_type, amount) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`/profile/changeSkin/${skin_type}/${this.token}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': (_a = document.querySelector('meta[name="csrf-token"]')) === null || _a === void 0 ? void 0 : _a.getAttribute('content')
                },
                body: JSON.stringify({ amount: amount })
            });
            return response;
        });
    }
    getUpgrade(upgrade) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const rawResponse = yield fetch(`/profile/getUpgrade/${upgrade}/${this.token}`, {
                headers: {
                    'X-CSRF-TOKEN': (_a = document.querySelector('meta[name="csrf-token"]')) === null || _a === void 0 ? void 0 : _a.getAttribute('content')
                }
            });
            const response = yield rawResponse.json();
            return response;
        });
    }
    upgrade(upgrade) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`/profile/upgrade/${this.token}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': (_a = document.querySelector('meta[name="csrf-token"]')) === null || _a === void 0 ? void 0 : _a.getAttribute('content')
                },
                body: JSON.stringify({ upgrade_type: upgrade })
            });
            return response;
        });
    }
}
UserData.TOKEN_OBJECT_NAME = 'token';
