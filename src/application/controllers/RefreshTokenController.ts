import { z } from "zod";
import { IController, IResponse } from "../interfaces/IController";
import { IRequest } from "../interfaces/IRequest";
import { GetRefreshTokenByIdUseCase } from "../useCases/getRefreshTokenByIdUseCase";
import { DeleteRefreshTokenUseCase } from "../useCases/DeleteRefreshTokenUseCase";
import { EXP_TIME_IN_DAYS } from "../config/contants";
import { CreateRefreshtokenUseCase } from "../useCases/CreateRefreshToken";
import { sign } from "jsonwebtoken";
import { env } from "../config/env";

export class RefreshTokenController implements IController {
  constructor(
    private readonly getRefreshTokenById: GetRefreshTokenByIdUseCase,
    private readonly deleteRefreshToken: DeleteRefreshTokenUseCase,
    private readonly createRefreshToken: CreateRefreshtokenUseCase
  ) {}
  schema = z.object({
    refreshToken: z.string().uuid(),
  });

  async handle(request: IRequest): Promise<IResponse> {
    const result = this.schema.safeParse(request.body);

    if (!result.success) {
      return {
        statusCode: 400,
        body: result.error.issues,
      };
    }

    const { refreshToken: refreshTokenId } = result.data;

    const refreshToken = await this.getRefreshTokenById.execute({
      id: refreshTokenId,
    });

    if (!refreshToken) {
      return {
        statusCode: 401,
        body: {
          error: "Invalid Refresh Token",
        },
      };
    }

    if (Date.now() > refreshToken.expiresAt.getTime()) {
      await this.deleteRefreshToken.execute({ id: refreshTokenId });

      return {
        statusCode: 401,
        body: {
          error: "Expired Refresh Token",
        },
      };
    }

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + EXP_TIME_IN_DAYS);

    const [accessToken, NewRefreshToken] = await Promise.all([
      sign(
        { sub: refreshToken.accountId, role: refreshToken.account.role },
        env.jwtSecret,
        {
          expiresIn: "1d",
        }
      ),
      this.createRefreshToken.execute({
        accountId: refreshToken.accountId,
        expiresAt,
      }),
      await this.deleteRefreshToken.execute({ id: refreshTokenId }),
    ]);

    return {
      statusCode: 200,
      body: {
        accessToken,
        refreshToken: NewRefreshToken.refreshToken.id,
      },
    };
  }
}
