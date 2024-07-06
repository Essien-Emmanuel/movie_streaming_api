import twilio from "twilio";
import { Config } from "@/src/config";
import { SMSProvider } from ".";

const { accountSid, authToken, phone: twilioPhone } = Config.sms.twilioConfig;

class TwiioSMS implements SMSProvider {
  public smsProvider: typeof twilio;
  protected client: any;
  constructor(smsProvider: typeof twilio) {
    this.smsProvider = smsProvider;
    this.client = twilio(accountSid, authToken);
  }

  async sendOtp(phone: string, otp: string): Promise<any> {
    const message = await this.client.messages.create({
      body: `Hello, you otp is ${otp}`,
      to: phone,
      from: twilioPhone,
    });
    console.log(message.sid);
  }
}

const twilioSms = new TwiioSMS(twilio);

export { twilioSms };
