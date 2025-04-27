import { GetAccountInfoController } from "../application/controllers/GetAccountInfoController";
import { GetAccountInfoByIdUseCase } from "../application/useCases/getAccountInfoByIdUseCase";

export function MakeGetAccountInfoController() {
  const getAccountInfoByIdUseCase = new GetAccountInfoByIdUseCase();
  return new GetAccountInfoController(getAccountInfoByIdUseCase);
}
