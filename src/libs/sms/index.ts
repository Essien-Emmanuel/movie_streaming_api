import { TSMS } from "./generics/index";
import { twilioSms } from "./twilio";

class SMS {
  constructor(private providerAdapter: any) {
    this.providerAdapter = providerAdapter;
  }
  async send({ phone, msg }: TSMS) {
    return this.providerAdapter.send({ phone, msg });
  }
}

export default new SMS(twilioSms);
