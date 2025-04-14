import { sign } from "jsonwebtoken";
import { AccountAlreadyExists } from "../errors/AccountAlreadyExists";
import { InvalidCredetials } from "../errors/InvalidCredetials";
import { prismaClient } from "../libs/PrismaCliente";
import { compare, hash } from "bcryptjs";
import { env } from "../config/env";
import { RefreshToken } from "@prisma/client";

interface IInput {
  accountId: string;
  expiresAt: Date;
}

type IOutput = {
  refreshToken: RefreshToken;
};

export class CreateRefreshtokenUseCase {
  async execute({ accountId, expiresAt }: IInput): Promise<IOutput> {
    const refreshToken = await prismaClient.refreshToken.create({
      data: {
        accountId,
        expiresAt,
      },
    });

    return {
      refreshToken,
    };
  }
}
