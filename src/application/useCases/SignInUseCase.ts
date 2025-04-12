import { sign } from "jsonwebtoken";
import { AccountAlreadyExists } from "../errors/AccountAlreadyExists";
import { InvalidCredetials } from "../errors/InvalidCredetials";
import { prismaClient } from "../libs/PrismaCliente";
import { compare, hash } from "bcryptjs";
import { env } from "../config/env";

interface IInput {
  email: string;
  password: string;
}

type IOutput = {
  accessToken: string;
};

export class SignInUseCase {
  async execute({ email, password }: IInput): Promise<IOutput> {
    const account = await prismaClient.account.findUnique({
      where: { email },
    });

    if (!account) {
      throw new InvalidCredetials();
    }

    const isPasswordValid = await compare(password, account.password);
    if (!isPasswordValid) {
      throw new InvalidCredetials();
    }

    const accessToken = await sign({ sub: account.id }, env.jwtSecret, {
      expiresIn: "1d",
    });

    return {
      accessToken,
    };
  }
}
