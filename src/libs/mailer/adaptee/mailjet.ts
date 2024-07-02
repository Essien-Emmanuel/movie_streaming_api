import Mailjet from 'node-mailjet';
import { Email, EmailAdapter } from '../generics';
import { Config } from  '../../../config';
import { ServiceError } from '../../exceptions';

const { key, secret } = Config.mail;

class MailjetAdapter extends EmailAdapter {
    private client: Mailjet;
    constructor(protected config: any) {
        super(config);
        this.client = new Mailjet({
            apiKey: config.key,
            apiSecret: config.secret
        });
    }

    async send(email: Email) {
        try {
            const { to: recipient, subject, htmlPart,  textPart } = email;
            const result = await this.client.post("send", { version: "v3.1" }).request({
              Messages: [
                {
                  From: {
                    Email: "essienemma300dev@gmail.com",
                    Name: "school volte",
                  },
                  To: [
                    {
                      Email: recipient,
                    },
                  ],
                  Subject: subject,
                  HTMLPart: htmlPart,
                  TextPart: textPart,
                  CustomerID: "AppGettingStartedTest",
                },
              ],
            });
            
            if (result.response.status !== 200) return { success: false };
      
            return { success: true };
      
            } catch (error: any) {
                console.log(error)
                throw new ServiceError('Mailjet Error')
        }
    }
}

const MailjetService = new MailjetAdapter({ key, secret });

export { MailjetService }