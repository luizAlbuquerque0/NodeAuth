import { InvalidCredetials } from "../errors/InvalidCredetials";
import { IController, IResponse } from "../interfaces/IController";
import { IRequest } from "../interfaces/IRequest";
import { GetAccountInfoByIdUseCase } from "../useCases/getAccountInfoByIdUseCase";

export class GetAccountInfoController implements IController {
  constructor(
    private readonly getAccountInfoByIdUseCase: GetAccountInfoByIdUseCase
  ) {}
  async handle(request: IRequest): Promise<IResponse> {
    try {
      const account = await this.getAccountInfoByIdUseCase.execute(
        request.account!.id!
      );

      return {
        statusCode: 200,
        body: account,
      };
    } catch (error) {
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
