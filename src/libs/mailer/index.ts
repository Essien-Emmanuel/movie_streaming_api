import { MailjetService } from "./adaptee/mailjet";

export class MailFactory {
    getSender(name: string) {
        switch (name) {
            case 'mailjet':
                return MailjetService;
            default:
                return;
        }
    }
}

const mailFactory = new MailFactory();

export const Mail = mailFactory.getSender('mailjet');
