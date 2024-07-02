import { UserRepo } from '@/src/database/repositories/user.repo';
import { TUserSignupSchema } from '../../validators/schemas/user.schema';
import { InternalServerError, ResourceConflictError } from '@/src/libs/exceptions';
import { generateToken, hashString } from '@/src/utils';
import { Role, TokenFlag } from '@/src/types';
import { OTP } from '@/src/utils/otp';
import { OTPStatus } from '@/src/database/enums';
import { Mail } from '@/src/libs/mailer';

const initiateSignup = async (signupDto: TUserSignupSchema) => {
    const { email, password }  = signupDto;

    const user = await UserRepo.getByEmail(email);
    if (user) throw new ResourceConflictError('Email already exist.'); 

    const generatedOtp = await OTP.generate();

    const hashedPassword = await hashString(password);
    // const hashedOtp = await hashString(generatedOtp);

    const otpExpDate = await OTP.generateExpiryDate()

    const mailResponse = await Mail?.send({
        to: email,
        subject: "Flickstream 🚀",
        textPart: `Your Flickstream otp is ${generatedOtp}`
    });
    if (!mailResponse?.success) throw new InternalServerError('Unable to send otp. Check email.');
        
    const newUser = await UserRepo.create({
        email,
        password: hashedPassword,
        role: Role.USER,
        otp: generatedOtp,
        otp_status: OTPStatus.PENDING,
        otp_expiration: otpExpDate
    });

    if (!newUser) throw new InternalServerError('Unable to save new user');
    
    const token = await generateToken({
        user: { email, id: newUser?.id },
        flag: TokenFlag.AUTH,
        timestamp: Date.now()
    });

    return {
        statusCode: 201,
        message: 'Initiated user creation successfully',
        data: { newUser, token: { flag: TokenFlag.AUTH, value: token}}
    }
}

export default initiateSignup;