export default class UserData {
  public static readonly TOKEN_OBJECT_NAME: string = 'token';

  private token: string;
  /**
   *
   */
  public constructor() {
    if (localStorage.getItem(UserData.TOKEN_OBJECT_NAME)) {
      this.token = localStorage.getItem(UserData.TOKEN_OBJECT_NAME)!;
    } else {
      this.token = this.makeToken(48);
      localStorage.setItem(UserData.TOKEN_OBJECT_NAME, `${this.token}`);
    }
  }

  private makeToken(length: number) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (let i = 0; i < length; i++) {
      result += characters[Math.floor(Math.random() * characters.length)];
    }

    return result;
  }

  public getToken(): string {
    return this.token;
  }

  public getTestData(): Promise<unknown> {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: './tests',
        type: 'GET',
        success: function (data) {
          resolve(data)
        },
        error: function (error) {
          reject(error)
        }
      })
    })   
  }

}
