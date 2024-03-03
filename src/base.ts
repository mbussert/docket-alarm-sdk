import { Endpoints } from "./types";

type Auth = {
  username: string;
  password: string;
};

export abstract class Base {
  private username: string;
  private password: string;
  private baseUrl: string = "https://www.docketalarm.com/api/v1/";
  private loginToken: string | null = null;
  private tokenExpirationTime: number = 0;
  private readonly tokenExpirationThreshold: number = 90 * 60 * 1000; // 90 Minutes

  constructor(auth: Auth) {
    this.username = auth.username;
    this.password = auth.password;
  }

  protected async login(username: string, password: string): Promise<void> {
    try {
      const loginUrl = `${this.baseUrl}${Endpoints.Login}`;

      const loginHeaders = new Headers();
      loginHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      const urlEncoded = new URLSearchParams();
      urlEncoded.append("username", this.username);
      urlEncoded.append("password", this.password);

      const requestOptions = {
        method: "POST",
        headers: loginHeaders,
        body: urlEncoded,
      };

      const response = await fetch(loginUrl, requestOptions);

      if (response.ok) {
        const data = await response.json();

        this.loginToken = data.login_token;
        this.tokenExpirationTime = Date.now() * 1000;
        console.log("Data Response: ", data);
        console.log("Login Token: ", this.loginToken);
        console.log("Expires: ", this.tokenExpirationTime);
      }
    } catch (error: any) {
      throw new Error("Login failed: ", error.message);
    }
  }

  // protected async request<T>(
  //   login_token: string,
  //   endpoint: string,
  //   options?: RequestInit
  // ): Promise<T> {
  //   const url = `${this.baseUrl}${endpoint}`;

  //   const headers = new Headers();
  //   headers.append("Content-Type", "application/x-www-form-urlencoded");

  //   if (options?.body) {
  //     // Add the login_token to the body
  //   } else {
  //     // Create a body and add login_token
  //   }

  //   // const urlEncoded = new URLSearchParams();
  //   // urlEncoded.append("username", this.username);
  //   // urlEncoded.append("password", this.password);

  //   const config = Object.assign({}, options, { headers });

  //   const response = await fetch(url, config);

  //   if (response.ok) {
  //     const data = await response.json();
  //     return data as T;
  //   }

  //   throw new Error(response.statusText);
  // }
}
