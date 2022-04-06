export default class UserData {
    /**
     *
     */
    constructor() {
        if (localStorage.getItem(UserData.TOKEN_OBJECT_NAME)) {
            this.token = localStorage.getItem(UserData.TOKEN_OBJECT_NAME);
        }
        else {
            this.token = this.makeToken(48);
            localStorage.setItem(UserData.TOKEN_OBJECT_NAME, `${this.token}`);
        }
    }
    makeToken(length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < length; i++) {
            result += characters[Math.floor(Math.random() * characters.length)];
        }
        return result;
    }
    getToken() {
        return this.token;
    }
    getTestData() {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: './tests',
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
}
UserData.TOKEN_OBJECT_NAME = 'token';
