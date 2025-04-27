import { sign } from "jsonwebtoken";
import { AccountAlreadyExists } from "../errors/AccountAlreadyExists";
import { InvalidCredetials } from "../errors/InvalidCredetials";
import { prismaClient } from "../libs/PrismaCliente";
import { compare, hash } from "bcryptjs";
import { env } from "../config/env";

type IOutput = {
  name: string;
  email: string;
};

export class GetAccountInfoByIdUseCase {
  async execute(accountId: string): Promise<IOutput> {
    const account = await prismaClient.account.findUnique({
      where: { id: accountId },
    });

    if (!account) {
      throw new InvalidCredetials();
    }

    return {
      email: account.email,
      name: account.name,
    };
  }
}
