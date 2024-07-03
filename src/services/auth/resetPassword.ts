import { UserRepo } from "@/src/database/repositories/user.repo";
import { NotFoundError } from "@/src/libs/exceptions";
import { TokenFlag } from "@/src/types";
import { generateToken, hashString } from "@/src/utils";

type TResetPasswordDto = {
  id: number;
  password: string;
};
export const resetPassword = async (dto: TResetPasswordDto) => {
  const { id, password } = dto;

  const user = await UserRepo.getById(id);
  if (!user) throw new NotFoundError("User not found.");

  const hashedPassword = await hashString(password);

  const updatedUser = await UserRepo.update(user.id, {
    password: hashedPassword,
  });

  const token = await generateToken({
    user: { email: user.email, id: user?.id },
    flag: TokenFlag.PASSWORD_RESET,
    timestamp: Date.now(),
  });

  return {
    message: "Password created. Go to login",
    data: {
      passwordReset: true,
      user: updatedUser,
      token: { flag: TokenFlag.PASSWORD_RESET, value: token },
    },
  };
};
