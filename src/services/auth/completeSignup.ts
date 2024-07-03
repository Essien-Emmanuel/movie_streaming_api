import { OTPStatus } from "@/src/database/enums";
import { UserRepo } from "@/src/database/repositories/user.repo";
import { InternalServerError, NotFoundError, ServiceError, ValidationError } from "@/src/libs/exceptions";
import { TokenFlag } from "@/src/types";
import { generateToken } from "@/src/utils";
import { OTP } from "@/src/utils/otp";

type TCompleteSignupDto = {
    email: string;
    otp: string;
}
const completeSignup = async (dto: TCompleteSignupDto) => {
    const { email, otp } = dto;

    const user = await UserRepo.getByEmail(email);
    if (!user) throw new NotFoundError('User email not found.');

    const validatedOtp = await OTP.validate(otp, user.otp, user.otp_expiration);

    if (validatedOtp.expired) {
        user.otp_status = OTPStatus.EXPIRED;
        const updatedUser = await UserRepo.update(user.id, { otp_status: OTPStatus.EXPIRED});
        if (!updatedUser) throw new InternalServerError('Unable to update user status');

        throw new ServiceError(validatedOtp.msg);
    }

    if (!validatedOtp.isOtp) throw new ValidationError(validatedOtp.msg);

    user.otp_status = OTPStatus.ACTIVE;
    const updatedUser = await UserRepo.update(user.id, { otp_status: OTPStatus.ACTIVE});

    const token = await generateToken({
        user: { email, id: user?.id },
        flag: TokenFlag.EMAIL_VERIFICATION,
        timestamp: Date.now()
    });

    return {
        message: 'Email otp verified. Signup completed.',
        data: { user: updatedUser, token: { flag: TokenFlag.EMAIL_VERIFICATION, value: token}}
    }
}

export default completeSignup;