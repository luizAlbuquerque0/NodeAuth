import { z } from "zod";
import { IController, IResponse } from "../interfaces/IController";
import { IRequest } from "../interfaces/IRequest";
import { env } from "../config/env";
import qs from "qs";
import axios from "axios";
import { GoogleAPIs } from "../services/GoogleAPIs";
import { prismaClient } from "../libs/PrismaCliente";
import { sign } from "jsonwebtoken";

const schema = z.object({
  code: z.string().min(1),
});

export class GoogleSignInController implements IController {
  async handle(request: IRequest): Promise<IResponse> {
    const result = schema.safeParse(request.query);

    if (!result.success) {
      return {
        statusCode: 400,
        body: result.error.issues,
      };
    }

    const { code } = result.data;

    const googleAccessToken = await GoogleAPIs.getAccessToken({
      code,
      redirect_uri: "http://localhost:5173/callbacks/google",
    });

    const userInfo = await GoogleAPIs.getUserInfo(googleAccessToken);

    await GoogleAPIs.revokeToken(googleAccessToken);

    if (!userInfo.verified_email) {
      return {
        statusCode: 400,
        body: {
          error: "Google account not verified",
        },
      };
    }

    const account = await prismaClient.account.upsert({
      where: {
        email: userInfo.email,
      },
      update: {
        googleId: userInfo.id,
      },
      create: {
        email: userInfo.email,
        name: userInfo.given_name,
        role: "USER",
        avatar: userInfo.picture,
        googleId: userInfo.id,
      },
    });

    const accessToken = await sign(
      { sub: account.id, role: account.role },
      env.jwtSecret,
      {
        expiresIn: "1d",
      }
    );

    return {
      statusCode: 200,
      body: {
        accessToken,
      },
    };
  }
}
