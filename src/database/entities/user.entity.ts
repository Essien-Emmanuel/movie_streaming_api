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

  @Column({
    type: "enum",
    enum: Object.values(Role),
    default: Role.USER,
  })
  role!: string;

  @Column()
  otp!: string;

  @Column({
    type: "enum",
    enum: Object.values(OTPStatus),
    default: OTPStatus.PENDING,
  })
  otp_status!: string;

  @Column({ type: "timestamp" })
  otp_expiration!: Date;

  @Column({ default: false })
  is_password_reset!: boolean;
}
