import { SignInController } from "../application/controllers/SignInController";
import { SignInUseCase } from "../application/useCases/SignInUseCase";
import { makeSignInUseCase } from "./makeSignInUseCase";

export function makeSignInController() {
  const signInUseCase = makeSignInUseCase();

  return new SignInController(signInUseCase);
}
