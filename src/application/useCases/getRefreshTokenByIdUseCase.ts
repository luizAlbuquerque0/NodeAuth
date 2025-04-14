import { prismaClient } from "../libs/PrismaCliente";
import { RefreshToken } from "@prisma/client";

interface IInput {
  id: string;
}

export class GetRefreshTokenByIdUseCase {
  async execute({ id }: IInput) {
    return await prismaClient.refreshToken.findUnique({
      where: {
        id,
      },
      include: {
        account: true,
      },
    });
  }
}
