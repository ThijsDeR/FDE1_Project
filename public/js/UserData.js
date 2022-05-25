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
    setToken(token) {
        this.token = token;
        localStorage.setItem(UserData.TOKEN_OBJECT_NAME, `${this.token}`);
    }
    getToken() {
        return this.token;
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
    changeHighScore(highscore) {
        this.getPlayerData().then((data) => {
            if (highscore > data.highscore) {
                this.setPlayerData({ highscore: highscore, upgrades: {} }).then((data) => {
                    console.log(data);
                });
            }
        });
    }
}
UserData.TOKEN_OBJECT_NAME = 'token';
