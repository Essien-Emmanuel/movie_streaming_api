export interface SMSProvider {
  sendOtp(phone: string, otp: string): Promise<any>;
}
