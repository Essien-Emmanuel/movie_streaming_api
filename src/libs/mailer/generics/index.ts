export type Email = {
    to: string, 
    subject: string, 
    textPart: string, 
    htmlPart?: string | ''
}
export class EmailAdapter {
    protected adaptee: any;
    constructor(adaptee: any) {
        this.adaptee = adaptee;
    }
    send(email: Email) {
        return this.adaptee.send(email)
    }
}