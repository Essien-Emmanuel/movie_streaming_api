import { UserRepo } from "@/src/database/repositories/user.repo";
import { TUserLoginSchema } from "../../validators/schemas/user.schema";
import { NotFoundError, ValidationError } from "@/src/libs/exceptions";
import { compareStrings, generateToken } from "@/src/utils";
import { TokenFlag } from "@/src/types";
import { HandlerData } from "@/src/core/types";

export const login = async (
  loginDto: TUserLoginSchema
): Promise<HandlerData> => {
  const { email, password } = loginDto;

  const user = await UserRepo.getByEmail(email);
  if (!user) throw new NotFoundError("User email not found.");

  const isMatchedPasswords = await compareStrings(password, user.password);
  if (!isMatchedPasswords) throw new ValidationError("Passwords must match.");

  const token = await generateToken({
    user: { email, id: user.id },
    flag: TokenFlag.AUTH,
    timestamp: Date.now(),
  });

  return {
    message: "Logged in successfully",
    data: {
      user,
      token: {
        flag: TokenFlag.AUTH,
        value: token,
      },
    },
  };
};
