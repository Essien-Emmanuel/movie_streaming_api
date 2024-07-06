import { Entity, Column } from "typeorm";
import { Generic } from "./generics";
import { OTPStatus } from "../enums";
import { Role } from "@/src/types";

@Entity()
export class User extends Generic {
  @Column()
  email!: string;

  @Column()
  password!: string;

  @Column()
  phone!: string;

  @Column({
    type: "enum",
    enum: Object.values(Role),
    default: Role.USER,
  })
  role!: string;

  @Column()
  email_otp!: string;

  @Column({
    type: "enum",
    enum: Object.values(OTPStatus),
    default: OTPStatus.PENDING,
  })
  email_otp_status!: string;

  @Column({ type: "timestamp" })
  email_otp_expiration!: Date;

  @Column()
  phone_otp!: string;

  @Column({
    type: "enum",
    enum: Object.values(OTPStatus),
    default: OTPStatus.PENDING,
  })
  phone_otp_status!: string;

  @Column({ type: "timestamp" })
  phone_otp_expiration!: Date;

  @Column({ default: false })
  is_password_reset!: boolean;
}
