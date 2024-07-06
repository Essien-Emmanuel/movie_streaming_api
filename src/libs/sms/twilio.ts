import twilio from "twilio";
import { Config } from "@/src/config";
import { SMSProvider, TSMS } from "./generics/index";

const { accountSid, authToken, phone: twilioPhone } = Config.sms.twilioConfig;

class TwiioSMS implements SMSProvider {
  public smsProvider: typeof twilio;
  protected client: any;
  constructor(smsProvider: typeof twilio) {
    this.smsProvider = smsProvider;
    this.client = twilio(accountSid, authToken);
  }

  async send(smsDto: TSMS): Promise<any> {
    const { phone, msg } = smsDto;
    try {
      const message = await this.client.messages.create({
        body: msg,
        to: phone,
        from: twilioPhone,
      });
      if (message.errorCode)
        return {
          success: false,
          errorMessage: message.errorMessage,
          status: message.status,
        };
      if (message.status === "queued")
        return { success: true, status: "queued", errorCode: null };
    } catch (error) {
      console.log("- Error:: SMS not sent");
    }
  }
}

const twilioSms = new TwiioSMS(twilio);

export { twilioSms };
