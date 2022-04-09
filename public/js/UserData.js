export default class UserData {
    /**
     *
     */
    constructor() {
        if (localStorage.getItem(UserData.TOKEN_OBJECT_NAME)) {
            this.token = localStorage.getItem(UserData.TOKEN_OBJECT_NAME);
        }
        else
            this.token = null;
    }
    isValidPlayer() {
        return this.token ? true : false;
    }
    makeNewPlayer(name) {
        this.token = this.makeToken(48);
        return this.createPlayer({ token: this.token, name: name });
    }
    getToken() {
        return this.token;
    }
    makeToken(length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < length; i++) {
            result += characters[Math.floor(Math.random() * characters.length)];
        }
        localStorage.setItem(UserData.TOKEN_OBJECT_NAME, `${result}`);
        return result;
    }
    getPlayerData() {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: './players/' + this.token,
                type: 'GET',
                success: function (data) {
                    resolve(data);
                },
                error: function (error) {
                    reject(error);
                }
            });
        });
    }
    setPlayerData(data) {
        return new Promise((resolve, reject) => {
            $.ajax({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                url: './players/' + this.token,
                type: 'PUT',
                data: data,
                dataType: "text",
                success: function (data) {
                    resolve(data);
                },
                error: function (error) {
                    reject(error);
                }
            });
        });
    }
    createPlayer(data) {
        return new Promise((resolve, reject) => {
            $.ajax({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                url: './players',
                type: 'POST',
                data: data,
                dataType: "text",
                success: function (data) {
                    resolve(data);
                },
                error: function (error) {
                    reject(error);
                }
            });
        });
    }
    changeHighScore(highscore) {
        return this.setPlayerData({ highscore: highscore, upgrades: {} });
    }
}
UserData.TOKEN_OBJECT_NAME = 'token';
