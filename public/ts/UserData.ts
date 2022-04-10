export default class UserData {
  public static readonly TOKEN_OBJECT_NAME: string = 'token';

  private token: string | null;
  /**
   *
   */
  public constructor() {
    if (localStorage.getItem(UserData.TOKEN_OBJECT_NAME)) {
      this.token = localStorage.getItem(UserData.TOKEN_OBJECT_NAME)!;
    } else this.token = null;
  }

  public isValidPlayer(): boolean {
    return this.token ? true : false;
  }

  public makeNewPlayer(name: string): Promise<unknown> {
    this.token = this.makeToken(48);

    return this.createPlayer({token: this.token, name: name})
  }

  public setToken(token: string) {
    this.token = token;
    localStorage.setItem(UserData.TOKEN_OBJECT_NAME, `${this.token}`);
  }
  
  public getToken(): string | null {
    return this.token;
  }


  private makeToken(length: number) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (let i = 0; i < length; i++) {
      result += characters[Math.floor(Math.random() * characters.length)];
    }
    localStorage.setItem(UserData.TOKEN_OBJECT_NAME, `${result}`);
    return result;
  }

  public getPlayerData(): Promise<unknown> {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: './players/' + this.token,
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

  private setPlayerData(data: {highscore: number, upgrades: {}}): Promise<unknown> {
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
          resolve(data)
        },
        error: function (error) {
          reject(error)
        }
      })
    })  
  }

  private createPlayer(data: {token: string, name: string}): Promise<unknown> {
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
          resolve(data)
        },
        error: function (error) {
          reject(error)
        }
      })
    })  
  }

  public changeHighScore(highscore: number): Promise<unknown> {
    return this.setPlayerData({highscore: highscore, upgrades: {}})
  }

}
