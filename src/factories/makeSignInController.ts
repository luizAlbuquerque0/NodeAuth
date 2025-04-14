import { SignInController } from "../application/controllers/SignInController";
import { CreateRefreshtokenUseCase } from "../application/useCases/CreateRefreshToken";
import { SignInUseCase } from "../application/useCases/SignInUseCase";
import { makeSignInUseCase } from "./makeSignInUseCase";

export function makeSignInController() {
  const signInUseCase = makeSignInUseCase();
  const createRefreshToken = new CreateRefreshtokenUseCase();

  return new SignInController(signInUseCase, createRefreshToken);
}
