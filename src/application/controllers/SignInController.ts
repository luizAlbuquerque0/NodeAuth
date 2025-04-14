import { IController, IResponse } from "../interfaces/IController";
import { z, ZodError } from "zod";
import { SignInUseCase } from "../useCases/SignInUseCase";
import { InvalidCredetials } from "../errors/InvalidCredetials";
import { IRequest } from "../interfaces/IRequest";
import { EXP_TIME_IN_DAYS } from "../config/contants";
import { CreateRefreshtokenUseCase } from "../useCases/CreateRefreshToken";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export class SignInController implements IController {
  constructor(
    private readonly signInUseCase: SignInUseCase,
    private readonly createRefreshToken: CreateRefreshtokenUseCase
  ) {}
  async handle({ body }: IRequest): Promise<IResponse> {
    try {
      const { email, password } = schema.parse(body);

      const { accessToken, accountId } = await this.signInUseCase.execute({
        email,
        password,
      });

      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + EXP_TIME_IN_DAYS);

      const {
        refreshToken: { id },
      } = await this.createRefreshToken.execute({
        accountId,
        expiresAt,
      });

      return {
        statusCode: 200,
        body: {
          accessToken,
          refreshToken: id,
        },
      };
    } catch (error) {
      if (error instanceof ZodError) {
        return {
          statusCode: 400,
          body: error.issues,
        };
      }
      if (error instanceof InvalidCredetials) {
        return {
          statusCode: 401,
          body: {
            error: "Invalid Credentials",
          },
        };
      }

      throw error;
    }
  }
}
