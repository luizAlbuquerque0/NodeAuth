import { SignUpController } from "../application/controllers/SignUpController";
import { SignUpUseCase } from "../application/useCases/SignUpUseCase";
import { makeSignUpUseCase } from "./makeSignUpUseCase";

export function makeSignUpController() {
  const signUpUseCase = makeSignUpUseCase();

  return new SignUpController(signUpUseCase);
}
