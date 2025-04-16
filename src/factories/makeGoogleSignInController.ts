import { GoogleSignInController } from "../application/controllers/GoogleSignInController";

export function makeGoogleSignInController() {
  return new GoogleSignInController();
}
