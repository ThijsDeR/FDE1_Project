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


  public setToken(token: string) {
    this.token = token;
    localStorage.setItem(UserData.TOKEN_OBJECT_NAME, `${this.token}`);
  }

  public getToken(): string | null {
    return this.token;
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

  public changeHighScore(highscore: number) {
    this.getPlayerData().then((data: any) => {
      if (highscore > data.highscore) {
        this.setPlayerData({highscore: highscore, upgrades: {}}).then((data) => {
          console.log(data)
        });
      }
    })
  }

}
