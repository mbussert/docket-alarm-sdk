type Auth = {
  username: string;
  password: string;
};

export class DocketAlarm {
  private username: string;
  private password: string;
  private base_api: string = "https://www.docketalarm.com/api/v1/";
  private loginToken: string | null = null;

  constructor({ username, password }: Auth) {
    this.username = username;
    this.password = password;
    this.loginUser();
  }

  private async loginUser() {
    try {
      const encodeUser = encodeURI(this.username);
      const loginUrl = `${this.base_api}login?username=${encodeUser}&password=${this.password}`;

      const response = await fetch(loginUrl, {
        method: "POST",
      });

      if (response.ok) {
        const responseData = await response.json();
        this.loginToken = responseData.login_token;
      } else {
        throw new Error("User login failed.");
      }
    } catch (error: any) {
      console.error("Login failed: ", error.message);
    }
  }

  public async searchPacer() {
    console.log("search pacer");
  }

  public async searchDirect() {
    console.log("search direct");
  }
}
