import { prismaClient } from "../libs/PrismaCliente";

interface IInput {
  id: string;
}

export class DeleteRefreshTokenUseCase {
  async execute({ id }: IInput) {
    return await prismaClient.refreshToken.delete({
      where: {
        id,
      },
    });
  }
}
