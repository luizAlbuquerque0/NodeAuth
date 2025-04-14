import { RefreshTokenController } from "../application/controllers/RefreshTokenController";
import { CreateRefreshtokenUseCase } from "../application/useCases/CreateRefreshToken";
import { DeleteRefreshTokenUseCase } from "../application/useCases/DeleteRefreshTokenUseCase";
import { GetRefreshTokenByIdUseCase } from "../application/useCases/getRefreshTokenByIdUseCase";

export function makeRefreshTokenController() {
  const getRefreshTokenById = new GetRefreshTokenByIdUseCase();
  const deleteRefreshToken = new DeleteRefreshTokenUseCase();
  const createRefreshToken = new CreateRefreshtokenUseCase();

  return new RefreshTokenController(
    getRefreshTokenById,
    deleteRefreshToken,
    createRefreshToken
  );
}
