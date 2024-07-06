export class OTP {
  static async generate(otpLen: number = 6) {
    let otp = "";
    for (let i = 0; i < otpLen; i++) {
      const randomInt = Math.floor(Math.random() * otpLen);
      otp += randomInt;
    }
    return otp;
  }

  static async generateExpiryDate(durationInMins: number = 20) {
    const currentTime = new Date();
    const durationInMillSecs = durationInMins * 60 * 1000;
    const otpExpDate = new Date(currentTime.getTime() + durationInMillSecs);
    return otpExpDate;
  }

  static checkActiveDate(expDateTime: Date) {
    const currentDateTime = new Date();
    return expDateTime > currentDateTime;
  }

  static async validate(
    inputOtp: string,
    storedOtp: string,
    expiryDateTime: Date
  ) {
    const isNotExpiryDateTime = OTP.checkActiveDate(expiryDateTime);
    if (!isNotExpiryDateTime) return { expired: true, msg: "OTP expired" };

    const isOtp = inputOtp === storedOtp;
    if (!isOtp) return { expired: false, isOtp: false, msg: "Invalid OTP" };

    return {
      expired: false,
      isOtp: true,
      msg: "OTP comfirmed",
      value: inputOtp,
    };
  }
}
