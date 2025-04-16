import qs from "qs";
import { env } from "../config/env";
import axios from "axios";

interface IGetAccessTokenParams {
  code: string;
  redirect_uri: string;
}

interface IUserInfoResponse {
  id: string;
  email: string;
  verified_email: string;
  given_name: string;
  picture: string;
}

export class GoogleAPIs {
  static async getAccessToken({ code, redirect_uri }: IGetAccessTokenParams) {
    const options = qs.stringify({
      client_id: env.googleClientId,
      client_secret: env.googleClientSecret,
      code,
      grant_type: "authorization_code",
      redirect_uri,
    });

    const { data } = await axios.post<{ access_token: string }>(
      "https://oauth2.googleapis.com/token",
      options,
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );

    return data.access_token;
  }

  static async getUserInfo(accessToken: string) {
    const { data } = await axios.get<IUserInfoResponse>(
      "https://www.googleapis.com/userinfo/v2/me",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return data;
  }

  static async revokeToken(accessToken: string) {
    await axios.post(
      "https://oauth2.googleapis.com/revoke",
      qs.stringify({ token: accessToken }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
  }
}
