export type TSMS = {
  phone: string;
  msg: string;
};
export interface SMSProvider {
  send(smsDto: TSMS): Promise<any>;
}
