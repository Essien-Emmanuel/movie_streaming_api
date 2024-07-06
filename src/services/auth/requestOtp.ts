import { OTPStatus } from "@/src/database/enums";
import { UserRepo } from "@/src/database/repositories/user.repo";
import { InternalServerError, NotFoundError } from "@/src/libs/exceptions";
import { Mail } from "@/src/libs/mailer";
import { OTP } from "@/src/utils/otp";

export const requestEmailOtp = async (email: string) => {
  const user = await UserRepo.getByEmail(email);
  if (!user) throw new NotFoundError("User email not found.");

  //   if (user.otp_status === OTPStatus.ACTIVE)
  //     throw new ServiceError("Email otp already verified.");

  let emailOtp;

  const isNotExpiryDateTime = OTP.checkActiveDate(user.email_otp_expiration);
  if (isNotExpiryDateTime) {
    emailOtp = user.email_otp;
  }

  if (!emailOtp) {
    const generatedOtp = await OTP.generate();
    emailOtp = generatedOtp;
  }

  user.email_otp_expiration = await OTP.generateExpiryDate();
  user.email_otp_status = OTPStatus.PENDING;

  const mailResponse = await Mail?.send({
    to: email,
    subject: "Flickstream 🚀",
    textPart: `Your Flickstream otp is ${emailOtp}`,
  });

  if (!mailResponse?.success)
    throw new InternalServerError("Unable to send otp. Check email.");

  await UserRepo.update(user.id, { email_otp: emailOtp });

  return {
    message: "Email otp request successful. Otp sent.",
    data: { user },
  };
};

export const requestPhoneOtp = async (phone: string) => {
  const user = await UserRepo.getOneByFilter({
    email: "essienemma300@gmail.com",
  });
  if (!user) throw new NotFoundError("User phone not found");

  let phoneOtp;

  const isNotExpiryDateTime = OTP.checkActiveDate(user.phone_otp_expiration);
  if (isNotExpiryDateTime) {
    phoneOtp = user.phone_otp;
  }

  if (!phoneOtp) {
    const generatedOtp = await OTP.generate();
    phoneOtp = generatedOtp;
  }

  user.phone_otp_expiration = await OTP.generateExpiryDate();
  user.phone_otp_status = OTPStatus.PENDING;

  // send phone otp

  // if not successful

  // if successful update user phone otp fields

  return {
    message: "Phone otp sent successfully",
    data: { user, phoneOtp },
  };
};
