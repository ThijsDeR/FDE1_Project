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

  public async getPlayerData(): Promise<unknown> {
    const rawResponse = await fetch('./players/' + this.token, {
      headers: {
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content')!
      }
    })
    const response = rawResponse.json()
    return response;
  }

  private async setPlayerData(data: {highscore: number}): Promise<unknown> {
    const response = await fetch('./players/' + this.token, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content')!
      },
      body: JSON.stringify(data)
    })

    console.log(response)
    return response;
  }

  public changeHighScore(highscore: number) {
    console.log('new highscore feature stuff 1')
    this.getPlayerData().then((data: any) => {
      if (highscore > data.highscore) {
        this.setPlayerData({highscore: highscore}).then((data) => {
          console.log(data)
        });
      }
    })
    console.log('new highscore feature stuff 2')
  }



  public async getUpgrade(upgrade: string) {
    const rawResponse = await fetch(`./profile/getUpgrade/${upgrade}/${this.token}`, {
      headers: {
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content')!
      }
    })
    const response = await rawResponse.json();
    return response
  }

  public async upgrade(upgrade: string) {
    const response = await fetch(`./profile/upgrade/${this.token}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content')!
      },
      body: JSON.stringify({upgrade_type: upgrade})
    })

    return response;
  }
}
