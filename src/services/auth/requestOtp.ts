import { UserRepo } from "@/src/database/repositories/user.repo";
import { InternalServerError, NotFoundError } from "@/src/libs/exceptions";
import { Mail } from "@/src/libs/mailer";
import { OTP } from "@/src/utils/otp";

export const requestEmailOtp = async (email: string) => {
  const user = await UserRepo.getByEmail(email);
  if (!user) throw new NotFoundError("User email not found.");

  //   if (user.otp_status === OTPStatus.ACTIVE)
  //     throw new ServiceError("Email otp already verified.");

  let otp = user.otp;

  if (!otp) {
    const generatedOtp = await OTP.generate();
    otp = generatedOtp;
  }

  const mailResponse = await Mail?.send({
    to: email,
    subject: "Flickstream 🚀",
    textPart: `Your Flickstream otp is ${otp}`,
  });

  if (!mailResponse?.success)
    throw new InternalServerError("Unable to send otp. Check email.");

  await UserRepo.update(user.id, { otp });

  return {
    message: "Email otp request successful. Otp sent.",
    data: { user },
  };
};
